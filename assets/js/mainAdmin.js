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

/***/ "./node_modules/html-escape/index.js":
/*!*******************************************!*\
  !*** ./node_modules/html-escape/index.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n// Implementation originally from Twitter's Hogan.js:\n// https://github.com/twitter/hogan.js/blob/master/lib/template.js#L325-L335\n\nvar rAmp = /&/g;\nvar rLt = /</g;\nvar rApos =/\\'/g;\nvar rQuot = /\\\"/g;\nvar hChars =/[&<>\\\"\\']/;\n\nmodule.exports = function(str) {\n  if (str == null) {\n    return str;\n  }\n\n  if (typeof str !== \"string\") {\n    str = String(str);\n  }\n\n  if (hChars.test(String(str))) {\n    return str\n      .replace(rAmp,'&amp;')\n      .replace(rLt,'&lt;')\n      .replace(rApos,'&apos;')\n      .replace(rQuot, '&quot;');\n  }\n  else {\n    return str;\n  }\n};\n\n\n//# sourceURL=webpack:///./node_modules/html-escape/index.js?");

/***/ }),

/***/ "./node_modules/lodash/_DataView.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_DataView.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var getNative = __webpack_require__(/*! ./_getNative */ \"./node_modules/lodash/_getNative.js\"),\n    root = __webpack_require__(/*! ./_root */ \"./node_modules/lodash/_root.js\");\n\n/* Built-in method references that are verified to be native. */\nvar DataView = getNative(root, 'DataView');\n\nmodule.exports = DataView;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_DataView.js?");

/***/ }),

/***/ "./node_modules/lodash/_Hash.js":
/*!**************************************!*\
  !*** ./node_modules/lodash/_Hash.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var hashClear = __webpack_require__(/*! ./_hashClear */ \"./node_modules/lodash/_hashClear.js\"),\n    hashDelete = __webpack_require__(/*! ./_hashDelete */ \"./node_modules/lodash/_hashDelete.js\"),\n    hashGet = __webpack_require__(/*! ./_hashGet */ \"./node_modules/lodash/_hashGet.js\"),\n    hashHas = __webpack_require__(/*! ./_hashHas */ \"./node_modules/lodash/_hashHas.js\"),\n    hashSet = __webpack_require__(/*! ./_hashSet */ \"./node_modules/lodash/_hashSet.js\");\n\n/**\n * Creates a hash object.\n *\n * @private\n * @constructor\n * @param {Array} [entries] The key-value pairs to cache.\n */\nfunction Hash(entries) {\n  var index = -1,\n      length = entries == null ? 0 : entries.length;\n\n  this.clear();\n  while (++index < length) {\n    var entry = entries[index];\n    this.set(entry[0], entry[1]);\n  }\n}\n\n// Add methods to `Hash`.\nHash.prototype.clear = hashClear;\nHash.prototype['delete'] = hashDelete;\nHash.prototype.get = hashGet;\nHash.prototype.has = hashHas;\nHash.prototype.set = hashSet;\n\nmodule.exports = Hash;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_Hash.js?");

/***/ }),

/***/ "./node_modules/lodash/_ListCache.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_ListCache.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var listCacheClear = __webpack_require__(/*! ./_listCacheClear */ \"./node_modules/lodash/_listCacheClear.js\"),\n    listCacheDelete = __webpack_require__(/*! ./_listCacheDelete */ \"./node_modules/lodash/_listCacheDelete.js\"),\n    listCacheGet = __webpack_require__(/*! ./_listCacheGet */ \"./node_modules/lodash/_listCacheGet.js\"),\n    listCacheHas = __webpack_require__(/*! ./_listCacheHas */ \"./node_modules/lodash/_listCacheHas.js\"),\n    listCacheSet = __webpack_require__(/*! ./_listCacheSet */ \"./node_modules/lodash/_listCacheSet.js\");\n\n/**\n * Creates an list cache object.\n *\n * @private\n * @constructor\n * @param {Array} [entries] The key-value pairs to cache.\n */\nfunction ListCache(entries) {\n  var index = -1,\n      length = entries == null ? 0 : entries.length;\n\n  this.clear();\n  while (++index < length) {\n    var entry = entries[index];\n    this.set(entry[0], entry[1]);\n  }\n}\n\n// Add methods to `ListCache`.\nListCache.prototype.clear = listCacheClear;\nListCache.prototype['delete'] = listCacheDelete;\nListCache.prototype.get = listCacheGet;\nListCache.prototype.has = listCacheHas;\nListCache.prototype.set = listCacheSet;\n\nmodule.exports = ListCache;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_ListCache.js?");

/***/ }),

/***/ "./node_modules/lodash/_Map.js":
/*!*************************************!*\
  !*** ./node_modules/lodash/_Map.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var getNative = __webpack_require__(/*! ./_getNative */ \"./node_modules/lodash/_getNative.js\"),\n    root = __webpack_require__(/*! ./_root */ \"./node_modules/lodash/_root.js\");\n\n/* Built-in method references that are verified to be native. */\nvar Map = getNative(root, 'Map');\n\nmodule.exports = Map;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_Map.js?");

/***/ }),

/***/ "./node_modules/lodash/_MapCache.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_MapCache.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var mapCacheClear = __webpack_require__(/*! ./_mapCacheClear */ \"./node_modules/lodash/_mapCacheClear.js\"),\n    mapCacheDelete = __webpack_require__(/*! ./_mapCacheDelete */ \"./node_modules/lodash/_mapCacheDelete.js\"),\n    mapCacheGet = __webpack_require__(/*! ./_mapCacheGet */ \"./node_modules/lodash/_mapCacheGet.js\"),\n    mapCacheHas = __webpack_require__(/*! ./_mapCacheHas */ \"./node_modules/lodash/_mapCacheHas.js\"),\n    mapCacheSet = __webpack_require__(/*! ./_mapCacheSet */ \"./node_modules/lodash/_mapCacheSet.js\");\n\n/**\n * Creates a map cache object to store key-value pairs.\n *\n * @private\n * @constructor\n * @param {Array} [entries] The key-value pairs to cache.\n */\nfunction MapCache(entries) {\n  var index = -1,\n      length = entries == null ? 0 : entries.length;\n\n  this.clear();\n  while (++index < length) {\n    var entry = entries[index];\n    this.set(entry[0], entry[1]);\n  }\n}\n\n// Add methods to `MapCache`.\nMapCache.prototype.clear = mapCacheClear;\nMapCache.prototype['delete'] = mapCacheDelete;\nMapCache.prototype.get = mapCacheGet;\nMapCache.prototype.has = mapCacheHas;\nMapCache.prototype.set = mapCacheSet;\n\nmodule.exports = MapCache;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_MapCache.js?");

/***/ }),

/***/ "./node_modules/lodash/_Promise.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_Promise.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var getNative = __webpack_require__(/*! ./_getNative */ \"./node_modules/lodash/_getNative.js\"),\n    root = __webpack_require__(/*! ./_root */ \"./node_modules/lodash/_root.js\");\n\n/* Built-in method references that are verified to be native. */\nvar Promise = getNative(root, 'Promise');\n\nmodule.exports = Promise;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_Promise.js?");

/***/ }),

/***/ "./node_modules/lodash/_Set.js":
/*!*************************************!*\
  !*** ./node_modules/lodash/_Set.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var getNative = __webpack_require__(/*! ./_getNative */ \"./node_modules/lodash/_getNative.js\"),\n    root = __webpack_require__(/*! ./_root */ \"./node_modules/lodash/_root.js\");\n\n/* Built-in method references that are verified to be native. */\nvar Set = getNative(root, 'Set');\n\nmodule.exports = Set;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_Set.js?");

/***/ }),

/***/ "./node_modules/lodash/_Stack.js":
/*!***************************************!*\
  !*** ./node_modules/lodash/_Stack.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var ListCache = __webpack_require__(/*! ./_ListCache */ \"./node_modules/lodash/_ListCache.js\"),\n    stackClear = __webpack_require__(/*! ./_stackClear */ \"./node_modules/lodash/_stackClear.js\"),\n    stackDelete = __webpack_require__(/*! ./_stackDelete */ \"./node_modules/lodash/_stackDelete.js\"),\n    stackGet = __webpack_require__(/*! ./_stackGet */ \"./node_modules/lodash/_stackGet.js\"),\n    stackHas = __webpack_require__(/*! ./_stackHas */ \"./node_modules/lodash/_stackHas.js\"),\n    stackSet = __webpack_require__(/*! ./_stackSet */ \"./node_modules/lodash/_stackSet.js\");\n\n/**\n * Creates a stack cache object to store key-value pairs.\n *\n * @private\n * @constructor\n * @param {Array} [entries] The key-value pairs to cache.\n */\nfunction Stack(entries) {\n  var data = this.__data__ = new ListCache(entries);\n  this.size = data.size;\n}\n\n// Add methods to `Stack`.\nStack.prototype.clear = stackClear;\nStack.prototype['delete'] = stackDelete;\nStack.prototype.get = stackGet;\nStack.prototype.has = stackHas;\nStack.prototype.set = stackSet;\n\nmodule.exports = Stack;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_Stack.js?");

/***/ }),

/***/ "./node_modules/lodash/_Symbol.js":
/*!****************************************!*\
  !*** ./node_modules/lodash/_Symbol.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var root = __webpack_require__(/*! ./_root */ \"./node_modules/lodash/_root.js\");\n\n/** Built-in value references. */\nvar Symbol = root.Symbol;\n\nmodule.exports = Symbol;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_Symbol.js?");

/***/ }),

/***/ "./node_modules/lodash/_Uint8Array.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_Uint8Array.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var root = __webpack_require__(/*! ./_root */ \"./node_modules/lodash/_root.js\");\n\n/** Built-in value references. */\nvar Uint8Array = root.Uint8Array;\n\nmodule.exports = Uint8Array;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_Uint8Array.js?");

/***/ }),

/***/ "./node_modules/lodash/_WeakMap.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_WeakMap.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var getNative = __webpack_require__(/*! ./_getNative */ \"./node_modules/lodash/_getNative.js\"),\n    root = __webpack_require__(/*! ./_root */ \"./node_modules/lodash/_root.js\");\n\n/* Built-in method references that are verified to be native. */\nvar WeakMap = getNative(root, 'WeakMap');\n\nmodule.exports = WeakMap;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_WeakMap.js?");

/***/ }),

/***/ "./node_modules/lodash/_arrayEach.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_arrayEach.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * A specialized version of `_.forEach` for arrays without support for\n * iteratee shorthands.\n *\n * @private\n * @param {Array} [array] The array to iterate over.\n * @param {Function} iteratee The function invoked per iteration.\n * @returns {Array} Returns `array`.\n */\nfunction arrayEach(array, iteratee) {\n  var index = -1,\n      length = array == null ? 0 : array.length;\n\n  while (++index < length) {\n    if (iteratee(array[index], index, array) === false) {\n      break;\n    }\n  }\n  return array;\n}\n\nmodule.exports = arrayEach;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_arrayEach.js?");

/***/ }),

/***/ "./node_modules/lodash/_arrayFilter.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_arrayFilter.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * A specialized version of `_.filter` for arrays without support for\n * iteratee shorthands.\n *\n * @private\n * @param {Array} [array] The array to iterate over.\n * @param {Function} predicate The function invoked per iteration.\n * @returns {Array} Returns the new filtered array.\n */\nfunction arrayFilter(array, predicate) {\n  var index = -1,\n      length = array == null ? 0 : array.length,\n      resIndex = 0,\n      result = [];\n\n  while (++index < length) {\n    var value = array[index];\n    if (predicate(value, index, array)) {\n      result[resIndex++] = value;\n    }\n  }\n  return result;\n}\n\nmodule.exports = arrayFilter;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_arrayFilter.js?");

/***/ }),

/***/ "./node_modules/lodash/_arrayLikeKeys.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash/_arrayLikeKeys.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseTimes = __webpack_require__(/*! ./_baseTimes */ \"./node_modules/lodash/_baseTimes.js\"),\n    isArguments = __webpack_require__(/*! ./isArguments */ \"./node_modules/lodash/isArguments.js\"),\n    isArray = __webpack_require__(/*! ./isArray */ \"./node_modules/lodash/isArray.js\"),\n    isBuffer = __webpack_require__(/*! ./isBuffer */ \"./node_modules/lodash/isBuffer.js\"),\n    isIndex = __webpack_require__(/*! ./_isIndex */ \"./node_modules/lodash/_isIndex.js\"),\n    isTypedArray = __webpack_require__(/*! ./isTypedArray */ \"./node_modules/lodash/isTypedArray.js\");\n\n/** Used for built-in method references. */\nvar objectProto = Object.prototype;\n\n/** Used to check objects for own properties. */\nvar hasOwnProperty = objectProto.hasOwnProperty;\n\n/**\n * Creates an array of the enumerable property names of the array-like `value`.\n *\n * @private\n * @param {*} value The value to query.\n * @param {boolean} inherited Specify returning inherited property names.\n * @returns {Array} Returns the array of property names.\n */\nfunction arrayLikeKeys(value, inherited) {\n  var isArr = isArray(value),\n      isArg = !isArr && isArguments(value),\n      isBuff = !isArr && !isArg && isBuffer(value),\n      isType = !isArr && !isArg && !isBuff && isTypedArray(value),\n      skipIndexes = isArr || isArg || isBuff || isType,\n      result = skipIndexes ? baseTimes(value.length, String) : [],\n      length = result.length;\n\n  for (var key in value) {\n    if ((inherited || hasOwnProperty.call(value, key)) &&\n        !(skipIndexes && (\n           // Safari 9 has enumerable `arguments.length` in strict mode.\n           key == 'length' ||\n           // Node.js 0.10 has enumerable non-index properties on buffers.\n           (isBuff && (key == 'offset' || key == 'parent')) ||\n           // PhantomJS 2 has enumerable non-index properties on typed arrays.\n           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||\n           // Skip index properties.\n           isIndex(key, length)\n        ))) {\n      result.push(key);\n    }\n  }\n  return result;\n}\n\nmodule.exports = arrayLikeKeys;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_arrayLikeKeys.js?");

/***/ }),

/***/ "./node_modules/lodash/_arrayPush.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_arrayPush.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Appends the elements of `values` to `array`.\n *\n * @private\n * @param {Array} array The array to modify.\n * @param {Array} values The values to append.\n * @returns {Array} Returns `array`.\n */\nfunction arrayPush(array, values) {\n  var index = -1,\n      length = values.length,\n      offset = array.length;\n\n  while (++index < length) {\n    array[offset + index] = values[index];\n  }\n  return array;\n}\n\nmodule.exports = arrayPush;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_arrayPush.js?");

/***/ }),

/***/ "./node_modules/lodash/_assignValue.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_assignValue.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseAssignValue = __webpack_require__(/*! ./_baseAssignValue */ \"./node_modules/lodash/_baseAssignValue.js\"),\n    eq = __webpack_require__(/*! ./eq */ \"./node_modules/lodash/eq.js\");\n\n/** Used for built-in method references. */\nvar objectProto = Object.prototype;\n\n/** Used to check objects for own properties. */\nvar hasOwnProperty = objectProto.hasOwnProperty;\n\n/**\n * Assigns `value` to `key` of `object` if the existing value is not equivalent\n * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)\n * for equality comparisons.\n *\n * @private\n * @param {Object} object The object to modify.\n * @param {string} key The key of the property to assign.\n * @param {*} value The value to assign.\n */\nfunction assignValue(object, key, value) {\n  var objValue = object[key];\n  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||\n      (value === undefined && !(key in object))) {\n    baseAssignValue(object, key, value);\n  }\n}\n\nmodule.exports = assignValue;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_assignValue.js?");

/***/ }),

/***/ "./node_modules/lodash/_assocIndexOf.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_assocIndexOf.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var eq = __webpack_require__(/*! ./eq */ \"./node_modules/lodash/eq.js\");\n\n/**\n * Gets the index at which the `key` is found in `array` of key-value pairs.\n *\n * @private\n * @param {Array} array The array to inspect.\n * @param {*} key The key to search for.\n * @returns {number} Returns the index of the matched value, else `-1`.\n */\nfunction assocIndexOf(array, key) {\n  var length = array.length;\n  while (length--) {\n    if (eq(array[length][0], key)) {\n      return length;\n    }\n  }\n  return -1;\n}\n\nmodule.exports = assocIndexOf;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_assocIndexOf.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseAssign.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_baseAssign.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var copyObject = __webpack_require__(/*! ./_copyObject */ \"./node_modules/lodash/_copyObject.js\"),\n    keys = __webpack_require__(/*! ./keys */ \"./node_modules/lodash/keys.js\");\n\n/**\n * The base implementation of `_.assign` without support for multiple sources\n * or `customizer` functions.\n *\n * @private\n * @param {Object} object The destination object.\n * @param {Object} source The source object.\n * @returns {Object} Returns `object`.\n */\nfunction baseAssign(object, source) {\n  return object && copyObject(source, keys(source), object);\n}\n\nmodule.exports = baseAssign;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_baseAssign.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseAssignIn.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_baseAssignIn.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var copyObject = __webpack_require__(/*! ./_copyObject */ \"./node_modules/lodash/_copyObject.js\"),\n    keysIn = __webpack_require__(/*! ./keysIn */ \"./node_modules/lodash/keysIn.js\");\n\n/**\n * The base implementation of `_.assignIn` without support for multiple sources\n * or `customizer` functions.\n *\n * @private\n * @param {Object} object The destination object.\n * @param {Object} source The source object.\n * @returns {Object} Returns `object`.\n */\nfunction baseAssignIn(object, source) {\n  return object && copyObject(source, keysIn(source), object);\n}\n\nmodule.exports = baseAssignIn;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_baseAssignIn.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseAssignValue.js":
/*!*************************************************!*\
  !*** ./node_modules/lodash/_baseAssignValue.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var defineProperty = __webpack_require__(/*! ./_defineProperty */ \"./node_modules/lodash/_defineProperty.js\");\n\n/**\n * The base implementation of `assignValue` and `assignMergeValue` without\n * value checks.\n *\n * @private\n * @param {Object} object The object to modify.\n * @param {string} key The key of the property to assign.\n * @param {*} value The value to assign.\n */\nfunction baseAssignValue(object, key, value) {\n  if (key == '__proto__' && defineProperty) {\n    defineProperty(object, key, {\n      'configurable': true,\n      'enumerable': true,\n      'value': value,\n      'writable': true\n    });\n  } else {\n    object[key] = value;\n  }\n}\n\nmodule.exports = baseAssignValue;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_baseAssignValue.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseClone.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_baseClone.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var Stack = __webpack_require__(/*! ./_Stack */ \"./node_modules/lodash/_Stack.js\"),\n    arrayEach = __webpack_require__(/*! ./_arrayEach */ \"./node_modules/lodash/_arrayEach.js\"),\n    assignValue = __webpack_require__(/*! ./_assignValue */ \"./node_modules/lodash/_assignValue.js\"),\n    baseAssign = __webpack_require__(/*! ./_baseAssign */ \"./node_modules/lodash/_baseAssign.js\"),\n    baseAssignIn = __webpack_require__(/*! ./_baseAssignIn */ \"./node_modules/lodash/_baseAssignIn.js\"),\n    cloneBuffer = __webpack_require__(/*! ./_cloneBuffer */ \"./node_modules/lodash/_cloneBuffer.js\"),\n    copyArray = __webpack_require__(/*! ./_copyArray */ \"./node_modules/lodash/_copyArray.js\"),\n    copySymbols = __webpack_require__(/*! ./_copySymbols */ \"./node_modules/lodash/_copySymbols.js\"),\n    copySymbolsIn = __webpack_require__(/*! ./_copySymbolsIn */ \"./node_modules/lodash/_copySymbolsIn.js\"),\n    getAllKeys = __webpack_require__(/*! ./_getAllKeys */ \"./node_modules/lodash/_getAllKeys.js\"),\n    getAllKeysIn = __webpack_require__(/*! ./_getAllKeysIn */ \"./node_modules/lodash/_getAllKeysIn.js\"),\n    getTag = __webpack_require__(/*! ./_getTag */ \"./node_modules/lodash/_getTag.js\"),\n    initCloneArray = __webpack_require__(/*! ./_initCloneArray */ \"./node_modules/lodash/_initCloneArray.js\"),\n    initCloneByTag = __webpack_require__(/*! ./_initCloneByTag */ \"./node_modules/lodash/_initCloneByTag.js\"),\n    initCloneObject = __webpack_require__(/*! ./_initCloneObject */ \"./node_modules/lodash/_initCloneObject.js\"),\n    isArray = __webpack_require__(/*! ./isArray */ \"./node_modules/lodash/isArray.js\"),\n    isBuffer = __webpack_require__(/*! ./isBuffer */ \"./node_modules/lodash/isBuffer.js\"),\n    isMap = __webpack_require__(/*! ./isMap */ \"./node_modules/lodash/isMap.js\"),\n    isObject = __webpack_require__(/*! ./isObject */ \"./node_modules/lodash/isObject.js\"),\n    isSet = __webpack_require__(/*! ./isSet */ \"./node_modules/lodash/isSet.js\"),\n    keys = __webpack_require__(/*! ./keys */ \"./node_modules/lodash/keys.js\");\n\n/** Used to compose bitmasks for cloning. */\nvar CLONE_DEEP_FLAG = 1,\n    CLONE_FLAT_FLAG = 2,\n    CLONE_SYMBOLS_FLAG = 4;\n\n/** `Object#toString` result references. */\nvar argsTag = '[object Arguments]',\n    arrayTag = '[object Array]',\n    boolTag = '[object Boolean]',\n    dateTag = '[object Date]',\n    errorTag = '[object Error]',\n    funcTag = '[object Function]',\n    genTag = '[object GeneratorFunction]',\n    mapTag = '[object Map]',\n    numberTag = '[object Number]',\n    objectTag = '[object Object]',\n    regexpTag = '[object RegExp]',\n    setTag = '[object Set]',\n    stringTag = '[object String]',\n    symbolTag = '[object Symbol]',\n    weakMapTag = '[object WeakMap]';\n\nvar arrayBufferTag = '[object ArrayBuffer]',\n    dataViewTag = '[object DataView]',\n    float32Tag = '[object Float32Array]',\n    float64Tag = '[object Float64Array]',\n    int8Tag = '[object Int8Array]',\n    int16Tag = '[object Int16Array]',\n    int32Tag = '[object Int32Array]',\n    uint8Tag = '[object Uint8Array]',\n    uint8ClampedTag = '[object Uint8ClampedArray]',\n    uint16Tag = '[object Uint16Array]',\n    uint32Tag = '[object Uint32Array]';\n\n/** Used to identify `toStringTag` values supported by `_.clone`. */\nvar cloneableTags = {};\ncloneableTags[argsTag] = cloneableTags[arrayTag] =\ncloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] =\ncloneableTags[boolTag] = cloneableTags[dateTag] =\ncloneableTags[float32Tag] = cloneableTags[float64Tag] =\ncloneableTags[int8Tag] = cloneableTags[int16Tag] =\ncloneableTags[int32Tag] = cloneableTags[mapTag] =\ncloneableTags[numberTag] = cloneableTags[objectTag] =\ncloneableTags[regexpTag] = cloneableTags[setTag] =\ncloneableTags[stringTag] = cloneableTags[symbolTag] =\ncloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] =\ncloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;\ncloneableTags[errorTag] = cloneableTags[funcTag] =\ncloneableTags[weakMapTag] = false;\n\n/**\n * The base implementation of `_.clone` and `_.cloneDeep` which tracks\n * traversed objects.\n *\n * @private\n * @param {*} value The value to clone.\n * @param {boolean} bitmask The bitmask flags.\n *  1 - Deep clone\n *  2 - Flatten inherited properties\n *  4 - Clone symbols\n * @param {Function} [customizer] The function to customize cloning.\n * @param {string} [key] The key of `value`.\n * @param {Object} [object] The parent object of `value`.\n * @param {Object} [stack] Tracks traversed objects and their clone counterparts.\n * @returns {*} Returns the cloned value.\n */\nfunction baseClone(value, bitmask, customizer, key, object, stack) {\n  var result,\n      isDeep = bitmask & CLONE_DEEP_FLAG,\n      isFlat = bitmask & CLONE_FLAT_FLAG,\n      isFull = bitmask & CLONE_SYMBOLS_FLAG;\n\n  if (customizer) {\n    result = object ? customizer(value, key, object, stack) : customizer(value);\n  }\n  if (result !== undefined) {\n    return result;\n  }\n  if (!isObject(value)) {\n    return value;\n  }\n  var isArr = isArray(value);\n  if (isArr) {\n    result = initCloneArray(value);\n    if (!isDeep) {\n      return copyArray(value, result);\n    }\n  } else {\n    var tag = getTag(value),\n        isFunc = tag == funcTag || tag == genTag;\n\n    if (isBuffer(value)) {\n      return cloneBuffer(value, isDeep);\n    }\n    if (tag == objectTag || tag == argsTag || (isFunc && !object)) {\n      result = (isFlat || isFunc) ? {} : initCloneObject(value);\n      if (!isDeep) {\n        return isFlat\n          ? copySymbolsIn(value, baseAssignIn(result, value))\n          : copySymbols(value, baseAssign(result, value));\n      }\n    } else {\n      if (!cloneableTags[tag]) {\n        return object ? value : {};\n      }\n      result = initCloneByTag(value, tag, isDeep);\n    }\n  }\n  // Check for circular references and return its corresponding clone.\n  stack || (stack = new Stack);\n  var stacked = stack.get(value);\n  if (stacked) {\n    return stacked;\n  }\n  stack.set(value, result);\n\n  if (isSet(value)) {\n    value.forEach(function(subValue) {\n      result.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));\n    });\n  } else if (isMap(value)) {\n    value.forEach(function(subValue, key) {\n      result.set(key, baseClone(subValue, bitmask, customizer, key, value, stack));\n    });\n  }\n\n  var keysFunc = isFull\n    ? (isFlat ? getAllKeysIn : getAllKeys)\n    : (isFlat ? keysIn : keys);\n\n  var props = isArr ? undefined : keysFunc(value);\n  arrayEach(props || value, function(subValue, key) {\n    if (props) {\n      key = subValue;\n      subValue = value[key];\n    }\n    // Recursively populate clone (susceptible to call stack limits).\n    assignValue(result, key, baseClone(subValue, bitmask, customizer, key, value, stack));\n  });\n  return result;\n}\n\nmodule.exports = baseClone;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_baseClone.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseCreate.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_baseCreate.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var isObject = __webpack_require__(/*! ./isObject */ \"./node_modules/lodash/isObject.js\");\n\n/** Built-in value references. */\nvar objectCreate = Object.create;\n\n/**\n * The base implementation of `_.create` without support for assigning\n * properties to the created object.\n *\n * @private\n * @param {Object} proto The object to inherit from.\n * @returns {Object} Returns the new object.\n */\nvar baseCreate = (function() {\n  function object() {}\n  return function(proto) {\n    if (!isObject(proto)) {\n      return {};\n    }\n    if (objectCreate) {\n      return objectCreate(proto);\n    }\n    object.prototype = proto;\n    var result = new object;\n    object.prototype = undefined;\n    return result;\n  };\n}());\n\nmodule.exports = baseCreate;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_baseCreate.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseGetAllKeys.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_baseGetAllKeys.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var arrayPush = __webpack_require__(/*! ./_arrayPush */ \"./node_modules/lodash/_arrayPush.js\"),\n    isArray = __webpack_require__(/*! ./isArray */ \"./node_modules/lodash/isArray.js\");\n\n/**\n * The base implementation of `getAllKeys` and `getAllKeysIn` which uses\n * `keysFunc` and `symbolsFunc` to get the enumerable property names and\n * symbols of `object`.\n *\n * @private\n * @param {Object} object The object to query.\n * @param {Function} keysFunc The function to get the keys of `object`.\n * @param {Function} symbolsFunc The function to get the symbols of `object`.\n * @returns {Array} Returns the array of property names and symbols.\n */\nfunction baseGetAllKeys(object, keysFunc, symbolsFunc) {\n  var result = keysFunc(object);\n  return isArray(object) ? result : arrayPush(result, symbolsFunc(object));\n}\n\nmodule.exports = baseGetAllKeys;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_baseGetAllKeys.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseGetTag.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_baseGetTag.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var Symbol = __webpack_require__(/*! ./_Symbol */ \"./node_modules/lodash/_Symbol.js\"),\n    getRawTag = __webpack_require__(/*! ./_getRawTag */ \"./node_modules/lodash/_getRawTag.js\"),\n    objectToString = __webpack_require__(/*! ./_objectToString */ \"./node_modules/lodash/_objectToString.js\");\n\n/** `Object#toString` result references. */\nvar nullTag = '[object Null]',\n    undefinedTag = '[object Undefined]';\n\n/** Built-in value references. */\nvar symToStringTag = Symbol ? Symbol.toStringTag : undefined;\n\n/**\n * The base implementation of `getTag` without fallbacks for buggy environments.\n *\n * @private\n * @param {*} value The value to query.\n * @returns {string} Returns the `toStringTag`.\n */\nfunction baseGetTag(value) {\n  if (value == null) {\n    return value === undefined ? undefinedTag : nullTag;\n  }\n  return (symToStringTag && symToStringTag in Object(value))\n    ? getRawTag(value)\n    : objectToString(value);\n}\n\nmodule.exports = baseGetTag;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_baseGetTag.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseIsArguments.js":
/*!*************************************************!*\
  !*** ./node_modules/lodash/_baseIsArguments.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ \"./node_modules/lodash/_baseGetTag.js\"),\n    isObjectLike = __webpack_require__(/*! ./isObjectLike */ \"./node_modules/lodash/isObjectLike.js\");\n\n/** `Object#toString` result references. */\nvar argsTag = '[object Arguments]';\n\n/**\n * The base implementation of `_.isArguments`.\n *\n * @private\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is an `arguments` object,\n */\nfunction baseIsArguments(value) {\n  return isObjectLike(value) && baseGetTag(value) == argsTag;\n}\n\nmodule.exports = baseIsArguments;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_baseIsArguments.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseIsMap.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_baseIsMap.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var getTag = __webpack_require__(/*! ./_getTag */ \"./node_modules/lodash/_getTag.js\"),\n    isObjectLike = __webpack_require__(/*! ./isObjectLike */ \"./node_modules/lodash/isObjectLike.js\");\n\n/** `Object#toString` result references. */\nvar mapTag = '[object Map]';\n\n/**\n * The base implementation of `_.isMap` without Node.js optimizations.\n *\n * @private\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is a map, else `false`.\n */\nfunction baseIsMap(value) {\n  return isObjectLike(value) && getTag(value) == mapTag;\n}\n\nmodule.exports = baseIsMap;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_baseIsMap.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseIsNative.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_baseIsNative.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var isFunction = __webpack_require__(/*! ./isFunction */ \"./node_modules/lodash/isFunction.js\"),\n    isMasked = __webpack_require__(/*! ./_isMasked */ \"./node_modules/lodash/_isMasked.js\"),\n    isObject = __webpack_require__(/*! ./isObject */ \"./node_modules/lodash/isObject.js\"),\n    toSource = __webpack_require__(/*! ./_toSource */ \"./node_modules/lodash/_toSource.js\");\n\n/**\n * Used to match `RegExp`\n * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).\n */\nvar reRegExpChar = /[\\\\^$.*+?()[\\]{}|]/g;\n\n/** Used to detect host constructors (Safari). */\nvar reIsHostCtor = /^\\[object .+?Constructor\\]$/;\n\n/** Used for built-in method references. */\nvar funcProto = Function.prototype,\n    objectProto = Object.prototype;\n\n/** Used to resolve the decompiled source of functions. */\nvar funcToString = funcProto.toString;\n\n/** Used to check objects for own properties. */\nvar hasOwnProperty = objectProto.hasOwnProperty;\n\n/** Used to detect if a method is native. */\nvar reIsNative = RegExp('^' +\n  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\\\$&')\n  .replace(/hasOwnProperty|(function).*?(?=\\\\\\()| for .+?(?=\\\\\\])/g, '$1.*?') + '$'\n);\n\n/**\n * The base implementation of `_.isNative` without bad shim checks.\n *\n * @private\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is a native function,\n *  else `false`.\n */\nfunction baseIsNative(value) {\n  if (!isObject(value) || isMasked(value)) {\n    return false;\n  }\n  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;\n  return pattern.test(toSource(value));\n}\n\nmodule.exports = baseIsNative;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_baseIsNative.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseIsSet.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_baseIsSet.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var getTag = __webpack_require__(/*! ./_getTag */ \"./node_modules/lodash/_getTag.js\"),\n    isObjectLike = __webpack_require__(/*! ./isObjectLike */ \"./node_modules/lodash/isObjectLike.js\");\n\n/** `Object#toString` result references. */\nvar setTag = '[object Set]';\n\n/**\n * The base implementation of `_.isSet` without Node.js optimizations.\n *\n * @private\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is a set, else `false`.\n */\nfunction baseIsSet(value) {\n  return isObjectLike(value) && getTag(value) == setTag;\n}\n\nmodule.exports = baseIsSet;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_baseIsSet.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseIsTypedArray.js":
/*!**************************************************!*\
  !*** ./node_modules/lodash/_baseIsTypedArray.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ \"./node_modules/lodash/_baseGetTag.js\"),\n    isLength = __webpack_require__(/*! ./isLength */ \"./node_modules/lodash/isLength.js\"),\n    isObjectLike = __webpack_require__(/*! ./isObjectLike */ \"./node_modules/lodash/isObjectLike.js\");\n\n/** `Object#toString` result references. */\nvar argsTag = '[object Arguments]',\n    arrayTag = '[object Array]',\n    boolTag = '[object Boolean]',\n    dateTag = '[object Date]',\n    errorTag = '[object Error]',\n    funcTag = '[object Function]',\n    mapTag = '[object Map]',\n    numberTag = '[object Number]',\n    objectTag = '[object Object]',\n    regexpTag = '[object RegExp]',\n    setTag = '[object Set]',\n    stringTag = '[object String]',\n    weakMapTag = '[object WeakMap]';\n\nvar arrayBufferTag = '[object ArrayBuffer]',\n    dataViewTag = '[object DataView]',\n    float32Tag = '[object Float32Array]',\n    float64Tag = '[object Float64Array]',\n    int8Tag = '[object Int8Array]',\n    int16Tag = '[object Int16Array]',\n    int32Tag = '[object Int32Array]',\n    uint8Tag = '[object Uint8Array]',\n    uint8ClampedTag = '[object Uint8ClampedArray]',\n    uint16Tag = '[object Uint16Array]',\n    uint32Tag = '[object Uint32Array]';\n\n/** Used to identify `toStringTag` values of typed arrays. */\nvar typedArrayTags = {};\ntypedArrayTags[float32Tag] = typedArrayTags[float64Tag] =\ntypedArrayTags[int8Tag] = typedArrayTags[int16Tag] =\ntypedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =\ntypedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =\ntypedArrayTags[uint32Tag] = true;\ntypedArrayTags[argsTag] = typedArrayTags[arrayTag] =\ntypedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =\ntypedArrayTags[dataViewTag] = typedArrayTags[dateTag] =\ntypedArrayTags[errorTag] = typedArrayTags[funcTag] =\ntypedArrayTags[mapTag] = typedArrayTags[numberTag] =\ntypedArrayTags[objectTag] = typedArrayTags[regexpTag] =\ntypedArrayTags[setTag] = typedArrayTags[stringTag] =\ntypedArrayTags[weakMapTag] = false;\n\n/**\n * The base implementation of `_.isTypedArray` without Node.js optimizations.\n *\n * @private\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.\n */\nfunction baseIsTypedArray(value) {\n  return isObjectLike(value) &&\n    isLength(value.length) && !!typedArrayTags[baseGetTag(value)];\n}\n\nmodule.exports = baseIsTypedArray;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_baseIsTypedArray.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseKeys.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_baseKeys.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var isPrototype = __webpack_require__(/*! ./_isPrototype */ \"./node_modules/lodash/_isPrototype.js\"),\n    nativeKeys = __webpack_require__(/*! ./_nativeKeys */ \"./node_modules/lodash/_nativeKeys.js\");\n\n/** Used for built-in method references. */\nvar objectProto = Object.prototype;\n\n/** Used to check objects for own properties. */\nvar hasOwnProperty = objectProto.hasOwnProperty;\n\n/**\n * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.\n *\n * @private\n * @param {Object} object The object to query.\n * @returns {Array} Returns the array of property names.\n */\nfunction baseKeys(object) {\n  if (!isPrototype(object)) {\n    return nativeKeys(object);\n  }\n  var result = [];\n  for (var key in Object(object)) {\n    if (hasOwnProperty.call(object, key) && key != 'constructor') {\n      result.push(key);\n    }\n  }\n  return result;\n}\n\nmodule.exports = baseKeys;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_baseKeys.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseKeysIn.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_baseKeysIn.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var isObject = __webpack_require__(/*! ./isObject */ \"./node_modules/lodash/isObject.js\"),\n    isPrototype = __webpack_require__(/*! ./_isPrototype */ \"./node_modules/lodash/_isPrototype.js\"),\n    nativeKeysIn = __webpack_require__(/*! ./_nativeKeysIn */ \"./node_modules/lodash/_nativeKeysIn.js\");\n\n/** Used for built-in method references. */\nvar objectProto = Object.prototype;\n\n/** Used to check objects for own properties. */\nvar hasOwnProperty = objectProto.hasOwnProperty;\n\n/**\n * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.\n *\n * @private\n * @param {Object} object The object to query.\n * @returns {Array} Returns the array of property names.\n */\nfunction baseKeysIn(object) {\n  if (!isObject(object)) {\n    return nativeKeysIn(object);\n  }\n  var isProto = isPrototype(object),\n      result = [];\n\n  for (var key in object) {\n    if (!(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {\n      result.push(key);\n    }\n  }\n  return result;\n}\n\nmodule.exports = baseKeysIn;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_baseKeysIn.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseTimes.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_baseTimes.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * The base implementation of `_.times` without support for iteratee shorthands\n * or max array length checks.\n *\n * @private\n * @param {number} n The number of times to invoke `iteratee`.\n * @param {Function} iteratee The function invoked per iteration.\n * @returns {Array} Returns the array of results.\n */\nfunction baseTimes(n, iteratee) {\n  var index = -1,\n      result = Array(n);\n\n  while (++index < n) {\n    result[index] = iteratee(index);\n  }\n  return result;\n}\n\nmodule.exports = baseTimes;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_baseTimes.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseUnary.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_baseUnary.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * The base implementation of `_.unary` without support for storing metadata.\n *\n * @private\n * @param {Function} func The function to cap arguments for.\n * @returns {Function} Returns the new capped function.\n */\nfunction baseUnary(func) {\n  return function(value) {\n    return func(value);\n  };\n}\n\nmodule.exports = baseUnary;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_baseUnary.js?");

/***/ }),

/***/ "./node_modules/lodash/_cloneArrayBuffer.js":
/*!**************************************************!*\
  !*** ./node_modules/lodash/_cloneArrayBuffer.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var Uint8Array = __webpack_require__(/*! ./_Uint8Array */ \"./node_modules/lodash/_Uint8Array.js\");\n\n/**\n * Creates a clone of `arrayBuffer`.\n *\n * @private\n * @param {ArrayBuffer} arrayBuffer The array buffer to clone.\n * @returns {ArrayBuffer} Returns the cloned array buffer.\n */\nfunction cloneArrayBuffer(arrayBuffer) {\n  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);\n  new Uint8Array(result).set(new Uint8Array(arrayBuffer));\n  return result;\n}\n\nmodule.exports = cloneArrayBuffer;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_cloneArrayBuffer.js?");

/***/ }),

/***/ "./node_modules/lodash/_cloneBuffer.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_cloneBuffer.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(module) {var root = __webpack_require__(/*! ./_root */ \"./node_modules/lodash/_root.js\");\n\n/** Detect free variable `exports`. */\nvar freeExports =  true && exports && !exports.nodeType && exports;\n\n/** Detect free variable `module`. */\nvar freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;\n\n/** Detect the popular CommonJS extension `module.exports`. */\nvar moduleExports = freeModule && freeModule.exports === freeExports;\n\n/** Built-in value references. */\nvar Buffer = moduleExports ? root.Buffer : undefined,\n    allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined;\n\n/**\n * Creates a clone of  `buffer`.\n *\n * @private\n * @param {Buffer} buffer The buffer to clone.\n * @param {boolean} [isDeep] Specify a deep clone.\n * @returns {Buffer} Returns the cloned buffer.\n */\nfunction cloneBuffer(buffer, isDeep) {\n  if (isDeep) {\n    return buffer.slice();\n  }\n  var length = buffer.length,\n      result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);\n\n  buffer.copy(result);\n  return result;\n}\n\nmodule.exports = cloneBuffer;\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/module.js */ \"./node_modules/webpack/buildin/module.js\")(module)))\n\n//# sourceURL=webpack:///./node_modules/lodash/_cloneBuffer.js?");

/***/ }),

/***/ "./node_modules/lodash/_cloneDataView.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash/_cloneDataView.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var cloneArrayBuffer = __webpack_require__(/*! ./_cloneArrayBuffer */ \"./node_modules/lodash/_cloneArrayBuffer.js\");\n\n/**\n * Creates a clone of `dataView`.\n *\n * @private\n * @param {Object} dataView The data view to clone.\n * @param {boolean} [isDeep] Specify a deep clone.\n * @returns {Object} Returns the cloned data view.\n */\nfunction cloneDataView(dataView, isDeep) {\n  var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;\n  return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);\n}\n\nmodule.exports = cloneDataView;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_cloneDataView.js?");

/***/ }),

/***/ "./node_modules/lodash/_cloneRegExp.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_cloneRegExp.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/** Used to match `RegExp` flags from their coerced string values. */\nvar reFlags = /\\w*$/;\n\n/**\n * Creates a clone of `regexp`.\n *\n * @private\n * @param {Object} regexp The regexp to clone.\n * @returns {Object} Returns the cloned regexp.\n */\nfunction cloneRegExp(regexp) {\n  var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));\n  result.lastIndex = regexp.lastIndex;\n  return result;\n}\n\nmodule.exports = cloneRegExp;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_cloneRegExp.js?");

/***/ }),

/***/ "./node_modules/lodash/_cloneSymbol.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_cloneSymbol.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var Symbol = __webpack_require__(/*! ./_Symbol */ \"./node_modules/lodash/_Symbol.js\");\n\n/** Used to convert symbols to primitives and strings. */\nvar symbolProto = Symbol ? Symbol.prototype : undefined,\n    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;\n\n/**\n * Creates a clone of the `symbol` object.\n *\n * @private\n * @param {Object} symbol The symbol object to clone.\n * @returns {Object} Returns the cloned symbol object.\n */\nfunction cloneSymbol(symbol) {\n  return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};\n}\n\nmodule.exports = cloneSymbol;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_cloneSymbol.js?");

/***/ }),

/***/ "./node_modules/lodash/_cloneTypedArray.js":
/*!*************************************************!*\
  !*** ./node_modules/lodash/_cloneTypedArray.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var cloneArrayBuffer = __webpack_require__(/*! ./_cloneArrayBuffer */ \"./node_modules/lodash/_cloneArrayBuffer.js\");\n\n/**\n * Creates a clone of `typedArray`.\n *\n * @private\n * @param {Object} typedArray The typed array to clone.\n * @param {boolean} [isDeep] Specify a deep clone.\n * @returns {Object} Returns the cloned typed array.\n */\nfunction cloneTypedArray(typedArray, isDeep) {\n  var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;\n  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);\n}\n\nmodule.exports = cloneTypedArray;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_cloneTypedArray.js?");

/***/ }),

/***/ "./node_modules/lodash/_copyArray.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_copyArray.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Copies the values of `source` to `array`.\n *\n * @private\n * @param {Array} source The array to copy values from.\n * @param {Array} [array=[]] The array to copy values to.\n * @returns {Array} Returns `array`.\n */\nfunction copyArray(source, array) {\n  var index = -1,\n      length = source.length;\n\n  array || (array = Array(length));\n  while (++index < length) {\n    array[index] = source[index];\n  }\n  return array;\n}\n\nmodule.exports = copyArray;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_copyArray.js?");

/***/ }),

/***/ "./node_modules/lodash/_copyObject.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_copyObject.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var assignValue = __webpack_require__(/*! ./_assignValue */ \"./node_modules/lodash/_assignValue.js\"),\n    baseAssignValue = __webpack_require__(/*! ./_baseAssignValue */ \"./node_modules/lodash/_baseAssignValue.js\");\n\n/**\n * Copies properties of `source` to `object`.\n *\n * @private\n * @param {Object} source The object to copy properties from.\n * @param {Array} props The property identifiers to copy.\n * @param {Object} [object={}] The object to copy properties to.\n * @param {Function} [customizer] The function to customize copied values.\n * @returns {Object} Returns `object`.\n */\nfunction copyObject(source, props, object, customizer) {\n  var isNew = !object;\n  object || (object = {});\n\n  var index = -1,\n      length = props.length;\n\n  while (++index < length) {\n    var key = props[index];\n\n    var newValue = customizer\n      ? customizer(object[key], source[key], key, object, source)\n      : undefined;\n\n    if (newValue === undefined) {\n      newValue = source[key];\n    }\n    if (isNew) {\n      baseAssignValue(object, key, newValue);\n    } else {\n      assignValue(object, key, newValue);\n    }\n  }\n  return object;\n}\n\nmodule.exports = copyObject;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_copyObject.js?");

/***/ }),

/***/ "./node_modules/lodash/_copySymbols.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_copySymbols.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var copyObject = __webpack_require__(/*! ./_copyObject */ \"./node_modules/lodash/_copyObject.js\"),\n    getSymbols = __webpack_require__(/*! ./_getSymbols */ \"./node_modules/lodash/_getSymbols.js\");\n\n/**\n * Copies own symbols of `source` to `object`.\n *\n * @private\n * @param {Object} source The object to copy symbols from.\n * @param {Object} [object={}] The object to copy symbols to.\n * @returns {Object} Returns `object`.\n */\nfunction copySymbols(source, object) {\n  return copyObject(source, getSymbols(source), object);\n}\n\nmodule.exports = copySymbols;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_copySymbols.js?");

/***/ }),

/***/ "./node_modules/lodash/_copySymbolsIn.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash/_copySymbolsIn.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var copyObject = __webpack_require__(/*! ./_copyObject */ \"./node_modules/lodash/_copyObject.js\"),\n    getSymbolsIn = __webpack_require__(/*! ./_getSymbolsIn */ \"./node_modules/lodash/_getSymbolsIn.js\");\n\n/**\n * Copies own and inherited symbols of `source` to `object`.\n *\n * @private\n * @param {Object} source The object to copy symbols from.\n * @param {Object} [object={}] The object to copy symbols to.\n * @returns {Object} Returns `object`.\n */\nfunction copySymbolsIn(source, object) {\n  return copyObject(source, getSymbolsIn(source), object);\n}\n\nmodule.exports = copySymbolsIn;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_copySymbolsIn.js?");

/***/ }),

/***/ "./node_modules/lodash/_coreJsData.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_coreJsData.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var root = __webpack_require__(/*! ./_root */ \"./node_modules/lodash/_root.js\");\n\n/** Used to detect overreaching core-js shims. */\nvar coreJsData = root['__core-js_shared__'];\n\nmodule.exports = coreJsData;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_coreJsData.js?");

/***/ }),

/***/ "./node_modules/lodash/_defineProperty.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_defineProperty.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var getNative = __webpack_require__(/*! ./_getNative */ \"./node_modules/lodash/_getNative.js\");\n\nvar defineProperty = (function() {\n  try {\n    var func = getNative(Object, 'defineProperty');\n    func({}, '', {});\n    return func;\n  } catch (e) {}\n}());\n\nmodule.exports = defineProperty;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_defineProperty.js?");

/***/ }),

/***/ "./node_modules/lodash/_freeGlobal.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_freeGlobal.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */\nvar freeGlobal = typeof global == 'object' && global && global.Object === Object && global;\n\nmodule.exports = freeGlobal;\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ \"./node_modules/webpack/buildin/global.js\")))\n\n//# sourceURL=webpack:///./node_modules/lodash/_freeGlobal.js?");

/***/ }),

/***/ "./node_modules/lodash/_getAllKeys.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_getAllKeys.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseGetAllKeys = __webpack_require__(/*! ./_baseGetAllKeys */ \"./node_modules/lodash/_baseGetAllKeys.js\"),\n    getSymbols = __webpack_require__(/*! ./_getSymbols */ \"./node_modules/lodash/_getSymbols.js\"),\n    keys = __webpack_require__(/*! ./keys */ \"./node_modules/lodash/keys.js\");\n\n/**\n * Creates an array of own enumerable property names and symbols of `object`.\n *\n * @private\n * @param {Object} object The object to query.\n * @returns {Array} Returns the array of property names and symbols.\n */\nfunction getAllKeys(object) {\n  return baseGetAllKeys(object, keys, getSymbols);\n}\n\nmodule.exports = getAllKeys;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_getAllKeys.js?");

/***/ }),

/***/ "./node_modules/lodash/_getAllKeysIn.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_getAllKeysIn.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseGetAllKeys = __webpack_require__(/*! ./_baseGetAllKeys */ \"./node_modules/lodash/_baseGetAllKeys.js\"),\n    getSymbolsIn = __webpack_require__(/*! ./_getSymbolsIn */ \"./node_modules/lodash/_getSymbolsIn.js\"),\n    keysIn = __webpack_require__(/*! ./keysIn */ \"./node_modules/lodash/keysIn.js\");\n\n/**\n * Creates an array of own and inherited enumerable property names and\n * symbols of `object`.\n *\n * @private\n * @param {Object} object The object to query.\n * @returns {Array} Returns the array of property names and symbols.\n */\nfunction getAllKeysIn(object) {\n  return baseGetAllKeys(object, keysIn, getSymbolsIn);\n}\n\nmodule.exports = getAllKeysIn;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_getAllKeysIn.js?");

/***/ }),

/***/ "./node_modules/lodash/_getMapData.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_getMapData.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var isKeyable = __webpack_require__(/*! ./_isKeyable */ \"./node_modules/lodash/_isKeyable.js\");\n\n/**\n * Gets the data for `map`.\n *\n * @private\n * @param {Object} map The map to query.\n * @param {string} key The reference key.\n * @returns {*} Returns the map data.\n */\nfunction getMapData(map, key) {\n  var data = map.__data__;\n  return isKeyable(key)\n    ? data[typeof key == 'string' ? 'string' : 'hash']\n    : data.map;\n}\n\nmodule.exports = getMapData;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_getMapData.js?");

/***/ }),

/***/ "./node_modules/lodash/_getNative.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_getNative.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseIsNative = __webpack_require__(/*! ./_baseIsNative */ \"./node_modules/lodash/_baseIsNative.js\"),\n    getValue = __webpack_require__(/*! ./_getValue */ \"./node_modules/lodash/_getValue.js\");\n\n/**\n * Gets the native function at `key` of `object`.\n *\n * @private\n * @param {Object} object The object to query.\n * @param {string} key The key of the method to get.\n * @returns {*} Returns the function if it's native, else `undefined`.\n */\nfunction getNative(object, key) {\n  var value = getValue(object, key);\n  return baseIsNative(value) ? value : undefined;\n}\n\nmodule.exports = getNative;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_getNative.js?");

/***/ }),

/***/ "./node_modules/lodash/_getPrototype.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_getPrototype.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var overArg = __webpack_require__(/*! ./_overArg */ \"./node_modules/lodash/_overArg.js\");\n\n/** Built-in value references. */\nvar getPrototype = overArg(Object.getPrototypeOf, Object);\n\nmodule.exports = getPrototype;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_getPrototype.js?");

/***/ }),

/***/ "./node_modules/lodash/_getRawTag.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_getRawTag.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var Symbol = __webpack_require__(/*! ./_Symbol */ \"./node_modules/lodash/_Symbol.js\");\n\n/** Used for built-in method references. */\nvar objectProto = Object.prototype;\n\n/** Used to check objects for own properties. */\nvar hasOwnProperty = objectProto.hasOwnProperty;\n\n/**\n * Used to resolve the\n * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)\n * of values.\n */\nvar nativeObjectToString = objectProto.toString;\n\n/** Built-in value references. */\nvar symToStringTag = Symbol ? Symbol.toStringTag : undefined;\n\n/**\n * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.\n *\n * @private\n * @param {*} value The value to query.\n * @returns {string} Returns the raw `toStringTag`.\n */\nfunction getRawTag(value) {\n  var isOwn = hasOwnProperty.call(value, symToStringTag),\n      tag = value[symToStringTag];\n\n  try {\n    value[symToStringTag] = undefined;\n    var unmasked = true;\n  } catch (e) {}\n\n  var result = nativeObjectToString.call(value);\n  if (unmasked) {\n    if (isOwn) {\n      value[symToStringTag] = tag;\n    } else {\n      delete value[symToStringTag];\n    }\n  }\n  return result;\n}\n\nmodule.exports = getRawTag;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_getRawTag.js?");

/***/ }),

/***/ "./node_modules/lodash/_getSymbols.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_getSymbols.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var arrayFilter = __webpack_require__(/*! ./_arrayFilter */ \"./node_modules/lodash/_arrayFilter.js\"),\n    stubArray = __webpack_require__(/*! ./stubArray */ \"./node_modules/lodash/stubArray.js\");\n\n/** Used for built-in method references. */\nvar objectProto = Object.prototype;\n\n/** Built-in value references. */\nvar propertyIsEnumerable = objectProto.propertyIsEnumerable;\n\n/* Built-in method references for those with the same name as other `lodash` methods. */\nvar nativeGetSymbols = Object.getOwnPropertySymbols;\n\n/**\n * Creates an array of the own enumerable symbols of `object`.\n *\n * @private\n * @param {Object} object The object to query.\n * @returns {Array} Returns the array of symbols.\n */\nvar getSymbols = !nativeGetSymbols ? stubArray : function(object) {\n  if (object == null) {\n    return [];\n  }\n  object = Object(object);\n  return arrayFilter(nativeGetSymbols(object), function(symbol) {\n    return propertyIsEnumerable.call(object, symbol);\n  });\n};\n\nmodule.exports = getSymbols;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_getSymbols.js?");

/***/ }),

/***/ "./node_modules/lodash/_getSymbolsIn.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_getSymbolsIn.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var arrayPush = __webpack_require__(/*! ./_arrayPush */ \"./node_modules/lodash/_arrayPush.js\"),\n    getPrototype = __webpack_require__(/*! ./_getPrototype */ \"./node_modules/lodash/_getPrototype.js\"),\n    getSymbols = __webpack_require__(/*! ./_getSymbols */ \"./node_modules/lodash/_getSymbols.js\"),\n    stubArray = __webpack_require__(/*! ./stubArray */ \"./node_modules/lodash/stubArray.js\");\n\n/* Built-in method references for those with the same name as other `lodash` methods. */\nvar nativeGetSymbols = Object.getOwnPropertySymbols;\n\n/**\n * Creates an array of the own and inherited enumerable symbols of `object`.\n *\n * @private\n * @param {Object} object The object to query.\n * @returns {Array} Returns the array of symbols.\n */\nvar getSymbolsIn = !nativeGetSymbols ? stubArray : function(object) {\n  var result = [];\n  while (object) {\n    arrayPush(result, getSymbols(object));\n    object = getPrototype(object);\n  }\n  return result;\n};\n\nmodule.exports = getSymbolsIn;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_getSymbolsIn.js?");

/***/ }),

/***/ "./node_modules/lodash/_getTag.js":
/*!****************************************!*\
  !*** ./node_modules/lodash/_getTag.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var DataView = __webpack_require__(/*! ./_DataView */ \"./node_modules/lodash/_DataView.js\"),\n    Map = __webpack_require__(/*! ./_Map */ \"./node_modules/lodash/_Map.js\"),\n    Promise = __webpack_require__(/*! ./_Promise */ \"./node_modules/lodash/_Promise.js\"),\n    Set = __webpack_require__(/*! ./_Set */ \"./node_modules/lodash/_Set.js\"),\n    WeakMap = __webpack_require__(/*! ./_WeakMap */ \"./node_modules/lodash/_WeakMap.js\"),\n    baseGetTag = __webpack_require__(/*! ./_baseGetTag */ \"./node_modules/lodash/_baseGetTag.js\"),\n    toSource = __webpack_require__(/*! ./_toSource */ \"./node_modules/lodash/_toSource.js\");\n\n/** `Object#toString` result references. */\nvar mapTag = '[object Map]',\n    objectTag = '[object Object]',\n    promiseTag = '[object Promise]',\n    setTag = '[object Set]',\n    weakMapTag = '[object WeakMap]';\n\nvar dataViewTag = '[object DataView]';\n\n/** Used to detect maps, sets, and weakmaps. */\nvar dataViewCtorString = toSource(DataView),\n    mapCtorString = toSource(Map),\n    promiseCtorString = toSource(Promise),\n    setCtorString = toSource(Set),\n    weakMapCtorString = toSource(WeakMap);\n\n/**\n * Gets the `toStringTag` of `value`.\n *\n * @private\n * @param {*} value The value to query.\n * @returns {string} Returns the `toStringTag`.\n */\nvar getTag = baseGetTag;\n\n// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.\nif ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||\n    (Map && getTag(new Map) != mapTag) ||\n    (Promise && getTag(Promise.resolve()) != promiseTag) ||\n    (Set && getTag(new Set) != setTag) ||\n    (WeakMap && getTag(new WeakMap) != weakMapTag)) {\n  getTag = function(value) {\n    var result = baseGetTag(value),\n        Ctor = result == objectTag ? value.constructor : undefined,\n        ctorString = Ctor ? toSource(Ctor) : '';\n\n    if (ctorString) {\n      switch (ctorString) {\n        case dataViewCtorString: return dataViewTag;\n        case mapCtorString: return mapTag;\n        case promiseCtorString: return promiseTag;\n        case setCtorString: return setTag;\n        case weakMapCtorString: return weakMapTag;\n      }\n    }\n    return result;\n  };\n}\n\nmodule.exports = getTag;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_getTag.js?");

/***/ }),

/***/ "./node_modules/lodash/_getValue.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_getValue.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Gets the value at `key` of `object`.\n *\n * @private\n * @param {Object} [object] The object to query.\n * @param {string} key The key of the property to get.\n * @returns {*} Returns the property value.\n */\nfunction getValue(object, key) {\n  return object == null ? undefined : object[key];\n}\n\nmodule.exports = getValue;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_getValue.js?");

/***/ }),

/***/ "./node_modules/lodash/_hashClear.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_hashClear.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var nativeCreate = __webpack_require__(/*! ./_nativeCreate */ \"./node_modules/lodash/_nativeCreate.js\");\n\n/**\n * Removes all key-value entries from the hash.\n *\n * @private\n * @name clear\n * @memberOf Hash\n */\nfunction hashClear() {\n  this.__data__ = nativeCreate ? nativeCreate(null) : {};\n  this.size = 0;\n}\n\nmodule.exports = hashClear;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_hashClear.js?");

/***/ }),

/***/ "./node_modules/lodash/_hashDelete.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_hashDelete.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Removes `key` and its value from the hash.\n *\n * @private\n * @name delete\n * @memberOf Hash\n * @param {Object} hash The hash to modify.\n * @param {string} key The key of the value to remove.\n * @returns {boolean} Returns `true` if the entry was removed, else `false`.\n */\nfunction hashDelete(key) {\n  var result = this.has(key) && delete this.__data__[key];\n  this.size -= result ? 1 : 0;\n  return result;\n}\n\nmodule.exports = hashDelete;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_hashDelete.js?");

/***/ }),

/***/ "./node_modules/lodash/_hashGet.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_hashGet.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var nativeCreate = __webpack_require__(/*! ./_nativeCreate */ \"./node_modules/lodash/_nativeCreate.js\");\n\n/** Used to stand-in for `undefined` hash values. */\nvar HASH_UNDEFINED = '__lodash_hash_undefined__';\n\n/** Used for built-in method references. */\nvar objectProto = Object.prototype;\n\n/** Used to check objects for own properties. */\nvar hasOwnProperty = objectProto.hasOwnProperty;\n\n/**\n * Gets the hash value for `key`.\n *\n * @private\n * @name get\n * @memberOf Hash\n * @param {string} key The key of the value to get.\n * @returns {*} Returns the entry value.\n */\nfunction hashGet(key) {\n  var data = this.__data__;\n  if (nativeCreate) {\n    var result = data[key];\n    return result === HASH_UNDEFINED ? undefined : result;\n  }\n  return hasOwnProperty.call(data, key) ? data[key] : undefined;\n}\n\nmodule.exports = hashGet;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_hashGet.js?");

/***/ }),

/***/ "./node_modules/lodash/_hashHas.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_hashHas.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var nativeCreate = __webpack_require__(/*! ./_nativeCreate */ \"./node_modules/lodash/_nativeCreate.js\");\n\n/** Used for built-in method references. */\nvar objectProto = Object.prototype;\n\n/** Used to check objects for own properties. */\nvar hasOwnProperty = objectProto.hasOwnProperty;\n\n/**\n * Checks if a hash value for `key` exists.\n *\n * @private\n * @name has\n * @memberOf Hash\n * @param {string} key The key of the entry to check.\n * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.\n */\nfunction hashHas(key) {\n  var data = this.__data__;\n  return nativeCreate ? (data[key] !== undefined) : hasOwnProperty.call(data, key);\n}\n\nmodule.exports = hashHas;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_hashHas.js?");

/***/ }),

/***/ "./node_modules/lodash/_hashSet.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_hashSet.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var nativeCreate = __webpack_require__(/*! ./_nativeCreate */ \"./node_modules/lodash/_nativeCreate.js\");\n\n/** Used to stand-in for `undefined` hash values. */\nvar HASH_UNDEFINED = '__lodash_hash_undefined__';\n\n/**\n * Sets the hash `key` to `value`.\n *\n * @private\n * @name set\n * @memberOf Hash\n * @param {string} key The key of the value to set.\n * @param {*} value The value to set.\n * @returns {Object} Returns the hash instance.\n */\nfunction hashSet(key, value) {\n  var data = this.__data__;\n  this.size += this.has(key) ? 0 : 1;\n  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;\n  return this;\n}\n\nmodule.exports = hashSet;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_hashSet.js?");

/***/ }),

/***/ "./node_modules/lodash/_initCloneArray.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_initCloneArray.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/** Used for built-in method references. */\nvar objectProto = Object.prototype;\n\n/** Used to check objects for own properties. */\nvar hasOwnProperty = objectProto.hasOwnProperty;\n\n/**\n * Initializes an array clone.\n *\n * @private\n * @param {Array} array The array to clone.\n * @returns {Array} Returns the initialized clone.\n */\nfunction initCloneArray(array) {\n  var length = array.length,\n      result = new array.constructor(length);\n\n  // Add properties assigned by `RegExp#exec`.\n  if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {\n    result.index = array.index;\n    result.input = array.input;\n  }\n  return result;\n}\n\nmodule.exports = initCloneArray;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_initCloneArray.js?");

/***/ }),

/***/ "./node_modules/lodash/_initCloneByTag.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_initCloneByTag.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var cloneArrayBuffer = __webpack_require__(/*! ./_cloneArrayBuffer */ \"./node_modules/lodash/_cloneArrayBuffer.js\"),\n    cloneDataView = __webpack_require__(/*! ./_cloneDataView */ \"./node_modules/lodash/_cloneDataView.js\"),\n    cloneRegExp = __webpack_require__(/*! ./_cloneRegExp */ \"./node_modules/lodash/_cloneRegExp.js\"),\n    cloneSymbol = __webpack_require__(/*! ./_cloneSymbol */ \"./node_modules/lodash/_cloneSymbol.js\"),\n    cloneTypedArray = __webpack_require__(/*! ./_cloneTypedArray */ \"./node_modules/lodash/_cloneTypedArray.js\");\n\n/** `Object#toString` result references. */\nvar boolTag = '[object Boolean]',\n    dateTag = '[object Date]',\n    mapTag = '[object Map]',\n    numberTag = '[object Number]',\n    regexpTag = '[object RegExp]',\n    setTag = '[object Set]',\n    stringTag = '[object String]',\n    symbolTag = '[object Symbol]';\n\nvar arrayBufferTag = '[object ArrayBuffer]',\n    dataViewTag = '[object DataView]',\n    float32Tag = '[object Float32Array]',\n    float64Tag = '[object Float64Array]',\n    int8Tag = '[object Int8Array]',\n    int16Tag = '[object Int16Array]',\n    int32Tag = '[object Int32Array]',\n    uint8Tag = '[object Uint8Array]',\n    uint8ClampedTag = '[object Uint8ClampedArray]',\n    uint16Tag = '[object Uint16Array]',\n    uint32Tag = '[object Uint32Array]';\n\n/**\n * Initializes an object clone based on its `toStringTag`.\n *\n * **Note:** This function only supports cloning values with tags of\n * `Boolean`, `Date`, `Error`, `Map`, `Number`, `RegExp`, `Set`, or `String`.\n *\n * @private\n * @param {Object} object The object to clone.\n * @param {string} tag The `toStringTag` of the object to clone.\n * @param {boolean} [isDeep] Specify a deep clone.\n * @returns {Object} Returns the initialized clone.\n */\nfunction initCloneByTag(object, tag, isDeep) {\n  var Ctor = object.constructor;\n  switch (tag) {\n    case arrayBufferTag:\n      return cloneArrayBuffer(object);\n\n    case boolTag:\n    case dateTag:\n      return new Ctor(+object);\n\n    case dataViewTag:\n      return cloneDataView(object, isDeep);\n\n    case float32Tag: case float64Tag:\n    case int8Tag: case int16Tag: case int32Tag:\n    case uint8Tag: case uint8ClampedTag: case uint16Tag: case uint32Tag:\n      return cloneTypedArray(object, isDeep);\n\n    case mapTag:\n      return new Ctor;\n\n    case numberTag:\n    case stringTag:\n      return new Ctor(object);\n\n    case regexpTag:\n      return cloneRegExp(object);\n\n    case setTag:\n      return new Ctor;\n\n    case symbolTag:\n      return cloneSymbol(object);\n  }\n}\n\nmodule.exports = initCloneByTag;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_initCloneByTag.js?");

/***/ }),

/***/ "./node_modules/lodash/_initCloneObject.js":
/*!*************************************************!*\
  !*** ./node_modules/lodash/_initCloneObject.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseCreate = __webpack_require__(/*! ./_baseCreate */ \"./node_modules/lodash/_baseCreate.js\"),\n    getPrototype = __webpack_require__(/*! ./_getPrototype */ \"./node_modules/lodash/_getPrototype.js\"),\n    isPrototype = __webpack_require__(/*! ./_isPrototype */ \"./node_modules/lodash/_isPrototype.js\");\n\n/**\n * Initializes an object clone.\n *\n * @private\n * @param {Object} object The object to clone.\n * @returns {Object} Returns the initialized clone.\n */\nfunction initCloneObject(object) {\n  return (typeof object.constructor == 'function' && !isPrototype(object))\n    ? baseCreate(getPrototype(object))\n    : {};\n}\n\nmodule.exports = initCloneObject;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_initCloneObject.js?");

/***/ }),

/***/ "./node_modules/lodash/_isIndex.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_isIndex.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/** Used as references for various `Number` constants. */\nvar MAX_SAFE_INTEGER = 9007199254740991;\n\n/** Used to detect unsigned integer values. */\nvar reIsUint = /^(?:0|[1-9]\\d*)$/;\n\n/**\n * Checks if `value` is a valid array-like index.\n *\n * @private\n * @param {*} value The value to check.\n * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.\n * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.\n */\nfunction isIndex(value, length) {\n  var type = typeof value;\n  length = length == null ? MAX_SAFE_INTEGER : length;\n\n  return !!length &&\n    (type == 'number' ||\n      (type != 'symbol' && reIsUint.test(value))) &&\n        (value > -1 && value % 1 == 0 && value < length);\n}\n\nmodule.exports = isIndex;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_isIndex.js?");

/***/ }),

/***/ "./node_modules/lodash/_isKeyable.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_isKeyable.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Checks if `value` is suitable for use as unique object key.\n *\n * @private\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is suitable, else `false`.\n */\nfunction isKeyable(value) {\n  var type = typeof value;\n  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')\n    ? (value !== '__proto__')\n    : (value === null);\n}\n\nmodule.exports = isKeyable;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_isKeyable.js?");

/***/ }),

/***/ "./node_modules/lodash/_isMasked.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_isMasked.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var coreJsData = __webpack_require__(/*! ./_coreJsData */ \"./node_modules/lodash/_coreJsData.js\");\n\n/** Used to detect methods masquerading as native. */\nvar maskSrcKey = (function() {\n  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');\n  return uid ? ('Symbol(src)_1.' + uid) : '';\n}());\n\n/**\n * Checks if `func` has its source masked.\n *\n * @private\n * @param {Function} func The function to check.\n * @returns {boolean} Returns `true` if `func` is masked, else `false`.\n */\nfunction isMasked(func) {\n  return !!maskSrcKey && (maskSrcKey in func);\n}\n\nmodule.exports = isMasked;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_isMasked.js?");

/***/ }),

/***/ "./node_modules/lodash/_isPrototype.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_isPrototype.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/** Used for built-in method references. */\nvar objectProto = Object.prototype;\n\n/**\n * Checks if `value` is likely a prototype object.\n *\n * @private\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.\n */\nfunction isPrototype(value) {\n  var Ctor = value && value.constructor,\n      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;\n\n  return value === proto;\n}\n\nmodule.exports = isPrototype;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_isPrototype.js?");

/***/ }),

/***/ "./node_modules/lodash/_listCacheClear.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_listCacheClear.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Removes all key-value entries from the list cache.\n *\n * @private\n * @name clear\n * @memberOf ListCache\n */\nfunction listCacheClear() {\n  this.__data__ = [];\n  this.size = 0;\n}\n\nmodule.exports = listCacheClear;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_listCacheClear.js?");

/***/ }),

/***/ "./node_modules/lodash/_listCacheDelete.js":
/*!*************************************************!*\
  !*** ./node_modules/lodash/_listCacheDelete.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var assocIndexOf = __webpack_require__(/*! ./_assocIndexOf */ \"./node_modules/lodash/_assocIndexOf.js\");\n\n/** Used for built-in method references. */\nvar arrayProto = Array.prototype;\n\n/** Built-in value references. */\nvar splice = arrayProto.splice;\n\n/**\n * Removes `key` and its value from the list cache.\n *\n * @private\n * @name delete\n * @memberOf ListCache\n * @param {string} key The key of the value to remove.\n * @returns {boolean} Returns `true` if the entry was removed, else `false`.\n */\nfunction listCacheDelete(key) {\n  var data = this.__data__,\n      index = assocIndexOf(data, key);\n\n  if (index < 0) {\n    return false;\n  }\n  var lastIndex = data.length - 1;\n  if (index == lastIndex) {\n    data.pop();\n  } else {\n    splice.call(data, index, 1);\n  }\n  --this.size;\n  return true;\n}\n\nmodule.exports = listCacheDelete;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_listCacheDelete.js?");

/***/ }),

/***/ "./node_modules/lodash/_listCacheGet.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_listCacheGet.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var assocIndexOf = __webpack_require__(/*! ./_assocIndexOf */ \"./node_modules/lodash/_assocIndexOf.js\");\n\n/**\n * Gets the list cache value for `key`.\n *\n * @private\n * @name get\n * @memberOf ListCache\n * @param {string} key The key of the value to get.\n * @returns {*} Returns the entry value.\n */\nfunction listCacheGet(key) {\n  var data = this.__data__,\n      index = assocIndexOf(data, key);\n\n  return index < 0 ? undefined : data[index][1];\n}\n\nmodule.exports = listCacheGet;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_listCacheGet.js?");

/***/ }),

/***/ "./node_modules/lodash/_listCacheHas.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_listCacheHas.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var assocIndexOf = __webpack_require__(/*! ./_assocIndexOf */ \"./node_modules/lodash/_assocIndexOf.js\");\n\n/**\n * Checks if a list cache value for `key` exists.\n *\n * @private\n * @name has\n * @memberOf ListCache\n * @param {string} key The key of the entry to check.\n * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.\n */\nfunction listCacheHas(key) {\n  return assocIndexOf(this.__data__, key) > -1;\n}\n\nmodule.exports = listCacheHas;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_listCacheHas.js?");

/***/ }),

/***/ "./node_modules/lodash/_listCacheSet.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_listCacheSet.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var assocIndexOf = __webpack_require__(/*! ./_assocIndexOf */ \"./node_modules/lodash/_assocIndexOf.js\");\n\n/**\n * Sets the list cache `key` to `value`.\n *\n * @private\n * @name set\n * @memberOf ListCache\n * @param {string} key The key of the value to set.\n * @param {*} value The value to set.\n * @returns {Object} Returns the list cache instance.\n */\nfunction listCacheSet(key, value) {\n  var data = this.__data__,\n      index = assocIndexOf(data, key);\n\n  if (index < 0) {\n    ++this.size;\n    data.push([key, value]);\n  } else {\n    data[index][1] = value;\n  }\n  return this;\n}\n\nmodule.exports = listCacheSet;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_listCacheSet.js?");

/***/ }),

/***/ "./node_modules/lodash/_mapCacheClear.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash/_mapCacheClear.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var Hash = __webpack_require__(/*! ./_Hash */ \"./node_modules/lodash/_Hash.js\"),\n    ListCache = __webpack_require__(/*! ./_ListCache */ \"./node_modules/lodash/_ListCache.js\"),\n    Map = __webpack_require__(/*! ./_Map */ \"./node_modules/lodash/_Map.js\");\n\n/**\n * Removes all key-value entries from the map.\n *\n * @private\n * @name clear\n * @memberOf MapCache\n */\nfunction mapCacheClear() {\n  this.size = 0;\n  this.__data__ = {\n    'hash': new Hash,\n    'map': new (Map || ListCache),\n    'string': new Hash\n  };\n}\n\nmodule.exports = mapCacheClear;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_mapCacheClear.js?");

/***/ }),

/***/ "./node_modules/lodash/_mapCacheDelete.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_mapCacheDelete.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var getMapData = __webpack_require__(/*! ./_getMapData */ \"./node_modules/lodash/_getMapData.js\");\n\n/**\n * Removes `key` and its value from the map.\n *\n * @private\n * @name delete\n * @memberOf MapCache\n * @param {string} key The key of the value to remove.\n * @returns {boolean} Returns `true` if the entry was removed, else `false`.\n */\nfunction mapCacheDelete(key) {\n  var result = getMapData(this, key)['delete'](key);\n  this.size -= result ? 1 : 0;\n  return result;\n}\n\nmodule.exports = mapCacheDelete;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_mapCacheDelete.js?");

/***/ }),

/***/ "./node_modules/lodash/_mapCacheGet.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_mapCacheGet.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var getMapData = __webpack_require__(/*! ./_getMapData */ \"./node_modules/lodash/_getMapData.js\");\n\n/**\n * Gets the map value for `key`.\n *\n * @private\n * @name get\n * @memberOf MapCache\n * @param {string} key The key of the value to get.\n * @returns {*} Returns the entry value.\n */\nfunction mapCacheGet(key) {\n  return getMapData(this, key).get(key);\n}\n\nmodule.exports = mapCacheGet;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_mapCacheGet.js?");

/***/ }),

/***/ "./node_modules/lodash/_mapCacheHas.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_mapCacheHas.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var getMapData = __webpack_require__(/*! ./_getMapData */ \"./node_modules/lodash/_getMapData.js\");\n\n/**\n * Checks if a map value for `key` exists.\n *\n * @private\n * @name has\n * @memberOf MapCache\n * @param {string} key The key of the entry to check.\n * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.\n */\nfunction mapCacheHas(key) {\n  return getMapData(this, key).has(key);\n}\n\nmodule.exports = mapCacheHas;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_mapCacheHas.js?");

/***/ }),

/***/ "./node_modules/lodash/_mapCacheSet.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_mapCacheSet.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var getMapData = __webpack_require__(/*! ./_getMapData */ \"./node_modules/lodash/_getMapData.js\");\n\n/**\n * Sets the map `key` to `value`.\n *\n * @private\n * @name set\n * @memberOf MapCache\n * @param {string} key The key of the value to set.\n * @param {*} value The value to set.\n * @returns {Object} Returns the map cache instance.\n */\nfunction mapCacheSet(key, value) {\n  var data = getMapData(this, key),\n      size = data.size;\n\n  data.set(key, value);\n  this.size += data.size == size ? 0 : 1;\n  return this;\n}\n\nmodule.exports = mapCacheSet;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_mapCacheSet.js?");

/***/ }),

/***/ "./node_modules/lodash/_nativeCreate.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_nativeCreate.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var getNative = __webpack_require__(/*! ./_getNative */ \"./node_modules/lodash/_getNative.js\");\n\n/* Built-in method references that are verified to be native. */\nvar nativeCreate = getNative(Object, 'create');\n\nmodule.exports = nativeCreate;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_nativeCreate.js?");

/***/ }),

/***/ "./node_modules/lodash/_nativeKeys.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_nativeKeys.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var overArg = __webpack_require__(/*! ./_overArg */ \"./node_modules/lodash/_overArg.js\");\n\n/* Built-in method references for those with the same name as other `lodash` methods. */\nvar nativeKeys = overArg(Object.keys, Object);\n\nmodule.exports = nativeKeys;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_nativeKeys.js?");

/***/ }),

/***/ "./node_modules/lodash/_nativeKeysIn.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_nativeKeysIn.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * This function is like\n * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)\n * except that it includes inherited enumerable properties.\n *\n * @private\n * @param {Object} object The object to query.\n * @returns {Array} Returns the array of property names.\n */\nfunction nativeKeysIn(object) {\n  var result = [];\n  if (object != null) {\n    for (var key in Object(object)) {\n      result.push(key);\n    }\n  }\n  return result;\n}\n\nmodule.exports = nativeKeysIn;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_nativeKeysIn.js?");

/***/ }),

/***/ "./node_modules/lodash/_nodeUtil.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_nodeUtil.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(module) {var freeGlobal = __webpack_require__(/*! ./_freeGlobal */ \"./node_modules/lodash/_freeGlobal.js\");\n\n/** Detect free variable `exports`. */\nvar freeExports =  true && exports && !exports.nodeType && exports;\n\n/** Detect free variable `module`. */\nvar freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;\n\n/** Detect the popular CommonJS extension `module.exports`. */\nvar moduleExports = freeModule && freeModule.exports === freeExports;\n\n/** Detect free variable `process` from Node.js. */\nvar freeProcess = moduleExports && freeGlobal.process;\n\n/** Used to access faster Node.js helpers. */\nvar nodeUtil = (function() {\n  try {\n    // Use `util.types` for Node.js 10+.\n    var types = freeModule && freeModule.require && freeModule.require('util').types;\n\n    if (types) {\n      return types;\n    }\n\n    // Legacy `process.binding('util')` for Node.js < 10.\n    return freeProcess && freeProcess.binding && freeProcess.binding('util');\n  } catch (e) {}\n}());\n\nmodule.exports = nodeUtil;\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/module.js */ \"./node_modules/webpack/buildin/module.js\")(module)))\n\n//# sourceURL=webpack:///./node_modules/lodash/_nodeUtil.js?");

/***/ }),

/***/ "./node_modules/lodash/_objectToString.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_objectToString.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/** Used for built-in method references. */\nvar objectProto = Object.prototype;\n\n/**\n * Used to resolve the\n * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)\n * of values.\n */\nvar nativeObjectToString = objectProto.toString;\n\n/**\n * Converts `value` to a string using `Object.prototype.toString`.\n *\n * @private\n * @param {*} value The value to convert.\n * @returns {string} Returns the converted string.\n */\nfunction objectToString(value) {\n  return nativeObjectToString.call(value);\n}\n\nmodule.exports = objectToString;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_objectToString.js?");

/***/ }),

/***/ "./node_modules/lodash/_overArg.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_overArg.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Creates a unary function that invokes `func` with its argument transformed.\n *\n * @private\n * @param {Function} func The function to wrap.\n * @param {Function} transform The argument transform.\n * @returns {Function} Returns the new function.\n */\nfunction overArg(func, transform) {\n  return function(arg) {\n    return func(transform(arg));\n  };\n}\n\nmodule.exports = overArg;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_overArg.js?");

/***/ }),

/***/ "./node_modules/lodash/_root.js":
/*!**************************************!*\
  !*** ./node_modules/lodash/_root.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var freeGlobal = __webpack_require__(/*! ./_freeGlobal */ \"./node_modules/lodash/_freeGlobal.js\");\n\n/** Detect free variable `self`. */\nvar freeSelf = typeof self == 'object' && self && self.Object === Object && self;\n\n/** Used as a reference to the global object. */\nvar root = freeGlobal || freeSelf || Function('return this')();\n\nmodule.exports = root;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_root.js?");

/***/ }),

/***/ "./node_modules/lodash/_stackClear.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_stackClear.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var ListCache = __webpack_require__(/*! ./_ListCache */ \"./node_modules/lodash/_ListCache.js\");\n\n/**\n * Removes all key-value entries from the stack.\n *\n * @private\n * @name clear\n * @memberOf Stack\n */\nfunction stackClear() {\n  this.__data__ = new ListCache;\n  this.size = 0;\n}\n\nmodule.exports = stackClear;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_stackClear.js?");

/***/ }),

/***/ "./node_modules/lodash/_stackDelete.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_stackDelete.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Removes `key` and its value from the stack.\n *\n * @private\n * @name delete\n * @memberOf Stack\n * @param {string} key The key of the value to remove.\n * @returns {boolean} Returns `true` if the entry was removed, else `false`.\n */\nfunction stackDelete(key) {\n  var data = this.__data__,\n      result = data['delete'](key);\n\n  this.size = data.size;\n  return result;\n}\n\nmodule.exports = stackDelete;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_stackDelete.js?");

/***/ }),

/***/ "./node_modules/lodash/_stackGet.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_stackGet.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Gets the stack value for `key`.\n *\n * @private\n * @name get\n * @memberOf Stack\n * @param {string} key The key of the value to get.\n * @returns {*} Returns the entry value.\n */\nfunction stackGet(key) {\n  return this.__data__.get(key);\n}\n\nmodule.exports = stackGet;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_stackGet.js?");

/***/ }),

/***/ "./node_modules/lodash/_stackHas.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_stackHas.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Checks if a stack value for `key` exists.\n *\n * @private\n * @name has\n * @memberOf Stack\n * @param {string} key The key of the entry to check.\n * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.\n */\nfunction stackHas(key) {\n  return this.__data__.has(key);\n}\n\nmodule.exports = stackHas;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_stackHas.js?");

/***/ }),

/***/ "./node_modules/lodash/_stackSet.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_stackSet.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var ListCache = __webpack_require__(/*! ./_ListCache */ \"./node_modules/lodash/_ListCache.js\"),\n    Map = __webpack_require__(/*! ./_Map */ \"./node_modules/lodash/_Map.js\"),\n    MapCache = __webpack_require__(/*! ./_MapCache */ \"./node_modules/lodash/_MapCache.js\");\n\n/** Used as the size to enable large array optimizations. */\nvar LARGE_ARRAY_SIZE = 200;\n\n/**\n * Sets the stack `key` to `value`.\n *\n * @private\n * @name set\n * @memberOf Stack\n * @param {string} key The key of the value to set.\n * @param {*} value The value to set.\n * @returns {Object} Returns the stack cache instance.\n */\nfunction stackSet(key, value) {\n  var data = this.__data__;\n  if (data instanceof ListCache) {\n    var pairs = data.__data__;\n    if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {\n      pairs.push([key, value]);\n      this.size = ++data.size;\n      return this;\n    }\n    data = this.__data__ = new MapCache(pairs);\n  }\n  data.set(key, value);\n  this.size = data.size;\n  return this;\n}\n\nmodule.exports = stackSet;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_stackSet.js?");

/***/ }),

/***/ "./node_modules/lodash/_toSource.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_toSource.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/** Used for built-in method references. */\nvar funcProto = Function.prototype;\n\n/** Used to resolve the decompiled source of functions. */\nvar funcToString = funcProto.toString;\n\n/**\n * Converts `func` to its source code.\n *\n * @private\n * @param {Function} func The function to convert.\n * @returns {string} Returns the source code.\n */\nfunction toSource(func) {\n  if (func != null) {\n    try {\n      return funcToString.call(func);\n    } catch (e) {}\n    try {\n      return (func + '');\n    } catch (e) {}\n  }\n  return '';\n}\n\nmodule.exports = toSource;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_toSource.js?");

/***/ }),

/***/ "./node_modules/lodash/clone.js":
/*!**************************************!*\
  !*** ./node_modules/lodash/clone.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseClone = __webpack_require__(/*! ./_baseClone */ \"./node_modules/lodash/_baseClone.js\");\n\n/** Used to compose bitmasks for cloning. */\nvar CLONE_SYMBOLS_FLAG = 4;\n\n/**\n * Creates a shallow clone of `value`.\n *\n * **Note:** This method is loosely based on the\n * [structured clone algorithm](https://mdn.io/Structured_clone_algorithm)\n * and supports cloning arrays, array buffers, booleans, date objects, maps,\n * numbers, `Object` objects, regexes, sets, strings, symbols, and typed\n * arrays. The own enumerable properties of `arguments` objects are cloned\n * as plain objects. An empty object is returned for uncloneable values such\n * as error objects, functions, DOM nodes, and WeakMaps.\n *\n * @static\n * @memberOf _\n * @since 0.1.0\n * @category Lang\n * @param {*} value The value to clone.\n * @returns {*} Returns the cloned value.\n * @see _.cloneDeep\n * @example\n *\n * var objects = [{ 'a': 1 }, { 'b': 2 }];\n *\n * var shallow = _.clone(objects);\n * console.log(shallow[0] === objects[0]);\n * // => true\n */\nfunction clone(value) {\n  return baseClone(value, CLONE_SYMBOLS_FLAG);\n}\n\nmodule.exports = clone;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/clone.js?");

/***/ }),

/***/ "./node_modules/lodash/cloneDeep.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/cloneDeep.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseClone = __webpack_require__(/*! ./_baseClone */ \"./node_modules/lodash/_baseClone.js\");\n\n/** Used to compose bitmasks for cloning. */\nvar CLONE_DEEP_FLAG = 1,\n    CLONE_SYMBOLS_FLAG = 4;\n\n/**\n * This method is like `_.clone` except that it recursively clones `value`.\n *\n * @static\n * @memberOf _\n * @since 1.0.0\n * @category Lang\n * @param {*} value The value to recursively clone.\n * @returns {*} Returns the deep cloned value.\n * @see _.clone\n * @example\n *\n * var objects = [{ 'a': 1 }, { 'b': 2 }];\n *\n * var deep = _.cloneDeep(objects);\n * console.log(deep[0] === objects[0]);\n * // => false\n */\nfunction cloneDeep(value) {\n  return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);\n}\n\nmodule.exports = cloneDeep;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/cloneDeep.js?");

/***/ }),

/***/ "./node_modules/lodash/eq.js":
/*!***********************************!*\
  !*** ./node_modules/lodash/eq.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Performs a\n * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)\n * comparison between two values to determine if they are equivalent.\n *\n * @static\n * @memberOf _\n * @since 4.0.0\n * @category Lang\n * @param {*} value The value to compare.\n * @param {*} other The other value to compare.\n * @returns {boolean} Returns `true` if the values are equivalent, else `false`.\n * @example\n *\n * var object = { 'a': 1 };\n * var other = { 'a': 1 };\n *\n * _.eq(object, object);\n * // => true\n *\n * _.eq(object, other);\n * // => false\n *\n * _.eq('a', 'a');\n * // => true\n *\n * _.eq('a', Object('a'));\n * // => false\n *\n * _.eq(NaN, NaN);\n * // => true\n */\nfunction eq(value, other) {\n  return value === other || (value !== value && other !== other);\n}\n\nmodule.exports = eq;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/eq.js?");

/***/ }),

/***/ "./node_modules/lodash/isArguments.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/isArguments.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseIsArguments = __webpack_require__(/*! ./_baseIsArguments */ \"./node_modules/lodash/_baseIsArguments.js\"),\n    isObjectLike = __webpack_require__(/*! ./isObjectLike */ \"./node_modules/lodash/isObjectLike.js\");\n\n/** Used for built-in method references. */\nvar objectProto = Object.prototype;\n\n/** Used to check objects for own properties. */\nvar hasOwnProperty = objectProto.hasOwnProperty;\n\n/** Built-in value references. */\nvar propertyIsEnumerable = objectProto.propertyIsEnumerable;\n\n/**\n * Checks if `value` is likely an `arguments` object.\n *\n * @static\n * @memberOf _\n * @since 0.1.0\n * @category Lang\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is an `arguments` object,\n *  else `false`.\n * @example\n *\n * _.isArguments(function() { return arguments; }());\n * // => true\n *\n * _.isArguments([1, 2, 3]);\n * // => false\n */\nvar isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {\n  return isObjectLike(value) && hasOwnProperty.call(value, 'callee') &&\n    !propertyIsEnumerable.call(value, 'callee');\n};\n\nmodule.exports = isArguments;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/isArguments.js?");

/***/ }),

/***/ "./node_modules/lodash/isArray.js":
/*!****************************************!*\
  !*** ./node_modules/lodash/isArray.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Checks if `value` is classified as an `Array` object.\n *\n * @static\n * @memberOf _\n * @since 0.1.0\n * @category Lang\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is an array, else `false`.\n * @example\n *\n * _.isArray([1, 2, 3]);\n * // => true\n *\n * _.isArray(document.body.children);\n * // => false\n *\n * _.isArray('abc');\n * // => false\n *\n * _.isArray(_.noop);\n * // => false\n */\nvar isArray = Array.isArray;\n\nmodule.exports = isArray;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/isArray.js?");

/***/ }),

/***/ "./node_modules/lodash/isArrayLike.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/isArrayLike.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var isFunction = __webpack_require__(/*! ./isFunction */ \"./node_modules/lodash/isFunction.js\"),\n    isLength = __webpack_require__(/*! ./isLength */ \"./node_modules/lodash/isLength.js\");\n\n/**\n * Checks if `value` is array-like. A value is considered array-like if it's\n * not a function and has a `value.length` that's an integer greater than or\n * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.\n *\n * @static\n * @memberOf _\n * @since 4.0.0\n * @category Lang\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is array-like, else `false`.\n * @example\n *\n * _.isArrayLike([1, 2, 3]);\n * // => true\n *\n * _.isArrayLike(document.body.children);\n * // => true\n *\n * _.isArrayLike('abc');\n * // => true\n *\n * _.isArrayLike(_.noop);\n * // => false\n */\nfunction isArrayLike(value) {\n  return value != null && isLength(value.length) && !isFunction(value);\n}\n\nmodule.exports = isArrayLike;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/isArrayLike.js?");

/***/ }),

/***/ "./node_modules/lodash/isBuffer.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/isBuffer.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(module) {var root = __webpack_require__(/*! ./_root */ \"./node_modules/lodash/_root.js\"),\n    stubFalse = __webpack_require__(/*! ./stubFalse */ \"./node_modules/lodash/stubFalse.js\");\n\n/** Detect free variable `exports`. */\nvar freeExports =  true && exports && !exports.nodeType && exports;\n\n/** Detect free variable `module`. */\nvar freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;\n\n/** Detect the popular CommonJS extension `module.exports`. */\nvar moduleExports = freeModule && freeModule.exports === freeExports;\n\n/** Built-in value references. */\nvar Buffer = moduleExports ? root.Buffer : undefined;\n\n/* Built-in method references for those with the same name as other `lodash` methods. */\nvar nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;\n\n/**\n * Checks if `value` is a buffer.\n *\n * @static\n * @memberOf _\n * @since 4.3.0\n * @category Lang\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.\n * @example\n *\n * _.isBuffer(new Buffer(2));\n * // => true\n *\n * _.isBuffer(new Uint8Array(2));\n * // => false\n */\nvar isBuffer = nativeIsBuffer || stubFalse;\n\nmodule.exports = isBuffer;\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/module.js */ \"./node_modules/webpack/buildin/module.js\")(module)))\n\n//# sourceURL=webpack:///./node_modules/lodash/isBuffer.js?");

/***/ }),

/***/ "./node_modules/lodash/isFunction.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/isFunction.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ \"./node_modules/lodash/_baseGetTag.js\"),\n    isObject = __webpack_require__(/*! ./isObject */ \"./node_modules/lodash/isObject.js\");\n\n/** `Object#toString` result references. */\nvar asyncTag = '[object AsyncFunction]',\n    funcTag = '[object Function]',\n    genTag = '[object GeneratorFunction]',\n    proxyTag = '[object Proxy]';\n\n/**\n * Checks if `value` is classified as a `Function` object.\n *\n * @static\n * @memberOf _\n * @since 0.1.0\n * @category Lang\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is a function, else `false`.\n * @example\n *\n * _.isFunction(_);\n * // => true\n *\n * _.isFunction(/abc/);\n * // => false\n */\nfunction isFunction(value) {\n  if (!isObject(value)) {\n    return false;\n  }\n  // The use of `Object#toString` avoids issues with the `typeof` operator\n  // in Safari 9 which returns 'object' for typed arrays and other constructors.\n  var tag = baseGetTag(value);\n  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;\n}\n\nmodule.exports = isFunction;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/isFunction.js?");

/***/ }),

/***/ "./node_modules/lodash/isLength.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/isLength.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/** Used as references for various `Number` constants. */\nvar MAX_SAFE_INTEGER = 9007199254740991;\n\n/**\n * Checks if `value` is a valid array-like length.\n *\n * **Note:** This method is loosely based on\n * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).\n *\n * @static\n * @memberOf _\n * @since 4.0.0\n * @category Lang\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.\n * @example\n *\n * _.isLength(3);\n * // => true\n *\n * _.isLength(Number.MIN_VALUE);\n * // => false\n *\n * _.isLength(Infinity);\n * // => false\n *\n * _.isLength('3');\n * // => false\n */\nfunction isLength(value) {\n  return typeof value == 'number' &&\n    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;\n}\n\nmodule.exports = isLength;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/isLength.js?");

/***/ }),

/***/ "./node_modules/lodash/isMap.js":
/*!**************************************!*\
  !*** ./node_modules/lodash/isMap.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseIsMap = __webpack_require__(/*! ./_baseIsMap */ \"./node_modules/lodash/_baseIsMap.js\"),\n    baseUnary = __webpack_require__(/*! ./_baseUnary */ \"./node_modules/lodash/_baseUnary.js\"),\n    nodeUtil = __webpack_require__(/*! ./_nodeUtil */ \"./node_modules/lodash/_nodeUtil.js\");\n\n/* Node.js helper references. */\nvar nodeIsMap = nodeUtil && nodeUtil.isMap;\n\n/**\n * Checks if `value` is classified as a `Map` object.\n *\n * @static\n * @memberOf _\n * @since 4.3.0\n * @category Lang\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is a map, else `false`.\n * @example\n *\n * _.isMap(new Map);\n * // => true\n *\n * _.isMap(new WeakMap);\n * // => false\n */\nvar isMap = nodeIsMap ? baseUnary(nodeIsMap) : baseIsMap;\n\nmodule.exports = isMap;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/isMap.js?");

/***/ }),

/***/ "./node_modules/lodash/isObject.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/isObject.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Checks if `value` is the\n * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)\n * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)\n *\n * @static\n * @memberOf _\n * @since 0.1.0\n * @category Lang\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is an object, else `false`.\n * @example\n *\n * _.isObject({});\n * // => true\n *\n * _.isObject([1, 2, 3]);\n * // => true\n *\n * _.isObject(_.noop);\n * // => true\n *\n * _.isObject(null);\n * // => false\n */\nfunction isObject(value) {\n  var type = typeof value;\n  return value != null && (type == 'object' || type == 'function');\n}\n\nmodule.exports = isObject;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/isObject.js?");

/***/ }),

/***/ "./node_modules/lodash/isObjectLike.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/isObjectLike.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Checks if `value` is object-like. A value is object-like if it's not `null`\n * and has a `typeof` result of \"object\".\n *\n * @static\n * @memberOf _\n * @since 4.0.0\n * @category Lang\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is object-like, else `false`.\n * @example\n *\n * _.isObjectLike({});\n * // => true\n *\n * _.isObjectLike([1, 2, 3]);\n * // => true\n *\n * _.isObjectLike(_.noop);\n * // => false\n *\n * _.isObjectLike(null);\n * // => false\n */\nfunction isObjectLike(value) {\n  return value != null && typeof value == 'object';\n}\n\nmodule.exports = isObjectLike;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/isObjectLike.js?");

/***/ }),

/***/ "./node_modules/lodash/isSet.js":
/*!**************************************!*\
  !*** ./node_modules/lodash/isSet.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseIsSet = __webpack_require__(/*! ./_baseIsSet */ \"./node_modules/lodash/_baseIsSet.js\"),\n    baseUnary = __webpack_require__(/*! ./_baseUnary */ \"./node_modules/lodash/_baseUnary.js\"),\n    nodeUtil = __webpack_require__(/*! ./_nodeUtil */ \"./node_modules/lodash/_nodeUtil.js\");\n\n/* Node.js helper references. */\nvar nodeIsSet = nodeUtil && nodeUtil.isSet;\n\n/**\n * Checks if `value` is classified as a `Set` object.\n *\n * @static\n * @memberOf _\n * @since 4.3.0\n * @category Lang\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is a set, else `false`.\n * @example\n *\n * _.isSet(new Set);\n * // => true\n *\n * _.isSet(new WeakSet);\n * // => false\n */\nvar isSet = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet;\n\nmodule.exports = isSet;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/isSet.js?");

/***/ }),

/***/ "./node_modules/lodash/isTypedArray.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/isTypedArray.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseIsTypedArray = __webpack_require__(/*! ./_baseIsTypedArray */ \"./node_modules/lodash/_baseIsTypedArray.js\"),\n    baseUnary = __webpack_require__(/*! ./_baseUnary */ \"./node_modules/lodash/_baseUnary.js\"),\n    nodeUtil = __webpack_require__(/*! ./_nodeUtil */ \"./node_modules/lodash/_nodeUtil.js\");\n\n/* Node.js helper references. */\nvar nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;\n\n/**\n * Checks if `value` is classified as a typed array.\n *\n * @static\n * @memberOf _\n * @since 3.0.0\n * @category Lang\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.\n * @example\n *\n * _.isTypedArray(new Uint8Array);\n * // => true\n *\n * _.isTypedArray([]);\n * // => false\n */\nvar isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;\n\nmodule.exports = isTypedArray;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/isTypedArray.js?");

/***/ }),

/***/ "./node_modules/lodash/keys.js":
/*!*************************************!*\
  !*** ./node_modules/lodash/keys.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var arrayLikeKeys = __webpack_require__(/*! ./_arrayLikeKeys */ \"./node_modules/lodash/_arrayLikeKeys.js\"),\n    baseKeys = __webpack_require__(/*! ./_baseKeys */ \"./node_modules/lodash/_baseKeys.js\"),\n    isArrayLike = __webpack_require__(/*! ./isArrayLike */ \"./node_modules/lodash/isArrayLike.js\");\n\n/**\n * Creates an array of the own enumerable property names of `object`.\n *\n * **Note:** Non-object values are coerced to objects. See the\n * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)\n * for more details.\n *\n * @static\n * @since 0.1.0\n * @memberOf _\n * @category Object\n * @param {Object} object The object to query.\n * @returns {Array} Returns the array of property names.\n * @example\n *\n * function Foo() {\n *   this.a = 1;\n *   this.b = 2;\n * }\n *\n * Foo.prototype.c = 3;\n *\n * _.keys(new Foo);\n * // => ['a', 'b'] (iteration order is not guaranteed)\n *\n * _.keys('hi');\n * // => ['0', '1']\n */\nfunction keys(object) {\n  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);\n}\n\nmodule.exports = keys;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/keys.js?");

/***/ }),

/***/ "./node_modules/lodash/keysIn.js":
/*!***************************************!*\
  !*** ./node_modules/lodash/keysIn.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var arrayLikeKeys = __webpack_require__(/*! ./_arrayLikeKeys */ \"./node_modules/lodash/_arrayLikeKeys.js\"),\n    baseKeysIn = __webpack_require__(/*! ./_baseKeysIn */ \"./node_modules/lodash/_baseKeysIn.js\"),\n    isArrayLike = __webpack_require__(/*! ./isArrayLike */ \"./node_modules/lodash/isArrayLike.js\");\n\n/**\n * Creates an array of the own and inherited enumerable property names of `object`.\n *\n * **Note:** Non-object values are coerced to objects.\n *\n * @static\n * @memberOf _\n * @since 3.0.0\n * @category Object\n * @param {Object} object The object to query.\n * @returns {Array} Returns the array of property names.\n * @example\n *\n * function Foo() {\n *   this.a = 1;\n *   this.b = 2;\n * }\n *\n * Foo.prototype.c = 3;\n *\n * _.keysIn(new Foo);\n * // => ['a', 'b', 'c'] (iteration order is not guaranteed)\n */\nfunction keysIn(object) {\n  return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);\n}\n\nmodule.exports = keysIn;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/keysIn.js?");

/***/ }),

/***/ "./node_modules/lodash/stubArray.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/stubArray.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * This method returns a new empty array.\n *\n * @static\n * @memberOf _\n * @since 4.13.0\n * @category Util\n * @returns {Array} Returns the new empty array.\n * @example\n *\n * var arrays = _.times(2, _.stubArray);\n *\n * console.log(arrays);\n * // => [[], []]\n *\n * console.log(arrays[0] === arrays[1]);\n * // => false\n */\nfunction stubArray() {\n  return [];\n}\n\nmodule.exports = stubArray;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/stubArray.js?");

/***/ }),

/***/ "./node_modules/lodash/stubFalse.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/stubFalse.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * This method returns `false`.\n *\n * @static\n * @memberOf _\n * @since 4.13.0\n * @category Util\n * @returns {boolean} Returns `false`.\n * @example\n *\n * _.times(2, _.stubFalse);\n * // => [false, false]\n */\nfunction stubFalse() {\n  return false;\n}\n\nmodule.exports = stubFalse;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/stubFalse.js?");

/***/ }),

/***/ "./node_modules/sanitize-filename/index.js":
/*!*************************************************!*\
  !*** ./node_modules/sanitize-filename/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/*jshint node:true*/\n\n\n/**\n * Replaces characters in strings that are illegal/unsafe for filenames.\n * Unsafe characters are either removed or replaced by a substitute set\n * in the optional `options` object.\n *\n * Illegal Characters on Various Operating Systems\n * / ? < > \\ : * | \"\n * https://kb.acronis.com/content/39790\n *\n * Unicode Control codes\n * C0 0x00-0x1f & C1 (0x80-0x9f)\n * http://en.wikipedia.org/wiki/C0_and_C1_control_codes\n *\n * Reserved filenames on Unix-based systems (\".\", \"..\")\n * Reserved filenames in Windows (\"CON\", \"PRN\", \"AUX\", \"NUL\", \"COM1\",\n * \"COM2\", \"COM3\", \"COM4\", \"COM5\", \"COM6\", \"COM7\", \"COM8\", \"COM9\",\n * \"LPT1\", \"LPT2\", \"LPT3\", \"LPT4\", \"LPT5\", \"LPT6\", \"LPT7\", \"LPT8\", and\n * \"LPT9\") case-insesitively and with or without filename extensions.\n *\n * Capped at 255 characters in length.\n * http://unix.stackexchange.com/questions/32795/what-is-the-maximum-allowed-filename-and-folder-size-with-ecryptfs\n *\n * @param  {String} input   Original filename\n * @param  {Object} options {replacement: String | Function }\n * @return {String}         Sanitized filename\n */\n\nvar truncate = __webpack_require__(/*! truncate-utf8-bytes */ \"./node_modules/truncate-utf8-bytes/browser.js\");\n\nvar illegalRe = /[\\/\\?<>\\\\:\\*\\|\"]/g;\nvar controlRe = /[\\x00-\\x1f\\x80-\\x9f]/g;\nvar reservedRe = /^\\.+$/;\nvar windowsReservedRe = /^(con|prn|aux|nul|com[0-9]|lpt[0-9])(\\..*)?$/i;\nvar windowsTrailingRe = /[\\. ]+$/;\n\nfunction sanitize(input, replacement) {\n  if (typeof input !== 'string') {\n    throw new Error('Input must be string');\n  }\n  var sanitized = input\n    .replace(illegalRe, replacement)\n    .replace(controlRe, replacement)\n    .replace(reservedRe, replacement)\n    .replace(windowsReservedRe, replacement)\n    .replace(windowsTrailingRe, replacement);\n  return truncate(sanitized, 255);\n}\n\nmodule.exports = function (input, options) {\n  var replacement = (options && options.replacement) || '';\n  var output = sanitize(input, replacement);\n  if (replacement === '') {\n    return output;\n  }\n  return sanitize(output, '');\n};\n\n\n//# sourceURL=webpack:///./node_modules/sanitize-filename/index.js?");

/***/ }),

/***/ "./node_modules/truncate-utf8-bytes/browser.js":
/*!*****************************************************!*\
  !*** ./node_modules/truncate-utf8-bytes/browser.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar truncate = __webpack_require__(/*! ./lib/truncate */ \"./node_modules/truncate-utf8-bytes/lib/truncate.js\");\nvar getLength = __webpack_require__(/*! utf8-byte-length/browser */ \"./node_modules/utf8-byte-length/browser.js\");\nmodule.exports = truncate.bind(null, getLength);\n\n\n//# sourceURL=webpack:///./node_modules/truncate-utf8-bytes/browser.js?");

/***/ }),

/***/ "./node_modules/truncate-utf8-bytes/lib/truncate.js":
/*!**********************************************************!*\
  !*** ./node_modules/truncate-utf8-bytes/lib/truncate.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nfunction isHighSurrogate(codePoint) {\n  return codePoint >= 0xd800 && codePoint <= 0xdbff;\n}\n\nfunction isLowSurrogate(codePoint) {\n  return codePoint >= 0xdc00 && codePoint <= 0xdfff;\n}\n\n// Truncate string by size in bytes\nmodule.exports = function truncate(getLength, string, byteLength) {\n  if (typeof string !== \"string\") {\n    throw new Error(\"Input must be string\");\n  }\n\n  var charLength = string.length;\n  var curByteLength = 0;\n  var codePoint;\n  var segment;\n\n  for (var i = 0; i < charLength; i += 1) {\n    codePoint = string.charCodeAt(i);\n    segment = string[i];\n\n    if (isHighSurrogate(codePoint) && isLowSurrogate(string.charCodeAt(i + 1))) {\n      i += 1;\n      segment += string[i];\n    }\n\n    curByteLength += getLength(segment);\n\n    if (curByteLength === byteLength) {\n      return string.slice(0, i + 1);\n    }\n    else if (curByteLength > byteLength) {\n      return string.slice(0, i - segment.length + 1);\n    }\n  }\n\n  return string;\n};\n\n\n\n//# sourceURL=webpack:///./node_modules/truncate-utf8-bytes/lib/truncate.js?");

/***/ }),

/***/ "./node_modules/utf8-byte-length/browser.js":
/*!**************************************************!*\
  !*** ./node_modules/utf8-byte-length/browser.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nfunction isHighSurrogate(codePoint) {\n  return codePoint >= 0xd800 && codePoint <= 0xdbff;\n}\n\nfunction isLowSurrogate(codePoint) {\n  return codePoint >= 0xdc00 && codePoint <= 0xdfff;\n}\n\n// Truncate string by size in bytes\nmodule.exports = function getByteLength(string) {\n  if (typeof string !== \"string\") {\n    throw new Error(\"Input must be string\");\n  }\n\n  var charLength = string.length;\n  var byteLength = 0;\n  var codePoint = null;\n  var prevCodePoint = null;\n  for (var i = 0; i < charLength; i++) {\n    codePoint = string.charCodeAt(i);\n    // handle 4-byte non-BMP chars\n    // low surrogate\n    if (isLowSurrogate(codePoint)) {\n      // when parsing previous hi-surrogate, 3 is added to byteLength\n      if (prevCodePoint != null && isHighSurrogate(prevCodePoint)) {\n        byteLength += 1;\n      }\n      else {\n        byteLength += 3;\n      }\n    }\n    else if (codePoint <= 0x7f ) {\n      byteLength += 1;\n    }\n    else if (codePoint >= 0x80 && codePoint <= 0x7ff) {\n      byteLength += 2;\n    }\n    else if (codePoint >= 0x800 && codePoint <= 0xffff) {\n      byteLength += 3;\n    }\n    prevCodePoint = codePoint;\n  }\n\n  return byteLength;\n};\n\n\n//# sourceURL=webpack:///./node_modules/utf8-byte-length/browser.js?");

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var g;\n\n// This works in non-strict mode\ng = (function() {\n\treturn this;\n})();\n\ntry {\n\t// This works if eval is allowed (see CSP)\n\tg = g || new Function(\"return this\")();\n} catch (e) {\n\t// This works if the window reference is available\n\tif (typeof window === \"object\") g = window;\n}\n\n// g can still be undefined, but nothing to do about it...\n// We return undefined, instead of nothing here, so it's\n// easier to handle this case. if(!global) { ...}\n\nmodule.exports = g;\n\n\n//# sourceURL=webpack:///(webpack)/buildin/global.js?");

/***/ }),

/***/ "./node_modules/webpack/buildin/module.js":
/*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function(module) {\n\tif (!module.webpackPolyfill) {\n\t\tmodule.deprecate = function() {};\n\t\tmodule.paths = [];\n\t\t// module.parent = undefined by default\n\t\tif (!module.children) module.children = [];\n\t\tObject.defineProperty(module, \"loaded\", {\n\t\t\tenumerable: true,\n\t\t\tget: function() {\n\t\t\t\treturn module.l;\n\t\t\t}\n\t\t});\n\t\tObject.defineProperty(module, \"id\", {\n\t\t\tenumerable: true,\n\t\t\tget: function() {\n\t\t\t\treturn module.i;\n\t\t\t}\n\t\t});\n\t\tmodule.webpackPolyfill = 1;\n\t}\n\treturn module;\n};\n\n\n//# sourceURL=webpack:///(webpack)/buildin/module.js?");

/***/ }),

/***/ "./src/js/app/actions/plants.js":
/*!**************************************!*\
  !*** ./src/js/app/actions/plants.js ***!
  \**************************************/
/*! exports provided: getSingle, getPlant, searchTrees, fetchPlantTables, updatePlant, addPlant, deletePlant */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getSingle\", function() { return getSingle; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getPlant\", function() { return getPlant; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"searchTrees\", function() { return searchTrees; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"fetchPlantTables\", function() { return fetchPlantTables; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"updatePlant\", function() { return updatePlant; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"addPlant\", function() { return addPlant; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"deletePlant\", function() { return deletePlant; });\n/* harmony import */ var _xhr__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../xhr */ \"./src/js/app/xhr.js\");\n/* harmony import */ var _storage_appStateStore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../storage/appStateStore */ \"./src/js/app/storage/appStateStore.js\");\n\r\n\r\n\r\n//config\r\nconst env = \"development\" || false;\r\nvar { SERVER_URL } = __webpack_require__(/*! ../config */ \"./src/js/app/config.js\")[env];\r\n\r\nfunction getSingle(data, callback) {\r\n\t_xhr__WEBPACK_IMPORTED_MODULE_0__[\"default\"].send(`${SERVER_URL}/trees/single/${data}`, \r\n\t{\r\n\t\tmethod: 'GET',\r\n\t\theaders: {'Content-Type': 'application/json'},\r\n\t}, (apiData) => {\r\n\t\tcallback(apiData);\r\n\t});\r\n}\r\n\r\nfunction getPlant(slug, callback) {\r\n    _xhr__WEBPACK_IMPORTED_MODULE_0__[\"default\"].send(`${SERVER_URL}/trees/single/${slug}`, \r\n    {\r\n        method: 'GET',\r\n        headers: {'Content-Type': 'application/json'},\r\n    }, (apiData) => {\r\n        //if no response data, return a formatted object\r\n        let data = {};\r\n        if (!apiData ) {\r\n            data = {\r\n                category: [],\r\n                themes: [],\r\n                // make images null so we know it's an intentional clear\r\n                // an empty array makes it show the placeholder image\r\n                images: null\r\n            }\r\n        } else {\r\n            data = apiData;\r\n        }\r\n        callback(data);\r\n    });\r\n}\r\n\r\nfunction searchTrees(searchObj, callback) {\r\n    _storage_appStateStore__WEBPACK_IMPORTED_MODULE_1__[\"default\"].setData({ isLoading: true });\r\n\t\r\n    let query = buildQuery(searchObj);\r\n\r\n    _xhr__WEBPACK_IMPORTED_MODULE_0__[\"default\"].send(`${SERVER_URL}/trees/search/`, \r\n    { \r\n    \tmethod: 'GET',\r\n    \theaders: {'Content-Type': 'application/json'},\r\n    }, (apiData) => {\r\n\t\tcallback(apiData);\r\n        _storage_appStateStore__WEBPACK_IMPORTED_MODULE_1__[\"default\"].setData({ isLoading: false });\r\n\t}, query);\r\n\r\n    function buildQuery(inObj) {\r\n    \tconst query = {};\r\n\r\n        // just include search, offset and limit as is\r\n        query.search = inObj.search;\r\n        query.offset = inObj.offset;\r\n        query.limit = inObj.limit;\r\n\r\n    \t//format categoriesTrees, query only active ones\r\n    \tif (inObj.categoriesTrees && (inObj.categoriesTrees.length !== 0)) {\r\n    \t\t//return a new array without undefined\r\n    \t\tlet catArray = inObj.categoriesTrees.reduce(function(result, item) {\r\n    \t\t  if(item.active) {\r\n    \t\t    result.push(item.id);\r\n    \t\t  }\r\n    \t\t  return result;\r\n    \t\t}, []);\r\n\r\n    \t\tquery.categoriesTrees = catArray;\r\n    \t}\r\n\r\n    \t//format origins, query only active ones\r\n    \tif (inObj.origins && (inObj.origins.length !== 0)) {\r\n    \t\t//return a new array without undefined\r\n    \t\tlet originsArray = inObj.origins.reduce(function(result, item) {\r\n    \t\t  if(item.active) {\r\n    \t\t    result.push(item.id);\r\n    \t\t  }\r\n    \t\t  return result;\r\n    \t\t}, []);\r\n\r\n    \t\tquery.origins = originsArray;\r\n    \t}\r\n\r\n        //format origins, query only active ones\r\n        if (inObj.zones && (inObj.zones.length !== 0)) {\r\n            //return a new array without undefined\r\n            let zonesArray = inObj.zones.reduce(function(result, item) {\r\n              if(item.active) {\r\n                result.push(item.id);\r\n              }\r\n              return result;\r\n            }, []);\r\n\r\n            query.zones = zonesArray;\r\n        }\r\n\r\n    \treturn query;\r\n    }\r\n}\r\n\r\nfunction fetchPlantTables(callback) {\r\n    _xhr__WEBPACK_IMPORTED_MODULE_0__[\"default\"].send(`${SERVER_URL}/tree_tables/all`, \r\n    {\r\n        method: 'GET',\r\n        headers: {'Content-Type': 'application/json'},\r\n    }, (apiData) => {\r\n        callback(apiData);\r\n    });\r\n}\r\n\r\nfunction updatePlant(formData, callback) {\r\n    _xhr__WEBPACK_IMPORTED_MODULE_0__[\"default\"].send(`${SERVER_URL}/trees/update`,\r\n    {\r\n        method: 'POST',\r\n        body: formData\r\n    }, (apiData) => {\r\n        callback(apiData);\r\n    });\r\n}\r\n\r\nfunction addPlant(formData, callback) {\r\n    _xhr__WEBPACK_IMPORTED_MODULE_0__[\"default\"].send(`${SERVER_URL}/trees/create`,\r\n    {\r\n        method: 'POST',\r\n        body: formData,\r\n    }, (apiData) => {\r\n        callback(apiData);\r\n    });\r\n}\r\n\r\nfunction deletePlant(tree, callback) {\r\n    _xhr__WEBPACK_IMPORTED_MODULE_0__[\"default\"].send(`${SERVER_URL}/trees/delete`, \r\n    {\r\n        method: 'POST',\r\n        headers: {'Content-Type': 'application/json'},\r\n        body: JSON.stringify(tree)\r\n    }, (apiData) => {\r\n        callback(apiData);\r\n    });\r\n}\r\n\r\n\r\n\r\n\n\n//# sourceURL=webpack:///./src/js/app/actions/plants.js?");

/***/ }),

/***/ "./src/js/app/actions/users.js":
/*!*************************************!*\
  !*** ./src/js/app/actions/users.js ***!
  \*************************************/
/*! exports provided: signInUser, signOutUser, authUser */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"signInUser\", function() { return signInUser; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"signOutUser\", function() { return signOutUser; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"authUser\", function() { return authUser; });\n/* harmony import */ var _xhr__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../xhr */ \"./src/js/app/xhr.js\");\n\r\n\r\n//config\r\nconst env = \"development\" || false;\r\nvar { SERVER_URL } = __webpack_require__(/*! ../config */ \"./src/js/app/config.js\")[env];\r\n\r\nfunction signInUser(data, callback) {\r\n\t_xhr__WEBPACK_IMPORTED_MODULE_0__[\"default\"].send(`${SERVER_URL}/users/sign_in`,\r\n\t{\r\n\t\tmethod: 'POST',\r\n\t\tbody: JSON.stringify(data),\r\n\t\theaders: {'Content-Type': 'application/json'},\r\n\t}, (apiData) => {\r\n\t\tcallback(apiData);\r\n\t});\r\n}\r\n\r\nfunction signOutUser() {\r\n\tlocalStorage.removeItem('token');\r\n}\r\n\r\nfunction authUser(callback) {\r\n\t_xhr__WEBPACK_IMPORTED_MODULE_0__[\"default\"].send(`${SERVER_URL}/users/verify`,\r\n\t{\r\n\t\tmethod: 'POST',\r\n\t\theaders: { \r\n\t\t\t'Content-Type': 'application/json',\r\n\t\t\tauthorization: localStorage.getItem('token') },\r\n\t}, (apiData) => {\r\n\t\tcallback(apiData);\r\n\t});\r\n}\n\n//# sourceURL=webpack:///./src/js/app/actions/users.js?");

/***/ }),

/***/ "./src/js/app/admin/404.js":
/*!*********************************!*\
  !*** ./src/js/app/admin/404.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../component */ \"./src/js/app/component.js\");\n\r\n\r\nvar PageNotFound = {\r\n\tinit: function() {\r\n\t\tvar proto = Object.assign({}, this, _component__WEBPACK_IMPORTED_MODULE_0__[\"default\"])\r\n\t\tvar inst = Object.create(proto);\r\n\t\t// assign the instance constructor to the prototype so 'this' refers to the instance\r\n\t\tproto.constructor = inst;\r\n\r\n\t\t//call initialize on Component first\r\n\t\tinst.initialize({\r\n\t\t\tel: \r\n\t\t\t`<div class=\"admin-main\">\r\n\t\t\t   <div class=\"row\">\r\n\t\t\t      <div class=\"columns small-12\">\r\n\t\t\t         <p>404. Page not found.</p>\r\n\t\t\t      </div>\r\n\t\t\t   </div>\r\n\t\t\t</div>`\r\n\t\t});\r\n\r\n\t\treturn inst;\r\n\t}\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (PageNotFound);\n\n//# sourceURL=webpack:///./src/js/app/admin/404.js?");

/***/ }),

/***/ "./src/js/app/admin/auth/auth.js":
/*!***************************************!*\
  !*** ./src/js/app/admin/auth/auth.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _actions_users__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../actions/users */ \"./src/js/app/actions/users.js\");\n\r\n\r\nvar Auth = {\r\n\tsignOutUser: function() {\r\n\t\tObject(_actions_users__WEBPACK_IMPORTED_MODULE_0__[\"signOutUser\"])();\r\n\t},\r\n\tauthenticate: function(callback) {\r\n\t\tObject(_actions_users__WEBPACK_IMPORTED_MODULE_0__[\"authUser\"])((apiData) => {\r\n\t\t\tcallback(apiData);\r\n\t\t});\r\n\t}\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (Auth);\n\n//# sourceURL=webpack:///./src/js/app/admin/auth/auth.js?");

/***/ }),

/***/ "./src/js/app/admin/auth/protectedWarning.js":
/*!***************************************************!*\
  !*** ./src/js/app/admin/auth/protectedWarning.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../component */ \"./src/js/app/component.js\");\n\r\n\r\nvar ProtectedWarning = {\r\n\tinit: function() {\r\n\t\tvar proto = Object.assign({}, this, _component__WEBPACK_IMPORTED_MODULE_0__[\"default\"])\r\n\t\tvar inst = Object.create(proto);\r\n\t\t// assign the instance constructor to the prototype so 'this' refers to the instance\r\n\t\tproto.constructor = inst;\r\n\r\n\t\t//call initialize on Component first\r\n\t\tinst.initialize({\r\n\t\t\tel: \r\n\t\t\t`<div class=\"admin-main\">\r\n\t\t\t   <div class=\"row\">\r\n\t\t\t      <div class=\"columns small-12\">\r\n\t\t\t         <p>Please sign up or <a class=\"\" href=\"#signin\">login</a>.</p>\r\n\t\t\t      </div>\r\n\t\t\t   </div>\r\n\t\t\t</div>`\r\n\t\t});\r\n\r\n\t\treturn inst;\r\n\t}\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (ProtectedWarning);\n\n//# sourceURL=webpack:///./src/js/app/admin/auth/protectedWarning.js?");

/***/ }),

/***/ "./src/js/app/admin/auth/signIn.js":
/*!*****************************************!*\
  !*** ./src/js/app/admin/auth/signIn.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../component */ \"./src/js/app/component.js\");\n/* harmony import */ var _parts_fieldInput__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../parts/fieldInput */ \"./src/js/app/admin/parts/fieldInput.js\");\n/* harmony import */ var _actions_users__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../actions/users */ \"./src/js/app/actions/users.js\");\n/* harmony import */ var _router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../router */ \"./src/js/app/router.js\");\n\r\n\r\n\r\n\r\n//config\r\nvar { ADMIN_URL } = __webpack_require__(/*! ../../config */ \"./src/js/app/config.js\")['globals'];\r\n\r\nvar Signin = {\r\n\tfields: [\r\n\t\t\t{name: 'email', label: 'Email', error: 'Please enter an email', condition: 'required'},\r\n\t\t\t{name: 'password', label: 'Password', error: 'Please enter an password', condition: 'required'},\r\n\t\t\t{name: 'key', label: 'Key', error: 'Please enter a key', condition: 'required'},\r\n\t\t],\r\n\tsubmitForm(e) {\r\n\t\t//prevent form from refreshing the page\r\n\t\te.preventDefault();\r\n\t\tlet formData = new FormData(e.target);\r\n\r\n\t\tconst email = formData.get('email');\r\n\t\tconst password = formData.get('password');\r\n\t\tconst key = formData.get('key');\r\n\r\n\t\tObject(_actions_users__WEBPACK_IMPORTED_MODULE_2__[\"signInUser\"])({email, password, key},\r\n\t\t(apiData) => {\r\n\t\t\tif(apiData.token) {\r\n\t\t\t\t// - Save the JWT token\r\n\t\t\t\twindow.localStorage.setItem('token', apiData.token);\r\n\t\t\t\t// clear error\r\n\t\t\t\tdocument.querySelector('.alert').innerHTML = '';\r\n\t\t\t\t// navigate to new page\r\n\t\t\t\t_router__WEBPACK_IMPORTED_MODULE_3__[\"default\"].push('dashboard');\r\n\t\t\t} else {\r\n\t\t\t\tconst errorMessage = this.createEl(\r\n\t\t\t\t\t`<div><strong>Oops!</strong> ${apiData.error || apiData}</div>`\r\n\t\t\t\t\t);\r\n\t\t\t\tdocument.querySelector('.alert').appendChild(errorMessage);\r\n\t\t\t}\r\n\t\t});\r\n\t},\r\n\tinit: function() {\r\n\t\tvar proto = Object.assign({}, this, _component__WEBPACK_IMPORTED_MODULE_0__[\"default\"])\r\n\t\tvar inst = Object.create(proto);\r\n\t\t// assign the instance constructor to the prototype so 'this' refers to the instance\r\n\t\tproto.constructor = inst;\r\n\r\n\t\t//call initialize on Component first\r\n\t\tinst.initialize({ el: \r\n\t\t`<div class=\"admin-main\">\r\n\t         <div class=\"row\">\r\n\t            <div class=\"columns small-12\">\r\n\t               <h1 class=\"margin-bottom\">Login:</h1>\r\n\t               <form>\r\n\t               \t<div id=\"form-fields\">\r\n\t               \t</div>\r\n\t               \t<button action=\"submit\" class=\"btn btn-primary\">Sign in</button>\r\n\t               </form>\r\n\t               <div class=\"alert alert-danger\"></div>\r\n\t            </div>\r\n\t         </div>\r\n\t      </div>`\r\n\t\t});\r\n\r\n\t\tinst.formFields = inst.el.querySelector('#form-fields');\r\n\t\tinst.form = inst.el.querySelector('form');\r\n\t\tinst.form.addEventListener('submit', inst.submitForm.bind(inst));\r\n\r\n\t\tinst.fields.map((item, key) => {\r\n\t\t\tlet input = _parts_fieldInput__WEBPACK_IMPORTED_MODULE_1__[\"default\"].init({\r\n\t\t\t\tname: item.name,\r\n\t\t\t\tlabel: item.label,\r\n\t\t\t\terror: item.error,\r\n\t\t\t\tcondition: item.condition,\r\n\t\t\t});\r\n\r\n\t\t\tinst.formFields.appendChild(input.el);\r\n\t\t});\r\n\r\n\t\treturn inst;\r\n\t}\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (Signin);\n\n//# sourceURL=webpack:///./src/js/app/admin/auth/signIn.js?");

/***/ }),

/***/ "./src/js/app/admin/auth/signedOut.js":
/*!********************************************!*\
  !*** ./src/js/app/admin/auth/signedOut.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../component */ \"./src/js/app/component.js\");\n\r\n\r\n\r\nvar SignedOut = {\r\n\tinit: function() {\r\n\t\tvar proto = Object.assign({}, this, _component__WEBPACK_IMPORTED_MODULE_0__[\"default\"])\r\n\t\tvar inst = Object.create(proto);\r\n\t\t// assign the instance constructor to the prototype so 'this' refers to the instance\r\n\t\tproto.constructor = inst;\r\n\r\n\t\t//call initialize on Component first\r\n\t\tinst.initialize({\r\n\t\t\tel: \r\n\t\t\t`<div class=\"admin-main\">\r\n\t\t\t   <div class=\"row\">\r\n\t\t\t      <div class=\"columns small-12\">\r\n\t\t\t         <p>You have been signed out. <a class=\"\" href=\"#signin\">Login</a>.</p>\r\n\t\t\t      </div>\r\n\t\t\t   </div>\r\n\t\t\t</div>`\r\n\t\t});\r\n\r\n\t\treturn inst;\r\n\t}\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (SignedOut);\n\n//# sourceURL=webpack:///./src/js/app/admin/auth/signedOut.js?");

/***/ }),

/***/ "./src/js/app/admin/dashboard.js":
/*!***************************************!*\
  !*** ./src/js/app/admin/dashboard.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../component */ \"./src/js/app/component.js\");\n/* harmony import */ var _sidebar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sidebar */ \"./src/js/app/admin/sidebar.js\");\n\r\n\r\n\r\nvar Dashboard = {\r\n\tbuild: function() {\r\n\t\tthis.el.querySelector('.main-window').before(this.sidebar.el);\r\n\t},\r\n\tinit: function() {\r\n\t\tvar proto = Object.assign({}, this, _component__WEBPACK_IMPORTED_MODULE_0__[\"default\"])\r\n\t\tvar inst = Object.create(proto);\r\n\t\t// assign the instance constructor to the prototype so 'this' refers to the instance\r\n\t\tproto.constructor = inst;\r\n\r\n\t\t//call initialize on Component first\r\n\t\tinst.initialize({\r\n\t\t\tel:\r\n\t\t\t`<div class=\"admin-main\">\r\n               <div class=\"row\">\r\n                    <div class=\"main-window columns small-12 large-9\">\r\n                        <h1 class=\"margin-bottom\">Dashboard</h1>\r\n                        Admin Area. <br/>\r\n                        Welcome <span id=\"user\"></span>\r\n                    </div>\r\n                </div>\t\r\n            </div>`\r\n\t\t});\r\n\r\n\t\tinst.sidebar = _sidebar__WEBPACK_IMPORTED_MODULE_1__[\"default\"].init();\r\n\r\n\t\tinst.build()\r\n\r\n\t\treturn inst;\r\n\t}\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (Dashboard);\n\n//# sourceURL=webpack:///./src/js/app/admin/dashboard.js?");

/***/ }),

/***/ "./src/js/app/admin/mainAdmin.js":
/*!***************************************!*\
  !*** ./src/js/app/admin/mainAdmin.js ***!
  \***************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../component */ \"./src/js/app/component.js\");\n/* harmony import */ var _router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../router */ \"./src/js/app/router.js\");\n/* harmony import */ var _auth_signIn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./auth/signIn */ \"./src/js/app/admin/auth/signIn.js\");\n/* harmony import */ var _dashboard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dashboard */ \"./src/js/app/admin/dashboard.js\");\n/* harmony import */ var _auth_protectedWarning__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./auth/protectedWarning */ \"./src/js/app/admin/auth/protectedWarning.js\");\n/* harmony import */ var _auth_signedOut__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./auth/signedOut */ \"./src/js/app/admin/auth/signedOut.js\");\n/* harmony import */ var _404__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./404 */ \"./src/js/app/admin/404.js\");\n/* harmony import */ var _plants_plantsList__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./plants/plantsList */ \"./src/js/app/admin/plants/plantsList.js\");\n/* harmony import */ var _plants_plantAdd__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./plants/plantAdd */ \"./src/js/app/admin/plants/plantAdd.js\");\n/* harmony import */ var _plants_plantEdit__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./plants/plantEdit */ \"./src/js/app/admin/plants/plantEdit.js\");\n/* harmony import */ var _auth_auth__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./auth/auth */ \"./src/js/app/admin/auth/auth.js\");\n/* harmony import */ var _storage_plantListStore__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../storage/plantListStore */ \"./src/js/app/storage/plantListStore.js\");\n/* harmony import */ var _storage_treesFilterStore__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../storage/treesFilterStore */ \"./src/js/app/storage/treesFilterStore.js\");\n/* harmony import */ var _storage_plantTablesStore__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../storage/plantTablesStore */ \"./src/js/app/storage/plantTablesStore.js\");\n/* harmony import */ var _storage_appStateStore__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../storage/appStateStore */ \"./src/js/app/storage/appStateStore.js\");\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n(function() {\r\n\tvar Main = {\r\n\t\tupdate: function(route) {\r\n\t\t\t//clear el first\r\n\t\t\tthis.el.innerHTML = '';\r\n\t\t\tif(route === 'signin') {\r\n\t\t\t\tthis.el.appendChild(this.signIn.el);\r\n\t\t\t} else if((route === 'dashboard') || (route === '')) {\r\n\t\t\t\t_auth_auth__WEBPACK_IMPORTED_MODULE_10__[\"default\"].authenticate((authData) => {\r\n\t\t\t\t\tif(authData.id) {\r\n\t\t\t\t\t\tthis.dashboard.el.querySelector('#user').innerHTML = authData.email;\r\n\t\t\t\t\t\tthis.el.appendChild(this.dashboard.el);\r\n\t\t\t\t\t} else {\r\n\t\t\t\t\t\t_router__WEBPACK_IMPORTED_MODULE_1__[\"default\"].push('signin');\r\n\t\t\t\t\t}\r\n\t\t\t\t});\r\n\t\t\t} else if(route === 'signed-out') {\r\n\t\t\t\t_auth_auth__WEBPACK_IMPORTED_MODULE_10__[\"default\"].signOutUser();\r\n\t\t\t\tthis.el.appendChild(this.signedOut.el);\r\n\t\t\t} else if(route === 'plants-list') {\r\n\t\t\t\t_auth_auth__WEBPACK_IMPORTED_MODULE_10__[\"default\"].authenticate((authData) => {\r\n\t\t\t\t\tif(authData.id) {\r\n\t\t\t\t\t\tthis.el.appendChild(this.plantsList.el);\r\n\t\t\t\t\t} else {\r\n\t\t\t\t\t\t_router__WEBPACK_IMPORTED_MODULE_1__[\"default\"].push('signin');\r\n\t\t\t\t\t}\r\n\t\t\t\t});\r\n\t\t\t} else if(route === 'plant-add') {\r\n\t\t\t\t_auth_auth__WEBPACK_IMPORTED_MODULE_10__[\"default\"].authenticate((authData) => {\r\n\t\t\t\t\tif(authData.id) {\r\n\t\t\t\t\t\tthis.el.appendChild(this.plantAdd.el);\r\n\t\t\t\t\t} else {\r\n\t\t\t\t\t\t_router__WEBPACK_IMPORTED_MODULE_1__[\"default\"].push('signin');\r\n\t\t\t\t\t}\r\n\t\t\t\t});\r\n\t\t\t} else if(route === 'plant-edit') {\r\n\t\t\t\t_auth_auth__WEBPACK_IMPORTED_MODULE_10__[\"default\"].authenticate((authData) => {\r\n\t\t\t\t\tif(authData.id) {\r\n\t\t\t\t\t\tthis.plantEdit.onLoad();\r\n\t\t\t\t\t\tthis.el.appendChild(this.plantEdit.el);\r\n\t\t\t\t\t} else {\r\n\t\t\t\t\t\t_router__WEBPACK_IMPORTED_MODULE_1__[\"default\"].push('signin');\r\n\t\t\t\t\t}\r\n\t\t\t\t});\r\n\t\t\t} else {\r\n\t\t\t\tthis.el.appendChild(this.pageNotFound.el);\r\n\t\t\t}\r\n\t\t\tthis.render()\r\n\t\t},\r\n\t\tinit: function() {\r\n\t\t\tvar proto = Object.assign({}, this, _component__WEBPACK_IMPORTED_MODULE_0__[\"default\"])\r\n\t\t\tvar inst = Object.create(proto);\r\n\t\t\tproto.constructor = inst;\r\n\r\n\t\t\t//call initialize on Component first\r\n\t\t\tinst.initialize({\r\n\t\t\t\tcontainer: document.querySelector('.js-app-container'),\r\n\t\t\t});\r\n\t\t\t\r\n\t\t\t//init storage items\r\n\t\t\t_storage_plantListStore__WEBPACK_IMPORTED_MODULE_11__[\"default\"].init();\r\n\t\t\t_storage_treesFilterStore__WEBPACK_IMPORTED_MODULE_12__[\"default\"].init();\r\n\t\t\t_storage_plantTablesStore__WEBPACK_IMPORTED_MODULE_13__[\"default\"].init();\r\n\t\t\t_storage_appStateStore__WEBPACK_IMPORTED_MODULE_14__[\"default\"].init();\r\n\r\n\t\t\t//components to show\r\n\t\t\tinst.signIn = _auth_signIn__WEBPACK_IMPORTED_MODULE_2__[\"default\"].init();\r\n\t\t\tinst.pageNotFound = _404__WEBPACK_IMPORTED_MODULE_6__[\"default\"].init();\r\n\t\t\tinst.signedOut = _auth_signedOut__WEBPACK_IMPORTED_MODULE_5__[\"default\"].init();\r\n\t\t\tinst.dashboard = _dashboard__WEBPACK_IMPORTED_MODULE_3__[\"default\"].init();\r\n\t\t\tinst.plantsList = _plants_plantsList__WEBPACK_IMPORTED_MODULE_7__[\"default\"].init();\r\n\t\t\tinst.plantAdd = _plants_plantAdd__WEBPACK_IMPORTED_MODULE_8__[\"default\"].init();\r\n\t\t\tinst.plantEdit = _plants_plantEdit__WEBPACK_IMPORTED_MODULE_9__[\"default\"].init();\r\n\t\t\t\r\n\r\n\t\t\t_router__WEBPACK_IMPORTED_MODULE_1__[\"default\"].init(inst.update.bind(inst));\r\n\r\n\t\t\treturn inst;\r\n\t\t}\r\n\t}\r\n\r\n\tMain.init();\r\n})();\r\n\r\n\n\n//# sourceURL=webpack:///./src/js/app/admin/mainAdmin.js?");

/***/ }),

/***/ "./src/js/app/admin/parts/crop.js":
/*!****************************************!*\
  !*** ./src/js/app/admin/parts/crop.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../component */ \"./src/js/app/component.js\");\n/* harmony import */ var _imageEditMeta__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./imageEditMeta */ \"./src/js/app/admin/parts/imageEditMeta.js\");\n/* harmony import */ var sanitize_filename__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! sanitize-filename */ \"./node_modules/sanitize-filename/index.js\");\n/* harmony import */ var sanitize_filename__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(sanitize_filename__WEBPACK_IMPORTED_MODULE_2__);\n\r\n\r\n\r\n\r\nvar Crop = {\r\n\tthumbWidth: 150,\r\n\tthumbHeight: 150,\r\n\tonUnmount: function() {\r\n\t  //do this to avoid memory leaks\r\n\t  window.URL.revokeObjectURL(this.file.preview);\r\n\t},\r\n\tvalidateFileName: function(fileName) {\r\n\t  //validate file name\r\n\t  let validatedName = sanitize_filename__WEBPACK_IMPORTED_MODULE_2___default()(fileName);\r\n\t  //replace spaces with dashes\r\n\t  let spacesReplaced = validatedName.replace(/\\ +/g, '-');\r\n\t  //remove these characters: ()';\r\n\t  let bracketsReplaced = spacesReplaced.replace(/(\\(|\\)|'|;)+/g, '');\r\n\t  //append date\r\n\t  // var date = new Date().getTime();\r\n\t  // let finalName = bracketsReplaced.replace(/(\\.[\\w\\d_-]+)$/i, '-' + date + '$1');\r\n\t  let finalName = bracketsReplaced;\r\n\r\n\t  return finalName;\r\n\t},\r\n\tblobToFile: function(blob, fileName) {\r\n\t  //currently only works for chrome, ff and safari 10.1+\r\n\t  let file = new File([blob], this.validateFileName(fileName));\r\n\t  return file;\r\n\t},\r\n\tloadImage: function(file) {\r\n\t  this.file = file;\r\n\t  let reader = new FileReader();\r\n\t  reader.readAsDataURL(file);\r\n\t  reader.onloadend = () => {\r\n\t  \tlet img = new Image();\r\n\t    img.src = reader.result;\r\n\t    img.onload = () => {\r\n\t    \tconst widthAspect = img.naturalWidth / img.naturalHeight;\r\n\t    \tconst heightAspect = img.naturalHeight / img.naturalWidth;\r\n\t    \tlet height = 0;\r\n\t    \tlet width = 0;\r\n\r\n\t    \tif(img.naturalWidth > img.naturalHeight) {\r\n\t    \t\theight = this.thumbHeight;\r\n\t    \t\twidth = this.thumbWidth*widthAspect\r\n\t    \t}\r\n\r\n\t    \tif(img.naturalWidth < img.naturalHeight) {\r\n\t    \t\twidth = this.thumbWidth;\r\n\t    \t\theight = this.thumbHeight*heightAspect\r\n\t    \t}\r\n\r\n\t    \t//create a temporary canvas to create the resized image\r\n\t    \tthis.tempCanvas = document.createElement('canvas');\r\n\t    \tthis.tempCanvas.width = width;\r\n\t    \tthis.tempCanvas.height = height;\r\n\t    \tvar tempCtx = this.tempCanvas.getContext('2d');\r\n\r\n    \t    tempCtx.drawImage(img,\r\n    \t\t    0, 0, // x, y start from top left of image (crop),\r\n    \t\t    img.naturalWidth, img.naturalHeight, // w, h of image (crop),\r\n    \t\t    0, 0, // x, y start from top left of canvas for result image,\r\n    \t\t    width, height // w, h of result image (scale)\r\n\t\t\t\t);\r\n\r\n\r\n    \t    //draw temp canvas to the main canvas (draw as an image)\r\n    \t    this.canvas.width = width;\r\n    \t    this.canvas.height = height;\r\n    \t    this.ctx.drawImage(this.tempCanvas, 0, 0);\r\n\r\n    \t    //draw a rectangle in the center of the image\r\n    \t    this.rectXPos = (width - this.thumbWidth)/2;\r\n\t\t\tthis.rectYPos = (height - this.thumbHeight)/2;\r\n\t\t\tthis.drawRect();\r\n\t    }\r\n\t  }\r\n\t},\r\n\tdrawRect: function() {\r\n\t\tthis.ctx.beginPath();\r\n\t\tthis.ctx.rect(this.rectXPos, this.rectYPos, this.thumbWidth, this.thumbHeight);\r\n\t\tthis.ctx.stroke();\r\n\t},\r\n\tsubmitCrop: function() {\r\n\t\t// if(window.navigator.msSaveBlob) {\r\n\r\n\t\t// } else {\r\n\t\t// \tthis.canvas.toBlob((blob) => {\r\n\r\n\t\t// \t});\r\n\t\t// }\r\n\r\n\t\t//clear canvas and set it's width and height to finished crop dimensions\r\n\t\tthis.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);\r\n\t\tthis.canvas.width = this.thumbWidth;\r\n\t\tthis.canvas.height = this.thumbHeight;\r\n\r\n\t\t//crop the portion of the image inside the box and draw\r\n\t    this.ctx.drawImage(this.tempCanvas,\r\n\t\t    this.rectXPos, this.rectYPos, // x, y start from top left of image (crop),\r\n\t\t    this.thumbWidth, this.thumbHeight, // w, h of image (crop),\r\n\t\t    0, 0, // x, y start from top left of canvas for result image,\r\n\t\t    this.thumbWidth, this.thumbHeight // w, h of result image (scale)\r\n\t\t\t);\r\n\r\n\t    //convert to blob and output file data and preview\r\n\t\tthis.canvas.toBlob((blob) => {\r\n\t\t\tconst fileData = {\r\n\t\t\t  croppedFile: this.blobToFile(blob, this.file.name),\r\n\t\t\t  originalFile: this.file,\r\n\t\t\t  tag_id: this.state.meta.tag,\r\n\t\t\t  description: this.state.meta.description,\r\n\t\t\t}\r\n\r\n\t\t\tconst previewData = {\r\n\t\t\t\tdataUrl: this.canvas.toDataURL('image/jpeg'),\r\n\t\t\t\tname: this.file.name,\r\n\t\t\t\ttagName: this.state.meta.tagName,\r\n\t\t\t}\r\n\r\n\t\t\tthis.updateFiles(fileData, previewData);\r\n\r\n\t\t\tthis.doneCrop();\r\n\t\t\tthis.onUnmount();\r\n\t\t}, 'image/jpeg', 0.95);\r\n\t},\r\n\tdoneCrop: function() {\r\n\t\tthis.onUnmount();\r\n\t\t//callback\r\n\t\tthis.onCropDone();\r\n\t},\r\n\tonMetaUpdated: function(meta) {\r\n\t\tthis.setState({ meta: meta });\r\n\t},\r\n\tinit: function(options) {\r\n\t\tvar proto = Object.assign({}, this, _component__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\r\n\t\tvar inst = Object.create(proto);\r\n\t\t// assign the instance constructor to the prototype so 'this' refers to the instance\r\n\t\tproto.constructor = inst;\r\n\r\n\t\t//polyfill to <canvasElement>.toBlob for safari, ie\r\n\t\tif (!HTMLCanvasElement.prototype.toBlob) {\r\n\t\t Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {\r\n\t\t  value: function (callback, type, quality) {\r\n\r\n\t\t    var binStr = atob( this.toDataURL(type, quality).split(',')[1] ),\r\n\t\t        len = binStr.length,\r\n\t\t        arr = new Uint8Array(len);\r\n\r\n\t\t    for (var i = 0; i < len; i++ ) {\r\n\t\t     arr[i] = binStr.charCodeAt(i);\r\n\t\t    }\r\n\r\n\t\t    callback( new Blob( [arr], {type: type || 'image/jpeg'} ) );\r\n\t\t  }\r\n\t\t });\r\n\t\t}\r\n\t\t//end polyfill\r\n\r\n\t\tinst.onCropDone = options.onCropDone;\r\n\t\tinst.updateFiles = options.onUpdateFiles;\r\n\r\n\t\t//call initialize on Component first\r\n\t\tinst.initialize({\r\n\t\t\tel: \r\n\t\t\t`<div class=\"crop\">\r\n\t\t\t\t<canvas id=\"canvas\"></canvas>\r\n\r\n\t\t\t\t<div class=\"cropper-buttons\">\r\n\t\t\t\t  <button id=\"crop\" class=\"btn\"}>crop</button>\r\n\t\t\t\t  <button id=\"cancel\" class=\"btn\">cancel</button>\r\n\t\t\t\t</div>\r\n\t\t\t</div>`\r\n\t\t});\r\n\r\n\t\t//get elements\r\n\t\tinst.cropperButtons = inst.el.querySelector('.cropper-buttons');\r\n\t\tinst.cropperButtons.querySelector('#crop').addEventListener('click', inst.submitCrop.bind(inst), false);\r\n\t\tinst.cropperButtons.querySelector('#cancel').addEventListener('click', inst.doneCrop.bind(inst), false);\r\n\t\tinst.imageEditMeta = _imageEditMeta__WEBPACK_IMPORTED_MODULE_1__[\"default\"].init({\r\n\t\t\ttags: options.tags,\r\n\t\t\tonUpdate: inst.onMetaUpdated.bind(inst)\r\n\t\t});\r\n\t\tinst.cropperButtons.before(inst.imageEditMeta.el);\r\n\r\n\t\tinst.canvas = inst.el.querySelector('#canvas');\r\n\t\t// inst.canvas.style.maxWidth = '400px';\r\n\t\t// inst.canvas.style.maxheight = '400px';\r\n\t\tinst.canvas.style.height = this.thumbHeight;\r\n\t\tinst.ctx = inst.canvas.getContext('2d');\r\n\r\n\t\treturn inst;\r\n\t}\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (Crop);\n\n//# sourceURL=webpack:///./src/js/app/admin/parts/crop.js?");

/***/ }),

/***/ "./src/js/app/admin/parts/fieldAddImages.js":
/*!**************************************************!*\
  !*** ./src/js/app/admin/parts/fieldAddImages.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../component */ \"./src/js/app/component.js\");\n/* harmony import */ var _fileDrop__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./fileDrop */ \"./src/js/app/admin/parts/fileDrop.js\");\n/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modal */ \"./src/js/app/admin/parts/modal.js\");\n/* harmony import */ var _crop__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./crop */ \"./src/js/app/admin/parts/crop.js\");\n/* harmony import */ var lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lodash/cloneDeep */ \"./node_modules/lodash/cloneDeep.js\");\n/* harmony import */ var lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_4__);\n\r\n\r\n\r\n\r\n\r\n\r\nvar FieldAddImages = {\r\n\tonFileDrop: function(file) {\r\n\t\tthis.crop.loadImage(file);\r\n\t\tthis.modal.open();\r\n\t},\r\n\tonCropDone: function() {\r\n\t\tthis.modal.close();\r\n\t},\r\n\tonDeleteClick: function(index) {\r\n\t  //remove it from accepted at it's index\r\n\t  let croppedOut = lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_4___default()(this.state.croppedOut);\r\n\t  croppedOut.splice(index, 1);\r\n\t  this.setState({ croppedOut: croppedOut });\r\n\r\n\t  //update the previews\r\n\t  let previews = lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_4___default()(this.state.previews);\r\n\t  previews.splice(index, 1);\r\n\t  this.setState({ previews: previews });\r\n\r\n\t  this.updatePreview();\r\n\t},\r\n\tonUpdateFiles: function(fileData, preview) {\r\n\t\t//output updated files\r\n\t\tlet croppedOut = lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_4___default()(this.state.croppedOut);\r\n\t\tcroppedOut.push(fileData);\r\n\t\tthis.setState({ croppedOut: croppedOut });\r\n\t\t\r\n\t\t//output images preview\r\n\t\tlet previews = lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_4___default()(this.state.previews);\r\n\t\tpreviews.push(preview);\r\n\t\tthis.setState({previews: previews});\r\n\r\n\t\tthis.updatePreview();\r\n\t},\r\n\tupdatePreview: function() {\r\n\t\t// clear drop preview first\r\n\t\tthis.dropPreview.innerHTML = '';\r\n\t\tthis.state.croppedOut.map((item, index) => {\r\n\t\t\tconst dropPreviewImage = this.createEl(`\r\n\t\t\t\t<div class=\"drop-preview\">\r\n\t\t\t\t\t<div data-id=\"${item.croppedFile.name}\" class=\"close-btn\"></div>\r\n\t\t\t\t\t<img class=\"drop-img-preview\" src=${this.state.previews[index].dataUrl} />\r\n\t\t\t\t\t<div class=\"desc\">\r\n\t\t\t\t\t  ${this.state.previews[index].name}\r\n\t\t\t\t\t  <br/>\r\n\t\t\t\t\t  ${this.state.previews[index].tagName && 'tag: ' + this.state.previews[index].tagName}\r\n\t\t\t\t\t  <br/>\r\n\t\t\t\t\t  ${item.description && 'description: ' + item.description} \r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t\t`);\r\n\t\t\tdropPreviewImage.querySelector('.close-btn').addEventListener('click', this.onDeleteClick.bind(this, index), false);\r\n\r\n\t\t\tthis.dropPreview.appendChild(dropPreviewImage);\r\n\t\t});\r\n\t},\r\n\tinit: function(options) {\r\n\t\tvar proto = Object.assign({}, this, _component__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\r\n\t\tvar inst = Object.create(proto);\r\n\t\t// assign the instance constructor to the prototype so 'this' refers to the instance\r\n\t\tproto.constructor = inst;\r\n\r\n\t\tinst.tags = options.tags;\r\n\t\tinst.setState({ croppedOut: [] });\r\n\t\tinst.setState({ previews: [] });\r\n\r\n\t\t//call initialize on Component first\r\n\t\tinst.initialize({\r\n\t\t\tel: \r\n\t\t\t`<div>\r\n\t\t\t</div>`\r\n\t\t});\r\n\r\n\t\tinst.fileDrop = _fileDrop__WEBPACK_IMPORTED_MODULE_1__[\"default\"].init({ callback: inst.onFileDrop.bind(inst) });\r\n\t\tinst.el.appendChild(inst.fileDrop.el);\r\n\t\tinst.dropPreview = inst.createEl(`<div class=\"drop-preview-wrapper\"></div>`);\r\n\t\tinst.el.appendChild(inst.dropPreview);\r\n\r\n\t\tinst.crop = _crop__WEBPACK_IMPORTED_MODULE_3__[\"default\"].init({ \r\n\t\t\ttags: options.tags, \r\n\t\t\tonCropDone: inst.onCropDone.bind(inst),\r\n\t\t\tonUpdateFiles: inst.onUpdateFiles.bind(inst)\r\n\t\t});\r\n\t\tinst.modal = _modal__WEBPACK_IMPORTED_MODULE_2__[\"default\"].init({ contentElement: inst.crop.el });\r\n\r\n\t\treturn inst;\r\n\t}\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (FieldAddImages);\n\n//# sourceURL=webpack:///./src/js/app/admin/parts/fieldAddImages.js?");

/***/ }),

/***/ "./src/js/app/admin/parts/fieldDropdownSelect.js":
/*!*******************************************************!*\
  !*** ./src/js/app/admin/parts/fieldDropdownSelect.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../component */ \"./src/js/app/component.js\");\n\r\n\r\nvar FieldDropdownSelect = {\r\n\tinit: function(options) {\r\n\t\tvar proto = Object.assign({}, this, _component__WEBPACK_IMPORTED_MODULE_0__[\"default\"])\r\n\t\tvar inst = Object.create(proto);\r\n\t\t// assign the instance constructor to the prototype so 'this' refers to the instance\r\n\t\tproto.constructor = inst;\r\n\r\n\t\t//call initialize on Component first \r\n\t\tinst.initialize({\r\n\t\t\tel: \r\n\t\t\t`<div class=\"form-group \">\r\n                <label>${options.label}:</label>\r\n                <select class=\"form-control\" type=\"text\" name=\"${options.name}\" value=\"${options.value || ''}>\r\n                </select>\r\n                <div class=\"error\"></div>\r\n             </div>`\r\n\t\t});\r\n\r\n\t\tlet errorEl = inst.el.querySelector('.error');\r\n\t\tinst.select = inst.el.querySelector('select');\r\n\t\tinst.select.addEventListener('blur', (e) => {\r\n\t\t\tinst.select = inst.el.querySelector('select');\r\n\t\t\tif((options.condition === 'required') && (inst.input.value == '')) {\r\n\t\t\t\terrorEl.innerHTML = options.error;\r\n\t\t\t}\r\n\t\t\t\r\n\t\t}, false);\r\n\r\n\t    options.selectItems.map((item) => {\r\n\t    \tconst option = inst.createEl(`<option value=${item.id}>${item.name}</option>`);\r\n\t    \tinst.select.appendChild(option);\r\n\t    });\r\n\r\n\t    //select the currently selected value\r\n\t    inst.select.value = options.value;\r\n\t\t\r\n\t\treturn inst;\r\n\t}\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (FieldDropdownSelect);\n\n//# sourceURL=webpack:///./src/js/app/admin/parts/fieldDropdownSelect.js?");

/***/ }),

/***/ "./src/js/app/admin/parts/fieldHidden.js":
/*!***********************************************!*\
  !*** ./src/js/app/admin/parts/fieldHidden.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../component */ \"./src/js/app/component.js\");\n\r\n\r\nvar FieldHidden = {\r\n\tinit: function(options) {\r\n\t\tvar proto = Object.assign({}, this, _component__WEBPACK_IMPORTED_MODULE_0__[\"default\"])\r\n\t\tvar inst = Object.create(proto);\r\n\t\t// assign the instance constructor to the prototype so 'this' refers to the instance\r\n\t\tproto.constructor = inst;\r\n\r\n\t\t//call initialize on Component first \r\n\t\tinst.initialize({\r\n\t\t\tel: \r\n\t\t\t`<input class=\"form-control\" type=\"hidden\" name=\"${options.name}\" value=\"${options.value || ''}\">`\r\n\t\t});\r\n\r\n\t\treturn inst;\r\n\t}\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (FieldHidden);\n\n//# sourceURL=webpack:///./src/js/app/admin/parts/fieldHidden.js?");

/***/ }),

/***/ "./src/js/app/admin/parts/fieldInput.js":
/*!**********************************************!*\
  !*** ./src/js/app/admin/parts/fieldInput.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../component */ \"./src/js/app/component.js\");\n\r\n\r\nvar FieldInput = {\r\n\tinit: function(options) {\r\n\t\tvar proto = Object.assign({}, this, _component__WEBPACK_IMPORTED_MODULE_0__[\"default\"])\r\n\t\tvar inst = Object.create(proto);\r\n\t\t// assign the instance constructor to the prototype so 'this' refers to the instance\r\n\t\tproto.constructor = inst;\r\n\r\n\t\t//call initialize on Component first \r\n\t\tinst.initialize({\r\n\t\t\tel: \r\n\t\t\t`<div class=\"form-group \">\r\n                <label>${options.label}:</label>\r\n                <input class=\"form-control\" type=\"text\" name=\"${options.name}\" value=\"${options.value || ''}\">\r\n                <div class=\"error\"></div>\r\n             </div>`\r\n\t\t});\r\n\r\n\t\tlet errorEl = inst.el.querySelector('.error');\r\n\t\tinst.el.querySelector('input').addEventListener('blur', (e) => {\r\n\t\t\tinst.input = inst.el.querySelector('input');\r\n\t\t\tif((options.condition === 'required') && (inst.input.value == '')) {\r\n\t\t\t\terrorEl.innerHTML = options.error;\r\n\t\t\t}\r\n\t\t\t\r\n\t\t}, false);\r\n\r\n\t\treturn inst;\r\n\t}\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (FieldInput);\n\n//# sourceURL=webpack:///./src/js/app/admin/parts/fieldInput.js?");

/***/ }),

/***/ "./src/js/app/admin/parts/fieldMultiSelect.js":
/*!****************************************************!*\
  !*** ./src/js/app/admin/parts/fieldMultiSelect.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../component */ \"./src/js/app/component.js\");\n/* harmony import */ var _fieldHidden__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./fieldHidden */ \"./src/js/app/admin/parts/fieldHidden.js\");\n/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../lib/utils */ \"./src/js/app/lib/utils.js\");\n\r\n\r\n\r\n\r\nvar FieldMultiselect = {\r\n\tupdateValue: function() {\r\n\r\n\t\t//update hidden input\r\n\t\tthis.fieldHidden.el.value = this.state.value.toString();\r\n\t},\r\n\tonOptionClick: function(e) {\r\n\t\tconst optionValue = e.target.dataset['value'];\r\n\r\n\t\tif(! this.state.value.includes(optionValue)) {\r\n\t\t\t//add the value\r\n\t\t\tthis.state.value.push(optionValue);\r\n\t\t} else {\r\n\t\t\t//remove the value\r\n\t\t\tconst index = this.state.value.indexOf(optionValue);\r\n\t\t\tthis.state.value.splice(index, 1);\r\n\t\t}\r\n\r\n\t\tthis.updateValue();\r\n\r\n\t\tObject(_lib_utils__WEBPACK_IMPORTED_MODULE_2__[\"toggleClass\"])(e.target, 'selected');\r\n\t},\r\n\tinit: function(options) {\r\n\t\tvar proto = Object.assign({}, this, _component__WEBPACK_IMPORTED_MODULE_0__[\"default\"])\r\n\t\tvar inst = Object.create(proto);\r\n\t\t// assign the instance constructor to the prototype so 'this' refers to the instance\r\n\t\tproto.constructor = inst;\r\n\r\n\t\t//call initialize on Component first \r\n\t\tinst.initialize({\r\n\t\t\tel:\r\n\t\t\t`<div class=\"form-group \">\r\n                <label>${options.label}:</label>\r\n                <div id=\"select\" class=\"multiselect\"></div>\r\n                <div class=\"error\"></div>\r\n             </div>`\r\n\t\t});\r\n\r\n\t\tinst.fieldHidden = _fieldHidden__WEBPACK_IMPORTED_MODULE_1__[\"default\"].init({ name: options.name });\r\n\t\tinst.el.appendChild(inst.fieldHidden.el);\r\n\t\tlet errorEl = inst.el.querySelector('.error');\r\n\t\tinst.select = inst.el.querySelector('#select');\r\n\t\tinst.select.addEventListener('blur', (e) => {\r\n\t\t\tinst.select = inst.el.querySelector('select');\r\n\t\t\tif((options.condition === 'required') && (inst.input.value == '')) {\r\n\t\t\t\terrorEl.innerHTML = options.error;\r\n\t\t\t}\r\n\t\t\t\r\n\t\t}, false);\r\n\r\n\t\tinst.selectItems = options.selectItems;\r\n\r\n\t\tinst.selectItems.map((item) => {\r\n\t\t\tconst option = inst.createEl(`<div class=\"option\" data-value=\"${item.id}\">${item.name}</div>`);\r\n\t\t\toption.addEventListener('click', inst.onOptionClick.bind(inst), false);\r\n\t\t\tinst.select.appendChild(option);\r\n\t\t});\r\n\r\n\t\tinst.setState({ value: [] });\r\n\r\n\t\t//set initial selected if presnent\r\n\t\tif(options.value) {\r\n\t\t\tlet valueArray = options.value.map((item) => {\r\n\t\t\t\treturn item.id;\r\n\t\t\t});\r\n\t\t\tinst.setState({ value: valueArray });\r\n\r\n\t\t\tinst.selectItems.map((item) => {\r\n\t\t\t\t//save this in state\r\n\t\t\t\tinst.state.value.map((selectedItem) => {\r\n\t\t\t\t\tif(item.id == selectedItem) {\r\n\t\t\t\t\t\t//update the option element\r\n\t\t\t\t\t\tObject(_lib_utils__WEBPACK_IMPORTED_MODULE_2__[\"toggleClass\"])(inst.select.querySelector(`[data-value=\"${item.id}\"]`), 'selected');\r\n\t\t\t\t\t}\r\n\t\t\t\t});\r\n\t\t\t});\r\n\t\t}\r\n\r\n\t\tinst.updateValue();\r\n\r\n\t\treturn inst;\r\n\t}\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (FieldMultiselect);\n\n//# sourceURL=webpack:///./src/js/app/admin/parts/fieldMultiSelect.js?");

/***/ }),

/***/ "./src/js/app/admin/parts/fieldTextarea.js":
/*!*************************************************!*\
  !*** ./src/js/app/admin/parts/fieldTextarea.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../component */ \"./src/js/app/component.js\");\n\r\n\r\nvar FieldTextarea = {\r\n\tupdateTextArea: function(newText, selectedText) {\r\n\t  //get the character index of the selected text\r\n\r\n\t  String.prototype.replaceAt=function(index, replacement) {\r\n\t    return this.substr(0, index) + replacement + this.substr(index + selectedText.length);\r\n\t  }\r\n\r\n\t  let fieldValue = this.textarea.value.slice();\r\n\t  let replacedBodyText = fieldValue.replaceAt(this.textarea.selectionStart, newText);\r\n\r\n\t  this.textarea.value = replacedBodyText;\r\n\t},\r\n\twrapTextInElement: function(element) {\r\n\t  if (this.textarea.value) {\r\n\t     //get the current highlighted text\r\n\t     let selObj = window.getSelection(); \r\n\t     let selectedText = selObj.toString();\r\n\t     let wrappedText = '<'+element+'>'+selectedText+'</'+element+'>';\r\n\r\n\t     this.updateTextArea(wrappedText, selectedText);\r\n\t  }\r\n\t},\r\n\tonSecHeadingClick: function(e) {\r\n\t e.stopPropagation();\r\n\t e.preventDefault();\r\n\r\n\t this.wrapTextInElement('h3');\r\n\t},\r\n\tonParagraphClick: function(e) {\r\n\t  e.stopPropagation();\r\n\t  e.preventDefault();\r\n\r\n\t  this.wrapTextInElement('p');\r\n\t},\r\n\tonUlClick: function(e) {\r\n\t  e.stopPropagation();\r\n\t  e.preventDefault();\r\n\r\n\t  if (this.textarea.value) {\r\n\t     //get the current highlighted text\r\n\t     let selObj = window.getSelection(); \r\n\t     let selectedText = selObj.toString();\r\n\r\n\t     //insert <li> elements at beginning of lines\r\n\t     let wrappedText = ' <li>' + selectedText.replace(/(?:\\n|\\r)/g, '\\n <li>');\r\n\t     //insert </li> elements at line breaks\r\n\t     wrappedText = wrappedText.replace(/(?:\\n|\\r)/g, '</li>\\n') + '</li>\\n';\r\n\t     //remove the last \\n\r\n\t     wrappedText = wrappedText.replace(/(?:\\n)$/g, '');\r\n\t     //wrap it all in a ul\r\n\t     wrappedText = '<ul>\\n'+wrappedText+'\\n</ul>';\r\n\r\n\t     this.updateTextArea(wrappedText, selectedText);\r\n\t  }\r\n\t},\r\n\tonFigureClick: function(e) {\r\n\t  e.stopPropagation();\r\n\t  e.preventDefault();\r\n\r\n\t  //get the current highlighted text\r\n\t  let selObj = window.getSelection(); \r\n\t  let selectedText = selObj.toString();\r\n\r\n\t  if (this.textarea.value) {\r\n\t     let wrappedText = '<figure>\\n'+selectedText+'\\n<figcaption></figcaption>\\n</figure>';\r\n\t     this.updateTextArea(wrappedText, selectedText);\r\n\t  }\r\n\t},\r\n\tonClearClick: function(e) {\r\n\t  e.stopPropagation();\r\n\t  e.preventDefault();\r\n\r\n\t  //get the current highlighted text\r\n\t  let selObj = window.getSelection(); \r\n\t  let selectedText = selObj.toString();\r\n\r\n\t  if (this.textarea.value) {\r\n\t     let wrappedText = '<div class=\"clear\"></div>';\r\n\t     this.updateTextArea(wrappedText, selectedText);\r\n\t  }\r\n\t},\r\n\tinit: function(options) {\r\n\t\tvar proto = Object.assign({}, this, _component__WEBPACK_IMPORTED_MODULE_0__[\"default\"])\r\n\t\tvar inst = Object.create(proto);\r\n\t\t// assign the instance constructor to the prototype so 'this' refers to the instance\r\n\t\tproto.constructor = inst;\r\n\r\n\t\t//call initialize on Component first \r\n\t\tinst.initialize({\r\n\t\t\tel: \r\n\t\t\t`<div class=\"form-group\">\r\n\t\t       <label>${options.label}:</label>\r\n\t\t       <button id=\"h\">h3</button>\r\n\t\t       <button id=\"p\">p</button>\r\n\t\t       <button id=\"ul\">ul</button>\r\n\t\t       <button id=\"figure\">figure</button>\r\n\t\t       <button id=\"clear\">clear</button>\r\n\t\t       <textarea\r\n\t\t\t       class=\"form-control\"\r\n\t\t\t       rows=\"12\" \r\n\t\t\t       cols=\"50\"\r\n\t\t\t       name=\"${options.name}\"\r\n\t\t\t   >${options.value || ''}</textarea>\r\n\t\t     </div>`\r\n\t\t});\r\n\r\n\t\tlet errorEl = inst.el.querySelector('.error');\r\n\t\tinst.el.querySelector('textarea').addEventListener('blur', (e) => {\r\n\t\t\tinst.input = inst.el.querySelector('textarea');\r\n\t\t\tif((options.condition === 'required') && (inst.input.value == '')) {\r\n\t\t\t\terrorEl.innerHTML = options.error;\r\n\t\t\t}\r\n\t\t\t\r\n\t\t}, false);\r\n\r\n\t\t//get parts\r\n\t\tinst.textarea = inst.el.querySelector('textarea');\r\n\r\n\t\t//add events\r\n\t\tinst.el.querySelector('#h').addEventListener('click', inst.onSecHeadingClick.bind(inst));\r\n\t\tinst.el.querySelector('#p').addEventListener('click', inst.onParagraphClick.bind(inst));\r\n\t\tinst.el.querySelector('#ul').addEventListener('click', inst.onUlClick.bind(inst));\r\n\t\tinst.el.querySelector('#figure').addEventListener('click', inst.onFigureClick.bind(inst));\r\n\t\tinst.el.querySelector('#clear').addEventListener('click', inst.onClearClick.bind(inst));\r\n\r\n\t\treturn inst;\r\n\t}\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (FieldTextarea);\n\n//# sourceURL=webpack:///./src/js/app/admin/parts/fieldTextarea.js?");

/***/ }),

/***/ "./src/js/app/admin/parts/fileDrop.js":
/*!********************************************!*\
  !*** ./src/js/app/admin/parts/fileDrop.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../component */ \"./src/js/app/component.js\");\n/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../lib/utils */ \"./src/js/app/lib/utils.js\");\n\r\n\r\n\r\nvar FileDrop = {\r\n\tpreventDefaults: function(e) {\r\n\t  e.preventDefault()\r\n\t  e.stopPropagation()\r\n\t},\r\n\thighlight: function(e) {\r\n\t\tObject(_lib_utils__WEBPACK_IMPORTED_MODULE_1__[\"addClass\"])(this.el, 'highlight')\r\n\t},\r\n\tunhighlight: function(e) {\r\n\t  Object(_lib_utils__WEBPACK_IMPORTED_MODULE_1__[\"removeClass\"])(this.el, 'highlight');\r\n\t},\r\n\thandleFiles: function(files) {\r\n\t  files = [...files]\r\n\t  files.forEach(this.callback.bind(this));\r\n\t},\r\n\thandleDrop: function(e) {\r\n\t  let dt = e.dataTransfer\r\n\t  let files = dt.files\r\n\r\n\t  this.handleFiles(files);\r\n\t},\r\n\tinit: function(options) {\r\n\t\tvar proto = Object.assign({}, this, _component__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\r\n\t\tvar inst = Object.create(proto);\r\n\t\t// assign the instance constructor to the prototype so 'this' refers to the instance\r\n\t\tproto.constructor = inst;\r\n\r\n\t\tinst.callback = options.callback;\r\n\r\n\t\t//call initialize on Component first\r\n\t\tinst.initialize({\r\n\t\t\tel: \r\n\t\t\t`<div id=\"drop-area\" class=\"dropzone\">\r\n\t\t\t\t<div className=\"instructions\">\r\n\t\t\t\t\tDrop files here<br/>\r\n\t\t\t\t\t(Only jpeg images will be accepted)\r\n\t\t\t\t</div>\r\n\t\t\t</div>`\r\n\t\t});\r\n\r\n\t\t//add event listeners\r\n\t\t['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {\r\n\t\t  inst.el.addEventListener(eventName, inst.preventDefaults.bind(inst), false)\r\n\t\t});\r\n\t\t['dragenter', 'dragover'].forEach(eventName => {\r\n\t\t  inst.el.addEventListener(eventName, inst.highlight.bind(inst), false)\r\n\t\t});\r\n\t\t['dragleave', 'drop'].forEach(eventName => {\r\n\t\t  inst.el.addEventListener(eventName, inst.unhighlight.bind(inst), false)\r\n\t\t})\r\n\t\tinst.el.addEventListener('drop', inst.handleDrop.bind(inst), false)\r\n\r\n\t\treturn inst;\r\n\t}\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (FileDrop);\n\n//# sourceURL=webpack:///./src/js/app/admin/parts/fileDrop.js?");

/***/ }),

/***/ "./src/js/app/admin/parts/imageEditMeta.js":
/*!*************************************************!*\
  !*** ./src/js/app/admin/parts/imageEditMeta.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../component */ \"./src/js/app/component.js\");\n\r\n\r\nvar ImageEditMeta = {\r\n\tonTagChange: function(e) {\r\n\t\tthis.setState({tag_id: e.target.value});\r\n\t\tthis.setState({tag_name: e.target.options[e.target.selectedIndex].text});\r\n\t\tthis.update();\r\n\t},\r\n\tonDescChange(inputValue) {\r\n\t  this.setState({description: inputValue});\r\n\t  this.update();\r\n\t},\r\n\tupdate() {\r\n\t\tthis.onUpdate({ \r\n\t\t\ttag: this.state.tag_id,\r\n\t\t\ttagName: this.state.tag_name,\r\n\t\t\tdescription: this.state.description \r\n\t\t});\r\n\t},\r\n\tinit: function(options) {\r\n\t\tvar proto = Object.assign({}, this, _component__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\r\n\t\tvar inst = Object.create(proto);\r\n\t\t// assign the instance constructor to the prototype so 'this' refers to the instance\r\n\t\tproto.constructor = inst;\r\n\r\n\t\tinst.onUpdate = options.onUpdate;\r\n\r\n\t\t//call initialize on Component first\r\n\t\tinst.initialize({\r\n\t\t\tel: \r\n\t\t\t`<div>\r\n\t\t\t\t<select className=\"dropdown-select\" name=\"tag_id\">\r\n\t\t\t\t </select>\r\n\r\n\t\t\t\t<input type=\"text\" placeholder=\"description\" name=\"description\"/>\r\n\t\t\t</div>`\r\n\t\t});\r\n\r\n\t\t// get elements\r\n\t\tinst.select = inst.el.querySelector('select');\r\n\t\toptions.tags.map((item) => {\r\n\t\t  const option = inst.createEl(`<option key=${item.id} value=${item.id}>${item.name}</option>`);\r\n\t\t  inst.select.appendChild(option);\r\n\t\t});\r\n\t\tinst.select.addEventListener('change', inst.onTagChange.bind(inst), false);\r\n\t\tinst.input = inst.el.querySelector('input');\r\n\t\tinst.input.addEventListener('input', (e) => inst.onDescChange(e.target.value), false);\r\n\t\t//set an initial value\r\n\t\tinst.setState({ tag_id: options.tags[0].id });\r\n\t\tinst.setState({ description: '' });\r\n\t\tinst.update();\r\n\t\t\r\n\t\treturn inst;\r\n\t}\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (ImageEditMeta);\n\n//# sourceURL=webpack:///./src/js/app/admin/parts/imageEditMeta.js?");

/***/ }),

/***/ "./src/js/app/admin/parts/modal.js":
/*!*****************************************!*\
  !*** ./src/js/app/admin/parts/modal.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../component */ \"./src/js/app/component.js\");\n/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../lib/utils */ \"./src/js/app/lib/utils.js\");\n\r\n\r\n\r\nvar Modal = {\r\n\topen: function() {\r\n\t  this.el.style.display = 'flex';\r\n\r\n\t  setTimeout(() => {\r\n\t\tObject(_lib_utils__WEBPACK_IMPORTED_MODULE_1__[\"removeClass\"])(this.el, 'off');\r\n\t\tObject(_lib_utils__WEBPACK_IMPORTED_MODULE_1__[\"addClass\"])(this.el, 'on');\r\n\t  }, 100);\r\n\t},\r\n\tclose: function() {\r\n\t  Object(_lib_utils__WEBPACK_IMPORTED_MODULE_1__[\"removeClass\"])(this.el, 'on');\r\n\t  Object(_lib_utils__WEBPACK_IMPORTED_MODULE_1__[\"addClass\"])(this.el, 'off');\r\n\r\n\t  setTimeout(() => {\r\n\t    this.el.style.visibility = 'hidden';\r\n\t    this.el.style.opacity = '0';\r\n\t  }, 100);\r\n\t},\r\n\tinit: function(options) {\r\n\t\tvar proto = Object.assign({}, this, _component__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\r\n\t\tvar inst = Object.create(proto);\r\n\t\t// assign the instance constructor to the prototype so 'this' refers to the instance\r\n\t\tproto.constructor = inst;\r\n\r\n\t\t//call initialize on Component first\r\n\t\tinst.initialize({\r\n\t\t\tel: \r\n\t\t\t`<div id=\"modal\" class=\"modal transition-opac off\"></div>`\r\n\t\t});\r\n\r\n\t\tinst.contentElement = options.contentElement;\r\n\t\tinst.el.appendChild(inst.contentElement);\r\n\t\tdocument.body.insertBefore(inst.el, document.body.firstChild);\r\n\r\n\t\treturn inst;\r\n\t}\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (Modal);\n\n//# sourceURL=webpack:///./src/js/app/admin/parts/modal.js?");

/***/ }),

/***/ "./src/js/app/admin/parts/uploadedImages.js":
/*!**************************************************!*\
  !*** ./src/js/app/admin/parts/uploadedImages.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _lib_stringUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../lib/stringUtils */ \"./src/js/app/lib/stringUtils.js\");\n/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../component */ \"./src/js/app/component.js\");\n/* harmony import */ var _fieldHidden__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./fieldHidden */ \"./src/js/app/admin/parts/fieldHidden.js\");\n/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../lib/utils */ \"./src/js/app/lib/utils.js\");\n\r\n\r\n\r\n\r\n\r\nvar UploadedImages = {\r\n\tonDeleteClick: function(index) {\r\n\t\t//callback updated\r\n\t\tthis.onChange();\r\n\t\t//remove image at index\r\n\t\tlet updatedImages = Object(_lib_utils__WEBPACK_IMPORTED_MODULE_3__[\"clone\"])(this.state.images);\r\n\t\tupdatedImages.splice(index, 1);\r\n\r\n\t\tlet deletedImages = Object(_lib_utils__WEBPACK_IMPORTED_MODULE_3__[\"clone\"])(this.state.deletedImages);\r\n\t\tlet imageDeleted =  Object(_lib_utils__WEBPACK_IMPORTED_MODULE_3__[\"clone\"])(this.state.images[index]);\r\n\t\tdeletedImages.push(imageDeleted);\r\n\r\n\t\t//update local state\r\n\t\tthis.setState({ images: updatedImages });\r\n\t\tthis.setState({ deletedImages });\r\n\t\tthis.updateImages();\r\n\r\n\t\t//update parent\r\n\t\tthis.updateHiddenFields(deletedImages);\r\n\t},\r\n\treset: function() {\r\n\t\tthis.setState({ deletedImages: [] });\r\n\t\tthis.hiddenFieldDeletedImages.el.value = '';\r\n\t},\r\n\tonCopyClick: function(item) {\r\n\t\tlet imgStr = '<img alt=\"' + item.description + '\" src=\"/uploads/' + this.refType + '/' + item.name + '\" />';\r\n\t\tObject(_lib_stringUtils__WEBPACK_IMPORTED_MODULE_0__[\"copyStringToClipboard\"])(imgStr);\r\n\t},\r\n\tupdateHiddenFields: function(deletedImages) {\r\n\t\tlet delImages = [];\r\n\t\tObject.keys(deletedImages).forEach((key) => {\r\n\t\t    delImages[key] = deletedImages[key].name;\r\n\t\t})\r\n\t\tthis.hiddenFieldDeletedImages.el.value = delImages.toString();\r\n\t\t//this.hiddenFieldImages.el.value = JSON.stringify(images);\r\n\t},\r\n\tupdateImages: function() {\r\n\t\t// clear drop preview first\r\n\t\tthis.dropPreview.innerHTML = '';\r\n\t\tthis.state.images.map((item, index) => {\r\n\t\t\tconst dropPreviewImage = this.createEl(`\r\n\t\t\t\t<div class=\"drop-preview\">\r\n\t\t\t\t\t<div class=\"close-btn\"></div>\r\n\t\t\t\t\t<button class=\"copy-btn\">copy</button>\r\n\t\t\t\t\t<img class=\"drop-img-preview\" src=${'/uploads/' + this.refType + '/' + Object(_lib_stringUtils__WEBPACK_IMPORTED_MODULE_0__[\"imgName\"])(item.name, 'small')} />\r\n\t\t\t\t\t<div class=\"desc\">\r\n\t\t\t\t\t  ${item.name}\r\n\t\t\t\t\t  <br/>\r\n\t\t\t\t\t  ${item.tag_name && 'tag name: ' + item.tag_name}\r\n\t\t\t\t\t  <br/>\r\n\t\t\t\t\t  ${item.description && 'description: ' + item.description}\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t\t`);\r\n\t\t\tdropPreviewImage.querySelector('.close-btn').addEventListener('click', this.onDeleteClick.bind(this, index), false);\r\n\t\t\tdropPreviewImage.querySelector('.copy-btn').addEventListener('click', this.onCopyClick.bind(this, item), false);\r\n\r\n\t\t\tthis.dropPreview.appendChild(dropPreviewImage);\r\n\t\t});\r\n\t},\r\n\tinit: function(options) {\r\n\t\tvar proto = Object.assign({}, this, _component__WEBPACK_IMPORTED_MODULE_1__[\"default\"]);\r\n\t\tvar inst = Object.create(proto);\r\n\t\t// assign the instance constructor to the prototype so 'this' refers to the instance\r\n\t\tproto.constructor = inst;\r\n\r\n\t\tinst.onChange = options.onChange;\r\n\r\n\t\t//set initial state\r\n\t\tinst.refType = options.refType;\r\n\t\tinst.setState({ \r\n\t\t\timages: options.images, \r\n\t\t\tdeletedImages: [] \r\n\t\t});\r\n\r\n\t\t//call initialize on Component first\r\n\t\tinst.initialize({\r\n\t\t\tel: `<div>\r\n\t\t\t\t\t<div class=\"drop-preview-wrapper\">\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>`\r\n\t\t});\r\n\r\n\t\tinst.dropPreview = inst.el.querySelector('.drop-preview-wrapper');\r\n\t\t//inst.hiddenFieldImages = FieldHidden.init({ name: 'images'});\r\n\t\t//inst.el.appendChild(inst.hiddenFieldImages.el);\r\n\t\tinst.hiddenFieldDeletedImages = _fieldHidden__WEBPACK_IMPORTED_MODULE_2__[\"default\"].init({ name: 'deleted_images'});\r\n\t\tinst.el.appendChild(inst.hiddenFieldDeletedImages.el);\r\n\r\n\t\tinst.updateImages();\r\n\r\n\t\treturn inst;\r\n\t}\r\n}\r\n\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (UploadedImages);\n\n//# sourceURL=webpack:///./src/js/app/admin/parts/uploadedImages.js?");

/***/ }),

/***/ "./src/js/app/admin/plants/plantAdd.js":
/*!*********************************************!*\
  !*** ./src/js/app/admin/plants/plantAdd.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../component */ \"./src/js/app/component.js\");\n/* harmony import */ var _parts_fieldInput__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../parts/fieldInput */ \"./src/js/app/admin/parts/fieldInput.js\");\n/* harmony import */ var _parts_fieldDropdownSelect__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../parts/fieldDropdownSelect */ \"./src/js/app/admin/parts/fieldDropdownSelect.js\");\n/* harmony import */ var _parts_fieldMultiSelect__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../parts/fieldMultiSelect */ \"./src/js/app/admin/parts/fieldMultiSelect.js\");\n/* harmony import */ var _parts_fieldAddImages__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../parts/fieldAddImages */ \"./src/js/app/admin/parts/fieldAddImages.js\");\n/* harmony import */ var _parts_fieldTextarea__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../parts/fieldTextarea */ \"./src/js/app/admin/parts/fieldTextarea.js\");\n/* harmony import */ var _sidebar__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../sidebar */ \"./src/js/app/admin/sidebar.js\");\n/* harmony import */ var _actions_plants__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../actions/plants */ \"./src/js/app/actions/plants.js\");\n/* harmony import */ var _storage_plantTablesStore__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../storage/plantTablesStore */ \"./src/js/app/storage/plantTablesStore.js\");\n/* harmony import */ var _plantFields__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./plantFields */ \"./src/js/app/admin/plants/plantFields.js\");\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n//config\r\nvar { ADMIN_URL } = __webpack_require__(/*! ../../config */ \"./src/js/app/config.js\")['globals'];\r\n\r\nvar PlantAdd = {\r\n\tsubmitForm: function(e) {\r\n\t\t// e.preventDefault();\r\n\t\t// let formData = new FormData();\r\n\t\t// formData.append('mykey', 'myvalue');\r\n\r\n\r\n\t\t// prevent form from refreshing the page\r\n\t\te.preventDefault();\r\n\t\tlet formData = new FormData(e.target);\r\n\r\n\t\t// append new image data to formData\r\n\t\tthis.fieldAddImages.state.croppedOut.map((item, index) => {\r\n\t\t\tformData.append('image'+'_'+index+'_original', item.originalFile);\r\n\t\t\tformData.append('image'+'_'+index+'_cropped', item.croppedFile);\r\n\t\t\tformData.append('image'+'_'+index+'_info', [item.tag_id, item.description]);\r\n\t\t});\r\n\r\n\t\t// //delete any empty fields in formData\r\n\t\t// for (let pair of formData.entries()) {\r\n\t\t// \tif (pair[1] == \"\") {\r\n\t\t// \t\tformData.delete(pair[0]);\r\n\t\t// \t}\r\n\t\t// }\r\n\r\n\t\t//delete any empty fields in formData\r\n\t\tArray.from(formData).map((item) => {\r\n\t\t\tif (item[1] == '') {\r\n\t\t\t\tformData.delete(item[0]);\r\n\t\t\t}\r\n\t\t});\r\n\r\n\t\t// //use this to log out formdata values\r\n\t\t// console.log(Array.from(formData));\r\n\r\n\t\t// call action to submit edited\r\n\t\tObject(_actions_plants__WEBPACK_IMPORTED_MODULE_7__[\"addPlant\"])(formData, this.renderUpdated.bind(this));\r\n\t},\r\n\tclearMessages: function() {\r\n\t  this.submissionMessage.innerHTML = '';\r\n\t},\r\n\tonInputChange: function() {\r\n\t\tthis.clearMessages();\r\n\t},\r\n\trenderUpdated: function(treeUpdated) {\r\n\t\tthis.submissionMessage.innerHTML = '';\r\n\t\tthis.submissionMessage.innerHTML = `<span>Tree: ${treeUpdated.common_name}<br/>successfully added.</span>`;\r\n\t},\r\n\tinit: function() {\r\n\t\tvar proto = Object.assign({}, this, _component__WEBPACK_IMPORTED_MODULE_0__[\"default\"])\r\n\t\tvar inst = Object.create(proto);\r\n\t\t// assign the instance constructor to the prototype so 'this' refers to the instance\r\n\t\tproto.constructor = inst;\r\n\r\n\t\t//call initialize on Component first\r\n\t\tinst.initialize({ el: \r\n\t\t`<div class=\"admin-main\">\r\n              <div class=\"row\">\r\n                  <div class=\"main-window columns small-12 large-9\">\r\n                      <h3>Add Plant</h3>\r\n                      <form>\r\n\t                      <div id=\"form-fields\">\r\n\t                      </div>\r\n\t                      <button action=\"submit\" class=\"btn btn-primary\">Submit</button>\r\n                      </form>\r\n                      <div class=\"submission-message\">\r\n                      </div>\r\n                  </div>\r\n              </div>\r\n          </div>\r\n\t      `\r\n\t\t});\r\n\r\n\t\t//build\r\n\t\tinst.sidebar = _sidebar__WEBPACK_IMPORTED_MODULE_6__[\"default\"].init();\r\n\t\tconst mainWindow = inst.el.querySelector('.main-window');\r\n\t\tmainWindow.before(inst.sidebar.el);\r\n\t\tinst.formFields = inst.el.querySelector('#form-fields');\r\n\t\tinst.submissionMessage = inst.el.querySelector('.submission-message');\r\n\t\tinst.form = inst.el.querySelector('form');\r\n\t\tinst.form.addEventListener('submit', inst.submitForm.bind(inst));\r\n\r\n\t\t//get plant table data\r\n\t\tObject(_actions_plants__WEBPACK_IMPORTED_MODULE_7__[\"fetchPlantTables\"])((plantTables) => {\r\n\t\t\t//use plantTablesStore because some values exist there statically and not in the plantTables\r\n\t\t\t_storage_plantTablesStore__WEBPACK_IMPORTED_MODULE_8__[\"default\"].setData(plantTables);\r\n\r\n\t\t\t//create the fields\r\n\t\t\t_plantFields__WEBPACK_IMPORTED_MODULE_9__[\"default\"].map((item) => {\r\n\t\t\t\tif(item.type === 'input') {\r\n\t\t\t\t\tlet input = _parts_fieldInput__WEBPACK_IMPORTED_MODULE_1__[\"default\"].init({\r\n\t\t\t\t\t\tname: item.name,\r\n\t\t\t\t\t\tlabel: item.label,\r\n\t\t\t\t\t\terror: item.error,\r\n\t\t\t\t\t\tcondition: item.condition\r\n\t\t\t\t\t});\r\n\t\t\t\t\tinst.formFields.appendChild(input.el);\r\n\t\t\t\t}\r\n\t\t\t\tif(item.type === 'dropdownSelect') {\r\n\t\t\t\t\tlet dropdownSelect = _parts_fieldDropdownSelect__WEBPACK_IMPORTED_MODULE_2__[\"default\"].init({\r\n\t\t\t\t\t\tname: item.name,\r\n\t\t\t\t\t\tlabel: item.label,\r\n\t\t\t\t\t\terror: item.error,\r\n\t\t\t\t\t\tcondition: item.condition,\r\n\t\t\t\t\t\tselectItems: _storage_plantTablesStore__WEBPACK_IMPORTED_MODULE_8__[\"default\"].storageData[item.name]\r\n\t\t\t\t\t});\r\n\t\t\t\t\tinst.formFields.appendChild(dropdownSelect.el);\r\n\t\t\t\t}\r\n\t\t\t\tif(item.type === 'multiSelect') {\r\n\t\t\t\t\tlet multiSelect = _parts_fieldMultiSelect__WEBPACK_IMPORTED_MODULE_3__[\"default\"].init({\r\n\t\t\t\t\t\tname: item.name,\r\n\t\t\t\t\t\tlabel: item.label,\r\n\t\t\t\t\t\terror: item.error,\r\n\t\t\t\t\t\tcondition: item.condition,\r\n\t\t\t\t\t\tselectItems: _storage_plantTablesStore__WEBPACK_IMPORTED_MODULE_8__[\"default\"].storageData[item.name]\r\n\t\t\t\t\t});\r\n\t\t\t\t\tinst.formFields.appendChild(multiSelect.el);\r\n\t\t\t\t}\r\n\t\t\t\tif(item.type === 'textarea') {\r\n\t\t\t\t\tlet textarea = _parts_fieldTextarea__WEBPACK_IMPORTED_MODULE_5__[\"default\"].init({\r\n\t\t\t\t\t\tname: item.name,\r\n\t\t\t\t\t\tlabel: item.label,\r\n\t\t\t\t\t\terror: item.error,\r\n\t\t\t\t\t\tcondition: item.condition,\r\n\t\t\t\t\t});\r\n\t\t\t\t\tinst.formFields.appendChild(textarea.el);\r\n\t\t\t\t}\r\n\t\t\t});\r\n\r\n\t\t\t//init fieldAddImages\r\n\t\t\tinst.fieldAddImages = _parts_fieldAddImages__WEBPACK_IMPORTED_MODULE_4__[\"default\"].init({\r\n\t\t\t\ttags: _storage_plantTablesStore__WEBPACK_IMPORTED_MODULE_8__[\"default\"].storageData['tags']\r\n\t\t\t});\r\n\t\t\tinst.formFields.appendChild(inst.fieldAddImages.el);\r\n\t\t});\r\n\r\n\t\treturn inst;\r\n\t}\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (PlantAdd);\n\n//# sourceURL=webpack:///./src/js/app/admin/plants/plantAdd.js?");

/***/ }),

/***/ "./src/js/app/admin/plants/plantEdit.js":
/*!**********************************************!*\
  !*** ./src/js/app/admin/plants/plantEdit.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../component */ \"./src/js/app/component.js\");\n/* harmony import */ var _parts_fieldInput__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../parts/fieldInput */ \"./src/js/app/admin/parts/fieldInput.js\");\n/* harmony import */ var _parts_fieldDropdownSelect__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../parts/fieldDropdownSelect */ \"./src/js/app/admin/parts/fieldDropdownSelect.js\");\n/* harmony import */ var _parts_fieldMultiSelect__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../parts/fieldMultiSelect */ \"./src/js/app/admin/parts/fieldMultiSelect.js\");\n/* harmony import */ var _parts_uploadedImages__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../parts/uploadedImages */ \"./src/js/app/admin/parts/uploadedImages.js\");\n/* harmony import */ var _parts_fieldAddImages__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../parts/fieldAddImages */ \"./src/js/app/admin/parts/fieldAddImages.js\");\n/* harmony import */ var _parts_fieldTextarea__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../parts/fieldTextarea */ \"./src/js/app/admin/parts/fieldTextarea.js\");\n/* harmony import */ var _sidebar__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../sidebar */ \"./src/js/app/admin/sidebar.js\");\n/* harmony import */ var _actions_plants__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../actions/plants */ \"./src/js/app/actions/plants.js\");\n/* harmony import */ var _storage_plantTablesStore__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../storage/plantTablesStore */ \"./src/js/app/storage/plantTablesStore.js\");\n/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../lib/utils */ \"./src/js/app/lib/utils.js\");\n/* harmony import */ var _plantFields__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./plantFields */ \"./src/js/app/admin/plants/plantFields.js\");\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n//config\r\nvar { ADMIN_URL } = __webpack_require__(/*! ../../config */ \"./src/js/app/config.js\")['globals'];\r\n\r\nvar PlantEdit = {\r\n\tsubmitForm: function(e) {\r\n\t\t//prevent form from refreshing the page\r\n\t\te.preventDefault();\r\n\t\tlet formData = new FormData(e.target);\r\n\r\n\t\t// append new image data to formData\r\n\t\tthis.fieldAddImages.state.croppedOut.map((item, index) => {\r\n\t\t\tformData.append('image'+'_'+index+'_original', item.originalFile);\r\n\t\t\tformData.append('image'+'_'+index+'_cropped', item.croppedFile);\r\n\t\t\tformData.append('image'+'_'+index+'_info', [item.tag_id, item.description]);\r\n\t\t});\r\n\r\n\t\t//append the current plant id\r\n\t\tformData.append('tree_id', this.plantId);\r\n\r\n\t\t// //delete any empty fields in formData\r\n\t\t// for (let pair of formData.entries()) {\r\n\t\t// \tif (pair[1] == \"\") {\r\n\t\t// \t\tformData.delete(pair[0]);\r\n\t\t// \t}\r\n\t\t// }\r\n\r\n\t\t//delete any empty fields in formData\r\n\t\tArray.from(formData).map((item) => {\r\n\t\t\tif (item[1] == '') {\r\n\t\t\t\tformData.delete(item[0]);\r\n\t\t\t}\r\n\t\t});\r\n\r\n\t\t// call action to submit edited\r\n\t\tObject(_actions_plants__WEBPACK_IMPORTED_MODULE_8__[\"updatePlant\"])(formData, this.renderUpdated.bind(this));\r\n\r\n\t\t//clear deleted images\r\n\t\tthis.uploadedImages.reset();\r\n\t},\r\n\tclearMessages: function() {\r\n\t  this.submissionMessage.innerHTML = '';\r\n\t},\r\n\tonInputChange: function() {\r\n\t\tthis.clearMessages();\r\n\t},\r\n\trenderUpdated: function(treeUpdated) {\r\n\t\tthis.submissionMessage.innerHTML = '';\r\n\t\tthis.submissionMessage.innerHTML = `<span>Tree: ${treeUpdated.common_name}<br/>successfully updated.</span>`;\r\n\t},\r\n\tonLoad: function() {\r\n\t\t//first clear the form fields\r\n\t\tthis.formFields.innerHTML = '';\r\n\r\n\t\t//get the plant data\r\n\t\tconst plant = Object(_lib_utils__WEBPACK_IMPORTED_MODULE_10__[\"getUrlParams\"])('plant')[0];\r\n\t\tObject(_actions_plants__WEBPACK_IMPORTED_MODULE_8__[\"getPlant\"])(plant, (apiData) => {\r\n\t\t\t//record the current plant id\r\n\t\t\tthis.plantId = apiData.id\r\n\t\t\t//create the fields\r\n\t\t\t_plantFields__WEBPACK_IMPORTED_MODULE_11__[\"default\"].map((item) => {\r\n\t\t\t\tif(item.type === 'input') {\r\n\t\t\t\t\tlet input = _parts_fieldInput__WEBPACK_IMPORTED_MODULE_1__[\"default\"].init({\r\n\t\t\t\t\t\tname: item.name,\r\n\t\t\t\t\t\tlabel: item.label,\r\n\t\t\t\t\t\terror: item.error,\r\n\t\t\t\t\t\tcondition: item.condition,\r\n\t\t\t\t\t\tvalue: apiData[item.name]\r\n\t\t\t\t\t});\r\n\t\t\t\t\tthis.formFields.appendChild(input.el);\r\n\t\t\t\t}\r\n\t\t\t\tif(item.type === 'dropdownSelect') {\r\n\t\t\t\t\tlet dropdownSelect = _parts_fieldDropdownSelect__WEBPACK_IMPORTED_MODULE_2__[\"default\"].init({\r\n\t\t\t\t\t\tname: item.name,\r\n\t\t\t\t\t\tlabel: item.label,\r\n\t\t\t\t\t\terror: item.error,\r\n\t\t\t\t\t\tcondition: item.condition,\r\n\t\t\t\t\t\tvalue: apiData[item.name],\r\n\t\t\t\t\t\tselectItems: _storage_plantTablesStore__WEBPACK_IMPORTED_MODULE_9__[\"default\"].storageData[item.name]\r\n\t\t\t\t\t});\r\n\t\t\t\t\tthis.formFields.appendChild(dropdownSelect.el);\r\n\t\t\t\t}\r\n\t\t\t\tif(item.type === 'multiSelect') {\r\n\t\t\t\t\tlet multiSelect = _parts_fieldMultiSelect__WEBPACK_IMPORTED_MODULE_3__[\"default\"].init({\r\n\t\t\t\t\t\tname: item.name,\r\n\t\t\t\t\t\tlabel: item.label,\r\n\t\t\t\t\t\terror: item.error,\r\n\t\t\t\t\t\tcondition: item.condition,\r\n\t\t\t\t\t\tvalue: apiData[item.name],\r\n\t\t\t\t\t\tselectItems: _storage_plantTablesStore__WEBPACK_IMPORTED_MODULE_9__[\"default\"].storageData[item.name]\r\n\t\t\t\t\t});\r\n\t\t\t\t\tthis.formFields.appendChild(multiSelect.el);\r\n\t\t\t\t}\r\n\t\t\t\tif(item.type === 'textarea') {\r\n\t\t\t\t\tlet input = _parts_fieldTextarea__WEBPACK_IMPORTED_MODULE_6__[\"default\"].init({\r\n\t\t\t\t\t\tname: item.name,\r\n\t\t\t\t\t\tlabel: item.label,\r\n\t\t\t\t\t\terror: item.error,\r\n\t\t\t\t\t\tcondition: item.condition,\r\n\t\t\t\t\t\tvalue: apiData[item.name]\r\n\t\t\t\t\t});\r\n\t\t\t\t\tthis.formFields.appendChild(input.el);\r\n\t\t\t\t}\r\n\t\t\t});\r\n\r\n\t\t\t//init UploadedImages\r\n\t\t\tthis.uploadedImages = _parts_uploadedImages__WEBPACK_IMPORTED_MODULE_4__[\"default\"].init({\r\n\t\t\t\tonChange: this.onInputChange.bind(this),\r\n\t\t\t\timages: apiData.images,\r\n\t\t\t\trefType: 'trees'\r\n\t\t\t});\r\n\t\t\tthis.formFields.appendChild(this.uploadedImages.el);\r\n\r\n\t\t\t//init fieldAddImages\r\n\t\t\tthis.fieldAddImages = _parts_fieldAddImages__WEBPACK_IMPORTED_MODULE_5__[\"default\"].init({\r\n\t\t\t\ttags: _storage_plantTablesStore__WEBPACK_IMPORTED_MODULE_9__[\"default\"].storageData['tags']\r\n\t\t\t});\r\n\t\t\tthis.formFields.appendChild(this.fieldAddImages.el);\r\n\t\t});\r\n\t},\r\n\tinit: function() {\r\n\t\tvar proto = Object.assign({}, this, _component__WEBPACK_IMPORTED_MODULE_0__[\"default\"])\r\n\t\tvar inst = Object.create(proto);\r\n\t\t// assign the instance constructor to the prototype so 'this' refers to the instance\r\n\t\tproto.constructor = inst;\r\n\r\n\t\t//call initialize on Component first\r\n\t\tinst.initialize({ el: \r\n\t\t`<div class=\"admin-main\">\r\n              <div class=\"row\">\r\n                  <div class=\"main-window columns small-12 large-9\">\r\n                      <h3>Edit Plant</h3>\r\n                      <form>\r\n\t                      <div id=\"form-fields\">\r\n\t                      </div>\r\n\t                      <button action=\"submit\" class=\"btn btn-primary\">Submit</button>\r\n                      </form>\r\n                      <div class=\"submission-message\">\r\n                      </div>\r\n                  </div>\r\n              </div>\r\n          </div>\r\n\t      `\r\n\t\t});\r\n\r\n\t\t//build\r\n\t\tinst.sidebar = _sidebar__WEBPACK_IMPORTED_MODULE_7__[\"default\"].init();\r\n\t\tconst mainWindow = inst.el.querySelector('.main-window');\r\n\t\tmainWindow.before(inst.sidebar.el);\r\n\t\tinst.formFields = inst.el.querySelector('#form-fields');\r\n\t\tinst.submissionMessage = inst.el.querySelector('.submission-message');\r\n\t\tinst.form = inst.el.querySelector('form');\r\n\t\tinst.form.addEventListener('submit', inst.submitForm.bind(inst));\r\n\r\n\t\t//get plant table data\r\n\t\tObject(_actions_plants__WEBPACK_IMPORTED_MODULE_8__[\"fetchPlantTables\"])((apiData) => {\r\n\t\t\t_storage_plantTablesStore__WEBPACK_IMPORTED_MODULE_9__[\"default\"].setData(apiData);\r\n\t\t});\r\n\r\n\t\treturn inst;\r\n\t}\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (PlantEdit);\n\n//# sourceURL=webpack:///./src/js/app/admin/plants/plantEdit.js?");

/***/ }),

/***/ "./src/js/app/admin/plants/plantFields.js":
/*!************************************************!*\
  !*** ./src/js/app/admin/plants/plantFields.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst plantFields = [\r\n\t{name: 'tree_id', type: 'hiddenField', error: null, condition: null},\r\n\t{name: 'common_name', label: 'common name', type: 'input', error: 'Please enter a common name', condition: 'required'},\r\n\t{name: 'other_common_names', label: 'other common names', type: 'input', error: null, condition: null},\r\n\t{name: 'slug', label: 'slug', type: 'input', error: 'Please enter a slug', condition: 'required'},\r\n\t{name: 'genus_id', label: 'genus', type: 'dropdownSelect', error: null, condition: null},\r\n\t{name: 'specific_epithet', label: 'specific epithet', type: 'input', error: null, condition: null},\r\n\t{name: 'other_species', label: 'other species', type: 'input', error: null, condition: null},\r\n\t{name: 'subspecies', label: 'subspecies', type: 'input', error: null, condition: null},\r\n\t{name: 'variety', label: 'variety', type: 'input', error: null, condition: null},\r\n\t{name: 'cultivar', label: 'cultivar', type: 'input', error: null, condition: null},\r\n\t{name: 'trees_category_id', label: 'category', type: 'dropdownSelect', error: null, condition: null},\r\n\t{name: 'zone_id', label: 'zone', type: 'dropdownSelect', error: null, condition: null},\r\n\t{name: 'origins', label: 'ecoregions', type: 'multiSelect', error: null, condition: null},\r\n\t{name: 'eco_benefits', label: 'eco benefits', type: 'multiSelect', error: null, condition: null},\r\n\t{name: 'native_to', label: 'native to', type: 'multiSelect', error: null, condition: null},\r\n\t{name: 'natural_habitat', label: 'natural habitat', type: 'multiSelect', error: null, condition: null},\r\n\t{name: 'shapes', label: 'shapes', type: 'multiSelect', error: null, condition: null},\r\n\t{name: 'light', label: 'light', type: 'multiSelect', error: null, condition: null},\r\n\t{name: 'height_min', label: 'height min', type: 'input', error: null, condition: null},\r\n\t{name: 'height_max', label: 'height max', type: 'input', error: null, condition: null},\r\n\t{name: 'width_min', label: 'width min', type: 'input', error: null, condition: null},\r\n\t{name: 'width_max', label: 'width max', type: 'input', error: null, condition: null},\r\n\t{name: 'growth_rate', label: 'growth rate', type: 'dropdownSelect', selectItems: [\r\n            {id: \"slow\", slug: \"slow\", name: \"slow\"},\r\n            {id: \"medium\", slug: \"medium\", name: \"medium\"},\r\n            {id: \"fast\", slug: \"fast\", name: \"fast\"},\r\n          ], error: null, condition: null},\r\n    {name: 'lifespan_min', label: 'lifespan min', type: 'input', error: null, condition: null},\r\n    {name: 'lifespan_max', label: 'lifespan max', type: 'input', error: null, condition: null},\r\n    {name: 'soil', label: 'soil', type: 'multiSelect', error: null, condition: null},\r\n    {name: 'common_uses', label: 'common uses', type: 'multiSelect', error: null, condition: null},\r\n    {name: 'transplanting', label: 'transplanting', type: 'multiSelect', error: null, condition: null},\r\n    {name: 'unique_attractions', label: 'unique attractions', type: 'multiSelect', error: null, condition: null},\r\n    {name: 'tolerances', label: 'tolerances', type: 'multiSelect', error: null, condition: null},\r\n    {name: 'reproduction_type_id', label: 'reproduction types', type: 'dropdownSelect', error: null, condition: null},\r\n    {name: 'insects', label: 'insects', type: 'multiSelect', error: null, condition: null},\r\n    {name: 'diseases', label: 'diseases', type: 'multiSelect', error: null, condition: null},\r\n    {name: 'body', label: 'body', type: 'textarea', error: null, condition: null}\r\n];\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (plantFields);\n\n//# sourceURL=webpack:///./src/js/app/admin/plants/plantFields.js?");

/***/ }),

/***/ "./src/js/app/admin/plants/plantsList.js":
/*!***********************************************!*\
  !*** ./src/js/app/admin/plants/plantsList.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../component */ \"./src/js/app/component.js\");\n/* harmony import */ var _actions_plants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../actions/plants */ \"./src/js/app/actions/plants.js\");\n/* harmony import */ var _sidebar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../sidebar */ \"./src/js/app/admin/sidebar.js\");\n/* harmony import */ var _parts_searchTrees__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../parts/searchTrees */ \"./src/js/app/parts/searchTrees.js\");\n/* harmony import */ var _parts_paginationPlants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../parts/paginationPlants */ \"./src/js/app/parts/paginationPlants.js\");\n/* harmony import */ var _storage_plantListStore__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../storage/plantListStore */ \"./src/js/app/storage/plantListStore.js\");\n/* harmony import */ var _storage_treesFilterStore__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../storage/treesFilterStore */ \"./src/js/app/storage/treesFilterStore.js\");\n/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../config.js */ \"./src/js/app/config.js\");\n/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_config_js__WEBPACK_IMPORTED_MODULE_7__);\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\nvar PlantsList = {\r\n\tbuild: function() {\r\n\t\tconst mainWindow = this.el.querySelector('.main-window');\r\n\t\tmainWindow.before(this.sidebar.el);\r\n\t\tthis.itemList = this.el.querySelector('.item-list');\r\n\t\tthis.itemList.before(this.searchTrees.el);\r\n\t\tmainWindow.appendChild(this.paginationTrees.el);\r\n\t},\r\n\tonDeleteTreeClick: function(e) {\r\n\t\te.preventDefault();\r\n\t\tlet slug = e.target.getAttribute(\"data-slug\");\r\n\t\tlet id = e.target.getAttribute(\"data-id\");\r\n\t\tObject(_actions_plants__WEBPACK_IMPORTED_MODULE_1__[\"deletePlant\"])({'tree': { id: parseInt(id), slug: slug}}, (apiData) => {\r\n\t\t\t//perform the tree search again\r\n\t\t\tObject(_actions_plants__WEBPACK_IMPORTED_MODULE_1__[\"searchTrees\"])(_storage_treesFilterStore__WEBPACK_IMPORTED_MODULE_6__[\"default\"].storageData, (apiData) => {\r\n\t\t\t\t_storage_plantListStore__WEBPACK_IMPORTED_MODULE_5__[\"default\"].setData(apiData);\r\n\t\t\t});\r\n\t\t});\r\n\t},\r\n\trenderList: function() {\r\n\t\tthis.itemList.innerHTML = '';\r\n\r\n\t\t_storage_plantListStore__WEBPACK_IMPORTED_MODULE_5__[\"default\"].storageData.trees.map((tree) => {\r\n\t\t\tlet el = this.createEl(\r\n\t\t\t   `<li className=\"list-group-item\">\r\n\t\t\t        <span>${tree.common_name}</span>\r\n\t\t\t        <a id=\"delete\" href=\"\" data-id=${tree.id} data-slug=${tree.slug}>Delete</a>\r\n\t\t\t        <a href=\"/${_config_js__WEBPACK_IMPORTED_MODULE_7__[\"globals\"].ADMIN_URL}#plant-edit?plant=${tree.slug}\">edit</Link>\r\n\t\t\t    </li>`);\r\n\r\n\t\t\t\tel.querySelector('#delete').addEventListener('click', this.onDeleteTreeClick.bind(this), false);\r\n\r\n\t\t\t    this.itemList.appendChild(el);\r\n\t\t});\r\n\t},\r\n\tinit: function() {\r\n\t\tvar proto = Object.assign({}, this, _component__WEBPACK_IMPORTED_MODULE_0__[\"default\"])\r\n\t\tvar inst = Object.create(proto);\r\n\t\t// assign the instance constructor to the prototype so 'this' refers to the instance\r\n\t\tproto.constructor = inst;\r\n\r\n\t\t//call initialize on Component first\r\n\t\tinst.initialize({\r\n\t\t\tel: \r\n\t\t\t`<div class=\"admin-main\">\r\n                <div class=\"row\">\r\n                    <div class=\"main-window columns small-12 large-9\">\r\n                        <h3>Trees</h3>\r\n                        <ul class=\"list-group item-list\">\r\n                        </ul>\r\n                    </div>\r\n                </div>\r\n            </div>`\r\n\t\t});\r\n\r\n\t\tinst.sidebar = _sidebar__WEBPACK_IMPORTED_MODULE_2__[\"default\"].init();\r\n\t\tinst.searchTrees = _parts_searchTrees__WEBPACK_IMPORTED_MODULE_3__[\"default\"].init({});\r\n\t\tinst.paginationTrees = _parts_paginationPlants__WEBPACK_IMPORTED_MODULE_4__[\"default\"].init();\r\n\r\n\t\tinst.build();\r\n\r\n\t\t//listen for updated plantlistStore\r\n\t\t_storage_plantListStore__WEBPACK_IMPORTED_MODULE_5__[\"default\"].addListener(inst.renderList.bind(inst));\r\n\r\n\t\treturn inst;\r\n\t}\r\n} \r\n\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (PlantsList);\n\n//# sourceURL=webpack:///./src/js/app/admin/plants/plantsList.js?");

/***/ }),

/***/ "./src/js/app/admin/sidebar.js":
/*!*************************************!*\
  !*** ./src/js/app/admin/sidebar.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../component */ \"./src/js/app/component.js\");\n/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../config.js */ \"./src/js/app/config.js\");\n/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_config_js__WEBPACK_IMPORTED_MODULE_1__);\n\r\n\r\n\r\nvar Sidebar = {\r\n\tlinkList: [\r\n\t\t{ title: 'Website', link: '/', active: false },\r\n\t\t{ title: 'Logout', link: '/'+_config_js__WEBPACK_IMPORTED_MODULE_1__[\"globals\"].ADMIN_URL+'#signed-out', active: false },\r\n\t\t{ title: 'Dashboard', link: '/'+_config_js__WEBPACK_IMPORTED_MODULE_1__[\"globals\"].ADMIN_URL+'', active: false },\r\n\t\t{ title: 'View Articles', link: '/'+_config_js__WEBPACK_IMPORTED_MODULE_1__[\"globals\"].ADMIN_URL+'#articles-list', active: false },\r\n\t\t{ title: 'Add Articles', link: '/'+_config_js__WEBPACK_IMPORTED_MODULE_1__[\"globals\"].ADMIN_URL+'#article-add', active: false },\r\n\t\t{ title: 'View Plants', link: '/'+_config_js__WEBPACK_IMPORTED_MODULE_1__[\"globals\"].ADMIN_URL+'#plants-list', active: false },\r\n\t\t{ title: 'Add Plants', link: '/'+_config_js__WEBPACK_IMPORTED_MODULE_1__[\"globals\"].ADMIN_URL+'#plant-add', active: false },\r\n\t\t{ title: 'View Users', link: '/'+_config_js__WEBPACK_IMPORTED_MODULE_1__[\"globals\"].ADMIN_URL+'#users-list', active: false },\r\n\t\t{ title: 'Add User', link: '/'+_config_js__WEBPACK_IMPORTED_MODULE_1__[\"globals\"].ADMIN_URL+'#signup', active: false },\r\n\t\t{ title: 'View Categories', link: '/'+_config_js__WEBPACK_IMPORTED_MODULE_1__[\"globals\"].ADMIN_URL+'#category-list', active: false },\r\n\t\t{ title: 'Add Category', link: '/'+_config_js__WEBPACK_IMPORTED_MODULE_1__[\"globals\"].ADMIN_URL+'#category-add', active: false },\r\n\t\t{ title: 'Backup', link: '/'+_config_js__WEBPACK_IMPORTED_MODULE_1__[\"globals\"].ADMIN_URL+'#backup', active: false },\r\n\t],\r\n\tbuild: function() {\r\n\t\tlet sidebar = this.el.querySelector('.admin-side-menu');\r\n\t\tthis.linkList.map((item) => {\r\n\t\t\tlet link = this.createEl(`<li class=${item.active ? 'active' : ''}>\r\n\t\t\t    <a class=\"nav-link\" href=${item.link}>${item.title}</a>\r\n\t\t\t</li>`);\r\n\t\t\tlink.addEventListener('click', (e) => {\r\n\t\t\t}, false);\r\n\t\t\tsidebar.appendChild(link);\r\n\t\t});\r\n\t},\r\n\tinit: function() {\r\n\t\tvar proto = Object.assign({}, this, _component__WEBPACK_IMPORTED_MODULE_0__[\"default\"])\r\n\t\tvar inst = Object.create(proto);\r\n\t\t// assign the instance constructor to the prototype so 'this' refers to the instance\r\n\t\tproto.constructor = inst;\r\n\r\n\t\t//call initialize on Component first\r\n\t\tinst.initialize({\r\n\t\t\tel:\r\n\t\t\t`<div class=\"columns small-12 large-3 admin-sidebar\">\r\n                <ul class=\"vertical menu admin-side-menu\">\r\n                </ul>\r\n             </div>`\r\n\t\t});\r\n\r\n\t\tinst.build();\r\n\r\n\t\treturn inst;\r\n\t}\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (Sidebar);\n\n//# sourceURL=webpack:///./src/js/app/admin/sidebar.js?");

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

/***/ "./src/js/app/config.js":
/*!******************************!*\
  !*** ./src/js/app/config.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = {\r\n   \"development\": {\r\n      SERVER_URL: \"/api\",\r\n      ROOT_URL: \"/\",\r\n      ARTICLES_UPLOADS_PATH: '/uploads/articles/',\r\n      PLANTS_UPLOADS_PATH: '/uploads/trees/',\r\n   },\r\n   \"production\": {\r\n      SERVER_URL: \"/api\",\r\n      ROOT_URL: \"/\",\r\n      ARTICLES_UPLOADS_PATH: '/uploads/articles/',\r\n      PLANTS_UPLOADS_PATH: '/uploads/trees/',\r\n   },\r\n   \"globals\": {\r\n      HIDE_MENU_THRESHOLD: 1150,\r\n      POST_CONFIG: {\r\n           headers: {\r\n             'CONTENT_TYPE': 'application/json',\r\n           }\r\n         },\r\n      ADMIN_ENTRIES_PER_PAGE: 25,\r\n      ADMIN_URL: 'admin_752'\r\n    }\r\n}\n\n//# sourceURL=webpack:///./src/js/app/config.js?");

/***/ }),

/***/ "./src/js/app/lib/stringUtils.js":
/*!***************************************!*\
  !*** ./src/js/app/lib/stringUtils.js ***!
  \***************************************/
/*! exports provided: imgName, formatSearchString, copyStringToClipboard, sanitizeInputString */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"imgName\", function() { return imgName; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"formatSearchString\", function() { return formatSearchString; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"copyStringToClipboard\", function() { return copyStringToClipboard; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"sanitizeInputString\", function() { return sanitizeInputString; });\n/* harmony import */ var html_escape__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! html-escape */ \"./node_modules/html-escape/index.js\");\n/* harmony import */ var html_escape__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(html_escape__WEBPACK_IMPORTED_MODULE_0__);\n\r\n\r\n//for saving and resizing images\r\nfunction imgName(imgName, size) {\r\n    switch(size) {\r\n        case 'medium' :\r\n            return imgName ? imgName.replace(/(\\.[\\w\\d_-]+)$/i, '-med$1') : '';\r\n        case 'small' :\r\n            return imgName ? imgName.replace(/(\\.[\\w\\d_-]+)$/i, '-sml$1') : '';\r\n        default :\r\n            ''\r\n    }\r\n}\r\n\r\nfunction formatSearchString(searchTxt) {\r\n    if(searchTxt) {\r\n        let outText = '';\r\n\r\n        // //remove ._:;, make lowercase\r\n        // let formatted = searchTxt.replace(/([\\.\\_\\'\\:\\;])+/gi, ' ').toLowerCase();\r\n\r\n        // let sanitized = escapeHtml(formatted);\r\n\r\n        let sanitized = sanitizeInputString(searchTxt);\r\n\r\n        //split separate words into array (filter out all blank strings)\r\n        outText = sanitized.split(' ').filter(function(i){return i});\r\n\r\n        //converti it back into a comma string\r\n        outText = outText.toString();\r\n\r\n        return outText;\r\n    } else {\r\n        return [];\r\n    }\r\n}\r\n\r\nfunction copyStringToClipboard (str, isPaste) {\r\n   // Create new element\r\n   var el = document.createElement('textarea');\r\n   // Set value (string to be copied)\r\n   el.value = str;\r\n   // Set non-editable to avoid focus and move outside of view\r\n   el.setAttribute('readonly', '');\r\n   el.style = {position: 'absolute', left: '-9999px'};\r\n   document.body.appendChild(el);\r\n   // Select text inside element\r\n   el.select();\r\n   // Copy text to clipboard\r\n   document.execCommand('copy');\r\n\r\n   if(isPaste) {\r\n    document.execCommand('paste');\r\n   }\r\n   \r\n   // Remove temporary element\r\n   document.body.removeChild(el);\r\n}\r\n\r\nfunction sanitizeInputString(str) {\r\n    //remove ._:;, make lowercase\r\n    let formatted = str.replace(/([\\.\\_\\'\\:\\;])+/gi, ' ').toLowerCase();\r\n    let sanitized = html_escape__WEBPACK_IMPORTED_MODULE_0___default()(formatted);\r\n\r\n    return sanitized;\r\n}\n\n//# sourceURL=webpack:///./src/js/app/lib/stringUtils.js?");

/***/ }),

/***/ "./src/js/app/lib/utils.js":
/*!*********************************!*\
  !*** ./src/js/app/lib/utils.js ***!
  \*********************************/
/*! exports provided: hasClass, addClass, removeClass, toggle, toggleClass, refsToArray, CustomEvent, contains, flattenObjArray, flattenActiveObjArray, round, setUrlParams, getUrlParams, clone */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"hasClass\", function() { return hasClass; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"addClass\", function() { return addClass; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"removeClass\", function() { return removeClass; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"toggle\", function() { return toggle; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"toggleClass\", function() { return toggleClass; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"refsToArray\", function() { return refsToArray; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"CustomEvent\", function() { return CustomEvent; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"contains\", function() { return contains; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"flattenObjArray\", function() { return flattenObjArray; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"flattenActiveObjArray\", function() { return flattenActiveObjArray; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"round\", function() { return round; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"setUrlParams\", function() { return setUrlParams; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getUrlParams\", function() { return getUrlParams; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"clone\", function() { return clone; });\n/* harmony import */ var lodash_clone__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/clone */ \"./node_modules/lodash/clone.js\");\n/* harmony import */ var lodash_clone__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_clone__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _stringUtils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./stringUtils */ \"./src/js/app/lib/stringUtils.js\");\n\r\n\r\n\r\n//toggle class (useful for css animations)\r\n//---------------------------\r\n\r\n//functions to use\r\nfunction hasClass(el, className) {\r\n\tif(el && className) {\r\n\t\treturn el.classList ? el.classList.contains(className) : new RegExp('\\\\b'+ className+'\\\\b').test(el.className);\r\n\t}\r\n}\r\nfunction addClass(el, className) {\r\n\tif(el && className) {\r\n\t\tif (el.classList) el.classList.add(className);\r\n\t\telse if (!hasClass(el, className)) el.className += ' ' + className;\r\n\t}\r\n}\r\nfunction removeClass(el, className) {\r\n\tif(el && className) {\r\n\t\tif (el.classList) el.classList.remove(className);\r\n\t\telse el.className = el.className.replace(new RegExp('\\\\b'+ className+'\\\\b', 'g'), '');\r\n\t}\r\n}\r\nfunction toggle(el) {\r\n    hasClass(el, 'is_hidden') ? removeClass(el, 'is_hidden') : addClass(el, 'is_hidden');\r\n}\r\nfunction toggleClass(el, className) {\r\n    hasClass(el, className) ? removeClass(el, className) : addClass(el, className);\r\n}\r\n\r\n//usecase:\r\n// var el = document.querySelector('div');\r\n// if (!hasClass(el, 'foo')) addClass(el, 'foo');\r\n\r\nfunction refsToArray(ctx, prefix){\r\n\tvar results = [];\r\n\tfor (var i=0;;i++){\r\n\t  var name = prefix + '-' + String(i);\r\n\t  var ref = ctx.refs[name];\r\n\t  //create an array of ref object (set loaded to false at first)\r\n\t  if (ref) results.push(ref);\r\n\t  else return results;\r\n\t}\r\n}\r\n\r\n//IE9/10 polyfill custom event\r\n//use like this:\r\n// let LoadSceneEvent = CustomEvent(\"sceneLoaded\", { bubbles: false, cancelable: false, detail: 'my event detail' });\r\nfunction CustomEvent ( event, params ) {\r\n\tparams = params || { bubbles: false, cancelable: false, detail: undefined };\r\n\tvar evt = document.createEvent( 'CustomEvent' );\r\n\tevt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );\r\n\treturn evt;\r\n}\r\nCustomEvent.prototype = window.Event.prototype;\r\n\r\n// check if array contians a certain value\r\n// usage:\r\n// contains.call(myArray, lookupValue) //true\r\nfunction contains(needle) {\r\n  // Per spec, the way to identify NaN is that it is not equal to itself\r\n  var findNaN = needle !== needle;\r\n  var indexOf;\r\n\r\n  if(!findNaN && typeof Array.prototype.indexOf === 'function') {\r\n      indexOf = Array.prototype.indexOf;\r\n  } else {\r\n      indexOf = function(needle) {\r\n          var i = -1, index = -1;\r\n          for(i = 0; i < this.length; i++) {\r\n              var item = this[i];\r\n\r\n              if((findNaN && item !== item) || item === needle) {\r\n                  index = i;\r\n                  break;\r\n              }\r\n          }\r\n          return index;\r\n      };\r\n  }\r\n  return indexOf.call(this, needle) > -1;\r\n};\r\n\r\nfunction flattenObjArray(inArray, key) {\r\n//return an array of values given a key in an array of objects\r\n    if(inArray) {\r\n      //convert to regular array of strings\r\n      let outArray = inArray.map((item) => {\r\n          return item[key];\r\n      });\r\n      //convert to comma string\r\n      return outArray;\r\n    } else {\r\n      //console.log('flattenObjArray needs an array as input')\r\n      return null\r\n    }\r\n}\r\n\r\nfunction flattenActiveObjArray(inArrayObj, key) {\r\n  //return an array of values given a key in an array of objects (if 'active')\r\n  //used for button controls\r\n  let newArray = inArrayObj.filter((item) => {\r\n    if(item.active == true) {\r\n      return true;\r\n    } else {\r\n      return false;\r\n    }\r\n  }).map((item) => {\r\n    return item[key]\r\n  });\r\n\r\n  return newArray;\r\n}\r\n\r\nfunction round(x, n) {\r\n  const tenN = Math.pow(10, n);\r\n  return Math.round(x * tenN) / tenN;\r\n}\r\n\r\nfunction setUrlParams(key, val) {\r\n  if (!Array.isArray(val)) {\r\n    //if not an array, convert to it\r\n    //make it a string in an array\r\n    let str = String(val);\r\n    val = [];\r\n    val.push(str);\r\n  }\r\n  val = val.join('+');\r\n  let hash = window.location.hash;\r\n  // replace valu on the part of the hash that has the current key\r\n  if(hash) {\r\n    hash = hash.replace('#', '')\r\n    // get the query parts\r\n    let parts = (/\\?/.test(hash) ? hash.split('?') : [hash])\r\n    \r\n    let finalParts = [];\r\n    let containsKey = parts.length;\r\n    for(var i = 0; i < parts.length; i++) {\r\n      // get the part that has the key\r\n      var regexp = new RegExp('^' + key);\r\n      if (regexp.test(parts[i])) {\r\n        let params = parts[i].split('=');\r\n        if (params[0]) {\r\n          finalParts[i] = key + '=' + val;\r\n        }\r\n      } else {\r\n        finalParts[i] = parts[i];\r\n        containsKey--;\r\n      }\r\n    }\r\n\r\n    // if key doesn't exist, just add it in with it's new values\r\n    if (!containsKey) {\r\n      finalParts = lodash_clone__WEBPACK_IMPORTED_MODULE_0___default()(parts);\r\n      finalParts.push(key + '=' + val)\r\n    }\r\n    \r\n    window.location.hash = finalParts.join('?');\r\n  } else {\r\n    // if no hash just put this key value on\r\n    window.location.hash = key + '=' + val;;\r\n  }\r\n}\r\n\r\nfunction getUrlParams(key) {\r\n    //set the category if there's a query string\r\n    // let categories = (/^[?#]/.test(window.location.hash) ? window.location.hash.slice(1) : query)\r\n    // categories = categories.split('&')\r\n    // .reduce((params, param) => {\r\n     //      let [key, value] = param.split('=');\r\n     //      params[key] = value ? decodeURIComponent(value.replace(/\\+/g, ' ')) : '';\r\n     //      return params;\r\n    // });\r\n  let hash = window.location.hash;\r\n  if(hash) {\r\n    hash = hash.replace('#', '')\r\n\r\n    // get the query parts\r\n    let parts = (/\\?/.test(hash) ? hash.split('?') : [hash]);\r\n    \r\n    for(var i = 0; i < parts.length; i++) {\r\n      // get the part that has the key\r\n      var regexp = new RegExp('^' + key + '=');\r\n      // get the indavidual parameters\r\n      if (regexp.test(parts[i])) {\r\n        let params = parts[i].split('=');\r\n\r\n        if (params && (!params[1])) {\r\n          //if a parameter but no value\r\n          return null;\r\n        }\r\n\r\n        if (params && params[1]) {\r\n\r\n          //if value(s) \r\n          // sanitize\r\n          params[0] = Object(_stringUtils__WEBPACK_IMPORTED_MODULE_1__[\"sanitizeInputString\"])(params[0]);\r\n          params[1] = Object(_stringUtils__WEBPACK_IMPORTED_MODULE_1__[\"sanitizeInputString\"])(params[1]);\r\n\r\n          //(split by +) returns them in the form of an array\r\n          params = params[1].split('+');\r\n          return params;\r\n        }\r\n      }\r\n    }\r\n  }\r\n  //no parameter not found\r\n  return false;\r\n}\r\n\r\nfunction clone(objectToClone) {\r\n  let clonedObject = JSON.stringify(objectToClone);\r\n  try {\r\n    return JSON.parse(clonedObject);\r\n  }\r\n  catch(e) {\r\n    return false;\r\n  }\r\n}\n\n//# sourceURL=webpack:///./src/js/app/lib/utils.js?");

/***/ }),

/***/ "./src/js/app/parts/paginationPlants.js":
/*!**********************************************!*\
  !*** ./src/js/app/parts/paginationPlants.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../component */ \"./src/js/app/component.js\");\n/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../config */ \"./src/js/app/config.js\");\n/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_config__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _storage_treesFilterStore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../storage/treesFilterStore */ \"./src/js/app/storage/treesFilterStore.js\");\n/* harmony import */ var _storage_plantListStore__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../storage/plantListStore */ \"./src/js/app/storage/plantListStore.js\");\n/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../lib/utils */ \"./src/js/app/lib/utils.js\");\n/* harmony import */ var _actions_plants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../actions/plants */ \"./src/js/app/actions/plants.js\");\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\nvar MyComp = {\r\n\tupdateOffset: function(newOffset) {\r\n\t\t_storage_treesFilterStore__WEBPACK_IMPORTED_MODULE_2__[\"default\"].setData({ offset: newOffset });\r\n\t\tObject(_lib_utils__WEBPACK_IMPORTED_MODULE_4__[\"setUrlParams\"])('offset', newOffset);\r\n\t\tthis.update();\r\n\t},\r\n\tback: function() {\r\n\t\tif(_storage_treesFilterStore__WEBPACK_IMPORTED_MODULE_2__[\"default\"].storageData.offset === 0 ) { \r\n\t\t\treturn; \r\n\t\t}\r\n\t\tlet newOffset = _storage_treesFilterStore__WEBPACK_IMPORTED_MODULE_2__[\"default\"].storageData.offset - _config__WEBPACK_IMPORTED_MODULE_1__[\"globals\"].ADMIN_ENTRIES_PER_PAGE;\r\n\t\tthis.updateOffset(newOffset);\r\n\t},\r\n\tadvance: function() {\r\n\r\n\t\tif ((_storage_treesFilterStore__WEBPACK_IMPORTED_MODULE_2__[\"default\"].storageData.offset + _config__WEBPACK_IMPORTED_MODULE_1__[\"globals\"].ADMIN_ENTRIES_PER_PAGE) >= _storage_plantListStore__WEBPACK_IMPORTED_MODULE_3__[\"default\"].storageData.count) { \r\n\t\t\treturn; \r\n\t\t}\r\n\t\tlet newOffset = _storage_treesFilterStore__WEBPACK_IMPORTED_MODULE_2__[\"default\"].storageData.offset + _config__WEBPACK_IMPORTED_MODULE_1__[\"globals\"].ADMIN_ENTRIES_PER_PAGE;\r\n\t\tthis.updateOffset(newOffset);\r\n\t},\r\n\tupdate: function() {\r\n\t\t//search trees\r\n\t\tObject(_actions_plants__WEBPACK_IMPORTED_MODULE_5__[\"searchTrees\"])(_storage_treesFilterStore__WEBPACK_IMPORTED_MODULE_2__[\"default\"].storageData, (apiData) => {\r\n\t\t\t_storage_plantListStore__WEBPACK_IMPORTED_MODULE_3__[\"default\"].setData(apiData);\r\n\r\n\t\t\t//prev\r\n\t\t\tif(_storage_treesFilterStore__WEBPACK_IMPORTED_MODULE_2__[\"default\"].storageData.offset === 0) {\r\n\t\t\t\tObject(_lib_utils__WEBPACK_IMPORTED_MODULE_4__[\"toggleClass\"])(this.prev, 'disabled');\r\n\t\t\t}\r\n\t\t\t//next\r\n\t\t\tconst end = ((_storage_treesFilterStore__WEBPACK_IMPORTED_MODULE_2__[\"default\"].storageData.offset + _config__WEBPACK_IMPORTED_MODULE_1__[\"globals\"].ADMIN_ENTRIES_PER_PAGE) >= _storage_plantListStore__WEBPACK_IMPORTED_MODULE_3__[\"default\"].storageData.count) ? true : false;\r\n\t\t\tif(end) {\r\n\t\t\t\tObject(_lib_utils__WEBPACK_IMPORTED_MODULE_4__[\"toggleClass\"])(this.next, 'disabled');\r\n\t\t\t}\r\n\t\t\t//page\r\n\t\t\tthis.page.innerHTML = _storage_treesFilterStore__WEBPACK_IMPORTED_MODULE_2__[\"default\"].storageData.offset / _config__WEBPACK_IMPORTED_MODULE_1__[\"globals\"].ADMIN_ENTRIES_PER_PAGE + 1;\r\n\t\t\t//count\r\n\t\t\tthis.count.innerHTML = _storage_plantListStore__WEBPACK_IMPORTED_MODULE_3__[\"default\"].storageData.count;\r\n\t\t});\r\n\t},\r\n\tinit: function() {\r\n\t\tvar proto = Object.assign({}, this, _component__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\r\n\t\tvar inst = Object.create(proto);\r\n\t\t// assign the instance constructor to the prototype so 'this' refers to the instance\r\n\t\tproto.constructor = inst;\r\n\r\n\r\n\t\t//call initialize on Component first\r\n\t\tinst.initialize({\r\n\t\t\tel: \r\n\t\t\t `<div class=\"paginate-wrapper\">\r\n\t\t\t   <div class=\"paginate\" role=\"navigation\" aria-label=\"Pagination\">\r\n\t\t\t      <div class=\"paginate-previous\">\r\n\t\t\t         <a aria-label=\"Previous page\">\r\n\t\t\t         Previous\r\n\t\t\t         </a>\r\n\t\t\t      </div>\r\n\t\t\t      <div>Page <span id=\"page\"></span></div>\r\n\t\t\t      <div class=\"paginate-next\">\r\n\t\t\t         <a aria-label=\"Next page\">\r\n\t\t\t         Next\r\n\t\t\t         </a>\r\n\t\t\t      </div>\r\n\t\t\t   </div>\r\n\t\t\t   <div class=\"records-count\">(<span id=\"count\"></span> records total)</div>\r\n\t\t\t</div>`\r\n\t\t});\r\n\r\n\t\tinst.prev = inst.el.querySelector('.paginate-previous');\r\n\t\tinst.prev.firstElementChild.addEventListener('click', inst.back.bind(inst), false);\r\n\r\n\t\tinst.next = inst.el.querySelector('.paginate-next')\r\n\t\tinst.next.firstElementChild.addEventListener('click', inst.advance.bind(inst), false);\r\n\t\tinst.page = inst.el.querySelector('#page');\r\n\t\tinst.count = inst.el.querySelector('#count');\r\n\r\n\t\t// get offset from url\r\n\t\tconst offset = Object(_lib_utils__WEBPACK_IMPORTED_MODULE_4__[\"getUrlParams\"])('offset');\r\n\t\tif (offset) {\r\n\t\t  inst.updateOffset(offset);\r\n\t\t} else {\r\n\t\t\tinst.update();\r\n\t\t}\r\n\r\n\t\treturn inst;\r\n\t}\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (MyComp);\n\n//# sourceURL=webpack:///./src/js/app/parts/paginationPlants.js?");

/***/ }),

/***/ "./src/js/app/parts/searchTrees.js":
/*!*****************************************!*\
  !*** ./src/js/app/parts/searchTrees.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../component */ \"./src/js/app/component.js\");\n/* harmony import */ var _lib_stringUtils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/stringUtils */ \"./src/js/app/lib/stringUtils.js\");\n/* harmony import */ var _actions_plants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../actions/plants */ \"./src/js/app/actions/plants.js\");\n/* harmony import */ var _storage_treesFilterStore__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../storage/treesFilterStore */ \"./src/js/app/storage/treesFilterStore.js\");\n/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../lib/utils */ \"./src/js/app/lib/utils.js\");\n/* harmony import */ var _storage_plantListStore__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../storage/plantListStore */ \"./src/js/app/storage/plantListStore.js\");\n/* harmony import */ var _storage_appStateStore__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../storage/appStateStore */ \"./src/js/app/storage/appStateStore.js\");\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\nvar SearchTrees = {\r\n\tisClearSearch: function() {\r\n\t\tif (_storage_appStateStore__WEBPACK_IMPORTED_MODULE_6__[\"default\"].storageData.clearSearch) {\r\n\t\t\t//clear search\r\n\t\t\tthis.input.value = '';\r\n\t\t}\r\n\t},\r\n\tsearch: function(search) {\r\n\t\t//update the trees filter then search using the updated trees filter\r\n\t\t_storage_treesFilterStore__WEBPACK_IMPORTED_MODULE_3__[\"default\"].setData({ search: search });\r\n\t\tObject(_actions_plants__WEBPACK_IMPORTED_MODULE_2__[\"searchTrees\"])(_storage_treesFilterStore__WEBPACK_IMPORTED_MODULE_3__[\"default\"].storageData, (apiData) => {\r\n\t\t\t_storage_plantListStore__WEBPACK_IMPORTED_MODULE_5__[\"default\"].setData(apiData);\r\n\t\t});\r\n\t},\r\n\tsubmitForm: function(e) {\r\n\t\te.preventDefault();\r\n\t\tlet formData = new FormData(e.target);\r\n\r\n\t\tlet search = formData.get('search');\r\n\t\tsearch = Object(_lib_stringUtils__WEBPACK_IMPORTED_MODULE_1__[\"formatSearchString\"])(search);\r\n\r\n\t\tthis.search(search);\r\n\r\n\t\t//store in the url\r\n\t\tObject(_lib_utils__WEBPACK_IMPORTED_MODULE_4__[\"setUrlParams\"])('search', search);\r\n\t},\r\n\tinit: function(options) {\r\n\t\tvar proto = Object.assign({}, this, _component__WEBPACK_IMPORTED_MODULE_0__[\"default\"])\r\n\t\tvar inst = Object.create(proto);\r\n\t\t// assign the instance constructor to the prototype so 'this' refers to the instance\r\n\t\tproto.constructor = inst;\r\n\r\n\t\t//call initialize on Component first\r\n\t\tinst.initialize({\r\n\t\t\tel: \r\n\t\t\t`<form class=\"search-form\">\r\n\t\t\t\t<input class=\"form-control\" type=\"text\" placeholder=\"${options.placeholder || ''}\" name=\"search\" value=\"\">\r\n\t\t\t</form>`\r\n\t\t});\r\n\r\n\t\tinst.el.addEventListener('submit', inst.submitForm.bind(inst));\r\n\r\n\t\t//get the initial search value if in url query\r\n\t\tlet search = Object(_lib_utils__WEBPACK_IMPORTED_MODULE_4__[\"getUrlParams\"])('search');\r\n\t\tinst.input = inst.el.querySelector('input[name=\"search\"]');\r\n\t\tif(search) {\r\n\t\t\tinst.search(search[0]);\r\n\t\t\t//fill in the search box with the value\r\n\t\t\tinst.input.value = search[0];\r\n\t\t} else {\r\n\t\t\tinst.search('');\r\n\t\t}\r\n\r\n\t\tif(options.hasButton) {\r\n\t\t\tconst searchButton = inst.createEl('<button type=\"submit\" class=\"search-button\"/>');\r\n\t\t\tinst.input.before(searchButton);\r\n\t\t}\r\n\r\n\t\t_storage_appStateStore__WEBPACK_IMPORTED_MODULE_6__[\"default\"].addListener(inst.isClearSearch.bind(inst));\r\n\r\n\t\treturn inst;\r\n\t}\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (SearchTrees);\r\n\r\n\r\n\n\n//# sourceURL=webpack:///./src/js/app/parts/searchTrees.js?");

/***/ }),

/***/ "./src/js/app/router.js":
/*!******************************!*\
  !*** ./src/js/app/router.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nvar { ADMIN_URL } = __webpack_require__(/*! ./config */ \"./src/js/app/config.js\")['globals'];\r\n\r\nlet Router = {\r\n\tpush(uri) {\r\n\t\twindow.history.pushState({}, uri, `${ADMIN_URL}#${uri}`);\r\n\t\tthis.onRouteChange();\r\n\t},\r\n\tonRouteChange() {\r\n\t\tthis.uri = window.location.hash.split('#')[1];\r\n\t\t// remove the query part if present\r\n\t\tthis.uri = (/\\?/.test(this.uri) ? this.uri.split('?') : [this.uri]);\r\n\r\n\t\tif(this.uri[0]) {\r\n\t\t\tthis.callback(this.uri[0]);\r\n\t\t} else {\r\n\t\t\tthis.callback('');\r\n\t\t}\r\n\t\t\r\n\t},\r\n\tinit: function(callback) {\r\n\t\t//let inst = Object.create(this);\r\n\t\twindow.addEventListener('hashchange', (e) => { this.onRouteChange() }, false);\r\n\t\tthis.callback = callback;\r\n\t\tthis.onRouteChange();\r\n\t\t//return this;\r\n\t}\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (Router);\n\n//# sourceURL=webpack:///./src/js/app/router.js?");

/***/ }),

/***/ "./src/js/app/storage/appStateStore.js":
/*!*********************************************!*\
  !*** ./src/js/app/storage/appStateStore.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../store */ \"./src/js/app/store.js\");\n\r\n\r\nvar AppStateStore = {\r\n    name: 'appStateStore',\r\n\tstorageData: {\r\n        isLoading: false,\r\n        showMenu: 'close',\r\n        isOnline: true,\r\n        clearSearch: false,\r\n    },\r\n    init: function() {\r\n        Object.assign(this, _store__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\r\n        this.initialze();\r\n    }\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (AppStateStore);\n\n//# sourceURL=webpack:///./src/js/app/storage/appStateStore.js?");

/***/ }),

/***/ "./src/js/app/storage/plantListStore.js":
/*!**********************************************!*\
  !*** ./src/js/app/storage/plantListStore.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../store */ \"./src/js/app/store.js\");\n\r\n\r\nvar PlantListStore = {\r\n    name: 'plantListStore',\r\n\tstorageData: {\r\n        trees: [],\r\n        count: 0,\r\n        // below may be added after first search\r\n        // offset:\r\n        // limit: \r\n    },\r\n    init: function() {\r\n        Object.assign(this, _store__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\r\n        this.initialze();\r\n    }\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (PlantListStore);\n\n//# sourceURL=webpack:///./src/js/app/storage/plantListStore.js?");

/***/ }),

/***/ "./src/js/app/storage/plantTablesStore.js":
/*!************************************************!*\
  !*** ./src/js/app/storage/plantTablesStore.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../store */ \"./src/js/app/store.js\");\n\r\n\r\nvar PlantTablesStore = {\r\n\tname: 'plantTablesStore',\r\n\tstorageData: {\r\n\t\t'genus_id' : [],\r\n\t\t'tags' : [],\r\n\t\t'origins' : [],\r\n\t\t'eco_benefits' : [],\r\n\t\t'native_to' : [],\r\n\t\t'zone_id' : [],\r\n\t\t'trees_category_id' : [],\r\n\t\t'shapes' : [],\r\n\t\t'growth_rate' : [],\r\n\t\t'light' : [],\r\n\t\t'soil' : [],\r\n\t\t'natural_habitat' : [],\r\n\t\t'common_uses' : [],\r\n\t\t'transplanting' : [],\r\n\t\t'unique_attractions' : [],\r\n\t\t'tolerances' : [],\r\n\t\t'reproduction_type_id' : [],\r\n\t\t'insects' : [],\r\n\t\t'diseases' : [],\r\n\t},\r\n\tinit: function() {\r\n\t    Object.assign(this, _store__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\r\n\t    this.initialze();\r\n\t}\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (PlantTablesStore);\r\n\n\n//# sourceURL=webpack:///./src/js/app/storage/plantTablesStore.js?");

/***/ }),

/***/ "./src/js/app/storage/treesFilterStore.js":
/*!************************************************!*\
  !*** ./src/js/app/storage/treesFilterStore.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../store */ \"./src/js/app/store.js\");\n/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../config.js */ \"./src/js/app/config.js\");\n/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_config_js__WEBPACK_IMPORTED_MODULE_1__);\n\r\n\r\n\r\nvar TreesFilterStore = {\r\n\tname: 'treesFilterStore',\r\n\tstorageData: {\r\n\t\tcategoriesTrees: [],\r\n\t    origins: [],\r\n\t    zones: [],\r\n\t    search: '',\r\n\t    offset: 0,\r\n\t    limit: _config_js__WEBPACK_IMPORTED_MODULE_1__[\"globals\"].ADMIN_ENTRIES_PER_PAGE\r\n\t},\r\n\tinit: function() {\r\n\t    Object.assign(this, _store__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\r\n\t    this.initialze();\r\n\t}\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (TreesFilterStore);\r\n\n\n//# sourceURL=webpack:///./src/js/app/storage/treesFilterStore.js?");

/***/ }),

/***/ "./src/js/app/store.js":
/*!*****************************!*\
  !*** ./src/js/app/store.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/utils */ \"./src/js/app/lib/utils.js\");\n\r\n\r\nconst Store = {\r\n\t\tsetData: function(...newOrUpdated) {\r\n\t\t\tthis.storageData = Object.assign({}, this.storageData, newOrUpdated[0]);\r\n\t        window.dispatchEvent(this.event);\r\n\t        //used to switch back to prev or another state without firing the event again\r\n\t        if(newOrUpdated[1]) {\r\n\t        \tthis.storageData = Object.assign({}, this.storageData, newOrUpdated[1]);\r\n\t        }\r\n\t\t},\r\n\t    addListener(callback) {\r\n\t        window.addEventListener(this.name + 'Updated', callback);\r\n\t    },\r\n\t    initialze: function() {\r\n\t        //create custom event\r\n\t        this.event = Object(_lib_utils__WEBPACK_IMPORTED_MODULE_0__[\"CustomEvent\"])(this.name + 'Updated');\r\n\t    }\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (Store);\n\n//# sourceURL=webpack:///./src/js/app/store.js?");

/***/ }),

/***/ "./src/js/app/xhr.js":
/*!***************************!*\
  !*** ./src/js/app/xhr.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n//config\r\nconst env = \"development\" || false;\r\nvar { SERVER_URL } = __webpack_require__(/*! ./config */ \"./src/js/app/config.js\")[env];\r\n\r\nvar Xhr = {\r\n\tinit: function(options) {\r\n\t\tvar inst = Object.create(this);\r\n\t\treturn inst;\r\n\t},\r\n\tcreateQueryString: function(params) {\r\n\t\t// params:\r\n\t\t// {key: 'value', key: [1,2]}\r\n\t\tlet queryArray = [];\r\n\t\tfor (var key in params) {\r\n\t\t if (params.hasOwnProperty(key)) {\r\n\t\t \tif (Array.isArray(params[key])) {\r\n\t\t \t\tparams[key].map((item) => {\r\n\t\t \t\t\tqueryArray.push(key + '[]=' + item);\r\n\t\t \t\t});\r\n\t\t \t\t\t\r\n\t\t \t} else {\r\n\t\t \t\tqueryArray.push(key + '=' + params[key]);\t\r\n\t\t \t}\r\n\t\t }\r\n\t\t}\r\n\r\n\t\tlet queryString = queryArray.join('&');\r\n\r\n\t\treturn queryString;\r\n\t},\r\n\tsend: function(endpoint, parameters, callback, query) {\r\n\t\tvar url = new URL(window.location.origin + endpoint)\r\n\r\n\t\tif (query) {\r\n\t\t\t//from: https://fetch.spec.whatwg.org/#fetch-api\r\n\t\t\t//?search=&offset=0&limit=25&categoriesTrees[]=3&categoriesTrees[]=6&zones[]=1\r\n\t\t\t//url.search = new URLSearchParams(query).toString();\r\n\t\t\turl.search = this.createQueryString(query);\r\n\t\t} \r\n\r\n\t\tfetch(url, parameters)\r\n\t\t.then(res => {\r\n\t\t\tif (res.ok) {\r\n\t\t\t\t//console.log('fetch to '+ options.endpoint +' successful')\r\n\t\t\t\t\r\n\t\t\t} else {\r\n\t\t\t\t//console.log('fetch to '+ options.endpoint +' not successful')\r\n\t\t\t}\r\n\t\t\t//convert to json gives another promise\r\n\t\t\treturn res.json() \r\n\t\t})\r\n\t\t.then(data => {\r\n\t\t\t//sent the data back\r\n\t\t\tcallback(data);\r\n\t\t})\r\n\t\t.catch(error => console.log(error))\r\n\t}\r\n}\r\n\r\n\r\nvar xhr = Xhr.init({});\r\n\r\n\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (xhr);\n\n//# sourceURL=webpack:///./src/js/app/xhr.js?");

/***/ }),

/***/ 0:
/*!*********************************************!*\
  !*** multi ./src/js/app/admin/mainAdmin.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! C:\\xampp\\htdocs\\1pix_app\\src\\src\\js\\app\\admin\\mainAdmin.js */\"./src/js/app/admin/mainAdmin.js\");\n\n\n//# sourceURL=webpack:///multi_./src/js/app/admin/mainAdmin.js?");

/***/ })

/******/ });