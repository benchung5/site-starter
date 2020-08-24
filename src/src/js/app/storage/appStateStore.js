import Store from '../store';

var AppStateStore = {
    name: 'appStateStore',
	storageData: {
        isLoading: false,
        showMenu: 'close',
        isOnline: true,
        clearSearch: false,
    },
    init: function() {
        Object.assign(this, Store);
        this.initialze();
    }
}

export default AppStateStore;