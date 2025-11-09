import m from 'mithril'
import debounce from 'lodash.debounce'
import inputSearch from './inputSearch.js'
import numeral from 'numeral'
import localNumeral from './localNumeral.js'

numeral.register('locale', 'es-cl', localNumeral )
numeral.locale('es-cl')

var valueSearch = ''
var handleChildInputChange = (vl) =>  valueSearch = vl
/**
 * Filtra el array de categorías, subcategorías y productos 
 * basado en un término de búsqueda, manteniendo la estructura.
 */
function filterForSearch(data, name) {
    // 1. Normaliza el término de búsqueda a minúsculas para que no sea sensible
    const searchTerm = name.toLowerCase();

    // 2. Recorre las categorías principales usando map
    return data.map(category => {
        
        // 3. Recorre las subcategorías usando map
        const filteredSubcategories = category.subcategorias.map(subcategory => {
            
            // 4. Filtra los productos que coinciden con el término de búsqueda
            const matchingProducts = subcategory.productos.filter(product =>
                product.nombre.toLowerCase().includes(searchTerm)
            );

            // 5. Si hay productos que coinciden, retorna una *nueva* subcategoría
            //    copiando sus propiedades y asignando solo los productos filtrados.
            if (matchingProducts.length > 0) {
                return { 
                    ...subcategory, 
                    productos: matchingProducts 
                };
            }
            // 6. Si no hay productos, retorna null para esta subcategoría
            return null;
        }).filter(sub => sub !== null); // 7. Limpia las subcategorías que quedaron en null

        // 8. Si esta categoría tiene subcategorías con productos...
        if (filteredSubcategories.length > 0) {
            // 9. Retorna una *nueva* categoría con las subcategorías filtradas
            return { 
                ...category, 
                subcategorias: filteredSubcategories 
            };
        }
        // 10. Si no, retorna null para esta categoría
        return null;
    }).filter(cat => cat !== null); // 11. Limpia las categorías que quedaron en null
}


const itemCard = {
    view:function(vnode){        
        const precio = vnode.attrs.precio        
        const precio_unitario = vnode.attrs.precio_unitario || null;        
        const primary = vnode.attrs.primary
        return m('div.card-item.poppins-semibold',
            m('div.card-item-image',m('img',{src:vnode.attrs.imagen})),
            m('div.card-item-content',
                m('h4',vnode.attrs.nombre),
                m('p.content-desc',vnode.attrs.descripcion),                
                m('p.content-price',{class:primary},m('span.content-price-text', numeral(precio).format('$0,0') )),
                (precio_unitario != null) ? m('p.content-price-unitario.poppins-regular','Precio Unitario: '+numeral(precio_unitario).format('$0,0')) : void(0)
                ),
        );
    }
}



const content = {        
    view:(vnode)=>{        
        window.scrollTo({top:0,behavior:'smooth'})

        return m('main.main-home',
            m(inputSearch,{
                value: valueSearch,
                onValueChange: handleChildInputChange
            }),
            filterForSearch(vnode.attrs['categorias'],valueSearch).map( category =>{
            
            const primary = category.colors.primary,
            secondary = category.colors.secondary,
            textPrimary =    category.colors['text-primary']; 

            return m('section',
            m('div',
                m('div',{class:primary}),
                m('h2.poppins-bold',category.name)
            ),            
            m('div',
                category['subcategorias'].map( sub =>{                                        
                    return [
                        m('div',m('div',{class:primary}),m('h3.poppins-bold',sub.name)),
                        m('div',
                            sub['productos'].map(function(producto){
                                return m(itemCard,{...producto,...{primary:textPrimary}} )
                            })
                        )                        
                    ]
                })
            )
        )    
        })        
        )        
    }
}

export default content;