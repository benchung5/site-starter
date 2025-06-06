import Store from '../store';

var OrderTablesStore = {
	name: 'OrderTablesStore',
	storageData: {
		'id' : [],
		'payment_intent_id' : [],
		'amount' : [],
		'amount_received' : [],
		'subtotal' : [],
		'tax' : [],
		'shipping' : [],
		'description' : [],
		'email' : [],
		'name' : [],
		'phone' : [],
		'city' : [],
		'line1' : [],
		'line2' : [],
		'postal_code' : [],
		'state' : [],
		'products' : [],
		'created' : [],
		'canceled_at' : [],
		'cancellation_reason' : [],
		'shipped' : [],
	},
	init: function() {
	    Object.assign(this, Store);
	    this.initialze();
	}
}

export default OrderTablesStore;