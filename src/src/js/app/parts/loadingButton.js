import Component from '../component';
import { toggleClass } from '../lib/utils';

var LoadingButton = {
	onClick: function(e) {
		this.onClick(e);
	},
	isLoading: function(isLoading) {
		if (isLoading) {
	    // Disable the button and show a spinner
			this.el.disabled = true;
			toggleClass(this.el, 'button--loading');
		} else {
			this.el.disabled = false;
			toggleClass(this.el, 'button--loading');
		}
	},
	isEnabled: function(isEnabled) {
		if (isEnabled) {
			this.el.disabled = false;
		} else {
			this.el.disabled = true;
		}
	},
	init: function(options) {
		var proto = Object.assign({}, this, Component);
		var inst = Object.create(proto);
		// assign the instance constructor to the prototype so 'this' refers to the instance
		proto.constructor = inst;

		//call initialize on Component first
		inst.initialize({
			el: 
			`<button id="submit" class="btn btn-primary loading-button" ${options.disabled ? 'disabled' : ''}>
			    <span class="button-text">${options.text}</span>
			 </button>`
		});

		if (options.onClick) {
			inst.onClick = options.onClick;
			inst.el.addEventListener('click', inst.onClick.bind(inst));
		}

		return inst;
	}
}

export default LoadingButton;