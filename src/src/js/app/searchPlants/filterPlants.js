import Component from '../component';
import { setUrlParams, flattenObjArray, clone, removeClass } from '../lib/utils';
import FieldMultiSelect from '../admin/parts/fieldMultiSelect';
import FieldInput from '../admin/parts/fieldInput';
import appStateStore from '../storage/appStateStore';

const MULTI_SELECT_KEYS = ['trees_category_id', 'light', 'soil', 'native_to', 'natural_habitat', 'common_uses', 'unique_attractions', 'eco_benefits', 'tastes', 'organ_systems', 'thermal_nature', 'moisture', 'parts_used', 'preparations', 'organs_and_tissue'];

var FilterPlants = {
	resetForm: function(e) {
		e.preventDefault();
		const resetData = Object.assign({}, this.filterStore.storageData, {
			search: '',
			trees_category_id: [],
			light: [],
			soil: [],
			native_to: [],
			natural_habitat: [],
			common_uses: [],
			unique_attractions: [],
			eco_benefits: [],
			tastes: [],
			organ_systems: [],
			thermal_nature: [],
			moisture: [],
			parts_used: [],
			preparations: [],
			organs_and_tissue: [],
			offset: 0
		});
		MULTI_SELECT_KEYS.forEach((key) => setUrlParams(key, []));
		setUrlParams('search', '');
		this.filterStore.setData(resetData);
		// Clear form UI
		const searchInput = this.form.querySelector('input[name="search"]');
		if (searchInput) searchInput.value = '';
		MULTI_SELECT_KEYS.forEach((key) => {
			const hiddenInput = this.form.querySelector(`input[name="${key}"]`);
			if (hiddenInput) hiddenInput.value = '';
		});
		this.form.querySelectorAll('.multiselect .option.selected').forEach((el) => removeClass(el, 'selected'));
		appStateStore.setData({ showMenu: false });
		this.onUpdate(resetData);
	},
	submitForm: function(e) {
		//prevent form from refreshing the page
		e.preventDefault();
		let formData = new FormData(e.target);
		let formDataArray = Array.from(formData);
		let filterStoreClone = clone(this.filterStore.storageData);
		// reset multi-select filters so deselecting clears prior selections
		filterStoreClone.trees_category_id = [];
		filterStoreClone.light = [];
		filterStoreClone.soil = [];
		filterStoreClone.native_to = [];
		filterStoreClone.natural_habitat = [];
		filterStoreClone.common_uses = [];
		filterStoreClone.unique_attractions = [];
		filterStoreClone.eco_benefits = [];
		filterStoreClone.tastes = [];
		filterStoreClone.organ_systems = [];
		filterStoreClone.thermal_nature = [];
		filterStoreClone.moisture = [];
		filterStoreClone.parts_used = [];
		filterStoreClone.preparations = [];
		filterStoreClone.organs_and_tissue = [];
		const submittedMap = new Map(formDataArray.map((item) => [item[0], item[1]]));

		let modifiedFormData = formDataArray.map((item) => {
			if(item[0] == 'search') {
				Object.assign(filterStoreClone, { [item[0]]: item[1] });
				setUrlParams(item[0], item[1]);
			} else {
				if (!item[1]) {
					setUrlParams(item[0], []);
					filterStoreClone[item[0]] = [];
					return;
				}
				let filterObjsArr = [];
				let ids = item[1]
					.split(",")
					.map((id) => id.trim())
					.filter((id) => id.length);
				ids = Array.from(new Set(ids));
				let filterObjs = ids.map((id) => {
					this.tablesStore[item[0]].map((itemInnerInner) => {
						if (itemInnerInner.id == id) {
							filterObjsArr.push(clone(itemInnerInner));
						}
					});
				});
				Object.assign(filterStoreClone, { [item[0]]: filterObjsArr });

				//update the hash url with the selected items
				let filterObjsArrSlugs = flattenObjArray(filterObjsArr, 'slug') || [];
				filterObjsArrSlugs = Array.from(new Set(filterObjsArrSlugs));
				if (filterObjsArrSlugs.length) {
					setUrlParams(item[0], filterObjsArrSlugs);
				} else {
					setUrlParams(item[0], []);
					filterStoreClone[item[0]] = [];
				}
			}
		// clear url params for multi-selects that have no selections submitted
		MULTI_SELECT_KEYS.forEach((key) => {
			const submittedValue = submittedMap.get(key);
			if (!submittedValue) {
				setUrlParams(key, []);
				filterStoreClone[key] = [];
			}
		});

		});

		//lastly, update the offset and close the mobile menu if open
		Object.assign(filterStoreClone, { offset: 0});
		appStateStore.setData({ showMenu: false });

		this.filterStore.setData(filterStoreClone);
		this.onUpdate(filterStoreClone);
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
                  <div class="filter-actions">
                    <button type="button" class="btn btn-secondary filter-reset">Reset selection</button>
                    <button type="submit" class="btn btn-primary">Search Plants</button>
                  </div>
                  <br/>
                  <br/>
                  <p>
                  	Use the above filter to search for traditionally used medicinal plants of the north, hardy to zone 4.
      			  	<br/>
					<italic>
						Note: The fields in this filter and plant listings are intended for education use and are not a substitute for 
						professional medical advice.
					</italic>
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
			label: 'Plant name',
			error: null,
			condition: null,
			value: inst.filterStore.storageData.search,
			clearable: true
		});
		inst.formFields.appendChild(input.el);

		let trees_category_idMultiSelect = FieldMultiSelect.init({
			name: 'trees_category_id',
			label: 'Plant type',
			error: null,
			condition: null,
			value: inst.filterStore.storageData.trees_category_id,
			selectItems: options.tablesStore.trees_category_id
		});
		inst.formFields.appendChild(trees_category_idMultiSelect.el);

		let lightMultiSelect = FieldMultiSelect.init({
			name: 'light',
			label: 'Light',
			error: null,
			condition: null,
			value: inst.filterStore.storageData.light,
			selectItems: options.tablesStore.light
		});
		inst.formFields.appendChild(lightMultiSelect.el);

		let soilMultiSelect = FieldMultiSelect.init({
			name: 'soil',
			label: 'Soil',
			error: null,
			condition: null,
			value: inst.filterStore.storageData.soil,
			selectItems: options.tablesStore.soil
		});
		inst.formFields.appendChild(soilMultiSelect.el);

		let nativeToMultiSelect = FieldMultiSelect.init({
			name: 'native_to',
			label: 'Native To',
			error: null,
			condition: null,
			value: inst.filterStore.storageData.native_to,
			selectItems: options.tablesStore.native_to
		});
		inst.formFields.appendChild(nativeToMultiSelect.el);

		let naturalHabitatMultiSelect = FieldMultiSelect.init({
			name: 'natural_habitat',
			label: 'Natural habitat',
			error: null,
			condition: null,
			value: inst.filterStore.storageData.natural_habitat,
			selectItems: options.tablesStore.natural_habitat
		});
		inst.formFields.appendChild(naturalHabitatMultiSelect.el);

		let gardenUsesMultiSelect = FieldMultiSelect.init({
			name: 'common_uses',
			label: 'Garden uses',
			error: null,
			condition: null,
			value: inst.filterStore.storageData.common_uses,
			selectItems: options.tablesStore.common_uses
		});
		inst.formFields.appendChild(gardenUsesMultiSelect.el);

		let uniqueAttractionsMultiSelect = FieldMultiSelect.init({
			name: 'unique_attractions',
			label: 'Unique attractions',
			error: null,
			condition: null,
			value: inst.filterStore.storageData.unique_attractions,
			selectItems: options.tablesStore.unique_attractions
		});
		inst.formFields.appendChild(uniqueAttractionsMultiSelect.el);

		let ecoBenefitsMultiSelect = FieldMultiSelect.init({
			name: 'eco_benefits',
			label: 'Eco benefits',
			error: null,
			condition: null,
			value: inst.filterStore.storageData.eco_benefits,
			selectItems: options.tablesStore.eco_benefits
		});
		inst.formFields.appendChild(ecoBenefitsMultiSelect.el);

		// Usage section (Traditional use fields - distinct from growing)
		const usageSection = inst.createEl('<div class="filter-section filter-section--usage"><div class="filter-section__heading">Traditional Use</div><div class="filter-section__fields"></div></div>');
		const usageFields = usageSection.querySelector('.filter-section__fields');

		const usageFieldConfigs = [
			{ name: 'tastes', label: 'Tastes', storeKey: 'tastes' },
			{ name: 'organ_systems', label: 'Organ systems', storeKey: 'organ_systems' },
			{ name: 'thermal_nature', label: 'Thermal nature', storeKey: 'thermal_nature' },
			{ name: 'moisture', label: 'Moisture', storeKey: 'moisture' },
			{ name: 'parts_used', label: 'Parts used', storeKey: 'parts_used' },
			{ name: 'preparations', label: 'Preparations', storeKey: 'preparations' },
			{ name: 'organs_and_tissue', label: 'Organs and tissue', storeKey: 'organs_and_tissue' }
		];

		usageFieldConfigs.forEach((config) => {
			const multiSelect = FieldMultiSelect.init({
				name: config.name,
				label: config.label,
				error: null,
				condition: null,
				value: inst.filterStore.storageData[config.storeKey],
				selectItems: options.tablesStore[config.storeKey]
			});
			usageFields.appendChild(multiSelect.el);
		});
		inst.formFields.appendChild(usageSection);

		inst.form.addEventListener('submit', inst.submitForm.bind(inst));
		const resetBtn = inst.el.querySelector('.filter-reset');
		if (resetBtn) resetBtn.addEventListener('click', inst.resetForm.bind(inst));

		return inst;
	}
}

export default FilterPlants;