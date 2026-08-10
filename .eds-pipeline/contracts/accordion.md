# Contrato Técnico — accordion

> Ticket: PA-27 (https://hiberus-team-dxp.atlassian.net/browse/PA-27)   ·   Confluence: https://hiberus-team-dxp.atlassian.net/wiki/spaces/PA/pages/214401025
> component_id: cmp-accordion   ·   block_name: accordion   ·   is_container: sí
> Origen: https://pre-devportaltpv.cloud.cecabank.es/ayuda   ·   Snapshot: 2026-08-10   ·   Confianza: 0.97
> Evidencia: `.eds-pipeline/assets/accordion/`
**Selector repetible del portal:** `.accordion-container__items > component-wrapper`

---

## 1. Descripción funcional

Accordion corresponde a `cmp-accordion` y se materializa sobre el bloque EDS `accordion`.
El componente aparece 1 veces en el portal; 1 apariciones fueron verificadas.
Las páginas observadas son: https://pre-devportaltpv.cloud.cecabank.es/ayuda.
Las plantillas asociadas son home-help-shared; home-help-shared es la plantilla primaria de Jira.
Los items observados tienen exactamente pregunta y respuesta desplegable. El titulo de seccion queda como contenido por defecto anterior al bloque.
Punto de partida: accordion: se reutiliza Modelo summary + text, filtro de items y decoracion con details/summary.; se adapta Tokens visuales del cliente..

**Apariciones en el portal:** 1 — https://pre-devportaltpv.cloud.cecabank.es/ayuda
**Posición en página:** fuera del primer viewport en desktop
**Variantes observadas:** ninguna

## 2. Evidencia visual

| Breakpoint | Componente local resoluble | En contexto local resoluble | Medidas del componente | Above the fold |
|---|---|---|---|---|
| desktop 1440px | `../assets/accordion/desktop.png` | `../assets/accordion/desktop-context.jpg` | 1440px × 476px | no |
| tablet 768px | `../assets/accordion/tablet.png` | `../assets/accordion/tablet-context.jpg` | 768px × 548px | sí |
| mobile 375px | `../assets/accordion/mobile.png` | `../assets/accordion/mobile-context.jpg` | 375px × 640px | sí |

<!-- EDS:IMAGES -->

**Comportamiento responsivo medido:**

- **desktop 1440px:** caja medida 1440px × 476px; ratio 3.03; posición x=0px, y=977px.
- **tablet 768px:** caja medida 768px × 548px; ratio 1.4; posición x=0px, y=961px.
- **mobile 375px:** caja medida 375px × 640px; ratio 0.59; posición x=0px, y=705px.

## 3. DOM del portal → DOM de entrada EDS

### 3a. Fragmento real del portal (EVIDENCIA — no escribir selectores contra este DOM)

```html
<div class="accordion-container">
  <div class="accordion-container__title">
    <h2>Preguntas Frecuentes</h2>
  </div>
  <div class="accordion-container__items">
    <component-wrapper><accordion-item><div class="accordion-item">
  <div class="accordion-item__header">
    <div class="accordion-item__header__title">
      ¿Tienes un negocio y estás interesado en realizar ventas online?
    </div>
    <lucide-angular size="24" class="accordion-item__header__icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus accordion-item__header__icon"><path d="M5 12h14" key="1ays0h"></path><path d="M12 5v14" key="s699le"></path></svg></lucide-angular>
  </div>
  <div class="accordion-item__content collapsed">
    <div>Para poder contratar el TPV Virtual debes de escribirnos a XXX o llamar a XXX para que podamos darte toda la información necesaria. Podrás comenzar a realizar ventas online en unos pocos clics. </div>
  </div>
</div>
</accordion-item>
</component-wrapper>
<component-wrapper><accordion-item><div class="accordion-item">
  <div class="accordion-item__header">
    <div class="accordion-item__header__title">
      ¿Qué métodos de pago están habilitados en el TPV Virtual?
    </div>
    <lucide-angular size="24" class="accordion-item__header__icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus accordion-item__header__icon"><path d="M5 12h14" key="1ays0h"></path><path d="M12 5v14" key="s699le"></path></svg></lucide-angular>
  </div>
  <div class="accordion-item__content collapsed">
    <div>El TPV Virtual tiene disponibles múltiples métodos de pago para realizar venta online. Entre ellos se encuentran tarjetas de débito y crédito de Mastercard, Visa y American Express; Bizum, Apple Pay y Google Pay, y PlazoX.</div>
  </div>
</div>
</accordion-item>
</component-wrapper>
<component-wrapper><accordion-item><div class="accordion-item">
  <div class="accordion-item__header">
    <div class="accordion-item__header__title">
      ¿Qué plataformas de comercio electrónico están integradas con nuestro TPV Virtual?
    </div>
    <lucide-angular size="24" class="accordion-item__header__icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus accordion-item__header__icon"><path d="M5 12h14" key="1ays0h"></path><path d="M12 5v14" key="s699le"></path></svg></lucide-angular>
  </div>
  <div class="accordion-item__content collapsed">
    <div>Podrás integrar nuestro TPV Virtual si tu plataforma de comercio electrónico se encuentra desarrollado con WooCommerce, PrestaShop, Magento, OsCommerce, GiveWP.</div>
  </div>
</div>
</accordion-item>
</component-wrapper>
<component-wrapper><accordion-item><div class="accordion-item">
  <div class="accordion-item__header">
    <div class="accordion-item__header__title">
      ¿El TPV Virtual acepta pagos con BIZUM?
    </div>
    <lucide-angular size="24" class="accordion-item__header__icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus accordion-item__header__icon"><path d="M5 12h14" key="1ays0h"></path><path d="M12 5v14" key="s699le"></path></svg></lucide-angular>
  </div>
  <div class="accordion-item__content collapsed">
    <div>Sí, en el caso de querer activar Bizum en su comercio electrónico, debe de realizar la petición a la entidad bancaria para que le active dicho método de pago y pueda comenzar a realizar cobros vía Bizum.</div>
  </div>
</div>
</accordion-item>
</component-wrapper>
  </div>
</div>
```

### 3b. DOM DE ENTRADA — matriz EDS (EL CONTRATO)

```text
accordion (filter: accordion)
  accordion-item*
    summary
    text
```

### 3c. Mapeo portal → EDS

| Celda/campo EDS | Elemento del portal | Tipo y nota |
|---|---|---|
| item/fila 0 / `summary` | `.accordion-item__header__title` | `text` |
| item/fila 1 / `text` | `.accordion-item__content` | `richtext` |

**content_mapping íntegro y vinculante:**

```json
[
  {
    "source_selector": ".accordion-item__header__title",
    "target_field": "summary",
    "type": "text"
  },
  {
    "source_selector": ".accordion-item__content",
    "target_field": "text",
    "type": "richtext"
  }
]
```

El contribuidor debe iterar `.accordion-container__items > component-wrapper` y aplicar cada entrada de `content_mapping` dentro de cada item.

### 3d. DOM DE SALIDA — referencia, no contrato de entrada

```html
<div class="accordion">
  <div class="accordion-content"><!-- nodos originales decorados desde la matriz de 3b --></div>
</div>
```

## 4. Estilos extraídos del portal

Valores medidos en `.eds-pipeline/assets/accordion/computed-styles.json`:

| Elemento medido | Propiedades computadas |
|---|---|
| `div.accordion-container` | `display: block; width: 1440px; height: 476px; margin: 80px 0px 0px; color: rgba(0, 0, 0, 0.87); font-family: Poppins, sans-serif; font-size: 16px; line-height: 24px; border: 0px none rgba(0, 0, 0, 0.87)` |
| `h2` | `display: block; width: 1440px; height: 60px; margin: 0px 0px 8px; color: rgba(0, 0, 0, 0.87); font-family: Poppins, sans-serif; font-size: 40px; line-height: 60px; text-align: center; border: 0px none rgba(0, 0, 0, 0.87)` |

**Tokens existentes que deben reutilizarse:** se comparan y reutilizan durante implementación; cualquier valor no medido permanece sujeto a los tokens del repositorio y no a estimación visual.

## 5. Campos editables (Universal Editor)

**Contenedor raíz:** usa `template.filter`; los campos siguientes pertenecen a cada item repetible.

| Campo | name | component | valueType | Requerido | Descripción para el autor |
|---|---|---|---|---|---|
| summary | `summary` | `text` | `string` | sí | Campo extraído de la propuesta aprobada. |
| text | `text` | `richtext` | `string` | sí | Campo extraído de la propuesta aprobada. |

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
| summary | default | Item cerrado salvo el item que tenga estado abierto. | Patrón accesible Adobe Accordion con details/summary. |
| summary | hover | Se aplican tokens interactivos existentes del repositorio; no se replica un valor visual no medido. | CSS. |
| summary | focus-visible | Indicador de foco visible con tokens existentes del repositorio. | CSS :focus-visible. |
| summary | active | Alterna exclusivamente el panel asociado. | details/summary. |
| summary | disabled | No existe estado disabled. | — |

**¿Requiere JS?** No para la apertura básica; se sigue el patrón accesible Adobe Accordion y se preserva la instrumentación EDS/UE.

## 8. Accesibilidad

- **Nivel objetivo:** WCAG 2.1 AA.
- **Contraste medido cuando hay par explícito color/fondo:**
- ⚠️ NO EXTRAÍDO — ningún nodo medido contiene simultáneamente color de texto y fondo opaco; no se asume fondo blanco.
- **Orden de tabulación:** debe seguir el orden DOM de control de apertura; el patrón accesible aprobado define el foco y la activación.
- **Etiquetas requeridas:** los campos de imagen requieren alt; los controles requieren nombre accesible visible o equivalente.
- **Problemas del portal original que no se replican:** atributos Angular y custom elements no se trasladan al DOM EDS.




## 9. Dependencias

- **Depende de:** ninguna.
- **Requerido por:** ningún ticket declarado en la propuesta.
- Las plantillas adicionales (ninguna) son asociaciones de alcance, no dependencias técnicas.

## 10. Ambigüedades y decisiones pendientes

- Ninguna ambigüedad declarada en la propuesta aprobada.
