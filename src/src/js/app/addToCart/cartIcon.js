import Component from '../component';
// import CartPopup from './cartPopup';
import appStateStore from '../storage/appStateStore';
import { getCartTotals } from '../lib/cartUtils';
import { moveElement } from '../lib/utils';

var CartIcon = {
	onCartClick: function() {
		appStateStore.setData({ showCart: true});
		// this.cartPopup.open();
	},
	onMobileChange: function(e) {
		if(e.detail.isMobile) {
			moveElement(this.el, this.mobileCartIconContainer);
		}
		if(e.detail.isMobile == false) {
			moveElement(this.el, this.cartIconContainer);
		} 

	},
	localUpdated: function(e) {
		let cart = null;
		if (!e) {
			cart = JSON.parse(localStorage.getItem('cart'));
		} else {
			cart = JSON.parse(e.value);
		}
		
		if (cart) {
			const totalCount = getCartTotals(cart).totalCount;
			if (totalCount != 0) {
				this.countEl.innerHTML = totalCount;
				this.countEl.style.visibility = 'visible';
			} else {
				this.countEl.innerHTML = '';
				this.countEl.style.visibility = 'hidden';
			}
		}
	},
	init: function(options) {
		var proto = Object.assign({}, this, Component);
		var inst = Object.create(proto);
		// assign the instance constructor to the prototype so 'this' refers to the instance
		proto.constructor = inst;

		appStateStore.init();

		inst.mobileCartIconContainer = document.querySelector('#mobile-cart-icon-container');
		inst.cartIconContainer = document.querySelector('#cart-icon-container');

		//call initialize on Component first
		inst.initialize({
			container: inst.cartIconContainer,
			el: 
			`<div class="cart">
	          <span class="count"></span>
	          <span class="material-symbols-outlined md-36 ">shopping_cart</span>
	         </div>`
		});

		inst.el.addEventListener('click', inst.onCartClick.bind(inst));
		inst.countEl = inst.el.querySelector('.count');

		window.addEventListener('isMobile', this.onMobileChange.bind(inst));

		//listen for our custom event for local storage updated
		document.addEventListener("localUpdated", inst.localUpdated.bind(inst));
		inst.localUpdated();

		return inst;
	}
}

export default CartIcon;