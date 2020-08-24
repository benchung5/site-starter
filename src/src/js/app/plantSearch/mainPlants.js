import Component from '../component';
import SideMenuPlantsMobile from './sideMenuPlantsMobile';
import GridViewPlants from './gridViewPlants';
import appStateStore from '../storage/appStateStore';
import plantTablesStore from '../storage/plantTablesStore';
import plantListStore from '../storage/plantListStore';
import treesFilterStore from '../storage/treesFilterStore';
import ButtonShowMenu from '../parts/buttonShowMenu';

(function() {
	var Main = {
		init: function() {
			var proto = Object.assign({}, this, Component);
			var inst = Object.create(proto);
			// assign the instance constructor to the prototype so 'this' refers to the instance
			proto.constructor = inst;

	      	//init storage
	      	appStateStore.init();
	      	plantListStore.init();
	      	plantTablesStore.init();
	      	treesFilterStore.init();

			//call initialize on Component first
			inst.initialize({
				container: document.querySelector('.plant-search-container'),
				el: 
				`<div class="main-container"}>
		          <div class="row">
		           <div class="filter-container hide-for-large">
		           </div>
		          </div>
		        </div>`
			});

			const sideMenuTrees = SideMenuPlantsMobile.init();
			inst.el.appendChild(sideMenuTrees.el);

			const gridViewPlants = GridViewPlants.init();
			inst.el.appendChild(gridViewPlants.el);

			const buttonShowMenu = ButtonShowMenu.init();
			inst.el.querySelector('.filter-container').appendChild(buttonShowMenu.el);

			return inst;
		}
	}

	Main.init();
})();