(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[6],{

/***/ "./node_modules/lodash/cloneDeep.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/cloneDeep.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var baseClone = __webpack_require__(/*! ./_baseClone */ "./node_modules/lodash/_baseClone.js");

/** Used to compose bitmasks for cloning. */
var CLONE_DEEP_FLAG = 1,
    CLONE_SYMBOLS_FLAG = 4;

/**
 * This method is like `_.clone` except that it recursively clones `value`.
 *
 * @static
 * @memberOf _
 * @since 1.0.0
 * @category Lang
 * @param {*} value The value to recursively clone.
 * @returns {*} Returns the deep cloned value.
 * @see _.clone
 * @example
 *
 * var objects = [{ 'a': 1 }, { 'b': 2 }];
 *
 * var deep = _.cloneDeep(objects);
 * console.log(deep[0] === objects[0]);
 * // => false
 */
function cloneDeep(value) {
  return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);
}

module.exports = cloneDeep;


/***/ }),

/***/ "./src/js/react-app/actions/articles/index.js":
/*!****************************************************!*\
  !*** ./src/js/react-app/actions/articles/index.js ***!
  \****************************************************/
/*! exports provided: fetchArticles, getArticle, addArticle, updateArticle, deleteArticle, duplicateArticle, clearArticle, clearArticleError, clearUpdateArticle, addArticleError, updateArticleError */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Promise) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchArticles", function() { return fetchArticles; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getArticle", function() { return getArticle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addArticle", function() { return addArticle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateArticle", function() { return updateArticle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deleteArticle", function() { return deleteArticle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "duplicateArticle", function() { return duplicateArticle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clearArticle", function() { return clearArticle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clearArticleError", function() { return clearArticleError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clearUpdateArticle", function() { return clearUpdateArticle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addArticleError", function() { return addArticleError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateArticleError", function() { return updateArticleError; });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _global__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../global */ "./src/js/react-app/actions/global/index.js");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../types */ "./src/js/react-app/actions/types.js");

 //config

var env = "development" || false;

var SERVER_URL = __webpack_require__(/*! ../../config */ "./src/js/react-app/config.js")[env].SERVER_URL;


function fetchArticles() {
  return function (dispatch) {
    axios__WEBPACK_IMPORTED_MODULE_0___default.a.get("".concat(SERVER_URL, "/articles/all")).then(function (response) {
      dispatch({
        type: _types__WEBPACK_IMPORTED_MODULE_2__["FETCH_ARTICLES"],
        payload: response.data
      });
      return Promise.resolve();
    }).catch(function (err) {
      console.log('error fetching articles', err); //todo: if request is bad
      // dispatch(fetchArticlesError('response.data.error'));
    });
  };
}
function getArticle(slug) {
  return function (dispatch) {
    axios__WEBPACK_IMPORTED_MODULE_0___default.a.get("".concat(SERVER_URL, "/articles/single/").concat(slug)).then(function (response) {
      //if no response data, return a formatted object
      var data = {};

      if (!response.data) {
        data = {
          category: [],
          themes: [],
          // make images null so we know it's an intentional clear
          // an empty array makes it show the placeholder image
          images: null
        };
      } else {
        data = response.data;
      }

      dispatch({
        type: _types__WEBPACK_IMPORTED_MODULE_2__["GET_ARTICLE"],
        payload: data
      });
    }).catch(function (err) {
      console.log('error getting article: ', err);
    });
  };
}
function addArticle(formData) {
  //needed for image file submission
  var config = {
    headers: {
      'content-type': 'multipart/form-data'
    }
  };
  return function (dispatch) {
    axios__WEBPACK_IMPORTED_MODULE_0___default.a.post("".concat(SERVER_URL, "/articles/create"), formData, config).then(function (response) {
      if (response.data.error) {
        dispatch(addArticleError("There was an error creating the article: ".concat(response.data.error)));
      } else {
        dispatch({
          type: _types__WEBPACK_IMPORTED_MODULE_2__["ADD_ARTICLE"],
          payload: response.data
        });
      }
    }).catch(function (err) {
      dispatch(addArticleError("there was an error creating the article: ".concat(err)));
    });
  };
}
function updateArticle(formData) {
  //needed for image file submission
  var config = {
    headers: {
      'content-type': 'multipart/form-data'
    }
  };
  return function (dispatch) {
    // post to http://192.168.99.100/api/articles/update
    axios__WEBPACK_IMPORTED_MODULE_0___default.a.post("".concat(SERVER_URL, "/articles/update"), formData, config).then(function (response) {
      if (response.data.error) {
        dispatch(updateArticleError("there was an error updating the article: ".concat(response.data.error)));
      } else {
        dispatch({
          type: _types__WEBPACK_IMPORTED_MODULE_2__["UPDATE_ARTICLE"],
          payload: response.data
        });
      }
    }).catch(function (err) {
      console.log('there was an error updating the article: ', err); //dispatch(updateArticleError(`there was an error updating the article: ${err}`));
    });
  };
}
function deleteArticle(article, search, offset, limit) {
  return function (dispatch, getState) {
    // post to http://192.168.99.100/articles/delete
    axios__WEBPACK_IMPORTED_MODULE_0___default.a.post("".concat(SERVER_URL, "/articles/delete"), {
      article: article
    }).then(function (response) {
      if (response.data.error) {
        console.log('error: ', response.data.error); //dispatch(deleteArticleError(`there was an error deleting the article: ${response.data.error}`));
      } else {
        //get the new list of articles now that one is deleted
        dispatch(Object(_global__WEBPACK_IMPORTED_MODULE_1__["searchArticles"])(getState().global));
      }
    }).catch(function (err) {
      console.log('error deleting the article: ', err);
    });
  };
}
function duplicateArticle(slug, search, offset, limit) {
  return function (dispatch) {
    // post to http://192.168.99.100/articles/delete
    axios__WEBPACK_IMPORTED_MODULE_0___default.a.post("".concat(SERVER_URL, "/articles/duplicate"), {
      slug: slug
    }).then(function (response) {
      if (response.data.error) {
        console.log('error: ', response.data.error); //dispatch(duplicateArticleError(`there was an error duplicating the article: ${response.data.error}`));
      } else {
        //get the new list of articles now that one is deleted
        dispatch(Object(_global__WEBPACK_IMPORTED_MODULE_1__["searchArticles"])(getState().global()));
      }
    }).catch(function (err) {
      console.log('error duplicating the article: ', err);
    });
  };
}
function clearArticle() {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_2__["ADD_ARTICLE"],
    payload: ''
  };
}
function clearArticleError(error) {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_2__["ADD_ARTICLE_ERROR"],
    payload: ''
  };
}
function clearUpdateArticle() {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_2__["UPDATE_ARTICLE"],
    payload: ''
  };
}
function addArticleError(error) {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_2__["ADD_ARTICLE_ERROR"],
    payload: error
  };
}
function updateArticleError(error) {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_2__["UPDATE_ARTICLE_ERROR"],
    payload: error
  };
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! es6-promise-promise */ "./node_modules/es6-promise-promise/index.js")))

/***/ }),

/***/ "./src/js/react-app/components/admin/articles/articles_list.js":
/*!*********************************************************************!*\
  !*** ./src/js/react-app/components/admin/articles/articles_list.js ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _sidebar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../sidebar */ "./src/js/react-app/components/admin/sidebar.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var _actions_global__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../actions/global */ "./src/js/react-app/actions/global/index.js");
/* harmony import */ var _actions_articles__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../actions/articles */ "./src/js/react-app/actions/articles/index.js");
/* harmony import */ var _auth_require_auth__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../auth/require_auth */ "./src/js/react-app/components/admin/auth/require_auth.js");
/* harmony import */ var _search_articles__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../search_articles */ "./src/js/react-app/components/search_articles.js");
/* harmony import */ var _parts_pagination_articles__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../parts/pagination_articles */ "./src/js/react-app/components/parts/pagination_articles.js");
/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../config.js */ "./src/js/react-app/config.js");
/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_config_js__WEBPACK_IMPORTED_MODULE_9__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }










 //config

var env = "development" || false;

var SERVER_URL = __webpack_require__(/*! ../../../config */ "./src/js/react-app/config.js")[env].SERVER_URL;

var ArticlesIndex =
/*#__PURE__*/
function (_Component) {
  _inherits(ArticlesIndex, _Component);

  function ArticlesIndex(props) {
    var _this;

    _classCallCheck(this, ArticlesIndex);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ArticlesIndex).call(this, props));
    _this.state = {};
    return _this;
  }

  _createClass(ArticlesIndex, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      this.searchArticles();
    } // componentWillReceiveProps(nextProps) {
    //   // if newly navigated from the router link...
    //   if((nextProps.location !== this.props.location) && nextProps.location.key) {
    //     this.resetArticlesList();
    //   }
    // }
    // resetArticlesList() {
    //     this.props.searchArticles(this.props.globalFilterData);
    // }

  }, {
    key: "searchArticles",
    value: function searchArticles() {
      this.props.searchArticles(this.props.globalFilterData);
    }
  }, {
    key: "onDeleteArticleClick",
    value: function onDeleteArticleClick(event) {
      var slug = event.target.getAttribute("data-slug");
      var id = event.target.getAttribute("data-id");
      var _this$props$articles = this.props.articles,
          offset = _this$props$articles.offset,
          limit = _this$props$articles.limit; //slug, search, offset, limit
      //todo: get [] to use real stored search if any

      this.props.dispatch(Object(_actions_articles__WEBPACK_IMPORTED_MODULE_5__["deleteArticle"])({
        id: parseInt(id),
        slug: slug
      }, [], offset, limit));
    }
  }, {
    key: "onDuplicateArticleClick",
    value: function onDuplicateArticleClick(event) {
      var slug = event.target.getAttribute("data-slug");
      var _this$props$articles2 = this.props.articles,
          offset = _this$props$articles2.offset,
          limit = _this$props$articles2.limit; //slug, search, offset, limit
      //todo: get [] to use real stored search if any

      this.props.duplicateArticle(slug, [], offset, limit);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      //fire the updated globalFilterData to the search action whenever the themes or categores get updated
      if (this.props.globalFilterData && prevProps.globalFilterData !== this.props.globalFilterData) {
        this.searchArticles();
      }
    }
  }, {
    key: "renderArticles",
    value: function renderArticles() {
      var _this2 = this;

      return this.props.articles.articles.map(function (article) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
          className: "list-group-item",
          key: article.id
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, article.name), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
          href: "#",
          "data-id": article.id,
          "data-slug": article.slug,
          onClick: _this2.onDeleteArticleClick.bind(_this2)
        }, "Delete"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
          href: "#",
          "data-id": article.id,
          "data-slug": article.slug,
          onClick: _this2.onDuplicateArticleClick.bind(_this2)
        }, "Duplicate"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Link"], {
          to: "/".concat(_config_js__WEBPACK_IMPORTED_MODULE_9__["globals"].ADMIN_URL, "/articles-list/").concat(article.slug)
        }, "edit"));
      });
    }
  }, {
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "admin-main"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "row"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_sidebar__WEBPACK_IMPORTED_MODULE_2__["default"], null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "main-window columns small-12 large-9"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", null, "Articles"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_search_articles__WEBPACK_IMPORTED_MODULE_7__["default"], {
        placeholder: "search",
        hasButton: false
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
        className: "list-group item-list"
      }, this.renderArticles()), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_parts_pagination_articles__WEBPACK_IMPORTED_MODULE_8__["default"], null))));
    }
  }]);

  return ArticlesIndex;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

function mapStateToProps(state) {
  return {
    articles: state.articles.searchResults,
    articleDeleted: state.article.articleDeleted,
    globalFilterData: state.global
  };
}

/* harmony default export */ __webpack_exports__["default"] = (Object(_auth_require_auth__WEBPACK_IMPORTED_MODULE_6__["default"])(Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, _actions_global__WEBPACK_IMPORTED_MODULE_4__)(ArticlesIndex)));

/***/ }),

/***/ "./src/js/react-app/components/admin/auth/require_auth.js":
/*!****************************************************************!*\
  !*** ./src/js/react-app/components/admin/auth/require_auth.js ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../config.js */ "./src/js/react-app/config.js");
/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_config_js__WEBPACK_IMPORTED_MODULE_2__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



 // import PropTypes from "prop-types";
//this is a higher order component (HOC) that wraps the incomming component 
//and attaches additional functionality to it

/* harmony default export */ __webpack_exports__["default"] = (function (ComposedComponent) {
  var Authentication =
  /*#__PURE__*/
  function (_Component) {
    _inherits(Authentication, _Component);

    function Authentication() {
      _classCallCheck(this, Authentication);

      return _possibleConstructorReturn(this, _getPrototypeOf(Authentication).apply(this, arguments));
    }

    _createClass(Authentication, [{
      key: "componentWillMount",
      // comment out these two blocks to disable auth
      //if not authenticated at start, push to the home page
      value: function componentWillMount() {
        if (!this.props.authenticated) {
          //this.context.router.push('/protected');
          this.props.history.push('/' + _config_js__WEBPACK_IMPORTED_MODULE_2__["globals"].ADMIN_URL + '/protected');
        }
      } //this one fires when component is updated

    }, {
      key: "componentWillUpdate",
      value: function componentWillUpdate(nextProps) {
        if (!nextProps.authenticated) {
          //this.context.router.push('/protected');
          this.props.history.push('/' + _config_js__WEBPACK_IMPORTED_MODULE_2__["globals"].ADMIN_URL + '/protected');
        }
      }
    }, {
      key: "render",
      value: function render() {
        //the this.props is for passing up new props from the combined component *instance to 
        //existing props on the original composed component below
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(ComposedComponent, this.props);
      }
    }]);

    return Authentication;
  }(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

  function mapStateToProps(state) {
    return {
      authenticated: state.auth.authenticated
    };
  }

  return Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps)(Authentication);
}); ////example usage of this HOC
// import Authenticatoin // this is the HOC
// import Resources // this is the component to wraps
// const ComposedComponent = Authentication(Resources);
//// in some render method...
// <ComposedComponent resources={resourceList}>

/***/ }),

/***/ "./src/js/react-app/components/admin/sidebar.js":
/*!******************************************************!*\
  !*** ./src/js/react-app/components/admin/sidebar.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash/cloneDeep */ "./node_modules/lodash/cloneDeep.js");
/* harmony import */ var lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../config.js */ "./src/js/react-app/config.js");
/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_config_js__WEBPACK_IMPORTED_MODULE_3__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }






var SideMenu =
/*#__PURE__*/
function (_Component) {
  _inherits(SideMenu, _Component);

  function SideMenu(props) {
    var _this;

    _classCallCheck(this, SideMenu);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SideMenu).call(this, props));
    _this.state = {
      linkList: [{
        title: 'Website',
        link: '/',
        active: false
      }, {
        title: 'Logout',
        link: '/' + _config_js__WEBPACK_IMPORTED_MODULE_3__["globals"].ADMIN_URL + '/signout',
        active: false
      }, {
        title: 'Dashboard',
        link: '/' + _config_js__WEBPACK_IMPORTED_MODULE_3__["globals"].ADMIN_URL + '',
        active: false
      }, {
        title: 'View Articles',
        link: '/' + _config_js__WEBPACK_IMPORTED_MODULE_3__["globals"].ADMIN_URL + '/articles-list',
        active: false
      }, {
        title: 'Add Articles',
        link: '/' + _config_js__WEBPACK_IMPORTED_MODULE_3__["globals"].ADMIN_URL + '/article-add',
        active: false
      }, {
        title: 'View Plants',
        link: '/' + _config_js__WEBPACK_IMPORTED_MODULE_3__["globals"].ADMIN_URL + '/trees-list',
        active: false
      }, {
        title: 'Add Plants',
        link: '/' + _config_js__WEBPACK_IMPORTED_MODULE_3__["globals"].ADMIN_URL + '/tree-add',
        active: false
      }, {
        title: 'View Users',
        link: '/' + _config_js__WEBPACK_IMPORTED_MODULE_3__["globals"].ADMIN_URL + '/users-list',
        active: false
      }, {
        title: 'Add User',
        link: '/' + _config_js__WEBPACK_IMPORTED_MODULE_3__["globals"].ADMIN_URL + '/signup',
        active: false
      }, {
        title: 'View Categories',
        link: '/' + _config_js__WEBPACK_IMPORTED_MODULE_3__["globals"].ADMIN_URL + '/category-list',
        active: false
      }, {
        title: 'Add Category',
        link: '/' + _config_js__WEBPACK_IMPORTED_MODULE_3__["globals"].ADMIN_URL + '/category-add',
        active: false
      }, {
        title: 'Backup',
        link: '/' + _config_js__WEBPACK_IMPORTED_MODULE_3__["globals"].ADMIN_URL + '/backup',
        active: false
      }]
    };
    return _this;
  }

  _createClass(SideMenu, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      //check url and highlight accordingly
      var linkListClone = lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_2___default()(this.state.linkList);
      linkListClone.forEach(function (item, index) {
        //set all to inactive at first
        if (item.active) {
          item.active = false;
        } //if url path equals link, activate it


        if (item.link === window.location.pathname) {
          item.active = true;
        }
      });
      this.setState({
        linkList: linkListClone
      });
    }
  }, {
    key: "onLinkClick",
    value: function onLinkClick(e) {}
  }, {
    key: "renderButtons",
    value: function renderButtons() {
      var _this2 = this;

      return this.state.linkList.map(function (item, index) {
        //title to lowercase, replace slashes with dashes
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
          key: index,
          className: "".concat(item.active ? 'active' : '')
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Link"], {
          onClick: _this2.onLinkClick.bind(_this2),
          className: "nav-link",
          to: item.link,
          "data-id": index
        }, item.title));
      });
    }
  }, {
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "columns small-12 large-3 admin-sidebar"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
        className: "vertical menu admin-side-menu"
      }, this.renderButtons()));
    }
  }]);

  return SideMenu;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (SideMenu);

/***/ }),

/***/ "./src/js/react-app/components/parts/pagination_articles.js":
/*!******************************************************************!*\
  !*** ./src/js/react-app/components/parts/pagination_articles.js ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../config.js */ "./src/js/react-app/config.js");
/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_config_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _actions_global__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../actions/global */ "./src/js/react-app/actions/global/index.js");
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../lib/utils */ "./src/js/react-app/lib/utils.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }







var PaginationArticles =
/*#__PURE__*/
function (_Component) {
  _inherits(PaginationArticles, _Component);

  function PaginationArticles() {
    _classCallCheck(this, PaginationArticles);

    return _possibleConstructorReturn(this, _getPrototypeOf(PaginationArticles).apply(this, arguments));
  }

  _createClass(PaginationArticles, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      var offset = Object(_lib_utils__WEBPACK_IMPORTED_MODULE_4__["getUrlParams"])('offset');

      if (offset) {
        // set offset from url
        this.props.dispatch(_actions_global__WEBPACK_IMPORTED_MODULE_3__["filterOffsetArticles"](parseInt(offset[0])));
      }
    }
  }, {
    key: "back",
    value: function back() {
      var offset = this.props.globalFilterData.offset;

      if (offset === 0) {
        return;
      }

      var newOffset = offset - _config_js__WEBPACK_IMPORTED_MODULE_2__["globals"].ADMIN_ENTRIES_PER_PAGE;
      this.updateOffset(newOffset);
    }
  }, {
    key: "advance",
    value: function advance() {
      var count = this.props.searchResults.count;
      var offset = this.props.globalFilterData.offset;

      if (offset + _config_js__WEBPACK_IMPORTED_MODULE_2__["globals"].ADMIN_ENTRIES_PER_PAGE >= count) {
        return;
      }

      var newOffset = offset + _config_js__WEBPACK_IMPORTED_MODULE_2__["globals"].ADMIN_ENTRIES_PER_PAGE;
      this.updateOffset(newOffset);
    }
  }, {
    key: "updateOffset",
    value: function updateOffset(newOffset) {
      var count = this.props.searchResults.count;
      var _this$props$globalFil = this.props.globalFilterData,
          search = _this$props$globalFil.search,
          categories = _this$props$globalFil.categories,
          offset = _this$props$globalFil.offset; // set the new offset in the global fields

      this.props.dispatch(_actions_global__WEBPACK_IMPORTED_MODULE_3__["filterOffsetArticles"](newOffset));
      Object(_lib_utils__WEBPACK_IMPORTED_MODULE_4__["setUrlParams"])('offset', newOffset);
    }
  }, {
    key: "left",
    value: function left() {
      var offset = this.props.globalFilterData.offset;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "paginate-previous ".concat(offset === 0 ? 'disabled' : '')
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        "aria-label": "Previous page",
        onClick: this.back.bind(this)
      }, "Previous"));
    }
  }, {
    key: "right",
    value: function right() {
      var count = this.props.searchResults.count;
      var offset = this.props.globalFilterData.offset;
      var end = offset + _config_js__WEBPACK_IMPORTED_MODULE_2__["globals"].ADMIN_ENTRIES_PER_PAGE >= count ? true : false;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "paginate-next ".concat(end ? 'disabled' : '')
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        "aria-label": "Next page",
        onClick: this.advance.bind(this)
      }, "Next"));
    }
  }, {
    key: "render",
    value: function render() {
      var count = this.props.searchResults.count;
      var offset = this.props.globalFilterData.offset;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "paginate-wrapper"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "paginate",
        role: "navigation",
        "aria-label": "Pagination"
      }, this.left(), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, "Page ", offset / _config_js__WEBPACK_IMPORTED_MODULE_2__["globals"].ADMIN_ENTRIES_PER_PAGE + 1), this.right()), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "records-count"
      }, "(", count, " records total)"));
    }
  }]);

  return PaginationArticles;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

function mapStateToProps(state) {
  return {
    searchResults: state.articles.searchResults,
    globalFilterData: state.global
  };
}

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps)(PaginationArticles)); // import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { globals } from '../../../config.js';
// class Paginator extends Component {
//   back() {
//     const { offset, limit } = this.props.sourceData;
//     if (offset === 0 ) { return; }
//     //todo: get this.props.search to pull from stored search if any
//     this.props.searchAction({ search: this.props.search, offset: offset - globals.ADMIN_ENTRIES_PER_PAGE, limit: limit });
//   }
//   advance() {
//     const { offset, limit, count } = this.props.sourceData;
//     if ((offset + limit) > count) { return; }
//     //todo: get this.props.search to pull from stored search if any
//     this.props.searchAction({ search: this.props.search, offset: offset + globals.ADMIN_ENTRIES_PER_PAGE, limit: limit });
//   }
//   left() {
//     const { offset } = this.props.sourceData;
//     return (
//       <div className={`paginate-previous ${offset === 0 ? 'disabled' : ''}`}>
//         <a aria-label="Previous page" onClick={this.back.bind(this)}>
//           Previous
//         </a>
//       </div>
//     );
//   }
//   right() {
//     const { offset, limit, count } = this.props.sourceData;
//     const end = ((offset + limit) >= count) ? true : false;
//     return (
//       <div className={`paginate-next ${end ? 'disabled' : ''}`}>
//         <a aria-label="Next page" onClick={this.advance.bind(this)}>
//           Next
//         </a>
//       </div>
//     );
//   }
//   render() {
//     const { offset, count } = this.props.sourceData;
//     return (
//       <div className="paginate-wrapper">
//         <div className="paginate" role="navigation" aria-label="Pagination">
//           {this.left()}
//           <div>Page {offset / globals.ADMIN_ENTRIES_PER_PAGE + 1}</div>
//           {this.right()}
//         </div>
//         <div className="records-count">({count} records total)</div>
//       </div>
//     );
//   }
// }
// function mapStateToProps(state) {
//     return {
//         //articlesResults: state.articles.searchResultsAdmin
//     };
// }
// export default connect(mapStateToProps)(Paginator);

/***/ }),

/***/ "./src/js/react-app/components/search_articles.js":
/*!********************************************************!*\
  !*** ./src/js/react-app/components/search_articles.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var redux_form__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! redux-form */ "./node_modules/redux-form/es/index.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _actions_global__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../actions/global */ "./src/js/react-app/actions/global/index.js");
/* harmony import */ var _parts_field_search__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./parts/field_search */ "./src/js/react-app/components/parts/field_search.js");
/* harmony import */ var _lib_stringUtils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../lib/stringUtils */ "./src/js/react-app/lib/stringUtils.js");
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../lib/utils */ "./src/js/react-app/lib/utils.js");
/* harmony import */ var _actions_views__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../actions/views */ "./src/js/react-app/actions/views/index.js");
/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../config.js */ "./src/js/react-app/config.js");
/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_config_js__WEBPACK_IMPORTED_MODULE_8__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }











var SearchForm =
/*#__PURE__*/
function (_Component) {
  _inherits(SearchForm, _Component);

  function SearchForm() {
    _classCallCheck(this, SearchForm);

    return _possibleConstructorReturn(this, _getPrototypeOf(SearchForm).apply(this, arguments));
  }

  _createClass(SearchForm, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      var search = Object(_lib_utils__WEBPACK_IMPORTED_MODULE_6__["getUrlParams"])('search');

      if (search) {
        //update the global filter and search
        this.props.dispatch(_actions_global__WEBPACK_IMPORTED_MODULE_3__["filterSearchArticles"](search[0])); //fill in the search box with the value

        this.props.dispatch(Object(redux_form__WEBPACK_IMPORTED_MODULE_1__["change"])('search-form', 'search', search[0]));
      }
    }
  }, {
    key: "handleFormSubmit",
    value: function handleFormSubmit(formProps) {
      //call action for data (send the text along with the global data)
      // if empty search, make it empty
      if (Object.keys(formProps).length === 0 && formProps.constructor === Object) {
        this.props.dispatch(_actions_global__WEBPACK_IMPORTED_MODULE_3__["filterSearchArticles"](null));
      } else {
        //else, update the global filter and search
        var search = Object(_lib_stringUtils__WEBPACK_IMPORTED_MODULE_5__["formatSearchString"])(formProps.search);
        this.props.dispatch(_actions_global__WEBPACK_IMPORTED_MODULE_3__["filterSearchArticles"](search)); //store in the url

        Object(_lib_utils__WEBPACK_IMPORTED_MODULE_6__["setUrlParams"])('search', search);
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (this.props.globalFilterData && prevProps.globalFilterData.search !== this.props.globalFilterData.search) {
        this.props.dispatch(_actions_global__WEBPACK_IMPORTED_MODULE_3__["searchArticles"](this.props.globalFilterData));
      }
    }
  }, {
    key: "render",
    value: function render() {
      var handleSubmit = this.props.handleSubmit;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("form", {
        ref: "form",
        className: "search-form",
        onSubmit: handleSubmit(this.handleFormSubmit.bind(this))
      }, this.props.hasButton && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        type: "submit",
        className: "search-button"
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(redux_form__WEBPACK_IMPORTED_MODULE_1__["Field"], {
        name: "search",
        component: _parts_field_search__WEBPACK_IMPORTED_MODULE_4__["default"],
        placeholder: this.props.placeholder
      }));
    }
  }]);

  return SearchForm;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

function validate(formProps) {
  var errors = {}; //validation...

  return errors;
}

function mapStateToProps(state) {
  return {
    globalFilterData: state.global
  };
}

/* harmony default export */ __webpack_exports__["default"] = (Object(redux_form__WEBPACK_IMPORTED_MODULE_1__["reduxForm"])({
  form: 'search-form',
  validate: validate
})(Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, {
  viewsToggle: _actions_views__WEBPACK_IMPORTED_MODULE_7__["viewsToggle"]
})(SearchForm))); // import React, { Component } from 'react';
// import { Field, reduxForm } from 'redux-form';
// import { connect } from 'react-redux';
// import * as actions from '../../../actions/articles';
// import renderSearch from '../../parts/field_search';
// import { globals } from '../../../config.js';
// import { formatSearchString } from '../../../lib/stringUtils';
// class SearchFormAdmin extends Component {
// 	handleFormSubmit(formProps) {
// 		//call action for data (send the text along with the global data)
// 		// if empty search, just search with blank string
// 		if (Object.keys(formProps).length === 0 && formProps.constructor === Object) {
// 			this.props.dispatch(actions.searchArticlesAdmin({ search: [], offset: 0, limit: globals.ADMIN_ENTRIES_PER_PAGE }));
// 		} else {
// 			//else, query it using keywords
// 			this.props.dispatch(actions.searchArticlesAdmin({ 
// 				search: formatSearchString(formProps.search),
// 				offset: 0,
// 				limit: globals.ADMIN_ENTRIES_PER_PAGE
// 			}));
// 		}
// 	}
// 	render() {
// 		const { handleSubmit } = this.props;
// 		return (
// 				<form className="search-form" onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
// 					<Field
// 						name="search"
// 						component={renderSearch}
// 						placeholder="search"
// 					/>
// 				</form>
// 			)
// 	}
// }
// function validate(formProps) {
// 	const errors = {};
// 	//validation...
// 	return errors;
// }
// function mapStateToProps(state) {
// 	return {
// 		// articlesSearch: state.articles.articlesAdmin
// 	}
// }
// export default reduxForm({
// 	form: 'search-form',
// 	validate
// })(
// connect(mapStateToProps, actions)(SearchFormAdmin)
// );

/***/ })

}]);
//# sourceMappingURL=6.react.js.map