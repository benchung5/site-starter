(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[13],{

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

/***/ "./src/js/react-app/components/admin/auth/signin.js":
/*!**********************************************************!*\
  !*** ./src/js/react-app/components/admin/auth/signin.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var redux_form__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! redux-form */ "./node_modules/redux-form/es/index.js");
/* harmony import */ var _actions_auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../actions/auth */ "./src/js/react-app/actions/auth/index.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _parts_form_fields__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../parts/form_fields */ "./src/js/react-app/components/admin/parts/form_fields.js");
/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../config.js */ "./src/js/react-app/config.js");
/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_config_js__WEBPACK_IMPORTED_MODULE_5__);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }








var Signin =
/*#__PURE__*/
function (_Component) {
  _inherits(Signin, _Component);

  function Signin() {
    _classCallCheck(this, Signin);

    return _possibleConstructorReturn(this, _getPrototypeOf(Signin).apply(this, arguments));
  }

  _createClass(Signin, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      if (this.props.authenticated) {
        // if the user is already logged in, just forward them right to the dashboard
        this.props.history.push('/' + _config_js__WEBPACK_IMPORTED_MODULE_5__["globals"].ADMIN_URL);
      }
    }
  }, {
    key: "componentWillUpdate",
    value: function componentWillUpdate(nextProps) {
      if (nextProps.authenticated) {
        //if just authenticated, redirect to dashboard
        this.props.history.push('/' + _config_js__WEBPACK_IMPORTED_MODULE_5__["globals"].ADMIN_URL);
      }
    }
  }, {
    key: "handleFormSubmit",
    value: function handleFormSubmit(_ref) {
      var email = _ref.email,
          password = _ref.password,
          key = _ref.key;
      //need to do sometihing to log user in
      this.props.signinUser({
        email: email,
        password: password,
        key: key
      });
    }
  }, {
    key: "renderAlert",
    value: function renderAlert() {
      if (this.props.errorMessage) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          className: "alert alert-danger"
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("strong", null, "Oops!"), " ", this.props.errorMessage);
      }
    }
  }, {
    key: "render",
    value: function render() {
      //props that are pulled off of redux form
      var _this$props = this.props,
          handleSubmit = _this$props.handleSubmit,
          _this$props$fields = _this$props.fields,
          email = _this$props$fields.email,
          password = _this$props$fields.password,
          key = _this$props$fields.key;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "admin-main"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "row"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "columns small-12"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", {
        className: "margin-bottom"
      }, "Login:"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("form", {
        onSubmit: handleSubmit(this.handleFormSubmit.bind(this))
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(redux_form__WEBPACK_IMPORTED_MODULE_1__["Field"], {
        label: "Email:",
        name: "email",
        component: _parts_form_fields__WEBPACK_IMPORTED_MODULE_4__["default"]
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(redux_form__WEBPACK_IMPORTED_MODULE_1__["Field"], {
        label: "Password:",
        name: "password",
        component: _parts_form_fields__WEBPACK_IMPORTED_MODULE_4__["default"]
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(redux_form__WEBPACK_IMPORTED_MODULE_1__["Field"], {
        label: "Key:",
        name: "key",
        component: _parts_form_fields__WEBPACK_IMPORTED_MODULE_4__["default"]
      }), this.renderAlert(), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        action: "submit",
        className: "btn btn-primary"
      }, "Sign in")))));
    }
  }]);

  return Signin;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

function validate(formProps) {
  var errors = {};

  if (!formProps.email) {
    errors.email = 'Please enter an email';
  }

  if (!formProps.password) {
    errors.password = 'Please enter a password';
  }

  if (!formProps.key) {
    errors.key = 'Please enter a key';
  }

  return errors;
}

function mapStateToProps(state) {
  //have our state to show up in props as errorMessage
  return _defineProperty({
    authenticated: state.auth.authenticated,
    errorMessage: state.auth.error
  }, "authenticated", state.auth.authenticated);
}

/* harmony default export */ __webpack_exports__["default"] = (Object(redux_form__WEBPACK_IMPORTED_MODULE_1__["reduxForm"])({
  validate: validate,
  form: 'signin',
  fields: ['email', 'password']
})(Object(react_redux__WEBPACK_IMPORTED_MODULE_3__["connect"])(mapStateToProps, {
  signinUser: _actions_auth__WEBPACK_IMPORTED_MODULE_2__["signinUser"]
})(Signin)));

/***/ }),

/***/ "./src/js/react-app/components/admin/parts/form_fields.js":
/*!****************************************************************!*\
  !*** ./src/js/react-app/components/admin/parts/form_fields.js ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }



function renderField(field) {
  var _field$meta = field.meta,
      touched = _field$meta.touched,
      error = _field$meta.error;
  var className = "form-group ".concat(touched && error ? 'has-danger' : '');

  if (field.type === 'textarea') {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: className
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", null, field.label), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("textarea", _extends({
      className: "form-control",
      rows: "12",
      cols: "50"
    }, field.input)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "error"
    }, touched ? error : ''));
  } else {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: className
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", null, field.label), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", _extends({
      className: "form-control",
      type: "text"
    }, field.input)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "error"
    }, touched ? error : ''));
  }
}

/* harmony default export */ __webpack_exports__["default"] = (renderField);

/***/ })

}]);
//# sourceMappingURL=13.react.js.map