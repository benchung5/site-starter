import Component from '../component';
import Loader from '../parts/loader';
import appStateStore from '../storage/appStateStore';
import LoadingButton from '../parts/loadingButton';
const env = process.env.NODE_ENV || "development";
var { SERVER_URL } = require('../config')[env];


var CustomerInfo = {
	linkAuthenticationElementLoaded: function(e) {
		appStateStore.setData({ isLoading: false});
		const headerEl = this.createEl(`<h2>Customer Info</h2>`);
		this.el.prepend(headerEl);
		const buttonHolderEl = this.el.querySelector('#button-holder');
		buttonHolderEl.appendChild(this.submitButton.el);
	},
	linkAuthenticationElementChanged: function(e) {
		const email = e.value.email;
		localStorage.setItem('customerEmail', email);
	},
	addressElementChanged: function(e) {
		if (e.complete){
      		// Extract potentially complete address
			this.setState({ address: e.value.address });
			this.submitButton.isEnabled(true);
		}
	},
	onCalculateShippingClick: function(e) {
		e.preventDefault();
 		//todo...calculate shipping and tax and update order summary
 		this.submitButton.isLoading(true);
		this.onCalculateShipping();
	},
	init: async function(options) {
		var proto = Object.assign({}, this, Component);
		var inst = Object.create(proto);
		// assign the instance constructor to the prototype so 'this' refers to the instance
		proto.constructor = inst;

		//call initialize on Component first
		inst.initialize({
			el: 
			`<div class="inner">
				<div id="link-authentication-element">
				  <!-- Stripe.js injects link authentication element-->
				</div>
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

	  	//insert into loader, then insert that into the page container
		let loader = Loader.init({
			children: inst.el,
			minHeight: '10rem',
			size: '4rem',
			backgroundColor: '#f4f6f7'
		});
		let container = document.querySelector("#customer-info-container");
		container.appendChild(loader.el);
		appStateStore.setData({ isLoading: true});

		inst.stripe = options.stripe ? options.stripe : null;
		inst.elements = options.elements ? options.elements : null;

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

		return inst;
	}
}

export default CustomerInfo;