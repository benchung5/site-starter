import Component from '../component';
import Dropdown from './dropdown';
import ButtonList from './buttonList';
// import tablesStore from '../storage/tablesStore';
// import plantFilterStore from '../storage/plantFilterStore';
// import plantListStore from '../storage/plantListStore';

var PlantFilter = {
	onUpdateCategories: function(modifiedData) {
		this.changeCategories(modifiedData);
	},
	init: function(options) {
		var proto = Object.assign({}, this, Component);
		var inst = Object.create(proto);
		// assign the instance constructor to the prototype so 'this' refers to the instance
		proto.constructor = inst;

		// inst.filterStore = options.filterStore;

		//call initialize on Component first
		inst.initialize({
			el: 
			`<div></div>`
		});

		inst.buttonHeight = options.buttonHeight;
		inst.changeCategories = options.changeCategories;

		inst.buttonList = ButtonList.init({
			wrapperClass: 'single-col',
			className: '',
			classPropButton: 'list-button check icon',
			buttonHeight: options.buttonHeight,
			//buttonData: options.tablesStore.storageData.trees_category_id,
			buttonData: options.categories,
			updateData: inst.onUpdateCategories.bind(inst),
			allActive: true
		});

		inst.dropdown = Dropdown.init({
			className: '',
			name: 'Plant Type',
			//height: (options.buttonHeight * options.tablesStore.storageData.trees_category_id.length),
			height: (options.buttonHeight * options.categories),
			children: inst.buttonList.el,
			active: true
		});

		inst.el.appendChild(inst.dropdown.el);

		return inst;
	}
}

export default PlantFilter;