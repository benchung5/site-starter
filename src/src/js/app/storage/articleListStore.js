import Store from '../store';

var ArticleListStore = {
    name: 'articleListStore',
	storageData: {
        articles: [],
        count: 0,
        // below may be added after first search
        // offset:
        // limit: 
    },
    init: function() {
        Object.assign(this, Store);
        this.initialze();
    }
}

export default ArticleListStore;