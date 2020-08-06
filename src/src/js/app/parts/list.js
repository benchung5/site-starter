import Component from '../component';
import Button from './button';
import { getSingle } from '../actions/plants'

var List = {
	getData: function() {
		getSingle('alternate-leaf-dogwood', (apiData) => {
			this.apiData = apiData;
			this.build();
		});
	},
	build: function() {
		this.apiData.soil.map((item) => {
			let button = Button.init();
			button.el.innerHTML = item.name;
			this.el.appendChild(button.el);
		});
	},
	init: function() {
		var proto = Object.assign({}, this, Component)
		var inst = Object.create(proto);
		// assign the instance constructor to the prototype so 'this' refers to the instance
		proto.constructor = inst;

		//call initialize on Component first
		inst.initialize({
			container: document.getElementById('example-component'),
			el: `<ul></ul>`
		});


		inst.getData();

		inst.render()
		return inst;
	}
} 


export default List;