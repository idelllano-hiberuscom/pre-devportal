import { moveInstrumentation } from '../../scripts/scripts.js';

/*
 * Lista de features sobre fondo navy. En el portal es `section.feature-list` de /inicio:
 * el titular ocupa la columna izquierda y los items la derecha, con un divisor vertical
 * teal entre ambas.
 *
 * Medido en https://pre-devportaltpv.cloud.cecabank.es/inicio:
 *   raíz         grid 540px 540px · gap 40px · padding 320px 160px · fondo rgb(1,52,81)
 *   titular      540px · 40px/60px peso 400 blanco · border-right 2px solid rgb(1,127,155)
 *   lista        flex column · gap 56px
 *   item         flex row · gap 36px
 *   icono        108 x 108
 *   h4 del item  396px · 40px/60px peso 400 blanco
 *   p del item   396px · 16px/32px blanco
 */

/**
 * loads and decorates the feature-list block
 * @param {Element} block The block element
 */
export default function decorate(block) {
  const rows = [...block.children];
  if (!rows.length) return;

  // El titular vive como contenido por defecto delante del bloque, igual que en accordion y
  // carousel. Se marca para que la sección pueda repartirlo en dos columnas.
  const section = block.closest('.section');
  const intro = block.parentElement?.previousElementSibling;
  if (section) {
    section.classList.add('feature-list-section');
    if (intro?.classList.contains('default-content-wrapper')) {
      intro.classList.add('feature-list-intro');
      section.classList.add('feature-list-section-split');
    }
  }

  const list = document.createElement('ul');
  list.className = 'feature-list-items';

  rows.forEach((row) => {
    const cells = [...row.children];
    const item = document.createElement('li');
    item.className = 'feature-list-item';
    moveInstrumentation(row, item);

    /*
     * AEM omite la fila de cualquier campo vacío, así que las celdas no se leen por posición:
     * el icono se reconoce por contenido y, de las restantes, si solo queda una es el texto.
     */
    const iconCell = cells.find((cell) => cell.querySelector('picture, img'));
    const rest = cells.filter((cell) => cell !== iconCell && cell.textContent.trim());
    let altCell = null;
    let textCells = rest;
    if (rest.length > 1) [altCell, ...textCells] = rest;

    if (iconCell) {
      iconCell.className = 'feature-list-item-icon';
      const img = iconCell.querySelector('img');
      if (img) img.alt = altCell?.textContent.trim() || '';
      item.append(iconCell);
    }

    const body = document.createElement('div');
    body.className = 'feature-list-item-body';
    textCells.forEach((cell) => {
      while (cell.firstChild) body.append(cell.firstChild);
      moveInstrumentation(cell, body);
    });
    item.append(body);

    // El campo de alt se conserva editable pero no se muestra.
    if (altCell) {
      altCell.className = 'feature-list-item-alt';
      altCell.setAttribute('aria-hidden', 'true');
      item.append(altCell);
    }

    list.append(item);
  });

  rows.forEach((row) => row.remove());
  block.append(list);
}
