import Component from '../component';
import SideMenuPlantsContent from './sideMenuPlantsContent';

var SideMenuPlantsMobile = {
	init: function() {
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

		inst.sideMenuPlantsContent = SideMenuPlantsContent.init({});
		inst.el.appendChild(inst.sideMenuPlantsContent.el);

		return inst;
	}
}

export default SideMenuPlantsMobile;