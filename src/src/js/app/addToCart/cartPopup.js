import Component from '../component';
import ModalfromSide from '../parts/modalfromSide';
import Button from '../parts/button';
import Cart from './cart';
import appStateStore from '../storage/appStateStore';

var CartPopup = {
	open: function() {
		appStateStore.setData({ showMenu: 'open'});
	},
	init: function(options) {
		var proto = Object.assign({}, this, Component);
		var inst = Object.create(proto);
		// assign the instance constructor to the prototype so 'this' refers to the instance
		proto.constructor = inst;

		//call initialize on Component first
		inst.initialize({
			container: document.querySelector('body'),
			el: `<div></div>`
		});

		inst.cart = Cart.init();
		inst.modalfromSide = ModalfromSide.init({
			title: 'Shopping Cart',
			content: inst.cart.el
	});
		inst.el.appendChild(inst.modalfromSide.el);

		return inst;
	}
}

export default CartPopup;