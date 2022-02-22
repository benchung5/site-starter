import Component from '../../component';

var UpdateMessage = {
	clear: function() {
		this.el.innerHTML = '';
	},
	renderSuccess: function(successMessage) {
		this.clear;
		this.el.innerHTML = successMessage;
	},
	renderError: function(errorMessage) {
		this.clear;
		this.el.innerHTML = errorMessage;
	},
	init: function() {
		var proto = Object.assign({}, this, Component);
		var inst = Object.create(proto);
		// assign the instance constructor to the prototype so 'this' refers to the instance
		proto.constructor = inst;

		//call initialize on Component first
		inst.initialize({
			el: 
			`<div class="submission-message"></div>`
		});

		return inst;
	}
}

export default UpdateMessage;