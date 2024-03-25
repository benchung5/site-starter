import Component from '../../component';
import Modal from '../../parts/modal';

var VerifyAction = {
	open: function(callback) {
		this.modal.open();
		this.callback = callback;
	},
	cancel: function() {
		this.modal.close();
		this.callback(false);
	},
	agree: function() {
		this.modal.close();
		this.callback(true);
	},
	init: function(options) {
		var proto = Object.assign({}, this, Component);
		var inst = Object.create(proto);
		// assign the instance constructor to the prototype so 'this' refers to the instance
		proto.constructor = inst;

		//call initialize on Component first
		inst.initialize({
			el: 
			`<div class="verify-action">
			   <p id="verify-action-message"></p>
			   <div class="buttons">
			    <button id="okay" class="btn"}>okay</button>
			    <button id="cancel" class="btn">cancel</button>
			   </div>
			 </div>`
		});
		inst.el.querySelector('#verify-action-message').innerText = options.message || 'are you sure?';
		inst.onAgree = options.onAgree;
		inst.el.querySelector('#okay').addEventListener('click', inst.agree.bind(inst), false);
		inst.el.querySelector('#cancel').addEventListener('click', inst.cancel.bind(inst), false);

		inst.modal = Modal.init({ contentElement: inst.el });

		return inst;
	}
}

export default VerifyAction;