import Component from '../../component';

var FieldDropdownSelect = {
	init: function(options) {
		var proto = Object.assign({}, this, Component)
		var inst = Object.create(proto);
		// assign the instance constructor to the prototype so 'this' refers to the instance
		proto.constructor = inst;

		//call initialize on Component first 
		inst.initialize({
			el: 
			`<div class="form-group ">
                <label>${options.label}:</label>
                <select class="form-control" type="text" name="${options.name}" value="${options.value || ''}>
                </select>
                <div class="error"></div>
             </div>`
		});

		let errorEl = inst.el.querySelector('.error');
		inst.select = inst.el.querySelector('select');
		inst.select.addEventListener('blur', (e) => {
			inst.select = inst.el.querySelector('select');
			if((options.condition === 'required') && (inst.input.value == '')) {
				errorEl.innerHTML = options.error;
			}
			
		}, false);

	    options.selectItems.map((item) => {
	    	const option = inst.createEl(`<option value=${item.id}>${item.name}</option>`);
	    	inst.select.appendChild(option);
	    });

	    //select the currently selected value
	    inst.select.value = options.value;
		
		return inst;
	}
}

export default FieldDropdownSelect;