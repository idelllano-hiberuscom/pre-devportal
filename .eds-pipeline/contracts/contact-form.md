# Contrato Técnico — contact-form

> Ticket: PA-26 (https://hiberus-team-dxp.atlassian.net/browse/PA-26)   ·   Confluence: https://hiberus-team-dxp.atlassian.net/wiki/spaces/PA/pages/212893697
> component_id: cmp-contact-form   ·   block_name: contact-form   ·   is_container: no
> Origen: https://pre-devportaltpv.cloud.cecabank.es/ayuda   ·   Snapshot: 2026-08-10   ·   Confianza: 0.76
> Evidencia: `.eds-pipeline/assets/contact-form/`

---

## 1. Descripción funcional

Contact Form corresponde a `cmp-contact-form` y se materializa sobre el bloque EDS `contact-form`.
El componente aparece 2 veces en el portal; 2 apariciones fueron verificadas.
Las páginas observadas son: https://pre-devportaltpv.cloud.cecabank.es/ayuda, https://pre-devportaltpv.cloud.cecabank.es/inicio.
Las plantillas asociadas son home-help-shared; home-help-shared es la plantilla primaria de Jira.
Las dos apariciones comparten imagen, titular, cinco campos obligatorios y submit. Se mantiene un bloque especializado apoyado en la infraestructura Adobe, no un formulario construido desde cero.
Punto de partida: form: se reutiliza Render de campos, validacion, foco tras errores y envio.; se adapta Composicion con imagen/heading y configuracion del esquema de contacto..

**Apariciones en el portal:** 2 — https://pre-devportaltpv.cloud.cecabank.es/ayuda, https://pre-devportaltpv.cloud.cecabank.es/inicio
**Posición en página:** fuera del primer viewport en desktop
**Variantes observadas:** ninguna

## 2. Evidencia visual

| Breakpoint | Componente local resoluble | En contexto local resoluble | Medidas del componente | Above the fold |
|---|---|---|---|---|
| desktop 1440px | `../assets/contact-form/desktop.png` | `../assets/contact-form/desktop-context.jpg` | 1440px × 800px | no |
| tablet 768px | `../assets/contact-form/tablet.png` | `../assets/contact-form/tablet-context.jpg` | 768px × 1424px | no |
| mobile 375px | `../assets/contact-form/mobile.png` | `../assets/contact-form/mobile-context.jpg` | 375px × 1031px | no |

<!-- EDS:IMAGES -->

**Comportamiento responsivo medido:**

- **desktop 1440px:** caja medida 1440px × 800px; ratio 1.8; posición x=0px, y=4157px.
- **tablet 768px:** caja medida 768px × 1424px; ratio 0.54; posición x=0px, y=4417px.
- **mobile 375px:** caja medida 375px × 1031px; ratio 0.36; posición x=0px, y=4713px.

## 3. DOM del portal → DOM de entrada EDS

### 3a. Fragmento real del portal (EVIDENCIA — no escribir selectores contra este DOM)

```html
<div class="contact-form">
  <div class="contact-form__img-container">
    <img class="contact-form__img" src="https://aws-cecabank-drupal-s3.s3.eu-west-1.amazonaws.com/public/styles/wide/public/contact-form/2025-04/home-contacto_0.webp?VersionId=dVDY82sZPzLDwZrK0MBLbXl.tdpP5.tp&amp;itok=qYgsQSsj" alt="Contacto">
    <h2 class="contact-form__img-container__heading">¿Quieres saber más? No te preocupes, te contactamos!</h2>
  </div>
  <form novalidate="" class="contact-form__form ng-untouched ng-pristine ng-invalid">
    <mat-form-field appearance="outline" class="mat-mdc-form-field contact-form__form__field ng-tns-c2608167813-0 mat-mdc-form-field-type-mat-input mat-form-field-appearance-outline mat-form-field-hide-placeholder mat-primary ng-untouched ng-pristine ng-invalid ng-star-inserted"><div class="mat-mdc-text-field-wrapper mdc-text-field ng-tns-c2608167813-0 mdc-text-field--outlined"><div class="mat-mdc-form-field-flex ng-tns-c2608167813-0"><div matformfieldnotchedoutline="" class="mdc-notched-outline ng-tns-c2608167813-0 mdc-notched-outline--upgraded ng-star-inserted"><div class="mdc-notched-outline__leading"></div><div class="mdc-notched-outline__notch"><label matformfieldfloatinglabel="" class="mdc-floating-label mat-mdc-floating-label ng-tns-c2608167813-0 ng-star-inserted" id="mat-mdc-form-field-label-0" for="mat-input-0" style=""><mat-label jhitranslate="global.contact_form.name" class="ng-tns-c2608167813-0">Nombre</mat-label><span aria-hidden="true" class="mat-mdc-form-field-required-marker mdc-floating-label--required ng-tns-c2608167813-0 ng-star-inserted"></span></label></div><div class="mdc-notched-outline__trailing"></div></div><div class="mat-mdc-form-field-infix ng-tns-c2608167813-0"><input matinput="" type="text" name="name" formcontrolname="name" class="mat-mdc-input-element ng-tns-c2608167813-0 mat-mdc-form-field-input-control mdc-text-field__input ng-untouched ng-pristine ng-invalid cdk-text-field-autofill-monitored" id="mat-input-0" required="" aria-required="true">
    </div></div></div><div class="mat-mdc-form-field-subscript-wrapper mat-mdc-form-field-bottom-align ng-tns-c2608167813-0"><div class="mat-mdc-form-field-hint-wrapper ng-tns-c2608167813-0 ng-trigger ng-trigger-transitionMessages ng-star-inserted" style="opacity: 1; transform: translateY(0%);"><div class="mat-mdc-form-field-hint-spacer ng-tns-c2608167813-0"></div></div></div></mat-form-field>
    <mat-form-field appearance="outline" class="mat-mdc-form-field contact-form__form__field ng-tns-c2608167813-1 mat-mdc-form-field-type-mat-input mat-form-field-appearance-outline mat-form-field-hide-placeholder mat-primary ng-untouched ng-pristine ng-invalid ng-star-inserted"><div class="mat-mdc-text-field-wrapper mdc-text-field ng-tns-c2608167813-1 mdc-text-field--outlined"><div class="mat-mdc-form-field-flex ng-tns-c2608167813-1"><div matformfieldnotchedoutline="" class="mdc-notched-outline ng-tns-c2608167813-1 mdc-notched-outline--upgraded ng-star-inserted"><div class="mdc-notched-outline__leading"></div><div class="mdc-notched-outline__notch"><label matformfieldfloatinglabel="" class="mdc-floating-label mat-mdc-floating-label ng-tns-c2608167813-1 ng-star-inserted" id="mat-mdc-form-field-label-2" for="mat-input-1" style=""><mat-label jhitranslate="global.contact_form.email" class="ng-tns-c2608167813-1">Email</mat-label><span aria-hidden="true" class="mat-mdc-form-field-required-marker mdc-floating-label--required ng-tns-c2608167813-1 ng-star-inserted"></span></label></div><div class="mdc-notched-outline__trailing"></div></div><div class="mat-mdc-form-field-infix ng-tns-c2608167813-1"><input matinput="" type="email" name="email" formcontrolname="email" class="mat-mdc-input-element ng-tns-c2608167813-1 mat-mdc-form-field-input-control mdc-text-field__input ng-untouched ng-pristine ng-invalid cdk-text-field-autofill-monitored" id="mat-input-1" required="" aria-required="true">
      </div></div></div><div class="mat-mdc-form-field-subscript-wrapper mat-mdc-form-field-bottom-align ng-tns-c2608167813-1"><div class="mat-mdc-form-field-hint-wrapper ng-tns-c2608167813-1 ng-trigger ng-trigger-transitionMessages ng-star-inserted" style="opacity: 1; transform: translateY(0%);"><div class="mat-mdc-form-field-hint-spacer ng-tns-c2608167813-1"></div></div></div></mat-form-field>
    <mat-form-field appearance="outline" class="mat-mdc-form-field contact-form__form__field ng-tns-c2608167813-2 mat-mdc-form-field-type-mat-input mat-form-field-appearance-outline mat-form-field-hide-placeholder mat-primary ng-untouched ng-pristine ng-invalid ng-star-inserted"><div class="mat-mdc-text-field-wrapper mdc-text-field ng-tns-c2608167813-2 mdc-text-field--outlined"><div class="mat-mdc-form-field-flex ng-tns-c2608167813-2"><div matformfieldnotchedoutline="" class="mdc-notched-outline ng-tns-c2608167813-2 mdc-notched-outline--upgraded ng-star-inserted"><div class="mdc-notched-outline__leading"></div><div class="mdc-notched-outline__notch"><label matformfieldfloatinglabel="" class="mdc-floating-label mat-mdc-floating-label ng-tns-c2608167813-2 ng-star-inserted" id="mat-mdc-form-field-label-4" for="mat-input-2" style=""><mat-label jhitranslate="global.contact_form.phone" class="ng-tns-c2608167813-2">Teléfono</mat-label><span aria-hidden="true" class="mat-mdc-form-field-required-marker mdc-floating-label--required ng-tns-c2608167813-2 ng-star-inserted"></span></label></div><div class="mdc-notched-outline__trailing"></div></div><div class="mat-mdc-form-field-infix ng-tns-c2608167813-2"><input matinput="" type="tel" name="phone" formcontrolname="phone" class="mat-mdc-input-element ng-tns-c2608167813-2 mat-mdc-form-field-input-control mdc-text-field__input ng-untouched ng-pristine ng-invalid cdk-text-field-autofill-monitored" id="mat-input-2" required="" aria-required="true">
      </div></div></div><div class="mat-mdc-form-field-subscript-wrapper mat-mdc-form-field-bottom-align ng-tns-c2608167813-2"><div class="mat-mdc-form-field-hint-wrapper
```

### 3b. DOM DE ENTRADA — matriz EDS (EL CONTRATO)

```text
contact-form
  image + imageAlt
  heading
  labels de name/email/phone/company/message
  submitLabel
  action
```

### 3c. Mapeo portal → EDS

| Celda/campo EDS | Elemento del portal | Tipo y nota |
|---|---|---|
| item/fila 0 / `image` | `.contact-form__img` | `image`; estado pendiente_dam |
| item/fila 1 / `heading` | `.contact-form__img-container__heading` | `text` |
| item/fila 2 / `nameLabel` | `mat-form-field:has(input[name='name']) mat-label` | `text` |
| item/fila 3 / `emailLabel` | `mat-form-field:has(input[name='email']) mat-label` | `text` |
| item/fila 4 / `phoneLabel` | `mat-form-field:has(input[name='phone']) mat-label` | `text` |
| item/fila 5 / `companyLabel` | `mat-form-field:has(input[name='company']) mat-label` | `text` |
| item/fila 6 / `messageLabel` | `mat-form-field:has(textarea[name='message']) mat-label` | `text` |
| item/fila 7 / `submitLabel` | `.contact-form__submit-btn` | `text` |

**content_mapping íntegro y vinculante:**

```json
[
  {
    "source_selector": ".contact-form__img",
    "target_field": "image",
    "type": "image",
    "status": "pendiente_dam"
  },
  {
    "source_selector": ".contact-form__img-container__heading",
    "target_field": "heading",
    "type": "text"
  },
  {
    "source_selector": "mat-form-field:has(input[name='name']) mat-label",
    "target_field": "nameLabel",
    "type": "text"
  },
  {
    "source_selector": "mat-form-field:has(input[name='email']) mat-label",
    "target_field": "emailLabel",
    "type": "text"
  },
  {
    "source_selector": "mat-form-field:has(input[name='phone']) mat-label",
    "target_field": "phoneLabel",
    "type": "text"
  },
  {
    "source_selector": "mat-form-field:has(input[name='company']) mat-label",
    "target_field": "companyLabel",
    "type": "text"
  },
  {
    "source_selector": "mat-form-field:has(textarea[name='message']) mat-label",
    "target_field": "messageLabel",
    "type": "text"
  },
  {
    "source_selector": ".contact-form__submit-btn",
    "target_field": "submitLabel",
    "type": "text"
  }
]
```

El mapeo se aplica una vez al componente no repetible.

### 3d. DOM DE SALIDA — referencia, no contrato de entrada

```html
<div class="contact-form">
  <div class="contact-form-content"><!-- nodos originales decorados desde la matriz de 3b --></div>
</div>
```

## 4. Estilos extraídos del portal

Valores medidos en `.eds-pipeline/assets/contact-form/computed-styles.json`:

| Elemento medido | Propiedades computadas |
|---|---|
| `div.contact-form` | `display: grid; grid-template-columns: 720px 720px; grid-template-rows: 800px; width: 1440px; height: 800px; min-height: 800px; margin: 96px 0px; color: rgba(0, 0, 0, 0.87); font-family: Poppins, sans-serif; font-size: 16px; line-height: 24px; border: 0px none rgba(0, 0, 0, 0.87)` |
| `img.contact-form__img` | `display: block; position: relative; width: 720px; max-width: 100%; height: 800px; color: rgba(0, 0, 0, 0.87); font-family: Poppins, sans-serif; font-size: 16px; line-height: 24px; border: 0px none rgba(0, 0, 0, 0.87); object-fit: cover; overflow: clip` |
| `h2.contact-form__img-container__heading` | `display: block; position: absolute; width: 360px; height: 240px; margin: 0px 0px 8px; color: rgb(255, 255, 255); font-family: Poppins, sans-serif; font-size: 40px; line-height: 60px; border: 0px none rgb(255, 255, 255)` |
| `button.btn-filled.contact-form__submit-btn` | `display: flex; justify-content: center; align-items: center; gap: 10px; width: 504px; height: 40px; margin: 16px 0px 0px; padding: 10px 24px; color: rgb(255, 255, 255); background-color: rgb(1, 52, 81); font-family: Poppins, sans-serif; font-size: 14px; font-weight: 500; line-height: 20px; letter-spacing: 0.1px; text-align: center; border: 0px none rgb(255, 255, 255); border-radius: 100px; box-shadow: rgba(0, 0, 0, 0.15) 0px 1px 3px 1px, rgba(0, 0, 0, 0.3) 0px 1px 2px 0px` |

**Tokens existentes que deben reutilizarse:** se comparan y reutilizan durante implementación; cualquier valor no medido permanece sujeto a los tokens del repositorio y no a estimación visual.

## 5. Campos editables (Universal Editor)

**Componente raíz:** campos no repetibles.

| Campo | name | component | valueType | Requerido | Descripción para el autor |
|---|---|---|---|---|---|
| image | `image` | `reference` | `string` | sí | Campo extraído de la propuesta aprobada. |
| imageAlt | `imageAlt` | `text` | `string` | sí | Campo extraído de la propuesta aprobada. |
| heading | `heading` | `text` | `string` | sí | Campo extraído de la propuesta aprobada. |
| nameLabel | `nameLabel` | `text` | `string` | sí | Campo extraído de la propuesta aprobada. |
| emailLabel | `emailLabel` | `text` | `string` | sí | Campo extraído de la propuesta aprobada. |
| phoneLabel | `phoneLabel` | `text` | `string` | sí | Campo extraído de la propuesta aprobada. |
| companyLabel | `companyLabel` | `text` | `string` | sí | Campo extraído de la propuesta aprobada. |
| messageLabel | `messageLabel` | `text` | `string` | sí | Campo extraído de la propuesta aprobada. |
| submitLabel | `submitLabel` | `text` | `string` | sí | Campo extraído de la propuesta aprobada. |
| action | `action` | `text` | `string` | sí | Campo extraído de la propuesta aprobada. |

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
| controles y submit | default | Usa estructura semántica y tokens existentes del repositorio. | HTML/CSS/JS según la referencia aprobada. |
| controles y submit | hover | Usa tokens interactivos existentes; no se inventan valores visuales del portal. | CSS. |
| controles y submit | focus-visible | Indicador de foco visible con tokens existentes. | CSS :focus-visible. |
| controles y submit | active | Ejecuta únicamente la acción asociada al control. | Patrón accesible aprobado. |
| controles y submit | disabled | Solo existe si la semántica del control lo requiere. | Atributo disabled/aria-disabled. |

**¿Requiere JS?** Sí cuando controles y submit requiera comportamiento; no queda una decisión humana pendiente sobre el patrón de interacción.

## 8. Accesibilidad

- **Nivel objetivo:** WCAG 2.1 AA.
- **Contraste medido cuando hay par explícito color/fondo:**
- button.btn-filled: rgb(255, 255, 255) sobre rgb(1, 52, 81) = 13.03:1.
- **Orden de tabulación:** debe seguir el orden DOM de controles y submit; el patrón accesible aprobado define el foco y la activación.
- **Etiquetas requeridas:** los campos de imagen requieren alt; los controles requieren nombre accesible visible o equivalente.
- **Problemas del portal original que no se replican:** atributos Angular y custom elements no se trasladan al DOM EDS.




## 9. Dependencias

- **Depende de:** ninguna.
- **Requerido por:** ningún ticket declarado en la propuesta.
- Las plantillas adicionales (ninguna) son asociaciones de alcance, no dependencias técnicas.

## 10. Ambigüedades y decisiones pendientes

- ⚠️ El endpoint action no aparece en el HTML capturado y debe aportarlo el cliente antes de implementar el envio.
- ⚠️ El cliente debe definir la politica de tratamiento, retencion y consentimiento de los datos enviados.
