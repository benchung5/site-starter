import Component from '../component';
import LoadingButton from '../parts/loadingButton';
import Loader from '../parts/loader';
import checkoutStore from '../storage/checkoutStore';
const env = process.env.NODE_ENV || "development";
var { SERVER_URL } = require('../config')[env];
import { clone } from '../lib/utils';


var CustomerInfo = {
	linkAuthenticationElementLoaded: function(e) {
		this.loader.isLoading(false);
	},
	linkAuthenticationElementChanged: function(e) {
		if (e.value.email) {
			this.setState({ email: e.value.email });
		} else {
			this.setState({ email: null });
		}
		
		this.checkAllComplete();
	},
	addressElementChanged: function(e) {
		let cart = JSON.parse(localStorage.getItem('cart')) || [];
		if (e.complete) {
			this.checkAddress(e.value.address);
		} else {
			this.setState({ address: null });
		}

		this.checkAllComplete(); 
	},
	checkAllComplete: function() {
		if (this.state.address && this.state.email) {
			checkoutStore.setData({customerDetailsValid: true});
			this.calculateButton.isEnabled(true);
			this.message("");
		} else {
			checkoutStore.setData({customerDetailsValid: false});
			this.calculateButton.isEnabled(false);
		}

		if (this.state.address && (!this.state.email)) {
			this.message("Please enter an email address");
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
	checkAddress: function(address) {
		// if plants are in order, just allow shipping to BC or Alberta
  		let cart = JSON.parse(localStorage.getItem('cart')) || [];
  		let isPlantOrder = false;
  		cart.map((item) => {
  		    if(item.productTypeName == 'Plants') {
  		      isPlantOrder = true;
  		    }
  		});

  		if(isPlantOrder) {
  			// Extract potentially complete address
  			if (address.state == 'BC' || address.state == 'AB') {
  				this.setState({ address: address });
  				return true;
  			} else {
  				this.message("Sorry, we only ship plants to BC or Alberta");
  				this.setState({ address: null });
  				return false;
  			}
  		} else {
  			this.setState({ address: address });
  			return true;
  		}
	},
	onCalculateShippingClick: function(e) {
		e.preventDefault();
		let isValidAddress = this.checkAddress(this.state.address);
		if(isValidAddress) {
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

			this.detach();

			this.onCalculateShipping({
				pickup: pickup,
				message: message,
				address: address,
				email: email
			});
		}
	},
	calcShippingLoading: function(e) {
		// this.calculateButton.isLoading(e.detail.calcShippingLoading);
	},
	isEnabled: function (isEnabled) {
		if (isEnabled) {
			this.calculateButton.isEnabled(true);
		} else {
			this.calculateButton.isEnabled(false);
		}
	},
	detach: function() {
		// this.linkAuthenticationElement.unmount();
		// this.addressElement.unmount();
		// this.calculateButton.isEnabled(false);
		this.customerInfoContainer.style.display = "none";
	},
	reAttach: function() {
		// this.linkAuthenticationElement.mount('#link-authentication-element');
		// this.addressElement.mount('#address-element');
		// this.calculateButton.isEnabled(true);
		this.customerInfoContainer.style.display = "block";
	},
	init: function(options) {
		var proto = Object.assign({}, this, Component);
		var inst = Object.create(proto);
		// assign the instance constructor to the prototype so 'this' refers to the instance
		proto.constructor = inst;

		inst.message = options.message ? options.message : null;

		//call initialize on Component first
		inst.initialize({
			el: 
			`<div class="inner">
				<h2>Customer Info</h2>
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
				<div id="calculate-button-holder"></div>
			</div>`
		});

		inst.customerInfoContainer = document.querySelector("#customer-info-container");

		//insert into loader, then insert that into the page container
		inst.loader = Loader.init({
		  children: inst.el,
		  minHeight: '10rem',
		  size: '4rem',
		  backgroundColor: '#f4f6f7',
		  isInitialPageLoad: true,
		});
		inst.loader.isLoading(true);
		inst.customerInfoContainer.prepend(inst.loader.el);
		
		inst.calculateButton = LoadingButton.init({
			text: 'Update Total',
			disabled: true,
			onClick: inst.onCalculateShippingClick.bind(inst)
		});
		const buttonHolderEl = inst.el.querySelector('#calculate-button-holder');
		buttonHolderEl.appendChild(inst.calculateButton.el);

		inst.additionalInfoForm = inst.el.querySelector('#additional-info');
		inst.pickupEl = inst.el.querySelector('#pickup');
		inst.pickupEl.addEventListener('click', inst.onPickupClick.bind(inst));
		inst.messageEl = inst.el.querySelector('#message');
		inst.messageLabelEl = inst.el.querySelector('#message-label');

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

		checkoutStore.addListener(inst.calcShippingLoading.bind(inst), 'calcShippingLoading');

		return inst;
	}
}

export default CustomerInfo;