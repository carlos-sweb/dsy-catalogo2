import m from 'mithril'

import {Copy,ArrowLeft,Share2} from 'lucide-static';


/**
 * Intenta compartir información usando la Web Share API (nativa del navegador).
 * Si no está disponible, proporciona un mensaje de error o una alternativa (aunque en este ejemplo solo muestra un error).
 *
 * @param {string} titulo El título a compartir.
 * @param {string} texto El cuerpo del texto o descripción a compartir.
 * @param {string} url La URL que se compartirá.
 */
function compartirInformacion(titulo, texto, url) {
    // 1. Verificar si la Web Share API está disponible
    if (navigator.share) {
        // 2. Usar la Web Share API
        navigator.share({
                title: "Mi Titulo",
                text: "Texto"                
            })
            .then(() => console.log('Contenido compartido con éxito.'))
            .catch((error) => {
                // El error puede ser por que el usuario canceló la acción o por otro fallo
                console.error('Error al compartir o acción cancelada:', error);
            });
    } else {
        // 3. Mecanismo de respaldo (fallback)
        console.warn('Web Share API no soportada. Usando el portapapeles o mostrando un mensaje.');

        // Un fallback común es copiar la URL al portapapeles
        navigator.clipboard.writeText(url)
            .then(() => {
                alert(`¡Enlace copiado al portapapeles! Comparte esto: ${url}`);
            })
            .catch(err => {
                // Si la copia al portapapeles falla
                console.error('No se pudo copiar al portapapeles:', err);
                alert('La Web Share API no está disponible y no se pudo copiar el enlace automáticamente. Por favor, copia el enlace manualmente: ' + url);
            });
    }
}



const textCuenta = {
    "type":"Tipo de Cuenta",
    "number":"Número de cuenta",
    "rz":"Razón Social",
    "rut":"R.U.T"
}

const cssmain ="main.max-w-4xl.mx-auto.px-4.py-12.poppins-regular",
cssCard = "div.bg-white.rounded-xl.shadow-lg.overflow-hidden.mb-8",
cssCardHeader = "div.bg-gradient-to-r.from-blue-600.to-blue-800.px-8.py-6.flex.justify-between.items-center",
cssCardFooter = "div.bg-gray-50.px-8.py-6.border-t.border-gray-200.flex.justify-between.items-center",
cssLinkBack = "a.inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-xl transition-colors shadow-md hover:shadow-lg cursor-pointer"

function getItem(key,value){
    const text = textCuenta[key];
    return m("div.border-l-4 border-blue-600 pl-6 py-2",[
        m("p.text-sm text-gray-600 font-semibold mb-1 ", text , text == "number" ? "|Copy":void(0) ),
        m("p.text-xl text-gray-800", value)
    ]);
}

function getMain(cuentas){
    return m(cssmain,
     // Card Map loop
     cuentas.map(function(cuenta){
        // Card
        return m(cssCard,
        // Card Header
        [m(cssCardHeader,[
                m("h2.text-3xl.font-bold.text-white",cuenta.name),
                m("button.copy-btn.p-2.hover:bg-white/20.rounded-lg.transition-colors cursor-pointer", m("span.h-6 w-6 text-white inline-block",m.trust(Copy))  ),
         ]),
         m("div.p-8 space-y-6",Object.keys(cuenta.data).map((key)=>getItem(key,cuenta.data[key]))),
         m(cssCardFooter,[
            m("p.text-sm.text-gray-600.flex-1","Por favor, envíe el comprobante de transferencia para confirmar su pedido"),
            m("button.share-btn ml-4 p-3 hover:bg-blue-50 rounded-lg transition-colors flex items-center gap-2 cursor-pointer",{onclick:function(){
                compartirInformacion("a","a","a");
            }},m("span.h-6 w-6 text-blue-600 inline-block",m.trust(Share2)))
         ])]
        )
     }),
     m("div.mt-8.text-center",
        m(cssLinkBack,{href:"/#!/"},[m("span.h-5 w-5 inline-block",m.trust(ArrowLeft)),"Volver al Catálogo"]))   
     
    )
}

const mdpContent ={ view:(vnode)=>{
    return getMain(vnode.attrs.cuentas)
} }
export { mdpContent as default } 