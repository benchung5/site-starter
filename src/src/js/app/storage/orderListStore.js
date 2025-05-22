import Store from '../store';

var OrderListStore = {
    name: 'orderListStore',
	storageData: {
        orders: [],
        count: 0,
        // below may be added after first search
        // offset:
        // limit: 
    },
    init: function() {
        Object.assign(this, Store);
        this.initialze();
    }
}

export default OrderListStore;