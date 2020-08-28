import Component from '../component';
import Dropdown from '../parts/dropdown';
import ButtonList from '../parts/buttonList';
import articleTablesStore from '../storage/articleTablesStore';
import articleFilterStore from '../storage/articleFilterStore';
import articleListStore from '../storage/articleListStore';

import { fetchArticleTables, searchArticles } from '../actions/articles';
import { setUrlParams, flattenActiveObjArray } from '../lib/utils';

var ArticleFilter = {
	onUpdateCategories: function(modifiedData) {
		//update the hash url with the selected categories
		const categorySlugs = flattenActiveObjArray(modifiedData, 'slug');
		setUrlParams('categories', categorySlugs);
		articleFilterStore.setData({ categories: modifiedData });
		searchArticles(articleFilterStore.storageData, (apiData) => {
			articleListStore.setData(apiData);
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

		fetchArticleTables((apiData) => {
			articleTablesStore.setData({ articles_category_id: apiData });

			inst.buttonHeight = options.buttonHeight;

			inst.buttonList = ButtonList.init({
				wrapperClass: 'single-col',
				className: '',
				classPropButton: 'list-button check icon',
				buttonHeight: options.buttonHeight,
				buttonData: articleTablesStore.storageData.articles_category_id,
				updateData: inst.onUpdateCategories.bind(inst),
				allActive: true
			});

			inst.dropdown = Dropdown.init({
				className: '',
				name: 'Category',
				height: (options.buttonHeight * articleTablesStore.storageData.articles_category_id.length),
				children: inst.buttonList.el,
				active: true
			});

			inst.el.appendChild(inst.dropdown.el);
		});

		return inst;
	}
}

export default ArticleFilter;