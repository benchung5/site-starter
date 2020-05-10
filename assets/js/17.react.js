(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[17],{

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

/***/ }),

/***/ "./src/js/react-app/components/admin/trees/tree_edit.js":
/*!**************************************************************!*\
  !*** ./src/js/react-app/components/admin/trees/tree_edit.js ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var redux_form__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! redux-form */ "./node_modules/redux-form/es/index.js");
/* harmony import */ var _actions_trees__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../actions/trees */ "./src/js/react-app/actions/trees/index.js");
/* harmony import */ var _actions_treeTables__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../actions/treeTables */ "./src/js/react-app/actions/treeTables/index.js");
/* harmony import */ var _sidebar__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../sidebar */ "./src/js/react-app/components/admin/sidebar.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _parts_field_hidden__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../parts/field_hidden */ "./src/js/react-app/components/admin/parts/field_hidden.js");
/* harmony import */ var _parts_uploaded_images__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../parts/uploaded_images */ "./src/js/react-app/components/admin/parts/uploaded_images.js");
/* harmony import */ var _parts_image_field_crop__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../parts/image_field_crop */ "./src/js/react-app/components/admin/parts/image_field_crop.js");
/* harmony import */ var _lib_form_utils__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../lib/form_utils */ "./src/js/react-app/lib/form_utils.js");
/* harmony import */ var _auth_require_auth__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../auth/require_auth */ "./src/js/react-app/components/admin/auth/require_auth.js");
/* harmony import */ var lodash_clone__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! lodash/clone */ "./node_modules/lodash/clone.js");
/* harmony import */ var lodash_clone__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(lodash_clone__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _tree_fields__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./tree_fields */ "./src/js/react-app/components/admin/trees/tree_fields.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }















var EditTree =
/*#__PURE__*/
function (_Component) {
  _inherits(EditTree, _Component);

  function EditTree(props) {
    var _this;

    _classCallCheck(this, EditTree);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(EditTree).call(this, props));
    _this.state = {
      images: [],
      imagesToDelete: [],
      selectedItem: ''
    };
    return _this;
  }

  _createClass(EditTree, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      this.props.fetchTreeTables(); //get initial data to populate the form

      this.props.getTree(this.props.match.params.treeId);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (this.props.treeData && prevProps.treeData !== this.props.treeData) {
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
      this.props.clearUpdateTree();
    }
  }, {
    key: "handleInitialize",
    value: function handleInitialize() {
      var images = lodash_clone__WEBPACK_IMPORTED_MODULE_11___default()(this.props.treeData.images); //store initial images for comparison later

      this.setState({
        images: images
      }); //init images on UploadedImages component

      this.refs.UploadedImages.initImages(images, 'trees'); // set tree values for the fields

      var formData = {
        //still must keep this for the id eventhough it isn't rendered
        'tree_id': this.props.treeData.id,
        'common_name': this.props.treeData.common_name,
        'other_common_names': this.props.treeData.other_common_names,
        'slug': this.props.treeData.slug,
        'specific_epithet': this.props.treeData.specific_epithet,
        'other_species': this.props.treeData.other_species,
        'subspecies': this.props.treeData.subspecies,
        'variety': this.props.treeData.variety,
        'cultivar': this.props.treeData.cultivar,
        'body': this.props.treeData.body,
        'genus_id': this.props.treeData.genus_id,
        'trees_category_id': this.props.treeData.trees_category_id,
        'zone_id': this.props.treeData.zone_id,
        'reproduction_type_id': this.props.treeData.reproduction_type_id,
        'height_min': this.props.treeData.height_min,
        'height_max': this.props.treeData.height_max,
        'width_min': this.props.treeData.width_min,
        'width_max': this.props.treeData.width_max,
        'growth_rate': this.props.treeData.growth_rate,
        'lifespan_min': this.props.treeData.lifespan_min,
        'lifespan_max': this.props.treeData.lifespan_max,
        //multiselects
        'origins': this.formatToMultiselect(this.props.treeData.origins),
        'eco_benefits': this.formatToMultiselect(this.props.treeData.eco_benefits),
        'native_to': this.formatToMultiselect(this.props.treeData.native_to),
        'shapes': this.formatToMultiselect(this.props.treeData.shapes),
        'light': this.formatToMultiselect(this.props.treeData.light),
        'soil': this.formatToMultiselect(this.props.treeData.soil),
        'natural_habitat': this.formatToMultiselect(this.props.treeData.natural_habitat),
        'common_uses': this.formatToMultiselect(this.props.treeData.common_uses),
        'transplanting': this.formatToMultiselect(this.props.treeData.transplanting),
        'unique_attractions': this.formatToMultiselect(this.props.treeData.unique_attractions),
        'tolerances': this.formatToMultiselect(this.props.treeData.tolerances),
        'insects': this.formatToMultiselect(this.props.treeData.insects),
        'diseases': this.formatToMultiselect(this.props.treeData.diseases)
      };
      this.props.initialize(formData);
    } // if form isn't valid redux form will not call this function

  }, {
    key: "handleFormSubmit",
    value: function handleFormSubmit(formProps) {
      var formpropsClone = [];
      formpropsClone = Object(_lib_form_utils__WEBPACK_IMPORTED_MODULE_9__["formatOutFormFields"])(formProps, ['origins', 'eco_benefits', 'native_to', 'shapes', 'light', 'soil', 'natural_habitat', 'common_uses', 'transplanting', 'unique_attractions', 'tolerances', 'insects', 'diseases']); // call action to submit edited

      this.props.updateTree(Object(_lib_form_utils__WEBPACK_IMPORTED_MODULE_9__["createImgFormData"])('new_images', formpropsClone)); //clear deleted images

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
      if (this.props.treeUpdated) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          className: "submission-message"
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "Tree: ", this.props.treeUpdated.common_name, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), "successfully updated."));
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
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_sidebar__WEBPACK_IMPORTED_MODULE_4__["default"], null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "main-window columns small-12 large-9"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", null, "Edit Plant"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("form", {
        onSubmit: handleSubmit(this.handleFormSubmit.bind(this))
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_tree_fields__WEBPACK_IMPORTED_MODULE_12__["default"], {
        treeId: this.props.treeData.id,
        onInputChange: this.onInputChange.bind(this),
        treeTables: this.props.treeTables
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_parts_uploaded_images__WEBPACK_IMPORTED_MODULE_7__["default"], {
        ref: "UploadedImages",
        updateImages: this.updatedImages.bind(this),
        onChange: this.onInputChange.bind(this)
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(redux_form__WEBPACK_IMPORTED_MODULE_1__["Field"], {
        name: "deleted_images",
        component: _parts_field_hidden__WEBPACK_IMPORTED_MODULE_6__["default"]
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(redux_form__WEBPACK_IMPORTED_MODULE_1__["Field"], {
        name: "images",
        component: _parts_field_hidden__WEBPACK_IMPORTED_MODULE_6__["default"]
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_parts_image_field_crop__WEBPACK_IMPORTED_MODULE_8__["default"], {
        name: "new_images",
        label: "New Images",
        classNameLabel: "file-input-label",
        onChange: this.onInputChange.bind(this),
        tags: this.props.treeTables.tags
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        action: "submit",
        className: "btn btn-primary"
      }, "Submit")), this.renderUpdated())));
    }
  }]);

  return EditTree;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

function validate(formProps) {
  var errors = {}; //todo: use the map or foreach to shorten this code

  if (!formProps.common_name) {
    errors.common_name = 'Please enter a common name';
  }

  if (!formProps.slug) {
    errors.slug = 'Please enter a slug';
  } // if (!formProps.trees_category_id) {
  //   errors.trees_category_id = 'Please enter a category';
  // }
  // if (formProps.origins) {
  //     if (formProps.origins.length === 0) {
  //         errors.origins = 'Please enter at least one origin';
  //     }
  // }


  return errors;
}

function mapStateToProps(state, ownProps) {
  var selector = Object(redux_form__WEBPACK_IMPORTED_MODULE_1__["formValueSelector"])('tree-add');
  return {
    treeUpdated: state.tree.treeUpdated,
    treeData: state.tree.treeSingle,
    treeTables: state.treeTables.all
  };
}

/* harmony default export */ __webpack_exports__["default"] = (Object(_auth_require_auth__WEBPACK_IMPORTED_MODULE_10__["default"])(Object(redux_form__WEBPACK_IMPORTED_MODULE_1__["reduxForm"])({
  validate: validate,
  form: 'tree-add',
  fields: ['common_name', 'slug', 'body']
})(Object(react_redux__WEBPACK_IMPORTED_MODULE_5__["connect"])(mapStateToProps, {
  getTree: _actions_trees__WEBPACK_IMPORTED_MODULE_2__["getTree"],
  clearUpdateTree: _actions_trees__WEBPACK_IMPORTED_MODULE_2__["clearUpdateTree"],
  updateTree: _actions_trees__WEBPACK_IMPORTED_MODULE_2__["updateTree"],
  fetchTreeTables: _actions_treeTables__WEBPACK_IMPORTED_MODULE_3__["fetchTreeTables"]
})(EditTree))));

/***/ })

}]);
//# sourceMappingURL=17.react.js.map