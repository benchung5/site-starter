(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[3],{

/***/ "./src/js/react-app/actions/trees/index.js":
/*!*************************************************!*\
  !*** ./src/js/react-app/actions/trees/index.js ***!
  \*************************************************/
/*! exports provided: fetchTrees, getTree, addTree, updateTree, deleteTree, clearTree, clearTreeError, clearUpdateTree, addTreeError, updateTreeError */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Promise) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchTrees", function() { return fetchTrees; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTree", function() { return getTree; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addTree", function() { return addTree; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateTree", function() { return updateTree; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deleteTree", function() { return deleteTree; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clearTree", function() { return clearTree; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clearTreeError", function() { return clearTreeError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clearUpdateTree", function() { return clearUpdateTree; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addTreeError", function() { return addTreeError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateTreeError", function() { return updateTreeError; });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _globalTrees__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../globalTrees */ "./src/js/react-app/actions/globalTrees/index.js");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../types */ "./src/js/react-app/actions/types.js");

 //config

var env = "development" || false;

var SERVER_URL = __webpack_require__(/*! ../../config */ "./src/js/react-app/config.js")[env].SERVER_URL;


function fetchTrees() {
  return function (dispatch) {
    axios__WEBPACK_IMPORTED_MODULE_0___default.a.get("".concat(SERVER_URL, "/trees/all")).then(function (response) {
      dispatch({
        type: _types__WEBPACK_IMPORTED_MODULE_2__["FETCH_TREES"],
        payload: response.data
      });
      return Promise.resolve();
    }).catch(function (err) {
      console.log('error fetching trees', err); //todo: if request is bad
      // dispatch(fetchTreesError('response.data.error'));
    });
  };
}
function getTree(slug) {
  return function (dispatch) {
    axios__WEBPACK_IMPORTED_MODULE_0___default.a.get("".concat(SERVER_URL, "/trees/single/").concat(slug)).then(function (response) {
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
        type: _types__WEBPACK_IMPORTED_MODULE_2__["GET_TREE"],
        payload: data
      });
    }).catch(function (err) {
      console.log('error getting tree: ', err);
    });
  };
}
function addTree(formData) {
  //needed for image file submission
  var config = {
    headers: {
      'content-type': 'multipart/form-data'
    }
  };
  return function (dispatch) {
    axios__WEBPACK_IMPORTED_MODULE_0___default.a.post("".concat(SERVER_URL, "/trees/create"), formData, config).then(function (response) {
      if (response.data.error) {
        dispatch(addTreeError("There was an error creating the tree: ".concat(response.data.error)));
      } else {
        dispatch({
          type: _types__WEBPACK_IMPORTED_MODULE_2__["ADD_TREE"],
          payload: response.data
        });
      }
    }).catch(function (err) {
      dispatch(addTreeError("there was an error creating the tree: ".concat(err)));
    });
  };
}
function updateTree(formData) {
  //needed for image file submission
  var config = {
    headers: {
      'content-type': 'multipart/form-data'
    }
  };
  return function (dispatch) {
    // post to http://192.168.99.100/api/trees/update
    axios__WEBPACK_IMPORTED_MODULE_0___default.a.post("".concat(SERVER_URL, "/trees/update"), formData, config).then(function (response) {
      if (response.data.error) {
        dispatch(updateTreeError("there was an error updating the tree: ".concat(response.data.error)));
      } else {
        dispatch({
          type: _types__WEBPACK_IMPORTED_MODULE_2__["UPDATE_TREE"],
          payload: response.data
        });
      }
    }).catch(function (err) {
      console.log('there was an error updating the tree: ', err); //dispatch(updateTreeError(`there was an error updating the tree: ${err}`));
    });
  };
}
function deleteTree(tree, search, offset, limit) {
  return function (dispatch, getState) {
    // post to http://192.168.99.100/trees/delete
    axios__WEBPACK_IMPORTED_MODULE_0___default.a.post("".concat(SERVER_URL, "/trees/delete"), {
      tree: tree
    }).then(function (response) {
      if (response.data.error) {
        console.log('error: ', response.data.error); //dispatch(deleteTreeError(`there was an error deleting the tree: ${response.data.error}`));
      } else {
        //get the new list of trees now that one is deleted
        //we can access the globalTrees reducer from getState (passed in above)
        dispatch(Object(_globalTrees__WEBPACK_IMPORTED_MODULE_1__["searchTrees"])(getState().globalTrees));
      }
    }).catch(function (err) {
      console.log('error deleting the tree: ', err);
    });
  };
}
function clearTree() {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_2__["ADD_TREE"],
    payload: ''
  };
}
function clearTreeError(error) {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_2__["ADD_TREE_ERROR"],
    payload: ''
  };
}
function clearUpdateTree() {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_2__["UPDATE_TREE"],
    payload: ''
  };
}
function addTreeError(error) {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_2__["ADD_TREE_ERROR"],
    payload: error
  };
}
function updateTreeError(error) {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_2__["UPDATE_TREE_ERROR"],
    payload: error
  };
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! es6-promise-promise */ "./node_modules/es6-promise-promise/index.js")))

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

/***/ })

}]);
//# sourceMappingURL=3.react.js.map