/**
 * Extractor de contenido del portal origen con navegador real.
 *
 * Completa los dos huecos que dejó la extracción del 2026-08-10T07:34Z:
 *  - las 6 páginas que fallaron al leerse (portal-read-error en page-tree.json)
 *  - los SVG inline que el extractor anterior no capturó, porque solo bajaba
 *    `<img src>` y los iconos de cards y pie-chart los pinta Angular en cliente
 *
 * Uso:
 *   node .eds-pipeline/extract-portal.mjs            # solo las páginas que faltan
 *   node .eds-pipeline/extract-portal.mjs --all      # las 31 con source_url
 */

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { chromium } from 'playwright';

const root = process.cwd();
const outDir = path.join(root, 'import-work', 'pages');
const tree = JSON.parse(fs.readFileSync(path.join(root, 'page-tree.json'), 'utf8'));

const all = process.argv.includes('--all');
const targets = tree.pages.filter((p) => p.source_url && (all || p.source !== 'import-work'));

const slug = (url) => new URL(url).pathname.replace(/^\/|\/$/g, '').replace(/\//g, '-') || 'inicio';
const sha1 = (buf) => crypto.createHash('sha1').update(buf).digest('hex');

/** Serializa los SVG inline del DOM: es lo que Angular pinta y el extractor previo perdió. */
async function captureInlineSvgs(page, dir) {
  const svgs = await page.evaluate(() => [...document.querySelectorAll('svg')].map((el) => {
    const clone = el.cloneNode(true);
    if (!clone.getAttribute('xmlns')) clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    const box = el.getBoundingClientRect();
    return {
      markup: clone.outerHTML,
      selector: el.closest('[class]')?.className?.toString?.() || '',
      width: Math.round(box.width),
      height: Math.round(box.height),
    };
  }));
  const saved = [];
  const seen = new Set();
  svgs.forEach((s) => {
    if (!s.markup || s.width === 0 || s.height === 0) return;
    const hash = sha1(s.markup);
    if (seen.has(hash)) return;
    seen.add(hash);
    const name = `svg-${hash.slice(0, 12)}.svg`;
    fs.writeFileSync(path.join(dir, 'images', name), s.markup, 'utf8');
    saved.push({ file: `./images/${name}`, selector: s.selector, width: s.width, height: s.height });
  });
  return saved;
}

/** Descarga los `<img src>` remotos; el bucket S3 sigue en pie aunque el portal no. */
async function captureImages(page, dir) {
  const srcs = await page.evaluate(() => [...document.querySelectorAll('img')]
    .map((el) => el.currentSrc || el.src)
    .filter((s) => s && s.startsWith('http')));
  const mapping = {};
  for (const src of [...new Set(srcs)]) {
    try {
      const res = await fetch(src);
      if (!res.ok) continue;
      const buf = Buffer.from(await res.arrayBuffer());
      const ext = (path.extname(new URL(src).pathname) || '.png').split('.').pop().toLowerCase();
      const name = `${sha1(buf).slice(0, 32)}.${ext === 'webp' ? 'webp' : ext}`;
      fs.writeFileSync(path.join(dir, 'images', name), buf);
      mapping[src] = `./images/${name}`;
    } catch { /* el asset ya no está publicado; queda fuera del mapping */ }
  }
  return mapping;
}

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const results = [];

for (const target of targets) {
  const name = slug(target.source_url);
  const dir = path.join(outDir, `pw-${name}`);
  fs.mkdirSync(path.join(dir, 'images'), { recursive: true });
  try {
    const res = await page.goto(target.source_url, { waitUntil: 'networkidle', timeout: 45000 });
    if (!res || res.status() >= 400) {
      results.push({ path: target.path, status: res?.status(), ok: false });
      // eslint-disable-next-line no-console
      console.log(`  ${res?.status()}  ${target.path}`);
      continue;
    }
    await page.waitForTimeout(2500);
    const html = await page.content();
    fs.writeFileSync(path.join(dir, 'cleaned.html'), html, 'utf8');
    await page.screenshot({ path: path.join(dir, 'screenshot.png'), fullPage: true });
    const inlineSvgs = await captureInlineSvgs(page, dir);
    const mapping = await captureImages(page, dir);
    const text = await page.evaluate(() => document.body.innerText.trim().length);
    fs.writeFileSync(path.join(dir, 'metadata.json'), JSON.stringify({
      url: target.source_url,
      jcrPath: target.path,
      timestamp: new Date().toISOString(),
      title: await page.title(),
      text_chars: text,
      images: { mapping, count: Object.keys(mapping).length },
      inline_svgs: inlineSvgs,
    }, null, 2), 'utf8');
    results.push({
      path: target.path, ok: true, text, images: Object.keys(mapping).length, svgs: inlineSvgs.length,
    });
    // eslint-disable-next-line no-console
    console.log(`  OK   ${target.path}  texto=${text} img=${Object.keys(mapping).length} svg=${inlineSvgs.length}`);
  } catch (err) {
    results.push({ path: target.path, ok: false, error: err.message });
    // eslint-disable-next-line no-console
    console.log(`  ERR  ${target.path}  ${err.message.slice(0, 80)}`);
  }
}

await browser.close();
fs.writeFileSync(path.join(root, '.eds-pipeline', 'extract-report.json'), JSON.stringify(results, null, 2), 'utf8');
// eslint-disable-next-line no-console
console.log(`\n${results.filter((r) => r.ok).length}/${results.length} páginas extraídas`);
