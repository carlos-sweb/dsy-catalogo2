import "share-api-polyfill"
import ClipboardJS from "clipboard"
import m from 'mithril'

import header from './Components/header.jsx'
import content from './Components/content.jsx'
import mdpContent from './Components/mdpContent.jsx'
import footer from './Components/footer.jsx'


import Mediosdepago from './pages/mdp.jsx'

import data from './data.json' with { type: "json" }


var Home = {
	oncreate:function(){		
		document.body.style.display = 'block';
		document.body.classList.add('animate__animated','animate__fadeIn')
	},
	view: function() {
		return [
			m(header,data['site']['header']),
			m(content,data['site']['content']),
			m(footer,data['site']['footer'])
		]
	}
}




document.addEventListener('DOMContentLoaded', ()=>{	
	
	m.route(
		document.body,
		"/",
		{
			"/":()=>{
				return {
					view:function(){
						return m(Home)
					}
				}
			},
			"/medios-de-pago":{
				render:()=>{
					
					const {title,subtitle} = data["mdp"]["header"],
					{aviso ,copyright , link } = data["mdp"]["footer"]
					return m(Mediosdepago,{
							title:title,
							subtitle:subtitle,
							aviso:aviso,
							copyright:copyright,
							link:link
						})
				}
			}			
		}
	)
	
});

