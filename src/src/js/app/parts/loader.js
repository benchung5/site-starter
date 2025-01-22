import Component from '../component';
// import appStateStore from '../storage/appStateStore';
import animation from '../animation';
import { addClass, removeClass } from '../lib/utils';

// Usage:
// inst.loader = Loader.init({
// 	children: inst.el
// });
// inst.el = inst.loader.el;

var Loader = {
	// onLoadingChange: function(e) {

	// },
	isLoading: function(isLoading) {
		if(isLoading && (!this.isInitialPageLoad)) {
			this.setState({isLoading : true});
			this.startLock();
			this.showLoadingAnimation.animate();
		}
		if(!isLoading) {
			this.setState({isLoading : false});
			let timeout = this.delayFinish || 0;
			//if not currently doing minimum load
			if(!this.state.lockLoad) {
				setTimeout(() => {
					this.hideLoadingAnimation.animate();
				}, timeout);
			}
		}	
	},
	// animate: function() {
	// 	// **********remove this function eventually
	// 	if(appStateStore.storageData.isLoading && (!this.isInitialPageLoad)) {
	// 		this.startLock();
	// 		if(!this.isInitialPageLoad) {
	// 			this.showLoadingAnimation.animate();
	// 		}
	// 	}
	// 	if(!appStateStore.storageData.isLoading) {
	// 		let timeout = this.delayFinish || 0;
	// 		//if not currently doing minimum load
	// 		if(!this.state.lockLoad) {
	// 		  //this.setState({ isLoading: false });
	// 			setTimeout(() => {
	// 				this.hideLoadingAnimation.animate();
	// 			}, timeout);
	// 		}
	// 	}	
	// },
	startLock: function() {
		//force a minimum amount of time to show the loader
		this.setState({ lockLoad: true });
		setTimeout(() => {
		  this.setState({ lockLoad: false });
		  if (this.state.isLoading == false) {
		  	this.isLoading(false);
		  }
		  // this.animate();
		}, 1000);
	},
	init: function(options) {
		var proto = Object.assign({}, this, Component);
		var inst = Object.create(proto);
		// assign the instance constructor to the prototype so 'this' refers to the instance
		proto.constructor = inst;

		inst.delayFinish = options.delayFinish;

		//call initialize on Component first
		inst.initialize({
			el: 
			`
			<div class="preload-wrapper" style="min-height: ${options.minHeight ? options.minHeight : 'auto'};">
			  <div class="preload-internal" style="visibility: hidden; opacity: 0; z-index: ${options.zIndex ? options.zIndex : '10'};">
			    <svg class="circular" viewBox="25 25 50 50" style="width: ${options.size ? options.size : '5rem'}; height: ${options.size ? options.size : '5rem'};">
			      <circle class="path" cx="50" cy="50" r="20" style="stroke: ${options.color ? options.color : '#fff'};" fill="none" strokeWidth="2" strokeMiterlimit="10"/>
			    </svg>
			  </div>
			</div> 
			`
		});

		inst.preload = inst.el.querySelector('.preload-internal');
		//if used on initial page load, just show the loader, don't animate it in
		inst.isInitialPageLoad = options.isInitialPageLoad;
		if(inst.isInitialPageLoad) {
			inst.setState({isLoading : true});
			inst.preload.style.visibility = 'visible';
			inst.preload.style.opacity = 1;
			inst.startLock();
		}
		inst.preload.style.backgroundColor = options.backgroundColor ? options.backgroundColor : inst.preload.style.backgroundColor;
		if(options.isFullScreen) {
			inst.preload.style.position = "fixed";
		}

		inst.el.appendChild(options.children);

		//animation
		inst.showLoadingAnimation = animation.init(inst.preload, {
			propertyTo: [['opacity', 1]],
			duration: 0,
			ease: 'none',
			onStart: () => {
				inst.preload.style.visibility = 'visible';
			},
			onEnd: () => {
			}
		});
		inst.hideLoadingAnimation = animation.init(inst.preload, {
			propertyTo: [['opacity', 0]],
			duration: 0.2,
			ease: 'ease-in-out',
			onEnd: () => {
				inst.preload.style.visibility = 'hidden';
			}
		});

		// appStateStore.addListener(inst.animate.bind(inst), 'isLoading');

		return inst;
	}
}

export default Loader;