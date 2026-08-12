/*
 * Extrae, de cada página capturada en import-work/pages/, el contenido de cabecera real del
 * portal: título del hero, entradilla y titulares de sección. Sin heurísticas de adivinar:
 * se leen las clases del propio portal (.hero__content__title, .hero__content__subtitle, h2).
 */
import fs from 'node:fs';
import path from 'node:path';

const REPO = '/Volumes/SanDisk Portable SSD Media/programacion/pre-devportal';
const PAGES = path.join(REPO, 'import-work', 'pages');

const decode = (s) => s
  .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<')
  .replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'")
  .replace(/&iacute;/g, 'í').replace(/&oacute;/g, 'ó').replace(/&aacute;/g, 'á')
  .replace(/&eacute;/g, 'é').replace(/&uacute;/g, 'ú').replace(/&ntilde;/g, 'ñ');

const strip = (s) => decode(s.replace(/<[^>]*>/g, ' ')).replace(/\s+/g, ' ').trim();

/** Primer match de un patrón, ya limpio de etiquetas. */
function pick(html, re) {
  const m = html.match(re);
  return m ? strip(m[1]) : '';
}

const out = [];
for (const dir of fs.readdirSync(PAGES).sort()) {
  const file = path.join(PAGES, dir, 'cleaned.html');
  const metaFile = path.join(PAGES, dir, 'metadata.json');
  if (!fs.existsSync(file) || !fs.existsSync(metaFile)) continue;

  const html = fs.readFileSync(file, 'utf8');
  const meta = JSON.parse(fs.readFileSync(metaFile, 'utf8'));

  const title = pick(html, /class="hero__content__title"[^>]*>([\s\S]*?)<\/h1>/)
    || pick(html, /<h1[^>]*>([\s\S]*?)<\/h1>/);
  const subtitle = pick(html, /class="hero__content__subtitle"[^>]*>([\s\S]*?)<\/div>/);

  // titulares de sección, en orden de aparición, sin duplicados ni ruido de nav/footer
  const heads = [...html.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/g)]
    .map((m) => strip(m[1]))
    .filter((t) => t && t.length > 2 && t.length < 90);
  const uniqueHeads = [...new Set(heads)];

  out.push({
    dir,
    docPath: meta.paths.documentPath,
    title,
    subtitle,
    headings: uniqueHeads,
    imageCount: meta.images?.count ?? 0,
  });
}

fs.writeFileSync(
  '/private/tmp/claude-501/-Volumes-SanDisk-Portable-SSD-Media-programacion-pre-devportal/c9c278ae-a2b8-4e15-bcb3-55744ce1f5c1/scratchpad/page-content.json',
  JSON.stringify(out, null, 2),
);

out.forEach((p) => {
  console.log(`\n${p.docPath}`);
  console.log(`  h1        : ${p.title || '—'}`);
  console.log(`  entradilla: ${(p.subtitle || '—').slice(0, 96)}`);
  console.log(`  h2        : ${p.headings.slice(0, 5).join(' · ') || '—'}`);
});
console.log(`\n${out.length} páginas extraídas`);
