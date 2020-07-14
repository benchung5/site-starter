let Store = {
	dataStore: {},
	getData: function(key) {
		if(this.dataStore[key]) {
			return this.dataStore[key];	
		} else {
			console.log('dataStore item does not exist');
		}
	},
	setData: function(newOrUpdated) {
		this.dataStore = Object.assign({}, this.dataStore, newOrUpdated);
		console.log(this.dataStore);
	}
}

export default Store;