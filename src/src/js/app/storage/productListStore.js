import Store from '../store';

var ProductListStore = {
    name: 'productListStore',
	storageData: {
        products: []
    },
    init: function() {
        Object.assign(this, Store);
        this.initialze();
    }
}

export default ProductListStore;