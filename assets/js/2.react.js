(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[2],{

/***/ "./src/js/react-app/components/admin/parts/edit_box.js":
/*!*************************************************************!*\
  !*** ./src/js/react-app/components/admin/parts/edit_box.js ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



var EditBox =
/*#__PURE__*/
function (_Component) {
  _inherits(EditBox, _Component);

  function EditBox(props) {
    var _this;

    _classCallCheck(this, EditBox);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(EditBox).call(this, props));
    _this.state = {};
    return _this;
  }

  _createClass(EditBox, [{
    key: "onTextAreaChange",
    value: function onTextAreaChange(inputValue) {
      this.updateRedux(inputValue);
    }
  }, {
    key: "onSecHeadingClick",
    value: function onSecHeadingClick(e) {
      e.stopPropagation();
      e.preventDefault();
      this.wrapTextInElement('h3');
    }
  }, {
    key: "onParagraphClick",
    value: function onParagraphClick(e) {
      e.stopPropagation();
      e.preventDefault();
      this.wrapTextInElement('p');
    }
  }, {
    key: "onUlClick",
    value: function onUlClick(e) {
      e.stopPropagation();
      e.preventDefault();

      if (this.props.input.value) {
        //get the current highlighted text
        var selObj = window.getSelection();
        var selectedText = selObj.toString(); //insert <li> elements at beginning of lines

        var wrappedText = ' <li>' + selectedText.replace(/(?:\n|\r)/g, '\n <li>'); //insert </li> elements at line breaks

        wrappedText = wrappedText.replace(/(?:\n|\r)/g, '</li>\n') + '</li>\n'; //remove the last \n

        wrappedText = wrappedText.replace(/(?:\n)$/g, ''); //wrap it all in a ul

        wrappedText = '<ul>\n' + wrappedText + '\n</ul>';
        this.updateTextArea(wrappedText, selectedText);
      }
    }
  }, {
    key: "wrapTextInElement",
    value: function wrapTextInElement(element) {
      if (this.props.input.value) {
        //get the current highlighted text
        var selObj = window.getSelection();
        var selectedText = selObj.toString();
        var wrappedText = '<' + element + '>' + selectedText + '</' + element + '>';
        this.updateTextArea(wrappedText, selectedText);
      }
    }
  }, {
    key: "onFigureClick",
    value: function onFigureClick(e) {
      e.stopPropagation();
      e.preventDefault(); //get the current highlighted text

      var selObj = window.getSelection();
      var selectedText = selObj.toString();

      if (this.props.input.value) {
        var wrappedText = '<figure>\n' + selectedText + '\n<figcaption></figcaption>\n</figure>';
        this.updateTextArea(wrappedText, selectedText);
      }
    }
  }, {
    key: "onClearClick",
    value: function onClearClick(e) {
      e.stopPropagation();
      e.preventDefault(); //get the current highlighted text

      var selObj = window.getSelection();
      var selectedText = selObj.toString();

      if (this.props.input.value) {
        var wrappedText = '<div class="clear"></div>';
        this.updateTextArea(wrappedText, selectedText);
      }
    }
  }, {
    key: "updateTextArea",
    value: function updateTextArea(newText, selectedText) {
      //get the character index of the selected text
      this.refs.textBox.selectionStart;

      String.prototype.replaceAt = function (index, replacement) {
        return this.substr(0, index) + replacement + this.substr(index + selectedText.length);
      };

      var fieldValue = this.props.input.value.slice();
      var replacedBodyText = fieldValue.replaceAt(this.refs.textBox.selectionStart, newText);
      this.updateRedux(replacedBodyText);
    }
  }, {
    key: "updateRedux",
    value: function updateRedux(newValue) {
      //must update the value this\n way for redux form to pick up on it when submitting
      //it will also then re-propogate the value through to this.props.input.value
      this.props.input.onChange(newValue);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: this.props.className
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", null, this.props.input.label), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        onClick: this.onSecHeadingClick.bind(this)
      }, "h3"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        onClick: this.onParagraphClick.bind(this)
      }, "p"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        onClick: this.onUlClick.bind(this)
      }, "ul"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        onClick: this.onFigureClick.bind(this)
      }, "figure"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        onClick: this.onClearClick.bind(this)
      }, "clear"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("textarea", {
        ref: "textBox",
        className: "form-control",
        rows: "12",
        cols: "50",
        name: this.props.input.name,
        value: this.props.input.value,
        onChange: function onChange(e) {
          return _this2.onTextAreaChange(e.target.value);
        }
      }));
    }
  }]);

  return EditBox;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (EditBox);

/***/ }),

/***/ "./src/js/react-app/components/admin/parts/field_multiSelect.js":
/*!**********************************************************************!*\
  !*** ./src/js/react-app/components/admin/parts/field_multiSelect.js ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_select__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-select */ "./node_modules/react-select/dist/react-select.browser.esm.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }


 //import 'react-select/dist/react-select.css';

var MultiSelect =
/*#__PURE__*/
function (_Component) {
  _inherits(MultiSelect, _Component);

  function MultiSelect(props) {
    var _this;

    _classCallCheck(this, MultiSelect);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(MultiSelect).call(this, props));
    _this.state = {// currentVal = []
    };
    return _this;
  }

  _createClass(MultiSelect, [{
    key: "handleChange",
    value: function handleChange(val) {
      //must manually update this value for multiselect
      this.props.input.onChange(val);
    }
  }, {
    key: "renderSelectOptions",
    value: function renderSelectOptions() {
      return this.props.selectItems.map(function (item) {
        return {
          value: item.id,
          label: item.name
        };
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
      var className = "form-group multiselect ".concat(touched && error ? 'has-danger' : '');
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: className
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
        htmlFor: label
      }, label), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_select__WEBPACK_IMPORTED_MODULE_1__["default"], {
        name: "form-field-name",
        value: this.props.input.value,
        options: this.renderSelectOptions(),
        onChange: this.handleChange.bind(this),
        onBlur: function onBlur() {
          return input.onBlur(input.value);
        },
        multi: true,
        joinValues: true
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "error"
      }, touched ? error : ''));
    }
  }]);

  return MultiSelect;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (MultiSelect);

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

/***/ }),

/***/ "./src/js/react-app/components/admin/parts/image_field_crop.js":
/*!*********************************************************************!*\
  !*** ./src/js/react-app/components/admin/parts/image_field_crop.js ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dropzone__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dropzone */ "./node_modules/react-dropzone/dist/es/index.js");
/* harmony import */ var redux_form__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux-form */ "./node_modules/redux-form/es/index.js");
/* harmony import */ var lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lodash/cloneDeep */ "./node_modules/lodash/cloneDeep.js");
/* harmony import */ var lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modal */ "./src/js/react-app/components/admin/parts/modal.js");
/* harmony import */ var react_cropper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-cropper */ "./node_modules/react-cropper/dist/react-cropper.js");
/* harmony import */ var react_cropper__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_cropper__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var cropperjs_dist_cropper_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! cropperjs/dist/cropper.css */ "./node_modules/cropperjs/dist/cropper.css");
/* harmony import */ var cropperjs_dist_cropper_css__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(cropperjs_dist_cropper_css__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var sanitize_filename__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! sanitize-filename */ "./node_modules/sanitize-filename/index.js");
/* harmony import */ var sanitize_filename__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(sanitize_filename__WEBPACK_IMPORTED_MODULE_7__);
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










var FileField =
/*#__PURE__*/
function (_Component) {
  _inherits(FileField, _Component);

  function FileField(props) {
    var _this;

    _classCallCheck(this, FileField);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(FileField).call(this, props));
    _this.state = {
      accepted: [],
      rejected: [],
      croppedOut: [],
      previews: [],
      // usedFileNames: [],
      errors: [],
      imgSrc: null,
      tag_id: '',
      description: ''
    };

    isSubmitting: false;

    _this.maxDropCount = 10; //the final full size image dimensions 
    //(we're only applying the crop to the med image version)

    _this.finalcropWidth = 400;
    _this.finalcropHeight = 400; //the display size for the cropper box

    _this.aspectRatio = 200 / 200;
    _this.cropBoxWidth = 200;
    _this.cropBoxHeight = 200;
    return _this;
  }

  _createClass(FileField, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      //polyfill to <canvasElement>.toBlob for safari, ie
      if (!HTMLCanvasElement.prototype.toBlob) {
        Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
          value: function value(callback, type, quality) {
            var binStr = atob(this.toDataURL(type, quality).split(',')[1]),
                len = binStr.length,
                arr = new Uint8Array(len);

            for (var i = 0; i < len; i++) {
              arr[i] = binStr.charCodeAt(i);
            }

            callback(new Blob([arr], {
              type: type || 'image/jpeg'
            }));
          }
        });
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      //detect that the form has been cleared and clear the images
      if (prevProps.input.value !== this.props.input.value) {
        if (this.props.input.value === '') {
          this.clearImages();
        }
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      //do this to avoid memory leaks
      if (this.state.accepted.length > 0) {
        this.state.accepted.map(function (file) {
          window.URL.revokeObjectURL(file.preview);
        });
      }
    }
  }, {
    key: "clearImages",
    value: function clearImages() {
      //clear croppedOut
      this.setState({
        croppedOut: []
      }); //clear the previews

      this.setState({
        previews: []
      });
    }
  }, {
    key: "validateFileName",
    value: function validateFileName(fileName) {
      //validate file name
      var validatedName = sanitize_filename__WEBPACK_IMPORTED_MODULE_7___default()(fileName); //replace spaces with dashes

      var spacesReplaced = validatedName.replace(/\ +/g, '-'); //remove these characters: ()';

      var bracketsReplaced = spacesReplaced.replace(/(\(|\)|'|;)+/g, ''); //append date
      // var date = new Date().getTime();
      // let finalName = bracketsReplaced.replace(/(\.[\w\d_-]+)$/i, '-' + date + '$1');

      var finalName = bracketsReplaced;
      return finalName;
    }
  }, {
    key: "blobToFile",
    value: function blobToFile(blob) {
      //currently only works for chrome, ff and safari 10.1+
      var file = new File([blob], this.validateFileName(this.state.accepted[0].name));
      return file;
    }
  }, {
    key: "onDrop",
    value: function onDrop(accepted, rejected) {
      var _this2 = this;

      //callback updated
      this.props.input.onChange(); //ondrop is called before onDropRejected
      //clear errors first

      this.setState({
        errors: []
      }); //drop accepted but too many files

      if (accepted.length > this.maxDropCount) {
        accepted = [];
        this.setState({
          errors: ['cannot upload more than ' + this.maxDropCount + ' image at a time']
        }, function () {
          console.log(_this2.state.errors);
        });
      } else if (rejected.length > 0) {//keep this here but let onDropRejected handle it.
      } else {
        // pass image source from react drag and drop to react image crop
        this.setState({
          imgSrc: accepted[0].preview
        }, function () {
          _this2.forceUpdate();

          _this2.refs.modal.openModal();
        });
      } //update state


      this.setState({
        accepted: accepted,
        rejected: rejected
      });
    }
  }, {
    key: "onDropRejected",
    value: function onDropRejected() {
      this.setState({
        errors: ['wrong file type']
      });
    }
  }, {
    key: "onDeleteClick",
    value: function onDeleteClick(index) {
      var _this3 = this;

      //remove it from accepted at it's index
      var croppedOut = lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_3___default()(this.state.croppedOut);
      croppedOut.splice(index, 1);
      this.setState({
        croppedOut: croppedOut
      }, function () {
        //update the final input value
        _this3.props.input.onChange(_this3.state.croppedOut);
      }); //update the previews

      var previews = lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_3___default()(this.state.previews);
      previews.splice(index, 1);
      this.setState({
        previews: previews
      });
    }
  }, {
    key: "onCropSubmit",
    value: function onCropSubmit(e) {
      var _this4 = this;

      e.preventDefault(); //debounce so can't submit two crops while modal is fading off

      if (!this.state.isSubmitting) {
        this.submitCrop();
        this.setState({
          isSubmitting: true
        });
        setTimeout(function () {
          _this4.setState({
            isSubmitting: false
          });
        }, 1000);
      }
    }
  }, {
    key: "submitCrop",
    value: function submitCrop() {
      var _this5 = this;

      if (typeof this.refs.cropper.getCroppedCanvas() === 'undefined') {
        return;
      }

      var canvasEl = this.refs.cropper.getCroppedCanvas({
        // resize the cropped area
        width: this.finalcropWidth,
        height: this.finalcropHeight
      }); // toBlob(callback, mimeType, qualityArgument);

      canvasEl.toBlob(function (blob) {
        // var formData = new FormData();
        // formData.append('croppedImage', blob);
        //update the final input value
        var croppedOut = lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_3___default()(_this5.state.croppedOut);
        croppedOut.push({
          croppedFile: _this5.blobToFile(blob, _this5.state.accepted[0].name),
          originalFile: _this5.state.accepted[0],
          tag_id: _this5.state.tag_id,
          description: _this5.state.description
        });

        _this5.setState({
          croppedOut: croppedOut
        }, function () {
          //update the input value for this field
          _this5.props.input.onChange(_this5.state.croppedOut); //close the modal


          _this5.refs.modal.close();
        }); //update the preview


        var previews = lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_3___default()(_this5.state.previews);
        previews.push(_this5.refs.cropper.getCroppedCanvas().toDataURL('image/jpeg'));

        _this5.setState({
          previews: previews
        });
      }, 'image/jpeg', 0.95);
    }
  }, {
    key: "onCropCancel",
    value: function onCropCancel(e) {
      e.preventDefault(); //close the modal

      this.refs.modal.close();
    }
  }, {
    key: "onTagChange",
    value: function onTagChange(inputValue) {
      this.setState({
        tag_id: inputValue
      });
    }
  }, {
    key: "onDescChange",
    value: function onDescChange(inputValue) {
      this.setState({
        description: inputValue
      });
    }
  }, {
    key: "renderPreview",
    value: function renderPreview() {
      var _this6 = this;

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "drop-preview-wrapper"
      }, this.state.croppedOut.map(function (img, index) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          key: img.croppedFile.name + index,
          className: "drop-preview"
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
          href: "#",
          "data-id": img.croppedFile.name,
          className: "close-btn",
          onClick: _this6.onDeleteClick.bind(_this6, index)
        }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
          className: "drop-img-preview",
          src: _this6.state.previews[index]
        }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          className: "desc"
        }, 'tag_id: ' + img.tag_id));
      }));
    }
  }, {
    key: "renderErrors",
    value: function renderErrors() {
      if (this.state.errors.length > 0) {
        return this.state.errors.map(function (item, index) {
          return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
            key: index
          }, item);
        });
      }
    }
  }, {
    key: "renderSelectOptions",
    value: function renderSelectOptions() {
      return this.props.tags.map(function (item) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
          key: item.id,
          value: item.id
        }, item.name);
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this7 = this;

      var _this$props = this.props,
          className = _this$props.className,
          onChange = _this$props.input.onChange,
          dropzone_options = _this$props.dropzone_options,
          _this$props$meta = _this$props.meta,
          error = _this$props$meta.error,
          touched = _this$props$meta.touched,
          classNameLabel = _this$props.classNameLabel,
          children = _this$props.children,
          name = _this$props.name,
          cbFunction = _this$props.cbFunction;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_dropzone__WEBPACK_IMPORTED_MODULE_1__["default"], {
        className: "dropzone",
        name: name,
        onDrop: this.onDrop.bind(this),
        onDropRejected: this.onDropRejected.bind(this),
        accept: "image/jpeg" //500k allowable upload size
        // maxSize={500000}

      }, function (_ref) {
        var getRootProps = _ref.getRootProps;
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", _extends({}, getRootProps(), {
          className: "instructions"
        }), "Drop files here, or click to select files to upload.", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), "(Only jpeg images will be accepted)");
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_modal__WEBPACK_IMPORTED_MODULE_4__["default"], {
        ref: "modal"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_cropper__WEBPACK_IMPORTED_MODULE_5___default.a, {
        className: "cropper",
        ref: "cropper",
        src: this.state.imgSrc,
        style: {
          width: this.cropBoxWidth,
          height: this.cropBoxHeight
        } // Cropper.js options
        ,
        aspectRatio: this.aspectRatio,
        zoomable: false,
        guides: false,
        preview: ".img-preview",
        autoCropArea: 1 //to force crop to image bounds:
        ,
        viewMode: 2
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("select", {
        className: "dropdown-select",
        onChange: function onChange(e) {
          return _this7.onTagChange(e.target.value);
        },
        name: "tag_id"
      }, this.renderSelectOptions()), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        type: "text",
        onChange: function onChange(e) {
          return _this7.onDescChange(e.target.value);
        },
        placeholder: "description",
        name: "description"
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "cropper-buttons"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        className: "btn",
        onClick: this.onCropSubmit.bind(this)
      }, "crop"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        className: "btn",
        onClick: this.onCropCancel.bind(this)
      }, "cancel"))), this.renderErrors(), this.renderPreview());
    }
  }]);

  return FileField;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]); //this just has to be wrapped in a redux-form Field first before export


/* harmony default export */ __webpack_exports__["default"] = (function (props) {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(redux_form__WEBPACK_IMPORTED_MODULE_2__["Field"], _extends({
    name: "images"
  }, props, {
    component: FileField
  }));
});

/***/ }),

/***/ "./src/js/react-app/components/admin/parts/modal.js":
/*!**********************************************************!*\
  !*** ./src/js/react-app/components/admin/parts/modal.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }


 //implimentation
//in the parent...
// onOpenClick(id) {
//   //open the modal
//   this.refs.modal.openModal();
// }
//pass the portal object to render into.
//use this to render non react components into it (outside new react render tree)
// portalConnect(portal) {
//    scene(portal);
// }
//<Portal ref='modal' portalConnect={this.portalConnect.bind(this)}>
//  <div>new react tree content here...</div>
//</Portal>
//generated output:
//<div id='portal' class='portal transition-opac off'>
//  <div class='in-react'>
//    <div data-reactroot='' class='portal-children'>
//     <div>modal content here...</div>
//    </div>
//  </div>
//  <div class='out-react'>
//    <canvas width='1013' height='674' style='width: 1013px; height: 674px;'></canvas>
//  </div>
//</div>

var Modal =
/*#__PURE__*/
function (_Component) {
  _inherits(Modal, _Component);

  function Modal(props) {
    var _this;

    _classCallCheck(this, Modal);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Modal).call(this, props));
    _this.portal = null;
    _this.inReact = null;
    _this.outReact = null;
    _this.state = {};
    return _this;
  } //we've stopped the render tree


  _createClass(Modal, [{
    key: "render",
    value: function render() {
      //open the portal by rendering nothing that will ever change
      return null;
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      //crete portal
      this.portal = document.createElement('div'); //add classes

      this.portal.id = 'modal';
      this.portal.className = 'modal';
      this.portal.className += ' transition-opac';
      this.portal.className += ' off'; //create element in portal for elements in the new react render tree

      this.inReact = document.createElement('div');
      this.inReact.className = 'in-react';
      this.portal.appendChild(this.inReact);

      if (this.props.portalConnect) {
        //create element in portal for elements not in react render tree
        this.outReact = document.createElement('div');
        this.outReact.className = 'out-react';
        this.portal.appendChild(this.outReact); //pass the out-react container element back to the parent

        this.props.portalConnect(this.outReact);
      } //render the dialog content


      this.renderDialogContent(this.props); //append to the top of the body

      document.body.insertBefore(this.portal, document.body.firstChild);
    } //when get new props also renderDialogContent

  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(newProps) {
      //console.log('this.props.imgSrc: ', this.props.imgSrc);
      //render the children
      this.renderDialogContent(newProps);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.unmountComponentAtNode(this.portal);
      document.body.removeChild(this.portal);
    }
  }, {
    key: "openModal",
    value: function openModal() {
      this.portal.style.display = 'flex';
      var that = this;
      setTimeout(function () {
        that.portal.className = 'modal';
        that.portal.className += ' on';
      }, 100);
    }
  }, {
    key: "close",
    value: function close() {
      this.portal.className = 'modal';
      this.portal.className += ' off';
      var that = this;
      setTimeout(function () {
        that.portal.style.visibility = 'hidden';
        that.portal.style.opacity = '0';
      }, 100);
    }
  }, {
    key: "renderDialogContent",
    value: function renderDialogContent(props) {
      //using ReactDom.render we started a new render tree
      //rendering the children props to the portal we created
      react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.render(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, this.props.children), this.inReact);
    }
  }]);

  return Modal;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (Modal);

/***/ }),

/***/ "./src/js/react-app/lib/form_utils.js":
/*!********************************************!*\
  !*** ./src/js/react-app/lib/form_utils.js ***!
  \********************************************/
/*! exports provided: createImgFormData, formatOutFormFields */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createImgFormData", function() { return createImgFormData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatOutFormFields", function() { return formatOutFormFields; });
/* harmony import */ var lodash_clone__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/clone */ "./node_modules/lodash/clone.js");
/* harmony import */ var lodash_clone__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_clone__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "./src/js/react-app/lib/utils.js");


function createImgFormData(imgFieldName, formProps) {
  // convert to mulipart form data
  var formData = new FormData(); // append regular fields to formData first

  Object.keys(formProps).forEach(function (key) {
    if (key !== imgFieldName) {
      formData.append(key, formProps[key]);
    }
  });
  Object.keys(formProps).forEach(function (key) {
    if (key === imgFieldName) {
      formProps[key].forEach(function (item, index) {
        // append original image fields to formData
        formData.append('image' + '_' + index + '_original', item.originalFile); // append cropped image fields to formData

        formData.append('image' + '_' + index + '_cropped', item.croppedFile);
      });
    }
  }); // append image info to formData

  Object.keys(formProps).forEach(function (key) {
    if (key === imgFieldName) {
      formProps[key].forEach(function (item, index) {
        formData.append('image' + '_' + index + '_info', [item.tag_id, item.description]);
      });
    }
  }); // // Display the key/value pairs
  // for (var pair of formData.entries()) {
  //     console.log(pair[0]+ ', ' + pair[1]); 
  // }

  return formData;
}
function formatOutFormFields(formProps, multiselectFields) {
  //prepare form data to be sent over the network prperly
  var formpropsClone = lodash_clone__WEBPACK_IMPORTED_MODULE_0___default()(formProps); //convert null values to empty strings

  Object.keys(formpropsClone).forEach(function (key) {
    if (formpropsClone[key] == null) {
      formpropsClone[key] = "";
    }
  }); //convert arrays to comma separated strings

  multiselectFields.map(function (field) {
    var arr = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["flattenObjArray"])(formpropsClone[field], 'value');

    if (arr) {
      formpropsClone[field] = arr.toString();
    }
  });
  return formpropsClone;
}

/***/ })

}]);
//# sourceMappingURL=2.react.js.map