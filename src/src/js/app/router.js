var { ADMIN_URL } = require('./config')['globals'];

let Router = {
	push(uri) {
		window.history.pushState({}, uri, `${ADMIN_URL}#${uri}`);
		this.onRouteChange();
	},
	onRouteChange() {
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
		//let inst = Object.create(this);
		window.addEventListener('hashchange', (e) => { this.onRouteChange() }, false);
		this.callback = callback;
		this.onRouteChange();
		//return this;
	}
}

export default Router;