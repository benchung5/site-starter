import Component from '../component';
import Modal from '../parts/modal';
import { postNotifyMe } from '../actions/cart';

var NotifyMePopup = {
	open: function(onSignIn) {
		this.modal.open();
	},
	cancel: function() {
		this.modal.close();
	},
	onPostComplete: function() {

	},
	onFormSubmit: function() {
		let formData = new FormData(this.form);
		let formDataArray = Array.from(formData);
		console.log(formDataArray);
		//postNotifyMe(formData, this.onPostComplete.bind(this));
		//this.modal.close();
	},
	init: function(options) {
		var proto = Object.assign({}, this, Component);
		var inst = Object.create(proto);
		// assign the instance constructor to the prototype so 'this' refers to the instance
		proto.constructor = inst;

		inst.data = options.data

		inst.initialize({ 
			el: `
			<div class="notify-me-popup">
				<form class="contact" method="post" action="https://formspree.io/f/xbjpqnve">				
					Email
					<input required class="no-margin" type="text" name="email" maxlength="80" size="30" placeholder="Your Email">
					Message
					<textarea required name="message" maxlength="1000" cols="25" rows="6" placeholder="message">Please notify me when:&#013;${inst.data.currentPlantCommonName} (${inst.data.currentPlantBotanicalName})&#013;${inst.data.productTypeName} (${inst.data.productTypeVariationName})&#013;becomes available.
					</textarea>
					<a id="submit-button" class="button">Submit</a>							
				</form>
			</div>` 
		});

		inst.submitButton = inst.el.querySelector('#submit-button');
		inst.form = inst.el.querySelector('form');
		inst.submitButton.addEventListener('click', inst.onFormSubmit.bind(inst));

		inst.modal = Modal.init({ contentElement: inst.el });

		return inst;
	}
}

export default NotifyMePopup;