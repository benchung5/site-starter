import Component from '../component';
import Dropdown from '../parts/dropdown';
import ButtonList from '../parts/buttonList';
import plantTablesStore from '../storage/plantTablesStore';
import { fetchPlantTables } from '../actions/plants';

var PlantFilter = {
	onUpdateCategories: function(modifiedData) {
		//console.log(modifiedData);

		// //update the hash url with the selected categories
		// let categorySlugs = flattenActiveObjArray(modifiedData, 'slug');
		// setUrlParams('categories', categorySlugs);

		// // dispatch action
		// this.props.dispatch(filterCategoriesTrees(modifiedData));
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