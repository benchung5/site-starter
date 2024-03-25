import Component from '../component';
import { formatSearchString } from '../lib/stringUtils';
import { searchArticles } from '../actions/articles';
import articleFilterStore from '../storage/articleFilterStore';
import { getUrlParams, setUrlParams } from '../lib/utils';
import articleListStore from '../storage/articleListStore';
import appStateStore from '../storage/appStateStore';

var SearchArticles = {
	isClearSearch: function() {
		if (appStateStore.storageData.clearSearch) {
			//clear search
			this.input.value = '';
		}
	},
	search: function(search) {
		//update the article filter then search using the updated article filter
		articleFilterStore.setData({ search: search });
		searchArticles(articleFilterStore.storageData, (apiData) => {
			articleListStore.setData(apiData);
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
		inst.input = inst.el.querySelector('input[name="search"]');
		if(search) {
			inst.search(search[0]);
			//fill in the search box with the value
			inst.input.value = search[0];
		} else {
			inst.search('');
		}

		if(options.hasButton) {
			const searchButton = inst.createEl('<button type="submit" class="search-button"/>');
			inst.input.before(searchButton);
		}

		appStateStore.addListener(inst.isClearSearch.bind(inst));

		return inst;
	}
}

export default SearchArticles;


