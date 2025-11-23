import "share-api-polyfill"
import ClipboardJS from "clipboard"
import m from 'mithril'

import imageMap from './asset-imports.js';

import header from './Components/header.jsx'
import content from './Components/content.jsx'
import mdpContent from './Components/mdpContent.jsx'
import footer from './Components/footer.jsx'


import Mediosdepago from './pages/mdp.jsx'

import data from './data.json' with { type: "json" }



var Home = {	
	view: function() {
		return [
			m(header,data['site']['header']),
			m(content,{...data['site']['content'], imageMap}),
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
			"/admin":()=>{
				return {
					view:function(){
						return m.trust("<h1>Admin</h1>")
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

