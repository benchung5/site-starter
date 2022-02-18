import Component from '../component';
import Button from './button';
import appStateStore from '../storage/appStateStore';

var SideMenuHeader = {
	onItemClick: function() {
		appStateStore.setData({ showMenu: 'close' });
	},
	init: function(options) {
		var proto = Object.assign({}, this, Component);
		var inst = Object.create(proto);
		// assign the instance constructor to the prototype so 'this' refers to the instance
		proto.constructor = inst;

		//call initialize on Component first
		inst.initialize({
			el: 
			`<div class="menu-header">
			</div>`
		});

		if(options.children) {
			inst.el.appendChild(options.children);
		}

		if(options.isClose) {
			const closeButton = Button.init({
				className: 'menu-close',
				name: 'Close',
				onClick: inst.onItemClick.bind(inst)
			});
			const right = inst.createEl(`<div class="menu-header-right"></div>`);
			right.appendChild(closeButton.el)
			inst.el.appendChild(right);
		}

		return inst;
	}
}

export default SideMenuHeader;