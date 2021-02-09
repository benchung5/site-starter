import Component from '../component';
import SideMenuMobile from '../parts/sideMenuMobile';
import GridViewPlants from './gridViewPlants';
import plantTablesStore from '../storage/plantTablesStore';
import plantListStore from '../storage/plantListStore';
import plantFilterStore from '../storage/plantFilterStore';
import ButtonShowMenu from '../parts/buttonShowMenu';
import { updateFilterFromUrl } from '../actions/plants';
import { searchTrees } from '../actions/plants';
import { setUrlParams, flattenActiveObjArray } from '../lib/utils';

(function() {
	var Main = {
		updateOffset: function(newOffset) {
			plantFilterStore.setData({ offset: newOffset });
			setUrlParams('offset', newOffset);
			//search trees
			searchTrees(plantFilterStore.storageData, (apiData) => {
				plantListStore.setData(apiData);
			});
		},
		changeCategories: function(modifiedData) {
			//update the hash url with the selected categories
			const categorySlugs = flattenActiveObjArray(modifiedData, 'slug');
			setUrlParams('categories', categorySlugs);
			//when the fliter changes, reset the page back to 0
			plantFilterStore.setData({ categoriesTrees: modifiedData, offset: 0 });
			setUrlParams('offset', 0);
			searchTrees(plantFilterStore.storageData, (apiData) => {
				plantListStore.setData(apiData);
			});
		},
		search: function(search) {
			//update the trees filter then search using the updated trees filter
			//always reset the offset to 0 when searching so you view the first page
			plantFilterStore.setData({ search: search, offset: 0 });
			setUrlParams('offset', 0);
			setUrlParams('search', search);
			searchTrees(plantFilterStore.storageData, (apiData) => {
				plantListStore.setData(apiData);
			});
		},
		clearSearch: function() {
		    plantFilterStore.setData({ search: '' });
		    searchTrees(plantFilterStore.storageData, (apiData) => {
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

      			const sideMenu = SideMenuMobile.init({
      				changeCategories: inst.changeCategories.bind(inst),
      				search: inst.search.bind(inst),
      				clearSearch: inst.clearSearch.bind(inst),
      				filterStore: plantFilterStore,
      				categories: plantTablesStore.storageData.trees_category_id
      			});
      			inst.el.appendChild(sideMenu.el);

      			const gridViewPlants = GridViewPlants.init({
      				filterStore: plantFilterStore,
      				listStore: plantListStore,
      				updateOffset: inst.updateOffset.bind(inst),
      				changeCategories: inst.changeCategories.bind(inst),
      				categories: plantTablesStore.storageData.trees_category_id,
      				search: inst.search.bind(inst),
      				clearSearch: inst.clearSearch.bind(inst),
      			});
      			inst.el.appendChild(gridViewPlants.el);

      			const buttonShowMenu = ButtonShowMenu.init();
      			inst.el.querySelector('.filter-container').appendChild(buttonShowMenu.el);
	      	});

			return inst;
		}
	}

	Main.init();
})();