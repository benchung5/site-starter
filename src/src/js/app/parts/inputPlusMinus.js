import Component from '../component';
import { addClass, removeClass } from  '../lib/utils';
import AnimationInOut from '../animationInOut';

var InputPlusMinus = {
	onItemClick: function(e) {
		e.preventDefault();
		e.stopPropagation();
		let id = e.currentTarget.getAttribute('data-id');
		//let id = e.target.getAttribute('data-id');

		let inputValue = parseInt(this.input.value);

		if (id == "add" && inputValue < this.maxValue) {
				this.input.value = inputValue + 1;
		}
		if (id == "subtract") {
				if (inputValue > 0) {
						this.input.value = inputValue - 1;
				} else {
					if (this.onRemove) {
						this.onRemove(this.inputName);
					}
				}
		}

		//then disable enable/disable buttons if needed
		this.enableDisable(true);

		if(this.onChange) {
			this.onChange(this.input.value);
		}
	},
	enableDisable: function(isClick) {
		if (this.input.value >= this.maxValue) {
			addClass(this.buttonAdd, 'disabled');
			if(isClick) {
				this.bubbleAnimation.animate();
			}
		} else {
			removeClass(this.buttonAdd, 'disabled');
		}

		if (this.input.value == 0) {
			this.buttonSubtract.innerHTML = '';
			this.buttonSubtract.appendChild(this.trashEl);
		} else {
			this.buttonSubtract.innerHTML = '';
			this.buttonSubtract.appendChild(this.minusEl);
		}
	},
	init: function(options) {
		var proto = Object.assign({}, this, Component);
		var inst = Object.create(proto);
		// assign the instance constructor to the prototype so 'this' refers to the instance
		proto.constructor = inst;

		inst.inputName = options.inputName ? options.inputName : null;
		inst.inputValue = options.inputValue ? options.inputValue : 0;
		inst.maxValue = options.maxValue ? options.maxValue : 1000;
		inst.onChange = options.onChange ? options.onChange : null;
		inst.onRemove = options.onRemove ? options.onRemove : null;

		//call initialize on Component first
		inst.initialize({
			el: `
				<div class="Input-plus-minus ${options.className ? options.className : ''}">
					<div class="bubble-text">
						only ${inst.maxValue} left
					</div>
					<a
					type="button"
					class="subtract${options.isDisabled ? " disabled" : ''}" 
					style="cursor: pointer;"
					title="reduce quantity"
					data-id="subtract"
					data-is-active="${options.isActive ? options.isActive : true}"
					></a>
					<input name="${options.inputName ? options.inputName : ''}" type="number" value="${inst.inputValue}" min="0" max="${options.maxValue}" aria-label="quantity" oninput="this.value = 
 						!!this.value && Math.abs(this.value) >= 0 ? Math.abs(this.value) : 0"></input>
					<a
					type="button"
					class="add${options.isDisabled ? " disabled" : ''}" 
					style="cursor: pointer; "
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

		inst.trashEl = inst.createEl(`<span class="material-symbols-outlined">delete</span>`);
		inst.minusEl = inst.createEl(`<svg data-id="subtract" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M200-440v-80h560v80H200Z"/></svg>`);

		inst.buttonAdd = inst.el.querySelector('.add');
		inst.input = inst.el.querySelector('input');
		inst.bubbleText = inst.el.querySelector('.bubble-text');

		inst.buttonSubtract.addEventListener('click', inst.onItemClick.bind(inst), false);
		inst.buttonAdd.addEventListener('click', inst.onItemClick.bind(inst), false);

		//animation
		inst.bubbleAnimation = AnimationInOut.init(inst.bubbleText, 
			{
				propertyTo: [['opacity', '1']],
				duration: 0.1,
				ease: 'linear',
				onStart: () => {
					inst.bubbleText.style.visibility = 'visible';
				},
			},
			{
				propertyTo: [['opacity', '0']],
				duration: 0.1,
				ease: 'linear',
				delay: 0.6,
			},
			0.6, () => {
				inst.bubbleText.style.visibility = 'hidden';
		});

		//enable or disable buttons if initial value is already max val
		inst.enableDisable();

		return inst;
	}
}

export default InputPlusMinus;