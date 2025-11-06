import m from 'mithril'
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

const cssMain = "main.max-w-7xl mx-auto px-4 py-12",
cssH2 = "h2.text-4xl font-bold text-gray-800 poppins-bold"

const itemCard = {
    view:function(vnode){        
        const precio = vnode.attrs.precio        
        const precio_unitario = vnode.attrs.precio_unitario || null;        
        const primary = vnode.attrs.primary
        return m("div.bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow overflow-hidden poppins-semibold",
            m("div.bg-blue-50 h-56 flex items-center justify-center overflow-hidden",m("img",{src:vnode.attrs.imagen})),
            m("div.p-6",
                m("h4.text-2xl font-bold text-gray-800 mb-3 leading-tight",vnode.attrs.nombre),
                m("p.text-lg text-gray-600 mb-5 leading-relaxed",vnode.attrs.descripcion),                
                m("p.text-center border-t-2 pt-5 mt-5",{class:primary},m("span.text-5xl font-bold",{class:primary}, numeral(precio).format("$0,0") )),
                (precio_unitario != null) ? m("p.text-center text-base text-gray-500 mt-2 poppins-regular","Precio Unitario: "+numeral(precio_unitario).format("$0,0")) : void(0)
                ),
        );
    }
}


const content = {
    view:(vnode)=>{
        return m(cssMain,
            vnode.attrs["categorias"].map((category)=>{
            const primary = category.colors.primary; 
            const secondary = category.colors.secondary; 
            const textPrimary =    category.colors["text-primary"]; 
            return m("section.mb20",
            m("div.flex items-center gap-4 mb-10",
                m("div.w-2 h-12 rounded-full",{class:primary}),
                m(cssH2,category.name)
            ),
            m("div.mb-12",
                category["subcategorias"].map((sub)=>{                                        
                    return [
                        m("div.flex items-center gap-3 mb-6",m("div.w-1.5 h-8 rounded-full",{class:primary}),m("h3.text-2xl font-bold text-gray-700",sub.name)),
                        m("div.grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-6",
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