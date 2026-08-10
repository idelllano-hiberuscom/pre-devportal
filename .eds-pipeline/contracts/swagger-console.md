# Contrato Técnico — swagger-console

> Ticket: PA-24 (https://hiberus-team-dxp.atlassian.net/browse/PA-24)   ·   Confluence: https://hiberus-team-dxp.atlassian.net/wiki/spaces/PA/pages/214171649
> component_id: cmp-swagger-console   ·   block_name: swagger-console   ·   is_container: no
> Origen: https://pre-devportaltpv.cloud.cecabank.es/herramientas-para-desarrolladores/con-integracion/api/swagger   ·   Snapshot: 2026-08-10   ·   Confianza: 0.48
> Evidencia: `.eds-pipeline/assets/swagger-console/`

---

## 1. Descripción funcional

Authenticated Swagger Console corresponde a `cmp-swagger-console` y se materializa sobre el bloque EDS `swagger-console`.
El componente aparece 1 veces en el portal; 1 apariciones fueron verificadas.
Las páginas observadas son: https://pre-devportaltpv.cloud.cecabank.es/herramientas-para-desarrolladores/con-integracion/api/swagger.
Las plantillas asociadas son swagger-singleton; swagger-singleton es la plantilla primaria de Jira.
La unica aparicion es una aplicacion autenticada, no contenido editorial. Se propone un bloque integrador solo para encapsular el servicio; su contrato backend debe existir antes de construirlo.
Punto de partida: form: se reutiliza Patrones de controles, validacion y foco.; se adapta Autenticacion completa, sesion, recuperacion, registro y montaje de Swagger/OpenAPI..

**Apariciones en el portal:** 1 — https://pre-devportaltpv.cloud.cecabank.es/herramientas-para-desarrolladores/con-integracion/api/swagger
**Posición en página:** above the fold en desktop
**Variantes observadas:** ninguna

## 2. Evidencia visual

| Breakpoint | Componente local resoluble | En contexto local resoluble | Medidas del componente | Above the fold |
|---|---|---|---|---|
| desktop 1440px | `../assets/swagger-console/desktop.png` | `../assets/swagger-console/desktop-context.jpg` | 1190px × 900px | sí |
| tablet 768px | `../assets/swagger-console/tablet.png` | `../assets/swagger-console/tablet-context.jpg` | 736px × 1024px | sí |
| mobile 375px | `../assets/swagger-console/mobile.png` | `../assets/swagger-console/mobile-context.jpg` | 343px × 812px | sí |

<!-- EDS:IMAGES -->

**Comportamiento responsivo medido:**

- **desktop 1440px:** caja medida 1190px × 900px; ratio 1.32; posición x=250px, y=254px.
- **tablet 768px:** caja medida 736px × 1024px; ratio 0.72; posición x=16px, y=326px.
- **mobile 375px:** caja medida 343px × 812px; ratio 0.42; posición x=16px, y=354px.

## 3. DOM del portal → DOM de entrada EDS

### 3a. Fragmento real del portal (EVIDENCIA — no escribir selectores contra este DOM)

```html
<div class="swagger">
    <login><div class="login-container" style="background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(&quot;https://aws-cecabank-drupal-s3.s3.eu-west-1.amazonaws.com/public/styles/wide/public/company/login/2025-02/0f35b6f4c79713968352dbdab5520564.jpeg.webp?VersionId=DlRxdunM4mrAZo80JhN0ZKAv_k5tSixH&amp;itok=kC9JixTk&quot;);">
    <div class="login-container__form">
      <login-form><div class="login-form">
  <form novalidate="" class="login-form__form ng-untouched ng-pristine ng-invalid">
    <mat-form-field appearance="outline" class="mat-mdc-form-field ng-tns-c2608167813-0 mat-mdc-form-field-type-mat-input mat-form-field-appearance-outline mat-form-field-hide-placeholder mat-primary ng-untouched ng-pristine ng-invalid ng-star-inserted"><div class="mat-mdc-text-field-wrapper mdc-text-field ng-tns-c2608167813-0 mdc-text-field--outlined"><div class="mat-mdc-form-field-flex ng-tns-c2608167813-0"><div matformfieldnotchedoutline="" class="mdc-notched-outline ng-tns-c2608167813-0 mdc-notched-outline--upgraded ng-star-inserted"><div class="mdc-notched-outline__leading"></div><div class="mdc-notched-outline__notch"><label matformfieldfloatinglabel="" class="mdc-floating-label mat-mdc-floating-label ng-tns-c2608167813-0 ng-star-inserted" id="mat-mdc-form-field-label-0" for="mat-input-0" style=""><mat-label jhitranslate="global.login_form.email" class="ng-tns-c2608167813-0">Email</mat-label><span aria-hidden="true" class="mat-mdc-form-field-required-marker mdc-floating-label--required ng-tns-c2608167813-0 ng-star-inserted"></span></label></div><div class="mdc-notched-outline__trailing"></div></div><div class="mat-mdc-form-field-infix ng-tns-c2608167813-0">
      <input matinput="" type="email" name="email" formcontrolname="email" class="mat-mdc-input-element ng-tns-c2608167813-0 ng-untouched ng-pristine ng-invalid mat-mdc-form-field-input-control mdc-text-field__input cdk-text-field-autofill-monitored" id="mat-input-0" required="" aria-required="true">
    </div></div></div><div class="mat-mdc-form-field-subscript-wrapper mat-mdc-form-field-bottom-align ng-tns-c2608167813-0"><div class="mat-mdc-form-field-hint-wrapper ng-tns-c2608167813-0 ng-trigger ng-trigger-transitionMessages ng-star-inserted" style="opacity: 1; transform: translateY(0%);"><div class="mat-mdc-form-field-hint-spacer ng-tns-c2608167813-0"></div></div></div></mat-form-field>
    <mat-form-field appearance="outline" class="mat-mdc-form-field ng-tns-c2608167813-1 mat-mdc-form-field-type-mat-input mat-form-field-appearance-outline mat-form-field-hide-placeholder mat-primary ng-untouched ng-pristine ng-invalid ng-star-inserted"><div class="mat-mdc-text-field-wrapper mdc-text-field ng-tns-c2608167813-1 mdc-text-field--outlined"><div class="mat-mdc-form-field-flex ng-tns-c2608167813-1"><div matformfieldnotchedoutline="" class="mdc-notched-outline ng-tns-c2608167813-1 mdc-notched-outline--upgraded ng-star-inserted"><div class="mdc-notched-outline__leading"></div><div class="mdc-notched-outline__notch"><label matformfieldfloatinglabel="" class="mdc-floating-label mat-mdc-floating-label ng-tns-c2608167813-1 ng-star-inserted" id="mat-mdc-form-field-label-2" for="mat-input-1" style=""><mat-label jhitranslate="global.login_form.password" class="ng-tns-c2608167813-1">Contraseña</mat-label><span aria-hidden="true" class="mat-mdc-form-field-required-marker mdc-floating-label--required ng-tns-c2608167813-1 ng-star-inserted"></span></label></div><div class="mdc-notched-outline__trailing"></div></div><div class="mat-mdc-form-field-infix ng-tns-c2608167813-1">
      <div class="login-form__form__password-field ng-tns-c2608167813-1">
        <input matinput="" name="password" formcontrolname="password" class="mat-mdc-input-element ng-untouched ng-pristine ng-invalid mat-mdc-form-field-input-control mdc-text-field__input cdk-text-field-autofill-monitored" type="password" id="mat-input-1" required="" aria-required="true">
        <button type="button" class="login-form__form__password-field__btn" aria-label="Show password">
        <lucide-angular size="24" class="login-form__form__password-field__btn__icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye-off login-form__form__password-field__btn__icon"><path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49" key="ct8e1f"></path><path d="M14.084 14.158a3 3 0 0 1-4.242-4.242" key="151rxh"></path><path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143" key="13bj9a"></path><path d="m2 2 20 20" key="1ooewy"></path></svg></lucide-angular>
        </button>
      </div>
    </div></div></div><div class="mat-mdc-form-field-subscript-wrapper mat-mdc-form-field-bottom-align ng-tns-c2608167813-1"><div class="mat-mdc-form-field-hint-wrapper ng-tns-c2608167813-1 ng-trigger ng-trigger-transitionMessages ng-star-inserted" style="opacity: 1; transform: translateY(0%);"><div class="mat-mdc-form-field-hint-spacer ng-tns-c2608167813-1"></div></div></div></mat-form-field>
    <a jhitranslate="global.login_form.forgot_password" class="login-form__form__hint" style="text-align: right;" href="/recovery">¿Has olvidado tu contraseña?</a>
    <button type="submit" jhitranslate="global.login_form.login" class="login-form__form__form-btn btn-filled">Entrar</button>
  </form>
  <p class="login-form__disclaimer">
    <span jhitranslate="global.login_form.not_a_member">¿No tienes una cuenta?</span>
    <a jhitranslate="global.login_form.register" href="/register">Registrate</a>
  </p>
</div>
<toast aria-live="polite" aria-atomic="true" class="toast-container position-fixed end-0 p-3" style="z-index: 1200; top: 6rem;"></toast></login-form>
    </div>
  </div></login>
</div>
```

### 3b. DOM DE ENTRADA — matriz EDS (EL CONTRATO)

```text
swagger-console
  backgroundImage
  recoveryLink
  registerLink
  authEndpoint
  openApiEndpoint
```

### 3c. Mapeo portal → EDS

| Celda/campo EDS | Elemento del portal | Tipo y nota |
|---|---|---|
| item/fila 0 / `backgroundImage` | `.login-container` | `image`; estado pendiente_dam |
| item/fila 1 / `recoveryLink` | `.login-form__form__hint` | `richtext` |
| item/fila 2 / `registerLink` | `.login-form__disclaimer a` | `richtext` |

**content_mapping íntegro y vinculante:**

```json
[
  {
    "source_selector": ".login-container",
    "target_field": "backgroundImage",
    "type": "image",
    "status": "pendiente_dam"
  },
  {
    "source_selector": ".login-form__form__hint",
    "target_field": "recoveryLink",
    "type": "richtext"
  },
  {
    "source_selector": ".login-form__disclaimer a",
    "target_field": "registerLink",
    "type": "richtext"
  }
]
```

El mapeo se aplica una vez al componente no repetible.

### 3d. DOM DE SALIDA — referencia, no contrato de entrada

```html
<div class="swagger-console">
  <div class="swagger-console-content"><!-- nodos originales decorados desde la matriz de 3b --></div>
</div>
```

## 4. Estilos extraídos del portal

Valores medidos en `.eds-pipeline/assets/swagger-console/computed-styles.json`:

| Elemento medido | Propiedades computadas |
|---|---|
| `div.swagger` | `display: block; width: 1190px; height: 900px; color: rgba(0, 0, 0, 0.87); font-family: Poppins, sans-serif; font-size: 16px; line-height: 24px; border: 0px none rgba(0, 0, 0, 0.87)` |
| `button.login-form__form__password-field__btn` | `display: block; width: 33.9844px; height: 24px; padding: 1px 6px; color: rgb(0, 0, 0); font-family: Poppins, sans-serif; font-size: 16px; line-height: 24px; text-align: center; border: 0px none rgb(0, 0, 0)` |
| `a.login-form__form__hint` | `display: block; width: 435px; height: 24px; color: rgb(119, 119, 123); font-family: Poppins, sans-serif; font-size: 14px; line-height: 24px; letter-spacing: 0.25px; text-align: right; border: 0px none rgb(119, 119, 123)` |
| `button.login-form__form__form-btn.btn-filled` | `display: flex; justify-content: center; align-items: center; gap: 10px; width: 435px; height: 40px; margin: 32px 0px 0px; padding: 10px 24px; color: rgb(255, 255, 255); background-color: rgb(1, 52, 81); font-family: Poppins, sans-serif; font-size: 14px; font-weight: 500; line-height: 20px; letter-spacing: 0.1px; text-align: center; border: 0px none rgb(255, 255, 255); border-radius: 100px; box-shadow: rgba(0, 0, 0, 0.15) 0px 1px 3px 1px, rgba(0, 0, 0, 0.3) 0px 1px 2px 0px` |
| `p.login-form__disclaimer` | `display: block; width: 435px; height: 24px; margin: 16px 0px; color: rgb(119, 119, 123); font-family: Poppins, sans-serif; font-size: 14px; line-height: 24px; letter-spacing: 0.25px; text-align: center; border: 0px none rgb(119, 119, 123)` |
| `a` | `display: inline; color: rgb(32, 31, 31); font-family: Poppins, sans-serif; font-size: 14px; line-height: 24px; letter-spacing: 0.25px; text-align: center; border: 0px none rgb(32, 31, 31)` |

**Tokens existentes que deben reutilizarse:** se comparan y reutilizan durante implementación; cualquier valor no medido permanece sujeto a los tokens del repositorio y no a estimación visual.

## 5. Campos editables (Universal Editor)

**Componente raíz:** campos no repetibles.

| Campo | name | component | valueType | Requerido | Descripción para el autor |
|---|---|---|---|---|---|
| backgroundImage | `backgroundImage` | `reference` | `string` | no | Campo extraído de la propuesta aprobada. |
| recoveryLink | `recoveryLink` | `richtext` | `string` | sí | Campo extraído de la propuesta aprobada. |
| registerLink | `registerLink` | `richtext` | `string` | sí | Campo extraído de la propuesta aprobada. |
| authEndpoint | `authEndpoint` | `text` | `string` | no | Campo extraído de la propuesta aprobada. |
| openApiEndpoint | `openApiEndpoint` | `text` | `string` | no | Campo extraído de la propuesta aprobada. |

## 6. Imágenes y rendimiento

| Imagen/campo | Origen | Dimensiones intrínsecas | Ratio | LCP | Tratamiento |
|---|---|---|---|---|---|
| backgroundImage | celda del bloque desde selector del portal | ⚠️ NO EXTRAÍDO — la captura mide el componente, no el asset intrínseco | ⚠️ NO EXTRAÍDO | sí, componente above the fold | Referencia DAM; EDS entrega picture cuando aplique |

- Las dimensiones de la tabla de sección 2 son del recorte del componente, no del asset; no se reutilizan como dimensiones intrínsecas.
- Los estados `pendiente_dam` o `convertir_svg_local_o_dam` del content_mapping se resuelven como assets locales versionados o DAM autorables antes de contribución.
- Las referencias de imagen deben producir `<picture>` optimizado en EDS; no se copian URLs del portal.


## 7. Interacciones y estados

| Elemento | Estado | Comportamiento | Implementación |
|---|---|---|---|
| bloque | configuration-pending | Si falta authEndpoint u openApiEndpoint muestra no disponible/configuración pendiente y no realiza peticiones. | Guard clause antes de fetch. |
| bloque | loading | Solo existe después de validar ambos endpoints; anuncia carga sin exponer datos sensibles. | JS + aria-live. |
| bloque | error | Mensaje sanitizado sin secretos, contraseñas, tokens, cookies ni payloads. | JS + logging sanitizado. |
| bloque | ready | Monta la experiencia configurada por los contratos externos. | JS. |
| bloque | disabled | No existe estado disabled; configuration-pending evita toda petición. | — |

**¿Requiere JS?** Sí: validación de configuración, integración externa y logging diagnóstico sanitizado.

## 8. Accesibilidad

- **Nivel objetivo:** WCAG 2.1 AA.
- **Contraste medido cuando hay par explícito color/fondo:**
- button.login-form__form__form-btn: rgb(255, 255, 255) sobre rgb(1, 52, 81) = 13.03:1.
- **Orden de tabulación:** debe seguir el orden DOM de controles de autenticación; el patrón accesible aprobado define el foco y la activación.
- **Etiquetas requeridas:** los campos de imagen requieren alt; los controles requieren nombre accesible visible o equivalente.
- **Problemas del portal original que no se replican:** atributos Angular y custom elements no se trasladan al DOM EDS.


- **Privacidad diagnóstica:** mensajes y eventos se sanitizan; nunca se registran secretos, contraseñas, tokens, cookies ni payloads sensibles.

## 9. Dependencias

- **Depende de:** ninguna.
- **Requerido por:** ningún ticket declarado en la propuesta.
- Las plantillas adicionales (ninguna) son asociaciones de alcance, no dependencias técnicas.

## 10. Ambigüedades y decisiones pendientes

- ⚠️ authEndpoint y openApiEndpoint permanecen vacios hasta que el cliente proporcione los endpoints y el contrato externo de autenticacion/OpenAPI.
