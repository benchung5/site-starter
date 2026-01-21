import Store from '../store';
import { globals } from '../config';

var ProductFilterStore = {
    name: 'productFilterStore',
    storageData: {
        offset: 0,
        limit: globals.ADMIN_ENTRIES_PER_PAGE
    },
    init: function() {
        Object.assign(this, Store);
        this.initialze();
    }
}

export default ProductFilterStore;
