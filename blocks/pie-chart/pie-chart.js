import { moveInstrumentation } from '../../scripts/scripts.js';

/*
 * El componente del portal no es un gráfico de datos: es un diagrama radial decorativo de
 * sectores iguales, cada uno con un icono, y los rótulos dispuestos a izquierda y derecha.
 *
 * Geometría y color medidos en .eds-pipeline/assets/pie-chart/ (perfil radial sobre
 * desktop.png y muestreo de mobile.png, que muestra el donut completo y sin atenuar):
 *   agujero 0 -> 29 · anillo interior 29 -> 37 · cuña clara 38 -> 86 · anillo exterior 86 -> 100
 *   la cuña clara es el color del sector al 70% sobre blanco (verificado en 3 sectores)
 *   separadores, huecos entre bandas y borde del agujero: trazo blanco sobre cada banda
 */

const RING_OUTER = [86, 100];
const WEDGE = [38, 86];
const RING_INNER = [29, 37];
const ICON_RADIUS = 62;
const ICON_SIZE = 15;
const VIEWBOX = 100;

/**
 * El contenido migrado puede traer un campo de peso heredado donde ahora va el color.
 * Solo se acepta como color lo que el navegador reconoce como tal, así que un "1" residual
 * cae a la paleta medida en lugar de pintar un sector inválido.
 */
function isColor(value) {
  if (!value) return false;
  const probe = new Option().style;
  probe.color = value;
  return probe.color !== '';
}

/** Paleta medida, en sentido horario desde el sector superior derecho. */
const SEGMENT_COLORS = [
  '#418d9e',
  '#5493a1',
  '#7d9ca4',
  '#4f8e9c',
  '#017f9b',
  '#01596d',
];

const SVG_NS = 'http://www.w3.org/2000/svg';

/** Ángulo 0 = 12 en punto, creciendo en sentido horario (como los sectores del portal). */
function polar(radius, angleDeg) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return [radius * Math.cos(rad), radius * Math.sin(rad)];
}

/** Sector anular entre dos radios y dos ángulos. */
function annularSectorPath(innerR, outerR, startAngle, endAngle) {
  const sweep = endAngle - startAngle >= 180 ? 1 : 0;
  const [ox1, oy1] = polar(outerR, startAngle);
  const [ox2, oy2] = polar(outerR, endAngle);
  const [ix2, iy2] = polar(innerR, endAngle);
  const [ix1, iy1] = polar(innerR, startAngle);

  return [
    `M ${ox1.toFixed(3)} ${oy1.toFixed(3)}`,
    `A ${outerR} ${outerR} 0 ${sweep} 1 ${ox2.toFixed(3)} ${oy2.toFixed(3)}`,
    `L ${ix2.toFixed(3)} ${iy2.toFixed(3)}`,
    `A ${innerR} ${innerR} 0 ${sweep} 0 ${ix1.toFixed(3)} ${iy1.toFixed(3)}`,
    'Z',
  ].join(' ');
}

function createBand(innerR, outerR, startAngle, endAngle, color, opacity) {
  const path = document.createElementNS(SVG_NS, 'path');
  path.setAttribute('d', annularSectorPath(innerR, outerR, startAngle, endAngle));
  path.setAttribute('fill', color);
  if (opacity) path.setAttribute('fill-opacity', opacity);
  path.setAttribute('class', 'pie-chart-band');
  return path;
}

/**
 * Builds the decorative donut.
 * @param {Array<{color:string, span:number, iconSrc:string, title:string}>} items
 * @returns {SVGElement}
 */
function buildDonut(items) {
  const svg = document.createElementNS(SVG_NS, 'svg');
  svg.setAttribute('class', 'pie-chart-donut');
  svg.setAttribute('viewBox', `${-VIEWBOX} ${-VIEWBOX} ${VIEWBOX * 2} ${VIEWBOX * 2}`);
  // Decorativo: los rótulos ya están en el DOM como texto real.
  svg.setAttribute('aria-hidden', 'true');
  svg.setAttribute('focusable', 'false');

  let angle = 0;
  items.forEach((item) => {
    const start = angle;
    const end = angle + item.span;
    angle = end;

    const group = document.createElementNS(SVG_NS, 'g');
    group.append(
      createBand(RING_OUTER[0], RING_OUTER[1], start, end, item.color),
      createBand(WEDGE[0], WEDGE[1], start, end, item.color, '0.7'),
      createBand(RING_INNER[0], RING_INNER[1], start, end, item.color),
    );

    if (item.iconSrc) {
      const [cx, cy] = polar(ICON_RADIUS, start + (end - start) / 2);
      const image = document.createElementNS(SVG_NS, 'image');
      image.setAttribute('href', item.iconSrc);
      image.setAttribute('x', (cx - ICON_SIZE / 2).toFixed(3));
      image.setAttribute('y', (cy - ICON_SIZE / 2).toFixed(3));
      image.setAttribute('width', ICON_SIZE);
      image.setAttribute('height', ICON_SIZE);
      image.setAttribute('preserveAspectRatio', 'xMidYMid meet');
      image.setAttribute('class', 'pie-chart-donut-icon');
      group.append(image);
    }

    svg.append(group);
  });

  return svg;
}

/**
 * Distributes the groups the way the portal does: first half down the right side
 * (right aligned), the rest up the left side (left aligned).
 */
function placeItem(li, index, total) {
  const rows = Math.ceil(total / 2);
  const onRight = index < rows;
  const row = onRight ? index + 1 : rows - (index - rows);

  li.classList.add(onRight ? 'pie-chart-item-right' : 'pie-chart-item-left');
  li.style.setProperty('--pie-row', String(Math.max(1, row)));
  li.style.setProperty('--pie-column', onRight ? '3' : '1');
}

/**
 * loads and decorates the pie-chart block
 * @param {Element} block The block element
 */
export default function decorate(block) {
  const rows = [...block.children];
  if (!rows.length) return;

  const list = document.createElement('ul');
  list.className = 'pie-chart-items';

  const items = [];

  rows.forEach((row, index) => {
    const cells = [...row.children];
    const [titleCell, colorCell, iconCell, iconAltCell, detailsCell] = cells;

    const li = document.createElement('li');
    li.className = 'pie-chart-item';
    moveInstrumentation(row, li);

    const title = titleCell?.textContent.trim() ?? '';
    const authoredColor = colorCell?.textContent.trim() || '';
    const color = isColor(authoredColor)
      ? authoredColor
      : SEGMENT_COLORS[index % SEGMENT_COLORS.length];

    const iconImg = iconCell?.querySelector('img');
    const iconAlt = iconAltCell?.textContent.trim() || '';

    // Icono junto al rótulo: sólo visible por debajo de escritorio, igual que en el portal.
    if (iconImg) {
      const figure = document.createElement('figure');
      figure.className = 'pie-chart-item-icon';
      iconImg.alt = iconAlt;
      if (!iconAlt) iconImg.setAttribute('aria-hidden', 'true');
      figure.append(iconImg.closest('picture') || iconImg);
      li.append(figure);
    }

    const titleEl = document.createElement('h3');
    titleEl.className = 'pie-chart-item-title';
    titleEl.textContent = title;
    li.append(titleEl);

    if (detailsCell && detailsCell.children.length) {
      detailsCell.className = 'pie-chart-item-details';
      li.append(detailsCell);
    }

    if (colorCell) {
      colorCell.className = 'pie-chart-item-color';
      colorCell.setAttribute('aria-hidden', 'true');
      li.append(colorCell);
    }
    if (iconAltCell) {
      iconAltCell.className = 'pie-chart-item-icon-alt';
      iconAltCell.setAttribute('aria-hidden', 'true');
      li.append(iconAltCell);
    }

    placeItem(li, index, rows.length);
    list.append(li);
    items.push({
      title,
      color,
      iconSrc: iconImg?.getAttribute('src') || '',
    });
  });

  // El portal reparte siempre sectores iguales: el diagrama es decorativo, no cuantitativo.
  const span = 360 / items.length;
  items.forEach((item) => { item.span = span; });

  const figure = document.createElement('div');
  figure.className = 'pie-chart-visual';
  figure.append(buildDonut(items));

  rows.forEach((row) => row.remove());
  block.append(figure, list);
}
