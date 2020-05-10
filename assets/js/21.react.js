(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[21],{

/***/ "./src/js/react-app/components/admin/trees/tree_add.js":
/*!*************************************************************!*\
  !*** ./src/js/react-app/components/admin/trees/tree_add.js ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var redux_form__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! redux-form */ "./node_modules/redux-form/es/index.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _actions_trees__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../actions/trees */ "./src/js/react-app/actions/trees/index.js");
/* harmony import */ var _actions_treeTables__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../actions/treeTables */ "./src/js/react-app/actions/treeTables/index.js");
/* harmony import */ var _sidebar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../sidebar */ "./src/js/react-app/components/admin/sidebar.js");
/* harmony import */ var _parts_image_field_crop__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../parts/image_field_crop */ "./src/js/react-app/components/admin/parts/image_field_crop.js");
/* harmony import */ var _lib_form_utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../lib/form_utils */ "./src/js/react-app/lib/form_utils.js");
/* harmony import */ var _auth_require_auth__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../auth/require_auth */ "./src/js/react-app/components/admin/auth/require_auth.js");
/* harmony import */ var _tree_fields__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./tree_fields */ "./src/js/react-app/components/admin/trees/tree_fields.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }












var AddTree =
/*#__PURE__*/
function (_Component) {
  _inherits(AddTree, _Component);

  function AddTree(props) {
    var _this;

    _classCallCheck(this, AddTree);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(AddTree).call(this, props));
    _this.state = {
      // store the most recent value 
      // since theme turns to undefined after first form submit
      recentValue: ''
    };
    return _this;
  }

  _createClass(AddTree, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      this.props.fetchTreeTables();
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      // if newly navigated from the router link...
      if (nextProps.location !== this.props.location) {
        //clear the form fields
        this.props.reset('tree-add'); //clear messages

        this.clearMessages();
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      //clear out error messsages if any
      if (this.props.treeAdded && prevProps.treeAdded !== this.props.treeAdded) {
        this.props.addTreeError('');
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      //clear messages when navigating away
      this.clearMessages();
    }
  }, {
    key: "clearMessages",
    value: function clearMessages() {
      this.props.clearTree();
      this.props.addTreeError('');
    } // if form isn't valit redux form will not call this function

  }, {
    key: "handleFormSubmit",
    value: function handleFormSubmit(formProps) {
      var formpropsClone = [];
      formpropsClone = Object(_lib_form_utils__WEBPACK_IMPORTED_MODULE_7__["formatOutFormFields"])(formProps, ['origins', 'eco_benefits', 'native_to', 'shapes', 'light', 'soil', 'natural_habitat', 'common_uses', 'transplanting', 'unique_attractions', 'tolerances', 'insects', 'diseases']); // call action to submit edited

      this.props.addTree(Object(_lib_form_utils__WEBPACK_IMPORTED_MODULE_7__["createImgFormData"])('images', formpropsClone));
    }
  }, {
    key: "renderAdded",
    value: function renderAdded() {
      //only render if there's no error message
      if (this.props.treeAdded && !this.props.errorMessage) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          className: "submission-message"
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "Tree: ", this.props.treeAdded.common_name, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), "successfully added. "));
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

      if (this.customError) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          className: "alert alert-danger"
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("strong", null, "Oops!"), " ", this.customError);
      }
    }
  }, {
    key: "onInputChange",
    value: function onInputChange() {
      this.clearMessages();
    }
  }, {
    key: "render",
    value: function render() {
      var handleSubmit = this.props.handleSubmit;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "admin-main"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "row"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_sidebar__WEBPACK_IMPORTED_MODULE_5__["default"], null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "main-window columns small-12 large-9"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", null, "Add Plant"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("form", {
        onSubmit: handleSubmit(this.handleFormSubmit.bind(this))
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_tree_fields__WEBPACK_IMPORTED_MODULE_9__["default"], {
        onInputChange: this.onInputChange.bind(this),
        treeTables: this.props.treeTables
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_parts_image_field_crop__WEBPACK_IMPORTED_MODULE_6__["default"], {
        name: "images",
        classNameLabel: "file-input-label",
        onChange: this.onInputChange.bind(this),
        tags: this.props.treeTables.tags
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        action: "submit",
        className: "btn btn-primary"
      }, "Submit")), this.renderAdded(), this.renderError())));
    }
  }]);

  return AddTree;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

function validate(formProps) {
  var errors = {}; //todo: use the map or foreach to shorten this code

  if (!formProps.name) {
    errors.name = 'Please enter a name';
  }

  if (!formProps.slug) {
    errors.slug = 'Please enter a slug';
  } // if (!formProps.genus_id) {
  //   errors.genus_id = 'Please enter a genus';
  // }
  // if (!formProps.specific_epithet) {
  //   errors.specific_epithet = 'Please enter a specific epithet';
  // }
  // if (!formProps.trees_category_id) {
  //   errors.trees_category_id = 'Please enter a tree category';
  // }
  // if (!formProps.origins) {
  //    errors.origins = 'Please enter at least one origin';
  // }


  return errors;
}

function mapStateToProps(state) {
  return {
    treeAdded: state.tree.treeAdded,
    errorMessage: state.tree.addTreeError,
    treeTables: state.treeTables.all
  };
}

/* harmony default export */ __webpack_exports__["default"] = (Object(_auth_require_auth__WEBPACK_IMPORTED_MODULE_8__["default"])(Object(redux_form__WEBPACK_IMPORTED_MODULE_1__["reduxForm"])({
  validate: validate,
  form: 'tree-add',
  fields: ['name', 'slug', 'files']
})(Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, {
  addTree: _actions_trees__WEBPACK_IMPORTED_MODULE_3__["addTree"],
  clearTree: _actions_trees__WEBPACK_IMPORTED_MODULE_3__["clearTree"],
  addTreeError: _actions_trees__WEBPACK_IMPORTED_MODULE_3__["addTreeError"],
  fetchTreeTables: _actions_treeTables__WEBPACK_IMPORTED_MODULE_4__["fetchTreeTables"],
  reset: redux_form__WEBPACK_IMPORTED_MODULE_1__["reset"]
})(AddTree))));

/***/ })

}]);
//# sourceMappingURL=21.react.js.map