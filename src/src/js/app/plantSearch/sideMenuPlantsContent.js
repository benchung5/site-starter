import Component from '../component';
import SearchTrees from '../parts/searchTrees';
import SideMenuHeader from '../parts/sideMenuHeader';
import FilterPlants from './filterPlants';

var SideMenuPlantsContent = {
	init: function() {
		var proto = Object.assign({}, this, Component);
		var inst = Object.create(proto);
		// assign the instance constructor to the prototype so 'this' refers to the instance
		proto.constructor = inst;

		//call initialize on Component first
		inst.initialize({
			el: 
			`
			<div>
			 <div id="side-menu-header"></div>
			 <div id="filter"></div>
             <div class="bottom"></div>
            </div>
             `
		});

		//side menu header
		const searchTrees = SearchTrees.init({
			placeholder: 'Search Tree Name',
			hasButton: true
		});
		const sideMenuHeader = SideMenuHeader.init({
			isClose: true,
			children: searchTrees.el
		});
		inst.el.querySelector('#side-menu-header').appendChild(sideMenuHeader.el);

		//plant filter
		const filterPlants = FilterPlants.init({
			buttonHeight: 40
		});
		const filter = inst.el.querySelector('#filter');
		filter.appendChild(filterPlants.el);

		return inst;
	}
}

export default SideMenuPlantsContent;