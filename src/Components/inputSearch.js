import m from 'mithril'
var inputSearch = {	
	view:function(vnode){		
		return m('div.flex flex-column py-8',
			m('input.input-search',{
				type:'text',
				placeholder:'Buscar...',
				value:vnode.attrs.value,
				oninput: (e) =>  vnode.attrs.onValueChange && vnode.attrs.onValueChange(e.target.value)
			})
		)
	}
}
export { inputSearch as default}