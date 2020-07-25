import { CustomEvent } from '../lib/utils';

var PlantList = {
	storageData: {
        trees: [],
        count: 0,
        // below may be added after first search
        // offset:
        // limit: 
    },
	setData: function(newOrUpdated) {
		this.storageData = Object.assign({}, this.storageData, newOrUpdated);
        window.dispatchEvent(this.plantListEvent);
	},
    init: function() {
        //create custom event
        this.plantListEvent = CustomEvent('plantListUpdated');
    }
}

export default PlantList;