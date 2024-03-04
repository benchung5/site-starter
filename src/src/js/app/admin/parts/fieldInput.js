import Component from '../../component';

var FieldInput = {
	init: function(options) {
		var proto = Object.assign({}, this, Component)
		var inst = Object.create(proto);
		// assign the instance constructor to the prototype so 'this' refers to the instance
		proto.constructor = inst;

		//call initialize on Component first 
		inst.initialize({
			el: 
			`<div class="form-group" data-name="${options.name}">
                <label for="field-${options.name}">${options.label}:</label>
                <input id="field-${options.name}" class="form-control" type="text" placeholder="${options.placeholder ? options.placeholder : ''}" name="${options.name}" value="${options.value || ''}">
                <div class="error"></div>
             </div>`
		});

		//handle errors, just for on blur, not on form submit
		let errorEl = inst.el.querySelector('.error');
		inst.el.querySelector('input').addEventListener('blur', (e) => {
			inst.input = inst.el.querySelector('input');
			if((options.condition === 'required') && (inst.input.value == '')) {
				errorEl.innerHTML = options.error;
			}
			
		}, false);

		return inst;
	}
}

export default FieldInput;