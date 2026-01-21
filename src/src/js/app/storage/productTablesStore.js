import Store from '../store';

var ProductTablesStore = {
	name: 'productTablesStore',
	storageData: {
		'product_type_id' : [],
		'product_type_variation_id' : [],
		'status_id' : [],
		'source_ids' : []

	},
	init: function() {
	    Object.assign(this, Store);
	    this.initialze();
	}
}

export default ProductTablesStore;
