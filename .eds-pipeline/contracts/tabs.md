# Contrato Técnico — tabs

> Ticket: PA-28 (https://hiberus-team-dxp.atlassian.net/browse/PA-28)   ·   Confluence: https://hiberus-team-dxp.atlassian.net/wiki/spaces/PA/pages/214106113
> component_id: cmp-tabs   ·   block_name: tabs   ·   is_container: sí
> Origen: https://pre-devportaltpv.cloud.cecabank.es/empieza-con-nosotros   ·   Snapshot: 2026-08-10   ·   Confianza: 0.62
> Evidencia: `.eds-pipeline/assets/tabs/`
**Selector repetible del portal:** `.tab-bar__sections > tab-component`

---

## 1. Descripción funcional

Tabs With Composite Content corresponde a `cmp-tabs` y se materializa sobre el bloque EDS `tabs`.
El componente aparece 1 veces en el portal; 1 apariciones fueron verificadas.
Las páginas observadas son: https://pre-devportaltpv.cloud.cecabank.es/empieza-con-nosotros.
Las plantillas asociadas son onboarding-singleton; onboarding-singleton es la plantilla primaria de Jira.
Las cinco pestañas comparten titulo y un panel complejo equivalente. Se conserva un solo bloque tabs, pero no se declara collection exacta porque el contenido anidado excede el modelo Adobe.
Punto de partida: tabs: se reutiliza Interaccion, roles ARIA, teclado y coordinacion tab/panel.; se adapta Modelo de item para contenido compuesto y estrategia de contribucion de paneles..

**Apariciones en el portal:** 1 — https://pre-devportaltpv.cloud.cecabank.es/empieza-con-nosotros
**Posición en página:** fuera del primer viewport en desktop
**Variantes observadas:** ninguna

## 2. Evidencia visual

| Breakpoint | Componente local resoluble | En contexto local resoluble | Medidas del componente | Above the fold |
|---|---|---|---|---|
| desktop 1440px | `../assets/tabs/desktop.png` | `../assets/tabs/desktop-context.jpg` | 1440px × 2853px | no |
| tablet 768px | `../assets/tabs/tablet.png` | `../assets/tabs/tablet-context.jpg` | 768px × 2567px | sí |
| mobile 375px | `../assets/tabs/mobile.png` | `../assets/tabs/mobile-context.jpg` | 375px × 2719px | sí |

<!-- EDS:IMAGES -->

**Comportamiento responsivo medido:**

- **desktop 1440px:** caja medida 1440px × 2853px; ratio 0.5; posición x=0px, y=1025px.
- **tablet 768px:** caja medida 768px × 2567px; ratio 0.3; posición x=0px, y=1009px.
- **mobile 375px:** caja medida 375px × 2719px; ratio 0.14; posición x=0px, y=753px.

## 3. DOM del portal → DOM de entrada EDS

### 3a. Fragmento real del portal (EVIDENCIA — no escribir selectores contra este DOM)

```html
<tabs>
	<tab-bar><ul class="tab-bar">
  <li class="tab-bar__item tab-bar__item--selected ng-star-inserted">
    <h3>API</h3>
  </li><li class="tab-bar__item ng-star-inserted">
    <h3>SDK</h3>
  </li><li class="tab-bar__item ng-star-inserted">
    <h3>iframe</h3>
  </li><li class="tab-bar__item ng-star-inserted">
    <h3>Hosted</h3>
  </li><li class="tab-bar__item ng-star-inserted">
    <h3>Plugins</h3>
  </li>
</ul>
<div class="tab-bar__sections">
		<tab-component><div class="tab-component">
			<component-wrapper><highlighted-feature><div class="highlighted-feature">
    <div class="highlighted-feature__image ng-star-inserted">
      <img src="https://aws-cecabank-drupal-s3.s3.eu-west-1.amazonaws.com/public/styles/wide/public/highlighted-feature/2025-04/hands-holding-credit-card-using-laptop-computer-mobile-phone-online-shopping.webp?VersionId=_GkIf.diSsp_OCEOhopC14BFHoTUor6t&amp;itok=a6f1f1--" alt="API">
    </div>
    <div class="highlighted-feature__content ng-star-inserted">
      <h2 class="highlighted-feature__content__title">API REST</h2>
      <div class="highlighted-feature__content__description">
        <div>La integración mediante API REST ofrece un conjunto de servicios REST que facilitan la autenticación y autorización de pagos con tarjetas en entornos de prueba y producción. Cuenta con tres tipos distintos de operación. Además, se disponen de servicios para anulación total y devolución parcial de operaciones. Todos los servicios intercambian mensajes JSON codificados en Base64 y protegidos mediante firma SHA 256.<br></div>
      </div>
    </div>
</div>
</highlighted-feature>
</component-wrapper>
<component-wrapper><feature-list><section class="feature-list">
  <h2 class="feature-list__heading">
    Funcionalidades
  </h2>
  <div class="feature-list__list">
    <div class="feature-list__list__item ng-star-inserted">
      <component-wrapper><icon-card><div class="icon-card">
  <div class="icon-card__header">
      <special-icon><svg class="special-icon">
	<use xlink:href="../../../../content/custom-icons/special-icons.svg#icon-Automation"></use>
</svg>
</special-icon>
  </div>
  <div class="icon-card__content">
    <h4>Integración flexible</h4>
    <p>La misma API permite realizar compras en un paso, compras en dos pasos, y compras tipo MOTO (Mail Order/Telephone Order).
</p>
  </div>
</div>
</icon-card>
</component-wrapper>
    </div><div class="feature-list__list__item ng-star-inserted">
      <component-wrapper><icon-card><div class="icon-card">
  <div class="icon-card__header">
      <special-icon><svg class="special-icon">
	<use xlink:href="../../../../content/custom-icons/special-icons.svg#icon-Tools"></use>
</svg>
</special-icon>
  </div>
  <div class="icon-card__content">
    <h4>Seguridad avanzada</h4>
    <p>Mensajes JSON + Base64 firmados con SHA 256 y soporte 3‑D Secure 2.x.
</p>
  </div>
</div>
</icon-card>
</component-wrapper>
    </div><div class="feature-list__list__item ng-star-inserted">
      <component-wrapper><icon-card><div class="icon-card">
  <div class="icon-card__header">
      <special-icon><svg class="special-icon">
	<use xlink:href="../../../../content/custom-icons/special-icons.svg#icon-Settings"></use>
</svg>
</special-icon>
  </div>
  <div class="icon-card__content">
    <h4>Control de tu operativa</h4>
    <p>Gestiona pagos, anulaciones y devoluciones directamente desde tu servidor. Además, contamos con entorno de pruebas y producción independientes para validar cambios sin riesgo.</p>
  </div>
</div>
</icon-card>
</component-wrapper>
    </div><div class="feature-list__list__item ng-star-inserted">
      <component-wrapper><icon-card><div class="icon-card">
  <div class="icon-card__header">
      <special-icon><svg class="special-icon">
	<use xlink:href="../../../../content/custom-icons/special-icons.svg#icon-Access"></use>
</svg>
</special-icon>
  </div>
  <div class="icon-card__content">
    <h4>Prevención de fraude</h4>
    <p>Nuestras herramientas avanzadas de análisis y nuestros equipos de expertos en fraude monitorean las transacciones y ofrecen soporte siempre que lo necesites.</p>
  </div>
</div>
</icon-card>
</component-wrapper>
    </div>
  </div>
</section>
</feature-list>
</component-wrapper>
<component-wrapper><payment-methods><section class="payment-methods">
  <div class="payment-methods__header">
    <h2 class="payment-methods__header__title">Posibles métodos de pago aceptados</h2> 
  </div>
  <ul class="payment-methods__list">
    <li class="payment-methods__list__item ng-star-inserted">
      <img src="https://aws-cecabank-drupal-s3.s3.eu-west-1.amazonaws.com/public/metodo-pago/icono/AmericanExpress.svg" alt="American Express">
    </li><li class="payment-methods__list__item ng-star-inserted">
      <img src="https://aws-cecabank-drupal-s3.s3.eu-west-1.amazonaws.com/public/metodo-pago/icono/ApplePay.svg" alt="Apple Pay">
    </li><li class="payment-methods__list__item ng-star-inserted">
      <img src="https://aws-cecabank-drupal-s3.s3.eu-west-1.amazonaws.com/public/metodo-pago/icono/Bizum.svg" alt="Bizum">
    </li><li class="payment-methods__list__item ng-star-inserted">
      <img src="https://aws-cecabank-drupal-s3.s3.eu-west-1.amazonaws.com/public/metodo-pago/icono/GooglePay.svg" alt="Google Pay">
    </li><li class="payment-methods__list__item ng-star-inserted">
      <img src="https://aws-cecabank-drupal-s3.s3.eu-west-1.amazonaws.com/public/metodo-pago/icono/MasterCard.svg" alt="MasterCard">
    </li><li class="payment-methods__list__item ng-star-inserted">
      <img src="https://aws-cecabank-drupal-s3.s3.eu-west-1.amazonaws.com/public/metodo-pago/icono/Visa.svg" alt="Visa">
    </li>
  </ul>
</section>
</payment-methods>
</component-wrapper>
<component-wrapper><button-link><div class="button-link">
  <button class="btn-filled">
    Ver más
  </button>
</div>
</button-link>
</component-wrapper>
</div>
</tab-component><tab-component><div class="tab-component tab-component--hidden">
			<component-wrapper><highlig
```

### 3b. DOM DE ENTRADA — matriz EDS (EL CONTRATO)

```text
tabs (template.filter: tabs)
  tabs-item*
    title (text, requerido)
    fragmentPath (fragment EDS, requerido)
```

### 3c. Mapeo portal → EDS

| Celda/campo EDS | Elemento del portal | Tipo y nota |
|---|---|---|
| item/fila 0 / `title` | `.tab-bar__item h3` | `text` |
| item/fila 1 / `fragmentPath` | `.tab-component` | `text`; transformación crear_fragment_eds_y_guardar_path |

**content_mapping íntegro y vinculante:**

```json
[
  {
    "source_selector": ".tab-bar__item h3",
    "target_field": "title",
    "type": "text"
  },
  {
    "source_selector": ".tab-component",
    "target_field": "fragmentPath",
    "type": "text",
    "transform": "crear_fragment_eds_y_guardar_path"
  }
]
```

El contribuidor debe iterar `.tab-bar__sections > tab-component` y aplicar cada entrada de `content_mapping` dentro de cada item.

### 3d. DOM DE SALIDA — referencia, no contrato de entrada

```html
<div class="tabs">
  <div class="tabs-content"><!-- nodos originales decorados desde la matriz de 3b --></div>
</div>
```

## 4. Estilos extraídos del portal

Valores medidos en `.eds-pipeline/assets/tabs/computed-styles.json`:

| Elemento medido | Propiedades computadas |
|---|---|
| `tabs.ng-star-inserted` | `display: inline; color: rgba(0, 0, 0, 0.87); font-family: Poppins, sans-serif; font-size: 16px; line-height: 24px; border: 0px none rgba(0, 0, 0, 0.87)` |
| `ul.tab-bar` | `display: flex; justify-content: center; align-items: center; gap: 40px; width: 1440px; height: 42px; margin: 128px 0px 16px; color: rgb(118, 118, 122); font-family: Poppins, sans-serif; font-size: 16px; line-height: 32px; border: 0px none rgb(118, 118, 122)` |
| `li.tab-bar__item.tab-bar__item--selected.ng-star-inserted` | `display: list-item; width: 38.1094px; height: 42px; color: rgb(1, 52, 81); font-family: Poppins, sans-serif; font-size: 16px; line-height: 32px; border: 0px none rgb(1, 52, 81)` |
| `h3` | `display: block; width: 38.1094px; height: 34px; margin: 0px 0px 8px; color: rgb(1, 52, 81); font-family: Poppins, sans-serif; font-size: 24px; font-weight: 500; line-height: 34px; letter-spacing: 0.25px; border: 0px none rgb(1, 52, 81)` |
| `li.tab-bar__item.ng-star-inserted` | `display: list-item; width: 47.4688px; height: 42px; color: rgb(1, 127, 155); font-family: Poppins, sans-serif; font-size: 16px; line-height: 32px; border: 0px none rgb(1, 127, 155)` |
| `h3` | `display: block; width: 47.4688px; height: 34px; margin: 0px 0px 8px; color: rgb(1, 127, 155); font-family: Poppins, sans-serif; font-size: 24px; font-weight: 500; line-height: 34px; letter-spacing: 0.25px; border: 0px none rgb(1, 127, 155)` |
| `li.tab-bar__item.ng-star-inserted` | `display: list-item; width: 81.0469px; height: 42px; color: rgb(1, 127, 155); font-family: Poppins, sans-serif; font-size: 16px; line-height: 32px; border: 0px none rgb(1, 127, 155)` |
| `h3` | `display: block; width: 81.0469px; height: 34px; margin: 0px 0px 8px; color: rgb(1, 127, 155); font-family: Poppins, sans-serif; font-size: 24px; font-weight: 500; line-height: 34px; letter-spacing: 0.25px; border: 0px none rgb(1, 127, 155)` |
| `li.tab-bar__item.ng-star-inserted` | `display: list-item; width: 86.5625px; height: 42px; color: rgb(1, 127, 155); font-family: Poppins, sans-serif; font-size: 16px; line-height: 32px; border: 0px none rgb(1, 127, 155)` |
| `h3` | `display: block; width: 86.5625px; height: 34px; margin: 0px 0px 8px; color: rgb(1, 127, 155); font-family: Poppins, sans-serif; font-size: 24px; font-weight: 500; line-height: 34px; letter-spacing: 0.25px; border: 0px none rgb(1, 127, 155)` |
| `li.tab-bar__item.ng-star-inserted` | `display: list-item; width: 88.9531px; height: 42px; color: rgb(1, 127, 155); font-family: Poppins, sans-serif; font-size: 16px; line-height: 32px; border: 0px none rgb(1, 127, 155)` |
| `h3` | `display: block; width: 88.9531px; height: 34px; margin: 0px 0px 8px; color: rgb(1, 127, 155); font-family: Poppins, sans-serif; font-size: 24px; font-weight: 500; line-height: 34px; letter-spacing: 0.25px; border: 0px none rgb(1, 127, 155)` |
| `img` | `display: block; width: 579.984px; max-width: 100%; height: 386.844px; color: rgba(0, 0, 0, 0.87); font-family: Poppins, sans-serif; font-size: 16px; line-height: 24px; border: 0px none rgba(0, 0, 0, 0.87); overflow: clip` |

**Tokens existentes que deben reutilizarse:** se comparan y reutilizan durante implementación; cualquier valor no medido permanece sujeto a los tokens del repositorio y no a estimación visual.

## 5. Campos editables (Universal Editor)

**Contenedor raíz:** usa `template.filter`; los campos siguientes pertenecen a cada item repetible.

| Campo | name | component | valueType | Requerido | Descripción para el autor |
|---|---|---|---|---|---|
| title | `title` | `text` | `string` | sí | Campo extraído de la propuesta aprobada. |
| fragmentPath | `fragmentPath` | `aem-content` | `string` | sí | Campo extraído de la propuesta aprobada. |

## 6. Imágenes y rendimiento

| Imagen/campo | Origen | Dimensiones intrínsecas | Ratio | LCP | Tratamiento |
|---|---|---|---|---|---|
| No aplica | No hay campos de imagen | — | — | no | — |

- Las dimensiones de la tabla de sección 2 son del recorte del componente, no del asset; no se reutilizan como dimensiones intrínsecas.
- Los estados `pendiente_dam` o `convertir_svg_local_o_dam` del content_mapping se resuelven como assets locales versionados o DAM autorables antes de contribución.
- Las referencias de imagen deben producir `<picture>` optimizado en EDS; no se copian URLs del portal.


## 7. Interacciones y estados

| Elemento | Estado | Comportamiento | Implementación |
|---|---|---|---|
| tab | default | Solo un tab tiene aria-selected=true y tabindex=0; los demás tienen tabindex=-1. | ARIA tabs roving tabindex. |
| tab | hover | Se aplican tokens interactivos existentes del repositorio. | CSS. |
| tab | focus-visible | Foco visible sin activar contenido automáticamente. | CSS :focus-visible. |
| tab | active | Activa y muestra el panel asociado; la primera activación carga fragmentPath bajo demanda. | JS + fragment EDS. |
| panel | loading | Muestra estado de carga con aria-live=polite mientras se resuelve el fragmento. | JS. |
| panel | error | Muestra mensaje accesible y permite reintentar una carga fallida. | JS. |
| panel | empty | Muestra estado vacío accesible cuando el fragmento no produce contenido. | JS. |

**¿Requiere JS?** Sí: activación, teclado ARIA, carga diferida de fragmentos y caché en memoria.

## 8. Accesibilidad

- **Nivel objetivo:** WCAG 2.1 AA.
- **Contraste medido cuando hay par explícito color/fondo:**
- li.payment-methods__list__item: rgb(118, 118, 122) sobre rgb(255, 255, 255) = 4.52:1.
- li.payment-methods__list__item: rgb(118, 118, 122) sobre rgb(255, 255, 255) = 4.52:1.
- li.payment-methods__list__item: rgb(118, 118, 122) sobre rgb(255, 255, 255) = 4.52:1.
- **Orden de tabulación:** debe seguir el orden DOM de tab; el patrón accesible aprobado define el foco y la activación.
- **Etiquetas requeridas:** los campos de imagen requieren alt; los controles requieren nombre accesible visible o equivalente.
- **Problemas del portal original que no se replican:** atributos Angular y custom elements no se trasladan al DOM EDS.

- **Patrón de teclado:** flechas mueven el foco, Home/End saltan al extremo y Enter/Space activan; cada tab controla un panel con identificadores estables.


## 9. Dependencias

- **Depende de:** ninguna.
- **Requerido por:** ningún ticket declarado en la propuesta.
- Las plantillas adicionales (ninguna) son asociaciones de alcance, no dependencias técnicas.

## 10. Ambigüedades y decisiones pendientes

- Ninguna ambigüedad declarada en la propuesta aprobada.
