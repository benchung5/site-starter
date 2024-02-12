import Component from '../component';
import { addClass, removeClass } from '../lib/utils';

var Modal = {
	open: function() {
	  this.el.style.display = 'flex';

	  setTimeout(() => {
		removeClass(this.el, 'off');
		addClass(this.el, 'on');
	  }, 100);
	},
	close: function() {
	  removeClass(this.el, 'on');
	  addClass(this.el, 'off');

	  setTimeout(() => {
	    this.el.style.visibility = 'hidden';
	    this.el.style.opacity = '0';
	  }, 100);
	},
	init: function(options) {
		var proto = Object.assign({}, this, Component);
		var inst = Object.create(proto);
		// assign the instance constructor to the prototype so 'this' refers to the instance
		proto.constructor = inst;

		//call initialize on Component first
		inst.initialize({
			el: 
			`<div id="modal" class="modal transition-opac off"></div>`
		});

		inst.contentElement = options.contentElement;
		inst.el.appendChild(inst.contentElement);
		document.body.insertBefore(inst.el, document.body.firstChild);

		return inst;
	}
}

export default Modal;