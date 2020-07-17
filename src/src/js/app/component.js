var Component = {
	state: {},
	setState: function(newState) {
		//overwrite old state, and copy into new object 
		this.state = Object.assign({}, this.state, newState);
		console.log(this.state);
	},
    createEl: function(htmlString) {
	  var div = document.createElement('div');
	  div.innerHTML = htmlString.trim();
	  return div.firstChild; 
	},
	initialize: function(options) {
		this.container = options.container || null;

		//or create a new element from scratch
		this.el = (options.el) ? this.createEl(options.el) : this.createEl('<div></div>');
	},
	render() {
		//render to the page if container specified
		if(this.container) {
			this.container.appendChild(this.el);
		}
	}
}


export default Component;