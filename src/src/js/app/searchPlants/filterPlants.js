import Component from '../component';
import Dropdown from '../parts/dropdown';
import ButtonList from '../parts/buttonList';
import plantTablesStore from '../storage/plantTablesStore';
import plantFilterStore from '../storage/plantFilterStore';
import plantListStore from '../storage/plantListStore';

import { fetchPlantTables, searchTrees } from '../actions/plants';
import { setUrlParams, flattenActiveObjArray } from '../lib/utils';

var PlantFilter = {
	onUpdateCategories: function(modifiedData) {
		//update the hash url with the selected categories
		const categorySlugs = flattenActiveObjArray(modifiedData, 'slug');
		setUrlParams('categories', categorySlugs);
		//when the fliter changes, reset the page back to 0
		plantFilterStore.setData({ categoriesTrees: modifiedData, offset: 0 });
		setUrlParams('offset', 0);
		searchTrees(plantFilterStore.storageData, (apiData) => {
			plantListStore.setData(apiData);
		});

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

		inst.buttonList = ButtonList.init({
			wrapperClass: 'single-col',
			className: '',
			classPropButton: 'list-button check icon',
			buttonHeight: options.buttonHeight,
			buttonData: plantTablesStore.storageData.trees_category_id,
			updateData: inst.onUpdateCategories.bind(inst),
			allActive: true
		});

		inst.dropdown = Dropdown.init({
			className: '',
			name: 'Plant Type',
			height: (options.buttonHeight * plantTablesStore.storageData.trees_category_id.length),
			children: inst.buttonList.el,
			active: true
		});

		inst.el.appendChild(inst.dropdown.el);

		return inst;
	}
}

export default PlantFilter;