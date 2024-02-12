import Component from '../component';
import SideMenuContent from './sideMenuContent';
import ModalFromSide from './modalFromSide';

var SideMenuMobile = {
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

		inst.sideMenuContent = SideMenuContent.init({
			filterStore: options.filterStore,
			tablesStore: options.tablesStore,
			onUpdate: options.onUpdate,
		});

		inst.modalFromSide = ModalFromSide.init({
			content: inst.sideMenuContent.el
		});


		inst.el.appendChild(inst.modalFromSide.el);


		return inst;
	}
}

export default SideMenuMobile;