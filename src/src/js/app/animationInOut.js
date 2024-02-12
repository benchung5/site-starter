import Animation from './animation';

// *note you can't access use onEnd like animation.js
// only onStart. animationInOut.js uses those callbacks, to access
// the very end use the "callback" argument
//
// usage: 
// bubbleAnimation = AnimationInOut.init(inst.bubbleText, 
// 	{
// 		propertyTo: [['opacity', '1']],
// 		duration: 0.1,
// 		ease: 'linear',
// 		onStart: () => {
// 			inst.bubbleText.style.visibility = 'visible';
// 		},
// 	},
// 	{
// 		propertyTo: [['opacity', '0']],
// 		duration: 0.1,
// 		ease: 'linear',
// 		delay: 0.6,
// 	},
// 	0.6, () => {
// 		inst.bubbleText.style.visibility = 'hidden';
// 	});
// bubbleAnimation.animate();

var AnimationInOut = {
	animate: function() {
		if(this.animating == false) {
			this.animating = true;
			this.inAnimation.animate();
		}
	},
	onInAmimationEnd: function() {
		setTimeout(() => {
			this.outAnimation.animate();
		}, this.delayBetween);
	},
	onOutAmimationEnd: function() {
		this.animating = false;
		this.callback();
	},
	init: function(el, optionsIn, optionsOut, delayBetween, callback) {
		if(el) {
			var inst = Object.create(this);

			optionsIn.onEnd = inst.onInAmimationEnd.bind(inst);
			optionsOut.onEnd = inst.onOutAmimationEnd.bind(inst);
			inst.inAnimation = Animation.init(el, optionsIn);
			inst.outAnimation = Animation.init(el, optionsOut);
			inst.callback = callback;
			if(delayBetween) {
				inst.delayBetween = delayBetween*1000;
			} else {
				inst.delayBetween = 0;
			}

			inst.animating = false;

			return inst;
		}
	}
}

export default AnimationInOut;