import m from 'mithril'
import numeral from 'numeral'
import localNumeral from './localNumeral.js'
numeral.register('locale', 'es-cl', localNumeral )
numeral.locale('es-cl')

export default function(){
    return {
        view:(vnode)=>(
            <div class='card-item poppins-semibold'  >
                <div class='card-item-image'  >
                    <img src={vnode.attrs.imagen}/>
                </div>
                <div class='card-item-content'  >
                    <h4>{vnode.attrs.nombre}</h4>
                    <p class='content-desc'>{vnode.attrs.descripcion}</p>
                    <p class={ 'content-price ' + vnode.attrs.colorText}>
                        <span class='content-price-text'  >{numeral(vnode.attrs.precio).format('$0,0')}</span>
                        {vnode.attrs.precio_unitario && <p class='content-price-unitario poppins-regular'>Precio Unitario: {numeral(vnode.attrs.precio_unitario).format('$0,0')}</p>}
                    </p>
                </div>
            </div>
        )
    }
}

