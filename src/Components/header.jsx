import m from 'mithril'
import { css } from '../../styled-system/css'
import {SquircleDashed} from 'lucide-mithril'

export default {
		view :(vnode)=>{
			const {title,subtitle} = vnode.attrs
			return (
			<header class='header-page'>
				<div>
					<SquircleDashed id='iconGoAdmin' ondblclick={function(){
						alert("Code for admin")
					}} />
					<h1>{title}</h1>
					<p>{subtitle}</p>
				</div>
			</header>
			)
		}
	}