import { moveInstrumentation } from '../../scripts/scripts.js';

/*
 * AEM omite la fila de cualquier campo que el autor deje vacío, así que las celdas no se leen
 * por posición: si no se rellena `classes`, la celda del póster caía en la posición de las
 * clases y acababa añadiendo basura al classList en lugar de poner el poster.
 *
 * Se reconocen por contenido: el póster es la celda con imagen, la URI la que trae un enlace
 * o una ruta, y las clases lo que quede.
 */
const MIME_TYPES = {
  mp4: 'video/mp4',
  webm: 'video/webm',
  ogv: 'video/ogg',
  mov: 'video/quicktime',
};

function resolveVideoCells(cells) {
  const placeholderCell = cells.find((cell) => cell.querySelector('picture, img')) || null;
  const rest = cells.filter((cell) => cell !== placeholderCell && cell.textContent.trim());

  const uriIndex = rest.findIndex((cell) => cell.querySelector('a')
    || /^(?:https?:\/\/|\/)\S*$/.test(cell.textContent.trim()));
  const uriCell = uriIndex >= 0 ? rest.splice(uriIndex, 1)[0] : null;

  return { uriCell, classesCell: rest[0] || null, placeholderCell };
}

/**
 * loads and decorates the video block
 * @param {Element} block The block element
 */
export default function decorate(block) {
  const wrapper = document.createElement('div');
  wrapper.className = 'video-content';
  const rows = [...block.children];

  rows.forEach((row) => {
    const item = document.createElement('div');
    item.className = 'video-item';
    moveInstrumentation(row, item);

    const { uriCell, classesCell, placeholderCell } = resolveVideoCells([...row.children]);

    // Build <video> element
    const videoEl = document.createElement('video');
    videoEl.setAttribute('controls', '');
    videoEl.setAttribute('playsinline', '');

    // Placeholder image (poster)
    if (placeholderCell) {
      const img = placeholderCell.querySelector('img');
      if (img) {
        videoEl.setAttribute('poster', img.src);
        videoEl.setAttribute('aria-label', img.alt || '');
      }
    }

    // Classes (CSS modifier)
    if (classesCell) {
      const classes = classesCell.textContent.trim().split(/[\s,]+/).filter(Boolean);
      classes.forEach((cls) => item.classList.add(cls));
    }

    // URI → <source>
    if (uriCell) {
      const anchor = uriCell.querySelector('a');
      const src = anchor ? anchor.href : uriCell.textContent.trim();
      if (src) {
        const source = document.createElement('source');
        source.src = src;
        // El tipo sale de la extensión: fijar siempre video/mp4 hacía que el navegador
        // descartase cualquier otro formato del DAM sin ni siquiera intentarlo.
        source.type = MIME_TYPES[src.split(/[?#]/)[0].split('.').pop().toLowerCase()] || 'video/mp4';
        videoEl.append(source);
      }
    }

    item.append(videoEl);
    wrapper.append(item);
  });

  // Las filas de origen se retiraban antes: sin esto la URI y las celdas vacías quedaban
  // visibles como texto debajo del reproductor.
  rows.forEach((row) => row.remove());
  block.append(wrapper);
}
