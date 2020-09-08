import Store from '../store';

var ArticleTablesStore = {
	name: 'articleTablesStore',
	storageData: {
		'categories' : [],
		'mode_id' : [],
		'tags' : [],
	},
	init: function() {
	    Object.assign(this, Store);
	    this.initialze();
	}
}

export default ArticleTablesStore;