(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[15],{

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

/***/ "./src/js/react-app/components/admin/categories/category_edit.js":
/*!***********************************************************************!*\
  !*** ./src/js/react-app/components/admin/categories/category_edit.js ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var redux_form__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! redux-form */ "./node_modules/redux-form/es/index.js");
/* harmony import */ var _actions_categories__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../actions/categories */ "./src/js/react-app/actions/categories/index.js");
/* harmony import */ var _sidebar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../sidebar */ "./src/js/react-app/components/admin/sidebar.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _parts_form_fields__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../parts/form_fields */ "./src/js/react-app/components/admin/parts/form_fields.js");
/* harmony import */ var _auth_require_auth__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../auth/require_auth */ "./src/js/react-app/components/admin/auth/require_auth.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }









var EditCategory =
/*#__PURE__*/
function (_Component) {
  _inherits(EditCategory, _Component);

  function EditCategory() {
    _classCallCheck(this, EditCategory);

    return _possibleConstructorReturn(this, _getPrototypeOf(EditCategory).apply(this, arguments));
  }

  _createClass(EditCategory, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      //get initial data to populate the form
      this.props.getCategory(this.props.match.params.themeId);
    }
  }, {
    key: "handleInitialize",
    value: function handleInitialize() {
      var formData = {
        "name": this.props.themeData.name,
        //still must keep this for the id eventhough it isn't rendered
        "slug": this.props.themeData.slug
      };
      this.props.initialize(formData);
    } // if form isn't valit redux form will not call this function

  }, {
    key: "handleFormSubmit",
    value: function handleFormSubmit(formProps) {
      // call action to submit edited
      this.props.updateCategory(formProps);
    }
  }, {
    key: "renderUpdated",
    value: function renderUpdated() {
      if (this.props.themeUpdated) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "Category: ", this.props.themeUpdated.name, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), "successfully updated."));
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (this.props.themeData && prevProps.themeData !== this.props.themeData) {
        this.handleInitialize();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      //clear messages when navigating away
      //by calling these actions
      this.props.clearUpdateCategory();
    }
  }, {
    key: "onInputChange",
    value: function onInputChange() {
      this.props.clearUpdateCategory();
    }
  }, {
    key: "render",
    value: function render() {
      var handleSubmit = this.props.handleSubmit;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "admin-main"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "row"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_sidebar__WEBPACK_IMPORTED_MODULE_3__["default"], null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "main-window columns small-12 large-9"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", null, "Edit Category"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("form", {
        onSubmit: handleSubmit(this.handleFormSubmit.bind(this))
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(redux_form__WEBPACK_IMPORTED_MODULE_1__["Field"], {
        type: "input",
        label: "name:",
        name: "name",
        component: _parts_form_fields__WEBPACK_IMPORTED_MODULE_5__["default"],
        onChange: this.onInputChange.bind(this),
        onFocus: this.onInputChange.bind(this)
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        action: "submit",
        className: "btn btn-primary"
      }, "Submit")), this.renderUpdated())));
    }
  }]);

  return EditCategory;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

function validate(formProps) {
  var errors = {}; //todo: use the map or foreach to shorten this code

  if (!formProps.name) {
    errors.name = 'Please enter a name';
  }

  return errors;
}

function mapStateToProps(state, ownProps) {
  return {
    themeUpdated: state.category.themeUpdated,
    themeData: state.category.themeSingle
  };
}

/* harmony default export */ __webpack_exports__["default"] = (Object(_auth_require_auth__WEBPACK_IMPORTED_MODULE_6__["default"])(Object(redux_form__WEBPACK_IMPORTED_MODULE_1__["reduxForm"])({
  validate: validate,
  form: 'category-add',
  fields: ['name', 'slug']
})(Object(react_redux__WEBPACK_IMPORTED_MODULE_4__["connect"])(mapStateToProps, _actions_categories__WEBPACK_IMPORTED_MODULE_2__)(EditCategory))));

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
//# sourceMappingURL=15.react.js.map