import { defineConfig } from '@pandacss/dev'


export default defineConfig({
  // Directorios donde Panda buscará clases
  include: [
    './src/**/*.{js,jsx,ts,tsx}',
    './src/**/*.html',
    './src/index.css'
  ],

  // Excluir
  exclude: [],
  
  outFile: "src/style.css",

  // Directorio de salida
  outdir: 'styled-system',

  // Prefijo para clases generadas (opcional)
  prefix: '',

  // Tema personalizado
  theme: {
    extend: {
      keyframes:{
         fadein: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
      },
      tokens: {
        fonts: {
          poppins: { value: "'Poppins', sans-serif" }
        },
        colors: {
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
          },
          green: {
            100: { value: 'oklch(96.2% 0.044 156.743)' },
            400: { value: 'oklch(79.2% 0.209 151.711)' },
            600: { value: 'oklch(62.7% 0.194 149.214)' }
          },
          pink: {
            100: { value: 'oklch(94.8% 0.028 342.258)' },
            400: { value: 'oklch(71.8% 0.202 349.761)' },
            600: { value: 'oklch(59.2% 0.249 0.584)' }
          },
          yellow: {
            100: { value: 'oklch(97.3% 0.071 103.193)' },
            400: { value: 'oklch(85.2% 0.199 91.936)' },
            600: { value: 'oklch(68.1% 0.162 75.834)' }
          }
        },
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
        'poppins-thin': {
          value: {
            fontFamily: 'poppins',
            fontWeight: 'thin',
            fontStyle: 'normal'
          }
        },
        'poppins-extralight': {
          value: {
            fontFamily: 'poppins',
            fontWeight: 'extralight',
            fontStyle: 'normal'
          }
        },
        'poppins-light': {
          value: {
            fontFamily: 'poppins',
            fontWeight: 'light',
            fontStyle: 'normal'
          }
        },
        'poppins-regular': {
          value: {
            fontFamily: 'poppins',
            fontWeight: 'regular',
            fontStyle: 'normal'
          }
        },
        'poppins-medium': {
          value: {
            fontFamily: 'poppins',
            fontWeight: 'medium',
            fontStyle: 'normal'
          }
        },
        'poppins-semibold': {
          value: {
            fontFamily: 'poppins',
            fontWeight: 'semibold',
            fontStyle: 'normal'
          }
        },
        'poppins-bold': {
          value: {
            fontFamily: 'poppins',
            fontWeight: 'bold',
            fontStyle: 'normal'
          }
        },
        'poppins-extrabold': {
          value: {
            fontFamily: 'poppins',
            fontWeight: 'extrabold',
            fontStyle: 'normal'
          }
        },
        'poppins-black': {
          value: {
            fontFamily: 'poppins',
            fontWeight: 'black',
            fontStyle: 'normal'
          }
        }
      }
    }
  },

  // JSX Framework específico
  jsxFramework: 'react', // Panda no tiene soporte específico para Mithril, usamos react que es compatible

  // Optimizaciones
  optimize: true,
  minify: true,

  // Configuración de salida
  hash: false,

  // Formato de salida (js en lugar de mjs para compatibilidad con esbuild)
  outExtension: 'js',

  // Emitir CSS estático
  emitPackage: false,

  // Preflight (reset CSS)
  preflight: true,

  // Global CSS
  globalCss: {
    '.footer':{
          mt: '5',
          bg: 'gray.800',
          color: 'white',
          py: '10',
          fontFamily: 'poppins',
          fontWeight: 'regular'
    },
    '.footer > div':{
      maxW: '7xl',
      mx: 'auto',
      px: '4',
      textAlign: 'center'
    },
    '.footer > div > a':{
        color: 'blue.400',
        textDecoration: 'underline',
        fontSize: 'md',
        transition: 'colors',
        _hover: {
          color: 'blue.300'
        }
      },
    '#iconGoAdmin':{
        position:'absolute',
        top:0,
        right:0,
        m:'30px',
        zIndex:'10',
        stroke:'blue.600'
    },
    '.header-page':{
        bgGradient: 'to-r',
        gradientFrom: 'blue.600',
        gradientTo: 'blue.800',
        color: 'white',
        py: '6',        
        fontFamily: 'poppins',
        fontWeight: 'medium'
    },
    '.header-page > div':{
      maxW: '7xl',
      mx: 'auto',
      px: '4'
    },
    '.header-page h1':{
        fontSize: '5xl',
        fontWeight: 'bold',
        mb: '3'
    },
    'header-page p':{    
      fontSize: 'xl',
      color: 'blue.100'
      
    },
    'html, body': {
      margin: 0,
      padding: 0,
      minHeight: '100vh',
      backgroundColor: '#f3f4f6',
      userSelect: 'none'
    },
    body: {
      display: 'block !important',
      animation: 'fadein 0.7s ease-in-out'
    },
    '*': {
      boxSizing: 'border-box'
    }
  },

  // Forzar generación de clases que se usan dinámicamente desde data.json
  staticCss: {
    css: [
      {
        properties: {
          // Colores de fondo usados dinámicamente
          background: [
            'blue.100', 'blue.400', 'blue.600',
            'pink.100', 'pink.400', 'pink.600',
            'yellow.100', 'yellow.400', 'yellow.600',
            'green.100', 'green.400', 'green.600'
          ],
          // Colores de texto usados dinámicamente
          color: [
            'blue.100', 'blue.400', 'blue.600',
            'pink.100', 'pink.400', 'pink.600',
            'yellow.100', 'yellow.400', 'yellow.600',
            'green.100', 'green.400', 'green.600'
          ]
        }
      }
    ]
  }
})
