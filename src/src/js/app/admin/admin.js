import Component from '../component';
import SignIn from './auth/signIn';
import Router from '../router';

var Admin = {
	build: function() {
		let signIn = SignIn.init();
		let router = Router.init('signin', (visible) => {
			if (visible) {
				this.el.appendChild(signIn.el);
			}
		});
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

		var button = inst.createEl('<a href="#foo">url</a>');
		inst.el.appendChild(button);

		inst.render()

		return inst;
	}
} 


export default Admin;