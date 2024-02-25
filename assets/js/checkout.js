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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/app/checkout/checkout.js":
/*!*****************************************!*\
  !*** ./src/js/app/checkout/checkout.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const env = \"development\" || false;\r\nvar { STRIPE_PUBLISHABLE_KEY } = __webpack_require__(/*! ../secret */ \"./src/js/app/secret.js\")['globals'];\r\nvar { DOMAIN_URL } = __webpack_require__(/*! ../config */ \"./src/js/app/config.js\")[env];\r\n\r\n// This is a public sample test API key.\r\n// Don’t submit any personally identifiable information in requests made with this key.\r\n// Sign in to see your own test API key embedded in code samples.\r\nconst pathArray = window.location.pathname.split(\"/\");\r\nconst currentPage = pathArray[1];\r\n\r\n\r\nif (currentPage == 'checkout') {\r\n  initCheckout();\r\n} else if (currentPage == 'checkout_return') {\r\n  initCheckoutReturn();\r\n}\r\n\r\n// Create a Checkout Session as soon as the page loads\r\nasync function initCheckout() {\r\n  const stripe = Stripe(STRIPE_PUBLISHABLE_KEY);\r\n  const response = await fetch(\"/api/checkout\", {\r\n    method: \"POST\",\r\n  });\r\n\r\n  const { clientSecret } = await response.json();\r\n\r\n  const checkout = await stripe.initEmbeddedCheckout({\r\n    clientSecret,\r\n  });\r\n\r\n  // Mount Checkout\r\n  checkout.mount('#checkout');\r\n}\r\n\r\nasync function initCheckoutReturn() {\r\n  const queryString = window.location.search;\r\n  const urlParams = new URLSearchParams(queryString);\r\n  const sessionId = urlParams.get('session_id');\r\n  const response = await fetch(\"/api/status\", {\r\n    headers: {\r\n      Accept: \"application/json\",\r\n      \"Content-Type\": \"application/json\",\r\n    },\r\n    method: \"POST\",\r\n    body: JSON.stringify({ session_id: sessionId }),\r\n  });\r\n  const session = await response.json();\r\n\r\n  if (session.status == 'open') {\r\n    window.replace(`${DOMAIN_URL}/checkout`)\r\n  } else if (session.status == 'complete') {\r\n    document.getElementById('success').classList.remove('hidden');\r\n    document.getElementById('customer-email').textContent = session.customer_email\r\n  }\r\n}\n\n//# sourceURL=webpack:///./src/js/app/checkout/checkout.js?");

/***/ }),

/***/ "./src/js/app/config.js":
/*!******************************!*\
  !*** ./src/js/app/config.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = {\r\n   \"development\": {\r\n      SERVER_URL: \"/api\",\r\n      DOMAIN_URL: 'http://localhost',\r\n      ROOT_URL: \"/\",\r\n      ARTICLES_UPLOADS_PATH: '/uploads/articles/',\r\n      PLANTS_UPLOADS_PATH: '/uploads/trees/',\r\n   },\r\n   \"production\": {\r\n      DOMAIN_URL: 'https://naturewithus.com',\r\n      SERVER_URL: \"/api\",\r\n      ROOT_URL: \"/\",\r\n      ARTICLES_UPLOADS_PATH: '/uploads/articles/',\r\n      PLANTS_UPLOADS_PATH: '/uploads/trees/',\r\n   },\r\n   \"globals\": {\r\n      HIDE_MENU_THRESHOLD: 1150,\r\n      POST_CONFIG: {\r\n           headers: {\r\n             'CONTENT_TYPE': 'application/json',\r\n           }\r\n         },\r\n      ADMIN_ENTRIES_PER_PAGE: 25,\r\n      ADMIN_URL: 'admin_752'\r\n    }\r\n}\n\n//# sourceURL=webpack:///./src/js/app/config.js?");

/***/ }),

/***/ "./src/js/app/secret.js":
/*!******************************!*\
  !*** ./src/js/app/secret.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = {\r\n   \"development\": {\r\n   },\r\n   \"production\": {\r\n   },\r\n   \"globals\": {\r\n      STRIPE_API_KEY : 'sk_test_51OnVSNGO2Nlvl2w3wRArabH14b6nZyrB0HdJyriBZI5OZiAhqQkGubpCMkTmCH9XhhrId1T40w3uJi4x4hJbA4Wi00uwFGUvlk',\r\n      STRIPE_PUBLISHABLE_KEY : 'pk_test_51OnVSNGO2Nlvl2w3tt8eCILJUmPReqDsTQAPFfARSJjP1YXBp39fpBlhxiaZNOVO0rbmMsLd4mor3fGvHLOW6Sst00laNLoUP8',\r\n    }\r\n}\n\n//# sourceURL=webpack:///./src/js/app/secret.js?");

/***/ }),

/***/ 0:
/*!***********************************************!*\
  !*** multi ./src/js/app/checkout/checkout.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! C:\\xampp\\htdocs\\1pix_app\\src\\src\\js\\app\\checkout\\checkout.js */\"./src/js/app/checkout/checkout.js\");\n\n\n//# sourceURL=webpack:///multi_./src/js/app/checkout/checkout.js?");

/***/ })

/******/ });