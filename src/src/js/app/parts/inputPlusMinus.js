import Component from '../component';

var InputPlusMinus = {
	onItemClick: function(e) {
		e.preventDefault();
		e.stopPropagation();
		let id = e.currentTarget.getAttribute('data-id');
		//let id = e.target.getAttribute('data-id');

		let inputValue = parseInt(this.input.value);
		if (id == "add") {
				this.input.value = inputValue + 1;
		}
		if (id == "subtract") {
				if (inputValue > 0) {
						this.input.value = inputValue - 1;
				}
		}
		
	    // let modifiedData = this.buttonData.map((item, index) => {
	    // 	//set current active to the opposite of what it was (toggle);
	    // 	if (item.id == id) {
	    // 		this.updateButtonState(id, (!item.active));
	    // 		return Object.assign(item, { active: !item.active });
	    // 	} else {
	    // 		return item;
	    // 	}
	    // });
	    // //send callback
	    // this.updateData(modifiedData);
	},
	adjustValue: function() {

	},
	init: function(options) {
		var proto = Object.assign({}, this, Component);
		var inst = Object.create(proto);
		// assign the instance constructor to the prototype so 'this' refers to the instance
		proto.constructor = inst;

		inst.inputValue = options.inputValue ? options.inputValue : 0;

		//call initialize on Component first
		inst.initialize({
			el: `
				<div class="Input-plus-minus ${options.className ? options.className : ''}">
					<a
					type="button"
					class="subtract${options.isDisabled ? " disabled" : ''}" 
					style="cursor: pointer;"
					disabled="${options.isDisabled ? options.isDisabled : false}"
					title="reduce quantity"
					data-id="subtract"
					data-is-active="${options.isActive ? options.isActive : true}"
					>
					<svg data-id="subtract" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M200-440v-80h560v80H200Z"/></svg>
					</a>
					<input name="${options.inputName ? options.inputName : ''}" type="number" value="${inst.inputValue}" min="0" aria-label="quantity" oninput="this.value = 
 						!!this.value && Math.abs(this.value) >= 0 ? Math.abs(this.value) : 0"></input>
					<a
					type="button"
					class="add${options.isDisabled ? " disabled" : ''}" 
					style="cursor: pointer; "
					disabled="${options.isDisabled ? options.isDisabled : false}"
					title="increase quantity"
					data-id="add"
					data-is-active="${options.isActive ? options.isActive : true}"
					>
					<svg data-id="add" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
					<path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/>
					</svg>
					</a>
				</div
				`
		});

		inst.buttonSubtract = inst.el.querySelector('.subtract');
		inst.buttonAdd = inst.el.querySelector('.add');
		inst.input = inst.el.querySelector('input');

		inst.buttonSubtract.addEventListener('click', inst.onItemClick.bind(inst), false);
		inst.buttonAdd.addEventListener('click', inst.onItemClick.bind(inst), false);


		return inst;
	}
}

export default InputPlusMinus;