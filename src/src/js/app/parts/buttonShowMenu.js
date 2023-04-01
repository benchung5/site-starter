import Component from '../component';
import appStateStore from '../storage/appStateStore';

var ButtonShowMenu = {
	onButtonClick: function(e) {
		e.preventDefault();
		if (appStateStore.storageData.showMenu == 'open') {
			appStateStore.setData({ showMenu: 'close' });
		} else {
			appStateStore.setData({ showMenu: 'open' });
		}
	},
	init: function(options) {
		var proto = Object.assign({}, this, Component);
		var inst = Object.create(proto);
		// assign the instance constructor to the prototype so 'this' refers to the instance
		proto.constructor = inst;

		let searchText = '';
		if (arguments.length == 0){
			searchText = 'Search';
		} else {
			searchText = options.searchText;
		}


		//call initialize on Component first
		inst.initialize({
			el: `<div class="filter">
					<a
					href="#"
					id="side-menu-toggle"
					class="show-menu-mobile ${appStateStore.storageData.showMenu}" 
					style="cursor: pointer;"
					data-id="side-menu-toggle"
					alt="Side Menu"
					>
						<div class="filter-text">${searchText}</div><div class="filter-icon"></div>
					</a>
				</div>`
		});

		inst.el.addEventListener('click', inst.onButtonClick.bind(inst), false);

		return inst;
	}
}

export default ButtonShowMenu;