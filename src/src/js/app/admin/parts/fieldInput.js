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
			`<div class="form-group${options.clearable ? ' has-clear' : ''}" data-name="${options.name}">
                <label for="field-${options.name}">${options.label}:</label>
                <div class="input-wrap">
                  <input id="field-${options.name}" class="form-control" type="text" placeholder="${options.placeholder ? options.placeholder : ''}" name="${options.name}" value="${options.value || ''}">
                  ${options.clearable ? '<button type="button" class="input-clear" aria-label="Clear input">×</button>' : ''}
                </div>
                <div class="error"></div>
             </div>`
		});

		const inputEl = inst.el.querySelector('input');
		//handle errors, just for on blur, not on form submit
		let errorEl = inst.el.querySelector('.error');
		inputEl.addEventListener('blur', (e) => {
			inst.input = inputEl;
			//clear first
			errorEl.innerHTML = '';
			if((options.condition === 'required') && (inst.input.value == '')) {
				errorEl.innerHTML = options.error;
			}
			
		}, false);
		if (options.clearable) {
			const clearButton = inst.el.querySelector('.input-clear');
			if (clearButton) {
				clearButton.addEventListener('click', (e) => {
					e.preventDefault();
					inputEl.value = '';
					inputEl.focus();
				});
			}
		}

		return inst;
	}
}

export default FieldInput;