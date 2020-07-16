// example usage: Scroll.init({el: '#example-component'});
var Scroll = {
	init: function(options) {
		window.addEventListener('scroll', () => {
			this.el = document.querySelector(options.el);
			// getBoundingClientRect properties:
			// bottom: top of the viewport to the bottom of the el
			// height: height of the el
			// left: left of the viewport to left of the element
			// right: left of the viewport to the right of the element
			// top: top of the viewport to the top of the element
			// width: width
			// note: rect includes padding and borders, everythimg is calculated from
			// the top left corner of the viewport, also element must have a defined height to count as height
			this.rect = this.el.getBoundingClientRect();
			// window.innerHeight is height of the viewport
			// if top of element is in view
			let inOrAboveView = (this.rect.top < window.innerHeight) ? true : false;
			let inOrBelowView = (this.rect.bottom > 0) ? true : false;
			let inView = (inOrAboveView && inOrBelowView) ? true : false;

			console.log('element in viewport: ', inView);
		});

	}
}

export default Scroll;