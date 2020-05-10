(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[19],{

/***/ "./src/js/react-app/components/admin/articles/article_add.js":
/*!*******************************************************************!*\
  !*** ./src/js/react-app/components/admin/articles/article_add.js ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var redux_form__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! redux-form */ "./node_modules/redux-form/es/index.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _actions_articles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../actions/articles */ "./src/js/react-app/actions/articles/index.js");
/* harmony import */ var _actions_categories__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../actions/categories */ "./src/js/react-app/actions/categories/index.js");
/* harmony import */ var _actions_tags__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../actions/tags */ "./src/js/react-app/actions/tags/index.js");
/* harmony import */ var _sidebar__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../sidebar */ "./src/js/react-app/components/admin/sidebar.js");
/* harmony import */ var _article_fields__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./article_fields */ "./src/js/react-app/components/admin/articles/article_fields.js");
/* harmony import */ var _parts_image_field_crop__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../parts/image_field_crop */ "./src/js/react-app/components/admin/parts/image_field_crop.js");
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../lib/utils */ "./src/js/react-app/lib/utils.js");
/* harmony import */ var _lib_form_utils__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../lib/form_utils */ "./src/js/react-app/lib/form_utils.js");
/* harmony import */ var _auth_require_auth__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../auth/require_auth */ "./src/js/react-app/components/admin/auth/require_auth.js");
/* harmony import */ var lodash_clone__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! lodash/clone */ "./node_modules/lodash/clone.js");
/* harmony import */ var lodash_clone__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(lodash_clone__WEBPACK_IMPORTED_MODULE_12__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }















var AddArticle =
/*#__PURE__*/
function (_Component) {
  _inherits(AddArticle, _Component);

  function AddArticle(props) {
    var _this;

    _classCallCheck(this, AddArticle);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(AddArticle).call(this, props));
    _this.state = {
      // store the most recent value 
      // since category turns to undefined after first form submit
      recentValue: ''
    };
    return _this;
  }

  _createClass(AddArticle, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      this.props.fetchCategories();
      this.props.fetchTags();
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      // if newly navigated from the router link...
      if (nextProps.location !== this.props.location) {
        //clear the form fields
        this.props.reset('article-add'); //clear messages

        this.clearMessages();
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      //clear out error messsages if any
      if (this.props.articleAdded && prevProps.articleAdded !== this.props.articleAdded) {
        this.props.addArticleError('');
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
      this.props.clearArticle();
      this.props.addArticleError('');
    } // if form isn't valit redux form will not call this function

  }, {
    key: "handleFormSubmit",
    value: function handleFormSubmit(formProps) {
      var formpropsClone = [];
      formpropsClone = Object(_lib_form_utils__WEBPACK_IMPORTED_MODULE_10__["formatOutFormFields"])(formProps, ['categories', 'tags']); // call action to submit edited

      this.props.addArticle(Object(_lib_form_utils__WEBPACK_IMPORTED_MODULE_10__["createImgFormData"])('images', formpropsClone));
    }
  }, {
    key: "renderAdded",
    value: function renderAdded() {
      //only render if there's no error message
      if (this.props.articleAdded && !this.props.errorMessage) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          className: "submission-message"
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "Article: ", this.props.articleAdded.name, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), "successfully added. "));
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
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_sidebar__WEBPACK_IMPORTED_MODULE_6__["default"], null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "main-window columns small-12 large-9"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", null, "Add Article"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("form", {
        onSubmit: handleSubmit(this.handleFormSubmit.bind(this))
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_article_fields__WEBPACK_IMPORTED_MODULE_7__["default"], {
        onInputChange: this.onInputChange.bind(this),
        treeTables: this.props.treeTables,
        categories: this.props.categories,
        tags: this.props.tags
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_parts_image_field_crop__WEBPACK_IMPORTED_MODULE_8__["default"], {
        name: "images",
        classNameLabel: "file-input-label",
        onChange: this.onInputChange.bind(this),
        tags: this.props.tags
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        action: "submit",
        className: "btn btn-primary"
      }, "Submit")), this.renderAdded(), this.renderError())));
    }
  }]);

  return AddArticle;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

function validate(formProps) {
  var errors = {}; //todo: use the map or foreach to shorten this code

  if (!formProps.name) {
    errors.name = 'Please enter a name';
  }

  if (!formProps.slug) {
    errors.slug = 'Please enter a slug';
  }

  if (!formProps.category) {
    errors.category = 'Please enter a category';
  }

  if (!formProps.categories) {
    errors.categories = 'Please enter at least one category';
  }

  return errors;
}

function mapStateToProps(state) {
  return {
    articleAdded: state.article.articleAdded,
    errorMessage: state.article.addArticleError,
    categories: state.categories.all,
    tags: state.tags.all
  };
}

/* harmony default export */ __webpack_exports__["default"] = (Object(_auth_require_auth__WEBPACK_IMPORTED_MODULE_11__["default"])(Object(redux_form__WEBPACK_IMPORTED_MODULE_1__["reduxForm"])({
  validate: validate,
  form: 'article-add',
  fields: ['name', 'slug', 'files']
})(Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, {
  addArticle: _actions_articles__WEBPACK_IMPORTED_MODULE_3__["addArticle"],
  clearArticle: _actions_articles__WEBPACK_IMPORTED_MODULE_3__["clearArticle"],
  addArticleError: _actions_articles__WEBPACK_IMPORTED_MODULE_3__["addArticleError"],
  fetchCategories: _actions_categories__WEBPACK_IMPORTED_MODULE_4__["fetchCategories"],
  fetchTags: _actions_tags__WEBPACK_IMPORTED_MODULE_5__["fetchTags"],
  reset: redux_form__WEBPACK_IMPORTED_MODULE_1__["reset"]
})(AddArticle))));

/***/ })

}]);
//# sourceMappingURL=19.react.js.map