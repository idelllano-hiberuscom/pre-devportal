# Contrato Técnico — cards--icon-cards

> Ticket: PA-31 (https://hiberus-team-dxp.atlassian.net/browse/PA-31)   ·   Confluence: https://hiberus-team-dxp.atlassian.net/wiki/spaces/PA/pages/214368257
> component_id: cmp-icon-cards   ·   block_name: cards   ·   is_container: sí
> Origen: https://pre-devportaltpv.cloud.cecabank.es/inicio   ·   Snapshot: 2026-08-10   ·   Confianza: 0.86
> Evidencia: `.eds-pipeline/assets/cards--icon-cards/`
**Variante EDS:** `icon-cards`
**Selector repetible del portal:** `.features-with-image__content__cards > div`

---

## 1. Descripción funcional

Icon Cards corresponde a `cmp-icon-cards` y se materializa sobre el bloque EDS `cards` con variante `icon-cards`.
El componente aparece 9 veces en el portal; 7 apariciones fueron verificadas.
Las páginas observadas son: https://pre-devportaltpv.cloud.cecabank.es/inicio, https://pre-devportaltpv.cloud.cecabank.es/integraciones/api.
Las plantillas asociadas son home-help-shared, integration-summary; home-help-shared es la plantilla primaria de Jira.
Las rejillas de iconos de home, onboarding y paginas de integracion comparten dos campos visibles, icono y contenido, y solo cambian fondo y numero de columnas. El hero con tarjetas se descompone para reutilizar esta misma variante.
Punto de partida: cards (local): Comparte contenedor repetible, media y richtext. Solo requiere estilo de icono y añadir imageAlt opcional al item local..

**Apariciones en el portal:** 9 — https://pre-devportaltpv.cloud.cecabank.es/inicio, https://pre-devportaltpv.cloud.cecabank.es/integraciones/api
**Posición en página:** fuera del primer viewport en desktop
**Variantes observadas:** light, on-dark, two-column, four-column

## 2. Evidencia visual

| Breakpoint | Componente local resoluble | En contexto local resoluble | Medidas del componente | Above the fold |
|---|---|---|---|---|
| desktop 1440px | `../assets/cards--icon-cards/desktop.png` | `../assets/cards--icon-cards/desktop-context.jpg` | 608px × 508px | no |
| tablet 768px | `../assets/cards--icon-cards/tablet.png` | `../assets/cards--icon-cards/tablet-context.jpg` | 720px × 476px | no |
| mobile 375px | `../assets/cards--icon-cards/mobile.png` | `../assets/cards--icon-cards/mobile-context.jpg` | 327px × 896px | no |

<!-- EDS:IMAGES -->

**Comportamiento responsivo medido:**

- **desktop 1440px:** caja medida 608px × 508px; ratio 1.2; posición x=96px, y=1267px.
- **tablet 768px:** caja medida 720px × 476px; ratio 1.51; posición x=24px, y=1177px.
- **mobile 375px:** caja medida 327px × 896px; ratio 0.36; posición x=24px, y=865px.

## 3. DOM del portal → DOM de entrada EDS

### 3a. Fragmento real del portal (EVIDENCIA — no escribir selectores contra este DOM)

```html
<div class="features-with-image__content__cards ng-star-inserted">
        <div>
          <component-wrapper><icon-card><div class="icon-card">
  <div class="icon-card__header">
      <lucide-angular size="100%" class="icon-card__header__icon ng-star-inserted"><svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shopping-basket icon-card__header__icon"><path d="m15 11-1 9" key="5wnq3a"></path><path d="m19 11-4-7" key="cnml18"></path><path d="M2 11h20" key="3eubbj"></path><path d="m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8a2 2 0 0 0 2-1.6l1.7-7.4" key="yiazzp"></path><path d="M4.5 15.5h15" key="13mye1"></path><path d="m5 11 4-7" key="116ra9"></path><path d="m9 11 1 9" key="1ojof7"></path></svg></lucide-angular>
  </div>
  <div class="icon-card__content">
    <h4>Portal de Comercios</h4>
    <p>Accede a una visión unificada de todas tus ventas online.</p>
  </div>
</div>
</icon-card>
</component-wrapper>
        </div><div>
          <component-wrapper><icon-card><div class="icon-card">
  <div class="icon-card__header">
      <lucide-angular size="100%" class="icon-card__header__icon ng-star-inserted"><svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-hand-coins icon-card__header__icon"><path d="M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17" key="geh8rc"></path><path d="m7 21 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9" key="1fto5m"></path><path d="m2 16 6 6" key="1pfhp9"></path><circle cx="16" cy="9" r="2.9" key="1n0dlu"></circle><circle cx="6" cy="5" r="3" key="151irh"></circle></svg></lucide-angular>
  </div>
  <div class="icon-card__content">
    <h4>Cobra de forma rápida y ágil</h4>
    <p>Configuración personalizada de tus métodos de pago para que tus clientes paguen de forma sencilla.</p>
  </div>
</div>
</icon-card>
</component-wrapper>
        </div><div>
          <component-wrapper><icon-card><div class="icon-card">
  <div class="icon-card__header">
      <lucide-angular size="100%" class="icon-card__header__icon ng-star-inserted"><svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-wallet-cards icon-card__header__icon"><rect width="18" height="18" x="3" y="3" rx="2" key="afitv7"></rect><path d="M3 9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2" key="4125el"></path><path d="M3 11h3c.8 0 1.6.3 2.1.9l1.1.9c1.6 1.6 4.1 1.6 5.7 0l1.1-.9c.5-.5 1.3-.9 2.1-.9H21" key="1dpki6"></path></svg></lucide-angular>
  </div>
  <div class="icon-card__content">
    <h4>Suscripciones y pagos recurrentes</h4>
    <p>Nos adaptamos a tu negocio y a tus servicios.</p>
  </div>
</div>
</icon-card>
</component-wrapper>
        </div><div>
          <component-wrapper><icon-card><div class="icon-card">
  <div class="icon-card__header">
      <lucide-angular size="100%" class="icon-card__header__icon ng-star-inserted"><svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shuffle icon-card__header__icon"><path d="m18 14 4 4-4 4" key="10pe0f"></path><path d="m18 2 4 4-4 4" key="pucp1d"></path><path d="M2 18h1.973a4 4 0 0 0 3.3-1.7l5.454-8.6a4 4 0 0 1 3.3-1.7H22" key="1ailkh"></path><path d="M2 6h1.972a4 4 0 0 1 3.6 2.2" key="km57vx"></path><path d="M22 18h-6.041a4 4 0 0 1-3.3-1.8l-.359-.45" key="os18l9"></path></svg></lucide-angular>
  </div>
  <div class="icon-card__content">
    <h4>Venta Omnicanal</h4>
    <p>Con nuestra solución unificada podrás adaptarte a los distintos canales de venta desde un único lugar.</p>
  </div>
</div>
</icon-card>
</component-wrapper>
        </div>
      </div>
```

### 3b. DOM DE ENTRADA — matriz EDS (EL CONTRATO)

```text
cards (filter: cards)
  card*
    image + imageAlt
    text (richtext)
```

### 3c. Mapeo portal → EDS

| Celda/campo EDS | Elemento del portal | Tipo y nota |
|---|---|---|
| item/fila 0 / `image` | `.icon-card__header svg` | `image`; estado convertir_svg_local_o_dam; transformación sanitizar_svg_y_conservar_viewBox |
| item/fila 1 / `imageAlt` | `.icon-card__header svg` | `text`; atributo aria-label|title |
| item/fila 2 / `text` | `.icon-card__content` | `richtext` |

**content_mapping íntegro y vinculante:**

```json
[
  {
    "source_selector": ".icon-card__header svg",
    "target_field": "image",
    "type": "image",
    "status": "convertir_svg_local_o_dam",
    "transform": "sanitizar_svg_y_conservar_viewBox"
  },
  {
    "source_selector": ".icon-card__header svg",
    "target_field": "imageAlt",
    "type": "text",
    "source_attribute": "aria-label|title",
    "fallback": "derivar_del_contexto_visible_del_item"
  },
  {
    "source_selector": ".icon-card__content",
    "target_field": "text",
    "type": "richtext"
  }
]
```

El contribuidor debe iterar `.features-with-image__content__cards > div` y aplicar cada entrada de `content_mapping` dentro de cada item.

### 3d. DOM DE SALIDA — referencia, no contrato de entrada

```html
<div class="cards icon-cards">
  <div class="cards-content"><!-- nodos originales decorados desde la matriz de 3b --></div>
</div>
```

## 4. Estilos extraídos del portal

Valores medidos en `.eds-pipeline/assets/cards--icon-cards/computed-styles.json`:

| Elemento medido | Propiedades computadas |
|---|---|
| `div.features-with-image__content__cards.ng-star-inserted` | `display: grid; gap: 48px 24px; grid-template-columns: 292px 292px; grid-template-rows: 214px 246px; width: 608px; height: 508px; color: rgba(0, 0, 0, 0.87); font-family: Poppins, sans-serif; font-size: 16px; line-height: 24px; border: 0px none rgba(0, 0, 0, 0.87)` |
| `h4` | `display: block; width: 292px; height: 22px; margin: 0px 0px 8px; color: rgba(0, 0, 0, 0.87); font-family: Poppins, sans-serif; font-size: 18px; font-weight: 500; line-height: 22px; letter-spacing: 0.25px; border: 0px none rgba(0, 0, 0, 0.87)` |
| `p` | `display: block; width: 292px; height: 64px; margin: 0px 0px 16px; color: rgb(118, 118, 122); font-family: Poppins, sans-serif; font-size: 16px; line-height: 32px; border: 0px none rgb(118, 118, 122)` |
| `h4` | `display: block; width: 292px; height: 22px; margin: 0px 0px 8px; color: rgba(0, 0, 0, 0.87); font-family: Poppins, sans-serif; font-size: 18px; font-weight: 500; line-height: 22px; letter-spacing: 0.25px; border: 0px none rgba(0, 0, 0, 0.87)` |
| `p` | `display: block; width: 292px; height: 96px; margin: 0px 0px 16px; color: rgb(118, 118, 122); font-family: Poppins, sans-serif; font-size: 16px; line-height: 32px; border: 0px none rgb(118, 118, 122)` |
| `h4` | `display: block; width: 292px; height: 44px; margin: 0px 0px 8px; color: rgba(0, 0, 0, 0.87); font-family: Poppins, sans-serif; font-size: 18px; font-weight: 500; line-height: 22px; letter-spacing: 0.25px; border: 0px none rgba(0, 0, 0, 0.87)` |
| `p` | `display: block; width: 292px; height: 64px; margin: 0px 0px 16px; color: rgb(118, 118, 122); font-family: Poppins, sans-serif; font-size: 16px; line-height: 32px; border: 0px none rgb(118, 118, 122)` |
| `h4` | `display: block; width: 292px; height: 22px; margin: 0px 0px 8px; color: rgba(0, 0, 0, 0.87); font-family: Poppins, sans-serif; font-size: 18px; font-weight: 500; line-height: 22px; letter-spacing: 0.25px; border: 0px none rgba(0, 0, 0, 0.87)` |
| `p` | `display: block; width: 292px; height: 128px; margin: 0px 0px 16px; color: rgb(118, 118, 122); font-family: Poppins, sans-serif; font-size: 16px; line-height: 32px; border: 0px none rgb(118, 118, 122)` |

**Tokens existentes que deben reutilizarse:** se comparan y reutilizan durante implementación; cualquier valor no medido permanece sujeto a los tokens del repositorio y no a estimación visual.

## 5. Campos editables (Universal Editor)

**Contenedor raíz:** usa `template.filter`; los campos siguientes pertenecen a cada item repetible.

| Campo | name | component | valueType | Requerido | Descripción para el autor |
|---|---|---|---|---|---|
| image | `image` | `reference` | `string` | no | Campo extraído de la propuesta aprobada. |
| imageAlt | `imageAlt` | `text` | `string` | sí | Campo extraído de la propuesta aprobada. |
| text | `text` | `richtext` | `string` | sí | Campo extraído de la propuesta aprobada. |

## 6. Imágenes y rendimiento

| Imagen/campo | Origen | Dimensiones intrínsecas | Ratio | LCP | Tratamiento |
|---|---|---|---|---|---|
| image | celda del bloque desde selector del portal | ⚠️ NO EXTRAÍDO — la captura mide el componente, no el asset intrínseco | ⚠️ NO EXTRAÍDO | no | Referencia DAM; EDS entrega picture cuando aplique |

- Las dimensiones de la tabla de sección 2 son del recorte del componente, no del asset; no se reutilizan como dimensiones intrínsecas.
- Los estados `pendiente_dam` o `convertir_svg_local_o_dam` del content_mapping se resuelven como assets locales versionados o DAM autorables antes de contribución.
- Las referencias de imagen deben producir `<picture>` optimizado en EDS; no se copian URLs del portal.


## 7. Interacciones y estados

| Elemento | Estado | Comportamiento | Implementación |
|---|---|---|---|
| Componente | default | Sin interacción propia observada. | HTML/CSS |
| Componente | hover | No existe estado interactivo propio. | — |
| Componente | focus-visible | No existe control enfocable propio. | — |
| Componente | active | No existe estado activo propio. | — |
| Componente | disabled | No existe estado disabled. | — |

**¿Requiere JS?** No por interacción propia; la decoración estructural puede seguir requiriendo JS.

## 8. Accesibilidad

- **Nivel objetivo:** WCAG 2.1 AA.
- **Contraste medido cuando hay par explícito color/fondo:**
- ⚠️ NO EXTRAÍDO — ningún nodo medido contiene simultáneamente color de texto y fondo opaco; no se asume fondo blanco.
- **Orden de tabulación:** no añade controles propios al orden de tabulación.
- **Etiquetas requeridas:** los campos de imagen requieren alt; los controles requieren nombre accesible visible o equivalente.
- **Problemas del portal original que no se replican:** atributos Angular y custom elements no se trasladan al DOM EDS.




## 9. Dependencias

- **Depende de:** PA-25.
- **Requerido por:** ningún ticket declarado en la propuesta.
- Las plantillas adicionales (integration-summary) son asociaciones de alcance, no dependencias técnicas.

## 10. Ambigüedades y decisiones pendientes

- Ninguna ambigüedad declarada en la propuesta aprobada.
