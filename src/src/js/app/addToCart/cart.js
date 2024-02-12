import Component from '../component';
import Button from '../parts/button';

var Cart = {
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

		return inst;
	}
}

export default Cart;