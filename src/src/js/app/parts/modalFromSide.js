import Component from '../component';
import appStateStore from '../storage/appStateStore';
import { addClass, removeClass } from '../lib/utils';
import animation from '../animation';
import Button from './button';

var ModalFromSide = {
	hideShowModal() {
		if(appStateStore.storageData.showMenu == 'close') {
			this.closeMenuAnimation.animate();
		} else if(appStateStore.storageData.showMenu == 'open') {
			this.openMenuAnimation.animate();
			addClass(this.el, 'open');
			removeClass(this.el, 'close');
		}
	},
	close: function() {
		appStateStore.setData({showMenu: 'close'});
	},
	init: function(options) {
		var proto = Object.assign({}, this, Component);
		var inst = Object.create(proto);
		// assign the instance constructor to the prototype so 'this' refers to the instance
		proto.constructor = inst;

		//call initialize on Component first
		inst.initialize({
			el: 
			`<div class="side-menu-mobile ${appStateStore.storageData.showMenu}">
			<div class="menu-header"></div>
            </div>`
		});

		if(options.content) {
			inst.el.appendChild(options.content);
		}

		appStateStore.init();
		appStateStore.addListener(inst.hideShowModal.bind(inst));

		inst.header = inst.el.querySelector('.menu-header');
		const closeButton = Button.init({
			className: 'menu-close',
			name: 'Close',
			onClick: inst.close.bind(inst)
		});
		const right = inst.createEl(`<div class="menu-header-right"></div>`);
		right.appendChild(closeButton.el)
		inst.header.appendChild(right);


		//setup animation
		inst.closeMenuAnimation = animation.init(inst.el, {
			duration: 0.6,
			ease: 'ease-in-out',
			propertyTo: [['transform', 'translateX(-100%)']],
			onEnd: () => {
				addClass(inst.el, 'close');
				removeClass(inst.el, 'open');
			},
		});
		inst.openMenuAnimation = animation.init(inst.el, {
			duration: 0.6,
			ease: 'ease-in-out',
			propertyTo: [['transform', 'translateX(0)']],
		});

		return inst;
	}
}

export default ModalFromSide;