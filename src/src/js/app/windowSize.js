import { CustomEvent } from './lib/utils';
import { debounce } from './lib/utils';

const windowSize = function() {
	/* ==========================================================================
	window size event

	event fires when window changes from mobile to desktop size and vice versa
	to listen for the event, use somewhere in the app:

	window.addEventListener('isMobile', function(e) {
		console.log(e.detail);
	});
	========================================================================== */

	var isMobile = false;
	//layout medium
	var mediaThreshold = 768;

	var detail = {isMobile: null};

	function checkWindowSize() {
		  //match height if above 400px
		  if ((window.innerWidth >= mediaThreshold && (detail.isMobile === true)) || (detail.isMobile === null && window.innerWidth >= mediaThreshold)) {
	      isMobile = false;
	      detail.isMobile = isMobile
	      window.dispatchEvent(isMobileEvent);
		  } 
		  if ((window.innerWidth < mediaThreshold && (detail.isMobile === false)) || (detail.isMobile === null && window.innerWidth < mediaThreshold)) {
	      isMobile = true;
	      detail.isMobile = isMobile
	      window.dispatchEvent(isMobileEvent);
		  }
	}


	var isMobileEvent = CustomEvent('isMobile', {'detail': detail});

	let checkSize = debounce(checkWindowSize.bind(this) , 100)
	window.addEventListener('resize', checkSize);

	//fire on inital load as well
	checkSize();
}

export default windowSize;