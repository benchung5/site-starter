import Component from '../component';
import appStateStore from '../storage/appStateStore';
import { addClass, removeClass } from '../lib/utils';
import animation from '../animation';
import SideMenuPlantsContent from './sideMenuPlantsContent';

var SideMenuPlantsMobile = {
	hideShowMenu() {
		if(appStateStore.storageData.showMenu == 'close') {
			this.closeMenuAnimation.animate();
		} else if(appStateStore.storageData.showMenu == 'open') {
			this.openMenuAnimation.animate();
			addClass(this.el, 'open');
			removeClass(this.el, 'close');
		}
	},
	init: function() {
		var proto = Object.assign({}, this, Component);
		var inst = Object.create(proto);
		// assign the instance constructor to the prototype so 'this' refers to the instance
		proto.constructor = inst;

		//call initialize on Component first
		inst.initialize({
			el: 
			`<div class="side-menu-mobile ${appStateStore.storageData.showMenu}">
            </div>`
		});

		inst.sideMenuPlantsContent = SideMenuPlantsContent.init({});
		inst.el.appendChild(inst.sideMenuPlantsContent.el);

		appStateStore.addListener(inst.hideShowMenu.bind(inst));

		//setup animation
		inst.closeMenuAnimation = animation.init(inst.el, {
			duration: 0.6,
			ease: 'ease-in-out',
			property: 'transform',
			propertyTo: 'translateX(-100%)',
			onEnd: () => {
				addClass(inst.el, 'close');
				removeClass(inst.el, 'open');
			},
		});
		inst.openMenuAnimation = animation.init(inst.el, {
			duration: 0.6,
			ease: 'ease-in-out',
			property: 'transform',
			propertyTo: 'translateX(0)',
		});

		return inst;
	}
}

export default SideMenuPlantsMobile;