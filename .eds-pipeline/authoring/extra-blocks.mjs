/*
 * Añade al spec los dos bloques que faltaban, con el contenido real del portal:
 *
 *  - feature-list en /inicio: el titular y los cuatro items (Hosted, Iframe, JavaScript,
 *    API) extraídos de import-work/pages/18-inicio/cleaned.html
 *  - sidenav en toda la rama /herramientas-para-desarrolladores, con el árbol que el portal
 *    muestra en speedcode-sidenav
 *
 * Se ejecuta después de build-spec.mjs y reescribe spec.json.
 *   node extra-blocks.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const DAM = '/content/dam/pre-devportal/demo';
const ROOT = '/content/pre-devportal';

const specs = JSON.parse(fs.readFileSync(path.join(HERE, 'spec.json'), 'utf8'));

/* ---------- feature-list en /inicio ---------- */

const FEATURE_HEADING = 'Elige la integración que más se adapta a tu comercio online';
const FEATURES = [
  ['icon-plug.png', 'Hosted', 'Experiencia de pago segura proporcionada por Cecabank. ¡La integración más sencilla!'],
  ['icon-file.png', 'Iframe', 'Integración con mayor control sobre el diseño de tu página. ¡Todo integrado sin saltos de navegación para tus clientes!'],
  ['icon-gear.png', 'JavaScript', 'Componentes fáciles de integrar en tu página de pago. Nos amoldamos a tu experiencia de usuario.'],
  ['icon-shuffle.png', 'API', 'Mantén un control mayor en el diseño de tu página. La captura de la información se realiza en tu web sin que tus clientes tengan que ser redirigidos a ventanas emergentes.'],
];

const featureSection = {
  name: 'features',
  // El titular va como contenido por defecto: el bloque lo reparte en dos columnas.
  content: [`<h2>${FEATURE_HEADING}</h2>`],
  blocks: [{
    block: 'feature-list',
    name: 'Feature List',
    filter: 'feature-list',
    itemModel: 'feature-list-item',
    itemFields: ['icon@reference', 'iconAlt@text', 'text@richtext'],
    items: FEATURES.map(([icon, title, body]) => ({
      icon: `${DAM}/${icon}`,
      iconAlt: '',
      text: `<h4>${title}</h4>\n<p>${body}</p>`,
    })),
  }],
};

/* ---------- sidenav en la rama de herramientas ---------- */

const H = '/herramientas-para-desarrolladores';
const P = '/plugin/herramientas-para-desarrolladores/sin-integracion/plugins';

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

const sidenavSection = () => ({
  name: 'sidenav',
  blocks: [{
    block: 'sidenav',
    name: 'Section Navigation',
    model: 'sidenav',
    fields: ['searchLabel@text', 'nav@richtext'],
    props: { searchLabel: 'Buscar', nav: NAV_TREE },
  }],
});

/* ---------- páginas de la rama que aún no estaban en el spec ---------- */

/*
 * El spec de build-spec.mjs solo cubre páginas con captura o imagen de hero, así que en la
 * rama de herramientas faltaban las intermedias y google-pay. Sin ellas quedarían sin nav
 * lateral y la rama sería incoherente al navegar. Se crean con hero y sidenav.
 */
const titleFromPath = (p) => p.split('/').filter(Boolean).pop()
  .split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

const site = JSON.parse(fs.readFileSync(path.join(HERE, 'aem-site.json'), 'utf8'));
const allPages = [];
(function walk(node, at = '') {
  Object.entries(node).forEach(([k, v]) => {
    if (v && typeof v === 'object' && v['jcr:primaryType'] === 'cq:Page') {
      allPages.push(`${at}/${k}`);
      walk(v, `${at}/${k}`);
    }
  });
}(site));

const known = new Set(specs.map((s) => s.path.replace(ROOT, '')));
const missing = allPages.filter((p) => p.startsWith(H) && !known.has(p));

missing.forEach((rel) => {
  specs.push({
    path: `${ROOT}${rel}`,
    replaceSections: [],
    sections: [{
      name: 'hero',
      blocks: [{
        block: 'hero',
        name: 'Hero',
        model: 'hero',
        fields: ['image@reference', 'imageAlt@text', 'text@richtext'],
        props: {
          image: `${DAM}/hero-herramientas.jpg`,
          imageAlt: '',
          text: `<h1>${titleFromPath(rel)}</h1>`,
        },
      }],
    }],
  });
  console.log(`  página nueva  -> ${rel}`);
});

/* ---------- inserción ---------- */

let added = 0;

for (const spec of specs) {
  const rel = spec.path.replace(ROOT, '');

  if (rel === '/inicio' && !spec.sections.some((s) => s.name === 'features')) {
    spec.sections.push(featureSection);
    added += 1;
    console.log(`  feature-list -> ${rel}`);
  }

  // El sidenav va delante del hero, para que quede como columna izquierda de la página.
  if (rel.startsWith(H) && !spec.sections.some((s) => s.name === 'sidenav')) {
    spec.sections.unshift(sidenavSection());
    added += 1;
    console.log(`  sidenav      -> ${rel}`);
  }
}

// Se recalculan los nombres de sección a borrar, que dependen de cuántas secciones hay.
specs.forEach((spec) => {
  const willWrite = spec.sections.map((_, i) => (i === 0 ? 'section' : `section_${i}`));
  spec.replaceSections = [...new Set([...(spec.replaceSections || []), ...willWrite])]
    .filter((n) => !n.includes(':'));
});

fs.writeFileSync(path.join(HERE, 'spec.json'), JSON.stringify(specs, null, 2));
console.log(`\n${added} bloques añadidos al spec (${specs.length} páginas)`);
