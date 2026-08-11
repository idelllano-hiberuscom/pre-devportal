import { loadFragment } from '../fragment/fragment.js';

/**
 * ¿La celda es una ruta de fragmento o el contenido del panel?
 *
 * El contrato modela el segundo campo como `fragmentPath`, pero el contenido migrado lo trae
 * con el texto de la pestaña escrito directamente. Se acepta como ruta únicamente lo que lo
 * parece: un solo token que empieza por `/`. Cualquier otra cosa es el contenido del panel.
 * @param {string} value
 * @returns {boolean}
 */
function isFragmentPath(value) {
  return /^\/\S*$/.test(value);
}

/**
 * loads and decorates the tabs block
 * @param {Element} block The block element
 */
export default function decorate(block) {
  const rows = [...block.children];
  if (!rows.length) return;

  // Cada fila es: row[0]=título, row[1]=ruta de fragmento o contenido en línea
  const tabList = document.createElement('ul');
  tabList.setAttribute('role', 'tablist');
  tabList.className = 'tabs-list';

  const panels = [];
  const cache = new Map();

  rows.forEach((row, i) => {
    const cells = [...row.children];
    const titleEl = cells[0];
    const pathEl = cells[1];
    const cellText = pathEl ? pathEl.textContent.trim() : '';
    const fragmentPath = isFragmentPath(cellText) ? cellText : '';
    const tabId = `tab-${i}`;
    const panelId = `panel-${i}`;

    // Build tab button
    const tab = document.createElement('button');
    tab.setAttribute('role', 'tab');
    tab.setAttribute('id', tabId);
    tab.setAttribute('aria-controls', panelId);
    tab.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
    tab.setAttribute('tabindex', i === 0 ? '0' : '-1');
    tab.textContent = titleEl ? titleEl.textContent.trim() : '';

    const li = document.createElement('li');
    li.setAttribute('role', 'presentation');
    li.append(tab);
    tabList.append(li);

    // Build panel
    const panel = document.createElement('div');
    panel.setAttribute('role', 'tabpanel');
    panel.setAttribute('id', panelId);
    panel.setAttribute('aria-labelledby', tabId);
    panel.setAttribute('aria-live', 'polite');
    panel.hidden = i !== 0;
    panel.dataset.path = fragmentPath;

    /*
     * Contenido en línea: la celda se mueve al panel en lugar de copiarla, para que conserve
     * su instrumentación y siga siendo editable en Universal Editor.
     */
    if (!fragmentPath && pathEl) {
      pathEl.classList.add('tabs-panel-content');
      panel.append(pathEl);
      panel.dataset.loaded = 'inline';
    }

    panels.push(panel);

    // Hide original row
    row.hidden = true;
  });

  block.append(tabList);
  panels.forEach((p) => block.append(p));

  async function loadPanel(panel) {
    const { path } = panel.dataset;
    if (panel.dataset.loaded) return;
    panel.dataset.loaded = 'loading';

    if (!path) {
      panel.dataset.loaded = 'empty';
      const empty = document.createElement('p');
      empty.textContent = '—';
      panel.append(empty);
      return;
    }

    if (cache.has(path)) {
      panel.append(cache.get(path).cloneNode(true));
      panel.dataset.loaded = 'done';
      return;
    }

    try {
      const fragment = await loadFragment(path);
      if (fragment && fragment.children.length) {
        const wrapper = document.createElement('div');
        [...fragment.children].forEach((child) => wrapper.append(child));
        cache.set(path, wrapper.cloneNode(true));
        panel.append(wrapper);
        panel.dataset.loaded = 'done';
      } else {
        panel.dataset.loaded = 'empty';
        const empty = document.createElement('p');
        empty.textContent = '—';
        panel.append(empty);
      }
    } catch {
      panel.dataset.loaded = 'error';
      const err = document.createElement('p');
      err.className = 'tabs-error';
      err.textContent = 'No se ha podido cargar el contenido.';
      const retry = document.createElement('button');
      retry.textContent = 'Reintentar';
      retry.addEventListener('click', () => {
        delete panel.dataset.loaded;
        panel.textContent = '';
        loadPanel(panel);
      });
      panel.append(err, retry);
    }
  }

  const tabs = [...tabList.querySelectorAll('[role="tab"]')];

  function activate(tab) {
    tabs.forEach((t) => {
      const isSelected = t === tab;
      t.setAttribute('aria-selected', String(isSelected));
      t.setAttribute('tabindex', isSelected ? '0' : '-1');
    });
    panels.forEach((panel) => {
      const controlled = panel.id === tab.getAttribute('aria-controls');
      panel.hidden = !controlled;
      if (controlled) loadPanel(panel);
    });
  }

  // Load first panel eagerly
  loadPanel(panels[0]);

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => activate(tab));
    tab.addEventListener('keydown', (e) => {
      let idx = tabs.indexOf(e.currentTarget);
      if (e.key === 'ArrowRight') idx = (idx + 1) % tabs.length;
      else if (e.key === 'ArrowLeft') idx = (idx - 1 + tabs.length) % tabs.length;
      else if (e.key === 'Home') idx = 0;
      else if (e.key === 'End') idx = tabs.length - 1;
      else return;
      e.preventDefault();
      tabs[idx].focus();
    });
  });
}
