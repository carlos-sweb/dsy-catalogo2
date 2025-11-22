import m from 'mithril'
import { css } from '../../styled-system/css'
import {SquircleDashed} from 'lucide-mithril'

export default {
		view :(vnode)=>{
			const {title,subtitle} = vnode.attrs
			return (
			<header class='header-page'>
				<div class={css({
					maxW: '7xl',
					mx: 'auto',
					px: '4'
				})}>
					<SquircleDashed stroke='oklch(54.6% 0.245 262.881)' ondblclick={function(){
						alert("Code for admin")
					}} class={css({
						position:'absolute',
						top:0,
						right:0,
						m:'30px',
						zIndex:'10'
					})} />
					<h1>{title}</h1>
					<p class={css({
						fontSize: 'xl',
						color: 'blue.100'
					})}>{subtitle}</p>
				</div>
			</header>
			)
		}
	}