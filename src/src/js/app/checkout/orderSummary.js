import Component from '../component';
import { imgName } from '../lib/stringUtils';
import checkoutStore from '../storage/checkoutStore';
import Loader from '../parts/loader';
//config
const env = process.env.NODE_ENV || "development";
var { PLANTS_UPLOADS_PATH, DOMAIN_URL } = require('../config')[env];

var OrderSummary = {
	buildItems: function(cart) {
		this.cartList.innerHTML = '';
		if(!cart || cart.length == 0) {
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
			this.totalEl.innerHTML = total;
			this.setState({ total: total });

			this.cartList.appendChild(this.loaderForFooter.el);
		}
	},
	updateShippingAndTax: function (shipping, tax) {
		this.taxEl.innerHTML = tax;
		this.totalEl.innerHTML = this.state.total + shipping + tax;
		// do this last to avoid casting issues
		if (shipping == 0) {
			shipping = 'FREE';
		}
		this.shippingEl.innerHTML = shipping;
		this.beforeShippingTaxMessage.style.visibility = 'hidden';
	},
	onBrowseClick: function(e) {
		e.preventDefault();
		// redirect to catalogue page
		window.location.href = `${DOMAIN_URL}/plants`;
	},
	localUpdated: function(e) {
		let val = JSON.parse(e.value);
		this.buildItems(val);
	},
	calcShippingLoading: function(e) {
		this.loaderForFooter.isLoading(e.detail.calcShippingLoading);
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

		inst.cart = options.cart || JSON.parse(localStorage.getItem('cart'));

		inst.footerEl = inst.createEl(`
			<div class="footer">
				<div class="subtotal cart-item">
					<div class="first">Subtotal (<span id="subtotal-item-count"></span> items)</div>
					<div class="total">$<span id="subtotal"></span></div>
				</div>
				<div class="cart-item">
					<div class="first">Shipping</div>
					<div class="total"><span id="shipping">TBD</span></div>
				</div>
				<div class="cart-item">
					<div class="first">Tax</div>
					<div class="total"><span id="tax">TBD</span></div>
				</div>
				<div class="cart-item grand-total">
					<div class="first">Total&nbsp;<span id="before-shipping-and-tax" class="small-text">(before shipping and tax)</span></div>
					<div class="total">$<span id="grand-total"></span></div>
				</div>
			</div>
			`);
		inst.subtotalEl = inst.footerEl.querySelector('#subtotal');
		inst.subtotalItemCountEl = inst.footerEl.querySelector('#subtotal-item-count');
		inst.taxEl = inst.footerEl.querySelector('#tax');
		inst.shippingEl = inst.footerEl.querySelector('#shipping');
		inst.totalEl = inst.footerEl.querySelector('#grand-total');
		inst.beforeShippingTaxMessage = inst.footerEl.querySelector('#before-shipping-and-tax');

		//insert into loader, then insert that into the page container
		inst.loaderForFooter = Loader.init({
		  children: inst.footerEl,
		  minHeight: '10rem',
		  size: '4rem',
		  backgroundColor: '#f4f6f7',
		});

		//listen for our custom event for local storage updated
		document.addEventListener("localUpdated", inst.localUpdated.bind(inst));

		checkoutStore.addListener(inst.calcShippingLoading.bind(inst), 'calcShippingLoading');

		inst.buildItems(inst.cart);

		return inst;
	}
}

export default OrderSummary;