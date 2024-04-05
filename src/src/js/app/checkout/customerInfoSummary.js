import Component from '../component';
import Loader from '../parts/loader';
import checkoutStore from '../storage/checkoutStore';
import LoadingButton from '../parts/loadingButton';

var CustomerInfoSummary = {
	detach: function() {
		this.container.style.display = "none";
	},
	reAttach: function() {
		this.container.style.display = "block";
	},
	onButtonClick: function(e) {
		e.preventDefault();
		this.onButtonClick();
	},
	update: function(info) {
		this.customerInfoEl.innerHTML = '';
		this.customerInfoEl.innerHTML = `<p>
		<b>Email:</b><br>
			<span id="customer-email">${info.email}</span><br>
		</p>
		<p>
			<b>Address:</b><br>
			<span id="line1">${info.address.line1}</span><br>
			${info.address.line2 ? '<span id="line2">'+info.address.line2+'</span><br>' : ''}
			<span id="city">${info.address.city}</span>, <span id="state">${info.address.state}</span><br>
			<span id="postal_code">${info.address.postal_code}</span><br>
		</p>`;

		if (info.pickup) {
			const pickupEl = this.createEl(`<p><b>Pickup:</b><br>${info.pickup}</p>`);
			this.customerInfoEl.appendChild(pickupEl);
		}

		if (info.message) {
			const messageEl = this.createEl(`<p><b>Message:</b><br>${info.message}</p>`);
			this.customerInfoEl.appendChild(messageEl);
		}
	},
	checkPaymentProcessing: function(e) {
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

		inst.customerInfo = options.customerInfo;
		inst.onButtonClick = options.onButtonClick;

		//call initialize on Component first
		inst.initialize({
			el: 
			`<div id="info-summary">
				<h2>Customer Info</h2>
				<div id="customer-info"></div>
				<div id="submit-button-holder"></div>
			</div>`
		});

		inst.customerInfoEl = inst.el.querySelector('#customer-info');

		inst.submitButton = LoadingButton.init({
			text: 'Change Customer Info',
			disabled: false,
			onClick: inst.onButtonClick.bind(inst),
			style: 'btn-secondary',
		});
		const buttonHolderEl = inst.el.querySelector('#submit-button-holder');
		buttonHolderEl.appendChild(inst.submitButton.el);

		inst.update(inst.customerInfo);

		inst.container = document.querySelector("#info-summary-container");

		//insert into loader, then insert that into the page container
		inst.loader = Loader.init({
		  children: inst.el,
		  minHeight: '10rem',
		  size: '4rem',
		  backgroundColor: '#f4f6f7',
		  isInitialPageLoad: true,
		});
		inst.container.prepend(inst.loader.el);
		inst.loader.isLoading(false);

		checkoutStore.addListener(inst.checkPaymentProcessing.bind(inst), 'paymentProcessing');

		return inst;
	}
}

export default CustomerInfoSummary;