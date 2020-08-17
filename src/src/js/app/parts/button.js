import Component from '../component';

var Button = {
	onButtonClick: function(e) {
		e.preventDefault();
		this.onClick();
	},
	init: function(options) {
		var proto = Object.assign({}, this, Component);
		var inst = Object.create(proto);
		// assign the instance constructor to the prototype so 'this' refers to the instance
		proto.constructor = inst;

		inst.onClick = options.onClick;

		//call initialize on Component first
		inst.initialize({
			el: `<a
				href="#"
				class="${options.class ? options.class : ''} ${options.isActive ? "active" : ''} ${options.isDisabled ? "disabled" : ''}" 
				style="cursor: pointer; display: block; ${options.style ? options.style : ''}"
				data-id="${options.id ? options.id : ''}"
				data-is-active="${options.isActive ? options.isActive : true}"
				disabled="${options.isDisabled ? options.isDisabled : false}"
				alt="${options.name}"
				>
				</a>`
		});

		if(options.children) {
			inst.el.appendChild(options.children);
		}

		inst.el.addEventListener('click', inst.onButtonClick.bind(inst), false);

		return inst;
	}
}

export default Button;