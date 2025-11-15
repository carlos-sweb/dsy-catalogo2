import path from 'node:path'
import qrcode from 'qrcode';
import { networkInterfaces } from 'os'

// --- 2. Función para encontrar tu IP en la red local ---
function getLocalNetworkIP(): string {
  const nets = networkInterfaces();
  
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]!) {
      // Buscamos la dirección IPv4 que no sea interna (como 127.0.0.1)
      if (net.family === 'IPv4' && !net.internal) {
        return net.address;
      }
    }
  }
  return 'localhost'; // Fallback
}

const apk_path = path.join(__dirname,"app.apk")



const server = Bun.serve({
  port:5432,
  hostname:getLocalNetworkIP(),
  routes:{
    "/":new Response( 
          await Bun.file(  apk_path ).bytes() ,{
            "headers":{
              "Content-Type":"application/vnd.android.package-archive"
            } 
          })
  }
})

try {
  const qrString = await qrcode.toString( String(server.url.href) , {
    type: 'terminal',
    small: true // Usa 'small: true' para un QR más compacto
  });

  console.log(qrString);

} catch (err) {
  console.error(err);
  process.exit(1);
}

console.log(`${server.url}`);
