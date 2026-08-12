/*
 * Escritura aditiva de los dos bloques nuevos.
 *
 * A diferencia de aem.mjs author, esto NO reescribe la página: crea una única sección con un
 * nombre propio y no borra nada más. Es lo que hay que usar cuando alguien está autorizando
 * en Universal Editor a la vez, porque sus secciones (las que aparecen con sufijo numérico)
 * se conservan intactas.
 *
 * El orden en el DOM no importa para el sidenav: su CSS lo coloca en la columna izquierda con
 * grid-row 1 / -1, así que puede quedar como última sección y seguir pintándose a la izquierda.
 *
 *   node add-blocks.mjs <dirSalida>     -> payloads + index.tsv
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const OUT = process.argv[2] || '/tmp/add-forms';
const DAM = '/content/dam/pre-devportal/demo';
const ROOT = '/content/pre-devportal';
const H = '/herramientas-para-desarrolladores';
const P = '/plugin/herramientas-para-desarrolladores/sin-integracion/plugins';

const RT = {
  section: 'core/franklin/components/section/v1/section',
  block: 'core/franklin/components/block/v1/block',
  item: 'core/franklin/components/block/v1/block/item',
  text: 'core/franklin/components/text/v1/text',
};

/* ---------- contenido ---------- */

const FEATURE_HEADING = 'Elige la integración que más se adapta a tu comercio online';
const FEATURES = [
  ['icon-plug.png', 'Hosted', 'Experiencia de pago segura proporcionada por Cecabank. ¡La integración más sencilla!'],
  ['icon-file.png', 'Iframe', 'Integración con mayor control sobre el diseño de tu página. ¡Todo integrado sin saltos de navegación para tus clientes!'],
  ['icon-gear.png', 'JavaScript', 'Componentes fáciles de integrar en tu página de pago. Nos amoldamos a tu experiencia de usuario.'],
  ['icon-shuffle.png', 'API', 'Mantén un control mayor en el diseño de tu página. La captura de la información se realiza en tu web sin que tus clientes tengan que ser redirigidos a ventanas emergentes.'],
];

const li = (label, href, children) => {
  const inner = href ? `<a href="${href}">${label}</a>` : label;
  return children ? `<li>${inner}<ul>${children.join('')}</ul></li>` : `<li>${inner}</li>`;
};

const NAV_TREE = `<ul>${[
  li('Inicio', H),
  li('Con integración', null, [
    li('Hosted checkout', `${H}/con-integracion/hosted-checkout`),
    li('API', null, [
      li('Gestor de operaciones', `${H}/con-integracion/api/gestor-de-operaciones`),
      li('Tokenización', `${H}/con-integracion/api/tokenizacion`),
      li('Anulación de operaciones', `${H}/con-integracion/api/anulacion-de-operaciones`),
      li('Swagger', `${H}/con-integracion/api/swagger`),
    ]),
    li('SDK', `${H}/con-integracion/sdk`),
    li('Iframe', `${H}/con-integracion/iframe`),
  ]),
  li('Sin integración', null, [
    li('Pagos MOTO', `${H}/sin-integracion/pagos-moto`),
    li('Pay by link', `${H}/sin-integracion/pay-by-link`),
    li('Plugins', null, [
      li('Resumen', `${H}/sin-integracion/plugins/resumen`),
      li('WooCommerce', `${P}/woocomerce`),
      li('PrestaShop', `${P}/prestashop`),
      li('Magento', `${P}/magento`),
      li('osCommerce', `${P}/oscommerce`),
      li('GiveWP', `${P}/givewp`),
    ]),
  ]),
  li('Otros', null, [
    li('Google pay', `${H}/otros/google-pay`),
    li('Apple pay', `${H}/otros/apple-pay`),
    li('Bizum', `${H}/otros/bizum`),
  ]),
].join('')}</ul>`;

/* ---------- serialización ---------- */

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

const featuresSection = () => {
  const items = {};
  FEATURES.forEach(([icon, title, body], i) => {
    items[`item_${i}`] = {
      'jcr:primaryType': 'nt:unstructured',
      'sling:resourceType': RT.item,
      model: 'feature-list-item',
      modelFields: ['icon@reference', 'iconAlt@text', 'text@richtext'],
      icon: `${DAM}/${icon}`,
      iconAlt: '',
      text: `<h4>${title}</h4>\n<p>${body}</p>`,
    };
  });
  return {
    'jcr:primaryType': 'nt:unstructured',
    'sling:resourceType': RT.section,
    name: 'features',
    text: {
      'jcr:primaryType': 'nt:unstructured',
      'sling:resourceType': RT.text,
      text: `<h2>${FEATURE_HEADING}</h2>`,
    },
    'feature-list': {
      'jcr:primaryType': 'nt:unstructured',
      'sling:resourceType': RT.block,
      name: 'Feature List',
      filter: 'feature-list',
      ...items,
    },
  };
};

const sidenavSection = () => ({
  'jcr:primaryType': 'nt:unstructured',
  'sling:resourceType': RT.section,
  name: 'sidenav',
  sidenav: {
    'jcr:primaryType': 'nt:unstructured',
    'sling:resourceType': RT.block,
    name: 'Sidenav',
    model: 'sidenav',
    modelFields: ['searchLabel@text', 'nav@richtext'],
    searchLabel: 'Buscar',
    nav: NAV_TREE,
  },
});

/* ---------- páginas destino ---------- */

const site = JSON.parse(fs.readFileSync(path.join(HERE, 'aem-site.json'), 'utf8'));
const pages = [];
(function walk(node, at = '') {
  Object.entries(node).forEach(([k, v]) => {
    if (v && typeof v === 'object' && v['jcr:primaryType'] === 'cq:Page') {
      pages.push(`${at}/${k}`);
      walk(v, `${at}/${k}`);
    }
  });
}(site));

const targets = [
  ['/inicio', 'section_features', featuresSection()],
  ...pages.filter((p) => p.startsWith(H)).map((p) => [p, 'section_sidenav', sidenavSection()]),
];

fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });

const index = [];
targets.forEach(([rel, sectionName, node]) => {
  const form = new URLSearchParams();
  // Solo se borra la propia sección, para que reejecutar no duplique. Nada más se toca.
  form.append(`./${sectionName}@Delete`, 'true');
  flatten(`./${sectionName}/`, node, form);

  const slug = `${rel.replace(/^\//, '').replace(/\//g, '__')}--${sectionName}`;
  fs.writeFileSync(path.join(OUT, `${slug}.form`), form.toString());
  index.push(`${slug}\t${ROOT}${rel}/jcr:content/root\t${[...form.keys()].length}`);
  console.log(`  ${sectionName.padEnd(17)} -> ${rel}`);
});

fs.writeFileSync(path.join(OUT, 'index.tsv'), `${index.join('\n')}\n`);
console.log(`\n${index.length} payloads aditivos en ${OUT}`);
