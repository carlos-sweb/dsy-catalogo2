import "share-api-polyfill"
import ClipboardJS from "clipboard"
import m from 'mithril'

import Header from './../Components/header.jsx'
import MdpContent from './../Components/mdpContent.jsx'
import Footer from './../Components/footer.jsx'




export default {
		oncreate:()=>{			
			document.body.style.display = 'block';
			document.body.classList.add('animate__animated','animate__fadeIn')
			var clipboard = new ClipboardJS('#mdp-copy');
		},
		view:(vnode)=>{
			const {
				title,
				subtitle,
				aviso,
				copyright,
				link
			} = vnode.attrs

			return (
			[<Header 
				title={title} 
				subtitle={subtitle} 
			/>,
			<MdpContent/>,
			<Footer 
				aviso={aviso} 
				copyright={copyright} 
				link={link} 
			/>]
		)	
		}
		
	};