import { CustomEvent } from './lib/utils';

const Store = {
		eventNames: [],
		setData: function(...newOrUpdated) {
			//ad event listener with *name and callback
			//on setData:
			//look through all listeners,
			//add custom event and dispatch for each based on what's neworupdated
			this.storageData = Object.assign({}, this.storageData, newOrUpdated[0]);

			//fire event for specific update
			let hasUpdated = Object.getOwnPropertyNames(newOrUpdated[0])[0];
			let eventName = this.eventNames.find((item) => {
				return item == hasUpdated;
			});
			if(eventName) {
				this.event = CustomEvent(eventName, {'detail': newOrUpdated[0]});
		        window.dispatchEvent(this.event);
			}

			//just the generic updated event
			this.event = CustomEvent(this.name + 'Updated', {'detail': newOrUpdated[0]});
	        window.dispatchEvent(this.event);

	        //used to switch back to prev or another state without firing the event again
	        if(newOrUpdated[1]) {
	        	this.storageData = Object.assign({}, this.storageData, newOrUpdated[1]);
	        }
		},
	    addListener(callback, name) {
	    	if(name) {
    			this.eventNames.push(name);
    		    window.addEventListener(name, callback);
	    	} else {
	        	window.addEventListener(this.name + 'Updated', callback);
	    	}

	    },
	    initialze: function() {
	        //create custom event
	        //this.event = CustomEvent(this.name + 'Updated');
	    }
}

export default Store;