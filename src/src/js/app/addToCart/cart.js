import Component from '../component';
import Button from '../parts/button';
import { imgName } from '../lib/stringUtils';
import { formatPrice } from '../lib/cartUtils';
import InputPlusMinus from '../parts/inputPlusMinus';
import appStateStore from '../storage/appStateStore';

//config
const env = process.env.NODE_ENV || "development";
var { PLANTS_UPLOADS_PATH, DOMAIN_URL } = require('../config')[env];

var Cart = {
//redirect to ${DOMAIN_URL}/checkout
	submitQuantities: function(e) {
		if (e) {
			e.preventDefault();
		}	
		let formData = new FormData(this.el);
		// [[product_id, quantity]]
		let formDataArray = Array.from(formData);
		let cartClone = JSON.parse(localStorage.getItem('cart'));

		formDataArray.map((formDataItem) => {
			let found = cartClone.find((item) => item.id == formDataItem[0] );
			if (found) {
				found.quantity = formDataItem[1];
			}
		});
		//updated localstorage with the modified values
		//*buildItems gets fired on custom event when localstorage is updated
		localStorage.setItem('cart', JSON.stringify(cartClone));
	},
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
			cart.map((item) => {
				const subtotal = parseInt(item.price) * parseInt(item.quantity);
				total = total + subtotal;
				let inputPlusMinus = InputPlusMinus.init({
					inputName: item.id,
					inputValue: item.quantity,
					maxValue: item.amount_available,
					minValue: 1,
					onChange: this.onQuantityChange.bind(this),
					enableRemove: true,
					onRemove: this.onRemove.bind(this),
				});

				let cartItem = this.createEl(`<div class="cart-item">
					<a class="first" href="${item.plantUrl}"><img src="${PLANTS_UPLOADS_PATH + imgName(item.image, 'small')}"/></a>
					<div class="name"><div><a href="${item.plantUrl}"><h3>${item.commonName}</h3></a><a href="${item.plantUrl}"><h4>${item.botanicalName}</a></h4>${item.productTypeName}: ${item.productTypeVariationName}</div></div>
					<div class="header cart-item mobile"><div class="price">Price</div><div class="quantity">Quantity</div><div class="total">Total</div></div>
					<div class="price">${formatPrice(item.price)}</div>
					<div id="quantity" class="quantity"></div>
					<div class="total">${formatPrice(subtotal)}</div>
					</div>`);
				let quantity = cartItem.querySelector('#quantity');
				quantity.appendChild(inputPlusMinus.el);
				this.cartList.appendChild(cartItem);  
			});
			this.updateTotal(total);
			this.cartList.appendChild(this.checkoutEl);
		}
	},
	onQuantityChange: function() {
		this.submitQuantities();
	},
	onRemove: function (id) {
		let cartClone = JSON.parse(localStorage.getItem('cart'));
		cartClone = cartClone.filter((item) => item.id != id);

		//updated localstorage with the modified values
		//*buildItems gets fired on custom event when localstorage is updated
		localStorage.setItem('cart', JSON.stringify(cartClone));
	},
	onCheckoutClick: function(e) {
		e.preventDefault();
		this.submitQuantities();
		// redirect to checkout page
		window.location.href = `${DOMAIN_URL}/checkout`;
	},
	updateTotal: function(total) {
		this.subtotalEl.innerHTML = formatPrice(total);
	},
	onBrowseClick: function(e) {
		e.preventDefault();
		appStateStore.setData({ showCart: false});
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
			`
			<form>
				<div class="cart">
					<div class="list"></div>
				 </div>
			 </form>
			 `
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
			<div class="cart-checkout">
			<div class="message">Subtotal: <span id="subtotal"></span></div>
				<a id="checkout-button" class="btn btn-primary message">Checkout</a>
			</div>
			`);
		inst.subtotalEl = inst.checkoutEl.querySelector('#subtotal');
		inst.buttonSubmit = inst.checkoutEl.querySelector('#checkout-button');
		inst.buttonSubmit.addEventListener('click', inst.onCheckoutClick.bind(inst));

		//listen for our custom event for local storage updated
		document.addEventListener("localUpdated", inst.localUpdated.bind(inst));

		inst.cart = JSON.parse(localStorage.getItem('cart')) || [];
		inst.buildItems(inst.cart);

		return inst;
	}
}

export default Cart;