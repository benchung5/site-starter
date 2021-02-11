import Component from '../component';
import Dropdown from './dropdown';
import ButtonList from './buttonList';
import { setUrlParams, flattenActiveObjArray } from '../lib/utils';
// import tablesStore from '../storage/tablesStore';
// import plantFilterStore from '../storage/plantFilterStore';
// import plantListStore from '../storage/plantListStore';

var PlantFilter = {
	changeCategories: function(modifiedData) {
		//update the hash url with the selected categories
		const categorySlugs = flattenActiveObjArray(modifiedData, 'slug');
		setUrlParams('categories', categorySlugs);
		//when the fliter changes, reset the page back to 0
		this.filterStore.setData({ categoriesTrees: modifiedData, offset: 0 });
		setUrlParams('offset', 0);
		this.onUpdate();
	},
	init: function(options) {
		var proto = Object.assign({}, this, Component);
		var inst = Object.create(proto);
		// assign the instance constructor to the prototype so 'this' refers to the instance
		proto.constructor = inst;

		//call initialize on Component first
		inst.initialize({
			el: 
			`<div></div>`
		});

		inst.buttonHeight = options.buttonHeight;
		inst.onUpdate = options.onUpdate;
		inst.filterStore = options.filterStore;

		inst.buttonList = ButtonList.init({
			wrapperClass: 'single-col',
			className: '',
			classPropButton: 'list-button check icon',
			buttonHeight: options.buttonHeight,
			//buttonData: options.tablesStore.storageData.trees_category_id,
			buttonData: options.categories,
			updateData: inst.changeCategories.bind(inst),
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