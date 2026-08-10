import { moveInstrumentation } from '../../scripts/scripts.js';

const KEYBOARD_DIRECTIONS = {
  ArrowLeft: -1,
  ArrowRight: 1,
  ArrowUp: -1,
  ArrowDown: 1,
};

let carouselIndex = 0;

function getControlIndex(index, total, direction) {
  return (index + direction + total) % total;
}

function updateActiveSlide(slides, controls, activeIndex) {
  slides.forEach((slide, index) => {
    const isActive = index === activeIndex;
    slide.classList.toggle('is-active', isActive);
    slide.hidden = !isActive;
    slide.tabIndex = isActive ? 0 : -1;
  });

  controls.forEach((control, index) => {
    const isActive = index === activeIndex;
    control.classList.toggle('is-active', isActive);
    control.setAttribute('aria-selected', isActive ? 'true' : 'false');
    control.tabIndex = isActive ? 0 : -1;
  });
}

function getSlideCells(slide) {
  const cells = [...slide.children];
  const imageCell = slide.querySelector(':scope > [data-aue-prop="media_image"]') || cells[0];
  const altCellByProp = slide.querySelector(':scope > [data-aue-prop="media_imageAlt"]');
  const textCellByProp = slide.querySelector(':scope > [data-aue-prop="content_text"]');
  const fallbackAltCell = !altCellByProp && cells.length > 2 ? cells[1] : altCellByProp;
  const textCell = textCellByProp
    || cells.find((cell) => cell !== imageCell && cell !== fallbackAltCell);

  return {
    imageCell,
    altCell: fallbackAltCell,
    textCell,
  };
}

function decorateSlide(slide, index, total, carouselId) {
  const { imageCell, altCell, textCell } = getSlideCells(slide);
  const slideId = `${carouselId}-slide-${index + 1}`;
  const media = document.createElement('div');
  const body = document.createElement('div');
  const number = document.createElement('span');

  slide.classList.add('carousel-slide');
  slide.id = slideId;
  slide.setAttribute('role', 'tabpanel');
  slide.setAttribute('aria-label', `Step ${index + 1} of ${total}`);

  media.className = 'carousel-slide-media';
  body.className = 'carousel-slide-body';
  number.className = 'carousel-slide-index';
  number.setAttribute('aria-hidden', 'true');
  number.textContent = `${index + 1}`.padStart(2, '0');

  if (imageCell) {
    imageCell.classList.add('carousel-slide-image');
    media.append(imageCell);
  }

  if (textCell) {
    textCell.classList.add('carousel-slide-text');
    body.append(number, textCell);
  } else {
    body.append(number);
  }

  slide.append(media, body);

  if (altCell) {
    const img = slide.querySelector('img');
    const alt = altCell.textContent.trim();

    if (img) {
      if (alt) img.alt = alt;
      moveInstrumentation(altCell, img);
    }

    altCell.remove();
  }

  return slideId;
}

export default function decorate(block) {
  const slides = [...block.children];
  if (!slides.length) return;

  carouselIndex += 1;
  const carouselId = `carousel-${carouselIndex}`;
  const slidesWrapper = document.createElement('div');
  const controlsWrapper = document.createElement('div');
  const controls = [];

  slidesWrapper.className = 'carousel-slides';
  slidesWrapper.setAttribute('role', 'region');
  slidesWrapper.setAttribute('aria-label', 'Carousel');

  controlsWrapper.className = 'carousel-controls';
  controlsWrapper.setAttribute('role', 'tablist');
  controlsWrapper.setAttribute('aria-label', 'Carousel navigation');

  const activateSlide = (index) => updateActiveSlide(slides, controls, index);

  slides.forEach((slide, index) => {
    const slideId = decorateSlide(slide, index, slides.length, carouselId);
    const control = document.createElement('button');
    const controlId = `${carouselId}-control-${index + 1}`;

    control.className = 'carousel-control';
    control.type = 'button';
    control.id = controlId;
    control.setAttribute('role', 'tab');
    control.setAttribute('aria-controls', slideId);
    control.setAttribute('aria-label', `Go to step ${index + 1}`);
    control.addEventListener('click', () => activateSlide(index));
    slide.setAttribute('aria-labelledby', controlId);

    controls.push(control);
    controlsWrapper.append(control);
    slidesWrapper.append(slide);
  });

  controlsWrapper.addEventListener('keydown', (event) => {
    if (!controls.length) return;

    if (event.key === 'Home') {
      event.preventDefault();
      controls[0].focus();
      activateSlide(0);
      return;
    }

    if (event.key === 'End') {
      event.preventDefault();
      controls[controls.length - 1].focus();
      activateSlide(controls.length - 1);
      return;
    }

    const direction = KEYBOARD_DIRECTIONS[event.key];
    if (!direction) return;

    const currentIndex = controls.findIndex((control) => control === document.activeElement);
    if (currentIndex < 0) return;
    const nextIndex = getControlIndex(currentIndex, controls.length, direction);

    event.preventDefault();
    controls[nextIndex].focus();
    activateSlide(nextIndex);
  });

  block.append(slidesWrapper);

  if (controls.length > 1) {
    block.append(controlsWrapper);
  }

  updateActiveSlide(slides, controls, 0);
}
