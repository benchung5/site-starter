import Store from '../store';

var IsLoadingStore = {
    name: 'isLoadingStore',
	storageData: {
        isLoading: false,
    },
    init: function() {
        Object.assign(this, Store);
        this.initialze();
    }
}

export default IsLoadingStore;