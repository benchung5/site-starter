import Component from '../../component';
import Modal from '../../parts/modal';
import LoginForm from './loginForm';

var SignInPopup = {
	open: function(onSignIn) {
		this.modal.open();
		this.onSignIn = onSignIn;
	},
	// cancel: function() {
	// 	this.modal.close();
	// 	this.callback(false);
	// },
	onSignIn: function() {
		this.modal.close();
		this.onSignIn();
	},
	init: function() {
		var proto = Object.assign({}, this, Component);
		var inst = Object.create(proto);
		// assign the instance constructor to the prototype so 'this' refers to the instance
		proto.constructor = inst;

		inst.initialize({ el: `<div class="sign-in-popup"></div>` });

		inst.loginForm = LoginForm.init({ onSignIn: inst.onSignIn.bind(inst) });
		inst.el.appendChild(inst.loginForm.el);
		inst.modal = Modal.init({ contentElement: inst.el });

		return inst;
	}
}

export default SignInPopup;