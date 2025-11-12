import m from 'mithril'

const header = function(){
	return {
		view :(vnode)=>{
			const {title,subtitle} = vnode.attrs
			return (
			<header class="header poppins-medium">
				<div>
					<h1 class="header-h1">{title}</h1>
					<p class="header-p" >{subtitle}</p>
				</div>
			</header>
			)
		}
	}
}

export default header