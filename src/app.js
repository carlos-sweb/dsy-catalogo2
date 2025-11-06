import m from 'mithril'
import buttonGo from './Components/buttonGo.js'
import header from './Components/header.js'

import content from './Components/content.js'

import mdpContent from './Components/mdpContent.js'
import footer from './Components/footer.js'
import data from './data.json' with { type: "json" };



var root = document.body

var Home = {
	oncreate:function(){
		document.body.classList.remove("hidden")
		document.body.classList.add("animate__animated","animate__fadeIn")
	},
	view: function() {
		return [
			m(header,data["site"]["header"]),
			m(content,data["site"]["content"]),
			m(footer,data["site"]["footer"])
		]
	}
}

var Mediosdepago = {
	oncreate:function(){
		document.body.classList.remove("hidden")
		document.body.classList.add("animate__animated","animate__fadeIn")
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
	},300)		
		
});

