import Component from '../component';
import { toggleClass } from '../lib/utils';
const env = process.env.NODE_ENV || "development";
var { DOMAIN_URL } = require('../config')[env];

var Payment = {
	onPaymentFormSubmit: async function(e) {
		e.preventDefault();
		this.setLoading(true);

		const { error } = await this.stripe.confirmPayment({
			elements: this.elements,
			confirmParams: {
		    // payment completion page
				return_url: `${DOMAIN_URL}/checkout`,
			},
		});

		// This point will only be reached if there is an immediate error when
		// confirming the payment. Otherwise, your customer will be redirected to
		// your `return_url`. For some payment methods like iDEAL, your customer will
		// be redirected to an intermediate site first to authorize the payment, then
		// redirected to the `return_url`.
		if (error.type === "card_error" || error.type === "validation_error") {
			this.message(error.message);
		} else {
			this.message("An unexpected error occurred.");
		}

		this.setLoading(false);
	},
	setLoading: function(isLoading) {
		if (isLoading) {
	    // Disable the button and show a spinner
			this.submitButton.disabled = true;
			toggleClass(this.submitButton, 'button--loading');
		} else {
			this.submitButton.disabled = false;
			toggleClass(this.submitButton, 'button--loading');
		}
	},
	init: async function(options) {
		var proto = Object.assign({}, this, Component);
		var inst = Object.create(proto);
		// assign the instance constructor to the prototype so 'this' refers to the instance
		proto.constructor = inst;

		  // cancel if payment element is already initiated
		if(inst.paymentElement) {
		    // paymentElement.update({business: {name: 'Stripe Shop'}});
		    // or 
		    // paymentElement.update();
			return;
		}

		// //call initialize on Component first
		// inst.initialize({
		// 	el: 
		// 	`<button style="cursor: pointer; display: block;"></button>`
		// });

		inst.stripe = options.stripe ? options.stripe : null;
		inst.elements = options.elements ? options.elements : null;
		inst.message = options.message ? options.message : null;

		const paymentElementOptions = {
			business: {name: 'Nature With Us'},
			layout: "tabs",
		};

		inst.paymentElement = inst.elements.create("payment", paymentElementOptions);
		inst.paymentElement.mount("#payment-element");

		// for spinner on payment submission
		inst.submitButton = document.querySelector("#submit");

		document.querySelector("#payment-form").addEventListener("submit", inst.onPaymentFormSubmit.bind(inst));

		return inst;
	}
}

export default Payment;