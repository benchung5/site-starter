import Component from '../../component';

var ProtectedWarning = {
	init: function() {
		var proto = Object.assign({}, this, Component)
		var inst = Object.create(proto);
		// assign the instance constructor to the prototype so 'this' refers to the instance
		proto.constructor = inst;

		//call initialize on Component first
		inst.initialize({
			el: 
			`<div class="admin-main">
			   <div class="row">
			      <div class="columns small-12">
			         <p>Please sign up or <a class="" href="#signin">login</a>.</p>
			      </div>
			   </div>
			</div>`
		});

		return inst;
	}
}

export default ProtectedWarning;