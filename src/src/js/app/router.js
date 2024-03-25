var { ADMIN_URL } = require('./config')['globals'];
import appStateStore from './storage/appStateStore';
import verifyAction from './admin/parts/verifyAction';

let Router = {
	push: function(uri) {
		window.history.pushState({}, uri, `${ADMIN_URL}#${uri}`);
		this.onRouteChange();
	},
	onRouteChange: function() {
		if(appStateStore.storageData.formTouched) {
			this.verifyAction.open((verified) => {
				if(verified) {
					this.callbackRoute();
					appStateStore.setData({ formTouched: false });
				}
			});
		} else {
			this.callbackRoute();
		}		
	},
	callbackRoute: function() {
		this.uri = window.location.hash.split('#')[1];
		// remove the query part if present
		this.uri = (/\?/.test(this.uri) ? this.uri.split('?') : [this.uri]);

		if(this.uri[0]) {
			this.callback(this.uri[0]);
		} else {
			this.callback('');
		}
	},
	init: function(callback) {
		window.addEventListener('hashchange', (e) => { this.onRouteChange() }, false);
		this.callback = callback;
		this.verifyAction = verifyAction.init({
			message: 'navigate away?'
		});
		this.onRouteChange();
	}
}

export default Router;