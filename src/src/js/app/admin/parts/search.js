import Component from '../../component';
import { formatSearchString } from '../../lib/stringUtils';
import { setUrlParams } from '../../lib/utils';

var SearchTrees = {
	updateSearchInput: function() {
		this.input.value = this.filterStore.storageData.search;
	},
	search: function(search) {
		//update the trees filter then search using the updated trees filter
		//always reset the offset to 0 when searching so you view the first page
		this.filterStore.setData({ search: search, offset: 0 });
		setUrlParams('offset', 0);
		setUrlParams('search', search);
		this.onUpdate();
	},
	submitForm: function(e) {
		e.preventDefault();
		let formData = new FormData(e.target);
		let search = formData.get('search');
		this.search(search);
	},
	init: function(options) {
		var proto = Object.assign({}, this, Component)
		var inst = Object.create(proto);
		// assign the instance constructor to the prototype so 'this' refers to the instance
		proto.constructor = inst;

		inst.filterStore = options.filterStore;
		inst.onUpdate = options.onUpdate;

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

		options.filterStore.addListener(inst.updateSearchInput.bind(inst));

		return inst;
	}
}

export default SearchTrees;


