(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[8],{

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

/***/ "./src/js/react-app/actions/db/index.js":
/*!**********************************************!*\
  !*** ./src/js/react-app/actions/db/index.js ***!
  \**********************************************/
/*! exports provided: backupDb, backupDbError, clearBackupDb */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "backupDb", function() { return backupDb; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "backupDbError", function() { return backupDbError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clearBackupDb", function() { return clearBackupDb; });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../types */ "./src/js/react-app/actions/types.js");
 //config

var env = "development" || false;

var SERVER_URL = __webpack_require__(/*! ../../config */ "./src/js/react-app/config.js")[env].SERVER_URL;


function backupDb() {
  return function (dispatch) {
    axios__WEBPACK_IMPORTED_MODULE_0___default.a.post("".concat(SERVER_URL, "/db/backup")).then(function (response) {
      if (response.data.error) {
        dispatch(backupDbError("there was an error backing up the database: ".concat(response.data.error)));
      } else {
        dispatch({
          type: _types__WEBPACK_IMPORTED_MODULE_1__["BACKUP_DB"],
          payload: response.data
        });
      }
    }).catch(function (err) {
      console.log('error posting with backupDb action: ', err);
    });
  };
}
function backupDbError(error) {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_1__["BACKUP_DB_ERROR"],
    payload: error
  };
}
function clearBackupDb() {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_1__["BACKUP_DB"],
    payload: ''
  };
}

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

/***/ "./src/js/react-app/components/admin/backup/backup.js":
/*!************************************************************!*\
  !*** ./src/js/react-app/components/admin/backup/backup.js ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var redux_form__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! redux-form */ "./node_modules/redux-form/es/index.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _actions_db__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../actions/db */ "./src/js/react-app/actions/db/index.js");
/* harmony import */ var _sidebar__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../sidebar */ "./src/js/react-app/components/admin/sidebar.js");
/* harmony import */ var _auth_require_auth__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../auth/require_auth */ "./src/js/react-app/components/admin/auth/require_auth.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }








var BackupDB =
/*#__PURE__*/
function (_Component) {
  _inherits(BackupDB, _Component);

  function BackupDB() {
    _classCallCheck(this, BackupDB);

    return _possibleConstructorReturn(this, _getPrototypeOf(BackupDB).apply(this, arguments));
  }

  _createClass(BackupDB, [{
    key: "onBackupSubmit",
    value: function onBackupSubmit(e) {
      this.props.backupDb();
    }
  }, {
    key: "renderSuccess",
    value: function renderSuccess() {
      //only render if there's no error message
      if (this.props.backupDbSuccess && !this.props.errorMessage) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          className: "submission-message"
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "Database successfully backed up."));
      }
    }
  }, {
    key: "renderError",
    value: function renderError() {
      if (this.props.errorMessage) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          className: "alert alert-danger"
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("strong", null, "Oops!"), " ", this.props.errorMessage);
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      //clear out error messsages if any
      if (this.props.backupDbSuccess && prevProps.backupDbSuccess !== this.props.backupDbSuccess) {
        this.props.backupDbError('');
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      //clear messages when navigating away
      //by calling these actions
      this.props.backupDbError('');
      this.props.clearBackupDb();
    }
  }, {
    key: "render",
    value: function render() {
      var handleSubmit = this.props.handleSubmit;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "admin-main"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "row"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_sidebar__WEBPACK_IMPORTED_MODULE_4__["default"], null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "main-window columns small-12 large-9"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", null, "Backup database"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        className: "btn",
        onClick: this.onBackupSubmit.bind(this)
      }, "backup"), this.renderSuccess(), this.renderError())));
    }
  }]);

  return BackupDB;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

function mapStateToProps(state) {
  return {
    backupDbSuccess: state.db.backupDbSuccess,
    errorMessage: state.db.backupDbError
  };
}

/* harmony default export */ __webpack_exports__["default"] = (Object(_auth_require_auth__WEBPACK_IMPORTED_MODULE_5__["default"])(Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, _actions_db__WEBPACK_IMPORTED_MODULE_3__)(BackupDB)));

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
//# sourceMappingURL=8.react.js.map