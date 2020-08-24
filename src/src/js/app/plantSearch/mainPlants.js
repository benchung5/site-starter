import Component from '../component';
import SideMenuPlantsMobile from './sideMenuPlantsMobile';
import GridViewPlants from './gridViewPlants';
import showMenuStore from '../storage/showMenuStore';
import plantTablesStore from '../storage/plantTablesStore';
import plantListStore from '../storage/plantListStore';
import treesFilterStore from '../storage/treesFilterStore';
import isLoadingStore from '../storage/isLoadingStore';
import ButtonShowMenu from '../parts/buttonShowMenu';

var Main = {
	updateOnlineStatus: function(e) {
	  var condition = navigator.onLine ? "online" : "offline";

	  if(condition == 'offline') {
	   this.isOnline(false);
	  } else {
	   this.isOnline(true);
	  }
	  console.log(inst.isOnline);
	},
	init: function() {
		var proto = Object.assign({}, this, Component);
		var inst = Object.create(proto);
		// assign the instance constructor to the prototype so 'this' refers to the instance
		proto.constructor = inst;

      	// tell users that they are offline/online
     	window.addEventListener('online',  inst.updateOnlineStatus);
      	window.addEventListener('offline', inst.updateOnlineStatus);

      	//init storage
      	showMenuStore.init();
      	plantListStore.init();
      	plantTablesStore.init();
      	treesFilterStore.init();
      	isLoadingStore.init();

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

export default Main;