import m from 'mithril'
import {Copy,ArrowLeft,Share2} from 'lucide-mithril'
import { css } from '../../styled-system/css'
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
            <div class={css({
                mb: '4',
                borderLeftWidth: '4px',
                borderLeftStyle: 'solid',
                borderColor: 'blue.600',
                py: '2',
                pl: '6'
            })}>
                <p class={css({
                    fontSize: 'sm',
                    color: 'gray.600',
                    fontWeight: 'semibold',
                    mb: '1'
                })}>{text}</p>
                <p class={css({
                    fontSize: 'xl',
                    color: 'gray.800'
                })}>{value}</p>
            </div>
        )
        }
    }


}

function getItem(key,value){
    const text = textCuenta[key];
    return (
        <div class={css({
            mb: '4',
            borderLeftWidth: '4px',
            borderLeftStyle: 'solid',
            borderColor: 'blue.600',
            py: '2',
            pl: '6'
        })}>
            <p class={css({
                fontSize: 'sm',
                color: 'gray.600',
                fontWeight: 'semibold',
                mb: '1'
            })}>{text}</p>
            <p class={css({
                fontSize: 'xl',
                color: 'gray.800'
            })}>{value}</p>
        </div>
        )
}


function Card(){
    return {
        view:(vnode)=>{
            const {data,name} = vnode.attrs.cuenta
            const TextValue = `${name}\nCuenta ${data.type}\n${data.number}\n${data.rz}\n${data.rut}`
            return(
            <div class={css({
                bg: 'white',
                rounded: 'xl',
                shadow: 'md',
                overflow: 'hidden',
                mb: '8'
            })}>
                <div class={css({                    
                    bgGradient: 'to-r',
                    gradientFrom: 'blue.600',
                    gradientTo: 'blue.800',
                    px: '8',
                    py: '6',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',                    
                })}>
                    <h2 class={css({
                        fontSize: '3xl',
                        fontWeight: 'bold',
                        color: 'white'
                    })}>{name}</h2>
                    <button
                        id="mdp-copy"
                        data-clipboard-text={TextValue}
                        class={css({
                            outline: 'none',
                            bg: 'transparent',
                            borderStyle: 'none',
                            p: '2',
                            rounded: 'lg',
                            transition: 'colors',
                            cursor: 'pointer',
                            _focus: {
                                outline: 'none'
                            }
                        })}>
                    <span class={css({
                        h: '6',
                        w: '6',
                        color: 'white',
                        display: 'inline-block'
                    })}><Copy/></span>
                    </button>
                </div>
                <div class={css({ p: '8' })}>
                    {Object.keys(data).map( key =>(<GetItem key={key} value={data[key]} />) )}
                </div>
                <div class={css({
                    bg: 'gray.50',
                    px: '8',
                    py: '6',
                    borderTopWidth: '1px',
                    borderTopStyle: 'solid',
                    borderColor: 'gray.200',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                })}>
                    <p class={css({
                        fontSize: 'sm',
                        color: 'gray.600',
                        flex: '1'
                    })}>Por favor, envíe el comprobante de transferencia para confirmar su pedido</p>
                    <button
                        onclick={compartirInformacion.bind(data,name)}
                        class={css({
                            bg: 'transparent',
                            borderStyle: 'none',
                            ml: '4',
                            p: '3',
                            rounded: 'lg',
                            transition: 'colors',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '2',
                            cursor: 'pointer'
                        })}>
                        <span class={css({
                            h: '6',
                            w: '6',
                            color: 'blue.600',
                            display: 'inline-block'
                        })}><Share2/></span>
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
            <main class={css({
                maxW: '4xl',
                mx: 'auto',
                px: '4',
                py: '12',
                fontFamily: 'poppins',
                fontWeight: 'regular'
            })}>
             { cuentas.map((cuenta)=>(<Card cuenta={cuenta} />)) }
             <div class={css({
                mt: '8',
                textAlign: 'center'
             })}>
                <a class={css({
                    display: 'inline-flex',
                    cursor: 'pointer',
                    alignItems: 'center',
                    gap: '2',
                    bg: 'blue.600',
                    color: 'white',
                    fontWeight: 'semibold',
                    px: '8',
                    py: '4',
                    rounded: 'xl',
                    transition: 'colors',
                    shadow: 'md',
                    textDecoration: 'none',
                    _hover: {
                        bg: 'blue.700',
                        shadow: 'lg'
                    }
                })} href='#!/'><ArrowLeft/>Volver al Catálogo</a>
             </div>
            </main>
        )
    }
}