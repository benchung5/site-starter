import Store from '../store';
import { globals } from '../config.js';

var PlantFilterStore = {
	name: 'plantFilterStore',
	storageData: {
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
		offset: 0,
		limit: globals.ADMIN_ENTRIES_PER_PAGE
	},
	init: function() {
	    Object.assign(this, Store);
	    this.initialze();
	}
}

export default PlantFilterStore;
