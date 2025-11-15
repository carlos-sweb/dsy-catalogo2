#!/usr/bin/bash
#rsvg-convert -f png -w 600 -o fondo.png svg/fondo.svg
# rembg i chemmer-12.png output.png
#  magick output.png -background white -flatten salida-blanca.png
# magick encendedor-ronson-raw.png -define png:compression-filter=5 -define png:compression-level=9 -define png:compression-strategy=1 -strip -resize 600x output_optimized.png
# magick -flop

# Generar styled-system de Panda CSS
npx panda codegen

# Generar CSS estático de Panda
npx panda cssgen --outfile public/style.css

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

# Bundle con esbuild (incluye automáticamente Panda CSS)
esbuild src/app.jsx \
--bundle \
--minify \
--format=iife \
--target=es2020 \
--jsx-factory=m --jsx-fragment="'['" \
--loader:.js=jsx \
--outdir=public \
--watch
#--serve=5000 \
#--servedir=public
