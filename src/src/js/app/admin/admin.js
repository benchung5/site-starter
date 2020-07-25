import Component from '../component';
import Router from '../router';
import SignIn from './auth/signIn';
import Dashboard from './dashboard';
import ProtectedWarning from './auth/protectedWarning';
import SignedOut from './auth/signedOut';
import PageNotFound from './404';
import PlantsList from './plants/plantsList';
import Auth from './auth/auth';
import plantList from '../storage/plantList';

var Admin = {
	update: function(route) {
		//clear el first
		this.el.innerHTML = '';
		if(route === 'signin') {
			this.el.appendChild(this.signIn.el);
		} else if((route === 'dashboard') || (route === '')) {
			Auth.authenticate((authData) => {
				if(authData.id) {
					this.dashboard.el.querySelector('#user').innerHTML = authData.email;
					this.el.appendChild(this.dashboard.el);
				} else {
					Router.push('signin');
				}
			});
		} else if(route === 'signed-out') {
			Auth.signOutUser();
			this.el.appendChild(this.signedOut.el);
		} else if(route === 'plants-list') {
			Auth.authenticate((authData) => {
				if(authData.id) {
					this.el.appendChild(this.plantsList.el);
				} else {
					Router.push('signin');
				}
			});
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
		inst.signedOut = SignedOut.init();
		inst.dashboard = Dashboard.init();
		inst.plantsList = PlantsList.init();

		//init storage items
		plantList.init();

		Router.init(inst.update.bind(inst));

		return inst;
	}
} 

export default Admin;