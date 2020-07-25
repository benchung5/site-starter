import { CustomEvent } from './lib/utils';

const Store = {
		setData: function(newOrUpdated) {
			this.storageData = Object.assign({}, this.storageData, newOrUpdated);
	        window.dispatchEvent(this.event);
		},
	    addListener(callback) {
	        window.addEventListener(this.name + 'Updated', callback);
	    },
	    initialze: function() {
	        //create custom event
	        this.event = CustomEvent(this.name + 'Updated');
	    }
}

export default Store;