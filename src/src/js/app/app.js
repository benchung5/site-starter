'use strict';
import $ from 'jquery';
window.$ = $;
//------
import isOnline from './onlineStatus';
import serviceWorker from './serviceWorker';
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
	// turn on/off service worker
	var canRegister = false;
	if(!isAdminPage && canRegister) {
		serviceWorker('register');
	} else {
		serviceWorker('unregister');
	}

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
