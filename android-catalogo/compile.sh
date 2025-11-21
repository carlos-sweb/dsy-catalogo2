cordova build android
cp -f platforms/android/app/build/outputs/apk/debug/app-debug.apk qr-server/app.apk
bun run qr-server/server.js
