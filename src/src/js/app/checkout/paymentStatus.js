import Component from '../component';

var PaymentStatus = {
	onPaymentSuccess: function(paymentIntent) {
	  //todo... save transaction data to database
	  // paymentIntent.id...
	  this.customerEmailEl.textContent = localStorage.getItem('customerEmail');
	  this.customerNameEl.textContent = paymentIntent.shipping.name;
	  this.shippingLineOne.textContent = paymentIntent.shipping.address.line1;
	  this.shippingLineTwo.textContent = paymentIntent.shipping.address.line2;
	  this.shippingCity.textContent = paymentIntent.shipping.address.city;
	  this.shippingProvince.textContent = paymentIntent.shipping.address.state;
	  this.shippingPostalCode.textContent = paymentIntent.shipping.address.postal_code;
	  this.messageContainer.classList.remove("hidden");
	},
	init: async function(options) {
		var proto = Object.assign({}, this, Component);
		var inst = Object.create(proto);
		// assign the instance constructor to the prototype so 'this' refers to the instance
		proto.constructor = inst;

		// //call initialize on Component first
		// inst.initialize({
		// 	el: 
		// 	`<button style="cursor: pointer; display: block;"></button>`
		// });

		inst.messageContainer = document.querySelector("#success");
		inst.customerEmailEl = document.getElementById('customer-email');
		inst.customerNameEl = document.getElementById('customer-name');
		inst.shippingLineOne = document.getElementById('line1');
		inst.shippingLineTwo = document.getElementById('line2');
		inst.shippingCity = document.getElementById('city');
		inst.shippingProvince = document.getElementById('state');
		inst.shippingPostalCode = document.getElementById('postal_code');

		inst.stripe = options.stripe ? options.stripe : null;
		inst.message = options.message ? options.message : null;

		const { paymentIntent } = await inst.stripe.retrievePaymentIntent(options.clientSecret);
		switch (paymentIntent.status) {
		case "succeeded":
		  inst.onPaymentSuccess(paymentIntent);
		  break;
		case "processing":
		  inst.message("Your payment is processing.");
		  break;
		case "requires_payment_method":
		  inst.message("Your payment was not successful, please try again.");
		  break;
		default:
		  inst.message("Something went wrong.");
		  break;
		}

		return inst;
	}
}

export default PaymentStatus;