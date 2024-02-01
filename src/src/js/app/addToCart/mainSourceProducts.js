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