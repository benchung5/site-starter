import Component from '../../component';

var FieldInput = {
	init: function(options) {
		var proto = Object.assign({}, this, Component)
		var inst = Object.create(proto);
		// assign the instance constructor to the prototype so 'this' refers to the instance
		proto.constructor = inst;

		inst.name = options.name;
		inst.label = options.label;
		inst.value = options.value || '';
		inst.error = options.error || '';

		//call initialize on Component first 
		inst.initialize({
			el: 
			`<div class="form-group ">
                <label>${options.label}:</label>
                <input class="form-control" type="text" name="${options.name}" value="${inst.value}">
                <div class="error"></div>
             </div>`
		});

		let errorEl = inst.el.querySelector('.error');
		inst.el.querySelector('input').addEventListener('blur', (e) => {
			inst.input = inst.el.querySelector('input');
			if((options.condition === 'required') && (inst.input.value == '')) {
				errorEl.innerHTML = inst.error;
			}
			
		}, false);

		return inst;
	}
}

export default FieldInput;