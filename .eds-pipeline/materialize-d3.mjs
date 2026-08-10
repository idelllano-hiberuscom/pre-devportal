import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const pipelineDir = path.join(root, '.eds-pipeline');
const proposal = JSON.parse(fs.readFileSync(path.join(root, 'propuesta-componentes.json'), 'utf8'));
const clusters = JSON.parse(fs.readFileSync(path.join(root, 'portal-clusters.json'), 'utf8'));

const componentMeta = {
  'cmp-icon-cards': { ticket: 'PA-31', identity: 'cards--icon-cards', page: '214368257', primary: 'home-help-shared', additional: ['integration-summary'] },
  'cmp-editorial-cards': { ticket: 'PA-33', identity: 'cards--editorial', page: '214073346', primary: 'blog-fraud-shared', additional: [] },
  'cmp-plugin-cards': { ticket: 'PA-32', identity: 'cards--plugins', page: '214237185', primary: 'developer-tools-payment-detail', additional: [] },
  'cmp-logo-cards': { ticket: 'PA-25', identity: 'cards--logos', page: '214302721', primary: 'onboarding-singleton', additional: [] },
  'cmp-accordion': { ticket: 'PA-27', identity: 'accordion', page: '214401025', primary: 'home-help-shared', additional: [] },
  'cmp-tabs': { ticket: 'PA-28', identity: 'tabs', page: '214106113', primary: 'onboarding-singleton', additional: [] },
  'cmp-carousel': { ticket: 'PA-35', identity: 'carousel', page: '214269953', primary: 'integration-summary', additional: [] },
  'cmp-contact-form': { ticket: 'PA-26', identity: 'contact-form', page: '212893697', primary: 'home-help-shared', additional: [] },
  'cmp-video': { ticket: 'PA-29', identity: 'video', page: '214138881', primary: 'home-help-shared', additional: [] },
  'cmp-code-block': { ticket: 'PA-34', identity: 'code-block', page: '214335489', primary: 'integration-summary', additional: ['developer-tools-api-detail'] },
  'cmp-pie-chart': { ticket: 'PA-30', identity: 'pie-chart', page: '214204417', primary: 'blog-fraud-shared', additional: [] },
  'cmp-swagger-console': { ticket: 'PA-24', identity: 'swagger-console', page: '214171649', primary: 'swagger-singleton', additional: [] },
};

const epicMeta = {
  'plugin-integration-detail-a': 'PA-21',
  'developer-tools-payment-detail': 'PA-15',
  'integration-summary': 'PA-19',
  'developer-tools-api-detail': 'PA-18',
  'plugin-payment-detail-b': 'PA-23',
  'no-integration-detail': 'PA-12',
  'home-help-shared': 'PA-17',
  'developer-tools-sdk-moto': 'PA-16',
  'blog-fraud-shared': 'PA-20',
  'onboarding-singleton': 'PA-22',
  'developer-tools-index-singleton': 'PA-13',
  'swagger-singleton': 'PA-14',
};

const cardsComponents = proposal.componentes
  .filter((component) => component.block_name === 'cards')
  .map((component) => component.component_id);
const componentToTicket = new Map(Object.entries(componentMeta).map(([componentId, meta]) => [componentId, meta.ticket]));
const cardsSerialOrder = ['cmp-logo-cards', 'cmp-icon-cards', 'cmp-plugin-cards', 'cmp-editorial-cards'];

const escapeHtml = (value = '') => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;');

const markdownToStorage = (markdown, imageNames) => {
  const confluenceMarkdown = markdown
    .replace(/`?\.\.\/assets\/[^/`\s]+\/([^`\s|]+)`?/g, '`$1`')
    .replace(/`?\.eds-pipeline\/assets\/[^`\s]+`?/g, 'adjuntos de esta página');
  const lines = confluenceMarkdown.split('\n');
  const html = [];
  let inCode = false;
  let code = [];
  let inList = false;
  let index = 0;

  const closeList = () => {
    if (inList) html.push('</ul>');
    inList = false;
  };

  while (index < lines.length) {
    const line = lines[index];
    if (line.startsWith('```')) {
      if (inCode) {
        html.push(`<pre><code>${escapeHtml(code.join('\n'))}</code></pre>`);
        code = [];
      }
      inCode = !inCode;
      index += 1;
      continue;
    }
    if (inCode) {
      code.push(line);
      index += 1;
      continue;
    }
    if (line === '<!-- EDS:IMAGES -->') {
      closeList();
      for (const name of imageNames) {
        html.push(`<ac:image ac:align="center" ac:width="900" ac:alt="${escapeHtml(name)}"><ri:attachment ri:filename="${escapeHtml(name)}" /></ac:image>`);
      }
      index += 1;
      continue;
    }
    if (line.startsWith('|') && index + 1 < lines.length && /^\|[\s|:-]+\|$/.test(lines[index + 1])) {
      closeList();
      const rows = [];
      rows.push(line);
      index += 2;
      while (index < lines.length && lines[index].startsWith('|')) {
        rows.push(lines[index]);
        index += 1;
      }
      html.push('<table><tbody>');
      rows.forEach((row, rowIndex) => {
        const cells = row.split('|').slice(1, -1);
        const tag = rowIndex === 0 ? 'th' : 'td';
        html.push(`<tr>${cells.map((cell) => `<${tag}>${escapeHtml(cell.trim())}</${tag}>`).join('')}</tr>`);
      });
      html.push('</tbody></table>');
      continue;
    }
    if (line.startsWith('# ')) {
      closeList();
      html.push(`<h1>${escapeHtml(line.slice(2))}</h1>`);
    } else if (line.startsWith('## ')) {
      closeList();
      html.push(`<h2>${escapeHtml(line.slice(3))}</h2>`);
    } else if (line.startsWith('### ')) {
      closeList();
      html.push(`<h3>${escapeHtml(line.slice(4))}</h3>`);
    } else if (line.startsWith('- ')) {
      if (!inList) html.push('<ul>');
      inList = true;
      html.push(`<li>${escapeHtml(line.slice(2))}</li>`);
    } else if (line.startsWith('> ')) {
      closeList();
      html.push(`<blockquote><p>${escapeHtml(line.slice(2))}</p></blockquote>`);
    } else if (line.trim()) {
      closeList();
      html.push(`<p>${escapeHtml(line)}</p>`);
    } else {
      closeList();
    }
    index += 1;
  }
  closeList();
  return html.join('');
};

const rgb = (value) => {
  const match = /^rgba?\((\d+),\s*(\d+),\s*(\d+)/.exec(value || '');
  return match ? match.slice(1, 4).map(Number) : null;
};

const luminance = (color) => color
  .map((channel) => channel / 255)
  .map((channel) => (channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4))
  .reduce((total, channel, index) => total + channel * [0.2126, 0.7152, 0.0722][index], 0);

const contrast = (foreground, background) => {
  const fg = rgb(foreground);
  const bg = rgb(background);
  if (!fg || !bg) return null;
  const values = [luminance(fg), luminance(bg)].sort((a, b) => b - a);
  return ((values[0] + 0.05) / (values[1] + 0.05)).toFixed(2);
};

const structuralFragment = (fragment) => fragment
  .replace(/\s+_ng(?:content|host)-[^=]+=""/g, '')
  .replace(/\s+ng-reflect-[^=]+="[^"]*"/g, '')
  .replace(/\s+class="ng-star-inserted"/g, '')
  .replace(/\n\s*\n/g, '\n')
  .slice(0, 6000);

const styleRows = (computed) => {
  const nodes = [computed.root, ...(computed.children || []).slice(0, 12)].filter(Boolean);
  return nodes.map((node) => {
    const selector = `${node.tag}${node.classes ? `.${node.classes.split(/\s+/).join('.')}` : ''}`;
    const properties = Object.entries(node.styles || {}).map(([key, value]) => `${key}: ${value}`).join('; ');
    return `| \`${selector}\` | \`${properties || '⚠️ NO EXTRAÍDO'}\` |`;
  }).join('\n');
};

const contrastRows = (computed) => {
  const nodes = [computed.root, ...(computed.children || [])].filter(Boolean);
  const pairs = nodes.map((node) => {
    const foreground = node.styles?.color;
    const background = node.styles?.['background-color'];
    const ratio = contrast(foreground, background);
    if (!ratio) return null;
    return `- ${node.tag}${node.classes ? `.${node.classes.split(/\s+/)[0]}` : ''}: ${foreground} sobre ${background} = ${ratio}:1.`;
  }).filter(Boolean);
  return pairs.length ? pairs.join('\n') : '- ⚠️ NO EXTRAÍDO — ningún nodo medido contiene simultáneamente color de texto y fondo opaco; no se asume fondo blanco.';
};

const interactionName = (component) => {
  const names = {
    accordion: 'control de apertura',
    tabs: 'tab',
    carousel: 'controles del carrusel',
    'contact-form': 'controles y submit',
    'code-block': 'botón de copia',
    'swagger-console': 'controles de autenticación',
  };
  if (component.component_id === 'cmp-plugin-cards') return 'enlace de tarjeta';
  return names[component.block_name] || null;
};

const interactionContract = (component) => {
  const contracts = {
    'cmp-accordion': {
      rows: [
        ['summary', 'default', 'Item cerrado salvo el item que tenga estado abierto.', 'Patrón accesible Adobe Accordion con details/summary.'],
        ['summary', 'hover', 'Se aplican tokens interactivos existentes del repositorio; no se replica un valor visual no medido.', 'CSS.'],
        ['summary', 'focus-visible', 'Indicador de foco visible con tokens existentes del repositorio.', 'CSS :focus-visible.'],
        ['summary', 'active', 'Alterna exclusivamente el panel asociado.', 'details/summary.'],
        ['summary', 'disabled', 'No existe estado disabled.', '—'],
      ],
      requiresJs: 'No para la apertura básica; se sigue el patrón accesible Adobe Accordion y se preserva la instrumentación EDS/UE.',
    },
    'cmp-tabs': {
      rows: [
        ['tab', 'default', 'Solo un tab tiene aria-selected=true y tabindex=0; los demás tienen tabindex=-1.', 'ARIA tabs roving tabindex.'],
        ['tab', 'hover', 'Se aplican tokens interactivos existentes del repositorio.', 'CSS.'],
        ['tab', 'focus-visible', 'Foco visible sin activar contenido automáticamente.', 'CSS :focus-visible.'],
        ['tab', 'active', 'Activa y muestra el panel asociado; la primera activación carga fragmentPath bajo demanda.', 'JS + fragment EDS.'],
        ['panel', 'loading', 'Muestra estado de carga con aria-live=polite mientras se resuelve el fragmento.', 'JS.'],
        ['panel', 'error', 'Muestra mensaje accesible y permite reintentar una carga fallida.', 'JS.'],
        ['panel', 'empty', 'Muestra estado vacío accesible cuando el fragmento no produce contenido.', 'JS.'],
      ],
      requiresJs: 'Sí: activación, teclado ARIA, carga diferida de fragmentos y caché en memoria.',
    },
    'cmp-code-block': {
      rows: [
        ['botón de copia', 'default', 'Nombre accesible Copiar código.', 'button type=button.'],
        ['botón de copia', 'focus-visible', 'Indicador de foco visible con tokens existentes.', 'CSS :focus-visible.'],
        ['botón de copia', 'active', 'Copia el texto completo y anuncia confirmación sin mover el foco.', 'Clipboard API + aria-live.'],
        ['botón de copia', 'error', 'Anuncia que la copia no pudo completarse.', 'aria-live.'],
        ['botón de copia', 'disabled', 'No existe estado disabled con código válido.', '—'],
      ],
      requiresJs: 'Sí: acción de copia y anuncio accesible del resultado.',
    },
    'cmp-swagger-console': {
      rows: [
        ['bloque', 'configuration-pending', 'Si falta authEndpoint u openApiEndpoint muestra no disponible/configuración pendiente y no realiza peticiones.', 'Guard clause antes de fetch.'],
        ['bloque', 'loading', 'Solo existe después de validar ambos endpoints; anuncia carga sin exponer datos sensibles.', 'JS + aria-live.'],
        ['bloque', 'error', 'Mensaje sanitizado sin secretos, contraseñas, tokens, cookies ni payloads.', 'JS + logging sanitizado.'],
        ['bloque', 'ready', 'Monta la experiencia configurada por los contratos externos.', 'JS.'],
        ['bloque', 'disabled', 'No existe estado disabled; configuration-pending evita toda petición.', '—'],
      ],
      requiresJs: 'Sí: validación de configuración, integración externa y logging diagnóstico sanitizado.',
    },
    'cmp-pie-chart': {
      rows: [
        ['lista de items', 'default', 'La lista HTML visible es la fuente de contenido y fallback.', 'HTML semántico.'],
        ['gráfico', 'render', 'Cada ángulo es value / sum(values); todos los value deben ser mayores que cero.', 'Chart.js 4.x local.'],
        ['gráfico', 'empty', 'Sin items válidos no se crea el gráfico y el resumen textual informa que no hay datos.', 'Validación previa.'],
        ['gráfico', 'color-fallback', 'color vacío usa una paleta determinista por índice.', 'JS.'],
        ['gráfico', 'disabled', 'No existe estado disabled.', '—'],
      ],
      requiresJs: 'Sí: validación de valores, resumen textual y render de Chart.js derivado de la lista HTML.',
    },
  };
  const specific = contracts[component.component_id];
  if (specific) {
    return {
      rows: specific.rows.map((row) => `| ${row.join(' | ')} |`).join('\n'),
      requiresJs: specific.requiresJs,
    };
  }
  const interaction = interactionName(component);
  if (interaction) {
    return {
      rows: `| ${interaction} | default | Usa estructura semántica y tokens existentes del repositorio. | HTML/CSS/JS según la referencia aprobada. |\n| ${interaction} | hover | Usa tokens interactivos existentes; no se inventan valores visuales del portal. | CSS. |\n| ${interaction} | focus-visible | Indicador de foco visible con tokens existentes. | CSS :focus-visible. |\n| ${interaction} | active | Ejecuta únicamente la acción asociada al control. | Patrón accesible aprobado. |\n| ${interaction} | disabled | Solo existe si la semántica del control lo requiere. | Atributo disabled/aria-disabled. |`,
      requiresJs: `Sí cuando ${interaction} requiera comportamiento; no queda una decisión humana pendiente sobre el patrón de interacción.`,
    };
  }
  return {
    rows: '| Componente | default | Sin interacción propia observada. | HTML/CSS |\n| Componente | hover | No existe estado interactivo propio. | — |\n| Componente | focus-visible | No existe control enfocable propio. | — |\n| Componente | active | No existe estado activo propio. | — |\n| Componente | disabled | No existe estado disabled. | — |',
    requiresJs: 'No por interacción propia; la decoración estructural puede seguir requiriendo JS.',
  };
};

const buildContract = (component, meta, evidence, computed, fragment, ambiguities) => {
  const confluenceUrl = `https://hiberus-team-dxp.atlassian.net/wiki/spaces/PA/pages/${meta.page}`;
  const jiraUrl = `https://hiberus-team-dxp.atlassian.net/browse/${meta.ticket}`;
  const breakpointRows = evidence.breakpoints.map((breakpoint) => {
    const componentFile = breakpoint.present ? `../assets/${meta.identity}/${breakpoint.screenshot}` : `ausente por diseño: ${breakpoint.reason || 'motivo no extraído'}`;
    const contextFile = breakpoint.context_screenshot ? `../assets/${meta.identity}/${breakpoint.context_screenshot}` : '⚠️ NO CAPTURADO';
    const dimensions = breakpoint.box ? `${breakpoint.box.width}px × ${breakpoint.box.height}px` : '⚠️ NO EXTRAÍDO';
    return `| ${breakpoint.label} ${breakpoint.width}px | \`${componentFile}\` | \`${contextFile}\` | ${dimensions} | ${breakpoint.above_the_fold ? 'sí' : 'no'} |`;
  }).join('\n');
  const responsive = evidence.breakpoints.map((breakpoint) => {
    if (!breakpoint.present) return `- **${breakpoint.label} ${breakpoint.width}px:** ausente por diseño: ${breakpoint.reason || 'motivo no extraído'}.`;
    return `- **${breakpoint.label} ${breakpoint.width}px:** caja medida ${breakpoint.box.width}px × ${breakpoint.box.height}px; ratio ${breakpoint.ratio}; posición x=${breakpoint.box.x}px, y=${breakpoint.box.y}px.`;
  }).join('\n');
  const mappingRows = component.content_mapping.map((mapping, index) => {
    const notes = [mapping.status && `estado ${mapping.status}`, mapping.source_attribute && `atributo ${mapping.source_attribute}`, mapping.transform && `transformación ${mapping.transform}`, mapping.default_value !== undefined && `valor inicial ${mapping.default_value}`, mapping.note].filter(Boolean).join('; ');
    return `| item/fila ${index} / \`${mapping.target_field}\` | \`${mapping.source_selector}\` | \`${mapping.type}\`${notes ? `; ${notes}` : ''} |`;
  }).join('\n');
  const fields = component.campos_detectados.map((field) => `| ${field.name} | \`${field.name}\` | \`${field.component}\` | \`${field.valueType}\` | ${field.required ? 'sí' : 'no'} | Campo extraído de la propuesta aprobada${field.validation ? `; validación ${field.validation}` : ''}. |`).join('\n');
  const imageFields = component.campos_detectados.filter((field) => field.component === 'reference');
  const images = imageFields.length ? imageFields.map((field) => `| ${field.name} | ${component.content_mapping.find((mapping) => mapping.target_field === field.name)?.source_selector ? 'celda del bloque desde selector del portal' : '⚠️ NO MAPEADO'} | ⚠️ NO EXTRAÍDO — la captura mide el componente, no el asset intrínseco | ⚠️ NO EXTRAÍDO | ${evidence.breakpoints.some((breakpoint) => breakpoint.above_the_fold) ? 'sí, componente above the fold' : 'no'} | Referencia DAM; EDS entrega picture cuando aplique |`).join('\n') : '| No aplica | No hay campos de imagen | — | — | no | — |';
  const interaction = interactionContract(component);
  const interactionLabel = interactionName(component);
  const dependencies = component.depends_on.length ? component.depends_on.map((dependency) => componentToTicket.get(dependency)).join(', ') : 'ninguna';
  const ambiguityRows = ambiguities.length ? ambiguities.map((ambiguity) => `- ⚠️ ${ambiguity}`).join('\n') : '- Ninguna ambigüedad declarada en la propuesta aprobada.';
  const templates = [meta.primary, ...meta.additional];
  const variant = component.variant ? `\n**Variante EDS:** \`${component.variant}\`` : '';
  const repeat = component.is_container ? `\n**Selector repetible del portal:** \`${component.repeat_selector}\`` : '';
  const pattern = component.adobe_reference
    ? `${component.adobe_reference.bloque}: se reutiliza ${component.adobe_reference.que_se_reutiliza}; se adapta ${component.adobe_reference.que_hay_que_adaptar}`
    : `${component.dedup.closest_match}: ${component.dedup.rationale}`;

  return `# Contrato Técnico — ${meta.identity}

> Ticket: ${meta.ticket} (${jiraUrl})   ·   Confluence: ${confluenceUrl}
> component_id: ${component.component_id}   ·   block_name: ${component.block_name}   ·   is_container: ${component.is_container ? 'sí' : 'no'}
> Origen: ${component.evidencia.paginas[0]}   ·   Snapshot: ${proposal.snapshot_date}   ·   Confianza: ${component.confidence_score}
> Evidencia: \`.eds-pipeline/assets/${meta.identity}/\`${variant}${repeat}

---

## 1. Descripción funcional

${component.title} corresponde a \`${component.component_id}\` y se materializa sobre el bloque EDS \`${component.block_name}\`${component.variant ? ` con variante \`${component.variant}\`` : ''}.
El componente aparece ${component.clustering.ocurrencias} veces en el portal; ${component.clustering.ocurrencias_verificadas} apariciones fueron verificadas.
Las páginas observadas son: ${component.evidencia.paginas.join(', ')}.
Las plantillas asociadas son ${templates.join(', ')}; ${meta.primary} es la plantilla primaria de Jira.
${component.justificacion}
Punto de partida: ${pattern}.

**Apariciones en el portal:** ${component.clustering.ocurrencias} — ${component.evidencia.paginas.join(', ')}
**Posición en página:** ${component.evidencia.above_the_fold_desktop ? 'above the fold en desktop' : 'fuera del primer viewport en desktop'}
**Variantes observadas:** ${component.clustering.variantes_detectadas.length ? component.clustering.variantes_detectadas.join(', ') : 'ninguna'}

## 2. Evidencia visual

| Breakpoint | Componente local resoluble | En contexto local resoluble | Medidas del componente | Above the fold |
|---|---|---|---|---|
${breakpointRows}

<!-- EDS:IMAGES -->

**Comportamiento responsivo medido:**

${responsive}

## 3. DOM del portal → DOM de entrada EDS

### 3a. Fragmento real del portal (EVIDENCIA — no escribir selectores contra este DOM)

\`\`\`html
${structuralFragment(fragment)}
\`\`\`

### 3b. DOM DE ENTRADA — matriz EDS (EL CONTRATO)

\`\`\`text
${component.dom_entrada_propuesto}
\`\`\`

### 3c. Mapeo portal → EDS

| Celda/campo EDS | Elemento del portal | Tipo y nota |
|---|---|---|
${mappingRows}

**content_mapping íntegro y vinculante:**

\`\`\`json
${JSON.stringify(component.content_mapping, null, 2)}
\`\`\`

${component.is_container ? `El contribuidor debe iterar \`${component.repeat_selector}\` y aplicar cada entrada de \`content_mapping\` dentro de cada item.` : 'El mapeo se aplica una vez al componente no repetible.'}

### 3d. DOM DE SALIDA — referencia, no contrato de entrada

\`\`\`html
${component.dom_salida_referencia || `<div class="${component.block_name}${component.variant ? ` ${component.variant}` : ''}">
  <div class="${component.block_name}-content"><!-- nodos originales decorados desde la matriz de 3b --></div>
</div>`}
\`\`\`

## 4. Estilos extraídos del portal

Valores medidos en \`.eds-pipeline/assets/${meta.identity}/computed-styles.json\`:

| Elemento medido | Propiedades computadas |
|---|---|
${styleRows(computed)}

**Tokens existentes que deben reutilizarse:** se comparan y reutilizan durante implementación; cualquier valor no medido permanece sujeto a los tokens del repositorio y no a estimación visual.

## 5. Campos editables (Universal Editor)

${component.is_container ? '**Contenedor raíz:** usa `template.filter`; los campos siguientes pertenecen a cada item repetible.' : '**Componente raíz:** campos no repetibles.'}

| Campo | name | component | valueType | Requerido | Descripción para el autor |
|---|---|---|---|---|---|
${fields}

## 6. Imágenes y rendimiento

| Imagen/campo | Origen | Dimensiones intrínsecas | Ratio | LCP | Tratamiento |
|---|---|---|---|---|---|
${images}

- Las dimensiones de la tabla de sección 2 son del recorte del componente, no del asset; no se reutilizan como dimensiones intrínsecas.
- Los estados \`pendiente_dam\` o \`convertir_svg_local_o_dam\` del content_mapping se resuelven como assets locales versionados o DAM autorables antes de contribución.
- Las referencias de imagen deben producir \`<picture>\` optimizado en EDS; no se copian URLs del portal.
${component.component_id === 'cmp-pie-chart' ? '- Chart.js 4.x se distribuye como asset local versionado del repositorio; no se usa CDN, bare import ni dependencia de bundler. El canvas es `aria-hidden="true"` y se deriva después de validar la lista HTML.' : ''}

## 7. Interacciones y estados

| Elemento | Estado | Comportamiento | Implementación |
|---|---|---|---|
${interaction.rows}

**¿Requiere JS?** ${interaction.requiresJs}

## 8. Accesibilidad

- **Nivel objetivo:** WCAG 2.1 AA.
- **Contraste medido cuando hay par explícito color/fondo:**
${contrastRows(computed)}
- **Orden de tabulación:** ${interactionLabel ? `debe seguir el orden DOM de ${interactionLabel}; el patrón accesible aprobado define el foco y la activación.` : 'no añade controles propios al orden de tabulación.'}
- **Etiquetas requeridas:** los campos de imagen requieren alt; los controles requieren nombre accesible visible o equivalente.
- **Problemas del portal original que no se replican:** atributos Angular y custom elements no se trasladan al DOM EDS.
${component.component_id === 'cmp-pie-chart' ? '- **Visualización de datos:** la lista HTML y el resumen textual accesible contienen label y value; la información no depende solo del color; el canvas de Chart.js es decorativo y lleva `aria-hidden="true"`.' : ''}
${component.component_id === 'cmp-tabs' ? '- **Patrón de teclado:** flechas mueven el foco, Home/End saltan al extremo y Enter/Space activan; cada tab controla un panel con identificadores estables.' : ''}
${component.component_id === 'cmp-swagger-console' ? '- **Privacidad diagnóstica:** mensajes y eventos se sanitizan; nunca se registran secretos, contraseñas, tokens, cookies ni payloads sensibles.' : ''}

## 9. Dependencias

- **Depende de:** ${dependencies}.
- **Requerido por:** ningún ticket declarado en la propuesta.
- Las plantillas adicionales (${meta.additional.length ? meta.additional.join(', ') : 'ninguna'}) son asociaciones de alcance, no dependencias técnicas.

## 10. Ambigüedades y decisiones pendientes

${ambiguityRows}
`;
};

for (const directory of ['contracts', 'tickets', 'epics', '.confluence']) {
  fs.mkdirSync(path.join(pipelineDir, directory), { recursive: true });
}

const tickets = [];
for (const component of proposal.componentes) {
  const meta = componentMeta[component.component_id];
  if (!meta) throw new Error(`Missing component metadata: ${component.component_id}`);
  const assetsDir = path.join(pipelineDir, 'assets', meta.identity);
  const evidence = JSON.parse(fs.readFileSync(path.join(assetsDir, 'evidence.json'), 'utf8'));
  const computed = JSON.parse(fs.readFileSync(path.join(assetsDir, 'computed-styles.json'), 'utf8'));
  const fragment = fs.readFileSync(path.join(assetsDir, 'fragment.html'), 'utf8');
  const ambiguities = [...component.ambiguedades];
  const contract = buildContract(component, meta, evidence, computed, fragment, ambiguities);
  const contractPath = path.join(pipelineDir, 'contracts', `${meta.identity}.md`);
  fs.writeFileSync(contractPath, contract, 'utf8');
  const imageNames = evidence.breakpoints.flatMap((breakpoint) => [breakpoint.screenshot, breakpoint.context_screenshot]).filter(Boolean);
  fs.writeFileSync(path.join(pipelineDir, '.confluence', `${meta.identity}.storage.html`), markdownToStorage(contract, imageNames), 'utf8');

  const complete = ambiguities.length === 0;
  const ticket = {
    ticket_id: meta.ticket,
    component_id: component.component_id,
    block_name: component.block_name,
    variant: component.variant || null,
    local_identity: meta.identity,
    title: component.title,
    state: 'draft',
    depends_on: component.depends_on.map((dependency) => componentToTicket.get(dependency)),
    epic: { id: epicMeta[meta.primary], nombre: `Plantilla: ${meta.primary}`, tipo: 'plantilla' },
    templates: { primary: meta.primary, additional: meta.additional },
    confidence_score: component.confidence_score,
    is_container: component.is_container,
    technical_contract: {
      confluence_url: `https://hiberus-team-dxp.atlassian.net/wiki/spaces/PA/pages/${meta.page}`,
      local_path: `.eds-pipeline/contracts/${meta.identity}.md`,
      assets_dir: `.eds-pipeline/assets/${meta.identity}/`,
      breakpoints_capturados: evidence.breakpoints.filter((breakpoint) => breakpoint.present).map((breakpoint) => breakpoint.label),
      completo: complete,
      incomplete_reasons: complete ? [] : ambiguities,
    },
    source: {
      portal_url: proposal.portal_url,
      page_url: component.evidencia.paginas[0],
      pages: component.evidencia.paginas,
      selector: component.evidencia.selector_origen,
      snapshot_date: proposal.snapshot_date,
    },
    dedup: {
      verdict: component.veredicto,
      closest_match: component.dedup.closest_match,
      similarity: component.dedup.similarity,
      rationale: component.dedup.rationale,
    },
    content_mapping: component.content_mapping,
    repeat_selector: component.repeat_selector || null,
    ambiguities,
    business_input_required: !complete,
    collision: component.block_name === 'cards' ? {
      shared_target: 'blocks/cards/*',
      components: cardsComponents,
      status: 'resolved-serial',
      dispatch_safe: true,
      serial_order: cardsSerialOrder.map((componentId) => componentToTicket.get(componentId)),
      resolution: 'Implementación serial sobre un único bloque cards: logos → icon-cards → plugins → editorial.',
    } : null,
    created_by: 'component-architect',
    approved_by: null,
    assigned_to: 'eds-developer',
    branch: null,
    history: [
      { date: proposal.snapshot_date, from: null, to: 'draft', by: 'task-writer', note: 'Creado desde propuesta-componentes.json aprobada en Gate 1' },
      { date: proposal.snapshot_date, from: 'draft', to: 'draft', by: 'task-writer', note: 'Decisiones humanas de Gate 2 aplicadas; el ticket permanece draft pendiente de aprobación explícita.' },
    ],
  };
  fs.writeFileSync(path.join(pipelineDir, 'tickets', `${meta.ticket}.json`), `${JSON.stringify(ticket, null, 2)}\n`, 'utf8');
  tickets.push(ticket);
}

const propagatedByTemplate = clusters.paginas_propagadas.reduce((result, entry) => {
  result[entry.template_id] ||= [];
  result[entry.template_id].push(entry);
  return result;
}, {});
const epics = clusters.clusters.map((cluster) => {
  const propagated = propagatedByTemplate[cluster.template_id]?.length || 0;
  const epic = {
    epic_id: epicMeta[cluster.template_id],
    template_id: cluster.template_id,
    name: `Plantilla: ${cluster.template_id}`,
    state: 'draft',
    pages_matched: cluster.pages_matched,
    pages_analyzed: cluster.pages_matched - propagated,
    pages_propagated: propagated,
    tickets: tickets.filter((ticket) => ticket.templates.primary === cluster.template_id).map((ticket) => ticket.ticket_id),
  };
  fs.writeFileSync(path.join(pipelineDir, 'epics', `${epic.epic_id}.json`), `${JSON.stringify(epic, null, 2)}\n`, 'utf8');
  return epic;
});

const depthFor = (ticket, trail = new Set()) => {
  if (trail.has(ticket.ticket_id)) throw new Error(`Dependency cycle at ${ticket.ticket_id}`);
  if (!ticket.depends_on.length) return 0;
  const nextTrail = new Set(trail).add(ticket.ticket_id);
  return 1 + Math.max(...ticket.depends_on.map((dependency) => depthFor(tickets.find((candidate) => candidate.ticket_id === dependency), nextTrail)));
};
const brokenReferences = tickets.flatMap((ticket) => ticket.depends_on.filter((dependency) => !tickets.some((candidate) => candidate.ticket_id === dependency)).map((dependency) => `${ticket.ticket_id}->${dependency}`));

const index = {
  generated: proposal.snapshot_date,
  client: 'PreDevPortal Cecabank',
  backend: {
    jira_tickets: 'MCP nivel 1',
    confluence_pages: 'MCP nivel 1',
    confluence_attachments: 'pending REST nivel 2',
    jira_attachments: 'pending REST nivel 2',
  },
  gate: 2,
  status: 'awaiting-human-review',
  epics,
  tickets: tickets.map((ticket) => ({
    ticket_id: ticket.ticket_id,
    component_id: ticket.component_id,
    block_name: ticket.block_name,
    variant: ticket.variant,
    local_identity: ticket.local_identity,
    state: ticket.state,
    depends_on: ticket.depends_on,
    epic: ticket.epic.id,
    templates: ticket.templates,
    complete: ticket.technical_contract.completo,
  })),
  reutilizations: proposal.reutilizaciones,
  dag: {
    broken_references: brokenReferences,
    dependency_free: tickets.filter((ticket) => ticket.depends_on.length === 0).map((ticket) => ticket.ticket_id),
    max_depth: Math.max(...tickets.map((ticket) => depthFor(ticket))),
  },
  cards_collision: {
    block_name: 'cards',
    shared_target: 'blocks/cards/*',
    tickets: tickets.filter((ticket) => ticket.block_name === 'cards').map((ticket) => ticket.ticket_id),
    identities: tickets.filter((ticket) => ticket.block_name === 'cards').map((ticket) => ticket.local_identity),
    status: 'resolved-serial',
    dispatch_safe: true,
    serial_order: cardsSerialOrder.map((componentId) => componentToTicket.get(componentId)),
    resolution: 'PA-25 es la base; PA-31 espera PA-25; PA-32 espera PA-31; PA-33 espera PA-32.',
  },
};

fs.writeFileSync(path.join(pipelineDir, 'index.json'), `${JSON.stringify(index, null, 2)}\n`, 'utf8');
console.log(JSON.stringify({ contracts: tickets.length, tickets: tickets.length, epics: epics.length, incomplete: tickets.filter((ticket) => !ticket.technical_contract.completo).length }, null, 2));