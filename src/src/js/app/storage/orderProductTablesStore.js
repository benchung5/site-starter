import Store from '../store';

var OrderProductTablesStore = {
	name: 'productTablesStore',
	storageData: {
		'product_id' : [],
	},
	init: function() {
	    Object.assign(this, Store);
	    this.initialze();
	}
}

export default OrderProductTablesStore;
