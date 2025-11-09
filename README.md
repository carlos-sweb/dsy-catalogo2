# dsy-catalogo2

Catálogo digital de productos para **Bazar y Paqueteria Daisy Montenegro E.I.R.L.**

## Descripción

Aplicación web moderna (SPA) que presenta un catálogo de productos organizado por categorías, con búsqueda en tiempo real y gestión de métodos de pago. Optimizada para dispositivos móviles y de escritorio.

## Características Principales

- ✅ Catálogo organizado por categorías y subcategorías
- ✅ Búsqueda en tiempo real con debounce
- ✅ Formato de precios chilenos (ej: $1.500)
- ✅ Página de métodos de pago con funcionalidad copiar/compartir
- ✅ Diseño responsive (mobile-first)
- ✅ Navegación cliente-side con rutas dinámicas
- ✅ Animaciones CSS suaves

## Tecnologías

### Framework & Librerías

- **[Mithril.js](https://mithril.js.org/) v2.3.7** - Framework JavaScript ligero para SPA
- **[TailwindCSS](https://tailwindcss.com/) v4.1.17** - Framework CSS utility-first
- **[Numeral.js](http://numeraljs.com/) v2.0.6** - Formato de números y precios
- **[Lodash Debounce](https://lodash.com/) v4.0.8** - Debouncing para búsqueda
- **[Lucide Icons](https://lucide.dev/)** - Iconos SVG
- **[Animate.css](https://animate.style/) v4.1.1** - Animaciones CSS
- **[ClipboardJS](https://clipboardjs.com/) v2.0.11** - Funcionalidad de portapapeles
- **[Share API Polyfill](https://github.com/NascHQ/share-api-polyfill) v1.1.1** - Polyfill para Web Share API

### Herramientas de Build

- **[esbuild](https://esbuild.github.io/)** - Bundler JavaScript ultra rápido
- **[@tailwindcss/cli](https://tailwindcss.com/docs/installation)** - Compilador TailwindCSS
- **[html-minifier](https://github.com/kangax/html-minifier)** - Minificación HTML
- **[clean-css](https://github.com/clean-css/clean-css)** - Minificación CSS

## Estructura del Proyecto

```
dsy-catalogo2/
├── src/                          # Código fuente
│   ├── Components/               # Componentes Mithril.js
│   │   ├── buttonGo.js          # Botón de navegación
│   │   ├── categories.js        # Componente de categorías
│   │   ├── content.js           # Contenido del catálogo
│   │   ├── footer.js            # Pie de página
│   │   ├── header.js            # Encabezado
│   │   ├── inputSearch.js       # Barra de búsqueda
│   │   ├── mdpContent.js        # Página de medios de pago
│   │   └── localNumeral.js      # Configuración formato chileno
│   ├── css/                     # Estilos
│   │   ├── style.css            # Estilos fuente con TailwindCSS
│   │   └── tailwindcss-style.css # CSS compilado
│   ├── json/                    # Datos JSON
│   │   └── medios-de-pago.json  # Información de cuentas bancarias
│   ├── app.js                   # Punto de entrada de la aplicación
│   ├── data.json                # Catálogo completo de productos
│   └── index.html               # Template HTML
├── public/                       # Archivos compilados (producción)
│   ├── assets/                  # Imágenes de productos
│   ├── files/                   # Fuentes Poppins (WOFF/WOFF2)
│   ├── app.js                   # JavaScript bundleado y minificado
│   ├── index.html               # HTML minificado
│   └── style.min.css            # CSS minificado
├── assets/                       # Assets sin procesar para optimización
├── package.json                  # Dependencias NPM
└── run.sh                        # Script de build
```

## Categorías de Productos

El catálogo incluye 4 categorías principales:

1. **Plásticos** (tema azul)
   - Bolsas plásticas
   - Vasos y copas
   - Guantes

2. **Perfumería** (tema rosa)
   - Productos de cuidado personal
   - Jabones
   - Cremas dentales

3. **Tabaquería** (tema amarillo)
   - Encendedores
   - Papeles para armar
   - Accesorios

4. **Bazar** (tema verde)
   - Adhesivos
   - Cintas de embalaje
   - Vendas
   - Artículos generales

## Instalación

### Requisitos Previos

- Node.js v16 o superior
- npm o yarn

### Pasos de Instalación

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/dsy-catalogo2.git
cd dsy-catalogo2

# Instalar dependencias
npm install

# Ejecutar el build (con watch mode)
./run.sh
```

## Desarrollo

### Script de Build

El script `run.sh` ejecuta las siguientes tareas:

1. **Minificación HTML**: Comprime el archivo HTML eliminando espacios y comentarios
2. **Copia de fuentes**: Copia archivos de la fuente Poppins (solo primera vez)
3. **Compilación TailwindCSS**: Procesa directivas de TailwindCSS
4. **Minificación CSS**: Bundlea y minifica CSS incluyendo fuentes
5. **Bundling JavaScript**: Empaqueta y minifica JavaScript con watch mode

```bash
# Ejecutar el proceso de build completo
./run.sh
```

### Soporte de Navegadores

- Chrome 58+
- Firefox 57+
- Safari 11+
- Edge 16+

## Estructura de Datos

### Productos (`src/data.json`)

```json
{
  "site": {
    "header": { "title": "...", "subtitle": "..." },
    "content": {
      "categorias": [
        {
          "name": "Nombre Categoría",
          "colors": {
            "primary": "#color",
            "secondary": "#color",
            "text-bg": "clase-texto",
            "text-primary": "clase-texto"
          },
          "subcategorias": [
            {
              "name": "Nombre Subcategoría",
              "productos": [
                {
                  "id": 1,
                  "nombre": "Nombre del Producto",
                  "descripcion": "Descripción",
                  "precio": 1500,
                  "precio_unitario": 100,
                  "caracteristicas": ["característica 1", "característica 2"],
                  "imagen": "ruta/imagen.png"
                }
              ]
            }
          ]
        }
      ]
    },
    "footer": { "copyright": "...", "aviso": "...", "link": "..." }
  },
  "mdp": {
    "header": { "title": "...", "subtitle": "..." },
    "footer": { "copyright": "...", "aviso": "...", "link": "..." }
  }
}
```

### Medios de Pago (`src/json/medios-de-pago.json`)

Contiene información de cuentas bancarias:
- Banco Scotiabank (cuenta empresarial)
- Banco Estado (cuenta RUT personal)

Cada cuenta incluye: tipo, número de cuenta, razón social y RUT.

## Rutas de la Aplicación

- `/` - Página principal del catálogo
- `/medios-de-pago` - Información de cuentas bancarias

## Despliegue

Los archivos compilados en el directorio `/public` están listos para producción. Simplemente sirve este directorio con cualquier servidor web estático:

```bash
# Ejemplo con servidor HTTP de Python
python -m http.server 8000 --directory public

# O con Node.js http-server
npx http-server public -p 8000
```

## Licencia

Todos los derechos reservados - Bazar y Paqueteria Daisy Montenegro E.I.R.L.

## Contacto

Para consultas sobre productos o pedidos, contacte a través de los medios de pago disponibles en la aplicación.
