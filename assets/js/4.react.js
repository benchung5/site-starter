webpackJsonp([4],{

/***/ 916:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(9);

var _sidebar = __webpack_require__(927);

var _sidebar2 = _interopRequireDefault(_sidebar);

var _reactRouterDom = __webpack_require__(342);

var _articles = __webpack_require__(344);

var actions = _interopRequireWildcard(_articles);

var _require_auth = __webpack_require__(928);

var _require_auth2 = _interopRequireDefault(_require_auth);

var _search_articles = __webpack_require__(959);

var _search_articles2 = _interopRequireDefault(_search_articles);

var _pagination = __webpack_require__(960);

var _pagination2 = _interopRequireDefault(_pagination);

var _config = __webpack_require__(13);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//config
var env = "development" || "development";

var SERVER_URL = __webpack_require__(13)[env].SERVER_URL;

var ArticlesIndex = function (_Component) {
    _inherits(ArticlesIndex, _Component);

    function ArticlesIndex(props) {
        _classCallCheck(this, ArticlesIndex);

        var _this = _possibleConstructorReturn(this, (ArticlesIndex.__proto__ || Object.getPrototypeOf(ArticlesIndex)).call(this, props));

        _this.state = {};
        return _this;
    }

    _createClass(ArticlesIndex, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.resetArticlesList();
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            // if newly navigated from the router link...
            if (nextProps.location !== this.props.location && nextProps.location.key) {
                this.resetArticlesList();
            }
        }
    }, {
        key: 'resetArticlesList',
        value: function resetArticlesList() {
            this.props.searchArticlesAdmin({ search: [], offset: 0, limit: _config.globals.ADMIN_ENTRIES_PER_PAGE });
        }
    }, {
        key: 'onDeleteArticleClick',
        value: function onDeleteArticleClick(event) {
            var slug = event.target.getAttribute("data-slug");
            var id = event.target.getAttribute("data-id");
            var _props$articles = this.props.articles,
                offset = _props$articles.offset,
                limit = _props$articles.limit;
            //slug, search, offset, limit
            //todo: get [] to use real stored search if any

            this.props.dispatch(this.props.deleteArticle({ id: parseInt(id), slug: slug }, [], offset, limit));
        }
    }, {
        key: 'onDuplicateArticleClick',
        value: function onDuplicateArticleClick(event) {
            var slug = event.target.getAttribute("data-slug");
            var _props$articles2 = this.props.articles,
                offset = _props$articles2.offset,
                limit = _props$articles2.limit;
            //slug, search, offset, limit
            //todo: get [] to use real stored search if any

            this.props.duplicateArticle(slug, [], offset, limit);
        }
    }, {
        key: 'renderArticles',
        value: function renderArticles() {
            var _this2 = this;

            return this.props.articles.articles.map(function (article) {
                return _react2.default.createElement(
                    'li',
                    { className: 'list-group-item', key: article.id },
                    _react2.default.createElement(
                        'span',
                        null,
                        article.name
                    ),
                    _react2.default.createElement(
                        'a',
                        { href: '#', 'data-id': article.id, 'data-slug': article.slug, onClick: _this2.onDeleteArticleClick.bind(_this2) },
                        'Delete'
                    ),
                    _react2.default.createElement(
                        'a',
                        { href: '#', 'data-id': article.id, 'data-slug': article.slug, onClick: _this2.onDuplicateArticleClick.bind(_this2) },
                        'Duplicate'
                    ),
                    _react2.default.createElement(
                        _reactRouterDom.Link,
                        { to: '/' + _config.globals.ADMIN_URL + '/articles-list/' + article.slug },
                        'edit'
                    )
                );
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'admin-main' },
                _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(_sidebar2.default, null),
                    _react2.default.createElement(
                        'div',
                        { className: 'columns small-12 large-9' },
                        _react2.default.createElement(
                            'h3',
                            null,
                            'Articles'
                        ),
                        _react2.default.createElement(_search_articles2.default, null),
                        _react2.default.createElement(
                            'ul',
                            { className: 'list-group item-list' },
                            this.renderArticles()
                        ),
                        _react2.default.createElement(_pagination2.default, {
                            sourceData: this.props.articles,
                            searchAction: this.props.searchArticlesAdmin.bind(this)
                        })
                    )
                )
            );
        }
    }]);

    return ArticlesIndex;
}(_react.Component);

function mapStateToProps(state) {
    return {
        articles: state.articles.searchResultsAdmin,
        articleDeleted: state.article.articleDeleted
    };
}

exports.default = (0, _require_auth2.default)((0, _reactRedux.connect)(mapStateToProps, actions)(ArticlesIndex));

/***/ }),

/***/ 927:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(342);

var _cloneDeep = __webpack_require__(195);

var _cloneDeep2 = _interopRequireDefault(_cloneDeep);

var _config = __webpack_require__(13);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SideMenu = function (_Component) {
    _inherits(SideMenu, _Component);

    function SideMenu(props) {
        _classCallCheck(this, SideMenu);

        var _this = _possibleConstructorReturn(this, (SideMenu.__proto__ || Object.getPrototypeOf(SideMenu)).call(this, props));

        _this.state = {
            linkList: [{ title: 'Website', link: '/', active: false }, { title: 'Logout', link: '/' + _config.globals.ADMIN_URL + '/signout', active: false }, { title: 'Dashboard', link: '/' + _config.globals.ADMIN_URL + '', active: false }, { title: 'View Articles', link: '/' + _config.globals.ADMIN_URL + '/articles-list', active: false }, { title: 'Add Articles', link: '/' + _config.globals.ADMIN_URL + '/article-add', active: false }, { title: 'View Plants', link: '/' + _config.globals.ADMIN_URL + '/trees-list', active: false }, { title: 'Add Plants', link: '/' + _config.globals.ADMIN_URL + '/tree-add', active: false }, { title: 'View Users', link: '/' + _config.globals.ADMIN_URL + '/users-list', active: false }, { title: 'Add User', link: '/' + _config.globals.ADMIN_URL + '/signup', active: false }, { title: 'View Categories', link: '/' + _config.globals.ADMIN_URL + '/category-list', active: false }, { title: 'Add Category', link: '/' + _config.globals.ADMIN_URL + '/category-add', active: false }, { title: 'Backup', link: '/' + _config.globals.ADMIN_URL + '/backup', active: false }]
        };
        return _this;
    }

    _createClass(SideMenu, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            //check url and highlight accordingly
            var linkListClone = (0, _cloneDeep2.default)(this.state.linkList);
            linkListClone.forEach(function (item, index) {

                //set all to inactive at first
                if (item.active) {
                    item.active = false;
                }
                //if url path equals link, activate it
                if (item.link === window.location.pathname) {
                    item.active = true;
                }
            });
            this.setState({ linkList: linkListClone });
        }
    }, {
        key: 'onLinkClick',
        value: function onLinkClick(e) {}
    }, {
        key: 'renderButtons',
        value: function renderButtons() {
            var _this2 = this;

            return this.state.linkList.map(function (item, index) {
                //title to lowercase, replace slashes with dashes
                return _react2.default.createElement(
                    'li',
                    { key: index, className: '' + (item.active ? 'active' : '') },
                    _react2.default.createElement(
                        _reactRouterDom.Link,
                        { onClick: _this2.onLinkClick.bind(_this2), className: 'nav-link', to: item.link, 'data-id': index },
                        item.title
                    )
                );
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'columns small-12 large-3' },
                _react2.default.createElement(
                    'ul',
                    { className: 'vertical menu admin-side-menu' },
                    this.renderButtons()
                )
            );
        }
    }]);

    return SideMenu;
}(_react.Component);

exports.default = SideMenu;

/***/ }),

/***/ 928:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = function (ComposedComponent) {
    var Authentication = function (_Component) {
        _inherits(Authentication, _Component);

        function Authentication() {
            _classCallCheck(this, Authentication);

            return _possibleConstructorReturn(this, (Authentication.__proto__ || Object.getPrototypeOf(Authentication)).apply(this, arguments));
        }

        _createClass(Authentication, [{
            key: 'componentWillMount',


            // comment out these two blocks to disable auth
            //if not authenticated at start, push to the home page
            value: function componentWillMount() {
                if (!this.props.authenticated) {
                    //this.context.router.push('/protected');
                    this.props.history.push('/' + _config.globals.ADMIN_URL + '/protected');
                }
            }
            //this one fires when component is updated

        }, {
            key: 'componentWillUpdate',
            value: function componentWillUpdate(nextProps) {
                if (!nextProps.authenticated) {
                    //this.context.router.push('/protected');
                    this.props.history.push('/' + _config.globals.ADMIN_URL + '/protected');
                }
            }
        }, {
            key: 'render',
            value: function render() {
                //the this.props is for passing up new props from the combined component *instance to 
                //existing props on the original composed component below
                return _react2.default.createElement(ComposedComponent, this.props);
            }
        }]);

        return Authentication;
    }(_react.Component);

    function mapStateToProps(state) {
        return { authenticated: state.auth.authenticated };
    }

    return (0, _reactRedux.connect)(mapStateToProps)(Authentication);
};

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(9);

var _config = __webpack_require__(13);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

////example usage of this HOC
// import Authenticatoin // this is the HOC
// import Resources // this is the component to wraps
// const ComposedComponent = Authentication(Resources);
//// in some render method...
// <ComposedComponent resources={resourceList}>
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import PropTypes from "prop-types";

//this is a higher order component (HOC) that wraps the incomming component 
//and attaches additional functionality to it

/***/ }),

/***/ 959:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reduxForm = __webpack_require__(119);

var _reactRedux = __webpack_require__(9);

var _articles = __webpack_require__(344);

var actions = _interopRequireWildcard(_articles);

var _field_search = __webpack_require__(197);

var _field_search2 = _interopRequireDefault(_field_search);

var _config = __webpack_require__(13);

var _stringUtils = __webpack_require__(39);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SearchFormAdmin = function (_Component) {
	_inherits(SearchFormAdmin, _Component);

	function SearchFormAdmin() {
		_classCallCheck(this, SearchFormAdmin);

		return _possibleConstructorReturn(this, (SearchFormAdmin.__proto__ || Object.getPrototypeOf(SearchFormAdmin)).apply(this, arguments));
	}

	_createClass(SearchFormAdmin, [{
		key: 'handleFormSubmit',
		value: function handleFormSubmit(formProps) {
			//call action for data (send the text along with the global data)
			// if empty search, just search with blank string
			if (Object.keys(formProps).length === 0 && formProps.constructor === Object) {
				this.props.dispatch(actions.searchArticlesAdmin({ search: [], offset: 0, limit: _config.globals.ADMIN_ENTRIES_PER_PAGE }));
			} else {
				//else, query it using keywords
				this.props.dispatch(actions.searchArticlesAdmin({
					search: (0, _stringUtils.formatSearchString)(formProps.search),
					offset: 0,
					limit: _config.globals.ADMIN_ENTRIES_PER_PAGE
				}));
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var handleSubmit = this.props.handleSubmit;

			return _react2.default.createElement(
				'form',
				{ className: 'search-form', onSubmit: handleSubmit(this.handleFormSubmit.bind(this)) },
				_react2.default.createElement(_reduxForm.Field, {
					name: 'search',
					component: _field_search2.default,
					placeholder: 'search'
				})
			);
		}
	}]);

	return SearchFormAdmin;
}(_react.Component);

function validate(formProps) {
	var errors = {};

	//validation...
	return errors;
}

function mapStateToProps(state) {
	return {
		// articlesSearch: state.articles.articlesAdmin
	};
}

exports.default = (0, _reduxForm.reduxForm)({
	form: 'search-form',
	validate: validate
})((0, _reactRedux.connect)(mapStateToProps, actions)(SearchFormAdmin));

/***/ }),

/***/ 960:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(9);

var _config = __webpack_require__(13);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Paginator = function (_Component) {
  _inherits(Paginator, _Component);

  function Paginator() {
    _classCallCheck(this, Paginator);

    return _possibleConstructorReturn(this, (Paginator.__proto__ || Object.getPrototypeOf(Paginator)).apply(this, arguments));
  }

  _createClass(Paginator, [{
    key: 'back',
    value: function back() {
      var _props$sourceData = this.props.sourceData,
          offset = _props$sourceData.offset,
          limit = _props$sourceData.limit;

      if (offset === 0) {
        return;
      }
      //todo: get this.props.search to pull from stored search if any
      this.props.searchAction({ search: this.props.search, offset: offset - _config.globals.ADMIN_ENTRIES_PER_PAGE, limit: limit });
    }
  }, {
    key: 'advance',
    value: function advance() {
      var _props$sourceData2 = this.props.sourceData,
          offset = _props$sourceData2.offset,
          limit = _props$sourceData2.limit,
          count = _props$sourceData2.count;

      if (offset + limit > count) {
        return;
      }
      //todo: get this.props.search to pull from stored search if any
      this.props.searchAction({ search: this.props.search, offset: offset + _config.globals.ADMIN_ENTRIES_PER_PAGE, limit: limit });
    }
  }, {
    key: 'left',
    value: function left() {
      var offset = this.props.sourceData.offset;

      return _react2.default.createElement(
        'div',
        { className: 'paginate-previous ' + (offset === 0 ? 'disabled' : '') },
        _react2.default.createElement(
          'a',
          { 'aria-label': 'Previous page', onClick: this.back.bind(this) },
          'Previous'
        )
      );
    }
  }, {
    key: 'right',
    value: function right() {
      var _props$sourceData3 = this.props.sourceData,
          offset = _props$sourceData3.offset,
          limit = _props$sourceData3.limit,
          count = _props$sourceData3.count;

      var end = offset + limit >= count ? true : false;
      return _react2.default.createElement(
        'div',
        { className: 'paginate-next ' + (end ? 'disabled' : '') },
        _react2.default.createElement(
          'a',
          { 'aria-label': 'Next page', onClick: this.advance.bind(this) },
          'Next'
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _props$sourceData4 = this.props.sourceData,
          offset = _props$sourceData4.offset,
          count = _props$sourceData4.count;

      return _react2.default.createElement(
        'div',
        { className: 'paginate-wrapper' },
        _react2.default.createElement(
          'div',
          { className: 'paginate', role: 'navigation', 'aria-label': 'Pagination' },
          this.left(),
          _react2.default.createElement(
            'div',
            null,
            'Page ',
            offset / _config.globals.ADMIN_ENTRIES_PER_PAGE + 1
          ),
          this.right()
        ),
        _react2.default.createElement(
          'div',
          { className: 'records-count' },
          '(',
          count,
          ' records total)'
        )
      );
    }
  }]);

  return Paginator;
}(_react.Component);

function mapStateToProps(state) {
  return {
    //articlesResults: state.articles.searchResultsAdmin
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps)(Paginator);

/***/ })

});
//# sourceMappingURL=4.react.js.map