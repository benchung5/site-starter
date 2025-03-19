'use strict';
import $ from 'jquery';
window.$ = $;
//------
import isOnline from './onlineStatus';
import loadVideo from './loadVideo';
import bodyClasses from './bodyClasses';
import windowSize from './windowSize';
import mobileMenu from './mobileMenu';
import fooSlider from './fooSlider';
import homePage from './homePage';
import treeRemovalCalculator from './treeRemovalCalculator';
import CartIcon from './addToCart/cartIcon';
import CartPopup from './addToCart/CartPopup';
import MainSourceProducts from './addToCart/mainSourceProducts';
import appStateStore from './storage/appStateStore';

//config
const isAdminPage = (window.location.href.indexOf('admin') > -1);

/* ==========================================================================
load foundation plugins - keep this
========================================================================== */
// import whatInput from 'what-input';
// //import all foundation plugins
// // import Foundation from 'foundation-sites';
// //include specific foundation elements
// import './lib/foundation-explicit-pieces';


(function() {
	//check if online/offline and handle it
	if(!isAdminPage) {
		isOnline();
	}

	//setup body classes
	bodyClasses();

	//window size utils
	windowSize();

	mobileMenu();

	//cart
	if(!isAdminPage) {
		//making the custom event 'localUpdated' for when localStorage is updated
		//because no existing event for this
		// ---------------------------------------------------------/
		//capture the original function
		const localStore = localStorage.setItem;
		console.log("test");

		//make a new function to replace it, then call the original
		//function within this
		localStorage.setItem = function(key, value) {
			console.log("localStorage.setItem called");
		  
		  // const evt = document.createEvent('Event');
		  // evt.initEvent("localUpdated", true, true);
			const evt = new CustomEvent("localUpdated", { bubbles: false, cancelable: false, detail: {
				"key": key,
				"value": value,
			} });

		  // const evt = new Event('localUpdated');
		        evt.key = key; 
		        evt.value = value; 

		  document.dispatchEvent(evt);
		  // 'this' refers to the object that calls the function
		  localStore.apply(this, arguments);
		};
		
		appStateStore.init();
		CartPopup.init();
		CartIcon.init();
		//if on plant view page
		const sourceProductListContainer = document.querySelector('#source-product-list-container');
		if(sourceProductListContainer) {
			MainSourceProducts.init({
				container: sourceProductListContainer
			});
		}
	}


	//home page animation
	if(window.location.pathname == '/') {
		homePage();
	}

	//tree removal calculator
	if(window.location.pathname == '/tree_removal_calculator') {
		treeRemovalCalculator();
	}

	fooSlider();
})();
