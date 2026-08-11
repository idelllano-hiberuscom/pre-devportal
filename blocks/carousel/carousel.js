/*
 * El carrusel del portal es un filmstrip: muestra varias slides a la vez, la activa a la
 * izquierda y las siguientes asomando por el borde derecho, con el texto superpuesto sobre
 * la imagen y el número de paso en grande sobre la esquina superior izquierda.
 *
 * Medido en .eds-pipeline/assets/carousel/:
 *   slides de 352px con separación de 24px, la tercera recortada por el borde (peek)
 *   alturas escalonadas 416 / 384 / 368 según la distancia a la activa
 *   texto y número superpuestos en blanco sobre la imagen
 *   puntos de 12.8px rellenos: rgb(119,119,123) activo, rgba(119,119,123,.698) inactivo
 */

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
  const number = document.createElement('span');

  slide.classList.add('carousel-slide');
  slide.id = slideId;
  slide.setAttribute('role', 'group');
  slide.setAttribute('aria-roledescription', 'slide');
  slide.setAttribute('aria-label', `${index + 1} de ${total}`);

  media.className = 'carousel-slide-media';

  number.className = 'carousel-slide-index';
  number.setAttribute('aria-hidden', 'true');
  number.textContent = `${index + 1}`;

  if (imageCell) {
    imageCell.classList.add('carousel-slide-image');
    media.append(imageCell);
  }

  media.append(number);

  // El texto va superpuesto sobre la imagen, como en el portal.
  if (textCell) {
    textCell.classList.add('carousel-slide-text');
    media.append(textCell);
  }

  if (altCell) {
    const img = slide.querySelector('img');
    const alt = altCell.textContent.trim();

    if (img && alt) img.alt = alt;
    altCell.classList.add('carousel-slide-alt');
    media.append(altCell);
  }

  slide.append(media);

  return slideId;
}

export default function decorate(block) {
  const slides = [...block.children];
  if (!slides.length) return;

  carouselIndex += 1;
  const carouselId = `carousel-${carouselIndex}`;

  // El portal coloca el título y la entradilla a la izquierda de la tira. En EDS eso es
  // contenido por defecto precediendo al bloque: se marca para que la sección pueda
  // repartirlos en dos columnas.
  const section = block.closest('.section');
  const intro = block.parentElement?.previousElementSibling;
  if (section && intro?.classList.contains('default-content-wrapper')) {
    intro.classList.add('carousel-intro');
    section.classList.add('carousel-section-split');
  }
  const viewport = document.createElement('div');
  const track = document.createElement('div');
  const controlsWrapper = document.createElement('div');
  const controls = [];
  let activeIndex = 0;

  viewport.className = 'carousel-viewport';
  track.className = 'carousel-track';

  controlsWrapper.className = 'carousel-controls';
  controlsWrapper.setAttribute('role', 'tablist');
  controlsWrapper.setAttribute('aria-label', 'Pasos');

  /* Desplaza la tira para que la slide activa quede a la izquierda. El desplazamiento se
     lee del propio DOM, así que funciona en cualquier breakpoint sin recalcular medidas. */
  function update() {
    const offset = slides[activeIndex].offsetLeft - slides[0].offsetLeft;
    track.style.setProperty('--carousel-offset', `${offset}px`);

    slides.forEach((slide, index) => {
      slide.classList.toggle('is-active', index === activeIndex);
      slide.classList.toggle('is-passed', index < activeIndex);
    });

    controls.forEach((control, index) => {
      const isActive = index === activeIndex;
      control.classList.toggle('is-active', isActive);
      control.setAttribute('aria-selected', isActive ? 'true' : 'false');
      control.tabIndex = isActive ? 0 : -1;
    });
  }

  function activateSlide(index) {
    activeIndex = index;
    update();
  }

  slides.forEach((slide, index) => {
    const slideId = decorateSlide(slide, index, slides.length, carouselId);
    const control = document.createElement('button');
    const controlId = `${carouselId}-control-${index + 1}`;

    control.className = 'carousel-control';
    control.type = 'button';
    control.id = controlId;
    control.setAttribute('role', 'tab');
    control.setAttribute('aria-controls', slideId);
    control.setAttribute('aria-label', `Ir al paso ${index + 1}`);
    control.addEventListener('click', () => activateSlide(index));

    controls.push(control);
    controlsWrapper.append(control);
    track.append(slide);
  });

  controlsWrapper.addEventListener('keydown', (event) => {
    if (!controls.length) return;

    if (event.key === 'Home' || event.key === 'End') {
      const next = event.key === 'Home' ? 0 : controls.length - 1;
      event.preventDefault();
      controls[next].focus();
      activateSlide(next);
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

  viewport.append(track);
  block.append(viewport);

  if (controls.length > 1) {
    block.append(controlsWrapper);
  }

  update();
  // Las medidas cambian al recomponer la rejilla; se recalcula el desplazamiento.
  window.addEventListener('resize', update);
}
