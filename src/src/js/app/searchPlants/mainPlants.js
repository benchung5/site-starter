import Component from '../component';
import SideMenuMobile from '../parts/sideMenuMobile';
import GridViewPlants from './gridViewPlants';
import plantTablesStore from '../storage/plantTablesStore';
import plantListStore from '../storage/plantListStore';
import plantFilterStore from '../storage/plantFilterStore';
import appStateStore from '../storage/appStateStore';
import ButtonShowMenu from '../parts/buttonShowMenu';
import { searchTrees, updateFilterFromUrl } from '../actions/plants';

(function() {
	var Main = {
		onUpdate: function() {
			//search trees
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

      			const sideMenuMobile = SideMenuMobile.init({
      				onUpdate: inst.onUpdate.bind(inst),
      				filterStore: plantFilterStore,
      				categories: plantTablesStore.storageData.trees_category_id
      			});
      			inst.el.appendChild(sideMenuMobile.el);

      			const gridViewPlants = GridViewPlants.init({
      				filterStore: plantFilterStore,
      				listStore: plantListStore,
      				onUpdate: inst.onUpdate.bind(inst),
      				categories: plantTablesStore.storageData.trees_category_id,
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