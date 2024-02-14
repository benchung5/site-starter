import Component from '../component';
import Button from '../parts/button';
import { imgName } from '../lib/stringUtils';

//config
const env = process.env.NODE_ENV || "development";
var { PLANTS_UPLOADS_PATH } = require('../config')[env];

var Cart = {
	buildItems: function(cart) {
		this.cartList.innerHTML = '';
		cart.map((item) => {
			console.log(item);
			let cartItem = this.createEl(`<div class="cart-item">
				<a class="image" href="${item.plantUrl}"><img src="${PLANTS_UPLOADS_PATH + imgName(item.image, 'small')}"/></a>
				<div class="name"><a href="${item.plantUrl}"><h3>${item.commonName}</h3></a><a href="${item.plantUrl}"><h4>${item.botanicalName}</a></h4>${item.productTypeName}: ${item.productTypeVariationName}</div>
				<div class="price">$${item.price}</div>
				<div class="quantity">${item.quantity}</div>
				<div class="total">$${item.price*item.quantity}</div>
				</div>`);
			this.cartList.appendChild(cartItem);  
		});
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
			el: 
			`<div class="cart">
				<div class="list">shopping cart list</div>
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

export default Cart;