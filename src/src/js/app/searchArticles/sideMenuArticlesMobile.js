import Component from '../component';
import SideMenuArticlesContent from './sideMenuArticlesContent';
import ModalFromSide from '../parts/modalFromSide';

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

		inst.sideMenuArticlesContent = SideMenuArticlesContent.init({});

		inst.modalFromSide = ModalFromSide.init({
			content: inst.sideMenuArticlesContent.el
		});


		inst.el.appendChild(inst.modalFromSide.el);


		return inst;
	}
}

export default SideMenuMobile;