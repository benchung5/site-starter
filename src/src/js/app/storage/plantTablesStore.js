import Store from '../store';

var PlantTablesStore = {
	name: 'plantTablesStore',
	storageData: {
		'genus_id' : [],
		'tags' : [],
		'origins' : [],
		'eco_benefits' : [],
		'native_to' : [],
		'zone_id' : [],
		'trees_category_id' : [],
		'shapes' : [],
		'growth_rate' : [],
		'light' : [],
		'soil' : [],
		'natural_habitat' : [],
		'common_uses' : [],
		'transplanting' : [],
		'unique_attractions' : [],
		'tolerances' : [],
		'tastes' : [],
		'organ_systems' : [],
		'thermal_nature' : [],
		'moisture' : [],
		'parts_used' : [],
		'preparations' : [],
		'organs_and_tissue' : [],
		'reproduction_type_id' : [],
		'dormancy_treatment_id' : [],
		// 'insects' : [],
		// 'diseases' : [],
		'mode_id' : [],
	},
	init: function() {
	    Object.assign(this, Store);
	    this.initialze();
	}
}

export default PlantTablesStore;
