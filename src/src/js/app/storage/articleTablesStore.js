import Store from '../store';
import { globals } from '../config';

var ArticleTablesStore = {
	name: 'articleTablesStore',
	storageData: {
		articles: [],
		count: null,
		offset: 0,
		limit: globals.ADMIN_ENTRIES_PER_PAGE
	},
	init: function() {
	    Object.assign(this, Store);
	    this.initialze();
	}
}

export default ArticleTablesStore;