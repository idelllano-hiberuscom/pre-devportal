# Contrato Técnico — pie-chart

> Ticket: PA-30 (https://hiberus-team-dxp.atlassian.net/browse/PA-30)   ·   Confluence: https://hiberus-team-dxp.atlassian.net/wiki/spaces/PA/pages/214204417
> component_id: cmp-pie-chart   ·   block_name: pie-chart   ·   is_container: sí
> Origen: https://pre-devportaltpv.cloud.cecabank.es/fraude   ·   Snapshot: 2026-08-10   ·   Confianza: 0.72
> Evidencia: `.eds-pipeline/assets/pie-chart/`
**Selector repetible del portal:** `.pie-chart__list > component-wrapper`

---

## 1. Descripción funcional

Pie Chart corresponde a `cmp-pie-chart` y se materializa sobre el bloque EDS `pie-chart`.
El componente aparece 1 veces en el portal; 1 apariciones fueron verificadas.
Las páginas observadas son: https://pre-devportaltpv.cloud.cecabank.es/fraude.
Las plantillas asociadas son blog-fraud-shared; blog-fraud-shared es la plantilla primaria de Jira.
Seis items comparten icono, titulo y lista; ademas alimentan un grafico circular y una leyenda. Se mantiene separado por visualizacion de datos, no por estilo.
Punto de partida: cards (local): Comparte items repetibles, pero el grafico sincronizado, leyenda y asignacion de segmentos son comportamiento estructural ausente en cards..

**Apariciones en el portal:** 1 — https://pre-devportaltpv.cloud.cecabank.es/fraude
**Posición en página:** fuera del primer viewport en desktop
**Variantes observadas:** ninguna

## 2. Evidencia visual

| Breakpoint | Componente local resoluble | En contexto local resoluble | Medidas del componente | Above the fold |
|---|---|---|---|---|
| desktop 1440px | `../assets/pie-chart/desktop.png` | `../assets/pie-chart/desktop-context.jpg` | 1440px × 608px | no |
| tablet 768px | `../assets/pie-chart/tablet.png` | `../assets/pie-chart/tablet-context.jpg` | 768px × 1876px | no |
| mobile 375px | `../assets/pie-chart/mobile.png` | `../assets/pie-chart/mobile-context.jpg` | 375px × 1443px | no |

<!-- EDS:IMAGES -->

**Comportamiento responsivo medido:**

- **desktop 1440px:** caja medida 1440px × 608px; ratio 2.37; posición x=0px, y=1197px.
- **tablet 768px:** caja medida 768px × 1876px; ratio 0.41; posición x=0px, y=1245px.
- **mobile 375px:** caja medida 375px × 1443px; ratio 0.26; posición x=0px, y=993px.

## 3. DOM del portal → DOM de entrada EDS

### 3a. Fragmento real del portal (EVIDENCIA — no escribir selectores contra este DOM)

```html
<div class="pie-chart">
  <div class="pie-chart__container">
    <svg width="641" height="641" viewBox="0 0 641 641" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g filter="url(#filter0_dd_2855_9105)">
    <path d="M320.603 10.2942C373.609 10.2942 425.681 24.2497 471.582 50.7574C517.484 77.2651 555.597 115.391 582.091 161.301L396.435 268.437C388.752 255.123 377.699 244.067 364.387 236.38C351.076 228.693 335.975 224.645 320.603 224.645V10.2942Z" fill="var(--segment1-color)"></path>
    <path d="M583.06 461.401C556.864 507.481 518.998 545.852 473.268 572.656C427.539 599.46 375.559 613.752 322.554 614.094L321.169 399.747C336.54 399.648 351.615 395.504 364.876 387.73C378.138 379.957 389.119 368.83 396.716 355.466L583.06 461.401Z" fill="var(--segment2-color)"></path>
    <path d="M582.135 463.017C608.615 417.1 622.539 365.02 622.506 312.014C622.474 259.008 608.487 206.945 581.951 161.059L396.394 268.367C404.09 281.674 408.146 296.772 408.155 312.144C408.165 327.516 404.127 342.619 396.448 355.935L582.135 463.017Z" fill="var(--segment3-color)"></path>
    <path d="M320.577 10.2942C267.572 10.2942 215.5 24.2497 169.598 50.7574C123.697 77.2651 85.5832 115.391 59.0899 161.301L244.746 268.437C252.429 255.123 263.482 244.067 276.793 236.38C290.105 228.693 305.206 224.645 320.577 224.645V10.2942Z" fill="var(--segment4-color)"></path>
    <path d="M58.1204 461.401C84.6614 508.088 123.176 546.851 169.691 573.691C216.207 600.531 269.04 614.478 322.742 614.093L321.205 399.747C305.631 399.859 290.31 395.814 276.82 388.03C263.331 380.247 252.162 369.006 244.465 355.466L58.1204 461.401Z" fill="var(--segment5-color)"></path>
    <path d="M59.0456 463.017C32.5658 417.1 18.642 365.02 18.6743 312.014C18.7065 259.008 32.6936 206.945 59.2292 161.059L244.786 268.367C237.091 281.674 233.035 296.772 233.025 312.144C233.016 327.516 237.054 342.619 244.733 355.935L59.0456 463.017Z" fill="var(--segment6-color)"></path>
    <g filter="url(#filter1_dd_2855_9105)">
    <path d="M347.914 62.501C383.345 62.501 418.153 71.8295 448.836 89.5486C479.519 107.268 504.996 132.753 522.705 163.441L398.603 235.057C393.467 226.157 386.079 218.767 377.181 213.628C368.283 208.49 358.189 205.784 347.914 205.784V62.501Z" fill="white" fill-opacity="0.3" shape-rendering="crispEdges"></path>
    </g>
    <g filter="url(#filter2_dd_2855_9105)">
    <path d="M523.353 461.538C505.842 492.34 480.531 517.989 449.963 535.906C419.395 553.823 384.649 563.376 349.218 563.605L348.292 420.325C358.567 420.259 368.643 417.488 377.508 412.292C386.373 407.096 393.713 399.658 398.791 390.725L523.353 461.538Z" fill="white" fill-opacity="0.3" shape-rendering="crispEdges"></path>
    </g>
    <g filter="url(#filter3_dd_2855_9105)">
    <path d="M551.829 413.013C569.53 382.319 578.837 347.506 578.816 312.075C578.794 276.643 569.444 241.841 551.707 211.169L427.671 282.899C432.815 291.794 435.526 301.886 435.533 312.162C435.539 322.437 432.84 332.533 427.706 341.434L551.829 413.013Z" fill="white" fill-opacity="0.3" shape-rendering="crispEdges"></path>
    </g>
    <g filter="url(#filter4_dd_2855_9105)">
    <path d="M291.306 62.501C255.874 62.501 221.067 71.8295 190.384 89.5486C159.701 107.268 134.224 132.753 116.515 163.441L240.617 235.057C245.752 226.157 253.141 218.767 262.039 213.628C270.937 208.49 281.031 205.784 291.306 205.784V62.501Z" fill="white" fill-opacity="0.3" shape-rendering="crispEdges"></path>
    </g>
    <g filter="url(#filter5_dd_2855_9105)">
    <path d="M117.932 463.347C135.673 494.555 161.418 520.466 192.512 538.407C223.605 556.349 258.921 565.671 294.819 565.414L293.791 422.134C283.381 422.209 273.139 419.505 264.122 414.302C255.105 409.099 247.639 401.585 242.494 392.535L117.932 463.347Z" fill="white" fill-opacity="0.3" shape-rendering="crispEdges"></path>
    </g>
    <g filter="url(#filter6_dd_2855_9105)">
    <path d="M89.3777 413.013C71.6772 382.319 62.3699 347.506 62.3914 312.075C62.413 276.643 71.7627 241.841 89.5004 211.169L213.536 282.899C208.392 291.794 205.681 301.886 205.675 312.162C205.668 322.437 208.367 332.533 213.501 341.434L89.3777 413.013Z" fill="white" fill-opacity="0.3" shape-rendering="crispEdges"></path>
    </g>
    <rect x="316.958" y="10.377" width="7.23841" height="214.333" fill="white"></rect>
    <rect x="319.032" y="399.489" width="7.23841" height="214.612" fill="white"></rect>
    <rect x="394.7" y="358.846" width="7.23841" height="214.612" transform="rotate(-60.0376 394.7 358.846)" fill="white"></rect>
    <rect x="57.1494" y="164.437" width="7.23841" height="214.612" transform="rotate(-60.0376 57.1494 164.437)" fill="white"></rect>
    <rect width="7.23841" height="214.612" transform="matrix(-0.499432 -0.866353 -0.866353 0.499432 246.711 358.969)" fill="white"></rect>
    <rect width="7.23841" height="214.612" transform="matrix(-0.499432 -0.866353 -0.866353 0.499432 584.105 164.414)" fill="white"></rect>
    </g>
    <defs>
    <filter id="filter0_dd_2855_9105" x="0.673828" y="0.294189" width="639.833" height="639.806" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
    <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix>
    <feOffset dy="4"></feOffset>
    <feGaussianBlur stdDeviation="2"></feGaussianBlur>
    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0"></feColorMatrix>
    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2855_9105"></feBlend>
    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix>
    <feMorphology radius="6" operator="dilate" in="SourceAlpha" result="effect2_dropShadow_2855_9105"></feMorphology>
    <feOffset dy="8"></feOffset>
    <feGaussianBlur stdDeviation="6"></feGaussianBlur>
    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"></feColor
```

### 3b. DOM DE ENTRADA — matriz EDS (EL CONTRATO)

```text
pie-chart (template.filter: pie-chart)
  pie-chart-item* (cardinalidad ilimitada)
    title (text, requerido)
    value (number, requerido, >0)
    color (text/color UE, opcional)
    icon + iconAlt (reference/text, opcionales)
    details (richtext, opcional)
```

### 3c. Mapeo portal → EDS

| Celda/campo EDS | Elemento del portal | Tipo y nota |
|---|---|---|
| item/fila 0 / `icon` | `.pie-chart__list .pie-chart-slice__icon svg` | `image`; estado convertir_svg_local_o_dam; transformación sanitizar_svg_y_conservar_viewBox |
| item/fila 1 / `iconAlt` | `.pie-chart__list .pie-chart-slice__icon svg` | `text`; atributo aria-label|title |
| item/fila 2 / `title` | `.pie-chart__list .pie-chart-slice__details__title` | `text` |
| item/fila 3 / `value` | `.pie-chart__list > component-wrapper` | `text`; transformación constant; valor inicial 1; El portal original no expone pesos; 1 solo reproduce los seis sectores iguales como contenido inicial migrado. |
| item/fila 4 / `details` | `.pie-chart__list .pie-chart-slice__details__list` | `richtext` |

**content_mapping íntegro y vinculante:**

```json
[
  {
    "source_selector": ".pie-chart__list .pie-chart-slice__icon svg",
    "target_field": "icon",
    "type": "image",
    "status": "convertir_svg_local_o_dam",
    "transform": "sanitizar_svg_y_conservar_viewBox"
  },
  {
    "source_selector": ".pie-chart__list .pie-chart-slice__icon svg",
    "target_field": "iconAlt",
    "type": "text",
    "source_attribute": "aria-label|title",
    "fallback": "derivar_del_title_y_contexto_del_item"
  },
  {
    "source_selector": ".pie-chart__list .pie-chart-slice__details__title",
    "target_field": "title",
    "type": "text"
  },
  {
    "source_selector": ".pie-chart__list > component-wrapper",
    "target_field": "value",
    "type": "text",
    "transform": "constant",
    "default_value": 1,
    "note": "El portal original no expone pesos; 1 solo reproduce los seis sectores iguales como contenido inicial migrado."
  },
  {
    "source_selector": ".pie-chart__list .pie-chart-slice__details__list",
    "target_field": "details",
    "type": "richtext"
  }
]
```

El contribuidor debe iterar `.pie-chart__list > component-wrapper` y aplicar cada entrada de `content_mapping` dentro de cada item.

### 3d. DOM DE SALIDA — referencia, no contrato de entrada

```html
<div class="pie-chart">
  <div class="pie-chart-visual">
    <canvas aria-hidden="true"></canvas>
    <p class="pie-chart-summary"><!-- resumen textual accesible calculado --></p>
  </div>
  <ul class="pie-chart-items">
    <li class="pie-chart-item"><!-- title, value, icon/iconAlt y details originales --></li>
  </ul>
</div>
```

## 4. Estilos extraídos del portal

Valores medidos en `.eds-pipeline/assets/pie-chart/computed-styles.json`:

| Elemento medido | Propiedades computadas |
|---|---|
| `div.pie-chart` | `display: block; width: 1440px; height: 608px; margin: 80px 0px 192px; color: rgba(0, 0, 0, 0.87); font-family: Poppins, sans-serif; font-size: 16px; line-height: 24px; border: 0px none rgba(0, 0, 0, 0.87)` |
| `ul.pie-chart-slice__details__list` | `display: block; width: 480px; height: 96px; color: rgb(119, 119, 123); font-family: Poppins, sans-serif; font-size: 16px; line-height: 32px; text-align: end; border: 0px none rgb(119, 119, 123)` |
| `li.pie-chart-slice__list__item.ng-star-inserted` | `display: list-item; width: 480px; height: 32px; color: rgb(118, 118, 122); font-family: Poppins, sans-serif; font-size: 16px; line-height: 32px; text-align: end; border: 0px none rgb(118, 118, 122)` |
| `li.pie-chart-slice__list__item.ng-star-inserted` | `display: list-item; width: 480px; height: 32px; color: rgb(118, 118, 122); font-family: Poppins, sans-serif; font-size: 16px; line-height: 32px; text-align: end; border: 0px none rgb(118, 118, 122)` |
| `li.pie-chart-slice__list__item.ng-star-inserted` | `display: list-item; width: 480px; height: 32px; color: rgb(118, 118, 122); font-family: Poppins, sans-serif; font-size: 16px; line-height: 32px; text-align: end; border: 0px none rgb(118, 118, 122)` |
| `ul.pie-chart-slice__details__list` | `display: block; width: 480px; height: 32px; color: rgb(119, 119, 123); font-family: Poppins, sans-serif; font-size: 16px; line-height: 32px; text-align: end; border: 0px none rgb(119, 119, 123)` |
| `li.pie-chart-slice__list__item.ng-star-inserted` | `display: list-item; width: 480px; height: 32px; color: rgb(118, 118, 122); font-family: Poppins, sans-serif; font-size: 16px; line-height: 32px; text-align: end; border: 0px none rgb(118, 118, 122)` |
| `ul.pie-chart-slice__details__list` | `display: block; width: 480px; height: 32px; color: rgb(119, 119, 123); font-family: Poppins, sans-serif; font-size: 16px; line-height: 32px; text-align: end; border: 0px none rgb(119, 119, 123)` |
| `li.pie-chart-slice__list__item.ng-star-inserted` | `display: list-item; width: 480px; height: 32px; color: rgb(118, 118, 122); font-family: Poppins, sans-serif; font-size: 16px; line-height: 32px; text-align: end; border: 0px none rgb(118, 118, 122)` |
| `ul.pie-chart-slice__details__list` | `display: block; width: 480px; height: 32px; color: rgb(119, 119, 123); font-family: Poppins, sans-serif; font-size: 16px; line-height: 32px; border: 0px none rgb(119, 119, 123)` |
| `li.pie-chart-slice__list__item.ng-star-inserted` | `display: list-item; width: 480px; height: 32px; color: rgb(118, 118, 122); font-family: Poppins, sans-serif; font-size: 16px; line-height: 32px; border: 0px none rgb(118, 118, 122)` |
| `ul.pie-chart-slice__details__list` | `display: block; width: 480px; height: 32px; color: rgb(119, 119, 123); font-family: Poppins, sans-serif; font-size: 16px; line-height: 32px; border: 0px none rgb(119, 119, 123)` |
| `li.pie-chart-slice__list__item.ng-star-inserted` | `display: list-item; width: 480px; height: 32px; color: rgb(118, 118, 122); font-family: Poppins, sans-serif; font-size: 16px; line-height: 32px; border: 0px none rgb(118, 118, 122)` |

**Tokens existentes que deben reutilizarse:** se comparan y reutilizan durante implementación; cualquier valor no medido permanece sujeto a los tokens del repositorio y no a estimación visual.

## 5. Campos editables (Universal Editor)

**Contenedor raíz:** usa `template.filter`; los campos siguientes pertenecen a cada item repetible.

| Campo | name | component | valueType | Requerido | Descripción para el autor |
|---|---|---|---|---|---|
| title | `title` | `text` | `string` | sí | Campo extraído de la propuesta aprobada. |
| value | `value` | `number` | `number` | sí | Campo extraído de la propuesta aprobada; validación >0. |
| color | `color` | `text` | `string` | no | Campo extraído de la propuesta aprobada. |
| icon | `icon` | `reference` | `string` | no | Campo extraído de la propuesta aprobada. |
| iconAlt | `iconAlt` | `text` | `string` | no | Campo extraído de la propuesta aprobada. |
| details | `details` | `richtext` | `string` | no | Campo extraído de la propuesta aprobada. |

## 6. Imágenes y rendimiento

| Imagen/campo | Origen | Dimensiones intrínsecas | Ratio | LCP | Tratamiento |
|---|---|---|---|---|---|
| icon | celda del bloque desde selector del portal | ⚠️ NO EXTRAÍDO — la captura mide el componente, no el asset intrínseco | ⚠️ NO EXTRAÍDO | no | Referencia DAM; EDS entrega picture cuando aplique |

- Las dimensiones de la tabla de sección 2 son del recorte del componente, no del asset; no se reutilizan como dimensiones intrínsecas.
- Los estados `pendiente_dam` o `convertir_svg_local_o_dam` del content_mapping se resuelven como assets locales versionados o DAM autorables antes de contribución.
- Las referencias de imagen deben producir `<picture>` optimizado en EDS; no se copian URLs del portal.
- Chart.js 4.x se distribuye como asset local versionado del repositorio; no se usa CDN, bare import ni dependencia de bundler. El canvas es `aria-hidden="true"` y se deriva después de validar la lista HTML.

## 7. Interacciones y estados

| Elemento | Estado | Comportamiento | Implementación |
|---|---|---|---|
| lista de items | default | La lista HTML visible es la fuente de contenido y fallback. | HTML semántico. |
| gráfico | render | Cada ángulo es value / sum(values); todos los value deben ser mayores que cero. | Chart.js 4.x local. |
| gráfico | empty | Sin items válidos no se crea el gráfico y el resumen textual informa que no hay datos. | Validación previa. |
| gráfico | color-fallback | color vacío usa una paleta determinista por índice. | JS. |
| gráfico | disabled | No existe estado disabled. | — |

**¿Requiere JS?** Sí: validación de valores, resumen textual y render de Chart.js derivado de la lista HTML.

## 8. Accesibilidad

- **Nivel objetivo:** WCAG 2.1 AA.
- **Contraste medido cuando hay par explícito color/fondo:**
- ⚠️ NO EXTRAÍDO — ningún nodo medido contiene simultáneamente color de texto y fondo opaco; no se asume fondo blanco.
- **Orden de tabulación:** no añade controles propios al orden de tabulación.
- **Etiquetas requeridas:** los campos de imagen requieren alt; los controles requieren nombre accesible visible o equivalente.
- **Problemas del portal original que no se replican:** atributos Angular y custom elements no se trasladan al DOM EDS.
- **Visualización de datos:** la lista HTML y el resumen textual accesible contienen label y value; la información no depende solo del color; el canvas de Chart.js es decorativo y lleva `aria-hidden="true"`.



## 9. Dependencias

- **Depende de:** ninguna.
- **Requerido por:** ningún ticket declarado en la propuesta.
- Las plantillas adicionales (ninguna) son asociaciones de alcance, no dependencias técnicas.

## 10. Ambigüedades y decisiones pendientes

- Ninguna ambigüedad declarada en la propuesta aprobada.
