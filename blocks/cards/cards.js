import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

function isImageCell(cell) {
  return Boolean(cell?.querySelector('picture'));
}

function isEmptyCell(cell) {
  return Boolean(cell) && !cell.textContent.trim() && !cell.children.length;
}

function getIconCardCells(cells) {
  const [firstCell, secondCell, ...remainingCells] = cells;

  if (isImageCell(firstCell)) {
    return {
      imageCell: firstCell,
      altCell: secondCell,
      bodyCells: remainingCells,
    };
  }

  if (isEmptyCell(firstCell)) {
    return {
      imageCell: null,
      altCell: secondCell,
      bodyCells: remainingCells,
    };
  }

  return {
    imageCell: null,
    altCell: firstCell,
    bodyCells: cells.slice(1),
  };
}

function decorateIconCard(li, cells) {
  const { imageCell, altCell, bodyCells } = getIconCardCells(cells);
  const altText = altCell?.textContent.trim() || '';

  if (imageCell) {
    imageCell.className = 'cards-card-image';
    li.append(imageCell);
  }
  if (altCell) {
    altCell.className = 'cards-card-alt';
    altCell.setAttribute('aria-hidden', 'true');
    li.append(altCell);
  }
  bodyCells.forEach((cell) => {
    cell.className = 'cards-card-body';
    li.append(cell);
  });

  return altText;
}

function decorateDefaultCard(li, cells) {
  cells.forEach((cell) => {
    cell.className = isImageCell(cell) ? 'cards-card-image' : 'cards-card-body';
    li.append(cell);
  });
}

function optimizeCardImages(li, altText, width) {
  li.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(
      img.src,
      altText || img.alt,
      false,
      [{ width }],
    );
    const optimizedImg = optimizedPic.querySelector('img');
    ['width', 'height'].forEach((attribute) => {
      if (img.hasAttribute(attribute)) {
        optimizedImg.setAttribute(attribute, img.getAttribute(attribute));
      }
    });
    moveInstrumentation(img, optimizedImg);
    img.closest('picture').replaceWith(optimizedPic);
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

function decorateEditorialCard(li, cells) {
  const [imageCell, altCell, ...bodyCells] = cells;
  const altText = altCell?.textContent.trim() || '';

  if (imageCell) {
    imageCell.className = 'cards-card-image';
    li.append(imageCell);
  }
  if (altCell) {
    altCell.className = 'cards-card-alt';
    altCell.setAttribute('aria-hidden', 'true');
    li.append(altCell);
  }
  bodyCells.forEach((cell) => {
    cell.className = 'cards-card-body';
    li.append(cell);
  });

  return altText;
}

export default function decorate(block) {
  const isLogoVariant = block.classList.contains('logos');
  const isIconCardsVariant = block.classList.contains('icon-cards');
  const isPluginsVariant = block.classList.contains('plugins');
  const isEditorialVariant = block.classList.contains('editorial');
  const ul = document.createElement('ul');

  while (block.firstElementChild) {
    const row = block.firstElementChild;
    const li = document.createElement('li');
    moveInstrumentation(row, li);
    const cells = [...row.children];
    let altText = '';

    if (isLogoVariant) {
      const imageCell = cells.find(isImageCell);
      if (imageCell) {
        imageCell.className = 'cards-card-image';
        li.append(imageCell);
      }
      altText = decorateLogoCard(li, cells);
    } else if (isIconCardsVariant) {
      altText = decorateIconCard(li, cells);
    } else if (isEditorialVariant) {
      altText = decorateEditorialCard(li, cells);
    } else if (isPluginsVariant) {
      const [imageCell, altCell, bodyCell, linkCell] = cells;
      altText = altCell?.textContent.trim() || '';

      if (imageCell) {
        imageCell.className = 'cards-card-image';
      }
      if (bodyCell) {
        bodyCell.className = 'cards-card-body';
      }
      if (altCell) {
        altCell.className = 'cards-card-alt';
        altCell.setAttribute('aria-hidden', 'true');
      }
      if (linkCell) {
        linkCell.className = 'cards-card-link';
        linkCell.setAttribute('aria-hidden', 'true');
      }

      const href = linkCell?.textContent.trim() || '#';
      const anchor = document.createElement('a');
      anchor.href = href;

      if (imageCell) anchor.append(imageCell);
      if (bodyCell) anchor.append(bodyCell);
      li.append(anchor);
      if (altCell) li.append(altCell);
      if (linkCell) li.append(linkCell);
    } else {
      decorateDefaultCard(li, cells);
    }

    let imageWidth = '750';
    if (isLogoVariant) {
      imageWidth = '288';
    } else if (isEditorialVariant) {
      imageWidth = '810';
    }
    optimizeCardImages(li, altText, imageWidth);
    ul.append(li);
    row.remove();
  }

  block.append(ul);
}
