import Component from '../../component';

var FieldHidden = {
	init: function(options) {
		var proto = Object.assign({}, this, Component)
		var inst = Object.create(proto);
		// assign the instance constructor to the prototype so 'this' refers to the instance
		proto.constructor = inst;

		//call initialize on Component first 
		inst.initialize({
			el: 
			`<input class="form-control" type="hidden" name="${options.name}" value="${options.value || ''}">`
		});

		return inst;
	}
}

export default FieldHidden;