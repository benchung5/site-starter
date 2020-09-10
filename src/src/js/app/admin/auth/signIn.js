import Component from '../../component';
import LoginForm from './loginForm';
import Router from '../../router';
//config
var { ADMIN_URL } = require('../../config')['globals'];

var Signin = {
	onSignIn: function() {
		// navigate to new dashboard
		Router.push('dashboard');
	},
	init: function() {
		var proto = Object.assign({}, this, Component)
		var inst = Object.create(proto);
		// assign the instance constructor to the prototype so 'this' refers to the instance
		proto.constructor = inst;

		//call initialize on Component first
		inst.initialize({ el: 
		`<div class="admin-main">
	         <div class="row">
	            <div id="login-form-wrapper" class="columns small-12">

	            </div>
	         </div>
	      </div>`
		});

		inst.loginForm = LoginForm.init({ onSignIn: inst.onSignIn.bind(inst) });
		inst.el.querySelector('#login-form-wrapper').appendChild(inst.loginForm.el);



		return inst;
	}
}

export default Signin;