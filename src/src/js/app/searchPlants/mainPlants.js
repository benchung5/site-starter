import Component from '../component';
import SideMenuMobile from '../parts/sideMenuMobile';
import GridViewPlants from './gridViewPlants';
import SideMenu from '../parts/sideMenu';
import FilterPlants from './filterPlants';
import plantTablesStore from '../storage/plantTablesStore';
import plantListStore from '../storage/plantListStore';
import plantFilterStore from '../storage/plantFilterStore';
import appStateStore from '../storage/appStateStore';
import ButtonShowMenu from '../parts/buttonShowMenu';
import { searchTrees, updateFilterFromUrl } from '../actions/plants';

(function() {
	var Main = {
		onUpdate: function(filterData) {
		if (this.gridViewPlants && this.gridViewPlants.loader) {
			this.gridViewPlants.loader.isLoading(true);
		}
			//search trees
			searchTrees(filterData || plantFilterStore.storageData, (apiData) => {
				plantListStore.setData(apiData);
			});
		},
		init: function() {

			var proto = Object.assign({}, this, Component);
			var inst = Object.create(proto);
			// assign the instance constructor to the prototype so 'this' refers to the instance
			proto.constructor = inst;

	      	//init storage
	      	appStateStore.init();
	      	plantListStore.init();
	      	plantTablesStore.init();
	      	plantFilterStore.init();
	      	//only return plants in production mode for searchPlants
	      	plantFilterStore.setData({ mode: 2 });

	      	const appContainer = document.querySelector('.plant-search-container');
	      	const pagePlaceholder = document.createElement('div');
	      	pagePlaceholder.className = 'page-loading-placeholder page-loading-placeholder--plants';
	      	pagePlaceholder.innerHTML = `
	      		<div class="row grid-view-inner">
	      			<div class="left"></div>
	      			<div class="right">
	      				<div class="cards-container page-placeholder-grid">
	      					${Array.from({ length: 8 }).map(() => `
	      						<div class="product-card placeholder-card">
	      							<div class="inner">
	      								<div class="image">
	      									<div class="placeholder-image skeleton"></div>
	      								</div>
	      								<div class="info">
	      									<div class="placeholder-line skeleton"></div>
	      									<div class="placeholder-line short skeleton"></div>
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
      				container: document.querySelector('.plant-search-container'),
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

				let title = 'Search Northern Medicinal Plants';

      			const sideMenuMobile = SideMenuMobile.init({
					title: title,
      				onUpdate: inst.onUpdate.bind(inst),
      				filterStore: plantFilterStore,
      				tablesStore: plantTablesStore.storageData,
					filterComponent: FilterPlants
      			});
      			inst.el.appendChild(sideMenuMobile.el);

      			const gridViewPlants = GridViewPlants.init({
      				filterStore: plantFilterStore,
      				listStore: plantListStore,
      				onUpdate: inst.onUpdate.bind(inst),
      				tablesStore: plantTablesStore.storageData
      			});
      			inst.el.appendChild(gridViewPlants.el);
			inst.gridViewPlants = gridViewPlants;

			const sideMenu = SideMenu.init({
				title: title,
				onUpdate: inst.onUpdate.bind(inst),
				filterStore: plantFilterStore,
				tablesStore: plantTablesStore.storageData,
				filterComponent: FilterPlants
			});
			gridViewPlants.el.querySelector('.left').appendChild(sideMenu.el);

      			const buttonShowMenu = ButtonShowMenu.init({ searchText: 'Search Plants' });
      			inst.el.querySelector('.filter-container').appendChild(buttonShowMenu.el);
	      	});

			return inst;
		}
	}

	Main.init();
})();