import Component from '../component';
import SideMenuArticlesMobile from './sideMenuArticlesMobile';
import GridViewArticles from './gridViewArticles';
import appStateStore from '../storage/appStateStore';
import articleTablesStore from '../storage/articleTablesStore';
import articleListStore from '../storage/articleListStore';
import articleFilterStore from '../storage/articleFilterStore';
import ButtonShowMenu from '../parts/buttonShowMenu';
import { searchArticles, updateFilterFromUrl } from '../actions/articles';

(function() {
	var MainArticles = {
		onUpdate: function(filterData) {
			if (this.gridViewArticles && this.gridViewArticles.loader) {
				this.gridViewArticles.loader.isLoading(true);
			}
			//search articles
			searchArticles(filterData || articleFilterStore.storageData, (apiData) => {
				articleListStore.setData(apiData);
			});
		},
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

	      	//get the filter settings from the url
	      	updateFilterFromUrl(() => {
	      			//call initialize on Component first
	      			inst.initialize({
	      				container: document.querySelector('.articles-container'),
	      				el: 
	      				`<div class="main-container"}>
	      		          <div class="row">
	      		           <div class="filter-container">
	      		           </div>
	      		          </div>
	      		        </div>`
	      			});

	      			const sideMenuArticles = SideMenuArticlesMobile.init({
	      				onUpdate: inst.onUpdate.bind(inst),
	      				filterStore: articleFilterStore,
	      				categories: articleTablesStore.storageData.categories
	      			});
	      			inst.el.appendChild(sideMenuArticles.el);

      			const gridViewArticles = GridViewArticles.init({
	      				filterStore: articleFilterStore,
	      				listStore: articleListStore,
	      				onUpdate: inst.onUpdate.bind(inst),
	      				categories: articleTablesStore.storageData.categories,
	      			});
	      			inst.el.appendChild(gridViewArticles.el);
				inst.gridViewArticles = gridViewArticles;

	      			const buttonShowMenu = ButtonShowMenu.init();
	      			inst.el.querySelector('.filter-container').appendChild(buttonShowMenu.el);
	      	});

			return inst;
		}
	}

	MainArticles.init();
})();