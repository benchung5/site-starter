import Store from '../store';

var OrderProductListStore = {
    name: 'orderProductListStore',
	storageData: {
        products: []
    },
    init: function() {
        Object.assign(this, Store);
        this.initialze();
    }
}

export default OrderProductListStore;