import m from 'mithril'

import Home from './Pages/Home.jsx'

var root = document.body
var count = 0 // added a variable

var Hello = {
	view: function() {
		return m("main", [
			m("h1", {class: "title"}, "My first app"),
			// changed the next line
			m("button", {onclick: function() {count++}}, count + " clicks"),
		])
	}
}

var Splash = {
	view: function() {
		return m("a", {href: "#!/hello"}, "Enter!")
	}
}
document.addEventListener('DOMContentLoaded', ()=>{	


	m.route(document.body, "/", {
		"/":{
			render:function(){
				return m(Home)
			}
		},
		"/splash": Splash,
		"/hello": Hello,
	})

})




