/*
 * Genera un paquete de contenido de AEM instalable desde spec.json.
 *
 * Produce, por cada página, el `_jcr_content.xml` completo: las propiedades que ya tenía la
 * página en el author instance más las secciones del spec (hero delante y los bloques
 * existentes con sus referencias de imagen). El filter.xml apunta a `jcr:content` de cada
 * página, así que la instalación reemplaza ese subárbol y nada más.
 *
 * Uso:  node build-package.mjs        -> ./pre-devportal-content.zip
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

// fileURLToPath, no URL.pathname: la ruta del repositorio contiene espacios.
const HERE = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(HERE, 'package');
const ZIP = path.join(HERE, 'pre-devportal-content.zip');
const ROOT = '/content/pre-devportal';

const specs = JSON.parse(fs.readFileSync(path.join(HERE, 'spec.json'), 'utf8'));
const sitePath = path.join(HERE, 'aem-site.json');
const site = fs.existsSync(sitePath) ? JSON.parse(fs.readFileSync(sitePath, 'utf8')) : {};

const RT = {
  section: 'core/franklin/components/section/v1/section',
  block: 'core/franklin/components/block/v1/block',
  item: 'core/franklin/components/block/v1/block/item',
  text: 'core/franklin/components/text/v1/text',
};

/* ---------- serialización JCR ---------- */

const xmlAttr = (s) => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;').replace(/\r?\n/g, '&#xa;').replace(/\t/g, '&#x9;');

/** Valor multivalor JCR: [a,b] con las comas internas escapadas. */
const multi = (arr) => `[${arr.map((v) => String(v).replace(/([,\\])/g, '\\$1')).join(',')}]`;

function propValue(v) {
  if (Array.isArray(v)) return multi(v);
  if (typeof v === 'boolean') return `{Boolean}${v}`;
  return String(v);
}

/** Nombre de nodo válido en XML de JCR (los ':' de namespace se conservan). */
const nodeName = (n) => n;

function serialize(name, node, indent = '  ') {
  const props = [];
  const children = [];
  for (const [k, v] of Object.entries(node)) {
    if (v === null || v === undefined) continue;
    if (typeof v === 'object' && !Array.isArray(v)) children.push([k, v]);
    else props.push(`${k}="${xmlAttr(propValue(v))}"`);
  }
  const open = `${indent}<${nodeName(name)}${props.length ? `\n${indent}    ${props.join(`\n${indent}    `)}` : ''}`;
  if (!children.length) return `${open}/>`;
  const inner = children.map(([k, v]) => serialize(k, v, `${indent}  `)).join('\n');
  return `${open}>\n${inner}\n${indent}</${nodeName(name)}>`;
}

/* ---------- construcción del jcr:content por página ---------- */

/*
 * Propiedades que no se empaquetan:
 *  - auditoría (las regenera AEM al instalar)
 *  - protegidas de JCR: versionado y check-out. Incluirlas hace fallar la instalación.
 *  - estado de replicación: el paquete no debe fingir que algo ya tiene preview.
 */
const IGNORE = new Set(['jcr:createdBy', 'jcr:created', 'jcr:lastModified', 'jcr:lastModifiedBy',
  'cq:lastModified', 'cq:lastModifiedBy', 'jcr:uuid', 'jcr:mixinTypes',
  'jcr:versionHistory', 'jcr:baseVersion', 'jcr:isCheckedOut', 'jcr:predecessors',
  'jcr:frozenUuid', 'jcr:frozenPrimaryType', 'jcr:frozenMixinTypes']);

const isReplicationProp = (k) => k.startsWith('cq:lastReplicat');

function findPage(node, wanted, current = '') {
  for (const [k, v] of Object.entries(node)) {
    if (!v || typeof v !== 'object') continue;
    if (v['jcr:primaryType'] === 'cq:Page') {
      const p = `${current}/${k}`;
      if (`${ROOT}${p}` === wanted) return v;
      const deeper = findPage(v, wanted, p);
      if (deeper) return deeper;
    }
  }
  return null;
}

function sectionsToNodes(sections) {
  const root = {
    'jcr:primaryType': 'nt:unstructured',
    'sling:resourceType': 'core/franklin/components/root/v1/root',
  };
  sections.forEach((section, si) => {
    const key = si === 0 ? 'section' : `section_${si}`;
    const node = {
      'jcr:primaryType': 'nt:unstructured',
      'sling:resourceType': RT.section,
      name: section.name || 'section',
    };
    (section.content || []).forEach((html, ci) => {
      node[`text${ci ? `_${ci}` : ''}`] = {
        'jcr:primaryType': 'nt:unstructured',
        'sling:resourceType': RT.text,
        text: html,
      };
    });
    (section.blocks || []).forEach((block, bi) => {
      const bkey = bi === 0 ? block.block : `${block.block}_${bi}`;
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
        if (block.fields) bn.modelFields = block.fields;
        Object.assign(bn, block.props || {});
      }
      node[bkey] = bn;
    });
    root[key] = node;
  });
  return root;
}

fs.rmSync(OUT, { recursive: true, force: true });

const NS = [
  'xmlns:jcr="http://www.jcp.org/jcr/1.0"',
  'xmlns:cq="http://www.day.com/jcr/cq/1.0"',
  'xmlns:sling="http://sling.apache.org/jcr/sling/1.0"',
  'xmlns:nt="http://www.jcp.org/jcr/nt/1.0"',
].join(' ');

const filters = [];
let count = 0;

for (const spec of specs) {
  const rel = spec.path.replace(`${ROOT}`, '');
  const existing = findPage(site, spec.path) || {};
  const existingContent = existing['jcr:content'] || {};

  const jcrContent = {
    'jcr:primaryType': 'cq:PageContent',
    'sling:resourceType': 'core/franklin/components/page/v1/page',
    'jcr:title': existingContent['jcr:title'] || rel.split('/').pop(),
  };
  // se conservan las propiedades de página que ya había (plantilla, conf, título de página…)
  for (const [k, v] of Object.entries(existingContent)) {
    if (typeof v === 'object' || IGNORE.has(k) || isReplicationProp(k)) continue;
    if (k in jcrContent) continue;
    jcrContent[k] = v;
  }
  jcrContent.root = sectionsToNodes(spec.sections);

  const dir = path.join(OUT, 'jcr_root', 'content', 'pre-devportal', ...rel.split('/').filter(Boolean));
  fs.mkdirSync(dir, { recursive: true });
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n${serialize('jcr:root', jcrContent, '').replace('<jcr:root', `<jcr:root ${NS}`)}\n`;
  fs.writeFileSync(path.join(dir, '_jcr_content.xml'), xml);

  filters.push(`    <filter root="${spec.path}/jcr:content" mode="replace"/>`);
  count += 1;
}

/* ---------- META-INF ---------- */
const vault = path.join(OUT, 'META-INF', 'vault');
fs.mkdirSync(vault, { recursive: true });

fs.writeFileSync(path.join(vault, 'filter.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<workspaceFilter version="1.0">\n${filters.join('\n')}\n</workspaceFilter>\n`);

fs.writeFileSync(path.join(vault, 'properties.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE properties SYSTEM "http://java.sun.com/dtd/properties.dtd">
<properties>
  <comment>pre-devportal — contenido de páginas con hero e imágenes demo</comment>
  <entry key="name">pre-devportal-content</entry>
  <entry key="version">1.0.0</entry>
  <entry key="group">hiberus</entry>
  <entry key="description">Hero, contenido de cabecera del portal e imágenes demo referenciadas para ${count} páginas. Requiere que los assets estén en /content/dam/pre-devportal/demo.</entry>
  <entry key="requiresRoot">false</entry>
  <entry key="allowIndexDefinitions">false</entry>
  <entry key="packageType">content</entry>
</properties>
`);

execFileSync('zip', ['-qr', ZIP, 'jcr_root', 'META-INF'], { cwd: OUT });

const bytes = fs.statSync(ZIP).size;
console.log(`${count} páginas empaquetadas`);
console.log(`${path.relative(process.cwd(), ZIP)}  ${(bytes / 1024).toFixed(1)} KB`);
console.log('\nInstalar en: Package Manager del author -> Upload Package -> Install');
