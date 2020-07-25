import Store from '../store';

var PlantListStore = {
    name: 'plantListStore',
	storageData: {
        trees: [],
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

export default PlantListStore;