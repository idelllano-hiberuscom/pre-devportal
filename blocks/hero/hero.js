import { moveInstrumentation } from '../../scripts/scripts.js';

/*
 * El bloque hero no tenía JS: el fichero estaba vacío, así que nunca se decoraba y la celda
 * de texto alternativo se renderizaba como contenido visible.
 *
 * Medido en import-work/evidence/hero-cards/ (/integraciones/api):
 *   fotografía a sangre con linear-gradient(rgba(0,0,0,.3), rgba(0,0,0,.3)) encima
 *   texto centrado en blanco · h1 64px/600/80px · margin inferior 80px
 */

/**
 * loads and decorates the hero block
 * @param {Element} block The block element
 */
const BLOCK_LEVEL = 'h1, h2, h3, h4, h5, h6, p, ul, ol, blockquote, table';

export default function decorate(block) {
  const rows = [...block.children];
  if (!rows.length) return;

  /*
   * AEM omite la fila de cualquier campo que el autor no haya rellenado, así que leer por
   * posición desplaza los campos: un hero sin texto alternativo llega con dos filas y el
   * texto acabaría tratado como alt. Cada fila se identifica por su contenido.
   */
  const cellOf = (row) => row?.firstElementChild || row;
  const imageRow = rows.find((row) => cellOf(row)?.querySelector('picture, img'));
  const rest = rows.filter((row) => row !== imageRow);
  const textRows = rest.filter((row) => cellOf(row)?.querySelector(BLOCK_LEVEL));
  const altRow = rest.find((row) => !textRows.includes(row));

  const imageCell = cellOf(imageRow);
  const altCell = cellOf(altRow);

  const media = document.createElement('div');
  media.className = 'hero-background';
  media.setAttribute('aria-hidden', 'true');

  const picture = imageCell?.querySelector('picture');
  const img = imageCell?.querySelector('img');
  if (picture || img) {
    const element = picture || img;
    moveInstrumentation(imageCell, element);
    // Fondo decorativo: el nombre accesible lo aporta el titular, no la imagen.
    const image = element.querySelector('img') || element;
    image.alt = '';
    image.loading = 'eager';
    media.append(element);
  }

  const content = document.createElement('div');
  content.className = 'hero-content';
  textRows.forEach((row) => {
    const cell = row.firstElementChild || row;
    while (cell.firstChild) content.append(cell.firstChild);
    moveInstrumentation(cell, content);
  });

  // El campo de alt se conserva en el DOM para que siga siendo editable, pero no se muestra.
  if (altCell) {
    altCell.className = 'hero-alt';
    altCell.setAttribute('aria-hidden', 'true');
  }

  rows.forEach((row) => row.remove());
  block.append(media, content);
  if (altCell) block.append(altCell);
}
