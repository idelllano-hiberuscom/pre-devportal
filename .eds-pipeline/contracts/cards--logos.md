# Contrato Técnico — cards--logos

> Ticket: PA-25 (https://hiberus-team-dxp.atlassian.net/browse/PA-25)   ·   Confluence: https://hiberus-team-dxp.atlassian.net/wiki/spaces/PA/pages/214302721
> component_id: cmp-logo-cards   ·   block_name: cards   ·   is_container: sí
> Origen: https://pre-devportaltpv.cloud.cecabank.es/empieza-con-nosotros   ·   Snapshot: 2026-08-10   ·   Confianza: 0.91
> Evidencia: `.eds-pipeline/assets/cards--logos/`
**Variante EDS:** `logos`
**Selector repetible del portal:** `.payment-methods__list__item`

---

## 1. Descripción funcional

Logo Cards corresponde a `cmp-logo-cards` y se materializa sobre el bloque EDS `cards` con variante `logos`.
El componente aparece 1 veces en el portal; 1 apariciones fueron verificadas.
Las páginas observadas son: https://pre-devportaltpv.cloud.cecabank.es/empieza-con-nosotros.
Las plantillas asociadas son onboarding-singleton; onboarding-singleton es la plantilla primaria de Jira.
Las cinco instancias de metodos de pago dentro de tabs repiten una lista de seis logos con la misma semantica y sin interaccion.
Punto de partida: cards (local): Es el mismo contenedor repetible reducido a image; text queda opcional y la diferencia es el layout de logos..

**Apariciones en el portal:** 1 — https://pre-devportaltpv.cloud.cecabank.es/empieza-con-nosotros
**Posición en página:** fuera del primer viewport en desktop
**Variantes observadas:** compact

## 2. Evidencia visual

| Breakpoint | Componente local resoluble | En contexto local resoluble | Medidas del componente | Above the fold |
|---|---|---|---|---|
| desktop 1440px | `../assets/cards--logos/desktop.png` | `../assets/cards--logos/desktop-context.jpg` | 1440px × 244px | no |
| tablet 768px | `../assets/cards--logos/tablet.png` | `../assets/cards--logos/tablet-context.jpg` | 768px × 436px | no |
| mobile 375px | `../assets/cards--logos/mobile.png` | `../assets/cards--logos/mobile-context.jpg` | 375px × 312px | no |

<!-- EDS:IMAGES -->

**Comportamiento responsivo medido:**

- **desktop 1440px:** caja medida 1440px × 244px; ratio 5.9; posición x=0px, y=3386px.
- **tablet 768px:** caja medida 768px × 436px; ratio 1.76; posición x=0px, y=2892px.
- **mobile 375px:** caja medida 375px × 312px; ratio 1.2; posición x=0px, y=2912px.

## 3. DOM del portal → DOM de entrada EDS

### 3a. Fragmento real del portal (EVIDENCIA — no escribir selectores contra este DOM)

```html
<section class="payment-methods">
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
```

### 3b. DOM DE ENTRADA — matriz EDS (EL CONTRATO)

```text
cards (logos)
  card*
    image + imageAlt
```

### 3c. Mapeo portal → EDS

| Celda/campo EDS | Elemento del portal | Tipo y nota |
|---|---|---|
| item/fila 0 / `image` | `.payment-methods__list__item img` | `image`; estado pendiente_dam |
| item/fila 1 / `imageAlt` | `.payment-methods__list__item img` | `text`; atributo alt |

**content_mapping íntegro y vinculante:**

```json
[
  {
    "source_selector": ".payment-methods__list__item img",
    "target_field": "image",
    "type": "image",
    "status": "pendiente_dam"
  },
  {
    "source_selector": ".payment-methods__list__item img",
    "target_field": "imageAlt",
    "type": "text",
    "source_attribute": "alt"
  }
]
```

El contribuidor debe iterar `.payment-methods__list__item` y aplicar cada entrada de `content_mapping` dentro de cada item.

### 3d. DOM DE SALIDA — referencia, no contrato de entrada

```html
<div class="cards logos">
  <div class="cards-content"><!-- nodos originales decorados desde la matriz de 3b --></div>
</div>
```

## 4. Estilos extraídos del portal

Valores medidos en `.eds-pipeline/assets/cards--logos/computed-styles.json`:

| Elemento medido | Propiedades computadas |
|---|---|
| `section.payment-methods` | `display: block; width: 1440px; height: 244px; margin: 48px 0px; color: rgba(0, 0, 0, 0.87); font-family: Poppins, sans-serif; font-size: 16px; line-height: 24px; border: 0px none rgba(0, 0, 0, 0.87)` |
| `h2.payment-methods__header__title` | `display: block; width: 1440px; height: 60px; margin: 0px 0px 8px; color: rgba(0, 0, 0, 0.87); font-family: Poppins, sans-serif; font-size: 40px; line-height: 60px; text-align: center; border: 0px none rgba(0, 0, 0, 0.87)` |
| `ul.payment-methods__list` | `display: flex; justify-content: center; align-items: center; gap: 48px; width: 1440px; height: 144px; margin: 0px 0px 16px; color: rgb(118, 118, 122); font-family: Poppins, sans-serif; font-size: 16px; line-height: 32px; border: 0px none rgb(118, 118, 122)` |
| `li.payment-methods__list__item.ng-star-inserted` | `display: flex; justify-content: center; align-items: center; width: 144px; height: 144px; padding: 16px; color: rgb(118, 118, 122); background-color: rgb(255, 255, 255); font-family: Poppins, sans-serif; font-size: 16px; line-height: 32px; border: 0px none rgb(118, 118, 122); border-radius: 100%; box-shadow: rgba(0, 0, 0, 0.15) 2px 0px 2px 0px, rgba(0, 0, 0, 0.15) 0px 2px 4px 0px` |
| `img` | `display: block; width: 72px; max-width: 100%; height: 49px; color: rgb(118, 118, 122); font-family: Poppins, sans-serif; font-size: 16px; line-height: 32px; border: 0px none rgb(118, 118, 122); overflow: clip` |
| `li.payment-methods__list__item.ng-star-inserted` | `display: flex; justify-content: center; align-items: center; width: 144px; height: 144px; padding: 16px; color: rgb(118, 118, 122); background-color: rgb(255, 255, 255); font-family: Poppins, sans-serif; font-size: 16px; line-height: 32px; border: 0px none rgb(118, 118, 122); border-radius: 100%; box-shadow: rgba(0, 0, 0, 0.15) 2px 0px 2px 0px, rgba(0, 0, 0, 0.15) 0px 2px 4px 0px` |
| `img` | `display: block; width: 100px; max-width: 100%; height: 43px; color: rgb(118, 118, 122); font-family: Poppins, sans-serif; font-size: 16px; line-height: 32px; border: 0px none rgb(118, 118, 122); overflow: clip` |
| `li.payment-methods__list__item.ng-star-inserted` | `display: flex; justify-content: center; align-items: center; width: 144px; height: 144px; padding: 16px; color: rgb(118, 118, 122); background-color: rgb(255, 255, 255); font-family: Poppins, sans-serif; font-size: 16px; line-height: 32px; border: 0px none rgb(118, 118, 122); border-radius: 100%; box-shadow: rgba(0, 0, 0, 0.15) 2px 0px 2px 0px, rgba(0, 0, 0, 0.15) 0px 2px 4px 0px` |
| `img` | `display: block; width: 112px; max-width: 100%; height: 37.3281px; color: rgb(118, 118, 122); font-family: Poppins, sans-serif; font-size: 16px; line-height: 32px; border: 0px none rgb(118, 118, 122); overflow: clip` |
| `li.payment-methods__list__item.ng-star-inserted` | `display: flex; justify-content: center; align-items: center; width: 144px; height: 144px; padding: 16px; color: rgb(118, 118, 122); background-color: rgb(255, 255, 255); font-family: Poppins, sans-serif; font-size: 16px; line-height: 32px; border: 0px none rgb(118, 118, 122); border-radius: 100%; box-shadow: rgba(0, 0, 0, 0.15) 2px 0px 2px 0px, rgba(0, 0, 0, 0.15) 0px 2px 4px 0px` |
| `img` | `display: block; width: 100px; max-width: 100%; height: 40px; color: rgb(118, 118, 122); font-family: Poppins, sans-serif; font-size: 16px; line-height: 32px; border: 0px none rgb(118, 118, 122); overflow: clip` |
| `li.payment-methods__list__item.ng-star-inserted` | `display: flex; justify-content: center; align-items: center; width: 144px; height: 144px; padding: 16px; color: rgb(118, 118, 122); background-color: rgb(255, 255, 255); font-family: Poppins, sans-serif; font-size: 16px; line-height: 32px; border: 0px none rgb(118, 118, 122); border-radius: 100%; box-shadow: rgba(0, 0, 0, 0.15) 2px 0px 2px 0px, rgba(0, 0, 0, 0.15) 0px 2px 4px 0px` |
| `img` | `display: block; width: 80px; max-width: 100%; height: 51px; color: rgb(118, 118, 122); font-family: Poppins, sans-serif; font-size: 16px; line-height: 32px; border: 0px none rgb(118, 118, 122); overflow: clip` |

**Tokens existentes que deben reutilizarse:** se comparan y reutilizan durante implementación; cualquier valor no medido permanece sujeto a los tokens del repositorio y no a estimación visual.

## 5. Campos editables (Universal Editor)

**Contenedor raíz:** usa `template.filter`; los campos siguientes pertenecen a cada item repetible.

| Campo | name | component | valueType | Requerido | Descripción para el autor |
|---|---|---|---|---|---|
| image | `image` | `reference` | `string` | sí | Campo extraído de la propuesta aprobada. |
| imageAlt | `imageAlt` | `text` | `string` | sí | Campo extraído de la propuesta aprobada. |
| text | `text` | `richtext` | `string` | no | Campo extraído de la propuesta aprobada. |

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
- li.payment-methods__list__item: rgb(118, 118, 122) sobre rgb(255, 255, 255) = 4.52:1.
- li.payment-methods__list__item: rgb(118, 118, 122) sobre rgb(255, 255, 255) = 4.52:1.
- li.payment-methods__list__item: rgb(118, 118, 122) sobre rgb(255, 255, 255) = 4.52:1.
- li.payment-methods__list__item: rgb(118, 118, 122) sobre rgb(255, 255, 255) = 4.52:1.
- li.payment-methods__list__item: rgb(118, 118, 122) sobre rgb(255, 255, 255) = 4.52:1.
- li.payment-methods__list__item: rgb(118, 118, 122) sobre rgb(255, 255, 255) = 4.52:1.
- **Orden de tabulación:** no añade controles propios al orden de tabulación.
- **Etiquetas requeridas:** los campos de imagen requieren alt; los controles requieren nombre accesible visible o equivalente.
- **Problemas del portal original que no se replican:** atributos Angular y custom elements no se trasladan al DOM EDS.




## 9. Dependencias

- **Depende de:** ninguna.
- **Requerido por:** ningún ticket declarado en la propuesta.
- Las plantillas adicionales (ninguna) son asociaciones de alcance, no dependencias técnicas.

## 10. Ambigüedades y decisiones pendientes

- Ninguna ambigüedad declarada en la propuesta aprobada.
