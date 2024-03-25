import Store from '../store';
import { globals } from '../config.js';

var ArticleFilterStore = {
	name: 'articlesFilterStore',
	storageData: {
		categories: [],
		themes: [],
	    search: '',
	    offset: 0,
	    limit: globals.ADMIN_ENTRIES_PER_PAGE
	},
	init: function() {
	    Object.assign(this, Store);
	    this.initialze();
	}
}

export default ArticleFilterStore;