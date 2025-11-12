import m from 'mithril'
import numeral from 'numeral'
import localNumeral from './../helpers/localNumeral.js'
numeral.register('locale', 'es-cl', localNumeral )
numeral.locale('es-cl')

export default function(){
    return {
        view:(vnode)=>{
            const {imagen,nombre,descripcion,colorText,precio,precio_unitario} = vnode.attrs
           return (
            <div class='card-item poppins-semibold'  >
                <div class='card-item-image'  >
                    <img src={imagen}/>
                </div>
                <div class='card-item-content'  >
                    <h4>{nombre}</h4>
                    <p class='content-desc'>{descripcion}</p>
                    <p class={ 'content-price ' + colorText}>
                        <span class='content-price-text'  >{numeral(precio).format('$0,0')}</span>
                        {precio_unitario && <p class='content-price-unitario poppins-regular'>Precio Unitario: {numeral(precio_unitario).format('$0,0')}</p>}
                    </p>
                </div>
            </div>
            )
        }
    }
}

