import Component from '../component';
import showMenuStore from '../storage/showMenuStore';

var ButtonShowMenu = {
	onButtonClick: function(e) {
		e.preventDefault();

		// if(showMenuStore.storageData.showMenu === 'open') {
		// 	showMenuStore.setData({ showMenu: 'close' });
		// } else {
			
		// }

		showMenuStore.setData({ showMenu: 'open' });

		console.log(showMenuStore.storageData.showMenu);
	},
	init: function() {
		var proto = Object.assign({}, this, Component);
		var inst = Object.create(proto);
		// assign the instance constructor to the prototype so 'this' refers to the instance
		proto.constructor = inst;


		//call initialize on Component first
		inst.initialize({
			el: `<div className="filter">
					<a
					href="#"
					id="side-menu-toggle"
					class="show-menu-mobile ${showMenuStore.storageData.showMenu}" 
					style="cursor: pointer; display: block;"
					data-id="side-menu-toggle"
					alt="Side Menu"
					>
						<img className="filter-icon" src="/assets/img/icons/menu.svg"/>
					</a>
				</div>`
		});

		inst.el.addEventListener('click', inst.onButtonClick.bind(inst), false);

		return inst;
	}
}

export default ButtonShowMenu;