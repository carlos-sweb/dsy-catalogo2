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
    "type":"Tipo de Cuenta","number":"Número de cuenta",
    "rz":"Razón Social", "rut":"R.U.T"
}

function GetItem(){
    return {
        view:(vnode)=>{
        const {key,value} = vnode.attrs    
        const text = textCuenta[key];
        return (
            <div class='mdp-card-content-item'>
                <p class='text-sm text-gray-600 font-semibold mb-1'>{text}</p>
                <p class='text-xl text-gray-800'>{value}</p>
            </div>
        )    
        }
    }
    
    
}

function getItem(key,value){
    const text = textCuenta[key];
    return (
        <div class='mdp-card-content-item'>
            <p class='text-sm text-gray-600 font-semibold mb-1'>{text}</p>
            <p class='text-xl text-gray-800'>{value}</p>
        </div>
        )    
}


function Card(){
    return {
        view:(vnode)=>{
            const {data,name} = vnode.attrs.cuenta
            const TextValue = `${name}\nCuenta ${data.type}\n${data.number}\n${data.rz}\n${data.rut}`            
            return(             
            <div class='mdp-card' >
                <div class='mdp-card-header'>
                    <h2>{name}</h2>
                    <button 
                        id="mdp-copy"  
                        data-clipboard-text={TextValue} >
                    <span>{m.trust(Copy)}</span>
                    </button>                
                </div>
                <div class='mdp-card-content'>
                    {Object.keys(data).map( key =>(<GetItem key={key} value={data[key]} />) )}
                </div>
                <div class='mdp-card-footer'>
                    <p>Por favor, envíe el comprobante de transferencia para confirmar su pedido</p>
                    <button 
                        onclick={compartirInformacion.bind(data,name)}>
                        <span class="h-6 w-6 text-blue-600 inline-block">{m.trust(Share2)}</span>
                    </button>
                </div>
            </div>

            )
        }
    }
}


export default {
    view:()=>{
        window.scrollTo({top:0,behavior:"smooth"});
        return(
            <main class='mdp-card-container poppins-regular'>
             { cuentas.map((cuenta)=>(<Card cuenta={cuenta} />)) }
            </main>
        )
    }
}