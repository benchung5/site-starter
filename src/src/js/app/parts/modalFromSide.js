import Component from '../component';
import appStateStore from '../storage/appStateStore';
import { addClass, removeClass } from '../lib/utils';
import animation from '../animation';
import Button from './button';

var ModalFromSide = {
	hideShowModal() {
		if(appStateStore.storageData.showMenu == 'close') {
			this.closeBackgroundAnimation.animate();
			this.closeMenuAnimation.animate();
		} else if(appStateStore.storageData.showMenu == 'open') {
			this.openBackgroundAnimation.animate();
			this.openMenuAnimation.animate();
			addClass(this.sideMenuMobile, 'open');
			removeClass(this.sideMenuMobile, 'close');
		}
	},
	close: function() {
		appStateStore.setData({showMenu: 'close'});
	},
	onScreenCoverClick: function(e) {
		//if you hit the screen cover, close the side menu
		if (!e.target.closest('.side-menu-mobile') && e.target.closest('.modal-from-side')) {
		    this.close();
		}
	},
	init: function(options) {
		var proto = Object.assign({}, this, Component);
		var inst = Object.create(proto);
		// assign the instance constructor to the prototype so 'this' refers to the instance
		proto.constructor = inst;

		//call initialize on Component first
		inst.initialize({
			el: 
			`
			<div class="modal-from-side">
				<div class="side-menu-mobile ${appStateStore.storageData.showMenu}">
					<div class="menu-header"><h2 class="menu-header-left">${options.title || ""}</h2><div class="menu-header-right"></div></div>
	            </div>
            </div>
            `
		});

		inst.sideMenuMobile = inst.el.querySelector('.side-menu-mobile');

		if(options.content) {
			inst.sideMenuMobile.appendChild(options.content);
		}

		appStateStore.init();
		appStateStore.addListener(inst.hideShowModal.bind(inst), 'showMenu');

		inst.headerRight = inst.el.querySelector('.menu-header-right');
		const closeButton = Button.init({
			className: 'menu-close',
			name: 'Close',
			onClick: inst.close.bind(inst)
		});
		inst.headerRight.appendChild(closeButton.el)

		//background animation
		inst.openBackgroundAnimation = animation.init(inst.el, {
			duration: 0.6,
			ease: 'ease',
			propertyTo: [['opacity', '1']],
			transitionProperty: 'opacity',
			onStart: () => {
				inst.el.style.visibility = 'visible';
			},
		});
		inst.closeBackgroundAnimation = animation.init(inst.el, {
			duration: 0.6,
			ease: 'ease',
			propertyTo: [['opacity', '0']],
			transitionProperty: 'opacity',
			onEnd: () => {
				inst.el.style.visibility = 'hidden';
			},
		});


		//side menu animation
		inst.openMenuAnimation = animation.init(inst.sideMenuMobile, {
			duration: 0.6,
			ease: 'ease-in-out',
			propertyTo: [['transform', 'translateX(0)']],
		});
		inst.closeMenuAnimation = animation.init(inst.sideMenuMobile, {
			duration: 0.6,
			ease: 'ease-in-out',
			propertyTo: [['transform', 'translateX(-100%)']],
			onEnd: () => {
				addClass(inst.sideMenuMobile, 'close');
				removeClass(inst.sideMenuMobile, 'open');
			},
		});

		inst.el.addEventListener('click', inst.onScreenCoverClick.bind(inst));

		return inst;
	}
}

export default ModalFromSide;