import Component from '../component';
import Loader from '../parts/loader';
import appStateStore from '../storage/appStateStore';
const env = process.env.NODE_ENV || "development";
var { SERVER_URL } = require('../config')[env];

var CustomerInfo = {
	linkAuthenticationElementLoaded: function(e) {
		appStateStore.setData({ isLoading: false});
		const headerEl = this.createEl(`<h2>Customer Info</h2>`);
		this.el.prepend(headerEl);
	},
	linkAuthenticationElementChanged: function(event) {
		const email = event.value.email;
		localStorage.setItem('customerEmail', email);
	},
	addressElementChanged: function(event) {
		if (event.complete){
      		// Extract potentially complete address
			const address = event.value.address;
     		 //todo...calculate shipping and tax and update order summary
			console.log(address);
			this.onAddressComplete();
		}
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
			</div>`
		});

	  	//insert into loader, then insert that into the page container
		let loader = Loader.init({
			children: inst.el,
			minHeight: '10rem',
	    // isInitialPageLoad: true,
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
		inst.onAddressComplete = options.onAddressComplete.bind(inst);
	    //fires a soon a s the form is filled, no submit needed
		inst.addressElement.on('change', inst.addressElementChanged.bind(inst));

		return inst;
	}
}

export default CustomerInfo;