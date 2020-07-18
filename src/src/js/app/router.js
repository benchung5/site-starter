let Router = {
	onRouteChange() {
		this.uri = window.location.hash.split('#')[1];
		this.show = (this.uri == this.route) ? true : false;
		this.callback(this.show);
	},
	init: function(route, callback) {
		let inst = Object.create(this);
		window.addEventListener('hashchange', (e) => { inst.onRouteChange() }, false);
		inst.callback = callback;
		inst.route = route;
		inst.onRouteChange();
		return inst;
	}
}

export default Router;