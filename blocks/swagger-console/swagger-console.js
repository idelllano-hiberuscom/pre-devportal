import { readBlockConfig } from '../../scripts/aem.js';

const ORDERED_FIELDS = [
  'backgroundImage',
  'recoveryLink',
  'registerLink',
  'endpoints',
];

const sanitizeUrl = (value) => {
  if (!value || typeof value !== 'string') return '';
  try {
    const parsed = new URL(value, window.location.href);
    if (parsed.protocol === 'http:' || parsed.protocol === 'https:') {
      return parsed.href;
    }
  } catch (e) {
    return '';
  }
  return '';
};

const getCell = (row) => {
  const children = [...row.children];
  if (children.length > 1) return children[1];
  return children[0] || row;
};

const extractCellValue = (row, fieldName) => {
  const cell = getCell(row);
  if (!cell) return '';
  if (fieldName === 'backgroundImage') {
    const image = cell.querySelector('img');
    if (image?.src) return image.src;
  }
  const link = cell.querySelector('a');
  if (link) return link.href;
  return cell.textContent.trim();
};

const readSwaggerConfig = (block) => {
  const rows = [...block.querySelectorAll(':scope > div')];
  const hasLabels = rows.every((row) => row.children.length > 1);
  if (hasLabels) return readBlockConfig(block);
  return rows.reduce((config, row, index) => {
    const fieldName = ORDERED_FIELDS[index];
    if (!fieldName) return config;
    config[fieldName] = extractCellValue(row, fieldName);
    return config;
  }, {});
};

const createLabeledInput = (labelText, type, name) => {
  const wrapper = document.createElement('label');
  wrapper.className = 'swagger-console-field';
  const label = document.createElement('span');
  label.textContent = labelText;
  const input = document.createElement('input');
  input.type = type;
  input.name = name;
  input.required = true;
  input.autocomplete = name === 'email' ? 'email' : 'current-password';
  wrapper.append(label, input);
  return { wrapper, input };
};

const setState = (block, statusEl, state, message) => {
  block.dataset.state = state;
  if (message) statusEl.textContent = message;
};

export default function decorate(block) {
  const config = readSwaggerConfig(block);
  let authEndpoint = sanitizeUrl(config.authendpoint || config.authEndpoint || '');
  let openApiEndpoint = sanitizeUrl(config.openapiendpoint || config.openApiEndpoint || '');
  const endpointsRaw = config.endpoints || '';
  if ((!authEndpoint || !openApiEndpoint) && endpointsRaw) {
    try {
      const parsed = JSON.parse(endpointsRaw);
      authEndpoint = authEndpoint || sanitizeUrl(parsed.authEndpoint || '');
      openApiEndpoint = openApiEndpoint || sanitizeUrl(parsed.openApiEndpoint || '');
    } catch (e) {
      const [auth, openapi] = endpointsRaw.split(',').map((item) => item.trim());
      authEndpoint = authEndpoint || sanitizeUrl(auth);
      openApiEndpoint = openApiEndpoint || sanitizeUrl(openapi);
    }
  }
  const backgroundImage = sanitizeUrl(config.backgroundimage || config.backgroundImage || '');
  const recoveryLink = sanitizeUrl(config.recoverylink || config.recoveryLink || '/recovery');
  const registerLink = sanitizeUrl(config.registerlink || config.registerLink || '/register');

  const content = document.createElement('div');
  content.className = 'swagger-console-content';
  const source = document.createElement('div');
  source.className = 'swagger-console-source';
  source.hidden = true;
  while (block.firstChild) {
    source.append(block.firstChild);
  }

  const loginContainer = document.createElement('div');
  loginContainer.className = 'swagger-console-login';
  if (backgroundImage) {
    loginContainer.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url("${backgroundImage}")`;
  }

  const form = document.createElement('form');
  form.className = 'swagger-console-form';
  form.noValidate = true;

  const { wrapper: emailWrapper, input: emailInput } = createLabeledInput('Email', 'email', 'email');
  const { wrapper: passwordWrapper, input: passwordInput } = createLabeledInput('Contraseña', 'password', 'password');
  const submitButton = document.createElement('button');
  submitButton.type = 'submit';
  submitButton.className = 'swagger-console-submit';
  submitButton.textContent = 'Entrar';

  const hintLink = document.createElement('a');
  hintLink.className = 'swagger-console-hint';
  hintLink.href = recoveryLink;
  hintLink.textContent = '¿Has olvidado tu contraseña?';

  const registerText = document.createElement('p');
  registerText.className = 'swagger-console-register';
  const registerPrefix = document.createElement('span');
  registerPrefix.textContent = '¿No tienes una cuenta? ';
  const registerAnchor = document.createElement('a');
  registerAnchor.href = registerLink;
  registerAnchor.textContent = 'Regístrate';
  registerText.append(registerPrefix, registerAnchor);

  const status = document.createElement('p');
  status.className = 'swagger-console-status';
  status.setAttribute('aria-live', 'polite');

  const frame = document.createElement('iframe');
  frame.className = 'swagger-console-frame';
  frame.hidden = true;
  frame.title = 'Swagger Console';
  frame.loading = 'lazy';
  frame.referrerPolicy = 'no-referrer';

  form.append(emailWrapper, passwordWrapper, hintLink, submitButton);
  loginContainer.append(form, registerText, status);
  content.append(loginContainer, frame);
  block.append(content);
  block.append(source);

  if (!authEndpoint || !openApiEndpoint) {
    setState(block, status, 'configuration-pending', 'Configuración pendiente para la consola de API.');
    submitButton.disabled = true;
    return;
  }

  setState(block, status, 'ready', 'Inicia sesión para cargar la consola de API.');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    setState(block, status, 'loading', 'Cargando consola de API...');
    submitButton.disabled = true;
    try {
      const authResponse = await fetch(authEndpoint, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: emailInput.value,
          password: passwordInput.value,
        }),
      });
      if (!authResponse.ok) throw new Error('AUTH_FAILED');

      frame.src = openApiEndpoint;
      frame.hidden = false;
      setState(block, status, 'ready', 'Consola de API cargada.');
    } catch (e) {
      setState(block, status, 'error', 'No se pudo cargar la consola de API.');
    } finally {
      submitButton.disabled = false;
      passwordInput.value = '';
    }
  });
}
