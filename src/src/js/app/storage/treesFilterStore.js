import Store from '../store';
import { globals } from '../config.js';

var TreesFilterStore = {
	name: 'treesFilterStore',
	storageData: {
		categoriesTrees: [],
	    origins: [],
	    zones: [],
	    search: '',
	    offset: 0,
	    limit: globals.ADMIN_ENTRIES_PER_PAGE
	},
	init: function() {
	    Object.assign(this, Store);
	    this.initialze();
	}
}

export default TreesFilterStore;
