# Contrato Técnico — cards--editorial

> Ticket: PA-33 (https://hiberus-team-dxp.atlassian.net/browse/PA-33)   ·   Confluence: https://hiberus-team-dxp.atlassian.net/wiki/spaces/PA/pages/214073346
> component_id: cmp-editorial-cards   ·   block_name: cards   ·   is_container: sí
> Origen: https://pre-devportaltpv.cloud.cecabank.es/blog   ·   Snapshot: 2026-08-10   ·   Confianza: 0.93
> Evidencia: `.eds-pipeline/assets/cards--editorial/`
**Variante EDS:** `editorial`
**Selector repetible del portal:** `.blog-entry`

---

## 1. Descripción funcional

Editorial Cards corresponde a `cmp-editorial-cards` y se materializa sobre el bloque EDS `cards` con variante `editorial`.
El componente aparece 1 veces en el portal; 1 apariciones fueron verificadas.
Las páginas observadas son: https://pre-devportaltpv.cloud.cecabank.es/blog.
Las plantillas asociadas son blog-fraud-shared; blog-fraud-shared es la plantilla primaria de Jira.
Las tres entradas comparten imagen, fecha y titular. La primera cambia de tamaño y heading, pero no de modelo ni comportamiento.
Punto de partida: cards (local): Imagen y richtext repetibles coinciden exactamente; la jerarquia featured y el grid editorial son solo CSS..

**Apariciones en el portal:** 1 — https://pre-devportaltpv.cloud.cecabank.es/blog
**Posición en página:** above the fold en desktop
**Variantes observadas:** featured-first

## 2. Evidencia visual

| Breakpoint | Componente local resoluble | En contexto local resoluble | Medidas del componente | Above the fold |
|---|---|---|---|---|
| desktop 1440px | `../assets/cards--editorial/desktop.png` | `../assets/cards--editorial/desktop-context.jpg` | 1440px × 717px | sí |
| tablet 768px | `../assets/cards--editorial/tablet.png` | `../assets/cards--editorial/tablet-context.jpg` | 768px × 736px | sí |
| mobile 375px | `../assets/cards--editorial/mobile.png` | `../assets/cards--editorial/mobile-context.jpg` | 375px × 798px | sí |

<!-- EDS:IMAGES -->

**Comportamiento responsivo medido:**

- **desktop 1440px:** caja medida 1440px × 717px; ratio 2.01; posición x=0px, y=897px.
- **tablet 768px:** caja medida 768px × 736px; ratio 1.04; posición x=0px, y=881px.
- **mobile 375px:** caja medida 375px × 798px; ratio 0.47; posición x=0px, y=625px.

## 3. DOM del portal → DOM de entrada EDS

### 3a. Fragmento real del portal (EVIDENCIA — no escribir selectores contra este DOM)

```html
<div class="blog-featured">
  <div class="blog-featured__list">
    <div class="blog-entry featured ng-star-inserted">
      <div class="blog-entry__image-wrapper">
        <img loading="lazy" class="blog-entry__image" src="https://aws-cecabank-drupal-s3.s3.eu-west-1.amazonaws.com/public/blog/2025-06/landing-image_4.jpg?VersionId=M.gvVRdu675IjpaCTNB34xWWXpuI2UuF" alt="test2">
      </div>
      <div class="blog-entry__content">
        <h5>12 Jun, 2025</h5>
        <h2>Test blog</h2>
      </div>
    </div><div class="blog-entry ng-star-inserted">
      <div class="blog-entry__image-wrapper">
        <img loading="lazy" class="blog-entry__image" src="https://aws-cecabank-drupal-s3.s3.eu-west-1.amazonaws.com/public/blog/2025-06/landing-image_3.jpg?VersionId=PchJT0HqQk2H2WnlgBrociCykZLvxmaR" alt="Test blog">
      </div>
      <div class="blog-entry__content">
        <h5>12 Jun, 2025</h5>
        <h3>Probando action</h3>
      </div>
    </div><div class="blog-entry ng-star-inserted">
      <div class="blog-entry__image-wrapper">
        <img loading="lazy" class="blog-entry__image" src="https://aws-cecabank-drupal-s3.s3.eu-west-1.amazonaws.com/public/blog/2025-06/landing-image_2.jpg?VersionId=xxV0dCX2gJv6idAEk2lGcRrOEdoEyERH" alt="test2">
      </div>
      <div class="blog-entry__content">
        <h5>12 Jun, 2025</h5>
        <h3>Probando action</h3>
      </div>
    </div>
  </div>
</div>
```

### 3b. DOM DE ENTRADA — matriz EDS (EL CONTRATO)

```text
cards (editorial)
  card*
    image + imageAlt
    text: fecha + titular
```

### 3c. Mapeo portal → EDS

| Celda/campo EDS | Elemento del portal | Tipo y nota |
|---|---|---|
| item/fila 0 / `image` | `.blog-entry__image` | `image`; estado pendiente_dam |
| item/fila 1 / `imageAlt` | `.blog-entry__image img` | `text`; atributo alt |
| item/fila 2 / `text` | `.blog-entry__content` | `richtext` |

**content_mapping íntegro y vinculante:**

```json
[
  {
    "source_selector": ".blog-entry__image",
    "target_field": "image",
    "type": "image",
    "status": "pendiente_dam"
  },
  {
    "source_selector": ".blog-entry__image img",
    "target_field": "imageAlt",
    "type": "text",
    "source_attribute": "alt"
  },
  {
    "source_selector": ".blog-entry__content",
    "target_field": "text",
    "type": "richtext"
  }
]
```

El contribuidor debe iterar `.blog-entry` y aplicar cada entrada de `content_mapping` dentro de cada item.

### 3d. DOM DE SALIDA — referencia, no contrato de entrada

```html
<div class="cards editorial">
  <div class="cards-content"><!-- nodos originales decorados desde la matriz de 3b --></div>
</div>
```

## 4. Estilos extraídos del portal

Valores medidos en `.eds-pipeline/assets/cards--editorial/computed-styles.json`:

| Elemento medido | Propiedades computadas |
|---|---|
| `div.blog-featured` | `display: block; width: 1440px; height: 716.5px; padding: 96px 100px 56px; color: rgba(0, 0, 0, 0.87); font-family: Poppins, sans-serif; font-size: 16px; line-height: 24px; border: 0px none rgba(0, 0, 0, 0.87)` |
| `img.blog-entry__image` | `display: block; width: 810.656px; max-width: 100%; height: 564.5px; color: rgb(255, 255, 255); font-family: Poppins, sans-serif; font-size: 16px; line-height: 24px; border: 0px none rgb(255, 255, 255); overflow: clip` |
| `h5` | `display: block; width: 746.656px; height: 20px; margin: 0px 0px 8px; color: rgb(255, 255, 255); font-family: Poppins, sans-serif; font-size: 16px; line-height: 20px; border: 0px none rgb(255, 255, 255)` |
| `h2.ng-star-inserted` | `display: block; width: 746.656px; height: 60px; margin: 0px 0px 8px; color: rgb(255, 255, 255); font-family: Poppins, sans-serif; font-size: 40px; line-height: 60px; border: 0px none rgb(255, 255, 255)` |
| `img.blog-entry__image` | `display: block; width: 405.344px; max-width: 100%; height: 270.25px; color: rgb(255, 255, 255); font-family: Poppins, sans-serif; font-size: 16px; line-height: 24px; border: 0px none rgb(255, 255, 255); overflow: clip` |
| `h5` | `display: block; width: 341.344px; height: 20px; margin: 0px 0px 8px; color: rgb(255, 255, 255); font-family: Poppins, sans-serif; font-size: 16px; line-height: 20px; border: 0px none rgb(255, 255, 255)` |
| `h3.ng-star-inserted` | `display: block; width: 341.344px; height: 34px; margin: 0px 0px 8px; color: rgb(255, 255, 255); font-family: Poppins, sans-serif; font-size: 24px; line-height: 34px; letter-spacing: 0.25px; border: 0px none rgb(255, 255, 255)` |
| `img.blog-entry__image` | `display: block; width: 405.344px; max-width: 100%; height: 270.25px; color: rgb(255, 255, 255); font-family: Poppins, sans-serif; font-size: 16px; line-height: 24px; border: 0px none rgb(255, 255, 255); overflow: clip` |
| `h5` | `display: block; width: 341.344px; height: 20px; margin: 0px 0px 8px; color: rgb(255, 255, 255); font-family: Poppins, sans-serif; font-size: 16px; line-height: 20px; border: 0px none rgb(255, 255, 255)` |
| `h3.ng-star-inserted` | `display: block; width: 341.344px; height: 34px; margin: 0px 0px 8px; color: rgb(255, 255, 255); font-family: Poppins, sans-serif; font-size: 24px; line-height: 34px; letter-spacing: 0.25px; border: 0px none rgb(255, 255, 255)` |

**Tokens existentes que deben reutilizarse:** se comparan y reutilizan durante implementación; cualquier valor no medido permanece sujeto a los tokens del repositorio y no a estimación visual.

## 5. Campos editables (Universal Editor)

**Contenedor raíz:** usa `template.filter`; los campos siguientes pertenecen a cada item repetible.

| Campo | name | component | valueType | Requerido | Descripción para el autor |
|---|---|---|---|---|---|
| image | `image` | `reference` | `string` | sí | Campo extraído de la propuesta aprobada. |
| imageAlt | `imageAlt` | `text` | `string` | sí | Campo extraído de la propuesta aprobada. |
| text | `text` | `richtext` | `string` | sí | Campo extraído de la propuesta aprobada. |

## 6. Imágenes y rendimiento

| Imagen/campo | Origen | Dimensiones intrínsecas | Ratio | LCP | Tratamiento |
|---|---|---|---|---|---|
| image | celda del bloque desde selector del portal | ⚠️ NO EXTRAÍDO — la captura mide el componente, no el asset intrínseco | ⚠️ NO EXTRAÍDO | sí, componente above the fold | Referencia DAM; EDS entrega picture cuando aplique |

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

- **Depende de:** PA-32.
- **Requerido por:** ningún ticket declarado en la propuesta.
- Las plantillas adicionales (ninguna) son asociaciones de alcance, no dependencias técnicas.

## 10. Ambigüedades y decisiones pendientes

- Ninguna ambigüedad declarada en la propuesta aprobada.
