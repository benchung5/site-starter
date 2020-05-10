(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[10],{

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

/***/ "./src/js/react-app/actions/auth/index.js":
/*!************************************************!*\
  !*** ./src/js/react-app/actions/auth/index.js ***!
  \************************************************/
/*! exports provided: signinUser, signupUser, clearUser, authError, signoutUser, fetchMessage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "signinUser", function() { return signinUser; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "signupUser", function() { return signupUser; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clearUser", function() { return clearUser; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "authError", function() { return authError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "signoutUser", function() { return signoutUser; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchMessage", function() { return fetchMessage; });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _history__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../history */ "./src/js/react-app/history.js");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../types */ "./src/js/react-app/actions/types.js");

 //config

var env = "development" || false;

var SERVER_URL = __webpack_require__(/*! ../../config */ "./src/js/react-app/config.js")[env].SERVER_URL;

var POST_CONFIG = __webpack_require__(/*! ../../config */ "./src/js/react-app/config.js")['globals'].POST_CONFIG;


function signinUser(_ref) {
  var email = _ref.email,
      password = _ref.password,
      key = _ref.key;
  return function (dispatch) {
    // Submit email/password to the server
    axios__WEBPACK_IMPORTED_MODULE_0___default.a.post("".concat(SERVER_URL, "/users/sign_in"), {
      email: email,
      password: password,
      key: key
    }, POST_CONFIG).then(function (response) {
      // If request is good...
      if (response.data.token) {
        // - Update state to indicate user is authenticated
        dispatch({
          type: _types__WEBPACK_IMPORTED_MODULE_2__["AUTH_USER"]
        }); // - Save the JWT token

        localStorage.setItem('token', response.data.token);
      } else {
        // - Show an error to the user
        dispatch(authError('Bad Login Info'));
      }
    }).catch(function () {
      // If request is bad...
      // - Show an error to the user
      dispatch(authError('Error logging in'));
    });
  };
}
function signupUser(_ref2) {
  var email = _ref2.email,
      password = _ref2.password;
  return function (dispatch) {
    axios__WEBPACK_IMPORTED_MODULE_0___default.a.post("".concat(SERVER_URL, "/users/create"), {
      email: email,
      password: password
    }).then(function (response) {
      if (response.data.error) {
        dispatch(authError("there was an error signing up user: ".concat(response.data.error)));
      } else {
        dispatch({
          type: _types__WEBPACK_IMPORTED_MODULE_2__["ADD_USER"],
          payload: response.data
        }); //localStorage.setItem('token', response.data.token);
      }
    }).catch(function (err) {
      return dispatch(authError("there was an error signing up: ".concat(err)));
    });
  };
}
function clearUser() {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_2__["ADD_USER"],
    payload: ''
  };
}
function authError(error) {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_2__["AUTH_ERROR"],
    payload: error
  };
}
function signoutUser() {
  localStorage.removeItem('token');
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_2__["UNAUTH_USER"]
  };
}
function fetchMessage() {
  return function (dispatch) {
    axios__WEBPACK_IMPORTED_MODULE_0___default.a.get(SERVER_URL, {
      headers: {
        authorization: localStorage.getItem('token')
      }
    }).then(function (response) {
      dispatch({
        type: _types__WEBPACK_IMPORTED_MODULE_2__["FETCH_MESSAGE"],
        payload: response.data.message
      });
    });
  };
}

/***/ }),

/***/ "./src/js/react-app/components/admin/auth/signout.js":
/*!***********************************************************!*\
  !*** ./src/js/react-app/components/admin/auth/signout.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _actions_auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../actions/auth */ "./src/js/react-app/actions/auth/index.js");
/* harmony import */ var _sidebar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../sidebar */ "./src/js/react-app/components/admin/sidebar.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }






var Signout =
/*#__PURE__*/
function (_Component) {
  _inherits(Signout, _Component);

  function Signout() {
    _classCallCheck(this, Signout);

    return _possibleConstructorReturn(this, _getPrototypeOf(Signout).apply(this, arguments));
  }

  _createClass(Signout, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      this.props.signoutUser();
    }
  }, {
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "admin-main"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "row"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_sidebar__WEBPACK_IMPORTED_MODULE_3__["default"], null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "main-window columns small-12 large-9"
      }, "You have been signed out")));
    }
  }]);

  return Signout;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(null, _actions_auth__WEBPACK_IMPORTED_MODULE_2__)(Signout));

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
//# sourceMappingURL=10.react.js.map