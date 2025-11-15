# Guía de Migración: Tailwind CSS → Panda CSS

## Análisis del Proyecto Actual

### Stack Tecnológico
- **Framework**: Mithril.js con JSX
- **Estilos**: Tailwind CSS v4.1.17
- **Bundler**: esbuild
- **Build Script**: `run.sh`
- **Procesamiento CSS**: @tailwindcss/cli + cleancss

### Archivos de Estilos Actuales
```
src/css/style.css              → Fuente Tailwind con @apply
src/css/tailwindcss-style.css  → Compilado por Tailwind
public/style.min.css           → Minificado final
```

---

## Plan de Migración a Panda CSS

### Fase 1: Instalación y Configuración

#### 1.1 Instalar Panda CSS
```bash
# Desinstalar Tailwind CSS
npm uninstall tailwindcss @tailwindcss/cli

# Instalar Panda CSS
npm install -D @pandacss/dev
```

#### 1.2 Inicializar Panda CSS
```bash
npx panda init --jsx-framework mithril
```

#### 1.3 Crear archivo de configuración `panda.config.ts`
```typescript
import { defineConfig } from '@pandacss/dev'

export default defineConfig({
  // Directorios donde Panda buscará clases
  include: [
    './src/**/*.{js,jsx,ts,tsx}',
    './src/**/*.html'
  ],

  // Directorio de salida
  outdir: 'styled-system',

  // Prefijo para clases generadas (opcional)
  prefix: '',

  // Tema personalizado
  theme: {
    extend: {
      tokens: {
        fonts: {
          poppins: { value: "'Poppins', sans-serif" }
        },
        colors: {
          // Colores principales del proyecto
          blue: {
            100: { value: 'oklch(93.2% 0.032 255.585)' },
            200: { value: 'oklch(88.2% 0.059 254.128)' },
            300: { value: 'oklch(80.9% 0.105 251.813)' },
            400: { value: 'oklch(70.7% 0.165 254.624)' },
            500: { value: 'oklch(62.3% 0.214 259.815)' },
            600: { value: 'oklch(54.6% 0.245 262.881)' },
            700: { value: 'oklch(48.8% 0.243 264.376)' },
            800: { value: 'oklch(42.4% 0.199 265.638)' }
          },
          gray: {
            50: { value: 'oklch(98.5% 0.002 247.839)' },
            200: { value: 'oklch(92.8% 0.006 264.531)' },
            300: { value: 'oklch(87.2% 0.01 258.338)' },
            400: { value: 'oklch(70.7% 0.022 261.325)' },
            500: { value: 'oklch(55.1% 0.027 264.364)' },
            600: { value: 'oklch(44.6% 0.03 256.802)' },
            700: { value: 'oklch(37.3% 0.034 259.733)' },
            800: { value: 'oklch(27.8% 0.033 256.848)' }
          }
        }
      },
      recipes: {
        // Definir componentes como recetas
      }
    }
  },

  // Condiciones personalizadas
  conditions: {
    extend: {
      // hover, focus, etc. ya están incluidos
    }
  },

  // JSX Framework específico
  jsxFramework: 'mithril',

  // Optimizaciones
  optimize: true,
  minify: true
})
```

---

### Fase 2: Migración de Estilos

#### 2.1 Estrategias de Migración

**Opción A: Migración Gradual (Recomendada)**
- Mantener Tailwind temporalmente
- Migrar componente por componente
- Usar ambos sistemas en paralelo

**Opción B: Migración Completa**
- Reemplazar todos los estilos de una vez
- Requiere testing exhaustivo

#### 2.2 Convertir `@apply` a Recetas de Panda

**Antes (Tailwind):**
```css
.card-item {
  @apply bg-white rounded-xl shadow-md transition-shadow overflow-hidden;
}
```

**Después (Panda - usando `defineRecipe`):**
```typescript
// panda.config.ts
import { defineConfig, defineRecipe } from '@pandacss/dev'

const cardRecipe = defineRecipe({
  className: 'card',
  base: {
    bg: 'white',
    borderRadius: 'xl',
    boxShadow: 'md',
    transition: 'shadow',
    overflow: 'hidden'
  },
  variants: {
    size: {
      sm: { p: '4' },
      md: { p: '6' },
      lg: { p: '8' }
    }
  }
})

export default defineConfig({
  theme: {
    extend: {
      recipes: {
        card: cardRecipe
      }
    }
  }
})
```

#### 2.3 Tabla de Conversión de Clases Comunes

| Tailwind CSS | Panda CSS |
|--------------|-----------|
| `bg-blue-600` | `bg="blue.600"` o `css({ bg: 'blue.600' })` |
| `text-xl` | `textStyle="xl"` o `css({ fontSize: 'xl' })` |
| `p-4` | `p="4"` o `css({ p: '4' })` |
| `rounded-xl` | `rounded="xl"` o `css({ borderRadius: 'xl' })` |
| `shadow-md` | `shadow="md"` o `css({ boxShadow: 'md' })` |
| `hover:bg-blue-700` | `_hover={{ bg: 'blue.700' }}` |
| `focus:outline-none` | `_focus={{ outline: 'none' }}` |

---

### Fase 3: Migración de Componentes JSX

#### 3.1 Componente Header

**Antes (Tailwind):**
```jsx
import m from 'mithril'

const header = function(){
  return {
    view: (vnode) => {
      const {title, subtitle} = vnode.attrs
      return (
        <header class="header poppins-medium">
          <div>
            <h1 class="header-h1">{title}</h1>
            <p class="header-p">{subtitle}</p>
          </div>
        </header>
      )
    }
  }
}
```

**Después (Panda CSS):**
```jsx
import m from 'mithril'
import { css } from '../styled-system/css'
import { flex, stack } from '../styled-system/patterns'

const header = function(){
  return {
    view: (vnode) => {
      const {title, subtitle} = vnode.attrs
      return (
        <header class={css({
          bgGradient: 'to-r',
          gradientFrom: 'blue.600',
          gradientTo: 'blue.800',
          color: 'white',
          py: '4',
          fontFamily: 'poppins',
          fontWeight: '500'
        })}>
          <div class={css({
            maxW: '7xl',
            mx: 'auto',
            px: '4'
          })}>
            <h1 class={css({
              fontSize: '5xl',
              fontWeight: 'bold',
              mb: '3'
            })}>{title}</h1>
            <p class={css({
              fontSize: 'xl',
              color: 'blue.100'
            })}>{subtitle}</p>
          </div>
        </header>
      )
    }
  }
}
```

#### 3.2 Componente ItemCard

**Antes (Tailwind):**
```jsx
<div class='card-item poppins-semibold'>
  <div class='card-item-image'>
    <img src={imagen}/>
  </div>
  <div class='card-item-content'>
    <h4>{nombre}</h4>
    <p class='content-desc'>{descripcion}</p>
  </div>
</div>
```

**Después (Panda CSS - Opción 1: CSS in JS):**
```jsx
import { css } from '../styled-system/css'

<div class={css({
  bg: 'white',
  rounded: 'xl',
  shadow: 'md',
  overflow: 'hidden',
  transition: 'shadow',
  fontFamily: 'poppins',
  fontWeight: '600',
  _hover: {
    shadow: 'xl'
  }
})}>
  <div class={css({
    h: '56',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden'
  })}>
    <img src={imagen} class={css({
      maxW: 'full',
      maxH: 'full',
      objectFit: 'contain'
    })}/>
  </div>
  <div class={css({ p: '6' })}>
    <h4>{nombre}</h4>
    <p class={css({
      fontSize: 'lg',
      color: 'gray.600',
      mb: '5',
      lineHeight: 'relaxed'
    })}>{descripcion}</p>
  </div>
</div>
```

**Después (Panda CSS - Opción 2: Usando Recetas):**
```jsx
// En panda.config.ts - definir la receta
const cardItemRecipe = defineRecipe({
  className: 'cardItem',
  base: {
    bg: 'white',
    rounded: 'xl',
    shadow: 'md',
    overflow: 'hidden',
    transition: 'shadow',
    fontFamily: 'poppins',
    fontWeight: '600'
  },
  variants: {
    hovered: {
      true: {
        shadow: 'xl'
      }
    }
  }
})

// En el componente
import { cardItem } from '../styled-system/recipes'

<div class={cardItem()}>
  {/* contenido */}
</div>
```

---

### Fase 4: Actualizar Build Script

#### 4.1 Modificar `run.sh`

**Antes:**
```bash
npx @tailwindcss/cli -i src/css/style.css -o src/css/tailwindcss-style.css

cleancss \
src/css/tailwindcss-style.css \
node_modules/@fontsource/poppins/*.css \
-o public/style.min.css
```

**Después:**
```bash
# Generar estilos de Panda CSS
npx panda codegen

# Opcional: Si usas CSS tradicional, compilar
# Panda genera archivos JS/TS que se importan directamente
# No necesitas un paso de compilación CSS separado

# Solo minificar fuentes
cleancss \
node_modules/@fontsource/poppins/*.css \
-o public/fonts.min.css

# esbuild automáticamente incluirá los estilos de Panda
# al procesar las importaciones en los componentes
```

#### 4.2 Script Completo Actualizado

```bash
#!/usr/bin/bash

# Generar styled-system de Panda
npx panda codegen

# Minificar HTML
html-minifier \
--collapse-whitespace \
--remove-comments \
src/index.html \
-o public/index.html

# Copiar fuentes si no existen
if [ ! -d public/files ]; then
  cp -r node_modules/@fontsource/poppins/files/ public/
fi

# Minificar CSS de fuentes
cleancss \
node_modules/@fontsource/poppins/*.css \
-o public/fonts.min.css

# Bundle con esbuild (incluye automáticamente Panda)
esbuild src/app.jsx \
--bundle \
--minify \
--format=iife \
--target=es2020 \
--jsx-factory=m \
--jsx-fragment="'['" \
--loader:.js=jsx \
--outdir=public \
--watch
```

---

### Fase 5: Actualizar package.json

```json
{
  "name": "dsy-catalogo",
  "version": "1.0.0",
  "main": "src/index.js",
  "scripts": {
    "prepare": "panda codegen",
    "dev": "bash run.sh",
    "build": "panda codegen && bash run.sh"
  },
  "dependencies": {
    "@fontsource/poppins": "^5.2.7",
    "clipboard": "^2.0.11",
    "lodash": "^4.17.21",
    "lodash.debounce": "^4.0.8",
    "lucide-solid": "^0.553.0",
    "lucide-static": "^0.552.0",
    "mithril": "^2.3.7",
    "numeral": "^2.0.6",
    "share-api-polyfill": "^1.1.1"
  },
  "devDependencies": {
    "@pandacss/dev": "^0.45.0"
  }
}
```

---

### Fase 6: Migración de Clases Personalizadas de Fuentes

#### Antes (CSS con clases):
```css
.poppins-semibold {
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  font-style: normal;
}
```

#### Opción 1: Usar Semantic Tokens en Panda
```typescript
// panda.config.ts
export default defineConfig({
  theme: {
    extend: {
      tokens: {
        fonts: {
          poppins: { value: "'Poppins', sans-serif" }
        }
      },
      semanticTokens: {
        fontWeights: {
          thin: { value: 100 },
          extralight: { value: 200 },
          light: { value: 300 },
          regular: { value: 400 },
          medium: { value: 500 },
          semibold: { value: 600 },
          bold: { value: 700 },
          extrabold: { value: 800 },
          black: { value: 900 }
        }
      },
      textStyles: {
        'poppins-semibold': {
          value: {
            fontFamily: 'poppins',
            fontWeight: 'semibold'
          }
        },
        'poppins-bold': {
          value: {
            fontFamily: 'poppins',
            fontWeight: 'bold'
          }
        }
        // ... otros estilos
      }
    }
  }
})
```

#### Opción 2: Usar helper de CSS
```jsx
// Crear un helper
const poppins = (weight = 400, italic = false) => css({
  fontFamily: 'poppins',
  fontWeight: weight,
  fontStyle: italic ? 'italic' : 'normal'
})

// Uso en componentes
<div class={poppins(600)}>Texto semibold</div>
```

---

### Fase 7: Patrones de Diseño (Patterns)

Panda CSS incluye patrones útiles que reemplazan combinaciones comunes de Tailwind:

```jsx
import { flex, stack, grid, container } from '../styled-system/patterns'

// Container responsivo
<div class={container({ maxW: '7xl' })}>
  {/* contenido */}
</div>

// Flex layout
<div class={flex({
  align: 'center',
  justify: 'between',
  gap: '4'
})}>
  {/* contenido */}
</div>

// Grid layout
<div class={grid({
  columns: { base: 1, md: 2, lg: 3 },
  gap: '8'
})}>
  {/* items */}
</div>

// Stack vertical
<div class={stack({ gap: '4' })}>
  {/* items apilados */}
</div>
```

---

### Fase 8: Testing y Validación

#### Checklist de Migración
- [ ] Instalar Panda CSS
- [ ] Crear `panda.config.ts`
- [ ] Generar styled-system (`npx panda codegen`)
- [ ] Migrar archivo CSS principal
- [ ] Migrar componentes uno por uno:
  - [ ] `header.jsx`
  - [ ] `footer.jsx`
  - [ ] `itemCard.jsx`
  - [ ] `content.jsx`
  - [ ] `mdpContent.jsx`
  - [ ] `inputSearch.jsx`
- [ ] Migrar páginas:
  - [ ] `mdp.jsx`
  - [ ] `app.jsx`
- [ ] Actualizar `run.sh`
- [ ] Actualizar `package.json`
- [ ] Testing visual de todos los componentes
- [ ] Testing de responsividad
- [ ] Testing de interacciones (hover, focus)
- [ ] Optimizar y eliminar código no usado
- [ ] Desinstalar Tailwind CSS

---

### Fase 9: Ventajas de la Migración

#### Performance
- ✅ CSS generado solo para estilos usados (tree-shaking)
- ✅ CSS atómico optimizado
- ✅ Menor tamaño de bundle
- ✅ TypeScript nativo para autocompletado

#### Developer Experience
- ✅ Type-safe styling
- ✅ IntelliSense completo
- ✅ Colocated styles (estilos en JSX)
- ✅ Mejor debugging
- ✅ Patrones predefinidos

#### Mantenibilidad
- ✅ Sin clases CSS globales conflictivas
- ✅ Refactoring más seguro
- ✅ Estilos declarativos
- ✅ Componentes más legibles

---

### Fase 10: Troubleshooting Común

#### Problema: Estilos no se aplican
```bash
# Regenerar styled-system
npx panda codegen --clean
```

#### Problema: TypeScript errors
```bash
# Asegurar que styled-system está en tsconfig
# tsconfig.json
{
  "include": ["src/**/*", "styled-system"]
}
```

#### Problema: Build lento
```typescript
// panda.config.ts - optimizar
export default defineConfig({
  optimize: true,
  minify: true,
  hash: true // para cache busting
})
```

---

### Recursos Adicionales

- [Documentación Panda CSS](https://panda-css.com)
- [Migración desde Tailwind](https://panda-css.com/docs/guides/migration)
- [Recetas y Patterns](https://panda-css.com/docs/concepts/recipes)
- [Configuración](https://panda-css.com/docs/references/config)

---

### Notas Finales

1. **Backup**: Crear una rama git antes de migrar
2. **Pruebas**: Migrar un componente pequeño primero
3. **Documentación**: Documentar patrones de uso para el equipo
4. **Gradual**: No es necesario migrar todo de una vez
5. **Performance**: Medir bundle size antes y después

### Próximos Pasos Sugeridos

1. Crear rama `feature/migrate-to-panda`
2. Instalar Panda CSS
3. Configurar Panda con el config propuesto
4. Migrar componente `itemCard.jsx` como prueba
5. Verificar que funciona correctamente
6. Continuar con el resto de componentes
7. Actualizar documentación del proyecto
