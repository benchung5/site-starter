import Component from '../component';
import LoadingButton from '../parts/loadingButton';
import checkoutStore from '../storage/checkoutStore';
const env = process.env.NODE_ENV || "development";
var { SERVER_URL } = require('../config')[env];
import { clone } from '../lib/utils';


var CustomerInfo = {
	linkAuthenticationElementLoaded: function(e) {
		const headerEl = this.createEl(`<h2>Customer Info</h2>`);
		this.el.prepend(headerEl);
		const buttonHolderEl = this.el.querySelector('#button-holder');
		buttonHolderEl.appendChild(this.submitButton.el);
		this.elementLoaded();
	},
	linkAuthenticationElementChanged: function(e) {
		this.setState({ email: e.value.email });
		//localStorage.setItem('email', e.value.email);
	},
	addressElementChanged: function(e) {
		if (e.complete){
      		// Extract potentially complete address
      		if (e.value.address.state == 'BC' || e.value.address.state == 'AB') {
      			this.setState({ address: e.value.address });
      			this.message("");
      			checkoutStore.setData({customerDetailsValid: true});
      		} else {
      			this.message("Sorry, we only ship plants and seeds to BC or Alberta.");
      			checkoutStore.setData({customerDetailsValid: false});
      		}
		} else {
			checkoutStore.setData({customerDetailsValid: false});
		}
	},
	onPickupClick: function(e) {
		if (e.target.checked) {
			this.messageEl.placeholder = "Your pickup details here... Let us know your pickup availability, etc."
			this.messageLabelEl.innerHTML = "Message"
		} else {
			this.messageEl.placeholder = "Anything you'd like us to know...";
			this.messageLabelEl.innerHTML = "Message (optional)";
		}
	},
	onCalculateShippingClick: function(e) {
		e.preventDefault();
 		//todo...calculate shipping and tax and update order summary
 		checkoutStore.setData({ calcShippingLoading: true});

 		let formData = new FormData(this.additionalInfoForm);
 		let additionalInfoArray = Array.from(formData);
 		const address = this.state.address;
 		const email = this.state.email;

 		let message = '';
 		let pickup = '';

 		additionalInfoArray.map((item) => {
 			if (item[0] == 'message') {
 				message = item[1];
 			}
 			if (item[0] == 'pickup') {
 				pickup = item[1];
 			}
 		})

		this.onCalculateShipping({
			pickup: pickup,
			message: message,
			address: address,
			email: email
		});
	},
	calcShippingLoading: function(e) {
		this.submitButton.isLoading(e.detail.calcShippingLoading);
	},
	isEnabled: function (isEnabled) {
		if (isEnabled) {
			this.submitButton.isEnabled(true);
		} else {
			this.submitButton.isEnabled(false);
		}
	},
	checkCustomerDetailsValid: function(e) {
		if (e.detail.customerDetailsValid) {
			this.submitButton.isEnabled(true);
		} else {
			this.submitButton.isEnabled(false);
		}
	},
	checkPaymentProcessing: function (e) {
		if (e.detail.paymentProcessing) {
			this.submitButton.isEnabled(false);
		} else {
			this.submitButton.isEnabled(true);
		}
	},
	init: function(options) {
		var proto = Object.assign({}, this, Component);
		var inst = Object.create(proto);
		// assign the instance constructor to the prototype so 'this' refers to the instance
		proto.constructor = inst;

		inst.message = options.message ? options.message : null;

		//call initialize on Component first
		inst.initialize({
			container: document.querySelector("#customer-info-container"),
			el: 
			`<div class="inner">
				<div id="link-authentication-element">
				  <!-- Stripe.js injects link authentication element-->
				</div>
				<form id="additional-info">
					<input type="checkbox" id="pickup" name="pickup" value="yes">
					<label for="pickup">I want to pick up this order myself</label><br>
					<label id="message-label" for="message">Message (optional)</label>
					<textarea rows="4" id="message" name="message" placeholder="Anything you'd like us to know..."></textarea>
				</form>
				<div id="address-element">
				  <!-- Stripe.js injects address element-->
				</div>
				<div id="button-holder"></div>
			</div>`
		});

		inst.submitButton = LoadingButton.init({
			text: 'Calculate Shipping',
			disabled: true,
			onClick: inst.onCalculateShippingClick.bind(inst)
		});

		inst.additionalInfoForm = inst.el.querySelector('#additional-info');
		inst.pickupEl = inst.el.querySelector('#pickup');
		inst.pickupEl.addEventListener('click', inst.onPickupClick.bind(inst));
		inst.messageEl = inst.el.querySelector('#message');
		inst.messageLabelEl = inst.el.querySelector('#message-label');

		inst.stripe = options.stripe ? options.stripe : null;
		inst.elements = options.elements ? options.elements : null;
		inst.elementLoaded = options.onElementLoaded;

		// linkAuthenticationElement----------
		inst.linkAuthenticationElement = inst.elements.create("linkAuthentication");
		inst.linkAuthenticationElement.mount("#link-authentication-element");
		inst.linkAuthenticationElement.on('change', inst.linkAuthenticationElementChanged.bind(inst));

		// addressElement----------
		const addressElementOptions = {
			mode: 'shipping',
	    // since only one country, country selector is hidden
			allowedCountries: ['CA'],
		};
		inst.addressElement = inst.elements.create('address', addressElementOptions);
		inst.addressElement.mount('#address-element');

		inst.addressElement.on('ready', inst.linkAuthenticationElementLoaded.bind(inst));
		inst.onCalculateShipping = options.onCalculateShipping.bind(inst);
	    //fires a soon a s the form is filled, no submit needed
		inst.addressElement.on('change', inst.addressElementChanged.bind(inst));

		checkoutStore.addListener(inst.calcShippingLoading.bind(inst), 'calcShippingLoading');
		checkoutStore.addListener(inst.checkPaymentProcessing.bind(inst), 'paymentProcessing');
		checkoutStore.addListener(inst.checkCustomerDetailsValid.bind(inst), 'customerDetailsValid');

		return inst;
	}
}

export default CustomerInfo;