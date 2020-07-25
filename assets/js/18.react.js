(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[18],{

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

/***/ "./src/js/react-app/components/admin/trees/trees_list.js":
/*!***************************************************************!*\
  !*** ./src/js/react-app/components/admin/trees/trees_list.js ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _sidebar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../sidebar */ "./src/js/react-app/components/admin/sidebar.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var _actions_trees__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../actions/trees */ "./src/js/react-app/actions/trees/index.js");
/* harmony import */ var _auth_require_auth__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../auth/require_auth */ "./src/js/react-app/components/admin/auth/require_auth.js");
/* harmony import */ var _search_trees__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../search_trees */ "./src/js/react-app/components/search_trees.js");
/* harmony import */ var _parts_pagination_trees__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../parts/pagination_trees */ "./src/js/react-app/components/parts/pagination_trees.js");
/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../config.js */ "./src/js/react-app/config.js");
/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_config_js__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _actions_globalTrees__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../actions/globalTrees */ "./src/js/react-app/actions/globalTrees/index.js");
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

var SERVER_URL = __webpack_require__(/*! ../../../config */ "./src/js/react-app/config.js")[env].SERVER_URL;

var TreesIndex =
/*#__PURE__*/
function (_Component) {
  _inherits(TreesIndex, _Component);

  function TreesIndex(props) {
    var _this;

    _classCallCheck(this, TreesIndex);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(TreesIndex).call(this, props));
    _this.state = {};
    return _this;
  }

  _createClass(TreesIndex, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      this.searchTrees();
    } // componentWillReceiveProps(nextProps) {
    //   // if newly navigated from the router link...
    //   if((nextProps.location !== this.props.location) && nextProps.location.key) {
    //     this.searchTrees();
    //   }
    // }

  }, {
    key: "searchTrees",
    value: function searchTrees() {
      console.log('searching trees');
      this.props.dispatch(Object(_actions_globalTrees__WEBPACK_IMPORTED_MODULE_9__["searchTrees"])(this.props.globalFilterData));
    }
  }, {
    key: "onDeleteTreeClick",
    value: function onDeleteTreeClick(event) {
      var slug = event.target.getAttribute("data-slug");
      var id = event.target.getAttribute("data-id");
      var _this$props$searchRes = this.props.searchResults,
          offset = _this$props$searchRes.offset,
          limit = _this$props$searchRes.limit; //slug, search, offset, limit
      //todo: get [] to use real stored search if any

      this.props.dispatch(_actions_trees__WEBPACK_IMPORTED_MODULE_4__["deleteTree"]({
        id: parseInt(id),
        slug: slug
      }, [], offset, limit));
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      //fire the updated globalFilterData to the search action whenever the themes or categores get updated
      if (this.props.globalFilterData && prevProps.globalFilterData !== this.props.globalFilterData) {
        this.searchTrees();
      }
    }
  }, {
    key: "renderTrees",
    value: function renderTrees() {
      var _this2 = this;

      return this.props.searchResults.trees.map(function (tree) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
          className: "list-group-item",
          key: tree.id
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, tree.common_name), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
          href: "#",
          "data-id": tree.id,
          "data-slug": tree.slug,
          onClick: _this2.onDeleteTreeClick.bind(_this2)
        }, "Delete"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Link"], {
          to: "/".concat(_config_js__WEBPACK_IMPORTED_MODULE_8__["globals"].ADMIN_URL, "/trees-list/").concat(tree.slug)
        }, "edit"));
      });
    }
  }, {
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "admin-main"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "row"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_sidebar__WEBPACK_IMPORTED_MODULE_2__["default"], null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "main-window columns small-12 large-9"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", null, "Trees"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_search_trees__WEBPACK_IMPORTED_MODULE_6__["default"], {
        placeholder: "search",
        hasButton: false
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
        className: "list-group item-list"
      }, this.renderTrees()), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_parts_pagination_trees__WEBPACK_IMPORTED_MODULE_7__["default"], null))));
    }
  }]);

  return TreesIndex;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

function mapStateToProps(state) {
  return {
    searchResults: state.trees.searchResults,
    globalFilterData: state.globalTrees,
    treeDeleted: state.tree.treeDeleted
  };
}

/* harmony default export */ __webpack_exports__["default"] = (Object(_auth_require_auth__WEBPACK_IMPORTED_MODULE_5__["default"])(Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps)(TreesIndex)));

/***/ })

}]);
//# sourceMappingURL=18.react.js.map