import { moveInstrumentation } from '../../scripts/scripts.js';

const FIELD_DEFINITIONS = [
  {
    name: 'name',
    labelField: 'nameLabel',
    type: 'text',
    autocomplete: 'name',
  },
  {
    name: 'email',
    labelField: 'emailLabel',
    type: 'email',
    autocomplete: 'email',
  },
  {
    name: 'phone',
    labelField: 'phoneLabel',
    type: 'tel',
    autocomplete: 'tel',
  },
  {
    name: 'company',
    labelField: 'companyLabel',
    type: 'text',
    autocomplete: 'organization',
  },
  {
    name: 'message',
    labelField: 'messageLabel',
    type: 'textarea',
    rows: '5',
  },
];

let contactFormCount = 0;

const getCell = (row) => row?.firstElementChild || row;

const getText = (row) => getCell(row)?.textContent?.trim() || '';

const ROW_ORDER = [
  'image',
  'imageAlt',
  'heading',
  'nameLabel',
  'emailLabel',
  'phoneLabel',
  'companyLabel',
  'messageLabel',
  'submitLabel',
  'action',
];

const propOf = (row) => row.querySelector('[data-aue-prop]')?.dataset.aueProp
  || row.dataset?.aueProp
  || null;

/**
 * Maps the block rows onto the model fields.
 *
 * AEM omits the row of any field that was never authored, so a form with no
 * image and no action arrives with 8 rows instead of 10 and reading them by
 * position silently shifts every field. When the rows carry their field name
 * we key off that; otherwise position is all we have and every row is present.
 */
const resolveRows = (rows) => {
  const byProp = new Map();
  rows.forEach((row) => {
    const prop = propOf(row);
    if (prop) byProp.set(prop, row);
  });
  if (!byProp.size) return ROW_ORDER.map((_, index) => rows[index]);
  return ROW_ORDER.map((name, index) => byProp.get(name)
    || (rows.length === ROW_ORDER.length ? rows[index] : undefined));
};

const setControlValidity = (control) => {
  if (control.checkValidity()) {
    control.removeAttribute('aria-invalid');
    return;
  }

  control.setAttribute('aria-invalid', 'true');
};

function createField(fieldDefinition, row, idPrefix) {
  const fieldWrapper = document.createElement('div');
  fieldWrapper.className = 'contact-form-field';

  const label = document.createElement('label');
  label.className = 'contact-form-label';

  const fieldId = `${idPrefix}-${fieldDefinition.name}`;
  label.setAttribute('for', fieldId);
  label.textContent = getText(row);
  moveInstrumentation(getCell(row), label);

  const control = document.createElement(fieldDefinition.type === 'textarea' ? 'textarea' : 'input');
  control.className = 'contact-form-control';
  control.id = fieldId;
  control.name = fieldDefinition.name;
  control.required = true;
  control.setAttribute('aria-required', 'true');

  if (fieldDefinition.type === 'textarea') {
    control.rows = fieldDefinition.rows;
  } else {
    control.type = fieldDefinition.type;
    control.autocomplete = fieldDefinition.autocomplete;
  }

  fieldWrapper.append(label, control);

  return fieldWrapper;
}

function focusFirstInvalidField(form) {
  const firstInvalidField = form.querySelector('input:invalid, textarea:invalid');

  if (firstInvalidField instanceof HTMLElement) {
    setControlValidity(firstInvalidField);
    firstInvalidField.focus();
    firstInvalidField.reportValidity();
  }
}

export default function decorate(block) {
  const rows = [...block.children];
  const [
    imageRow,
    imageAltRow,
    headingRow,
    nameRow,
    emailRow,
    phoneRow,
    companyRow,
    messageRow,
    submitRow,
    actionRow,
  ] = resolveRows(rows);

  // The image and the action are optional and already guarded below; without
  // the labels there is no form to build.
  const missing = Object.entries({
    heading: headingRow,
    nameLabel: nameRow,
    emailLabel: emailRow,
    phoneLabel: phoneRow,
    companyLabel: companyRow,
    messageLabel: messageRow,
    submitLabel: submitRow,
  }).filter(([, row]) => !row).map(([name]) => name);

  if (missing.length) {
    // eslint-disable-next-line no-console
    console.warn(`The contact-form block is missing required rows: ${missing.join(', ')}`);
    return;
  }

  contactFormCount += 1;
  const idPrefix = `contact-form-${contactFormCount}`;

  const content = document.createElement('div');
  content.className = 'contact-form-content';

  const media = document.createElement('div');
  media.className = 'contact-form-media';

  const imageCell = getCell(imageRow);
  const mediaAsset = imageCell?.querySelector('picture, img');
  if (mediaAsset) {
    const mediaElement = mediaAsset.closest('picture') || mediaAsset;
    mediaElement.classList.add('contact-form-image');
    moveInstrumentation(imageCell, mediaElement);
    const imgEl = mediaElement.querySelector('img') || (mediaElement.tagName === 'IMG' ? mediaElement : null);
    if (imgEl && !imgEl.alt) {
      imgEl.alt = getText(imageAltRow);
    }
    media.append(mediaElement);
  }

  const heading = document.createElement('h2');
  heading.className = 'contact-form-heading';
  heading.textContent = getText(headingRow);
  moveInstrumentation(getCell(headingRow), heading);
  media.append(heading);

  const form = document.createElement('form');
  form.className = 'contact-form-form';
  form.noValidate = true;
  form.method = 'post';
  if (actionRow) moveInstrumentation(getCell(actionRow), form);

  const action = getText(actionRow);
  if (action) {
    form.action = action;
  } else {
    block.dataset.missingAction = 'true';
    block.dataset.mockIntegration = 'true';
  }

  [
    { ...FIELD_DEFINITIONS[0], row: nameRow },
    { ...FIELD_DEFINITIONS[1], row: emailRow },
    { ...FIELD_DEFINITIONS[2], row: phoneRow },
    { ...FIELD_DEFINITIONS[3], row: companyRow },
    { ...FIELD_DEFINITIONS[4], row: messageRow },
  ].forEach((field) => {
    form.append(createField(field, field.row, idPrefix));
  });

  const submit = document.createElement('button');
  submit.className = 'button primary contact-form-submit';
  submit.type = 'submit';
  submit.textContent = getText(submitRow);
  moveInstrumentation(getCell(submitRow), submit);
  form.append(submit);

  form.addEventListener('invalid', (event) => {
    if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
      setControlValidity(event.target);
    }
  }, true);

  form.addEventListener('input', (event) => {
    if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
      setControlValidity(event.target);
    }
  });

  form.addEventListener('submit', (event) => {
    if (!form.checkValidity()) {
      event.preventDefault();
      focusFirstInvalidField(form);
      return;
    }

    if (!action) {
      event.preventDefault();
      const formData = new FormData(form);
      // eslint-disable-next-line no-console
      console.info('[contact-form:mock]', {
        event: 'submission-completed',
        populatedFields: [...formData.entries()]
          .filter(([, value]) => String(value).trim())
          .map(([name]) => name),
      });
    }
  });

  content.append(media, form);
  block.append(content);
  rows.forEach((row) => row.remove());
}
