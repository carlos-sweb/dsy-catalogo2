import m from 'mithril'
import { css } from '../../styled-system/css'

const inputSearch = function(){
	return {
		view:(vnode)=>(
			<div class={css({
				display: 'flex',
				flexDirection: 'column',
				py: '8'
			})}>
				<input
					class={css({
						w: 'full',
						fontSize: 'xl',
						px: '6',
						py: '4',
						pr: '32',
						rounded: 'xl',
						borderWidth: '2px',
						borderStyle: 'solid',
						borderColor: 'gray.300',
						transition: 'all',
						_focus: {
							borderColor: 'blue.500',
							outline: 'none',
							ringWidth: '4px',
							ringColor: 'blue.200'
						}
					})}
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