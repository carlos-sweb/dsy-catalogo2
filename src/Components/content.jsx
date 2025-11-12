import m from 'mithril'
import debounce from 'lodash.debounce'

import filterForSearch from './../helpers/filterForSearch.js'
import InputSearch from './inputSearch.jsx'
import ItemCard from './itemCard.jsx'


var valueSearch = ''
var handleChildInputChange = (vl) =>  valueSearch = vl

const content = function(){
    return {
        view:( vnode )=>{          
            window.scrollTo({top:0,behavior:'smooth'})
            const dataFilter = filterForSearch(vnode.attrs['categorias'],valueSearch)            
            return (
            <main class='main-home'>
                <InputSearch 
                    value={valueSearch} 
                    onValueChange={handleChildInputChange} />
                    {dataFilter.map( category =>(
                        <section>
                            {/* Cabecera del titulo */}                            
                            <div>
                                <div class={category.colors.primary}></div>
                                <h2 class='poppins-bold'>{category.name}</h2>
                            </div> 
                            {/* Subtitulo y Contenido */}
                            <div>
                            {/* subtitulo de categoria */}
                            { category['subcategorias'].map( sub => (
                                [<div>
                                    <div class={category.colors.primary}></div>
                                    <h3 class='poppins-bold'>{sub.name}</h3>
                                </div>,
                                <div>                                    
                                    { sub['productos'].map( producto => (
                                        <ItemCard 
                                            descripcion={producto.descripcion} 
                                            colorText={category.colors["text-primary"]} 
                                            imagen={producto.imagen} 
                                            precio={producto.precio} 
                                            precio_unitario={producto.precio_unitario} 
                                            nombre={producto.nombre}
                                                />
                                        ) ) }
                                </div>]
                            ) ) }
                            </div>
                        </section>
                    ))}    
                
            </main>
            )
        }
    }
}


export { content as default }