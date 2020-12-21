import Component from '../component';
import SideMenuArticlesMobile from './sideMenuArticlesMobile';
import GridViewArticles from './gridViewArticles';
import appStateStore from '../storage/appStateStore';
import articleTablesStore from '../storage/articleTablesStore';
import articleListStore from '../storage/articleListStore';
import articleFilterStore from '../storage/articleFilterStore';
import ButtonShowMenu from '../parts/buttonShowMenu';

(function() {
	var MainArticles = {
		init: function() {
			var proto = Object.assign({}, this, Component);
			var inst = Object.create(proto);
			// assign the instance constructor to the prototype so 'this' refers to the instance
			proto.constructor = inst;

	      	//init storage
	      	appStateStore.init();
	      	articleListStore.init();
	      	articleTablesStore.init();
	      	articleFilterStore.init();
	      	//only return articles in production mode for searchArticles
	      	articleFilterStore.setData({ mode: 2 });

			//call initialize on Component first
			inst.initialize({
				container: document.querySelector('.articles-container'),
				el: 
				`<div class="main-container"}>
		          <div class="row">
		           <div class="filter-container hide-for-large">
		           </div>
		          </div>
		        </div>`
			});

			const sideMenuTrees = SideMenuArticlesMobile.init();
			inst.el.appendChild(sideMenuTrees.el);

			const gridViewArticles = GridViewArticles.init();
			inst.el.appendChild(gridViewArticles.el);

			const buttonShowMenu = ButtonShowMenu.init();
			inst.el.querySelector('.filter-container').appendChild(buttonShowMenu.el);

			return inst;
		}
	}

	MainArticles.init();
})();