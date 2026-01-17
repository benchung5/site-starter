import Component from '../component';
import GridViewArticles from './gridViewArticles';
import SideMenuMobile from '../parts/sideMenuMobile';
import FilterArticles from './filterArticles';
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

	      	const appContainer = document.querySelector('.articles-container');
	      	const pagePlaceholder = document.createElement('div');
	      	pagePlaceholder.className = 'page-loading-placeholder page-loading-placeholder--articles';
	      	pagePlaceholder.innerHTML = `
	      		<div class="row grid-view-inner">
	      			<div class="left"></div>
	      			<div class="right">
	      				<div class="articles-container page-placeholder-articles">
	      					${Array.from({ length: 5 }).map(() => `
	      						<div class="article-row placeholder-card">
	      							<div class="inner">
	      								<div class="image">
	      									<div class="placeholder-image skeleton"></div>
	      								</div>
	      								<div class="info">
	      									<div class="info-body">
	      										<div class="placeholder-line skeleton"></div>
	      										<div class="placeholder-line skeleton"></div>
	      										<div class="placeholder-line short skeleton"></div>
	      									</div>
	      								</div>
	      							</div>
	      						</div>
	      					`).join('')}
	      				</div>
	      			</div>
	      		</div>
	      	`;
	      	if (appContainer) {
	      		appContainer.appendChild(pagePlaceholder);
	      	}

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

				if (pagePlaceholder && pagePlaceholder.parentNode) {
					pagePlaceholder.parentNode.removeChild(pagePlaceholder);
				}

      			const sideMenuMobile = SideMenuMobile.init({
      				title: 'Search Articles',
      				onUpdate: inst.onUpdate.bind(inst),
      				filterStore: articleFilterStore,
      				tablesStore: articleTablesStore.storageData,
					filterComponent: FilterArticles
      			});
      			inst.el.appendChild(sideMenuMobile.el);

      			const gridViewArticles = GridViewArticles.init({
      				filterStore: articleFilterStore,
      				listStore: articleListStore,
      				onUpdate: inst.onUpdate.bind(inst),
      				tablesStore: articleTablesStore.storageData,
					filterComponent: FilterArticles
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