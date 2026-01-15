import Component from '../component';
import { setUrlParams, flattenObjArray, clone } from '../lib/utils';
import FieldMultiSelect from '../admin/parts/fieldMultiSelect';
import FieldInput from '../admin/parts/fieldInput';
import appStateStore from '../storage/appStateStore';

var ArticleFilter = {
	submitForm: function(e) {
		e.preventDefault();
		let formData = new FormData(e.target);
		let formDataArray = Array.from(formData);
		let filterStoreClone = clone(this.filterStore.storageData);
		filterStoreClone.categories = [];
		const submittedMap = new Map(formDataArray.map((item) => [item[0], item[1]]));

		formDataArray.map((item) => {
			if (item[0] === 'search') {
				Object.assign(filterStoreClone, { search: item[1] });
				setUrlParams('search', item[1]);
			} else if (item[0] === 'categories') {
				if (!item[1]) {
					setUrlParams('categories', []);
					filterStoreClone.categories = [];
					return;
				}
				let filterObjsArr = [];
				let ids = item[1]
					.split(',')
					.map((id) => id.trim())
					.filter((id) => id.length);
				ids = Array.from(new Set(ids));
				ids.map((id) => {
					this.tablesStore.categories.map((cat) => {
						if (cat.id == id) {
							filterObjsArr.push(clone(cat));
						}
					});
				});
				Object.assign(filterStoreClone, { categories: filterObjsArr });

				let categorySlugs = flattenObjArray(filterObjsArr, 'slug') || [];
				categorySlugs = Array.from(new Set(categorySlugs));
				if (categorySlugs.length) {
					setUrlParams('categories', categorySlugs);
				} else {
					setUrlParams('categories', []);
					filterStoreClone.categories = [];
				}
			}
		});

		// clear url params when categories not submitted
		if (!submittedMap.get('categories')) {
			setUrlParams('categories', []);
			filterStoreClone.categories = [];
		}

		Object.assign(filterStoreClone, { offset: 0 });
		appStateStore.setData({ showMenu: false });

		this.filterStore.setData(filterStoreClone);
		this.onUpdate(filterStoreClone);
	},
	init: function(options) {
		var proto = Object.assign({}, this, Component);
		var inst = Object.create(proto);
		proto.constructor = inst;

		inst.initialize({
			el:
			`<div class="search-filter">
		      <form>
                  <div id="form-fields">
                  </div>
                  <button action="submit" class="btn btn-primary">Search Articles</button>
              </form>
			</div>`
		});

		inst.onUpdate = options.onUpdate;
		inst.filterStore = options.filterStore;
		inst.tablesStore = options.tablesStore;

		inst.form = inst.el.querySelector('form');
		inst.formFields = inst.el.querySelector('#form-fields');

		let input = FieldInput.init({
			name: 'search',
			label: 'article name',
			error: null,
			condition: null,
			value: inst.filterStore.storageData.search,
			clearable: true
		});
		inst.formFields.appendChild(input.el);

		let categoryMultiSelect = FieldMultiSelect.init({
			name: 'categories',
			label: 'category',
			error: null,
			condition: null,
			value: inst.filterStore.storageData.categories,
			selectItems: options.tablesStore.categories
		});
		inst.formFields.appendChild(categoryMultiSelect.el);

		inst.form.addEventListener('submit', inst.submitForm.bind(inst));

		return inst;
	}
}

export default ArticleFilter;