import m from 'mithril'

const header = {
	
	view:function(vnode){
		const title = vnode.attrs.title,
		subtitle = vnode.attrs.subtitle;
		return m("header.header poppins-medium" ,m("div",[
			m("h1.header-h1",title),
			m("p.header-p",subtitle)
		]));
	}
}

export { header as default }