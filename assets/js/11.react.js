(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[11],{

/***/ "./src/js/react-app/components/admin/articles/article_edit.js":
/*!********************************************************************!*\
  !*** ./src/js/react-app/components/admin/articles/article_edit.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var redux_form__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! redux-form */ "./node_modules/redux-form/es/index.js");
/* harmony import */ var _actions_articles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../actions/articles */ "./src/js/react-app/actions/articles/index.js");
/* harmony import */ var _actions_categories__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../actions/categories */ "./src/js/react-app/actions/categories/index.js");
/* harmony import */ var _actions_tags__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../actions/tags */ "./src/js/react-app/actions/tags/index.js");
/* harmony import */ var _sidebar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../sidebar */ "./src/js/react-app/components/admin/sidebar.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _article_fields__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./article_fields */ "./src/js/react-app/components/admin/articles/article_fields.js");
/* harmony import */ var _parts_field_hidden__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../parts/field_hidden */ "./src/js/react-app/components/admin/parts/field_hidden.js");
/* harmony import */ var _parts_field_dropdownSelect_fi__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../parts/field_dropdownSelect_fi */ "./src/js/react-app/components/admin/parts/field_dropdownSelect_fi.js");
/* harmony import */ var _parts_uploaded_images__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../parts/uploaded_images */ "./src/js/react-app/components/admin/parts/uploaded_images.js");
/* harmony import */ var _parts_image_field_crop__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../parts/image_field_crop */ "./src/js/react-app/components/admin/parts/image_field_crop.js");
/* harmony import */ var _lib_form_utils__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../lib/form_utils */ "./src/js/react-app/lib/form_utils.js");
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../lib/utils */ "./src/js/react-app/lib/utils.js");
/* harmony import */ var _auth_require_auth__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../auth/require_auth */ "./src/js/react-app/components/admin/auth/require_auth.js");
/* harmony import */ var lodash_clone__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! lodash/clone */ "./node_modules/lodash/clone.js");
/* harmony import */ var lodash_clone__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(lodash_clone__WEBPACK_IMPORTED_MODULE_15__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }


 //import * as actions from '../../actions/articles';
















var EditArticle =
/*#__PURE__*/
function (_Component) {
  _inherits(EditArticle, _Component);

  function EditArticle(props) {
    var _this;

    _classCallCheck(this, EditArticle);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(EditArticle).call(this, props));
    _this.state = {
      images: [],
      imagesToDelete: [],
      selectedItem: ''
    };
    return _this;
  }

  _createClass(EditArticle, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      this.props.fetchCategories();
      this.props.fetchTags(); //get initial data to populate the form

      this.props.getArticle(this.props.match.params.articleId);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (this.props.articleData && prevProps.articleData !== this.props.articleData) {
        this.handleInitialize();
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
      this.props.clearUpdateArticle();
    }
  }, {
    key: "handleInitialize",
    value: function handleInitialize() {
      // //convert to an array
      // let images = [];
      // Object.keys(this.props.articleData.images).forEach((key) => {
      //     images[key] = this.props.articleData.images[key].name;
      // })
      var images = lodash_clone__WEBPACK_IMPORTED_MODULE_15___default()(this.props.articleData.images); //store initial images for comparison later

      this.setState({
        images: images
      }); //init images on UploadedImages component

      this.refs.UploadedImages.initImages(images, 'articles');
      var formData = {
        'name': this.props.articleData.name,
        //still must keep this for the id eventhough it isn't rendered
        'slug': this.props.articleData.slug,
        'category': this.props.articleData.category_id,
        'categories': this.formatToMultiselect(this.props.articleData.categories),
        'tags': this.formatToMultiselect(this.props.articleData.tags),
        'body': this.props.articleData.body,
        'featured_image': this.props.articleData.featured_image
      };
      this.props.initialize(formData);
    } // if form isn't valid redux form will not call this function

  }, {
    key: "handleFormSubmit",
    value: function handleFormSubmit(formProps) {
      var formpropsClone = [];
      formpropsClone = Object(_lib_form_utils__WEBPACK_IMPORTED_MODULE_12__["formatOutFormFields"])(formProps, ['categories', 'tags']); // call action to submit edited

      this.props.updateArticle(Object(_lib_form_utils__WEBPACK_IMPORTED_MODULE_12__["createImgFormData"])('new_images', formpropsClone)); //clear deleted images

      this.props.change('deleted_images', '');
    }
  }, {
    key: "formatToMultiselect",
    value: function formatToMultiselect(inArray) {
      return inArray.map(function (item) {
        return {
          value: item.id,
          label: item.name
        };
      });
    }
  }, {
    key: "renderUpdated",
    value: function renderUpdated() {
      if (this.props.articleUpdated) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          className: "submission-message"
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "Article: ", this.props.articleUpdated.name, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), "successfully updated."));
      }
    }
  }, {
    key: "updatedImages",
    value: function updatedImages(images, deletedImages) {
      var delImages = [];
      Object.keys(deletedImages).forEach(function (key) {
        delImages[key] = deletedImages[key].name;
      });
      this.props.change('deleted_images', delImages.toString()); // update updated_images field with the upated images in string form

      this.props.change('images', JSON.stringify(images));
    }
  }, {
    key: "newImages",
    value: function newImages(images) {
      console.log(images);
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
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", null, "Edit Article"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("form", {
        onSubmit: handleSubmit(this.handleFormSubmit.bind(this))
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_article_fields__WEBPACK_IMPORTED_MODULE_7__["default"], {
        onInputChange: this.onInputChange.bind(this),
        treeTables: this.props.treeTables,
        categories: this.props.categories,
        tags: this.props.tags
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(redux_form__WEBPACK_IMPORTED_MODULE_1__["Field"], {
        name: "featured_image",
        label: "featured image",
        component: _parts_field_dropdownSelect_fi__WEBPACK_IMPORTED_MODULE_9__["default"],
        selectItems: this.state.images,
        onChange: this.onInputChange.bind(this),
        onFocus: this.onInputChange.bind(this)
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_parts_uploaded_images__WEBPACK_IMPORTED_MODULE_10__["default"], {
        ref: "UploadedImages",
        updateImages: this.updatedImages.bind(this),
        onChange: this.onInputChange.bind(this)
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(redux_form__WEBPACK_IMPORTED_MODULE_1__["Field"], {
        name: "deleted_images",
        component: _parts_field_hidden__WEBPACK_IMPORTED_MODULE_8__["default"]
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(redux_form__WEBPACK_IMPORTED_MODULE_1__["Field"], {
        name: "images",
        component: _parts_field_hidden__WEBPACK_IMPORTED_MODULE_8__["default"]
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_parts_image_field_crop__WEBPACK_IMPORTED_MODULE_11__["default"], {
        name: "new_images",
        label: "New Images:",
        classNameLabel: "file-input-label",
        onChange: this.onInputChange.bind(this),
        tags: [{
          id: "1",
          name: "test tag"
        }],
        newImages: this.newImages.bind(this)
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        action: "submit",
        className: "btn btn-primary"
      }, "Submit")), this.renderUpdated())));
    }
  }]);

  return EditArticle;
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
    errors.category = 'Please enter a type';
  }

  if (formProps.categories) {
    if (formProps.categories.length === 0) {
      errors.categories = 'Please enter at least one category';
    }
  }

  return errors;
}

function mapStateToProps(state, ownProps) {
  return {
    articleUpdated: state.article.articleUpdated,
    articleData: state.article.articleSingle,
    categories: state.categories.all,
    tags: state.tags.all
  };
}

/* harmony default export */ __webpack_exports__["default"] = (Object(_auth_require_auth__WEBPACK_IMPORTED_MODULE_14__["default"])(Object(redux_form__WEBPACK_IMPORTED_MODULE_1__["reduxForm"])({
  validate: validate,
  form: 'article-add',
  fields: ['name', 'slug']
})(Object(react_redux__WEBPACK_IMPORTED_MODULE_6__["connect"])(mapStateToProps, {
  getArticle: _actions_articles__WEBPACK_IMPORTED_MODULE_2__["getArticle"],
  clearUpdateArticle: _actions_articles__WEBPACK_IMPORTED_MODULE_2__["clearUpdateArticle"],
  updateArticle: _actions_articles__WEBPACK_IMPORTED_MODULE_2__["updateArticle"],
  fetchTags: _actions_tags__WEBPACK_IMPORTED_MODULE_4__["fetchTags"],
  fetchCategories: _actions_categories__WEBPACK_IMPORTED_MODULE_3__["fetchCategories"]
})(EditArticle))));

/***/ }),

/***/ "./src/js/react-app/components/admin/parts/field_dropdownSelect_fi.js":
/*!****************************************************************************!*\
  !*** ./src/js/react-app/components/admin/parts/field_dropdownSelect_fi.js ***!
  \****************************************************************************/
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

//temporary fix component is a duplicate of dropdown_select except the valu is item.name instead of item.id
//had to do this because in this version of redux form youo can't access the form field's component with custom props :(


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
          value: item.name
        }, item.name);
      });
    }
  }, {
    key: "render",
    value: function render() {
      console.log(this.props.customProps);
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

/***/ "./src/js/react-app/components/admin/parts/uploaded_images.js":
/*!********************************************************************!*\
  !*** ./src/js/react-app/components/admin/parts/uploaded_images.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash_clone__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/clone */ "./node_modules/lodash/clone.js");
/* harmony import */ var lodash_clone__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_clone__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lib_stringUtils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../lib/stringUtils */ "./src/js/react-app/lib/stringUtils.js");
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

var UPLOADS_PATH = __webpack_require__(/*! ../../../config */ "./src/js/react-app/config.js")[env].UPLOADS_PATH;

var UploadedImages =
/*#__PURE__*/
function (_Component) {
  _inherits(UploadedImages, _Component);

  function UploadedImages(props) {
    var _this;

    _classCallCheck(this, UploadedImages);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(UploadedImages).call(this, props));
    _this.state = {
      images: [],
      deletedImages: []
    };
    _this.refType = '';
    return _this;
  }

  _createClass(UploadedImages, [{
    key: "onDeleteClick",
    value: function onDeleteClick(index) {
      //callback updated
      this.props.onChange(); //remove image at index

      var updatedImages = lodash_clone__WEBPACK_IMPORTED_MODULE_1___default()(this.state.images);
      updatedImages.splice(index, 1);
      var deletedImages = lodash_clone__WEBPACK_IMPORTED_MODULE_1___default()(this.state.deletedImages);
      var imageDeleted = lodash_clone__WEBPACK_IMPORTED_MODULE_1___default()(this.state.images[index]);
      deletedImages.push(imageDeleted); //update local state

      this.setState({
        images: updatedImages
      });
      this.setState({
        deletedImages: deletedImages
      }); //update parent

      this.props.updateImages(updatedImages, deletedImages);
    }
  }, {
    key: "onCopyClick",
    value: function onCopyClick(item) {
      var imgStr = '<img alt="' + item.description + '" src="/uploads/' + this.refType + '/' + item.name + '" />';
      Object(_lib_stringUtils__WEBPACK_IMPORTED_MODULE_2__["copyStringToClipboard"])(imgStr);
    }
  }, {
    key: "initImages",
    value: function initImages(images, ref_type) {
      var _this2 = this;

      this.refType = ref_type;
      this.setState({
        images: images
      }, function () {
        //sent initial state back to parent to avoid it 
        //being empty if one doesn't delete
        _this2.props.updateImages(images, []);
      });
    }
  }, {
    key: "renderImages",
    value: function renderImages() {
      var _this3 = this;

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "drop-preview-wrapper"
      }, this.state.images.map(function (item, index) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          key: index,
          className: "drop-preview"
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
          href: "#",
          className: "close-btn",
          onClick: _this3.onDeleteClick.bind(_this3, index)
        }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
          className: "copy-btn",
          onClick: _this3.onCopyClick.bind(_this3, item)
        }, "copy"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
          className: "drop-img-preview",
          src: '/uploads/' + _this3.refType + '/' + Object(_lib_stringUtils__WEBPACK_IMPORTED_MODULE_2__["imgName"])(item.name, 'small')
        }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          className: "desc"
        }, item.name, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), item.tag_name && 'tag: ' + item.tag_name));
      }));
    }
  }, {
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, this.renderImages());
    }
  }]);

  return UploadedImages;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (UploadedImages);

/***/ })

}]);
//# sourceMappingURL=11.react.js.map