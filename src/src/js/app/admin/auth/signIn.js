import Component from '../../component';
import FieldInput from '../parts/fieldInput';
import { signInUser } from '../../actions/users';
import Router from '../../router';
//config
var { ADMIN_URL } = require('../../config')['globals'];

var Signin = {
	fields: [
			{name: 'email', label: 'Email', error: 'Please enter an email', condition: 'required'},
			{name: 'password', label: 'Password', error: 'Please enter an password', condition: 'required'},
			{name: 'key', label: 'Key', error: 'Please enter a key', condition: 'required'},
		],
	submitForm(e) {
		//prevent form from refreshing the page
		e.preventDefault();
		let formData = new FormData(e.target);

		const email = formData.get('email');
		const password = formData.get('password');
		const key = formData.get('key');

		signInUser({email, password, key},
		(apiData) => {
			if(apiData.token) {
				// - Save the JWT token
				window.localStorage.setItem('token', apiData.token);
				// clear error
				document.querySelector('.alert').innerHTML = '';
				// navigate to new page
				Router.push('dashboard');
			} else {
				const errorMessage = this.createEl(
					`<div><strong>Oops!</strong> ${apiData.error || apiData}</div>`
					);
				document.querySelector('.alert').appendChild(errorMessage);
			}
		});
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
	            <div class="columns small-12">
	               <h1 class="margin-bottom">Login:</h1>
	               <form>
	               	<div id="form-fields">
	               	</div>
	               	<button action="submit" class="btn btn-primary">Sign in</button>
	               </form>
	               <div class="alert alert-danger"></div>
	            </div>
	         </div>
	      </div>`
		});

		inst.formFields = inst.el.querySelector('#form-fields');
		inst.form = inst.el.querySelector('form');
		inst.form.addEventListener('submit', inst.submitForm.bind(inst));

		inst.fields.map((item, key) => {
			let input = FieldInput.init({
				name: item.name,
				label: item.label,
				error: item.error,
				condition: item.condition,
			});

			inst.formFields.appendChild(input.el);
		});

		return inst;
	}
}

export default Signin;