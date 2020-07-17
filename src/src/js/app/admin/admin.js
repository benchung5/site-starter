import Component from '../component';
import SignIn from './auth/signIn';

var Admin = {
	build: function() {
		let signIn = SignIn.init();
		this.el.appendChild(signIn.el);

	},
	init: function() {
		var proto = Object.assign({}, this, Component)
		var inst = Object.create(proto);
		proto.constructor = inst;

		//call initialize on Component first
		inst.initialize({
			container: document.querySelector('.js-app-container'),
		});

		inst.build();

		inst.render()
		
		return inst;
	}
} 


export default Admin;