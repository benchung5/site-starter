import Component from '../component';
import Modal from '../parts/modal';
import { postNotifyMe } from '../actions/cart';
import FieldInput from '../admin/parts/fieldInput';
import UpdateMessage from '../admin/parts/updateMessage';
import { checkFieldErrors } from '../lib/formUtils';

var NotifyMePopup = {
	formFields: [
		{name: 'email', label: '*Email', type: 'input', error: 'Please enter an email address', condition: 'required', placeholder: '*Your Email'},
		],
	open: function(onSignIn) {
		this.modal.open();
	},
	cancel: function() {
		this.modal.close();
	},
	onPostComplete: function(response) {
		console.log(response);
		this.updateMessage.clear();
		if(response.error) {
			this.updateMessage.renderError(`<span>Error: ${response.error}</span>`);
		} else {
			this.updateMessage.renderSuccess(`Inquiry sent!.`);
			setTimeout(() => {
				this.cancel();
			}, 1000);
		}
	},
	onFormSubmit: function(e) {
		e.preventDefault();

		let hasErrors = checkFieldErrors(this.form, this.formFields);

		if(hasErrors) {
			// this.updateMessage.renderError(`<span>please fill in all required fields</span>`);
		} else {
			let formData = new FormData(this.form);
			// let formDataArray = Array.from(formData);
			// console.log(formDataArray);
			postNotifyMe(formData, this.onPostComplete.bind(this));
			this.updateMessage.clear();
			//this.modal.close();
		}
	},
	init: function(options) {
		var proto = Object.assign({}, this, Component);
		var inst = Object.create(proto);
		// assign the instance constructor to the prototype so 'this' refers to the instance
		proto.constructor = inst;

		inst.data = options.data

		inst.initialize({ 
			el: `
			<div class="notify-me-popup popup-form-wrapper">
				<form class="contact popup-form" method="post" action="https://formspree.io/f/xbjpqnve">	
					<input type="hidden" name="subject" value="Notify Me Inquiry" />			
					<label for="field-message">Message</label>
					<textarea id="field-message" required name="message" maxlength="1000" cols="25" rows="6" placeholder="message">Please notify me when:&#013;${inst.data.currentPlantCommonName} (${inst.data.currentPlantBotanicalName})&#013;${inst.data.productTypeName} (${inst.data.productTypeVariationName})&#013;becomes available.
					</textarea>
					<div id="update-message"></div>
					<button id="submit-button" class="button">Submit</button>							
				</form>
				<div class="close"></div>
			</div>` 
		});

		inst.submitButton = inst.el.querySelector('#submit-button');
		inst.form = inst.el.querySelector('form');
		inst.submitButton.addEventListener('click', inst.onFormSubmit.bind(inst));
		inst.closeButton = inst.el.querySelector('.close');
		inst.closeButton.addEventListener('click', inst.cancel.bind(inst));

		let emailInput = FieldInput.init({
			name: inst.formFields[0].name,
			label: inst.formFields[0].label,
			error: inst.formFields[0].error,
			condition: inst.formFields[0].condition,
			placeholder: inst.formFields[0].placeholder,
		});
		inst.form.prepend(emailInput.el);
		inst.updateMessage = UpdateMessage.init({});
		inst.updateMessageContainer = inst.el.querySelector('#update-message');
		inst.updateMessageContainer.appendChild(inst.updateMessage.el);

		inst.modal = Modal.init({ contentElement: inst.el });

		return inst;
	}
}

export default NotifyMePopup;