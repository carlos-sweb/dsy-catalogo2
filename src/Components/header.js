import m from 'mithril'

const cssHeader = "header.bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12 poppins-medium",
header = {
	
	view:function(vnode){
	
		return m(cssHeader,m("div",{class:"max-w-7xl mx-auto px-4"},[
			m("h1",{class:"text-5xl md:text-6xl font-bold mb-3"}, vnode.attrs.title),
			m("p",{class:"text-xl text-blue-100"},vnode.attrs.subtitle)
		]));
	}
}

export { header as default }