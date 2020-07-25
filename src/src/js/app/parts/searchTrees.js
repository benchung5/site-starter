import Component from '../component';
import { formatSearchString } from '../lib/stringUtils';
import { searchTrees } from '../actions/trees';
import treesFilter from '../storage/treesFilter';
import { getUrlParams, setUrlParams } from '../lib/utils';
import plantList from '../storage/plantList';

var SearchTrees = {
	search: function(search) {
		//update the trees filter then search using the updated trees filter
		treesFilter.setData({ search: search });
		searchTrees(treesFilter.storageData, (apiData) => {
			plantList.setData(apiData);
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
	init: function() {
		var proto = Object.assign({}, this, Component)
		var inst = Object.create(proto);
		// assign the instance constructor to the prototype so 'this' refers to the instance
		proto.constructor = inst;

		//call initialize on Component first
		inst.initialize({
			el: 
			`<form class="search-form">
				<input class="form-control" type="text" placeholder="search" name="search" value="">
			</form>`
		});

		inst.el.addEventListener('submit', inst.submitForm.bind(inst));

		//get the initial search value if in url query
		let search = getUrlParams('search');
		if(search) {
			this.search(search[0]);
			//fill in the search box with the value
			inst.el.querySelector('input[name="search"]').value = search[0];
		}

		return inst;
	}
}

export default SearchTrees;


