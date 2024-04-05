import Component from '../component';
import { toggleClass } from '../lib/utils';
import LoadingButton from '../parts/loadingButton';
import checkoutStore from '../storage/checkoutStore';
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
		if (e.complete) {
			this.setState({paymentInfoValid: true});
		} else {
			this.setState({paymentInfoValid: false});
		}
		this.checkReadyToSubmit();
	},
	onPaymentFormSubmit: async function(e) {
		e.preventDefault();
		// this.submitButton.isLoading(true);
		checkoutStore.setData({paymentProcessing: true});

		// const {error, confirmationToken} = await stripe.createConfirmationToken({
		// 	elements: this.elements,
		// 	return_url: `${DOMAIN_URL}/checkout`,
		// });

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

		//only see this if there's an error anyways
		// this.submitButton.isLoading(false);
	},
	checkCustomerDetailsValid: function(e) {
		// if (e.detail.customerDetailsValid && this.state.paymentInfoValid && !checkoutStore.storageData.customerDetailsUpdating) {
		// 	this.submitButton.isEnabled(true);
		// } else {
		// 	this.submitButton.isEnabled(false);
		// }
	},
	checkReadyToSubmit: function() {
		if (checkoutStore.storageData.customerDetailsValid && this.state.paymentInfoValid && !checkoutStore.storageData.customerDetailsUpdating) {
			this.submitButton.isEnabled(true);
		} else {
			this.submitButton.isEnabled(false);
		}
	},
	checkPaymentProcessing: function (e) {
		if (e.detail.paymentProcessing) {
			this.submitButton.isLoading(true);
		} else {
			this.submitButton.isLoading(false);
		}
	},
	isEnabled: function(isEnabled) {
		if (isEnabled) {
			this.submitButton.isEnabled(true);
		} else {
			this.submitButton.isEnabled(false);
		}
	},
	init: function(options) {
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
			  <div id="button-holder" class="pay-now"></div>
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

		checkoutStore.addListener(inst.checkPaymentProcessing.bind(inst), 'paymentProcessing');
		checkoutStore.addListener(inst.checkReadyToSubmit.bind(inst), 'customerDetailsValid');
		checkoutStore.addListener(inst.checkReadyToSubmit.bind(inst), 'customerDetailsUpdating');


		return inst;
	}
}

export default Payment;