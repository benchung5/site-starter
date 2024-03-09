import Store from '../store';

var AppStateStore = {
    name: 'appStateStore',
	storageData: {
        isLoading: false,
        showMenu: false,
        showCart: false,
        isOnline: true,
        formTouched: false,
    },
    init: function() {
        Object.assign(this, Store);
        this.initialze();
    }
}

export default AppStateStore;