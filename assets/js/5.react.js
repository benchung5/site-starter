(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[5],{

/***/ "./src/js/react-app/actions/articles/index.js":
/*!****************************************************!*\
  !*** ./src/js/react-app/actions/articles/index.js ***!
  \****************************************************/
/*! exports provided: fetchArticles, getArticle, addArticle, updateArticle, deleteArticle, duplicateArticle, clearArticle, clearArticleError, clearUpdateArticle, addArticleError, updateArticleError */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Promise) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchArticles", function() { return fetchArticles; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getArticle", function() { return getArticle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addArticle", function() { return addArticle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateArticle", function() { return updateArticle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deleteArticle", function() { return deleteArticle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "duplicateArticle", function() { return duplicateArticle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clearArticle", function() { return clearArticle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clearArticleError", function() { return clearArticleError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clearUpdateArticle", function() { return clearUpdateArticle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addArticleError", function() { return addArticleError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateArticleError", function() { return updateArticleError; });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _global__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../global */ "./src/js/react-app/actions/global/index.js");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../types */ "./src/js/react-app/actions/types.js");

 //config

var env = "development" || false;

var SERVER_URL = __webpack_require__(/*! ../../config */ "./src/js/react-app/config.js")[env].SERVER_URL;


function fetchArticles() {
  return function (dispatch) {
    axios__WEBPACK_IMPORTED_MODULE_0___default.a.get("".concat(SERVER_URL, "/articles/all")).then(function (response) {
      dispatch({
        type: _types__WEBPACK_IMPORTED_MODULE_2__["FETCH_ARTICLES"],
        payload: response.data
      });
      return Promise.resolve();
    }).catch(function (err) {
      console.log('error fetching articles', err); //todo: if request is bad
      // dispatch(fetchArticlesError('response.data.error'));
    });
  };
}
function getArticle(slug) {
  return function (dispatch) {
    axios__WEBPACK_IMPORTED_MODULE_0___default.a.get("".concat(SERVER_URL, "/articles/single/").concat(slug)).then(function (response) {
      //if no response data, return a formatted object
      var data = {};

      if (!response.data) {
        data = {
          category: [],
          themes: [],
          // make images null so we know it's an intentional clear
          // an empty array makes it show the placeholder image
          images: null
        };
      } else {
        data = response.data;
      }

      dispatch({
        type: _types__WEBPACK_IMPORTED_MODULE_2__["GET_ARTICLE"],
        payload: data
      });
    }).catch(function (err) {
      console.log('error getting article: ', err);
    });
  };
}
function addArticle(formData) {
  //needed for image file submission
  var config = {
    headers: {
      'content-type': 'multipart/form-data'
    }
  };
  return function (dispatch) {
    axios__WEBPACK_IMPORTED_MODULE_0___default.a.post("".concat(SERVER_URL, "/articles/create"), formData, config).then(function (response) {
      if (response.data.error) {
        dispatch(addArticleError("There was an error creating the article: ".concat(response.data.error)));
      } else {
        dispatch({
          type: _types__WEBPACK_IMPORTED_MODULE_2__["ADD_ARTICLE"],
          payload: response.data
        });
      }
    }).catch(function (err) {
      dispatch(addArticleError("there was an error creating the article: ".concat(err)));
    });
  };
}
function updateArticle(formData) {
  //needed for image file submission
  var config = {
    headers: {
      'content-type': 'multipart/form-data'
    }
  };
  return function (dispatch) {
    // post to http://192.168.99.100/api/articles/update
    axios__WEBPACK_IMPORTED_MODULE_0___default.a.post("".concat(SERVER_URL, "/articles/update"), formData, config).then(function (response) {
      if (response.data.error) {
        dispatch(updateArticleError("there was an error updating the article: ".concat(response.data.error)));
      } else {
        dispatch({
          type: _types__WEBPACK_IMPORTED_MODULE_2__["UPDATE_ARTICLE"],
          payload: response.data
        });
      }
    }).catch(function (err) {
      console.log('there was an error updating the article: ', err); //dispatch(updateArticleError(`there was an error updating the article: ${err}`));
    });
  };
}
function deleteArticle(article, search, offset, limit) {
  return function (dispatch, getState) {
    // post to http://192.168.99.100/articles/delete
    axios__WEBPACK_IMPORTED_MODULE_0___default.a.post("".concat(SERVER_URL, "/articles/delete"), {
      article: article
    }).then(function (response) {
      if (response.data.error) {
        console.log('error: ', response.data.error); //dispatch(deleteArticleError(`there was an error deleting the article: ${response.data.error}`));
      } else {
        //get the new list of articles now that one is deleted
        dispatch(Object(_global__WEBPACK_IMPORTED_MODULE_1__["searchArticles"])(getState().global));
      }
    }).catch(function (err) {
      console.log('error deleting the article: ', err);
    });
  };
}
function duplicateArticle(slug, search, offset, limit) {
  return function (dispatch) {
    // post to http://192.168.99.100/articles/delete
    axios__WEBPACK_IMPORTED_MODULE_0___default.a.post("".concat(SERVER_URL, "/articles/duplicate"), {
      slug: slug
    }).then(function (response) {
      if (response.data.error) {
        console.log('error: ', response.data.error); //dispatch(duplicateArticleError(`there was an error duplicating the article: ${response.data.error}`));
      } else {
        //get the new list of articles now that one is deleted
        dispatch(Object(_global__WEBPACK_IMPORTED_MODULE_1__["searchArticles"])(getState().global()));
      }
    }).catch(function (err) {
      console.log('error duplicating the article: ', err);
    });
  };
}
function clearArticle() {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_2__["ADD_ARTICLE"],
    payload: ''
  };
}
function clearArticleError(error) {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_2__["ADD_ARTICLE_ERROR"],
    payload: ''
  };
}
function clearUpdateArticle() {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_2__["UPDATE_ARTICLE"],
    payload: ''
  };
}
function addArticleError(error) {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_2__["ADD_ARTICLE_ERROR"],
    payload: error
  };
}
function updateArticleError(error) {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_2__["UPDATE_ARTICLE_ERROR"],
    payload: error
  };
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! es6-promise-promise */ "./node_modules/es6-promise-promise/index.js")))

/***/ }),

/***/ "./src/js/react-app/actions/tags/index.js":
/*!************************************************!*\
  !*** ./src/js/react-app/actions/tags/index.js ***!
  \************************************************/
/*! exports provided: addCategory, fetchTags, deleteCategory, getCategory, updateCategory, clearUpdateCategory, clearCategory, addCategoryError */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addCategory", function() { return addCategory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchTags", function() { return fetchTags; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deleteCategory", function() { return deleteCategory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCategory", function() { return getCategory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateCategory", function() { return updateCategory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clearUpdateCategory", function() { return clearUpdateCategory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clearCategory", function() { return clearCategory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addCategoryError", function() { return addCategoryError; });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../types */ "./src/js/react-app/actions/types.js");
 //config

var env = "development" || false;

var SERVER_URL = __webpack_require__(/*! ../../config */ "./src/js/react-app/config.js")[env].SERVER_URL;


function addCategory(formData) {
  return function (dispatch) {
    // post to: http://localhost:8080/api/tags/create
    axios__WEBPACK_IMPORTED_MODULE_0___default.a.post("".concat(SERVER_URL, "/tags/create"), formData).then(function (response) {
      if (response.data.error) {
        dispatch(addCategoryError("there was an error adding the tag: ".concat(response.data.error)));
      } else {
        dispatch({
          type: _types__WEBPACK_IMPORTED_MODULE_1__["ADD_TAG"],
          payload: response.data
        });
      }
    }).catch(function (err) {
      //todo: if request is bad
      dispatch(addCategoryError("there was an error adding the tag: ".concat(err)));
    });
  };
}
function fetchTags() {
  return function (dispatch) {
    axios__WEBPACK_IMPORTED_MODULE_0___default.a.get("".concat(SERVER_URL, "/tags/all")).then(function (response) {
      dispatch({
        type: _types__WEBPACK_IMPORTED_MODULE_1__["FETCH_TAGS"],
        payload: response.data
      });
    }).catch(function (err) {
      console.log('error fetching tags: ', err);
    });
  };
}
function deleteCategory(_ref) {
  var slug = _ref.slug;
  return function (dispatch) {
    axios__WEBPACK_IMPORTED_MODULE_0___default.a.post("".concat(SERVER_URL, "/tags/delete"), {
      slug: slug
    }).then(function (response) {
      if (response.data.error) {
        console.log('error: ', response.data.error);
      } else {
        dispatch(fetchTags());
      }
    }).catch(function (err) {
      console.log('error deleting the tag: ', err);
    });
  };
}
function getCategory(slug) {
  return function (dispatch) {
    axios__WEBPACK_IMPORTED_MODULE_0___default.a.get("".concat(SERVER_URL, "/tags/single/").concat(slug)).then(function (response) {
      dispatch({
        type: _types__WEBPACK_IMPORTED_MODULE_1__["GET_TAG"],
        payload: response.data
      });
    }).catch(function (err) {
      console.log('error getting tag: ', err);
    });
  };
}
function updateCategory(formData) {
  return function (dispatch) {
    axios__WEBPACK_IMPORTED_MODULE_0___default.a.post("".concat(SERVER_URL, "/tags/update"), formData).then(function (response) {
      if (response.data.error) {
        dispatch(updateCategoryError("there was an error updating the tag: ".concat(response.data.error)));
      } else {
        dispatch({
          type: _types__WEBPACK_IMPORTED_MODULE_1__["UPDATE_TAG"],
          payload: response.data
        });
      }
    }).catch(function (err) {
      console.log('error upating tag: ', err);
    });
  };
}
function clearUpdateCategory() {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_1__["UPDATE_TAG"],
    payload: ''
  };
}
function clearCategory() {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_1__["ADD_TAG"],
    payload: ''
  };
}
function addCategoryError(error) {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_1__["ADD_TAG_ERROR"],
    payload: error
  };
}

/***/ }),

/***/ "./src/js/react-app/components/admin/articles/article_fields.js":
/*!**********************************************************************!*\
  !*** ./src/js/react-app/components/admin/articles/article_fields.js ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var redux_form__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! redux-form */ "./node_modules/redux-form/es/index.js");
/* harmony import */ var _parts_form_fields__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../parts/form_fields */ "./src/js/react-app/components/admin/parts/form_fields.js");
/* harmony import */ var _parts_edit_box__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../parts/edit_box */ "./src/js/react-app/components/admin/parts/edit_box.js");
/* harmony import */ var _parts_field_multiSelect__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../parts/field_multiSelect */ "./src/js/react-app/components/admin/parts/field_multiSelect.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




 //import renderDropdownSelect from '../parts/field_dropdownSelect';



var ArticleFields =
/*#__PURE__*/
function (_Component) {
  _inherits(ArticleFields, _Component);

  function ArticleFields(props) {
    _classCallCheck(this, ArticleFields);

    return _possibleConstructorReturn(this, _getPrototypeOf(ArticleFields).call(this, props));
  }

  _createClass(ArticleFields, [{
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(redux_form__WEBPACK_IMPORTED_MODULE_1__["Field"], {
        type: "input",
        label: "name:",
        name: "name",
        component: _parts_form_fields__WEBPACK_IMPORTED_MODULE_2__["default"],
        onChange: this.props.onInputChange,
        onFocus: this.props.onInputChange
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(redux_form__WEBPACK_IMPORTED_MODULE_1__["Field"], {
        label: "slug:",
        name: "slug",
        component: _parts_form_fields__WEBPACK_IMPORTED_MODULE_2__["default"],
        onChange: this.props.onInputChange,
        onFocus: this.props.onInputChange
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(redux_form__WEBPACK_IMPORTED_MODULE_1__["Field"], {
        name: "categories",
        label: "categories",
        component: _parts_field_multiSelect__WEBPACK_IMPORTED_MODULE_4__["default"],
        selectItems: this.props.categories,
        onChange: this.props.onInputChange,
        onFocus: this.props.onInputChange
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(redux_form__WEBPACK_IMPORTED_MODULE_1__["Field"], {
        name: "tags",
        label: "tags",
        component: _parts_field_multiSelect__WEBPACK_IMPORTED_MODULE_4__["default"],
        selectItems: this.props.tags,
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

  return ArticleFields;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (ArticleFields);

/***/ })

}]);
//# sourceMappingURL=5.react.js.map