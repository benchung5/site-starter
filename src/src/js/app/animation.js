var Animation = {
	getTransitionEndEventName: function () {
	  var transitions = {
	      "transition"      : "transitionend",
	      "OTransition"     : "oTransitionEnd",
	      "MozTransition"   : "transitionend",
	      "WebkitTransition": "webkitTransitionEnd"
	   }
	  let bodyStyle = document.body.style;
	  for(let transition in transitions) {
	      if(bodyStyle[transition] != undefined) {
	          return transitions[transition];
	      } 
	  }
	},
	animate: function(el, options) {
		let hideAtEnd = false;
		if ('autoOpacity' in options) {
			if (options.autoOpacity > 0) {
				el.style.visibility = 'visible';
			} else {
				hideAtEnd = true;
			}
			el.style.transitionProperty = 'opacity';
			el.style.opacity = options.autoOpacity;
		} else {
			el.style.transitionProperty = options.property;
			el.style[options.property] = options.propertyTo;
		}
		//get the transition event name (for browser compantibility)
		let transitionEndEventName = this.getTransitionEndEventName();
		el.addEventListener(transitionEndEventName, () => {
			if (hideAtEnd) {
				el.style.visibility = 'hidden';
				hideAtEnd = false;
			}
			if (options.onEnd) {
				options.onEnd();
			}
		});
		options.onStart();
		el.style.transitionDuration = options.duration.toString() + 's';
		el.style.transitionTimingFunction = options.ease;
	}
}

export default Animation;