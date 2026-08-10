# Contrato Técnico — carousel

> Ticket: PA-35 (https://hiberus-team-dxp.atlassian.net/browse/PA-35)   ·   Confluence: https://hiberus-team-dxp.atlassian.net/wiki/spaces/PA/pages/214269953
> component_id: cmp-carousel   ·   block_name: carousel   ·   is_container: sí
> Origen: https://pre-devportaltpv.cloud.cecabank.es/integraciones/api   ·   Snapshot: 2026-08-10   ·   Confianza: 0.94
> Evidencia: `.eds-pipeline/assets/carousel/`
**Selector repetible del portal:** `.carousel__slides > .carousel__slide.ng-star-inserted`

---

## 1. Descripción funcional

Step Carousel corresponde a `cmp-carousel` y se materializa sobre el bloque EDS `carousel`.
El componente aparece 4 veces en el portal; 3 apariciones fueron verificadas.
Las páginas observadas son: https://pre-devportaltpv.cloud.cecabank.es/integraciones/api, https://pre-devportaltpv.cloud.cecabank.es/integraciones/hosted-checkout, https://pre-devportaltpv.cloud.cecabank.es/integraciones/sdk.
Las plantillas asociadas son integration-summary; integration-summary es la plantilla primaria de Jira.
Los tres carruseles verificados comparten imagen y texto por paso, controles y estado. Titulo y subtitulo se mantienen como contenido por defecto antes del bloque.
Punto de partida: carousel: se reutiliza Modelo de slide, lazy load, controles e instrumentacion UE.; se adapta Numeracion visual y tokens del cliente..

**Apariciones en el portal:** 4 — https://pre-devportaltpv.cloud.cecabank.es/integraciones/api, https://pre-devportaltpv.cloud.cecabank.es/integraciones/hosted-checkout, https://pre-devportaltpv.cloud.cecabank.es/integraciones/sdk
**Posición en página:** fuera del primer viewport en desktop
**Variantes observadas:** ninguna

## 2. Evidencia visual

| Breakpoint | Componente local resoluble | En contexto local resoluble | Medidas del componente | Above the fold |
|---|---|---|---|---|
| desktop 1440px | `../assets/carousel/desktop.png` | `../assets/carousel/desktop-context.jpg` | 1440px × 752px | no |
| tablet 768px | `../assets/carousel/tablet.png` | `../assets/carousel/tablet-context.jpg` | 768px × 752px | no |
| mobile 375px | `../assets/carousel/mobile.png` | `../assets/carousel/mobile-context.jpg` | 375px × 752px | no |

<!-- EDS:IMAGES -->

**Comportamiento responsivo medido:**

- **desktop 1440px:** caja medida 1440px × 752px; ratio 1.91; posición x=0px, y=3238px.
- **tablet 768px:** caja medida 768px × 752px; ratio 1.02; posición x=0px, y=2914px.
- **mobile 375px:** caja medida 375px × 752px; ratio 0.5; posición x=0px, y=2689px.

## 3. DOM del portal → DOM de entrada EDS

### 3a. Fragmento real del portal (EVIDENCIA — no escribir selectores contra este DOM)

```html
<div class="carousel ng-tns-c1048150149-0">
  <header class="carousel__header ng-tns-c1048150149-0">
    <h2 class="carousel__title ng-tns-c1048150149-0">Paso a paso</h2>
    <p class="carousel__subtitle ng-tns-c1048150149-0">La integración API&nbsp;REST sigue los siguientes pasos, explicados en el diagrama superior.</p>
  </header>
  <div class="carousel__slides ng-tns-c1048150149-0 ng-trigger ng-trigger-slideAnimation">
    <div class="carousel__slide ng-tns-c1048150149-0 carousel__slide--current ng-star-inserted" style="">
      <component-wrapper class="ng-tns-c1048150149-0"><step-slide><img class="carousel__slide__image" src="https://aws-cecabank-drupal-s3.s3.eu-west-1.amazonaws.com/public/step-slide/2025-04/hosted-checkout-paso-1.webp?VersionId=z3K0rns8R.0gZmCMC2XdRzULPW1H3SJY" alt="Paso 1">
<span class="carousel__slide__text">El cliente inicia el proceso de pago desde la plataforma del comercio.</span>
</step-slide>
</component-wrapper>
      <span class="carousel__slide__index ng-tns-c1048150149-0">1</span>
    </div><div class="carousel__slide ng-tns-c1048150149-0 ng-star-inserted" style="">
      <component-wrapper class="ng-tns-c1048150149-0"><step-slide><img class="carousel__slide__image" src="https://aws-cecabank-drupal-s3.s3.eu-west-1.amazonaws.com/public/step-slide/2025-04/hosted-checkout-paso-2.webp?VersionId=Gx.Sh6cfkpxZI2JUN0MG11BHgNc1m20y" alt="Paso 2">
<span class="carousel__slide__text">El comercio envía los datos del pago (con tarjeta) directamente a Cecabank.</span>
</step-slide>
</component-wrapper>
      <span class="carousel__slide__index ng-tns-c1048150149-0">2</span>
    </div><div class="carousel__slide ng-tns-c1048150149-0 ng-star-inserted" style="">
      <component-wrapper class="ng-tns-c1048150149-0"><step-slide><img class="carousel__slide__image" src="https://aws-cecabank-drupal-s3.s3.eu-west-1.amazonaws.com/public/step-slide/2025-04/hosted-checkout-paso-3.webp?VersionId=vJnLRj9CeNz_qX5T8RuYpp1TAHfu.ZNv" alt="Paso 3">
<span class="carousel__slide__text">Cecabank devuelve una respuesta con el resultado del pago (sincrónica o diferida).</span>
</step-slide>
</component-wrapper>
      <span class="carousel__slide__index ng-tns-c1048150149-0">3</span>
    </div><div class="carousel__slide ng-tns-c1048150149-0 ng-star-inserted" style="">
      <component-wrapper class="ng-tns-c1048150149-0"><step-slide><img class="carousel__slide__image" src="https://aws-cecabank-drupal-s3.s3.eu-west-1.amazonaws.com/public/step-slide/2025-04/hosted-checkout-paso-3_4.webp?VersionId=73rS7CmhxUkcSBpsz5h8wauQEJsXoGkm" alt="Paso 4">
<span class="carousel__slide__text">El comercio muestra al cliente el resultado del pago.</span>
</step-slide>
</component-wrapper>
      <span class="carousel__slide__index ng-tns-c1048150149-0">4</span>
    </div>
    <div class="carousel__slide ng-tns-c1048150149-0 carousel__slide--current">
      <div class="carousel__slide__cover ng-tns-c1048150149-0"></div>
      <component-wrapper class="ng-tns-c1048150149-0"><step-slide style=""><img class="carousel__slide__image" src="https://aws-cecabank-drupal-s3.s3.eu-west-1.amazonaws.com/public/step-slide/2025-04/hosted-checkout-paso-1.webp?VersionId=z3K0rns8R.0gZmCMC2XdRzULPW1H3SJY" alt="Paso 1">
<span class="carousel__slide__text">El cliente inicia el proceso de pago desde la plataforma del comercio.</span>
</step-slide>
</component-wrapper>
      <span class="carousel__slide__index ng-tns-c1048150149-0">1</span>
    </div>
    <div class="carousel__slide ng-tns-c1048150149-0">
      <div class="carousel__slide__cover ng-tns-c1048150149-0"></div>
      <component-wrapper class="ng-tns-c1048150149-0"><step-slide style=""><img class="carousel__slide__image" src="https://aws-cecabank-drupal-s3.s3.eu-west-1.amazonaws.com/public/step-slide/2025-04/hosted-checkout-paso-2.webp?VersionId=Gx.Sh6cfkpxZI2JUN0MG11BHgNc1m20y" alt="Paso 2">
<span class="carousel__slide__text">El comercio envía los datos del pago (con tarjeta) directamente a Cecabank.</span>
</step-slide>
</component-wrapper>
      <span class="carousel__slide__index ng-tns-c1048150149-0">2</span>
    </div>
  </div>
  <div class="carousel__control ng-tns-c1048150149-0">
    <button class="carousel__btn ng-tns-c1048150149-0 carousel__btn--selected ng-star-inserted"></button><button class="carousel__btn ng-tns-c1048150149-0 ng-star-inserted"></button><button class="carousel__btn ng-tns-c1048150149-0 ng-star-inserted"></button><button class="carousel__btn ng-tns-c1048150149-0 ng-star-inserted"></button>
  </div>
</div>
```

### 3b. DOM DE ENTRADA — matriz EDS (EL CONTRATO)

```text
carousel (filter: carousel)
  carousel-item*
    media_image + media_imageAlt
    content_text
```

### 3c. Mapeo portal → EDS

| Celda/campo EDS | Elemento del portal | Tipo y nota |
|---|---|---|
| item/fila 0 / `media_image` | `.carousel__slide.ng-star-inserted .carousel__slide__image` | `image`; estado pendiente_dam |
| item/fila 1 / `media_imageAlt` | `.carousel__slide.ng-star-inserted .carousel__slide__image img` | `text`; atributo alt |
| item/fila 2 / `content_text` | `.carousel__slide.ng-star-inserted .carousel__slide__text` | `richtext` |

**content_mapping íntegro y vinculante:**

```json
[
  {
    "source_selector": ".carousel__slide.ng-star-inserted .carousel__slide__image",
    "target_field": "media_image",
    "type": "image",
    "status": "pendiente_dam"
  },
  {
    "source_selector": ".carousel__slide.ng-star-inserted .carousel__slide__image img",
    "target_field": "media_imageAlt",
    "type": "text",
    "source_attribute": "alt"
  },
  {
    "source_selector": ".carousel__slide.ng-star-inserted .carousel__slide__text",
    "target_field": "content_text",
    "type": "richtext"
  }
]
```

El contribuidor debe iterar `.carousel__slides > .carousel__slide.ng-star-inserted` y aplicar cada entrada de `content_mapping` dentro de cada item.

### 3d. DOM DE SALIDA — referencia, no contrato de entrada

```html
<div class="carousel">
  <div class="carousel-content"><!-- nodos originales decorados desde la matriz de 3b --></div>
</div>
```

## 4. Estilos extraídos del portal

Valores medidos en `.eds-pipeline/assets/carousel/computed-styles.json`:

| Elemento medido | Propiedades computadas |
|---|---|
| `div.carousel.ng-tns-c1048150149-0` | `display: grid; position: relative; justify-content: center; align-items: center; gap: normal 80px; grid-template-columns: 544px 816px; grid-template-rows: 578.453px 173.547px; width: 1440px; height: 752px; color: rgba(0, 0, 0, 0.87); font-family: Poppins, sans-serif; font-size: 16px; line-height: 24px; border: 0px none rgba(0, 0, 0, 0.87); overflow: hidden` |
| `h2.carousel__title.ng-tns-c1048150149-0` | `display: block; width: 320px; height: 60px; margin: 0px 0px 8px; color: rgba(0, 0, 0, 0.87); font-family: Poppins, sans-serif; font-size: 40px; line-height: 60px; border: 0px none rgba(0, 0, 0, 0.87)` |
| `p.carousel__subtitle.ng-tns-c1048150149-0` | `display: block; width: 320px; height: 96px; margin: 0px 0px 16px; color: rgb(118, 118, 122); font-family: Poppins, sans-serif; font-size: 16px; line-height: 32px; border: 0px none rgb(118, 118, 122)` |
| `img.carousel__slide__image` | `display: block; width: 352px; max-width: 100%; height: 416px; color: rgba(0, 0, 0, 0.87); font-family: Poppins, sans-serif; font-size: 16px; line-height: 24px; border: 0px none rgba(0, 0, 0, 0.87); object-fit: cover; overflow: clip` |
| `img.carousel__slide__image` | `display: block; width: 352px; max-width: 100%; height: 384px; color: rgba(0, 0, 0, 0.87); font-family: Poppins, sans-serif; font-size: 16px; line-height: 24px; border: 0px none rgba(0, 0, 0, 0.87); object-fit: cover; overflow: clip` |
| `img.carousel__slide__image` | `display: block; width: 352px; max-width: 100%; height: 368px; color: rgba(0, 0, 0, 0.87); font-family: Poppins, sans-serif; font-size: 16px; line-height: 24px; border: 0px none rgba(0, 0, 0, 0.87); object-fit: cover; overflow: clip` |
| `img.carousel__slide__image` | `display: block; width: 100%; max-width: 100%; height: 100%; color: rgba(0, 0, 0, 0.87); font-family: Poppins, sans-serif; font-size: 16px; line-height: 24px; border: 0px none rgba(0, 0, 0, 0.87); object-fit: cover; overflow: clip` |
| `img.carousel__slide__image` | `display: block; width: 352px; max-width: 100%; height: 416px; color: rgba(0, 0, 0, 0.87); font-family: Poppins, sans-serif; font-size: 16px; line-height: 24px; border: 0px none rgba(0, 0, 0, 0.87); object-fit: cover; overflow: clip` |
| `img.carousel__slide__image` | `display: block; width: 352px; max-width: 100%; height: 384px; color: rgba(0, 0, 0, 0.87); font-family: Poppins, sans-serif; font-size: 16px; line-height: 24px; border: 0px none rgba(0, 0, 0, 0.87); object-fit: cover; overflow: clip` |
| `button.carousel__btn.ng-tns-c1048150149-0.carousel__btn--selected.ng-star-inserted` | `display: block; width: 12.7969px; height: 12.7969px; padding: 1px 6px; color: rgb(0, 0, 0); background-color: rgb(119, 119, 123); font-family: Poppins, sans-serif; font-size: 16px; line-height: 24px; text-align: center; border: 0px none rgb(0, 0, 0); border-radius: 100px; aspect-ratio: 1 / 1` |
| `button.carousel__btn.ng-tns-c1048150149-0.ng-star-inserted` | `display: block; width: 12.7969px; height: 12.7969px; padding: 1px 6px; color: rgb(0, 0, 0); background-color: rgba(119, 119, 123, 0.698); font-family: Poppins, sans-serif; font-size: 16px; line-height: 24px; text-align: center; border: 0px none rgb(0, 0, 0); border-radius: 100px; aspect-ratio: 1 / 1` |
| `button.carousel__btn.ng-tns-c1048150149-0.ng-star-inserted` | `display: block; width: 12.7969px; height: 12.7969px; padding: 1px 6px; color: rgb(0, 0, 0); background-color: rgba(119, 119, 123, 0.698); font-family: Poppins, sans-serif; font-size: 16px; line-height: 24px; text-align: center; border: 0px none rgb(0, 0, 0); border-radius: 100px; aspect-ratio: 1 / 1` |
| `button.carousel__btn.ng-tns-c1048150149-0.ng-star-inserted` | `display: block; width: 12.7969px; height: 12.7969px; padding: 1px 6px; color: rgb(0, 0, 0); background-color: rgba(119, 119, 123, 0.698); font-family: Poppins, sans-serif; font-size: 16px; line-height: 24px; text-align: center; border: 0px none rgb(0, 0, 0); border-radius: 100px; aspect-ratio: 1 / 1` |

**Tokens existentes que deben reutilizarse:** se comparan y reutilizan durante implementación; cualquier valor no medido permanece sujeto a los tokens del repositorio y no a estimación visual.

## 5. Campos editables (Universal Editor)

**Contenedor raíz:** usa `template.filter`; los campos siguientes pertenecen a cada item repetible.

| Campo | name | component | valueType | Requerido | Descripción para el autor |
|---|---|---|---|---|---|
| media_image | `media_image` | `reference` | `string` | sí | Campo extraído de la propuesta aprobada. |
| media_imageAlt | `media_imageAlt` | `text` | `string` | sí | Campo extraído de la propuesta aprobada. |
| content_text | `content_text` | `richtext` | `string` | sí | Campo extraído de la propuesta aprobada. |

## 6. Imágenes y rendimiento

| Imagen/campo | Origen | Dimensiones intrínsecas | Ratio | LCP | Tratamiento |
|---|---|---|---|---|---|
| media_image | celda del bloque desde selector del portal | ⚠️ NO EXTRAÍDO — la captura mide el componente, no el asset intrínseco | ⚠️ NO EXTRAÍDO | no | Referencia DAM; EDS entrega picture cuando aplique |

- Las dimensiones de la tabla de sección 2 son del recorte del componente, no del asset; no se reutilizan como dimensiones intrínsecas.
- Los estados `pendiente_dam` o `convertir_svg_local_o_dam` del content_mapping se resuelven como assets locales versionados o DAM autorables antes de contribución.
- Las referencias de imagen deben producir `<picture>` optimizado en EDS; no se copian URLs del portal.


## 7. Interacciones y estados

| Elemento | Estado | Comportamiento | Implementación |
|---|---|---|---|
| controles del carrusel | default | Usa estructura semántica y tokens existentes del repositorio. | HTML/CSS/JS según la referencia aprobada. |
| controles del carrusel | hover | Usa tokens interactivos existentes; no se inventan valores visuales del portal. | CSS. |
| controles del carrusel | focus-visible | Indicador de foco visible con tokens existentes. | CSS :focus-visible. |
| controles del carrusel | active | Ejecuta únicamente la acción asociada al control. | Patrón accesible aprobado. |
| controles del carrusel | disabled | Solo existe si la semántica del control lo requiere. | Atributo disabled/aria-disabled. |

**¿Requiere JS?** Sí cuando controles del carrusel requiera comportamiento; no queda una decisión humana pendiente sobre el patrón de interacción.

## 8. Accesibilidad

- **Nivel objetivo:** WCAG 2.1 AA.
- **Contraste medido cuando hay par explícito color/fondo:**
- button.carousel__btn: rgb(0, 0, 0) sobre rgb(119, 119, 123) = 4.71:1.
- button.carousel__btn: rgb(0, 0, 0) sobre rgba(119, 119, 123, 0.698) = 4.71:1.
- button.carousel__btn: rgb(0, 0, 0) sobre rgba(119, 119, 123, 0.698) = 4.71:1.
- button.carousel__btn: rgb(0, 0, 0) sobre rgba(119, 119, 123, 0.698) = 4.71:1.
- **Orden de tabulación:** debe seguir el orden DOM de controles del carrusel; el patrón accesible aprobado define el foco y la activación.
- **Etiquetas requeridas:** los campos de imagen requieren alt; los controles requieren nombre accesible visible o equivalente.
- **Problemas del portal original que no se replican:** atributos Angular y custom elements no se trasladan al DOM EDS.




## 9. Dependencias

- **Depende de:** ninguna.
- **Requerido por:** ningún ticket declarado en la propuesta.
- Las plantillas adicionales (ninguna) son asociaciones de alcance, no dependencias técnicas.

## 10. Ambigüedades y decisiones pendientes

- Ninguna ambigüedad declarada en la propuesta aprobada.
