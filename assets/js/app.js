/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//config

var _jquery = __webpack_require__(2);

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var env = "development" || "development";

window.$ = _jquery2.default;

(function () {
	/* ==========================================================================
 // register service worker
 ========================================================================== */

	if ('serviceWorker' in navigator) {
		// Your service-worker.js *must* be located at the top-level directory relative to your site.
		// It won't be able to control pages unless it's located at the same level or higher than them.
		// *Don't* register service worker file in, e.g., a scripts/ sub-directory!
		// See https://github.com/slightlyoff/ServiceWorker/issues/468
		navigator.serviceWorker.register('assets/js/service-worker.js').then(function (reg) {
			// updatefound is fired if service-worker.js changes.
			reg.onupdatefound = function () {
				// The updatefound event implies that reg.installing is set; see
				// https://slightlyoff.github.io/ServiceWorker/spec/service_worker/index.html#service-worker-container-updatefound-event
				var installingWorker = reg.installing;

				installingWorker.onstatechange = function () {
					switch (installingWorker.state) {
						case 'installed':
							if (navigator.serviceWorker.controller) {
								// At this point, the old content will have been purged and the fresh content will
								// have been added to the cache.
								// It's the perfect time to display a "New content is available; please refresh."
								// message in the page's interface.
								console.log('New or updated content is available.');
							} else {
								// At this point, everything has been precached.
								// It's the perfect time to display a "Content is cached for offline use." message.
								console.log('Content is now available offline!');
							}
							break;

						case 'redundant':
							console.error('The installing service worker became redundant.');
							break;
					}
				};
			};
		}).catch(function (e) {
			console.error('Error during service worker registration:', e);
		});
	}

	/* ==========================================================================
 // manifest
 ========================================================================== */

	window.addEventListener('beforeinstallprompt', function (e) {
		// beforeinstallprompt Event fired

		// e.userChoice will return a Promise. 
		// For more details read: https://developers.google.com/web/fundamentals/getting-started/primers/promises
		e.userChoice.then(function (choiceResult) {

			console.log(choiceResult.outcome);

			if (choiceResult.outcome == 'dismissed') {
				console.log('User cancelled home screen install');
			} else {
				console.log('User added to home screen');
			}
		});
	});
})();

(0, _jquery2.default)(document).ready(function () {
	/* ==========================================================================
 // bowser
 ========================================================================== */

	//browsers:
	// safari
	// firefox
	// chrome
	// msedge
	// msie
	// mobile
	// ios

	if (bowser.msedge) {
		//need this since modernizr doesn't add this one
		(0, _jquery2.default)('body').addClass('msedge');
	}
	if (bowser.safari) {
		(0, _jquery2.default)('body').addClass('safari');
	}
	if (bowser.iPhone) {
		(0, _jquery2.default)('body').addClass('iphone');
	}
	if (bowser.mobile && bowser.safari && bowser.version <= 8) {
		(0, _jquery2.default)('body').addClass('iphone-8-or-less');
	}
	if (bowser.tablet) {
		(0, _jquery2.default)('body').addClass('tablet');
	}
	if (!bowser.tablet && !bowser.mobile) {
		(0, _jquery2.default)('body').addClass('desktop');
	}
	if (bowser.mobile) {
		(0, _jquery2.default)('body').addClass('mobile');
	}

	/* ==========================================================================
 testing
 ========================================================================== */

	//media size
	(0, _jquery2.default)(window).on('changed.zf.mediaquery', function (event, newSize, oldSize) {
		// newSize is the name of the now-current breakpoint, oldSize is the previous breakpoint
		// console.log(newSize);
	});
});

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = jQuery;

/***/ })
/******/ ]);