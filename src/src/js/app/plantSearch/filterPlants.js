import Component from '../component';
import Dropdown from '../parts/dropdown';
import ButtonList from '../parts/buttonList';
import plantTablesStore from '../storage/plantTablesStore';
import treesFilterStore from '../storage/treesFilterStore';
import plantListStore from '../storage/plantListStore';
import isLoadingStore from '../storage/isLoadingStore';
import { fetchPlantTables, searchTrees } from '../actions/plants';
import { setUrlParams, flattenActiveObjArray } from '../lib/utils';

var PlantFilter = {
	onUpdateCategories: function(modifiedData) {
		//update the hash url with the selected categories
		const categorySlugs = flattenActiveObjArray(modifiedData, 'slug');
		setUrlParams('categories', categorySlugs);

		treesFilterStore.setData({ categoriesTrees: modifiedData });
		//console.log(treesFilterStore.storageData);
		isLoadingStore.setData({ isLoading: true });
		searchTrees(treesFilterStore.storageData, (apiData) => {
			plantListStore.setData(apiData);
			isLoadingStore.setData({ isLoading: false });
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

		fetchPlantTables((apiData) => {
			plantTablesStore.setData(apiData);

			inst.buttonHeight = options.buttonHeight;

			inst.buttonList = ButtonList.init({
				wrapperClass: 'single-col',
				className: '',
				classPropButton: 'list-button check icon',
				buttonHeight: options.buttonHeight,
				buttonData: plantTablesStore.storageData.trees_category_id,
				updateData: inst.onUpdateCategories.bind(inst)
			});

			inst.dropdown = Dropdown.init({
				className: '',
				name: 'Plant Type',
				height: (options.buttonHeight * plantTablesStore.storageData.trees_category_id.length),
				children: inst.buttonList.el,
				active: true
			});

			inst.el.appendChild(inst.dropdown.el);
		});

		return inst;
	}
}

export default PlantFilter;