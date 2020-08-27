import Store from '../store';

var ArticleTablesStore = {
	name: 'articleTablesStore',
	storageData: {
		'articles_category_id' : [],
	},
	init: function() {
	    Object.assign(this, Store);
	    this.initialze();
	}
}

export default ArticleTablesStore;