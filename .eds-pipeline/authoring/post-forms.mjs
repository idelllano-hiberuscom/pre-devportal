/*
 * Envía al author los payloads que genera home-blocks.mjs.
 *
 *   AEM_TOKEN=... node post-forms.mjs <dirPayloads> [--dry]
 *
 * Una escritura solo se da por buena si la respuesta trae el literal `Content modified` de
 * Sling. El código de estado no vale: cuando el entorno está hibernando, el proxy de Adobe
 * responde 200 con una página de cortesía y la escritura no llega a persistir.
 */
import fs from 'node:fs';
import path from 'node:path';

const AUTHOR = 'https://author-p34633-e913315.adobeaemcloud.com';
const TOKEN = process.env.AEM_TOKEN;
const DIR = process.argv[2];
const DRY = process.argv.includes('--dry');

if (!TOKEN) { console.error('falta AEM_TOKEN'); process.exit(2); }
if (!DIR) { console.error('uso: node post-forms.mjs <dirPayloads> [--dry]'); process.exit(2); }

async function post(target, body) {
  const res = await fetch(`${AUTHOR}${target}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json',
    },
    body,
  });
  const text = await res.text();
  return { status: res.status, ok: /Content modified|"status\.code":\s*20/.test(text), text };
}

const rows = fs.readFileSync(path.join(DIR, 'index.tsv'), 'utf8').trim().split('\n');
let done = 0;

for (const row of rows) {
  const [slug, target, name, order] = row.split('\t');
  const body = fs.readFileSync(path.join(DIR, `${slug}.form`), 'utf8');

  if (DRY) {
    console.log(`  [dry] ${target}  <- ${slug} (${body.split('&').length} props)${order ? ` :order=${order}` : ''}`);
    done += 1;
    continue;
  }

  const r = await post(target, body);
  if (!r.ok) {
    console.log(`  FALLO ${slug} -> HTTP ${r.status} :: ${r.text.replace(/\s+/g, ' ').slice(0, 180)}`);
    continue;
  }

  // El orden va aparte: `:order` posiciona el nodo al que apunta el POST, no a un hijo suyo.
  if (order) {
    const o = await post(`${target}/${name}`, new URLSearchParams({ ':order': order }).toString());
    if (!o.ok) console.log(`  aviso: ${slug} escrito pero sin reordenar (HTTP ${o.status})`);
  }

  console.log(`  OK ${slug}`);
  done += 1;
}

console.log(`\n${done}/${rows.length} escrituras confirmadas`);
process.exit(done === rows.length ? 0 : 1);
