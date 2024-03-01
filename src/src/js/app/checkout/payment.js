import Component from '../component';
import { toggleClass } from '../lib/utils';
import LoadingButton from '../parts/loadingButton';
const env = process.env.NODE_ENV || "development";
var { DOMAIN_URL } = require('../config')[env];

var Payment = {
	onPaymentFormLoaded: function(e) {
		const headerEl = this.createEl(`<h2>Payment</h2>`);
		this.el.prepend(headerEl);
		const buttonHolderEl = this.el.querySelector('#button-holder');
		buttonHolderEl.appendChild(this.submitButton.el);
	},
	onPaymentFormChanged: function(e) {
		if (e.complete){
			this.submitButton.isEnabled(true);
		}
	},
	onPaymentFormSubmit: async function(e) {
		e.preventDefault();
		this.submitButton.isLoading(true);

		const { error } = await this.stripe.confirmPayment({
			elements: this.elements,
			confirmParams: {
		    // redirect to payment completion page
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

		this.submitButton.isLoading(false);
	},
	init: async function(options) {
		var proto = Object.assign({}, this, Component);
		var inst = Object.create(proto);
		// assign the instance constructor to the prototype so 'this' refers to the instance
		proto.constructor = inst;

		inst.stripe = options.stripe ? options.stripe : null;
		inst.elements = options.elements ? options.elements : null;
		inst.message = options.message ? options.message : null;

		//call initialize on Component first
		inst.initialize({
			container: document.querySelector('#payment-container'),
			el: 
			`<form id="payment-form">
			  <div id="payment-element">
			    <!--Stripe.js injects the Payment Element-->
			  </div>
			  <div id="button-holder"></div>
			  <div id="payment-message" class="hidden"></div>
			</form>`
		});

		inst.submitButton = LoadingButton.init({
			text: 'Pay Now',
			disabled: true,
		});


		inst.el.addEventListener("submit", inst.onPaymentFormSubmit.bind(inst));

		const paymentElementOptions = {
			business: {name: 'Nature With Us'},
			layout: "tabs",
		};

		inst.paymentElement = inst.elements.create("payment", paymentElementOptions);
		inst.paymentElement.mount("#payment-element");
		inst.paymentElement.on('ready', inst.onPaymentFormLoaded.bind(inst));
		inst.paymentElement.on('change', inst.onPaymentFormChanged.bind(inst));

		return inst;
	}
}

export default Payment;