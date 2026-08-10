# Contrato Técnico — video

> Ticket: PA-29 (https://hiberus-team-dxp.atlassian.net/browse/PA-29)   ·   Confluence: https://hiberus-team-dxp.atlassian.net/wiki/spaces/PA/pages/214138881
> component_id: cmp-video   ·   block_name: video   ·   is_container: sí
> Origen: https://pre-devportaltpv.cloud.cecabank.es/inicio   ·   Snapshot: 2026-08-10   ·   Confianza: 0.96
> Evidencia: `.eds-pipeline/assets/video/`
**Selector repetible del portal:** `source`

---

## 1. Descripción funcional

Video corresponde a `cmp-video` y se materializa sobre el bloque EDS `video`.
El componente aparece 1 veces en el portal; 1 apariciones fueron verificadas.
Las páginas observadas son: https://pre-devportaltpv.cloud.cecabank.es/inicio.
Las plantillas asociadas son home-help-shared; home-help-shared es la plantilla primaria de Jira.
La unica secuencia es un video MP4 simple y responsive. No requiere un embed nuevo ni comportamiento especifico del portal.
Punto de partida: video: se reutiliza Modelo URI/placeholder, lazy loading y comportamiento responsive.; se adapta Tokens de espaciado..

**Apariciones en el portal:** 1 — https://pre-devportaltpv.cloud.cecabank.es/inicio
**Posición en página:** fuera del primer viewport en desktop
**Variantes observadas:** ninguna

## 2. Evidencia visual

| Breakpoint | Componente local resoluble | En contexto local resoluble | Medidas del componente | Above the fold |
|---|---|---|---|---|
| desktop 1440px | `../assets/video/desktop.png` | `../assets/video/desktop-context.jpg` | 1376px × 737px | no |
| tablet 768px | `../assets/video/tablet.png` | `../assets/video/tablet-context.jpg` | 704px × 353px | no |
| mobile 375px | `../assets/video/mobile.png` | `../assets/video/mobile-context.jpg` | 311px × 261px | no |

<!-- EDS:IMAGES -->

**Comportamiento responsivo medido:**

- **desktop 1440px:** caja medida 1376px × 737px; ratio 1.87; posición x=32px, y=4528px.
- **tablet 768px:** caja medida 704px × 353px; ratio 1.99; posición x=32px, y=4286px.
- **mobile 375px:** caja medida 311px × 261px; ratio 1.19; posición x=32px, y=5546px.

## 3. DOM del portal → DOM de entrada EDS

### 3a. Fragmento real del portal (EVIDENCIA — no escribir selectores contra este DOM)

```html
<article class="media media--type-video media--view-mode-default">
  <div class="field field--name-field-media-video-file field--type-file field--label-visually_hidden">
    <div class="field__label visually-hidden">Video file</div>
              <div class="field__item">
<video controls="controls" width="640" height="480">
      <source src="https://aws-cecabank-drupal-s3.s3.eu-west-1.amazonaws.com/public/media/video/2025-06/20250619_video.mp4?VersionId=YgZySTspa.2yz8BESbnV1HME3.RWZoaj" type="video/mp4">
  </video>
</div>
          </div>
  </article>
```

### 3b. DOM DE ENTRADA — matriz EDS (EL CONTRATO)

```text
video (filter: video)
  video item
    uri
    classes
    placeholder_image + placeholder_imageAlt
```

### 3c. Mapeo portal → EDS

| Celda/campo EDS | Elemento del portal | Tipo y nota |
|---|---|---|
| item/fila 0 / `uri` | `source` | `image`; estado pendiente_dam |

**content_mapping íntegro y vinculante:**

```json
[
  {
    "source_selector": "source",
    "target_field": "uri",
    "type": "image",
    "status": "pendiente_dam"
  }
]
```

El contribuidor debe iterar `source` y aplicar cada entrada de `content_mapping` dentro de cada item.

### 3d. DOM DE SALIDA — referencia, no contrato de entrada

```html
<div class="video">
  <div class="video-content"><!-- nodos originales decorados desde la matriz de 3b --></div>
</div>
```

## 4. Estilos extraídos del portal

Valores medidos en `.eds-pipeline/assets/video/computed-styles.json`:

| Elemento medido | Propiedades computadas |
|---|---|
| `article.media.media--type-video.media--view-mode-default` | `display: block; width: 1376px; height: 737px; padding: 256px 208px; color: rgba(0, 0, 0, 0.87); font-family: Poppins, sans-serif; font-size: 16px; line-height: 24px; border: 0px none rgba(0, 0, 0, 0.87)` |

**Tokens existentes que deben reutilizarse:** se comparan y reutilizan durante implementación; cualquier valor no medido permanece sujeto a los tokens del repositorio y no a estimación visual.

## 5. Campos editables (Universal Editor)

**Contenedor raíz:** usa `template.filter`; los campos siguientes pertenecen a cada item repetible.

| Campo | name | component | valueType | Requerido | Descripción para el autor |
|---|---|---|---|---|---|
| uri | `uri` | `aem-content` | `string` | sí | Campo extraído de la propuesta aprobada. |
| classes | `classes` | `multiselect` | `string` | no | Campo extraído de la propuesta aprobada. |
| placeholder_image | `placeholder_image` | `reference` | `string` | no | Campo extraído de la propuesta aprobada. |
| placeholder_imageAlt | `placeholder_imageAlt` | `text` | `string` | no | Campo extraído de la propuesta aprobada. |

## 6. Imágenes y rendimiento

| Imagen/campo | Origen | Dimensiones intrínsecas | Ratio | LCP | Tratamiento |
|---|---|---|---|---|---|
| placeholder_image | ⚠️ NO MAPEADO | ⚠️ NO EXTRAÍDO — la captura mide el componente, no el asset intrínseco | ⚠️ NO EXTRAÍDO | no | Referencia DAM; EDS entrega picture cuando aplique |

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

- **Depende de:** ninguna.
- **Requerido por:** ningún ticket declarado en la propuesta.
- Las plantillas adicionales (ninguna) son asociaciones de alcance, no dependencias técnicas.

## 10. Ambigüedades y decisiones pendientes

- Ninguna ambigüedad declarada en la propuesta aprobada.
