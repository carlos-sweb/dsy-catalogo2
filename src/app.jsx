import "share-api-polyfill"
import ClipboardJS from "clipboard"
import m from 'mithril'

import header from './Components/header.jsx'
import content from './Components/content.jsx'
import mdpContent from './Components/mdpContent.jsx'
import footer from './Components/footer.jsx'

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

var Mediosdepago = {
	oncreate:function(){		
		document.body.style.display = 'block';
		document.body.classList.add('animate__animated','animate__fadeIn')
		var clipboard = new ClipboardJS('#mdp-copy');
	},
	view: function() {
		return [
			m(header,data["mdp"]["header"]),
			m(mdpContent,data["mdp"]["content"]),
			m(footer,data["mdp"]["footer"])
		]
	}
}

document.addEventListener('DOMContentLoaded', function() {	
	setTimeout(function(){
		m.route(document.body, "/", {
			"/": Home,
			"/medios-de-pago": Mediosdepago,
		})
	})
});

