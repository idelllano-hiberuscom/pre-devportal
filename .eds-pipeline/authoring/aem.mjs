/*
 * Cliente para el author instance de AEM CS.
 * El token se lee de la variable de entorno AEM_TOKEN y nunca se escribe a disco.
 *
 *   AEM_TOKEN=... node aem.mjs get <ruta> [bytes]
 *   AEM_TOKEN=... node aem.mjs mkfolder <rutaDam>
 *   AEM_TOKEN=... node aem.mjs upload <dirLocal> <rutaDam>
 *   AEM_TOKEN=... node aem.mjs ls <rutaDam>
 *   AEM_TOKEN=... node aem.mjs author <spec.json> [--only <ruta>] [--dry]
 */
import fs from 'node:fs';
import path from 'node:path';

const [, , CMD, ...ARGS] = process.argv;
const AUTHOR = 'https://author-p34633-e913315.adobeaemcloud.com';
const TOKEN = process.env.AEM_TOKEN;

if (!TOKEN || !CMD) {
  console.error('uso: AEM_TOKEN=... node aem.mjs <comando> [args]');
  process.exit(2);
}

const auth = { Authorization: `Bearer ${TOKEN}` };

async function req(method, p, { body, headers = {} } = {}) {
  const res = await fetch(`${AUTHOR}${p}`, { method, headers: { ...auth, ...headers }, body });
  const text = await res.text().catch(() => '');
  return { status: res.status, ok: res.ok, text };
}

const j = (t) => { try { return JSON.parse(t); } catch { return null; } };

const MIME = {
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png',
  '.svg': 'image/svg+xml', '.webp': 'image/webp',
};

/** Crea una carpeta del DAM con la Assets HTTP API (idempotente). */
async function mkfolder(damPath) {
  const rel = damPath.replace(/^\/content\/dam/, '');
  const parts = rel.split('/').filter(Boolean);
  let acc = '';
  for (const part of parts) {
    const parent = acc;
    acc += `/${part}`;
    // Un GET a una ruta inexistente del DAM puede devolver 200, así que la existencia se
    // comprueba mirando si el hijo aparece en el listado del padre.
    const listing = await req('GET', `/content/dam${parent}.1.json`);
    const parentJson = j(listing.text) || {};
    if (parentJson[part]) { console.log(`  existe ${acc}`); continue; }
    const r = await req('POST', `/api/assets${parent}/*`, {
      body: JSON.stringify({ class: 'assetFolder', properties: { 'jcr:title': part, name: part } }),
      headers: { 'Content-Type': 'application/json' },
    });
    // algunas versiones esperan el nombre en la propia ruta
    const r2 = r.status < 300 ? r : await req('POST', `/api/assets${acc}`, {
      body: JSON.stringify({ class: 'assetFolder', properties: { 'jcr:title': part } }),
      headers: { 'Content-Type': 'application/json' },
    });
    console.log(`  mkdir ${acc} -> ${r2.status}${r2.status >= 300 ? ` ${r2.text.slice(0, 140)}` : ''}`);
  }
}

/*
 * Sube un fichero al DAM con el protocolo de subida binaria directa de AEM Cloud Service:
 *   initiateUpload -> PUT a la URI firmada (sin cabecera de autorización) -> completeUpload
 */
async function uploadOne(file, damPath) {
  const name = path.basename(file);
  const ext = path.extname(name).toLowerCase();
  const mime = MIME[ext] || 'application/octet-stream';
  const buf = fs.readFileSync(file);

  const init = await req('POST', `${damPath}.initiateUpload.json`, {
    body: new URLSearchParams({ fileName: name, fileSize: String(buf.length) }),
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });
  if (!init.ok) return { name, status: init.status, ok: false, err: `initiate: ${init.text.slice(0, 140)}` };

  const data = j(init.text);
  const entry = data?.files?.[0];
  if (!entry?.uploadURIs?.length) {
    return { name, status: init.status, ok: false, err: `initiate sin uploadURIs: ${init.text.slice(0, 140)}` };
  }

  // La URI firmada apunta al almacenamiento en la nube: no lleva el Bearer.
  const put = await fetch(entry.uploadURIs[0], {
    method: 'PUT',
    headers: { 'Content-Type': mime },
    body: buf,
  });
  if (!put.ok) return { name, status: put.status, ok: false, err: 'PUT a la URI firmada falló' };

  const complete = await req('POST', data.completeURI.replace(AUTHOR, ''), {
    body: new URLSearchParams({
      fileName: name,
      mimeType: mime,
      uploadToken: entry.uploadToken,
      createVersion: 'false',
      replace: 'true',
    }),
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });
  return {
    name,
    status: complete.status,
    ok: complete.ok,
    err: complete.ok ? '' : `complete: ${complete.text.slice(0, 140)}`,
  };
}

async function upload(dir, damPath) {
  await mkfolder(damPath);
  const files = fs.readdirSync(dir).filter((f) => MIME[path.extname(f).toLowerCase()]);
  let ok = 0;
  for (const f of files) {
    const r = await uploadOne(path.join(dir, f), damPath);
    if (r.ok) ok += 1;
    else console.log(`  FALLO ${r.name} -> ${r.status} ${r.err}`);
  }
  console.log(`${ok}/${files.length} assets subidos a ${damPath}`);
}

async function ls(damPath) {
  const r = await req('GET', `${damPath}.1.json`);
  const d = j(r.text);
  if (!d) { console.log(`HTTP ${r.status}`, r.text.slice(0, 200)); return; }
  const kids = Object.entries(d).filter(([, v]) => v && typeof v === 'object');
  console.log(`${damPath} -> ${kids.length} entradas`);
  kids.forEach(([k, v]) => console.log(`  ${k}  ${v['jcr:primaryType'] || ''}`));
}

/*
 * Autoría. El spec describe páginas -> secciones -> (contenido por defecto | bloques).
 * Se emite en el formato de nodos que ya usa el contenido autorizado a mano:
 *   bloque simple    : sling:resourceType=.../block/v1/block, model=<id>, modelFields=[...]
 *   bloque contenedor: filter=<id> (+ classes para la variante) e hijos item_N
 */
const RT = {
  section: 'core/franklin/components/section/v1/section',
  block: 'core/franklin/components/block/v1/block',
  item: 'core/franklin/components/block/v1/block/item',
  text: 'core/franklin/components/text/v1/text',
};

function flatten(prefix, node, form) {
  Object.entries(node).forEach(([k, v]) => {
    if (v === null || v === undefined) return;
    if (Array.isArray(v)) {
      v.forEach((entry) => form.append(`${prefix}${k}`, entry));
      form.append(`${prefix}${k}@TypeHint`, 'String[]');
    } else if (typeof v === 'object') {
      flatten(`${prefix}${k}/`, v, form);
    } else {
      form.append(`${prefix}${k}`, String(v));
    }
  });
}

/** Construye el árbol de nodos de una página a partir de su spec. */
function pageNodes(spec) {
  const root = {};
  spec.sections.forEach((section, si) => {
    const sectionName = si === 0 ? 'section' : `section_${si}`;
    const node = {
      'jcr:primaryType': 'nt:unstructured',
      'sling:resourceType': RT.section,
      name: section.name || 'section',
    };
    if (section.style) {
      node.style = [section.style];
      node.modelFields = ['name@text', 'style@multiselect'];
    }

    (section.content || []).forEach((html, ci) => {
      node[`text${ci ? `_${ci}` : ''}`] = {
        'jcr:primaryType': 'nt:unstructured',
        'sling:resourceType': RT.text,
        text: html,
      };
    });

    (section.blocks || []).forEach((block, bi) => {
      const key = bi === 0 ? block.block : `${block.block}_${bi}`;
      const bn = {
        'jcr:primaryType': 'nt:unstructured',
        'sling:resourceType': RT.block,
        name: block.name || block.block,
      };
      if (block.classes) bn.classes = block.classes;
      if (block.items) {
        bn.filter = block.filter || block.block;
        block.items.forEach((item, ii) => {
          bn[`item_${ii}`] = {
            'jcr:primaryType': 'nt:unstructured',
            'sling:resourceType': RT.item,
            model: block.itemModel,
            modelFields: block.itemFields,
            ...item,
          };
        });
      } else {
        bn.model = block.model || block.block;
        bn.modelFields = block.fields;
        Object.assign(bn, block.props || {});
      }
      node[key] = bn;
    });

    root[sectionName] = node;
  });
  return root;
}

async function authorPage(spec, dry) {
  const base = `${spec.path}/jcr:content/root`;
  const nodes = pageNodes(spec);

  const form = new URLSearchParams();
  // se limpia lo anterior para que la autoría sea idempotente
  for (const name of spec.replaceSections || Object.keys(nodes)) {
    form.append(`./${name}@Delete`, 'true');
  }
  flatten('./', nodes, form);

  if (dry) {
    console.log(`[dry] ${spec.path}`);
    [...form.entries()].slice(0, 14).forEach(([k, v]) => console.log(`    ${k} = ${String(v).slice(0, 74)}`));
    console.log(`    ... ${[...form.keys()].length} propiedades`);
    return { path: spec.path, status: 'dry' };
  }

  const r = await req('POST', base, {
    body: form,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
  });
  return { path: spec.path, status: r.status, ok: r.ok, err: r.ok ? '' : r.text.slice(0, 200) };
}

async function author(specFile, only, dry) {
  const specs = JSON.parse(fs.readFileSync(specFile, 'utf8'));
  const list = only ? specs.filter((s) => s.path === only || s.path.endsWith(only)) : specs;
  if (!list.length) { console.error('ninguna página coincide'); process.exit(1); }
  let ok = 0;
  for (const spec of list) {
    const r = await authorPage(spec, dry);
    if (dry) continue;
    if (r.ok) { ok += 1; console.log(`  OK   ${r.path}`); } else console.log(`  ERR  ${r.path} -> ${r.status} ${r.err}`);
  }
  if (!dry) console.log(`\n${ok}/${list.length} páginas autorizadas`);
}

/*
 * Escribe a disco el cuerpo del formulario de una página, sin hacer ninguna petición.
 * Permite revisar exactamente lo que se va a escribir y hacer el POST autenticado aparte:
 *   node aem.mjs payload spec.json /content/pre-devportal/inicio out.form
 *   curl -X POST -H "Authorization: Bearer $AEM_TOKEN" \
 *        -H "Content-Type: application/x-www-form-urlencoded; charset=UTF-8" \
 *        --data-binary @out.form "$AUTHOR/content/pre-devportal/inicio/jcr:content/root"
 */
function payload(specFile, pagePath, outFile) {
  const specs = JSON.parse(fs.readFileSync(specFile, 'utf8'));
  const spec = specs.find((s) => s.path === pagePath || s.path.endsWith(pagePath));
  if (!spec) { console.error(`no hay spec para ${pagePath}`); process.exit(1); }

  const form = new URLSearchParams();
  const nodes = pageNodes(spec);
  for (const name of spec.replaceSections || Object.keys(nodes)) {
    form.append(`./${name}@Delete`, 'true');
  }
  flatten('./', nodes, form);

  fs.writeFileSync(outFile, form.toString());
  console.log(`${spec.path}`);
  console.log(`  ${[...form.keys()].length} propiedades -> ${outFile} (${fs.statSync(outFile).size} bytes)`);
  console.log(`  destino: ${spec.path}/jcr:content/root`);
}

/** Genera el payload de todas las páginas del spec en un directorio, sin hacer peticiones. */
function payloadAll(specFile, outDir) {
  const specs = JSON.parse(fs.readFileSync(specFile, 'utf8'));
  fs.mkdirSync(outDir, { recursive: true });
  const index = [];
  for (const spec of specs) {
    const slug = spec.path.replace(/^\/content\/pre-devportal\/?/, '').replace(/\//g, '__') || 'root';
    const file = path.join(outDir, `${slug}.form`);
    const form = new URLSearchParams();
    const nodes = pageNodes(spec);
    for (const name of spec.replaceSections || Object.keys(nodes)) {
      form.append(`./${name}@Delete`, 'true');
    }
    flatten('./', nodes, form);
    fs.writeFileSync(file, form.toString());
    index.push({ slug, target: `${spec.path}/jcr:content/root`, props: [...form.keys()].length });
  }
  fs.writeFileSync(path.join(outDir, 'index.tsv'),
    index.map((e) => `${e.slug}\t${e.target}\t${e.props}`).join('\n'));
  console.log(`${index.length} payloads en ${outDir}`);
  index.forEach((e) => console.log(`  ${String(e.props).padStart(4)} props  ${e.target}`));
}

if (CMD === 'payload') {
  payload(ARGS[0], ARGS[1], ARGS[2]);
} else if (CMD === 'payload-all') {
  payloadAll(ARGS[0], ARGS[1]);
} else if (CMD === 'get') {
  const r = await req('GET', ARGS[0]);
  console.log(`HTTP ${r.status}`);
  console.log(r.text.slice(0, Number(ARGS[1] || 1200)));
} else if (CMD === 'mkfolder') await mkfolder(ARGS[0]);
else if (CMD === 'upload') await upload(ARGS[0], ARGS[1]);
else if (CMD === 'ls') await ls(ARGS[0]);
else if (CMD === 'author') {
  const only = ARGS.includes('--only') ? ARGS[ARGS.indexOf('--only') + 1] : null;
  await author(ARGS[0], only, ARGS.includes('--dry'));
} else { console.error(`comando desconocido: ${CMD}`); process.exit(2); }
