import m from 'mithril'

const inputSearch = function(){
	return {
		view:(vnode)=>(
			<div class='flex flex-column py-8' >
				<input 
					class='input-search' 
					type='text' 
					placeholder='Buscar' 
					value={vnode.attrs.value} 
					oninput={(e)=>vnode.attrs.onValueChange&&vnode.attrs.onValueChange(e.target.value)} 
				/>
			</div>
		)
	}
}

export { inputSearch as default}