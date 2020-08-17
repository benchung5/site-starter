import Store from '../store';

var ShowMenuStore = {
    name: 'showMenuStore',
	storageData: {
      // 'open', 'close'
      // must start it with blank class for css
      // animation to work properly
      showMenu: ''
    },
    init: function() {
        Object.assign(this, Store);
        this.initialze();
    }
}

export default ShowMenuStore;