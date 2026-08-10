# Contrato Técnico — code-block

> Ticket: PA-34 (https://hiberus-team-dxp.atlassian.net/browse/PA-34)   ·   Confluence: https://hiberus-team-dxp.atlassian.net/wiki/spaces/PA/pages/214335489
> component_id: cmp-code-block   ·   block_name: code-block   ·   is_container: no
> Origen: https://pre-devportaltpv.cloud.cecabank.es/integraciones/api   ·   Snapshot: 2026-08-10   ·   Confianza: 0.86
> Evidencia: `.eds-pipeline/assets/code-block/`

---

## 1. Descripción funcional

Code Block corresponde a `cmp-code-block` y se materializa sobre el bloque EDS `code-block`.
El componente aparece 10 veces en el portal; 9 apariciones fueron verificadas.
Las páginas observadas son: https://pre-devportaltpv.cloud.cecabank.es/integraciones/api, https://pre-devportaltpv.cloud.cecabank.es/herramientas-para-desarrolladores/con-integracion/api/tokenizacion.
Las plantillas asociadas son integration-summary, developer-tools-api-detail; integration-summary es la plantilla primaria de Jira.
Nueve paginas verificadas usan la misma cabecera, area de codigo resaltado y copia. Se agrupan JSON, XML y otros lenguajes en un solo bloque configurable.
Punto de partida: default pre/code content: El contenido por defecto preserva codigo, pero no resuelve lenguaje, numeracion, tema ni accion accesible de copia..

**Apariciones en el portal:** 10 — https://pre-devportaltpv.cloud.cecabank.es/integraciones/api, https://pre-devportaltpv.cloud.cecabank.es/herramientas-para-desarrolladores/con-integracion/api/tokenizacion
**Posición en página:** fuera del primer viewport en desktop
**Variantes observadas:** light, lenguaje configurable, con titulo, sin titulo

## 2. Evidencia visual

| Breakpoint | Componente local resoluble | En contexto local resoluble | Medidas del componente | Above the fold |
|---|---|---|---|---|
| desktop 1440px | `../assets/code-block/desktop.png` | `../assets/code-block/desktop-context.jpg` | 984px × 276px | no |
| tablet 768px | `../assets/code-block/tablet.png` | `../assets/code-block/tablet-context.jpg` | 688px × 276px | no |
| mobile 375px | `../assets/code-block/mobile.png` | `../assets/code-block/mobile-context.jpg` | 295px × 276px | no |

<!-- EDS:IMAGES -->

**Comportamiento responsivo medido:**

- **desktop 1440px:** caja medida 984px × 276px; ratio 3.56; posición x=228px, y=5777px.
- **tablet 768px:** caja medida 688px × 276px; ratio 2.49; posición x=40px, y=5525px.
- **mobile 375px:** caja medida 295px × 276px; ratio 1.07; posición x=40px, y=5705px.

## 3. DOM del portal → DOM de entrada EDS

### 3a. Fragmento real del portal (EVIDENCIA — no escribir selectores contra este DOM)

```html
<div class="custom-code-block lightTheme">
  <div class="custom-code-block__header">
    <div class="custom-code-block__title-wrapper">
	<div class="custom-code-block__prefix-"></div>
	<span class="custom-code-block__title">Petición (request)</span>
  </div>
    <div class="custom-code-block__actions">
      <button class="custom-code-block__copy-btn">
        <lucide-angular name="copy"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-copy"><rect width="14" height="14" x="8" y="8" rx="2" ry="2" key="17jyea"></rect><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" key="zix9uf"></path></svg></lucide-angular>
      </button>
    </div>
  </div>
  <pre>		<code linenumbers="" class="custom-code-block__code hljs hljs-line-numbers"><table class="hljs-ln"><tbody><tr><td class="hljs-ln-line hljs-ln-numbers" data-line-number="1"><div class="hljs-ln-n" data-line-number="1"></div></td><td class="hljs-ln-line hljs-ln-code" data-line-number="1"><span class="hljs-punctuation">{</span></td></tr><tr><td class="hljs-ln-line hljs-ln-numbers" data-line-number="2"><div class="hljs-ln-n" data-line-number="2"></div></td><td class="hljs-ln-line hljs-ln-code" data-line-number="2"><span class="hljs-attr">"cifrado"</span><span class="hljs-punctuation">:</span> <span class="hljs-string">"SHA2"</span><span class="hljs-punctuation">,</span></td></tr><tr><td class="hljs-ln-line hljs-ln-numbers" data-line-number="3"><div class="hljs-ln-n" data-line-number="3"></div></td><td class="hljs-ln-line hljs-ln-code" data-line-number="3"><span class="hljs-attr">"parametros"</span><span class="hljs-punctuation">:</span> <span class="hljs-string">"&lt;JSON_BASE64&gt;"</span><span class="hljs-punctuation">,</span></td></tr><tr><td class="hljs-ln-line hljs-ln-numbers" data-line-number="4"><div class="hljs-ln-n" data-line-number="4"></div></td><td class="hljs-ln-line hljs-ln-code" data-line-number="4"><span class="hljs-attr">"firma"</span><span class="hljs-punctuation">:</span> <span class="hljs-string">"&lt;SHA256(ClaveCifrado + JSON_BASE64)&gt;"</span></td></tr><tr><td class="hljs-ln-line hljs-ln-numbers" data-line-number="5"><div class="hljs-ln-n" data-line-number="5"></div></td><td class="hljs-ln-line hljs-ln-code" data-line-number="5"><span class="hljs-punctuation">}</span></td></tr></tbody></table></code>
    </pre>
</div>
```

### 3b. DOM DE ENTRADA — matriz EDS (EL CONTRATO)

```text
code-block
  title
  language
  code
```

### 3c. Mapeo portal → EDS

| Celda/campo EDS | Elemento del portal | Tipo y nota |
|---|---|---|
| item/fila 0 / `title` | `.custom-code-block__title` | `text` |
| item/fila 1 / `language` | `pre code` | `text`; atributo ng-reflect-language|data-language|class; transformación normalizar_identificador_de_lenguaje |
| item/fila 2 / `code` | `pre code` | `text` |

**content_mapping íntegro y vinculante:**

```json
[
  {
    "source_selector": ".custom-code-block__title",
    "target_field": "title",
    "type": "text"
  },
  {
    "source_selector": "pre code",
    "target_field": "language",
    "type": "text",
    "source_attribute": "ng-reflect-language|data-language|class",
    "transform": "normalizar_identificador_de_lenguaje"
  },
  {
    "source_selector": "pre code",
    "target_field": "code",
    "type": "text"
  }
]
```

El mapeo se aplica una vez al componente no repetible.

### 3d. DOM DE SALIDA — referencia, no contrato de entrada

```html
<div class="code-block">
  <div class="code-block-content"><!-- nodos originales decorados desde la matriz de 3b --></div>
</div>
```

## 4. Estilos extraídos del portal

Valores medidos en `.eds-pipeline/assets/code-block/computed-styles.json`:

| Elemento medido | Propiedades computadas |
|---|---|
| `div.custom-code-block.lightTheme` | `display: block; width: 984px; height: 276.391px; margin: 0px 0px 32px; color: rgba(0, 0, 0, 0.87); background-color: rgba(119, 119, 123, 0.04); font-family: Poppins, sans-serif; font-size: 16px; line-height: 24px; border: 0px none rgba(0, 0, 0, 0.87); border-radius: 8px; box-shadow: rgba(0, 0, 0, 0.15) 2px 0px 2px 0px, rgba(0, 0, 0, 0.15) 0px 2px 4px 0px; overflow: hidden` |
| `button.custom-code-block__copy-btn` | `display: block; width: 36px; height: 26px; padding: 1px 6px; color: rgb(255, 255, 255); font-family: Poppins, sans-serif; font-size: 16px; line-height: 24px; text-align: center; border: 0px none rgb(255, 255, 255)` |

**Tokens existentes que deben reutilizarse:** se comparan y reutilizan durante implementación; cualquier valor no medido permanece sujeto a los tokens del repositorio y no a estimación visual.

## 5. Campos editables (Universal Editor)

**Componente raíz:** campos no repetibles.

| Campo | name | component | valueType | Requerido | Descripción para el autor |
|---|---|---|---|---|---|
| title | `title` | `text` | `string` | no | Campo extraído de la propuesta aprobada. |
| language | `language` | `select` | `string` | sí | Campo extraído de la propuesta aprobada. |
| code | `code` | `text` | `string` | sí | Campo extraído de la propuesta aprobada. |

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
| botón de copia | default | Nombre accesible Copiar código. | button type=button. |
| botón de copia | focus-visible | Indicador de foco visible con tokens existentes. | CSS :focus-visible. |
| botón de copia | active | Copia el texto completo y anuncia confirmación sin mover el foco. | Clipboard API + aria-live. |
| botón de copia | error | Anuncia que la copia no pudo completarse. | aria-live. |
| botón de copia | disabled | No existe estado disabled con código válido. | — |

**¿Requiere JS?** Sí: acción de copia y anuncio accesible del resultado.

## 8. Accesibilidad

- **Nivel objetivo:** WCAG 2.1 AA.
- **Contraste medido cuando hay par explícito color/fondo:**
- div.custom-code-block: rgba(0, 0, 0, 0.87) sobre rgba(119, 119, 123, 0.04) = 4.71:1.
- **Orden de tabulación:** debe seguir el orden DOM de botón de copia; el patrón accesible aprobado define el foco y la activación.
- **Etiquetas requeridas:** los campos de imagen requieren alt; los controles requieren nombre accesible visible o equivalente.
- **Problemas del portal original que no se replican:** atributos Angular y custom elements no se trasladan al DOM EDS.




## 9. Dependencias

- **Depende de:** ninguna.
- **Requerido por:** ningún ticket declarado en la propuesta.
- Las plantillas adicionales (developer-tools-api-detail) son asociaciones de alcance, no dependencias técnicas.

## 10. Ambigüedades y decisiones pendientes

- Ninguna ambigüedad declarada en la propuesta aprobada.
