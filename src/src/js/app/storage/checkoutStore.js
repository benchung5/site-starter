import Store from '../store';

var CheckoutStore = {
    name: 'appStateStore',
	storageData: {
        calcShippingLoading: false,
    },
    init: function() {
        Object.assign(this, Store);
        this.initialze();
    }
}

export default CheckoutStore;