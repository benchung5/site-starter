import Component from '../component';
import { imgName } from '../lib/stringUtils';
// import appStateStore from '../storage/appStateStore';

//config
const env = process.env.NODE_ENV || "development";
var { PLANTS_UPLOADS_PATH } = require('../config')[env];

var OrderSummary = {
	buildItems: function(cart) {
		this.cartList.innerHTML = '';
		if(cart.length == 0) {
			this.cartList.appendChild(this.cartEmptyEl);
		} else {
			let header = this.createEl(`<div class="header cart-item">
					<div class="first">Photo</div>
					<div class="name">Name</div>
					<div class="price">Price</div>
					<div class="quantity">Quantity</div>
					<div class="total">Total</div>
				</div>`);
			this.cartList.prepend(header);
			let total = 0;
			let count = 0
			cart.map((item) => {
				const subtotal = parseInt(item.price) * parseInt(item.quantity);
				total = total + subtotal;
				count = count + parseInt(item.quantity);
				let cartItem = this.createEl(`<div class="cart-item">
					<a class="first" href="${item.plantUrl}"><img src="${PLANTS_UPLOADS_PATH + imgName(item.image, 'small')}"/></a>
					<div class="name"><div><a href="${item.plantUrl}"><h3>${item.commonName}</h3></a><a href="${item.plantUrl}"><h4>${item.botanicalName}</a></h4>${item.productTypeName}: ${item.productTypeVariationName}</div></div>
					<div class="header cart-item mobile"><div class="price">Price</div><div class="quantity">Quantity</div><div class="total">Total</div></div>
					<div class="price">$${item.price}</div>
					<div class="quantity">${item.quantity}</div>
					<div class="total">$${subtotal}</div>
					</div>`);
				let quantity = cartItem.querySelector('.quantity');
				this.cartList.appendChild(cartItem);  
			});
			this.subtotalEl.innerHTML = total;
			this.subtotalItemCountEl.innerHTML = count;

			this.cartList.appendChild(this.checkoutEl);
		}
	},
	onBrowseClick: function(e) {
		e.preventDefault();
		appStateStore.setData({ showMenu: 'close'});
	},
	localUpdated: function(e) {
		let val = JSON.parse(e.value);
		this.buildItems(val);
	},
	init: function(options) {
		var proto = Object.assign({}, this, Component);
		var inst = Object.create(proto);
		// assign the instance constructor to the prototype so 'this' refers to the instance
		proto.constructor = inst;


		//call initialize on Component first
		inst.initialize({
			container: document.querySelector('#order-summary-container'),
			el: 
			`<div class="cart order-summary">
				<h2>Order Summary</h2>
				<div class="list"></div>
			 </div>`
		});

		inst.cartList = inst.el.querySelector('.list');

		inst.cartEmptyEl = inst.createEl(`
			<div class="cart-empty">
				<span class="message">Your cart is currently empty.</span>
				<button class="btn btn-primary">Continue Browsing</button>
			</div>
			`);
		inst.buttonContinueBrowsing = inst.cartEmptyEl.querySelector('button');
		inst.buttonContinueBrowsing.addEventListener('click', inst.onBrowseClick.bind(inst));

		inst.checkoutEl = inst.createEl(`
			<div class="footer">
				<div class="subtotal cart-item">
					<div class="first">Subtotal (<span id="subtotal-item-count"></span> items)</div>
					<div class="total">$<span id="subtotal"></span></div>
				</div>
				<div class="cart-item">
					<div class="first">Shipping</div>
					<div class="total"><span id="shipping">${inst.shippingCost ? ('$'+inst.shippingCost) : 'TBD'}</span></div>
				</div>
				<div class="cart-item">
					<div class="first">Tax</div>
					<div class="total"><span id="tax">${inst.taxCost ? ('$'+inst.taxCost) : 'TBD'}</span></div>
				</div>
				<div class="cart-item grand-total">
					<div class="first">Total</div>
					<div class="total"><span id="tax">${inst.grandTotal ? ('$'+inst.grandTotal) : 'TBD'}</span></div>
				</div>
			</div>
			`);
		inst.subtotalEl = inst.checkoutEl.querySelector('#subtotal');
		inst.subtotalItemCountEl = inst.checkoutEl.querySelector('#subtotal-item-count');

		//listen for our custom event for local storage updated
		document.addEventListener("localUpdated", inst.localUpdated.bind(inst));

		inst.cart = JSON.parse(localStorage.getItem('cart')) || [];
		inst.buildItems(inst.cart);

		return inst;
	}
}

export default OrderSummary;