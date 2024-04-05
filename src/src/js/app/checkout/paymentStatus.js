import Component from '../component';
import Loader from '../parts/loader';
import { formatPrice } from '../lib/cartUtils';

var PaymentStatus = {
	paymentMessage: async function() {
		let messageEl = null;
		const { paymentIntent } = await this.stripe.retrievePaymentIntent(this.clientSecret);

		switch (paymentIntent.status) {
		case "succeeded":
			const amount = formatPrice(paymentIntent.amount);
			messageEl = this.createEl(`
				<div id="payment-status-message">		    
					<p>
						<b>We appreciate your business!</b><br>
						A confirmation will be sent to your email address.<br>
					</p>
					<p>
						<b>Package will be shipped to:</b><br>
						<span id="customer-name">${paymentIntent.shipping.name}</span><br>
						<span id="line1">${paymentIntent.shipping.address.line1}</span><br>
						${paymentIntent.shipping.address.line2 ? '<span id="line2">'+paymentIntent.shipping.address.line2+'</span><br>' : ''}
						<span id="city">${paymentIntent.shipping.address.city}</span>, <span id="state">${paymentIntent.shipping.address.state}</span><br>
						<span id="postal_code">${paymentIntent.shipping.address.postal_code}</span><br>
					</p>
					<p>
						<b>Details</b><br>
						ID: ${paymentIntent.id}<br>
						Amount: ${amount} CAD
					</p>
					<p>
					If you have any questions, please email us: <a href="mailto:info@naturewithus.com">info@naturewithus.com</a>
					</p>
				</div>
				`);
			break;
		case "processing":
			messageEl = this.createEl(`<p>Your payment is processing.</p>`);
			break;
		case "requires_payment_method":
			messageEl = this.createEl(`Your payment was not successful, please try again.`);
			break;
		default:
			messageEl = this.createEl(`Something went wrong.`);
			break;
		}

		this.el.appendChild(messageEl);

		this.loader.isLoading(false);
	},
	init: function(options) {
		var proto = Object.assign({}, this, Component);
		var inst = Object.create(proto);
		// assign the instance constructor to the prototype so 'this' refers to the instance
		proto.constructor = inst;

		//call initialize on Component first
		inst.initialize({
			el: `<div></div>`
		});

		inst.container = document.querySelector('#message-container')
		inst.loader = Loader.init({
			children: inst.el,
			minHeight: '10rem',
			size: '4rem',
			backgroundColor: '#f4f6f7',
			isInitialPageLoad: true,
		});
		inst.container.appendChild(inst.loader.el);


		inst.stripe = options.stripe ? options.stripe : null;
		inst.message = options.message ? options.message : null;
		inst.clientSecret = options.clientSecret ? options.clientSecret : null;

		inst.paymentMessage();

		return inst;
	}
}

export default PaymentStatus;