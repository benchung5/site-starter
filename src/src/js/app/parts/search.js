import Component from '../component';
import { formatSearchString } from '../lib/stringUtils';
// import { searchTrees } from '../actions/plants';
// import options.filterStore from '../storage/options.filterStore';
// import { setUrlParams } from '../lib/utils';
// import plantListStore from '../storage/plantListStore';

var SearchTrees = {
	isClearSearch: function() {
		if (!this.filterStore.storageData.search) {
			//clear search
			this.input.value = '';
		}
	},
	submitForm: function(e) {
		e.preventDefault();
		let formData = new FormData(e.target);

		let search = formData.get('search');
		search = formatSearchString(search);

		this.search(search);
	},
	init: function(options) {
		var proto = Object.assign({}, this, Component)
		var inst = Object.create(proto);
		// assign the instance constructor to the prototype so 'this' refers to the instance
		proto.constructor = inst;

		inst.filterStore = options.filterStore;
		inst.search = options.search;

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
		if(options.filterStore.storageData.search) {
			inst.input.value = options.filterStore.storageData.search;
		}

		if(options.hasButton) {
			const searchButton = inst.createEl('<button type="submit" class="search-button"/>');
			inst.input.before(searchButton);
		}

		options.filterStore.addListener(inst.isClearSearch.bind(inst));

		return inst;
	}
}

export default SearchTrees;


