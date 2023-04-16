import Component from '../component';
import { setUrlParams, flattenObjArray, clone } from '../lib/utils';
import FieldMultiSelect from '../admin/parts/fieldMultiSelect';
import FieldInput from '../admin/parts/fieldInput';
import appStateStore from '../storage/appStateStore';

var FilterPlants = {
	submitForm: function(e) {
		//prevent form from refreshing the page
		e.preventDefault();
		let formData = new FormData(e.target);
		let formDataArray = Array.from(formData);
		let filterStoreClone = clone(this.filterStore.storageData);

		let modifiedFormData = formDataArray.map((item) => {
			if(item[0] == 'search') {
				Object.assign(filterStoreClone, { [item[0]]: item[1] });
				setUrlParams([item[0]], item[1]);
			} else {
				let filterObjsArr = [];
				let ids = item[1].split(",");
				let filterObjs = ids.map((id) => {
					this.tablesStore[item[0]].map((itemInnerInner) => {
						if (itemInnerInner.id == id) {
							filterObjsArr.push(clone(itemInnerInner));
						}
					});
				});
				Object.assign(filterStoreClone, { [item[0]]: filterObjsArr });

				//update the hash url with the selected items
				const filterObjsArrSlugs = flattenObjArray(filterObjsArr, 'slug');
				setUrlParams([item[0]], filterObjsArrSlugs);
			}

		});

		//lastly, update the offset and close the mobile menu if open
		Object.assign(filterStoreClone, { offset: 0});
		appStateStore.setData({ showMenu: 'close' });

		this.filterStore.setData(filterStoreClone);
		this.onUpdate();
	},
	init: function(options) {
		var proto = Object.assign({}, this, Component);
		var inst = Object.create(proto);
		// assign the instance constructor to the prototype so 'this' refers to the instance
		proto.constructor = inst;

		// call initialize on Component first
		inst.initialize({
			el: 
			`<div class="search-filter">
		      <form>
                  <div id="form-fields">
                  </div>
                  <button action="submit" class="btn btn-primary">Search Plants</button>
                  <br/>
                  <br/>
                  <p>
                  	Use the above filter to search trees, shrubs, and woody plants native to Canada.
      			  	Currently we only carry plants native to the Pacific North West but feel free to use our search tool for other native Canadian plants.
      			  </p>
      			  <br/>
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
			label: 'plant name',
			error: null,
			condition: null,
			value: inst.filterStore.storageData.search
		});
		inst.formFields.appendChild(input.el);

		let trees_category_idMultiSelect = FieldMultiSelect.init({
			name: 'trees_category_id',
			label: 'plant type',
			error: null,
			condition: null,
			value: inst.filterStore.storageData.trees_category_id,
			selectItems: options.tablesStore.trees_category_id
		});
		inst.formFields.appendChild(trees_category_idMultiSelect.el);

		let nativeToMultiSelect = FieldMultiSelect.init({
			name: 'native_to',
			label: 'native to',
			error: null,
			condition: null,
			value: inst.filterStore.storageData.native_to,
			selectItems: options.tablesStore.native_to
		});
		inst.formFields.appendChild(nativeToMultiSelect.el);

		inst.form.addEventListener('submit', inst.submitForm.bind(inst));

		return inst;
	}
}

export default FilterPlants;