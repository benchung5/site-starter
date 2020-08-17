import Component from '../component';
import SideMenuTrees from './SideMenuTrees';
import showMenuStore from '../storage/showMenuStore';
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

		const sideMenuTrees = SideMenuTrees.init({});
		inst.el.appendChild(sideMenuTrees.el);

		const buttonShowMenu = ButtonShowMenu.init();
		inst.el.querySelector('.filter-container').appendChild(buttonShowMenu.el);

		return inst;
	}
}

export default Main;