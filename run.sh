#/user/bin/bash
# magick encendedor-ronson-raw.png -define png:compression-filter=5 -define png:compression-level=9 -define png:compression-strategy=1 -strip -resize 600x output_optimized.png

html-minifier \
--collapse-whitespace \
--remove-comments \
src/index.html \
-o public/index.html
#cp -rf src/index.html public/index.html
if [ ! -d public/files ]; then
  cp -r node_modules/@fontsource/poppins/files/ public/
fi

npx @tailwindcss/cli -i src/css/style.css -o src/css/tailwindcss-style.css

cleancss \
src/css/tailwindcss-style.css \
node_modules/@fontsource/poppins/*.css \
-o public/style.min.css

esbuild src/app.js \
--bundle \
--minify \
--target=chrome58,firefox57,safari11,edge16 \
--jsx-factory=m --jsx-fragment="'['" \
--loader:.js=jsx \
--outdir=public \
--watch \
#--serve=5000 \
#--servedir=public
