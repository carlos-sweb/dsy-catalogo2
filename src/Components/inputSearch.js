import m from 'mithril'
import {Copy,ArrowLeft,Share2} from 'lucide-static'
import debounce from 'lodash.debounce'


const timeWait  = 600;

const getChange = function(event){
	if( this.value != event.target.value.trim()){
		this.value = event.target.value.trim();
		this.filter();
	} 	
}

var inputSearch = {
	value:"",
	filter:function(){
		console.log(`Filter : ${this.value}`);
		console.log( this.value.split(/\s/) )
	},
	view:function(){
		return m('div.flex flex-column py-8',
			m('input.input-search',{
				type:'text',
				placeholder:'Buscar...',
				onchange:debounce(getChange,timeWait).bind(this),
				onkeyup:debounce(getChange,timeWait).bind(this),
				onkeydown:debounce(getChange,timeWait).bind(this)				
			})
		)
	}
}

export { inputSearch as default}