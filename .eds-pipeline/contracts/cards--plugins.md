# Contrato Técnico — cards--plugins

> Ticket: PA-32 (https://hiberus-team-dxp.atlassian.net/browse/PA-32)   ·   Confluence: https://hiberus-team-dxp.atlassian.net/wiki/spaces/PA/pages/214237185
> component_id: cmp-plugin-cards   ·   block_name: cards   ·   is_container: sí
> Origen: https://pre-devportaltpv.cloud.cecabank.es/herramientas-para-desarrolladores/sin-integracion/plugins/resumen   ·   Snapshot: 2026-08-10   ·   Confianza: 0.83
> Evidencia: `.eds-pipeline/assets/cards--plugins/`
**Variante EDS:** `plugins`
**Selector repetible del portal:** `.plugin-list > plugin-card`

---

## 1. Descripción funcional

Plugin Cards corresponde a `cmp-plugin-cards` y se materializa sobre el bloque EDS `cards` con variante `plugins`.
El componente aparece 1 veces en el portal; 1 apariciones fueron verificadas.
Las páginas observadas son: https://pre-devportaltpv.cloud.cecabank.es/herramientas-para-desarrolladores/sin-integracion/plugins/resumen.
Las plantillas asociadas son developer-tools-payment-detail; developer-tools-payment-detail es la plantilla primaria de Jira.
Las cinco tarjetas comparten logo, version, fecha, compatibilidad, descripcion y enlace. Son una variante de cards porque el comportamiento sigue siendo un enlace estatico por item.
Punto de partida: cards (local): Mantiene imagen y contenido repetible, pero requiere enlace de tarjeta y metadatos editoriales dentro del richtext..

**Apariciones en el portal:** 1 — https://pre-devportaltpv.cloud.cecabank.es/herramientas-para-desarrolladores/sin-integracion/plugins/resumen
**Posición en página:** above the fold en desktop
**Variantes observadas:** ninguna

## 2. Evidencia visual

| Breakpoint | Componente local resoluble | En contexto local resoluble | Medidas del componente | Above the fold |
|---|---|---|---|---|
| desktop 1440px | `../assets/cards--plugins/desktop.png` | `../assets/cards--plugins/desktop-context.jpg` | 1126px × 652px | sí |
| tablet 768px | `../assets/cards--plugins/tablet.png` | `../assets/cards--plugins/tablet-context.jpg` | 672px × 898px | sí |
| mobile 375px | `../assets/cards--plugins/mobile.png` | `../assets/cards--plugins/mobile-context.jpg` | 279px × 1546px | sí |

<!-- EDS:IMAGES -->

**Comportamiento responsivo medido:**

- **desktop 1440px:** caja medida 1126px × 652px; ratio 1.73; posición x=282px, y=383px.
- **tablet 768px:** caja medida 672px × 898px; ratio 0.75; posición x=48px, y=519px.
- **mobile 375px:** caja medida 279px × 1546px; ratio 0.18; posición x=48px, y=603px.

## 3. DOM del portal → DOM de entrada EDS

### 3a. Fragmento real del portal (EVIDENCIA — no escribir selectores contra este DOM)

```html
<div class="plugin-list">
    <plugin-card>
<a class="plugin-card ng-star-inserted" href="/plugin/herramientas-para-desarrolladores/sin-integracion/plugins/woocomerce">
  <div class="plugin-card-header">
    <img class="plugin-card-img" src="https://aws-cecabank-drupal-s3.s3.eu-west-1.amazonaws.com/public/styles/medium/public/plugin/woocommerce-logo-transp.png.webp?VersionId=JZU9WaCI6CwpsRG74LBlVMkaIF.BoYYb&amp;itok=bmpvJFCo" alt="Woocomerce" height="100" width="494">
  </div>
  <div class="plugin-card-body">
    <div>
      <span jhitranslate="global.api.plugins.version">Versión:</span> 1.4.2
    </div>
    <div>
      <span jhitranslate="global.api.plugins.date">Fecha:</span> 19/10/2023
    </div>
    <div>
      <span jhitranslate="global.api.plugins.compatibility">Compatibilidad:</span>
      WooCommerce
    </div>
    <div class="plugin-card-description ng-star-inserted">
      Permite habilitar pagos con tarjeta en tiendas WooCommerce mediante una integración sencilla del TPV Virtual.
    </div>
  </div>
</a>
</plugin-card><plugin-card>
<a class="plugin-card ng-star-inserted" href="/plugin/herramientas-para-desarrolladores/sin-integracion/plugins/prestashop">
  <div class="plugin-card-header">
    <img class="plugin-card-img" src="https://aws-cecabank-drupal-s3.s3.eu-west-1.amazonaws.com/public/styles/medium/public/plugin/prestashop-transparente1.png.webp?VersionId=gGpZ0OMRqJ8HYvcoHLrfTzfC1ONsf9dV&amp;itok=FutV7IrK" alt="Prestashop" height="100" width="607">
  </div>
  <div class="plugin-card-body">
    <div>
      <span jhitranslate="global.api.plugins.version">Versión:</span> 1.4.2
    </div>
    <div>
      <span jhitranslate="global.api.plugins.date">Fecha:</span> 19/10/2023
    </div>
    <div>
      <span jhitranslate="global.api.plugins.compatibility">Compatibilidad:</span>
      Prestashop 1.6 y 1.7
    </div>
    <div class="plugin-card-description ng-star-inserted">
      Solución para integrar el TPV Virtual en tiendas PrestaShop, con compatibilidad total y proceso de pago transparente.
    </div>
  </div>
</a>
</plugin-card><plugin-card>
<a class="plugin-card ng-star-inserted" href="/plugin/herramientas-para-desarrolladores/sin-integracion/plugins/magento">
  <div class="plugin-card-header">
    <img class="plugin-card-img" src="https://aws-cecabank-drupal-s3.s3.eu-west-1.amazonaws.com/public/styles/medium/public/plugin/magento-transparente1.png.webp?VersionId=oLhJcGjLEKShi2Zp_NqMN29Tyl9tKQHT&amp;itok=6WK98ruH" alt="Magento" height="100" width="362">
  </div>
  <div class="plugin-card-body">
    <div>
      <span jhitranslate="global.api.plugins.version">Versión:</span> 1.4.2
    </div>
    <div>
      <span jhitranslate="global.api.plugins.date">Fecha:</span> 19/03/2023
    </div>
    <div>
      <span jhitranslate="global.api.plugins.compatibility">Compatibilidad:</span>
      Magento
    </div>
    <div class="plugin-card-description ng-star-inserted">
      Integración del TPV Virtual con Magento, ofreciendo alta seguridad y rendimiento en entornos de e-commerce escalables.
    </div>
  </div>
</a>
</plugin-card><plugin-card>
<a class="plugin-card ng-star-inserted" href="/plugin/herramientas-para-desarrolladores/sin-integracion/plugins/oscommerce">
  <div class="plugin-card-header">
    <img class="plugin-card-img" src="https://aws-cecabank-drupal-s3.s3.eu-west-1.amazonaws.com/public/styles/medium/public/plugin/oscommerce-transparente.png.webp?VersionId=ipGI9_T5NE689Q6tBufs4q4FbUiqgIcX&amp;itok=wWO-vW2L" alt="OsCommerce" height="605" width="3545">
  </div>
  <div class="plugin-card-body">
    <div>
      <span jhitranslate="global.api.plugins.version">Versión:</span> 1.4.2
    </div>
    <div>
      <span jhitranslate="global.api.plugins.date">Fecha:</span> 19/10/2023
    </div>
    <div>
      <span jhitranslate="global.api.plugins.compatibility">Compatibilidad:</span>
      osCommerce
    </div>
    <div class="plugin-card-description ng-star-inserted">
      Módulo de TPV para osCommerce que simplifica la gestión de pagos sin requerir configuraciones técnicas complejas.
    </div>
  </div>
</a>
</plugin-card><plugin-card>
<a class="plugin-card ng-star-inserted" href="/plugin/herramientas-para-desarrolladores/sin-integracion/plugins/givewp">
  <div class="plugin-card-header">
    <img class="plugin-card-img" src="https://aws-cecabank-drupal-s3.s3.eu-west-1.amazonaws.com/public/styles/medium/public/plugin/Give%20Logo.png.webp?VersionId=XEI6K2EXaM6o4JV_pH5XoH.Yji5M_lj8&amp;itok=z78z2bUX" alt="GiveWP" height="100" width="305">
  </div>
  <div class="plugin-card-body">
    <div>
      <span jhitranslate="global.api.plugins.version">Versión:</span> 1.4.2
    </div>
    <div>
      <span jhitranslate="global.api.plugins.date">Fecha:</span> 10/06/2015
    </div>
    <div>
      <span jhitranslate="global.api.plugins.compatibility">Compatibilidad:</span>
      WordPress (GiveWP)
    </div>
    <div class="plugin-card-description ng-star-inserted">
      Plugin para ONGs que integra el TPV Virtual con los formularios de donación de GiveWP, permitiendo la gestión de pagos y obtener reportes.
    </div>
  </div>
</a>
</plugin-card>
</div>
```

### 3b. DOM DE ENTRADA — matriz EDS (EL CONTRATO)

```text
cards (plugins)
  card*
    image + imageAlt
    text: version + fecha + compatibilidad + descripcion
    link
```

### 3c. Mapeo portal → EDS

| Celda/campo EDS | Elemento del portal | Tipo y nota |
|---|---|---|
| item/fila 0 / `image` | `.plugin-card-img` | `image`; estado pendiente_dam |
| item/fila 1 / `imageAlt` | `.plugin-card-img img` | `text`; atributo alt |
| item/fila 2 / `text` | `.plugin-card-body` | `richtext` |
| item/fila 3 / `link` | `a.plugin-card` | `text`; atributo href |

**content_mapping íntegro y vinculante:**

```json
[
  {
    "source_selector": ".plugin-card-img",
    "target_field": "image",
    "type": "image",
    "status": "pendiente_dam"
  },
  {
    "source_selector": ".plugin-card-img img",
    "target_field": "imageAlt",
    "type": "text",
    "source_attribute": "alt"
  },
  {
    "source_selector": ".plugin-card-body",
    "target_field": "text",
    "type": "richtext"
  },
  {
    "source_selector": "a.plugin-card",
    "target_field": "link",
    "type": "text",
    "source_attribute": "href"
  }
]
```

El contribuidor debe iterar `.plugin-list > plugin-card` y aplicar cada entrada de `content_mapping` dentro de cada item.

### 3d. DOM DE SALIDA — referencia, no contrato de entrada

```html
<div class="cards plugins">
  <div class="cards-content"><!-- nodos originales decorados desde la matriz de 3b --></div>
</div>
```

## 4. Estilos extraídos del portal

Valores medidos en `.eds-pipeline/assets/cards--plugins/computed-styles.json`:

| Elemento medido | Propiedades computadas |
|---|---|
| `div.plugin-list` | `display: grid; gap: 24px; grid-template-columns: 263.5px 263.5px 263.5px 263.5px; grid-template-rows: 306px 322px; width: 1126px; height: 652px; margin: 32px 32px 51.2px; color: rgba(0, 0, 0, 0.87); font-family: Poppins, sans-serif; font-size: 16px; line-height: 24px; border: 0px none rgba(0, 0, 0, 0.87)` |
| `a.plugin-card.ng-star-inserted` | `display: flex; flex-direction: column; justify-content: space-between; width: 263.5px; height: 306px; min-height: 280px; padding: 24px; color: rgb(1, 127, 155); background-color: rgb(255, 255, 255); font-family: Poppins, sans-serif; font-size: 16px; line-height: 32px; border: 0px none rgb(1, 127, 155); border-radius: 8px; box-shadow: rgba(0, 0, 0, 0.15) 2px 0px 2px 0px, rgba(0, 0, 0, 0.15) 0px 2px 4px 0px` |
| `img.plugin-card-img` | `display: block; width: 180px; max-width: 180px; height: 36.8125px; margin: 26.5938px 17.75px; color: rgb(1, 127, 155); font-family: Poppins, sans-serif; font-size: 16px; line-height: 32px; border: 0px none rgb(1, 127, 155); object-fit: contain; aspect-ratio: auto 494 / 100; overflow: clip` |
| `a.plugin-card.ng-star-inserted` | `display: flex; flex-direction: column; justify-content: space-between; width: 263.5px; height: 306px; min-height: 280px; padding: 24px; color: rgb(1, 127, 155); background-color: rgb(255, 255, 255); font-family: Poppins, sans-serif; font-size: 16px; line-height: 32px; border: 0px none rgb(1, 127, 155); border-radius: 8px; box-shadow: rgba(0, 0, 0, 0.15) 2px 0px 2px 0px, rgba(0, 0, 0, 0.15) 0px 2px 4px 0px` |
| `img.plugin-card-img` | `display: block; width: 180px; max-width: 180px; height: 29.4531px; margin: 30.2656px 17.75px; color: rgb(1, 127, 155); font-family: Poppins, sans-serif; font-size: 16px; line-height: 32px; border: 0px none rgb(1, 127, 155); object-fit: contain; aspect-ratio: auto 607 / 100; overflow: clip` |
| `a.plugin-card.ng-star-inserted` | `display: flex; flex-direction: column; justify-content: space-between; width: 263.5px; height: 306px; min-height: 280px; padding: 24px; color: rgb(1, 127, 155); background-color: rgb(255, 255, 255); font-family: Poppins, sans-serif; font-size: 16px; line-height: 32px; border: 0px none rgb(1, 127, 155); border-radius: 8px; box-shadow: rgba(0, 0, 0, 0.15) 2px 0px 2px 0px, rgba(0, 0, 0, 0.15) 0px 2px 4px 0px` |
| `img.plugin-card-img` | `display: block; width: 180px; max-width: 180px; height: 49.9062px; margin: 20.0469px 17.75px; color: rgb(1, 127, 155); font-family: Poppins, sans-serif; font-size: 16px; line-height: 32px; border: 0px none rgb(1, 127, 155); object-fit: contain; aspect-ratio: auto 362 / 100; overflow: clip` |
| `a.plugin-card.ng-star-inserted` | `display: flex; flex-direction: column; justify-content: space-between; width: 263.5px; height: 306px; min-height: 280px; padding: 24px; color: rgb(1, 127, 155); background-color: rgb(255, 255, 255); font-family: Poppins, sans-serif; font-size: 16px; line-height: 32px; border: 0px none rgb(1, 127, 155); border-radius: 8px; box-shadow: rgba(0, 0, 0, 0.15) 2px 0px 2px 0px, rgba(0, 0, 0, 0.15) 0px 2px 4px 0px` |
| `img.plugin-card-img` | `display: block; width: 180px; max-width: 180px; height: 31.0781px; margin: 29.4531px 17.75px; color: rgb(1, 127, 155); font-family: Poppins, sans-serif; font-size: 16px; line-height: 32px; border: 0px none rgb(1, 127, 155); object-fit: contain; aspect-ratio: auto 3545 / 605; overflow: clip` |
| `a.plugin-card.ng-star-inserted` | `display: flex; flex-direction: column; justify-content: space-between; width: 263.5px; height: 322px; min-height: 280px; padding: 24px; color: rgb(1, 127, 155); background-color: rgb(255, 255, 255); font-family: Poppins, sans-serif; font-size: 16px; line-height: 32px; border: 0px none rgb(1, 127, 155); border-radius: 8px; box-shadow: rgba(0, 0, 0, 0.15) 2px 0px 2px 0px, rgba(0, 0, 0, 0.15) 0px 2px 4px 0px` |
| `img.plugin-card-img` | `display: block; width: 180px; max-width: 180px; height: 58.9062px; margin: 15.5469px 17.75px; color: rgb(1, 127, 155); font-family: Poppins, sans-serif; font-size: 16px; line-height: 32px; border: 0px none rgb(1, 127, 155); object-fit: contain; aspect-ratio: auto 305 / 100; overflow: clip` |

**Tokens existentes que deben reutilizarse:** se comparan y reutilizan durante implementación; cualquier valor no medido permanece sujeto a los tokens del repositorio y no a estimación visual.

## 5. Campos editables (Universal Editor)

**Contenedor raíz:** usa `template.filter`; los campos siguientes pertenecen a cada item repetible.

| Campo | name | component | valueType | Requerido | Descripción para el autor |
|---|---|---|---|---|---|
| image | `image` | `reference` | `string` | sí | Campo extraído de la propuesta aprobada. |
| imageAlt | `imageAlt` | `text` | `string` | sí | Campo extraído de la propuesta aprobada. |
| text | `text` | `richtext` | `string` | sí | Campo extraído de la propuesta aprobada. |
| link | `link` | `text` | `string` | sí | Campo extraído de la propuesta aprobada. |

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
| enlace de tarjeta | default | Usa estructura semántica y tokens existentes del repositorio. | HTML/CSS/JS según la referencia aprobada. |
| enlace de tarjeta | hover | Usa tokens interactivos existentes; no se inventan valores visuales del portal. | CSS. |
| enlace de tarjeta | focus-visible | Indicador de foco visible con tokens existentes. | CSS :focus-visible. |
| enlace de tarjeta | active | Ejecuta únicamente la acción asociada al control. | Patrón accesible aprobado. |
| enlace de tarjeta | disabled | Solo existe si la semántica del control lo requiere. | Atributo disabled/aria-disabled. |

**¿Requiere JS?** Sí cuando enlace de tarjeta requiera comportamiento; no queda una decisión humana pendiente sobre el patrón de interacción.

## 8. Accesibilidad

- **Nivel objetivo:** WCAG 2.1 AA.
- **Contraste medido cuando hay par explícito color/fondo:**
- a.plugin-card: rgb(1, 127, 155) sobre rgb(255, 255, 255) = 4.66:1.
- a.plugin-card: rgb(1, 127, 155) sobre rgb(255, 255, 255) = 4.66:1.
- a.plugin-card: rgb(1, 127, 155) sobre rgb(255, 255, 255) = 4.66:1.
- a.plugin-card: rgb(1, 127, 155) sobre rgb(255, 255, 255) = 4.66:1.
- a.plugin-card: rgb(1, 127, 155) sobre rgb(255, 255, 255) = 4.66:1.
- **Orden de tabulación:** debe seguir el orden DOM de enlace de tarjeta; el patrón accesible aprobado define el foco y la activación.
- **Etiquetas requeridas:** los campos de imagen requieren alt; los controles requieren nombre accesible visible o equivalente.
- **Problemas del portal original que no se replican:** atributos Angular y custom elements no se trasladan al DOM EDS.




## 9. Dependencias

- **Depende de:** PA-31.
- **Requerido por:** ningún ticket declarado en la propuesta.
- Las plantillas adicionales (ninguna) son asociaciones de alcance, no dependencias técnicas.

## 10. Ambigüedades y decisiones pendientes

- Ninguna ambigüedad declarada en la propuesta aprobada.
