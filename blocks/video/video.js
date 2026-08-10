import { moveInstrumentation } from '../../scripts/scripts.js';

/**
 * loads and decorates the video block
 * @param {Element} block The block element
 */
export default function decorate(block) {
  const wrapper = document.createElement('div');
  wrapper.className = 'video-content';

  [...block.children].forEach((row) => {
    const item = document.createElement('div');
    item.className = 'video-item';
    moveInstrumentation(row, item);

    const [uriCell, classesCell, placeholderCell] = [...row.children];

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
        source.type = 'video/mp4';
        videoEl.append(source);
      }
    }

    item.append(videoEl);
    wrapper.append(item);
  });

  block.append(wrapper);
}
