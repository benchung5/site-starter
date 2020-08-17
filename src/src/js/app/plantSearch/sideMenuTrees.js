import Component from '../component';
import SearchTrees from '../parts/searchTrees';
import SideMenuHeader from '../parts/sideMenuHeader';
import showMenuStore from '../storage/showMenuStore';
import { addClass, removeClass } from '../lib/utils';
import animation from '../animation';

var SideMenu = {
	hideShowMenu() {
		if(showMenuStore.storageData.showMenu == 'close') {
			animation.animate(this.el, {
				duration: 0.6,
				ease: 'ease-in-out',
				property: 'transform',
				propertyTo: 'translateX(-100%)',
				onEnd: () => {
					addClass(this.el, 'close');
					removeClass(this.el, 'open');
				},
			});

		} else if(showMenuStore.storageData.showMenu == 'open') {
			animation.animate(this.el, {
				duration: 0.6,
				ease: 'ease-in-out',
				property: 'transform',
				propertyTo: 'translateX(0)',
			});
			addClass(this.el, 'open');
			removeClass(this.el, 'close');
		}
	},
	init: function(options) {
		var proto = Object.assign({}, this, Component);
		var inst = Object.create(proto);
		// assign the instance constructor to the prototype so 'this' refers to the instance
		proto.constructor = inst;

		//call initialize on Component first
		inst.initialize({
			el: 
			`<div class="side-menu-mobile ${showMenuStore.storageData.showMenu}">
			  <div id="side-menu-header"></div>
              <div class="bottom">
              </div>
            </div>`
		});

		const searchTrees = SearchTrees.init({
			placeholder: 'Search Tree Name',
			hasButton: true
		});
		const sideMenuHeader = SideMenuHeader.init({
			isClose: true,
			children: searchTrees.el
		});
		inst.el.querySelector('#side-menu-header').appendChild(sideMenuHeader.el);

		showMenuStore.addListener(inst.hideShowMenu.bind(inst));

		return inst;
	}
}

export default SideMenu;