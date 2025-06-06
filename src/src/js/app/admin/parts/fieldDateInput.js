import Component from '../../component';
import { validateDate } from '../../lib/formUtils';

var FieldDateInput = {
	init: function(options) {
		var proto = Object.assign({}, this, Component)
		var inst = Object.create(proto);
		// assign the instance constructor to the prototype so 'this' refers to the instance
		proto.constructor = inst;

		//call initialize on Component first 
		inst.initialize({
			el: 
			`<div class="form-group" data-name="${options.name}">
                <label for="field-${options.name}">${options.label} (YYYY-MM-DD):</label>
                <input id="field-${options.name}" class="form-control" type="text" placeholder="YYYY-MM-DD" name="${options.name}" value="${options.value || ''}">
                <div class="error"></div>
             </div>`
		});

		//handle errors, just for on blur, not on form submit
		let errorEl = inst.el.querySelector('.error');
		inst.el.querySelector('input').addEventListener('blur', (e) => {
			inst.input = inst.el.querySelector('input');

			//clear first
			errorEl.innerHTML = '';

			if((options.condition === 'required') && (inst.input.value == '')) {
				errorEl.innerHTML = options.error;
			}

			//validte YYYY-MM-DD
			let date_regex = /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
			let isValid = validateDate(inst.input.value);
			if ((inst.input.value !== '') && (!isValid)) {
			    errorEl.innerHTML = 'please enter a valid date';
			}
			
		}, false);

		return inst;
	}
}

export default FieldDateInput;