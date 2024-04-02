import Component from '../component';
import LoadingButton from '../parts/loadingButton';

var ProceedPayment = {
	onProceedPaymentClick: function(e) {
		e.preventDefault();
		this.onProceedClick();
	},
	detach: function() {
		this.proceedButton.isEnabled(false);
	},
	reAttach: function() {
		this.proceedButton.isEnabled(true);
	},
	init: function(options) {
		var proto = Object.assign({}, this, Component);
		var inst = Object.create(proto);
		// assign the instance constructor to the prototype so 'this' refers to the instance
		proto.constructor = inst;

		inst.onProceedClick = options.onProceedClick;

		inst.proceedButton = LoadingButton.init({
			text: 'Proceed To Payment',
			disabled: false,
			onClick: inst.onProceedPaymentClick.bind(inst)
		});

		inst.initialize({
			container: document.querySelector('#proceed-payment-container'),
			el: 
			`<div id="proceed-payment">
					<div id="totals-holder"></div>
					<div id="proceed-button-holder"></div>
			</div>`
		});

		const proceedButtonHolderEl = inst.el.querySelector('#proceed-button-holder');
		proceedButtonHolderEl.appendChild(inst.proceedButton.el);

		return inst;
	}
}

export default ProceedPayment;