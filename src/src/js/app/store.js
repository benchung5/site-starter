import { CustomEvent } from './lib/utils';

const Store = {
		setData: function(...newOrUpdated) {
			this.storageData = Object.assign({}, this.storageData, newOrUpdated[0]);
			this.event = CustomEvent(this.name + 'Updated', {'detail': newOrUpdated[0]});
	        window.dispatchEvent(this.event);
	        //used to switch back to prev or another state without firing the event again
	        if(newOrUpdated[1]) {
	        	this.storageData = Object.assign({}, this.storageData, newOrUpdated[1]);
	        }
		},
	    addListener(callback) {
	        window.addEventListener(this.name + 'Updated', callback);
	    },
	    initialze: function() {
	        //create custom event
	        //this.event = CustomEvent(this.name + 'Updated');
	    }
}

export default Store;