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
			onUpdate: options.onUpdate,
			filterStore: options.filterStore,
		});
		const sideMenuHeader = SideMenuHeader.init({
			isClose: true,
			children: search.el,
			onUpdate: options.onUpdate,
			filterStore: options.filterStore,
			onUpdate: options.onUpdate,
		});
		inst.el.querySelector('#side-menu-header').appendChild(sideMenuHeader.el);

		//filter
		const filter = Filter.init({
			buttonHeight: 40,
			categories: options.categories,
			onUpdate: options.onUpdate,
			filterStore: options.filterStore,
		});
		const filterEl = inst.el.querySelector('#filter');
		filterEl.appendChild(filter.el);

		return inst;
	}
}

export default SideMenuContent;