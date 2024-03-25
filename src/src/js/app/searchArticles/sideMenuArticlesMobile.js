import Component from '../component';
import SideMenuArticlesContent from './sideMenuArticlesContent';
import ModalFromSide from '../parts/modalFromSide';
import appStateStore from '../storage/appStateStore';

var SideMenuMobile = {
	toggleMenu: function(e) {
		this.modalFromSide.hideShowModal(e.detail.showMenu);
	},
	closeMenu: function() {
		appStateStore.setData({ showMenu: false });
	},
	init: function(options) {
		var proto = Object.assign({}, this, Component);
		var inst = Object.create(proto);
		// assign the instance constructor to the prototype so 'this' refers to the instance
		proto.constructor = inst;

		//call initialize on Component first
		inst.initialize({
			el: 
			`<div></div>`
		});

		inst.sideMenuArticlesContent = SideMenuArticlesContent.init({});

		inst.modalFromSide = ModalFromSide.init({
			content: inst.sideMenuArticlesContent.el,
			onCloseClick: inst.closeMenu.bind(inst),
		});

		appStateStore.addListener(inst.toggleMenu.bind(inst), 'showMenu');

		inst.el.appendChild(inst.modalFromSide.el);


		return inst;
	}
}

export default SideMenuMobile;