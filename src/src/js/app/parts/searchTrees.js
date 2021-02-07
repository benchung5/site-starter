import Component from '../component';
import { formatSearchString } from '../lib/stringUtils';
import { searchTrees } from '../actions/plants';
import plantFilterStore from '../storage/plantFilterStore';
import { setUrlParams } from '../lib/utils';
import plantListStore from '../storage/plantListStore';
import appStateStore from '../storage/appStateStore';

var SearchTrees = {
	isClearSearch: function() {
		if (!plantFilterStore.storageData.search) {
			//clear search
			this.input.value = '';
		}
	},
	search: function(search) {
		//update the trees filter then search using the updated trees filter
		//always reset the offset to 0 when searching so you view the first page
		plantFilterStore.setData({ search: search, offset: 0 });
		setUrlParams('offset', 0);
		searchTrees(plantFilterStore.storageData, (apiData) => {
			plantListStore.setData(apiData);
		});
	},
	submitForm: function(e) {
		e.preventDefault();
		let formData = new FormData(e.target);

		let search = formData.get('search');
		search = formatSearchString(search);

		this.search(search);

		//store in the url
		setUrlParams('search', search);
	},
	init: function(options) {
		var proto = Object.assign({}, this, Component)
		var inst = Object.create(proto);
		// assign the instance constructor to the prototype so 'this' refers to the instance
		proto.constructor = inst;

		//call initialize on Component first
		inst.initialize({
			el: 
			`<form class="search-form">
				<input class="form-control" type="text" placeholder="${options.placeholder || ''}" name="search" value="">
			</form>`
		});

		inst.el.addEventListener('submit', inst.submitForm.bind(inst));

		inst.input = inst.el.querySelector('input[name="search"]');

		//fill in the search box with the initial search value if any
		if(plantFilterStore.storageData.search) {
			inst.input.value = plantFilterStore.storageData.search;
		}

		if(options.hasButton) {
			const searchButton = inst.createEl('<button type="submit" class="search-button"/>');
			inst.input.before(searchButton);
		}

		plantFilterStore.addListener(inst.isClearSearch.bind(inst));

		return inst;
	}
}

export default SearchTrees;


