import Store from '../store';

var ProductListStore = {
    name: 'productListStore',
	storageData: {
        products: [],
        count: 0,
        offset: 0,
        limit: 0
    },
    init: function() {
        Object.assign(this, Store);
        this.initialze();
    }
}

export default ProductListStore;