import Component from '../component';
import SideMenuContent from './sideMenuContent';

var SideMenu = {
	init: function(options) {
		var proto = Object.assign({}, this, Component);
		var inst = Object.create(proto);
		// assign the instance constructor to the prototype so 'this' refers to the instance
		proto.constructor = inst;

		//call initialize on Component first
		inst.initialize({
			el: 
			`<div class="side-menu">
            </div>`
		});

		inst.sideMenuContent = SideMenuContent.init({
			filterStore: options.filterStore,
			tablesStore: options.tablesStore,
			onUpdate: options.onUpdate,
		});
		inst.el.appendChild(inst.sideMenuContent.el);

		return inst;
	}
}

export default SideMenu;