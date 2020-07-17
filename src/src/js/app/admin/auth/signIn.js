import Component from '../../component';
import FieldInput from '../parts/fieldInput';

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
	build: function() {
		let form = this.el.querySelector('form');
		this.fields.map((item, key) => {
			let input = FieldInput.init({
				name: item.name,
				label: item.label,
				error: this.errors[key].error,
				condition: this.errors[key].condition,
			});
			form.appendChild(input.el);
		});
		let submit = this.createEl(`<button action="submit" class="btn btn-primary">Sign in</button>`);
		form.appendChild(submit);
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
	            </div>
	         </div>
	      </div>`
		});

		inst.build();

		return inst;
	}
}

export default Signin;