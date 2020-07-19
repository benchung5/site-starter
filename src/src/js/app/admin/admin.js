import Component from '../component';
import Router from '../router';
import SignIn from './auth/signIn';
import Dashboard from './dashboard';
import ProtectedWarning from './auth/protectedWarning';
import PageNotFound from './404';

var Admin = {
	update: function(route) {
		//clear el first
		this.el.innerHTML = '';
		if(route === 'signin') {
			this.el.appendChild(this.signIn.el);
		} else if(route === 'dashboard') {
			this.el.appendChild(this.dashboard.el);
		} else {
			this.el.appendChild(this.pageNotFound.el);
		}
		this.render()
	},
	init: function() {
		var proto = Object.assign({}, this, Component)
		var inst = Object.create(proto);
		proto.constructor = inst;

		//call initialize on Component first
		inst.initialize({
			container: document.querySelector('.js-app-container'),
		});

		//components to show
		inst.signIn = SignIn.init();
		inst.pageNotFound = PageNotFound.init();
		inst.dashboard = Dashboard.init();

		Router.init(inst.update.bind(inst));

		return inst;
	}
} 

export default Admin;