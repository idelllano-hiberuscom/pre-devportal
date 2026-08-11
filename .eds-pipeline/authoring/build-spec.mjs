/*
 * Construye el spec de autoría fusionando tres fuentes:
 *   1. aem-site.json      — lo que ya está autorizado en AEM (se conserva, no se pierde nada)
 *   2. page-content.json  — título y entradilla reales extraídos del portal capturado
 *   3. el juego de imágenes demo ya subido a /content/dam/pre-devportal/demo
 *
 * El resultado es una lista de páginas con sus secciones: una nueva sección de hero delante
 * y las secciones existentes enriquecidas con las referencias de imagen que faltaban.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Rutas relativas al propio script: la ruta del repositorio contiene espacios, así que
// fileURLToPath y no URL.pathname.
const HERE = path.dirname(fileURLToPath(import.meta.url));


const S = HERE;
const DAM = '/content/dam/pre-devportal/demo';
const ROOT = '/content/pre-devportal';

const site = JSON.parse(fs.readFileSync(`${S}/aem-site.json`, 'utf8'));
const pageContent = JSON.parse(fs.readFileSync(`${S}/page-content.json`, 'utf8'));
const byPath = new Map(pageContent.map((p) => [p.docPath, p]));

/** Imagen de hero por página. */
const HERO_IMG = {
  '/inicio': 'hero-inicio.jpg',
  '/ayuda': 'hero-ayuda.jpg',
  '/blog': 'hero-blog.jpg',
  '/fraude': 'hero-fraude.jpg',
  '/empieza-con-nosotros': 'hero-onboarding.jpg',
  '/herramientas-para-desarrolladores': 'hero-herramientas.jpg',
  '/integraciones/api': 'hero-integraciones.jpg',
  '/integraciones/hosted-checkout': 'hero-integraciones.jpg',
  '/integraciones/sdk': 'hero-integraciones.jpg',
  '/sin-integracion/pago-por-email': 'hero-plugins.jpg',
  '/sin-integracion/pagos-moto': 'hero-plugins.jpg',
  '/herramientas-para-desarrolladores/sin-integracion/plugins/resumen': 'hero-plugins.jpg',
  '/herramientas-para-desarrolladores/con-integracion/api/swagger': 'swagger-login.jpg',
  '/herramientas-para-desarrolladores/con-integracion/api/tokenizacion': 'hero-integraciones.jpg',
};

/** Imágenes por item, según el bloque y la página. */
const ITEM_IMAGES = {
  // cards editorial del blog: una destacada y dos secundarias
  '/blog|cards': ['blog-destacado.jpg', 'blog-secundario-1.jpg', 'blog-secundario-2.jpg'],
  // logos de métodos de pago
  '/empieza-con-nosotros|cards': ['logo-visa.png', 'logo-mastercard.png', 'logo-amex.png', 'logo-bizum.png', 'logo-applepay.png', 'logo-googlepay.png'],
  // iconos del donut de fraude, en el orden autorizado
  '/fraude|pie-chart': ['icon-file.png', 'icon-history.png', 'icon-shield.png', 'icon-ruler.png', 'icon-user.png', 'icon-folder.png'],
  // pasos del carrusel
  '/integraciones/api|carousel_2': ['paso-1.jpg', 'paso-2.jpg', 'paso-3.jpg', 'paso-4.jpg'],
  '/integraciones/hosted-checkout|carousel': ['paso-1.jpg', 'paso-2.jpg', 'paso-3.jpg', 'paso-4.jpg'],
  '/integraciones/sdk|carousel': ['paso-1.jpg', 'paso-2.jpg', 'paso-3.jpg', 'paso-4.jpg'],
  // tarjetas de funcionalidad de la página de API
  '/integraciones/api|cards': ['icon-plug.png', 'icon-shield.png', 'icon-gear.png', 'icon-handshake.png'],
  // logotipos de plataforma
  '/herramientas-para-desarrolladores/sin-integracion/plugins/resumen|cards': ['logo-woocommerce.png', 'logo-prestashop.png', 'logo-magento.png', 'logo-oscommerce.png', 'logo-givewp.png'],
};

/** Campo de imagen que corresponde a cada modelo de item. */
const IMAGE_FIELD = {
  card: 'image',
  'card-logo': 'image',
  'card-icon': 'image',
  'card-plugin': 'image',
  'card-editorial': 'image',
  'pie-chart-item': 'icon',
  'carousel-item': 'media_image',
};

const IGNORE = new Set(['jcr:primaryType', 'jcr:createdBy', 'jcr:created', 'jcr:lastModified',
  'jcr:lastModifiedBy', 'cq:lastModified', 'cq:lastModifiedBy', 'jcr:uuid', 'jcr:mixinTypes',
  'sling:resourceType']);

const clean = (node) => Object.fromEntries(
  Object.entries(node).filter(([k, v]) => !IGNORE.has(k) && typeof v !== 'object'),
);

function pages(node, path = '') {
  const out = [];
  for (const [k, v] of Object.entries(node)) {
    if (v && typeof v === 'object' && v['jcr:primaryType'] === 'cq:Page') {
      out.push([`${path}/${k}`, v]);
      out.push(...pages(v, `${path}/${k}`));
    }
  }
  return out;
}

const specs = [];

for (const [docPath, page] of pages(site)) {
  if (['/nav', '/footer', '/index'].includes(docPath)) continue;

  const content = byPath.get(docPath);
  const heroImage = HERO_IMG[docPath];
  const root = page['jcr:content']?.root || {};

  const sections = [];

  // --- sección de hero ---
  const title = content?.title
    || docPath.split('/').pop().split('-').map((w) => w[0].toUpperCase() + w.slice(1)).join(' ');
  const subtitle = content?.subtitle || '';
  if (heroImage || content) {
    sections.push({
      name: 'hero',
      blocks: [{
        block: 'hero',
        name: 'Hero',
        model: 'hero',
        fields: ['image@reference', 'imageAlt@text', 'text@richtext'],
        props: {
          image: heroImage ? `${DAM}/${heroImage}` : '',
          imageAlt: '',
          text: `<h1>${title}</h1>${subtitle ? `\n<p>${subtitle}</p>` : ''}`,
        },
      }],
    });
  }

  // --- secciones existentes, enriquecidas con imágenes ---
  for (const [sectionKey, sectionNode] of Object.entries(root)) {
    if (!sectionNode || typeof sectionNode !== 'object') continue;
    if (!String(sectionNode['sling:resourceType'] || '').includes('section')) continue;

    const blocks = [];
    const contentHtml = [];

    for (const [key, node] of Object.entries(sectionNode)) {
      if (!node || typeof node !== 'object') continue;
      const rt = String(node['sling:resourceType'] || '');

      if (rt.includes('text/v1/text')) {
        if (node.text) contentHtml.push(node.text);
        continue;
      }
      if (!rt.includes('block/v1/block') || rt.includes('/item')) continue;

      const items = Object.entries(node)
        .filter(([, v]) => v && typeof v === 'object' && String(v['sling:resourceType'] || '').includes('/item'))
        .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }));

      if (items.length) {
        const imgs = ITEM_IMAGES[`${docPath}|${key}`] || [];
        const itemModel = items[0][1].model;
        const field = IMAGE_FIELD[itemModel];
        blocks.push({
          block: key.replace(/_\d+$/, ''),
          name: node.name || key,
          filter: node.filter,
          classes: node.classes,
          itemModel,
          itemFields: items[0][1].modelFields,
          items: items.map(([, item], i) => {
            const props = clean(item);
            delete props.model;
            delete props.modelFields;
            if (field && imgs[i]) props[field] = `${DAM}/${imgs[i]}`;
            return props;
          }),
        });
      } else {
        const props = clean(node);
        const fields = props.modelFields;
        const model = props.model;
        delete props.modelFields; delete props.model; delete props.name; delete props.filter;

        // imágenes de bloques no repetibles
        if (key.startsWith('contact-form')) props.image = `${DAM}/contact-form.jpg`;
        if (key.startsWith('swagger-console')) props.backgroundImage = `${DAM}/swagger-login.jpg`;

        blocks.push({
          block: key.replace(/_\d+$/, ''), name: node.name || key, model, fields, props,
        });
      }
    }

    if (blocks.length || contentHtml.length) {
      sections.push({ name: sectionNode.name || 'section', content: contentHtml, blocks });
    }
  }

  if (sections.length) {
    // Solo se borran nodos de sección: los nombres que se van a reescribir más las secciones
    // existentes que quedarían huérfanas. Nunca propiedades del nodo root — incluir
    // jcr:primaryType o sling:resourceType aquí lo dejaría sin tipo y rompería la página.
    const willWrite = sections.map((_, i) => (i === 0 ? 'section' : `section_${i}`));
    const existingSections = Object.entries(root)
      .filter(([, v]) => v && typeof v === 'object'
        && String(v['sling:resourceType'] || '').includes('section'))
      .map(([k]) => k);

    specs.push({
      path: `${ROOT}${docPath}`,
      replaceSections: [...new Set([...willWrite, ...existingSections])],
      sections,
    });
  }
}

fs.writeFileSync(`${S}/spec.json`, JSON.stringify(specs, null, 2));

console.log(`${specs.length} páginas en el spec\n`);
specs.forEach((s) => {
  const detail = s.sections.map((sec) => {
    const b = (sec.blocks || []).map((x) => {
      const imgs = (x.items || []).filter((i) => Object.values(i).some((v) => String(v).includes('/demo/'))).length;
      const own = x.props && Object.values(x.props).some((v) => String(v).includes('/demo/'));
      return x.block + (x.items ? `[${x.items.length}${imgs ? ` · ${imgs} img` : ''}]` : (own ? ' · img' : ''));
    }).join(' + ');
    return b || '(texto)';
  }).join('  ||  ');
  console.log(`${s.path.replace(ROOT, '').padEnd(56)} ${detail}`);
});
