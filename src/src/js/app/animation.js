import { addClass, removeClass, hasClass } from './lib/utils';

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
		//add a custum class to identify this animation event listener
		//generate random string for hashing
		const hash = Math.random().toString(36).substr(2, 16);
		addClass(el, hash);
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
		el.addEventListener(transitionEndEventName, (e) => {
			if (hasClass(e.target, hash)) {
				if (hideAtEnd) {
					el.style.visibility = 'hidden';
					hideAtEnd = false;
				}
				if (options.onEnd) {
					options.onEnd();
				}
				//remove the custum class
				removeClass(e.target, hash);
			}
		});
		if (options.onStart) {
			options.onStart();
		}
		
		el.style.transitionDuration = options.duration.toString() + 's';
		el.style.transitionTimingFunction = options.ease;
	}
}

export default Animation;