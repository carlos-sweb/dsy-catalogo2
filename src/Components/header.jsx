import m from 'mithril'

const header = function(){
	return {
		view :(vnode)=>(
			<header class="header poppins-medium">
				<div>
					<h1 class="header-h1">{vnode.attrs.title}</h1>
					<p class="header-p" >{vnode.attrs.subtitle}</p>
				</div>
			</header>
		)
	}
}

export default header