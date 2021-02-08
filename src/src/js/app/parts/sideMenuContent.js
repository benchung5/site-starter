import Component from '../component';
import Search from './search';
import SideMenuHeader from './sideMenuHeader';
import Filter from './filter';

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

		//side menu header
		const search = Search.init({
			placeholder: 'Search Tree Name',
			hasButton: true,
			search: options.search,
			filterStore: options.filterStore
		});
		const sideMenuHeader = SideMenuHeader.init({
			isClose: true,
			children: search.el,
			clearSearch: options.clearSearch,
		});
		inst.el.querySelector('#side-menu-header').appendChild(sideMenuHeader.el);

		//filter
		const filter = Filter.init({
			buttonHeight: 40,
			changeCategories: options.changeCategories,
			categories: options.categories
		});
		const filterEl = inst.el.querySelector('#filter');
		filterEl.appendChild(filter.el);

		return inst;
	}
}

export default SideMenuContent;