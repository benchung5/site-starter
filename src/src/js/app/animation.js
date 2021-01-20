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
	animate: function() {
		setTimeout(() => {
			//add a custum hash class to only allow the event listener for this animation
			this.hash = Math.random().toString(36).substr(2, 16);
			addClass(this.el, this.hash);

			if(this.onStart) {
				this.onStart();
			}

			this.propertyTo.map((item)=> {
				this.el.style[item[0]] = item[1];
			});
		}, this.delay);
	},
	init: function(el, options) {
		if(el) {
			var inst = Object.create(this);

			inst.onStart = options.onStart || null;
			inst.el = el;
			inst.propertyTo = options.propertyTo;
			if(options.delay) {
				inst.delay = options.delay*1000;
			} else {
				inst.delay = 0;
			}
			
			//el.style.transitionProperty = options.property;
			el.style.transitionProperty = 'all';
			el.style.transitionDuration = options.duration.toString() + 's';
			el.style.transitionTimingFunction = options.ease;

			//get the transition event name (for browser compantibility)
			let transitionEndEventName = inst.getTransitionEndEventName();
			el.addEventListener(transitionEndEventName, (e) => {
				if (hasClass(e.target, inst.hash)) {

					if (options.onEnd) {
						options.onEnd();
					}
					//remove the custom class
					removeClass(e.target, inst.hash);
				}
			});

			return inst;
		}
	}
}

export default Animation;