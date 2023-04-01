import Component from '../component';
// import Search from './search';
import SideMenuHeader from './sideMenuHeader';
import FilterPlants from './filterPlants';

var SideMenuContent = {
	init: function(options) {
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

		// //side menu header
		// const search = Search.init({
		// 	placeholder: 'Search Tree Name',
		// 	hasButton: true,
		// 	onUpdate: options.onUpdate,
		// 	filterStore: options.filterStore,
		// });
		const sideMenuHeader = SideMenuHeader.init({
			isClose: true,
		});
		inst.el.querySelector('#side-menu-header').appendChild(sideMenuHeader.el);

		//filter
		const filterPlants = FilterPlants.init({
			buttonHeight: 40,
			tablesStore: options.tablesStore,
			onUpdate: options.onUpdate,
			filterStore: options.filterStore,
		});
		const filterEl = inst.el.querySelector('#filter');
		filterEl.appendChild(filterPlants.el);

		return inst;
	}
}

export default SideMenuContent;