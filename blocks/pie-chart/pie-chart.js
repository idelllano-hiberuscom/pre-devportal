import { moveInstrumentation } from '../../scripts/scripts.js';

/** Deterministic fallback palette by index */
const FALLBACK_COLORS = [
  '#4E79A7',
  '#F28E2B',
  '#E15759',
  '#76B7B2',
  '#59A14F',
  '#EDC948',
];

function getColor(colorText, index) {
  const c = (colorText || '').trim();
  return c || FALLBACK_COLORS[index % FALLBACK_COLORS.length];
}

/**
 * Loads Chart.js 4.x from the local vendor copy.
 * @returns {Promise<typeof import('chart.js')>}
 */
async function loadChartJs() {
  return new Promise((resolve, reject) => {
    if (window.Chart) { resolve(window.Chart); return; }
    const script = document.createElement('script');
    script.src = `${window.hlx?.codeBasePath ?? ''}/scripts/vendor/chart.umd.min.js`;
    script.onload = () => resolve(window.Chart);
    script.onerror = reject;
    document.head.append(script);
  });
}

/**
 * loads and decorates the pie-chart block
 * @param {Element} block The block element
 */
export default function decorate(block) {
  const rows = [...block.children];

  /* Build semantic list */
  const ul = document.createElement('ul');
  ul.className = 'pie-chart-items';

  const itemData = [];

  rows.forEach((row, index) => {
    const li = document.createElement('li');
    li.className = 'pie-chart-item';
    moveInstrumentation(row, li);

    const cells = [...row.children];
    const title = cells[0]?.textContent.trim() ?? '';
    const rawValue = parseFloat(cells[1]?.textContent.trim());
    const value = Number.isFinite(rawValue) && rawValue > 0 ? rawValue : 0;
    const iconEl = cells[2]?.querySelector('picture, img, svg');
    const iconAlt = cells[3]?.textContent.trim() ?? title;
    const detailsEl = cells[4];

    const color = getColor('', index);

    /* Icon */
    if (iconEl) {
      const figure = document.createElement('figure');
      figure.className = 'pie-chart-item-icon';
      const clone = iconEl.cloneNode(true);
      if (clone.tagName === 'IMG') clone.alt = iconAlt;
      figure.append(clone);
      li.append(figure);
    }

    /* Title */
    const titleEl = document.createElement('p');
    titleEl.className = 'pie-chart-item-title';
    titleEl.textContent = title;
    li.append(titleEl);

    /* Value */
    const valueEl = document.createElement('p');
    valueEl.className = 'pie-chart-item-value';
    valueEl.textContent = value;
    li.append(valueEl);

    /* Details */
    if (detailsEl && detailsEl.children.length) {
      const details = document.createElement('div');
      details.className = 'pie-chart-item-details';
      while (detailsEl.firstChild) details.append(detailsEl.firstChild);
      li.append(details);
    }

    /* Color swatch */
    li.style.setProperty('--item-color', color);

    ul.append(li);
    itemData.push({ title, value, color });
  });

  /* Build visual wrapper */
  const visual = document.createElement('div');
  visual.className = 'pie-chart-visual';

  const canvas = document.createElement('canvas');
  canvas.setAttribute('aria-hidden', 'true');
  visual.append(canvas);

  const summary = document.createElement('p');
  summary.className = 'pie-chart-summary visually-hidden';
  visual.append(summary);

  /* Replace block children without innerHTML/replaceChildren */
  while (block.firstChild) block.firstChild.remove();
  block.append(visual, ul);

  /* Render chart asynchronously */
  const validItems = itemData.filter((d) => d.value > 0);

  if (!validItems.length) {
    summary.textContent = 'No hay datos disponibles.';
    return;
  }

  summary.textContent = validItems
    .map((d) => `${d.title}: ${d.value}`)
    .join('; ');

  loadChartJs().then((Chart) => {
    // eslint-disable-next-line no-new
    new Chart(canvas, {
      type: 'pie',
      data: {
        labels: validItems.map((d) => d.title),
        datasets: [
          {
            data: validItems.map((d) => d.value),
            backgroundColor: validItems.map((d) => d.color),
            borderWidth: 3,
            borderColor: '#ffffff',
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx) => ` ${ctx.label}: ${ctx.parsed}`,
            },
          },
        },
      },
    });
  }).catch(() => {
    /* Chart.js failed to load — list remains visible as fallback */
  });
}
