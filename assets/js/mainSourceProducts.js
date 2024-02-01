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

/***/ "./src/js/app/addToCart/mainSourceProducts.js":
/*!****************************************************!*\
  !*** ./src/js/app/addToCart/mainSourceProducts.js ***!
  \****************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../component */ \"./src/js/app/component.js\");\n\r\n\r\n(function() {\r\n\tvar Main = {\r\n\r\n\t\tinit: function() {\r\n\t\t\tvar proto = Object.assign({}, this, _component__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\r\n\t\t\tvar inst = Object.create(proto);\r\n\t\t\t// assign the instance constructor to the prototype so 'this' refers to the instance\r\n\t\t\tproto.constructor = inst;\r\n\r\n\t\t\tinst.initialize({\r\n\t\t\t\t//select the container in the document\r\n\t\t\t\tcontainer: document.querySelector('.source-product-list-container'),\r\n\t\t\t\tel: \r\n\t\t\t\t`<div class=\"source-product-list\">source product list</div>`\r\n\t\t\t});\r\n\t\t}\r\n\t}\r\n\r\n\tMain.init();\r\n})();\n\n//# sourceURL=webpack:///./src/js/app/addToCart/mainSourceProducts.js?");

/***/ }),

/***/ "./src/js/app/component.js":
/*!*********************************!*\
  !*** ./src/js/app/component.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nvar Component = {\r\n\tstate: {},\r\n\tsetState: function(newState) {\r\n\t\t//overwrite old state, and copy into new object \r\n\t\tthis.state = Object.assign({}, this.state, newState);\r\n\t},\r\n    createEl: function(htmlString) {\r\n\t  var div = document.createElement('div');\r\n\t  div.innerHTML = htmlString.trim();\r\n\t  return div.firstChild; \r\n\t},\r\n\tinitialize: function(options) {\r\n\t\tthis.container = options.container || null;\r\n\r\n\t\t//or create a new element from scratch\r\n\t\tthis.el = (options.el) ? this.createEl(options.el) : this.createEl('<div></div>');\r\n\t\t\r\n\t\tthis.render();\r\n\t},\r\n\trender() {\r\n\t\t//render to the page if container specified\r\n\t\tif(this.container) {\r\n\t\t\tthis.container.appendChild(this.el);\r\n\t\t}\r\n\t}\r\n}\r\n\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (Component);\n\n//# sourceURL=webpack:///./src/js/app/component.js?");

/***/ }),

/***/ 0:
/*!**********************************************************!*\
  !*** multi ./src/js/app/addToCart/mainSourceProducts.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! C:\\xampp\\htdocs\\1pix_app\\src\\src\\js\\app\\addToCart\\mainSourceProducts.js */\"./src/js/app/addToCart/mainSourceProducts.js\");\n\n\n//# sourceURL=webpack:///multi_./src/js/app/addToCart/mainSourceProducts.js?");

/***/ })

/******/ });