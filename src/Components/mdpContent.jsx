import m from 'mithril'
import {Copy,ArrowLeft,Share2} from 'lucide-static'
import cuentas from "./../json/medios-de-pago.json"
/**
 * Intenta compartir información usando la Web Share API (nativa del navegador).
 * Si no está disponible, proporciona un mensaje de error o una alternativa (aunque en este ejemplo solo muestra un error).
 *
 * @param {string} titulo El título a compartir.
 * @param {string} texto El cuerpo del texto o descripción a compartir.
 * @param {string} url La URL que se compartirá.
 */
function compartirInformacion(data,banco) {    
    // 1. Verificar si la Web Share API está disponible
    if (navigator.share) {
        // 2. Usar la Web Share API
        navigator.share({
        title: '',
        text: `${banco}\nCuenta ${data.type}\n${data.number}\n${data.rz}\n${data.rut}`, 
        url: ''
        })
        .then( _ => console.log('Yay, you shared it :)'))
        .catch( error => console.log('Oh noh! You couldn\'t share it! :\'(\n', error));


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


function getItem(key,value){
    const text = textCuenta[key];
    return m("div.mdp-card-content-item",[
        m("p.text-sm text-gray-600 font-semibold mb-1 ", text , text == "number" ? "|Copy":void(0) ),
        m("p.text-xl text-gray-800", value)
    ]);
}

function getMain(){
    window.scrollTo({top:0,behavior:"smooth"});
    return m("main.mdp-card-container.poppins-regular",
     // Card Map loop
     cuentas.map(function(cuenta){
        // Card
        return m("div.mdp-card",
        // Card Header
        [m("div.mdp-card-header",[
                m("h2",cuenta.name),
                m("button#mdp-copy",{
                    "data-clipboard-text":`${cuenta.name}\nCuenta ${cuenta.data.type}\n${cuenta.data.number}\n${cuenta.data.rz}\n${cuenta.data.rut}`
                }
                ,m("span",m.trust(Copy))),
         ]),
         m("div.mdp-card-content",Object.keys(cuenta.data).map((key)=>getItem(key,cuenta.data[key]))),
         m("div.mdp-card-footer",[
            m("p","Por favor, envíe el comprobante de transferencia para confirmar su pedido"),
            m("button",{
                onclick:()=>compartirInformacion(cuenta.data,cuenta.name)
            },m("span.h-6 w-6 text-blue-600 inline-block",m.trust(Share2)))
         ])]
        )
     }),
     m("div.mdp-button-box",
        m("a.mdp-button",{href:"/#!/"},[m("span.h-5 w-5 inline-block",m.trust(ArrowLeft)),"Volver al Catálogo"]))   
     
    )
}

const mdpContent ={
    view:(vnode)=> getMain()    
}

export default mdpContent