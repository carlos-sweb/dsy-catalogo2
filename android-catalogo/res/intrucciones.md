intrucciones.md

rsvg-convert -f png -w 600 -o text.png svg/text.svg

magick fondo.png store.png -gravity center -geometry +0-28 -composite salida.png


magick encendedor-ronson-raw.png -define png:compression-filter=5 -define png:compression-level=9 -define png:compression-strategy=1 -strip -resize 600x output_optimized.png 