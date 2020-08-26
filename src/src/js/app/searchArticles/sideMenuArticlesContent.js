import Component from '../component';
import SearchArticles from '../parts/searchArticles';
import SideMenuHeader from './sideMenuHeader';
import FilterArticles from './filterArticles';

var SideMenuArticlesContent = {
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
		const searchArticles = SearchArticles.init({
			placeholder: 'Search Articles',
			hasButton: true
		});
		const sideMenuHeader = SideMenuHeader.init({
			isClose: true,
			children: searchArticles.el
		});
		inst.el.querySelector('#side-menu-header').appendChild(sideMenuHeader.el);

		//article filter
		const filterArticles = FilterArticles.init({
			buttonHeight: 40
		});
		const filter = inst.el.querySelector('#filter');
		filter.appendChild(filterArticles.el);

		return inst;
	}
}

export default SideMenuArticlesContent;