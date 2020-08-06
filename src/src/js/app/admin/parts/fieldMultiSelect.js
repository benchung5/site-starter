import Component from '../../component';
import FieldHidden from './fieldHidden';
import { toggleClass } from '../../lib/utils';

var FieldMultiselect = {
	updateValue: function() {		
		this.fieldHidden.el.value = this.state.value.toString();
	},
	onOptionClick: function(e) {
		const optionValue = e.target.dataset['value'];

		if(! this.state.value.includes(optionValue)) {
			//add the value
			this.state.value.push(optionValue);
		} else {
			//remove the value
			const index = this.state.value.indexOf(optionValue);
			this.state.value.splice(index, 1);
		}

		this.updateValue();

		toggleClass(e.target, 'selected');
	},
	init: function(options) {
		var proto = Object.assign({}, this, Component)
		var inst = Object.create(proto);
		// assign the instance constructor to the prototype so 'this' refers to the instance
		proto.constructor = inst;

		//call initialize on Component first 
		inst.initialize({
			el:
			// value="${options.value || ''}"
			`<div class="form-group ">
                <label>${options.label}:</label>
                <div id="select" class="multiselect"></div>
                <div class="error"></div>
             </div>`
		});

		inst.fieldHidden = FieldHidden.init({ name: options.name });
		inst.el.appendChild(inst.fieldHidden.el);
		let errorEl = inst.el.querySelector('.error');
		inst.select = inst.el.querySelector('#select');
		inst.select.addEventListener('blur', (e) => {
			inst.select = inst.el.querySelector('select');
			if((options.condition === 'required') && (inst.input.value == '')) {
				errorEl.innerHTML = options.error;
			}
			
		}, false);

		inst.selectItems = options.selectItems;

		let valueArray = options.value.map((item) => {
			return item.id;
		});
		inst.setState({ value: valueArray });



		inst.selectItems.map((item) => {
			let selected = false;
			inst.state.value.map((selectedItem) => {
				if(item.id == selectedItem) {
					selected = true;
				}
			});

			const option = inst.createEl(`<div class="option ${selected ? 'selected' : ''}" data-value="${item.id}">${item.name}</div>`);

			option.addEventListener('click', inst.onOptionClick.bind(inst), false);

			inst.select.appendChild(option);
		});
		inst.updateValue();

		return inst;
	}
}

export default FieldMultiselect;