import Component from '../component';
import FilterArticles from './filterArticles';

var SideMenuArticlesContent = {
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
			 <div id="filter"></div>
             <div class="bottom"></div>
            </div>
             `
		});

		//article filter
		const filterArticles = FilterArticles.init({
			filterStore: options.filterStore,
			tablesStore: options.tablesStore,
			onUpdate: options.onUpdate
		});
		const filter = inst.el.querySelector('#filter');
		filter.appendChild(filterArticles.el);

		return inst;
	}
}

export default SideMenuArticlesContent;