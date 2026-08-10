const LANGUAGE_LABELS = {
  html: 'HTML',
  javascript: 'JavaScript',
  json: 'JSON',
  shell: 'Shell',
  text: 'Text',
  xml: 'XML',
};

const LANGUAGE_ALIASES = {
  bash: 'shell',
  console: 'shell',
  curl: 'shell',
  htm: 'html',
  js: 'javascript',
  plaintext: 'text',
  shell: 'shell',
  sh: 'shell',
  txt: 'text',
};

const GENERIC_LANGUAGE_TOKENS = new Set([
  'block',
  'code',
  'custom',
  'hljs',
  'line',
  'lines',
  'numbers',
]);

function isGenericLanguageToken(token) {
  return token.split(/[-_]/).every((part) => !part || GENERIC_LANGUAGE_TOKENS.has(part));
}

function normalizeLanguage(value = '') {
  const normalizedValue = value.toLowerCase().trim();
  if (!normalizedValue) return 'text';

  const tokens = normalizedValue.match(/[a-z0-9#+-]+/g) || [];
  const languageToken = tokens.find((token) => {
    if (token.startsWith('language-')) return true;
    if (token.startsWith('lang-')) return true;
    return LANGUAGE_LABELS[token] || LANGUAGE_ALIASES[token];
  });

  if (languageToken?.startsWith('language-')) {
    return normalizeLanguage(languageToken.replace('language-', ''));
  }

  if (languageToken?.startsWith('lang-')) {
    return normalizeLanguage(languageToken.replace('lang-', ''));
  }

  if (languageToken && LANGUAGE_ALIASES[languageToken]) {
    return LANGUAGE_ALIASES[languageToken];
  }

  if (languageToken && LANGUAGE_LABELS[languageToken]) {
    return languageToken;
  }

  const fallbackToken = tokens.find((token) => !isGenericLanguageToken(token));
  return fallbackToken || 'text';
}

function formatLanguage(language) {
  if (LANGUAGE_LABELS[language]) return LANGUAGE_LABELS[language];

  return language
    .split(/[-_]/)
    .filter(Boolean)
    .map((token) => (token.length <= 3 ? token.toUpperCase() : `${token[0].toUpperCase()}${token.slice(1)}`))
    .join(' ');
}

function normalizeCode(value = '') {
  return value
    .replace(/\r\n?/g, '\n')
    .replace(/\u00a0/g, ' ')
    .replace(/^\n+|\n+$/g, '');
}

function announceStatus(liveRegion, message) {
  liveRegion.textContent = '';
  window.setTimeout(() => {
    liveRegion.textContent = message;
  }, 0);
}

function fallbackCopy(text) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.append(textarea);
  textarea.select();
  textarea.setSelectionRange(0, textarea.value.length);
  const copied = document.execCommand('copy');
  textarea.remove();

  if (!copied) {
    throw new Error('Copy command failed');
  }
}

function copyCode(text) {
  if (navigator.clipboard?.writeText) {
    return navigator.clipboard.writeText(text);
  }

  return new Promise((resolve, reject) => {
    try {
      fallbackCopy(text);
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}

function createCopyIcon() {
  const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  icon.setAttribute('viewBox', '0 0 24 24');
  icon.setAttribute('fill', 'none');
  icon.setAttribute('stroke', 'currentColor');
  icon.setAttribute('stroke-width', '2');
  icon.setAttribute('stroke-linecap', 'round');
  icon.setAttribute('stroke-linejoin', 'round');
  icon.setAttribute('aria-hidden', 'true');
  icon.setAttribute('focusable', 'false');

  const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  rect.setAttribute('x', '8');
  rect.setAttribute('y', '8');
  rect.setAttribute('width', '14');
  rect.setAttribute('height', '14');
  rect.setAttribute('rx', '2');
  rect.setAttribute('ry', '2');

  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', 'M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2');

  icon.append(rect, path);
  return icon;
}

function buildCodeLines(codeText) {
  const list = document.createElement('ol');
  list.className = 'code-block-lines';

  codeText.split('\n').forEach((line) => {
    const item = document.createElement('li');
    const content = document.createElement('span');
    content.className = 'code-block-line';
    content.textContent = line || ' ';
    item.append(content);
    list.append(item);
  });

  return list;
}

export default function decorate(block) {
  const rows = [...block.children];
  const [titleRow, languageRow, codeRow] = rows;
  const titleCell = titleRow?.firstElementChild;
  const languageCell = languageRow?.firstElementChild;
  const codeCell = codeRow?.firstElementChild;

  if (!languageCell || !codeCell) return;

  const title = titleCell?.textContent.trim() || '';
  const language = normalizeLanguage(languageCell.textContent);
  const codeText = normalizeCode(codeCell.textContent);

  const content = document.createElement('div');
  content.className = 'code-block-content';

  const header = document.createElement('div');
  header.className = 'code-block-header';

  const meta = document.createElement('div');
  meta.className = 'code-block-meta';

  if (titleCell && title) {
    titleCell.className = 'code-block-title';
    titleCell.textContent = title;
    meta.append(titleCell);
  }

  languageCell.className = 'code-block-language';
  languageCell.textContent = formatLanguage(language);
  meta.append(languageCell);

  const actions = document.createElement('div');
  actions.className = 'code-block-actions';

  const liveRegion = document.createElement('span');
  liveRegion.className = 'code-block-status';
  liveRegion.setAttribute('aria-live', 'polite');
  liveRegion.setAttribute('aria-atomic', 'true');

  const copyButton = document.createElement('button');
  copyButton.className = 'code-block-copy';
  copyButton.type = 'button';
  copyButton.setAttribute('aria-label', 'Copiar código');
  copyButton.append(createCopyIcon());
  copyButton.addEventListener('click', () => {
    copyCode(codeText)
      .then(() => announceStatus(liveRegion, 'Código copiado'))
      .catch(() => announceStatus(liveRegion, 'No se pudo copiar el código'));
  });

  actions.append(copyButton, liveRegion);
  header.append(meta, actions);

  codeCell.className = 'code-block-body';
  codeCell.textContent = '';

  const pre = document.createElement('pre');
  pre.className = 'code-block-pre';

  const code = document.createElement('code');
  code.className = `code-block-code language-${language}`;
  code.append(buildCodeLines(codeText || ''));

  pre.append(code);
  codeCell.append(pre);
  content.append(header, codeCell);

  rows.forEach((row) => row.remove());
  block.append(content);
}
