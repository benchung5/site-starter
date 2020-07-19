let Router = {
	push(name, uri) {
		window.history.pushState({}, name, uri);
		this.onRouteChange();
	},
	onRouteChange() {
		this.uri = window.location.hash.split('#')[1];
		this.callback(this.uri);
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