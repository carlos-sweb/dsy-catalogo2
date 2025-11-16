#esbuild src/App.jsx \
#--bundle \
#--minify \
#--format=iife \
#--target=es2020 \
#--jsx-factory=m --jsx-fragment="'['" \
#--loader:.js=jsx \
#--outdir=www/js 
#--watch 

cordova build android
cp -f platforms/android/app/build/outputs/apk/debug/app-debug.apk qr-server/app.apk
bun run qr-server/server.js
