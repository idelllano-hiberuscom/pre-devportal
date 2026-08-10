import { moveInstrumentation } from '../../scripts/scripts.js';

function buildSummary(cell) {
  const summary = document.createElement('summary');
  summary.className = 'accordion-item-summary';
  moveInstrumentation(cell, summary);

  while (cell.firstChild) {
    summary.append(cell.firstChild);
  }

  return summary;
}

function buildBody(cells) {
  const body = document.createElement('div');
  body.className = 'accordion-item-body';

  cells.forEach((cell) => {
    moveInstrumentation(cell, body);
    while (cell.firstChild) {
      body.append(cell.firstChild);
    }
    cell.remove();
  });

  return body;
}

export default function decorate(block) {
  [...block.children].forEach((row) => {
    const [summaryCell, ...contentCells] = [...row.children];

    if (!summaryCell) {
      return;
    }

    const details = document.createElement('details');
    details.className = 'accordion-item-details';
    moveInstrumentation(row, details);

    details.append(buildSummary(summaryCell));

    if (contentCells.length > 0) {
      details.append(buildBody(contentCells));
    }

    row.classList.add('accordion-item');
    row.insertBefore(details, summaryCell);
    summaryCell.remove();
  });
}
