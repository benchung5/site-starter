import Component from '../component';

var Button = {
	init: function(options) {
		var proto = Object.assign({}, this, Component);
		var inst = Object.create(proto);
		// assign the instance constructor to the prototype so 'this' refers to the instance
		proto.constructor = inst;

		//call initialize on Component first
		inst.initialize({
			el: `<a
				href="#"
				class="${options.className ? options.className : ''} ${options.isDisabled ? "disabled" : ''}" 
				style="cursor: pointer; ${options.style ? options.style : ''}"
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

		inst.el.addEventListener('click', options.onClick.bind(inst), false);

		return inst;
	}
}

export default Button;