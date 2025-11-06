import m from 'mithril'
const footer ={
    view:function(vnode){
        return m("footer",{class:"bg-gray-800 text-white py-10 mt-20 poppins-light"},
            m("div",{class:"max-w-7xl mx-auto px-4 text-center"},
                [
                    m("p",{class:"text-gray-400 text-lg mb-3"},vnode.attrs.copyright),
                    m("p",{class:"text-gray-500 text-base mb-4"},vnode.attrs.aviso),
                    m("a",{href:vnode.attrs.link.url,class:"text-blue-400 hover:text-blue-300 underline text-base transition-colors"},vnode.attrs.link.text)
                ]
                )
            )
    }
}
export { footer as default } 