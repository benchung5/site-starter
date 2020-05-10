(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[4],{

/***/ "./src/js/react-app/actions/treeTables/index.js":
/*!******************************************************!*\
  !*** ./src/js/react-app/actions/treeTables/index.js ***!
  \******************************************************/
/*! exports provided: fetchTreeTables */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchTreeTables", function() { return fetchTreeTables; });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../types */ "./src/js/react-app/actions/types.js");
 //config

var env = "development" || false;

var SERVER_URL = __webpack_require__(/*! ../../config */ "./src/js/react-app/config.js")[env].SERVER_URL;


function fetchTreeTables() {
  return function (dispatch) {
    axios__WEBPACK_IMPORTED_MODULE_0___default.a.get("".concat(SERVER_URL, "/tree_tables/all")).then(function (response) {
      dispatch({
        type: _types__WEBPACK_IMPORTED_MODULE_1__["FETCH_TREE_TABLES"],
        payload: response.data
      });
    }).catch(function (err) {
      console.log('error fetching origins: ', err);
    });
  };
}

/***/ }),

/***/ "./src/js/react-app/components/admin/parts/field_dropdownSelect.js":
/*!*************************************************************************!*\
  !*** ./src/js/react-app/components/admin/parts/field_dropdownSelect.js ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



var DropdownSelect =
/*#__PURE__*/
function (_Component) {
  _inherits(DropdownSelect, _Component);

  function DropdownSelect() {
    _classCallCheck(this, DropdownSelect);

    return _possibleConstructorReturn(this, _getPrototypeOf(DropdownSelect).apply(this, arguments));
  }

  _createClass(DropdownSelect, [{
    key: "handleChange",
    value: function handleChange(event) {
      this.setState({
        value: event.target.value
      });
    }
  }, {
    key: "renderSelectOptions",
    value: function renderSelectOptions() {
      return this.props.selectItems.map(function (item) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
          key: item.id,
          value: item.id
        }, item.name);
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          _this$props$meta = _this$props.meta,
          touched = _this$props$meta.touched,
          error = _this$props$meta.error,
          input = _this$props.input,
          label = _this$props.label;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "form-group"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
        htmlFor: label
      }, label), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("select", _extends({
        className: "dropdown-select",
        value: input.value,
        onChange: this.handleChange
      }, input), this.renderSelectOptions()), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "error"
      }, touched ? error : ''));
    }
  }]);

  return DropdownSelect;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (DropdownSelect);

/***/ }),

/***/ "./src/js/react-app/components/admin/parts/field_hidden.js":
/*!*****************************************************************!*\
  !*** ./src/js/react-app/components/admin/parts/field_hidden.js ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }



function renderHiddenField(field) {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", _extends({
    type: "hidden",
    className: "form-control"
  }, field.input));
}

/* harmony default export */ __webpack_exports__["default"] = (renderHiddenField);

/***/ }),

/***/ "./src/js/react-app/components/admin/trees/tree_fields.js":
/*!****************************************************************!*\
  !*** ./src/js/react-app/components/admin/trees/tree_fields.js ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var redux_form__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! redux-form */ "./node_modules/redux-form/es/index.js");
/* harmony import */ var _parts_form_fields__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../parts/form_fields */ "./src/js/react-app/components/admin/parts/form_fields.js");
/* harmony import */ var _parts_edit_box__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../parts/edit_box */ "./src/js/react-app/components/admin/parts/edit_box.js");
/* harmony import */ var _parts_field_dropdownSelect__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../parts/field_dropdownSelect */ "./src/js/react-app/components/admin/parts/field_dropdownSelect.js");
/* harmony import */ var _parts_field_multiSelect__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../parts/field_multiSelect */ "./src/js/react-app/components/admin/parts/field_multiSelect.js");
/* harmony import */ var _parts_field_hidden__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../parts/field_hidden */ "./src/js/react-app/components/admin/parts/field_hidden.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }









var TreeFields =
/*#__PURE__*/
function (_Component) {
  _inherits(TreeFields, _Component);

  function TreeFields(props) {
    _classCallCheck(this, TreeFields);

    return _possibleConstructorReturn(this, _getPrototypeOf(TreeFields).call(this, props));
  }

  _createClass(TreeFields, [{
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(redux_form__WEBPACK_IMPORTED_MODULE_1__["Field"], {
        name: "tree_id",
        component: _parts_field_hidden__WEBPACK_IMPORTED_MODULE_6__["default"],
        value: this.props.treeId
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(redux_form__WEBPACK_IMPORTED_MODULE_1__["Field"], {
        type: "input",
        label: "common name",
        name: "common_name",
        component: _parts_form_fields__WEBPACK_IMPORTED_MODULE_2__["default"],
        onChange: this.props.onInputChange,
        onFocus: this.props.onInputChange
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(redux_form__WEBPACK_IMPORTED_MODULE_1__["Field"], {
        type: "input",
        label: "other common names",
        name: "other_common_names",
        component: _parts_form_fields__WEBPACK_IMPORTED_MODULE_2__["default"],
        onChange: this.props.onInputChange,
        onFocus: this.props.onInputChange
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(redux_form__WEBPACK_IMPORTED_MODULE_1__["Field"], {
        label: "slug",
        name: "slug",
        component: _parts_form_fields__WEBPACK_IMPORTED_MODULE_2__["default"],
        onChange: this.props.onInputChange,
        onFocus: this.props.onInputChange
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(redux_form__WEBPACK_IMPORTED_MODULE_1__["Field"], {
        name: "genus_id",
        label: "genus",
        component: _parts_field_dropdownSelect__WEBPACK_IMPORTED_MODULE_4__["default"],
        selectItems: this.props.treeTables.genuses,
        onChange: this.props.onInputChange,
        onFocus: this.props.onInputChange
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(redux_form__WEBPACK_IMPORTED_MODULE_1__["Field"], {
        label: "specific epithet",
        name: "specific_epithet",
        component: _parts_form_fields__WEBPACK_IMPORTED_MODULE_2__["default"],
        onChange: this.props.onInputChange,
        onFocus: this.props.onInputChange
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(redux_form__WEBPACK_IMPORTED_MODULE_1__["Field"], {
        label: "other species",
        name: "other_species",
        component: _parts_form_fields__WEBPACK_IMPORTED_MODULE_2__["default"],
        onChange: this.props.onInputChange,
        onFocus: this.props.onInputChange
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(redux_form__WEBPACK_IMPORTED_MODULE_1__["Field"], {
        label: "subspecies",
        name: "subspecies",
        component: _parts_form_fields__WEBPACK_IMPORTED_MODULE_2__["default"],
        onChange: this.props.onInputChange,
        onFocus: this.props.onInputChange
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(redux_form__WEBPACK_IMPORTED_MODULE_1__["Field"], {
        label: "variety",
        name: "variety",
        component: _parts_form_fields__WEBPACK_IMPORTED_MODULE_2__["default"],
        onChange: this.props.onInputChange,
        onFocus: this.props.onInputChange
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(redux_form__WEBPACK_IMPORTED_MODULE_1__["Field"], {
        label: "cultivar",
        name: "cultivar",
        component: _parts_form_fields__WEBPACK_IMPORTED_MODULE_2__["default"],
        onChange: this.props.onInputChange,
        onFocus: this.props.onInputChange
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(redux_form__WEBPACK_IMPORTED_MODULE_1__["Field"], {
        name: "trees_category_id",
        label: "category",
        component: _parts_field_dropdownSelect__WEBPACK_IMPORTED_MODULE_4__["default"],
        selectItems: this.props.treeTables.trees_category,
        onChange: this.props.onInputChange,
        onFocus: this.props.onInputChange
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(redux_form__WEBPACK_IMPORTED_MODULE_1__["Field"], {
        label: "zone",
        name: "zone_id",
        component: _parts_field_dropdownSelect__WEBPACK_IMPORTED_MODULE_4__["default"],
        selectItems: this.props.treeTables.zones,
        onChange: this.props.onInputChange,
        onFocus: this.props.onInputChange
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(redux_form__WEBPACK_IMPORTED_MODULE_1__["Field"], {
        name: "origins",
        label: "ecoregions",
        component: _parts_field_multiSelect__WEBPACK_IMPORTED_MODULE_5__["default"],
        selectItems: this.props.treeTables.origins,
        onChange: this.props.onInputChange,
        onFocus: this.props.onInputChange
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(redux_form__WEBPACK_IMPORTED_MODULE_1__["Field"], {
        name: "eco_benefits",
        label: "eco benefits",
        component: _parts_field_multiSelect__WEBPACK_IMPORTED_MODULE_5__["default"],
        selectItems: this.props.treeTables.eco_benefits,
        onChange: this.props.onInputChange,
        onFocus: this.props.onInputChange
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(redux_form__WEBPACK_IMPORTED_MODULE_1__["Field"], {
        name: "native_to",
        label: "native to",
        component: _parts_field_multiSelect__WEBPACK_IMPORTED_MODULE_5__["default"],
        selectItems: this.props.treeTables.native_to,
        onChange: this.props.onInputChange,
        onFocus: this.props.onInputChange
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(redux_form__WEBPACK_IMPORTED_MODULE_1__["Field"], {
        name: "natural_habitat",
        label: "natural habitat",
        component: _parts_field_multiSelect__WEBPACK_IMPORTED_MODULE_5__["default"],
        selectItems: this.props.treeTables.natural_habitat,
        onChange: this.props.onInputChange,
        onFocus: this.props.onInputChange
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(redux_form__WEBPACK_IMPORTED_MODULE_1__["Field"], {
        name: "shapes",
        label: "shapes",
        component: _parts_field_multiSelect__WEBPACK_IMPORTED_MODULE_5__["default"],
        selectItems: this.props.treeTables.shapes,
        onChange: this.props.onInputChange,
        onFocus: this.props.onInputChange
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(redux_form__WEBPACK_IMPORTED_MODULE_1__["Field"], {
        name: "light",
        label: "light",
        component: _parts_field_multiSelect__WEBPACK_IMPORTED_MODULE_5__["default"],
        selectItems: this.props.treeTables.light,
        onChange: this.props.onInputChange,
        onFocus: this.props.onInputChange
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(redux_form__WEBPACK_IMPORTED_MODULE_1__["Field"], {
        label: "height min",
        name: "height_min",
        component: _parts_form_fields__WEBPACK_IMPORTED_MODULE_2__["default"],
        onChange: this.props.onInputChange,
        onFocus: this.props.onInputChange
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(redux_form__WEBPACK_IMPORTED_MODULE_1__["Field"], {
        label: "height max",
        name: "height_max",
        component: _parts_form_fields__WEBPACK_IMPORTED_MODULE_2__["default"],
        onChange: this.props.onInputChange,
        onFocus: this.props.onInputChange
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(redux_form__WEBPACK_IMPORTED_MODULE_1__["Field"], {
        label: "width min",
        name: "width_min",
        component: _parts_form_fields__WEBPACK_IMPORTED_MODULE_2__["default"],
        onChange: this.props.onInputChange,
        onFocus: this.props.onInputChange
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(redux_form__WEBPACK_IMPORTED_MODULE_1__["Field"], {
        label: "width max",
        name: "width_max",
        component: _parts_form_fields__WEBPACK_IMPORTED_MODULE_2__["default"],
        onChange: this.props.onInputChange,
        onFocus: this.props.onInputChange
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(redux_form__WEBPACK_IMPORTED_MODULE_1__["Field"], {
        label: "growth rate",
        name: "growth_rate",
        component: _parts_field_dropdownSelect__WEBPACK_IMPORTED_MODULE_4__["default"],
        selectItems: [{
          id: "slow",
          slug: "slow",
          name: "slow"
        }, {
          id: "medium",
          slug: "medium",
          name: "medium"
        }, {
          id: "fast",
          slug: "fast",
          name: "fast"
        }],
        onChange: this.props.onInputChange,
        onFocus: this.props.onInputChange
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(redux_form__WEBPACK_IMPORTED_MODULE_1__["Field"], {
        label: "lifespan min",
        name: "lifespan_min",
        component: _parts_form_fields__WEBPACK_IMPORTED_MODULE_2__["default"],
        onChange: this.props.onInputChange,
        onFocus: this.props.onInputChange
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(redux_form__WEBPACK_IMPORTED_MODULE_1__["Field"], {
        label: "lifespan max",
        name: "lifespan_max",
        component: _parts_form_fields__WEBPACK_IMPORTED_MODULE_2__["default"],
        onChange: this.props.onInputChange,
        onFocus: this.props.onInputChange
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(redux_form__WEBPACK_IMPORTED_MODULE_1__["Field"], {
        name: "soil",
        label: "soil",
        component: _parts_field_multiSelect__WEBPACK_IMPORTED_MODULE_5__["default"],
        selectItems: this.props.treeTables.soil,
        onChange: this.props.onInputChange,
        onFocus: this.props.onInputChange
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(redux_form__WEBPACK_IMPORTED_MODULE_1__["Field"], {
        name: "common_uses",
        label: "common uses",
        component: _parts_field_multiSelect__WEBPACK_IMPORTED_MODULE_5__["default"],
        selectItems: this.props.treeTables.common_uses,
        onChange: this.props.onInputChange,
        onFocus: this.props.onInputChange
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(redux_form__WEBPACK_IMPORTED_MODULE_1__["Field"], {
        name: "transplanting",
        label: "transplanting",
        component: _parts_field_multiSelect__WEBPACK_IMPORTED_MODULE_5__["default"],
        selectItems: this.props.treeTables.transplanting,
        onChange: this.props.onInputChange,
        onFocus: this.props.onInputChange
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(redux_form__WEBPACK_IMPORTED_MODULE_1__["Field"], {
        name: "unique_attractions",
        label: "unique attractions",
        component: _parts_field_multiSelect__WEBPACK_IMPORTED_MODULE_5__["default"],
        selectItems: this.props.treeTables.unique_attractions,
        onChange: this.props.onInputChange,
        onFocus: this.props.onInputChange
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(redux_form__WEBPACK_IMPORTED_MODULE_1__["Field"], {
        name: "tolerances",
        label: "tolerances",
        component: _parts_field_multiSelect__WEBPACK_IMPORTED_MODULE_5__["default"],
        selectItems: this.props.treeTables.tolerances,
        onChange: this.props.onInputChange,
        onFocus: this.props.onInputChange
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(redux_form__WEBPACK_IMPORTED_MODULE_1__["Field"], {
        name: "reproduction_type_id",
        label: "reproduction types",
        component: _parts_field_dropdownSelect__WEBPACK_IMPORTED_MODULE_4__["default"],
        selectItems: this.props.treeTables.reproduction_types,
        onChange: this.props.onInputChange,
        onFocus: this.props.onInputChange
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(redux_form__WEBPACK_IMPORTED_MODULE_1__["Field"], {
        name: "insects",
        label: "insects",
        component: _parts_field_multiSelect__WEBPACK_IMPORTED_MODULE_5__["default"],
        selectItems: this.props.treeTables.insects,
        onChange: this.props.onInputChange,
        onFocus: this.props.onInputChange
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(redux_form__WEBPACK_IMPORTED_MODULE_1__["Field"], {
        name: "diseases",
        label: "diseases",
        component: _parts_field_multiSelect__WEBPACK_IMPORTED_MODULE_5__["default"],
        selectItems: this.props.treeTables.diseases,
        onChange: this.props.onInputChange,
        onFocus: this.props.onInputChange
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(redux_form__WEBPACK_IMPORTED_MODULE_1__["Field"], {
        type: "textarea",
        label: "body",
        name: "body",
        component: _parts_edit_box__WEBPACK_IMPORTED_MODULE_3__["default"],
        onChange: this.props.onInputChange,
        onFocus: this.props.onInputChange
      }));
    }
  }]);

  return TreeFields;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (TreeFields);

/***/ })

}]);
//# sourceMappingURL=4.react.js.map