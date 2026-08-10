import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

function isImageCell(cell) {
  return Boolean(cell.querySelector('picture'));
}

function decorateDefaultCard(li, cells) {
  cells.forEach((cell) => {
    cell.className = isImageCell(cell) ? 'cards-card-image' : 'cards-card-body';
    li.append(cell);
  });
}

function decorateLogoCard(li, cells) {
  const [altCell, ...bodyCells] = cells.filter((cell) => !isImageCell(cell));
  const altText = altCell?.textContent.trim() || '';

  if (altCell) {
    altCell.className = 'cards-card-alt';
    altCell.setAttribute('aria-hidden', 'true');
    li.append(altCell);
  }

  bodyCells.forEach((cell) => {
    cell.className = 'cards-card-body';
    li.append(cell);
  });

  if (bodyCells.some((cell) => cell.textContent.trim())) {
    li.classList.add('has-body');
  }

  return altText;
}

export default function decorate(block) {
  const isLogoVariant = block.classList.contains('logos');
  const ul = document.createElement('ul');
  const altTexts = [];

  while (block.firstElementChild) {
    const row = block.firstElementChild;
    const li = document.createElement('li');
    moveInstrumentation(row, li);
    const cells = [...row.children];

    if (isLogoVariant) {
      const imageCell = cells.find(isImageCell);
      if (imageCell) {
        imageCell.className = 'cards-card-image';
        li.append(imageCell);
      }
      altTexts.push(decorateLogoCard(li, cells));
    } else {
      decorateDefaultCard(li, cells);
      altTexts.push('');
    }

    ul.append(li);
    row.remove();
  }

  ul.querySelectorAll('picture > img').forEach((img, index) => {
    const optimizedPic = createOptimizedPicture(
      img.src,
      altTexts[index] || img.alt,
      false,
      [{ width: isLogoVariant ? '288' : '750' }],
    );
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });

  block.append(ul);
}
