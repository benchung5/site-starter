import Component from '../../component';
import FieldInput from '../parts/fieldInput';
import { signInUser } from '../../actions/users';
import Router from '../../router';
//config
const env = process.env.NODE_ENV || "development";
var { SERVER_URL } = require('../../config')[env];
var { ADMIN_URL } = require('../../config')['globals'];

var Signin = {
	fields: [
			{name: 'email', label: 'Email'},
			{name: 'password', label: 'Password'},
			{name: 'key', label: 'Key'},
		],
	errors: [
			{error: 'Please enter an email', condition: 'required'},
			{error: 'Please enter an password', condition: 'required'},
			{error: 'Please enter a key', condition: 'required'},
		],
	submitForm(e) {
		//prevent form from refreshing the page
		e.preventDefault();
		let formData = new FormData(e.target);

		const email = formData.get('email');
		const password = formData.get('password');
		const key = formData.get('key');

		signInUser(`${SERVER_URL}/users/sign_in`, {email, password, key},
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
	build: function() {
		this.fields.map((item, key) => {
			let input = FieldInput.init({
				name: item.name,
				label: item.label,
				error: this.errors[key].error,
				condition: this.errors[key].condition,
			});

			this.form.appendChild(input.el);
		});
		let submit = this.createEl(`<button action="submit" class="btn btn-primary">Sign in</button>`);
		this.form.appendChild(submit);
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
	               </form>
	               <div class="alert alert-danger"></div>
	            </div>
	         </div>
	      </div>`
		});

		inst.form = inst.el.querySelector('form');
		inst.form.addEventListener('submit', inst.submitForm.bind(inst));

		inst.build();

		return inst;
	}
}

export default Signin;