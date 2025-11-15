import m from 'mithril'
import { css } from '../../styled-system/css'

const header = function(){
	return {
		view :(vnode)=>{
			const {title,subtitle} = vnode.attrs
			return (
			<header class={css({
				bgGradient: 'to-r',
				gradientFrom: 'blue.600',
				gradientTo: 'blue.800',
				color: 'white',
				py: '6',				
				fontFamily: 'poppins',
				fontWeight: 'medium'
			})}>
				<div class={css({
					maxW: '7xl',
					mx: 'auto',
					px: '4'
				})}>
					<h1 class={css({
						fontSize: '5xl',
						fontWeight: 'bold',
						mb: '3'
					})}>{title}</h1>
					<p class={css({
						fontSize: 'xl',
						color: 'blue.100'
					})}>{subtitle}</p>
				</div>
			</header>
			)
		}
	}
}

export default header