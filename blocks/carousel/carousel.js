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
  });

  controls.forEach((control, index) => {
    const isActive = index === activeIndex;
    control.classList.toggle('is-active', isActive);
    control.setAttribute('aria-selected', isActive ? 'true' : 'false');
    control.tabIndex = isActive ? 0 : -1;
  });
}

function decorateSlide(slide, index, total, carouselId) {
  const [imageCell, altCell, textCell] = [...slide.children];
  const slideId = `${carouselId}-slide-${index + 1}`;
  const media = document.createElement('div');
  const body = document.createElement('div');
  const number = document.createElement('span');

  slide.classList.add('carousel-slide');
  slide.id = slideId;
  slide.setAttribute('role', 'group');
  slide.setAttribute('aria-roledescription', 'slide');
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
  controlsWrapper.setAttribute('aria-label', 'Carousel navigation');

  slides.forEach((slide, index) => {
    const slideId = decorateSlide(slide, index, slides.length, carouselId);
    const control = document.createElement('button');

    control.className = 'carousel-control';
    control.type = 'button';
    control.setAttribute('aria-controls', slideId);
    control.setAttribute('aria-label', `Go to step ${index + 1}`);
    control.addEventListener('click', () => updateActiveSlide(slides, controls, index));

    controls.push(control);
    controlsWrapper.append(control);
    slidesWrapper.append(slide);
  });

  controlsWrapper.addEventListener('keydown', (event) => {
    const direction = KEYBOARD_DIRECTIONS[event.key];
    if (!direction) return;

    const currentIndex = controls.findIndex((control) => control === document.activeElement);
    const nextIndex = getControlIndex(currentIndex, controls.length, direction);

    event.preventDefault();
    controls[nextIndex].focus();
    controls[nextIndex].click();
  });

  block.append(slidesWrapper);

  if (controls.length > 1) {
    block.append(controlsWrapper);
  }

  updateActiveSlide(slides, controls, 0);
}
