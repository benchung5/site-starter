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
	build: function() {
		this.customerInfoEl.innerHTML = this.customerInfo;
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
			onClick: inst.onButtonClick.bind(inst)
		});
		const buttonHolderEl = inst.el.querySelector('#submit-button-holder');
		buttonHolderEl.appendChild(inst.submitButton.el);

		inst.build();

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