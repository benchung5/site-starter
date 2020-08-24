import Component from '../component';
import isLoadingStore from '../storage/isLoadingStore';
import animation from '../animation';
import { addClass, removeClass } from '../lib/utils';

var Loader = {
	onLoadingChange: function() {
		if(isLoadingStore.storageData.isLoading) {
			this.setLoading();
		}
		if(! isLoadingStore.storageData.isLoading) {
			//if not currently doing minimum load
			if(!this.state.lockLoad) {
			  //this.setState({ isLoading: false });
			  this.hideLoadingAnimation.animate();
			}
		}
	},
	setLoading: function() {
	  //apply a minimum load
	  //this.setState({ isLoading: true });

	  this.showLoadingAnimation.animate();
	  this.setState({ lockLoad: true });
	  setTimeout(() => {
	    if(!isLoadingStore.storageData.isLoading) {
	      //this.setState({ isLoading: false });
	      this.hideLoadingAnimation.animate();
	    }
	    this.setState({ lockLoad: false });
	  }, 150);
	},
	init: function(options) {
		var proto = Object.assign({}, this, Component);
		var inst = Object.create(proto);
		// assign the instance constructor to the prototype so 'this' refers to the instance
		proto.constructor = inst;

		//call initialize on Component first
		inst.initialize({
			el: 
			`
			<div class="preload-wrapper">
			  <div class="preload-internal">
			    <svg class="circular" viewBox="25 25 50 50">
			      <circle class="path" cx="50" cy="50" r="20" fill="none" strokeWidth="2" strokeMiterlimit="10"/>
			    </svg>
			  </div>
			</div> 
			`
		});

		inst.preload = inst.el.querySelector('.preload-internal');

		inst.el.appendChild(options.children);

		//animation
		inst.showLoadingAnimation = animation.init(inst.preload, {
			property: 'opacity',
			propertyTo: 1,
			duration: 0.2,
			ease: 'ease-in-out',
			onStart: () => {
				inst.preload.style.visibility = 'visible';
			}
		});
		inst.hideLoadingAnimation = animation.init(inst.preload, {
			property: 'opacity',
			propertyTo: 0,
			duration: 0.2,
			ease: 'ease-in-out',
			onEnd: () => {
				inst.preload.style.visibility = 'hidden';
			}
		});

		isLoadingStore.addListener(inst.onLoadingChange.bind(inst));
		inst.onLoadingChange();

		return inst;
	}
}

export default Loader;