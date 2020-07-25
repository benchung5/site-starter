import { globals } from '../config.js';

var TreesFilter = {
	storageData: {
		categoriesTrees: [],
	    origins: [],
	    zones: [],
	    search: '',
	    offset: 0,
	    limit: globals.ADMIN_ENTRIES_PER_PAGE
	},
	setData: function(newOrUpdated) {
		this.storageData = Object.assign({}, this.storageData, newOrUpdated);
	}
}

export default TreesFilter;
