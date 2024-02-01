import Component from '../component';

(function() {
	var Main = {

		init: function() {
			var proto = Object.assign({}, this, Component);
			var inst = Object.create(proto);
			// assign the instance constructor to the prototype so 'this' refers to the instance
			proto.constructor = inst;

			inst.initialize({
				//select the container in the document
				container: document.querySelector('.source-product-list-container'),
				el: 
				`<div class="source-product-list">source product list</div>`
			});
		}
	}

	Main.init();
})();

// template for adding an entry js file for your components. 
// Add the containing folder name for this to gulpfile.babel.js,
// add this file name to config.yml, 
// load this file in the php controller
// add the containing element in the php view