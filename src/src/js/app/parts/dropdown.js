import Component from '../component';
import animation from '../animation';

var Dropdown = {
	onDropdownClick: function(e) {
		e.preventDefault();
		if(!this.state.active) {
			this.dropdownBody.style.visibility = 'visible';
			this.expandAnimation.animate();
			this.arrowDownAnimation.animate();
			this.setState({ active: true });

		} else {
			this.contractAnimation.animate();
			this.arrowRightAnimation.animate();
			this.setState({ active: false });
		}
	},
	init: function(options) {
		var proto = Object.assign({}, this, Component);
		var inst = Object.create(proto);
		// assign the instance constructor to the prototype so 'this' refers to the instance
		proto.constructor = inst;

		inst.height = options.height;
		inst.setState({ active: options.active });

		//call initialize on Component first
		inst.initialize({
			el: 
			`
	       <div class="dropdown-toggle ${options.className ? options.className : ''}">
		       <a
			       href="#"
			       class="dropdown-button menu-item ${options.isDisabled ? "disabled" : ""}"
			       data-id="${options.id}"
			       data-is-active="${options.active}"
			       data-is-disabled="${options.isDisabled}"
			       alt="${options.name}"
			       >
			        <img class="dropdown-arrow icon-arrow" src="/assets/img/icons/arrow.svg"/>
			       	<span class="item-label">${options.name}</span>
		       </a>
		       <div class="dropdown-body" style="height: ${options.height}px">
		       </div>
	       </div>
			`
		});

		inst.el.querySelector('a').addEventListener('click', inst.onDropdownClick.bind(inst), false);

		inst.dropdownArrow = inst.el.querySelector('.dropdown-arrow');
		inst.dropdownBody = inst.el.querySelector('.dropdown-body');

		if (options.children) {
			inst.dropdownBody.appendChild(options.children);
		}

		//setup animation
		inst.expandAnimation = animation.init(inst.dropdownBody, {
			duration: 0.2,
			ease: 'ease-in-out',
			property: 'height',
			propertyTo: inst.height + 'px',
			onEnd: () => {

			},
		});
		inst.contractAnimation = animation.init(inst.dropdownBody, {
			duration: 0.2,
			ease: 'ease-in-out',
			property: 'height',
			propertyTo: '0',
			onEnd: () => {
				inst.dropdownBody.style.visibility = 'hidden';
			},
		});

		inst.arrowDownAnimation = animation.init(inst.dropdownArrow, { 
			duration: 0.2,
			ease: 'ease-in-out',
			property: 'transform',
			propertyTo: 'rotate(0deg)',
			onEnd: () => {

			},
		});
		inst.arrowRightAnimation = animation.init(inst.dropdownArrow, { 
			duration: 0.2,
			ease: 'ease-in-out',
			property: 'transform',
			propertyTo: 'rotate(-90deg)'
		});

		return inst;
	}
}

export default Dropdown;