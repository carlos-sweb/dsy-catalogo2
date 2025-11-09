import m from 'mithril'
import inputSearch from './inputSearch.js'
import numeral from 'numeral'



numeral.register('locale', 'es-cl', {
    delimiters: {
        // En Chile se usa el punto (.) para los miles
        thousands: '.',
        // En Chile se usa la coma (,) para los decimales
        decimal: ','
    },
    abbreviations: {
        // Abreviaciones comunes en español, aunque a veces no se usan tanto como en inglés
        thousand: 'mil',
        million: 'millón',
        billion: 'mil millones', // o 'millardo' aunque es menos común
        trillion: 'billón'
    },
    ordinal : function (number) {
        // Función para el ordinal, en español se usa 'º' o 'ª'
        var remainder = number % 100;
        return (remainder >= 11 && remainder <= 13) ? 'º' : ['º', 'ª', 'º', 'ª', 'º', 'ª', 'º', 'ª', 'º', 'ª'][number % 10];
        /*
        Alternativa más simple pero menos precisa (solo usa 'º'):
        return 'º';
        */
    },
    currency: {
        // Símbolo del Peso Chileno
        symbol: '$'
    }
});

// Activar la configuración local chilena
numeral.locale('es-cl');

const cssMain = "main.main-home",
cssH2 = "h2.poppins-bold"

const itemCard = {
    view:function(vnode){        
        const precio = vnode.attrs.precio        
        const precio_unitario = vnode.attrs.precio_unitario || null;        
        const primary = vnode.attrs.primary
        return m("div.card-item.poppins-semibold",
            m("div.card-item-image",m("img",{src:vnode.attrs.imagen})),
            m("div.card-item-content",
                m("h4",vnode.attrs.nombre),
                m("p.content-desc",vnode.attrs.descripcion),                
                m("p.content-price",{class:primary},m("span.content-price-text", numeral(precio).format("$0,0") )),
                (precio_unitario != null) ? m("p.content-price-unitario.poppins-regular","Precio Unitario: "+numeral(precio_unitario).format("$0,0")) : void(0)
                ),
        );
    }
}


const content = {
    view:(vnode)=>{
        window.scrollTo({top:0,behavior:"smooth"});
        return m( "main.main-home" ,
            m(inputSearch),
            vnode.attrs["categorias"].map((category)=>{
            
            const primary = category.colors.primary,
            secondary = category.colors.secondary,
            textPrimary =    category.colors["text-primary"]; 

            return m("section",
            m("div",
                m("div",{class:primary}),
                m(cssH2,category.name)
            ),            
            m("div",
                category["subcategorias"].map((sub)=>{                                        
                    return [
                        m("div",m("div",{class:primary}),m("h3.poppins-bold",sub.name)),
                        m("div",
                            sub["productos"].map(function(producto){
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