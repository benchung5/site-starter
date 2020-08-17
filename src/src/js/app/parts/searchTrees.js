import Component from '../component';
import { formatSearchString } from '../lib/stringUtils';
import { searchTrees } from '../actions/plants';
import treesFilterStore from '../storage/treesFilterStore';
import { getUrlParams, setUrlParams } from '../lib/utils';
import plantListStore from '../storage/plantListStore';

var SearchTrees = {
	search: function(search) {
		//update the trees filter then search using the updated trees filter
		treesFilterStore.setData({ search: search });
		searchTrees(treesFilterStore.storageData, (apiData) => {
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

		//get the initial search value if in url query
		let search = getUrlParams('search');
		const input = inst.el.querySelector('input[name="search"]');
		if(search) {
			inst.search(search[0]);
			//fill in the search box with the value
			input.value = search[0];
		} else {
			inst.search('');
		}

		if(options.hasButton) {
			const searchButton = inst.createEl('<button type="submit" class="search-button"/>');
			input.before(searchButton);
		}

		return inst;
	}
}

export default SearchTrees;


