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
			let empty = this.createEl(`
				<div class="cart-empty">
					<div class="message">Your cart is currently empty.</div>
				</div>
				`);
			this.cartList.appendChild(empty);
		} else {
			cart.map((item) => {
				let cartItem = this.createEl(`<div class="cart-item">
					<a class="image" href="${item.plantUrl}"><img src="${PLANTS_UPLOADS_PATH + imgName(item.image, 'small')}"/></a>
					<div class="name"><div><a href="${item.plantUrl}"><h3>${item.commonName}</h3></a><a href="${item.plantUrl}"><h4>${item.botanicalName}</a></h4>${item.productTypeName}: ${item.productTypeVariationName}</div></div>
					<div class="price">$${item.price}</div>
					<div class="quantity">${item.quantity}</div>
					<div class="total">$${item.price*item.quantity}</div>
					</div>`);
				let quantity = cartItem.querySelector('.quantity');
				this.cartList.appendChild(cartItem);  
			});
		}
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

		//listen for our custom event for local storage updated
		document.addEventListener("localUpdated", inst.localUpdated.bind(inst));

		inst.cart = JSON.parse(localStorage.getItem('cart')) || [];
		inst.buildItems(inst.cart);

		return inst;
	}
}

export default OrderSummary;