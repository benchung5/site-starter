webpackJsonp([12],{959:function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(0),r=i(a),l=n(971),o=i(l),u=n(972),c=i(u);t.default=(0,c.default)(function(){return r.default.createElement("div",{className:"admin-main"},r.default.createElement("div",{className:"row"},r.default.createElement(o.default,null),r.default.createElement("div",{className:"main-window columns small-12 large-9"},r.default.createElement("h1",{className:"margin-bottom"},"Dashboard"),"Admin Area. ",r.default.createElement("br",null),"If you're seeing this, you must be logged in.")))})},971:function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function l(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),u=n(0),c=i(u),s=n(196),f=n(197),d=i(f),p=n(13),b=function(e){function t(e){a(this,t);var n=r(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.state={linkList:[{title:"Website",link:"/",active:!1},{title:"Logout",link:"/"+p.globals.ADMIN_URL+"/signout",active:!1},{title:"Dashboard",link:"/"+p.globals.ADMIN_URL,active:!1},{title:"View Articles",link:"/"+p.globals.ADMIN_URL+"/articles-list",active:!1},{title:"Add Articles",link:"/"+p.globals.ADMIN_URL+"/article-add",active:!1},{title:"View Plants",link:"/"+p.globals.ADMIN_URL+"/trees-list",active:!1},{title:"Add Plants",link:"/"+p.globals.ADMIN_URL+"/tree-add",active:!1},{title:"View Users",link:"/"+p.globals.ADMIN_URL+"/users-list",active:!1},{title:"Add User",link:"/"+p.globals.ADMIN_URL+"/signup",active:!1},{title:"View Categories",link:"/"+p.globals.ADMIN_URL+"/category-list",active:!1},{title:"Add Category",link:"/"+p.globals.ADMIN_URL+"/category-add",active:!1},{title:"Backup",link:"/"+p.globals.ADMIN_URL+"/backup",active:!1}]},n}return l(t,e),o(t,[{key:"componentDidMount",value:function(){var e=(0,d.default)(this.state.linkList);e.forEach(function(e,t){e.active&&(e.active=!1),e.link===window.location.pathname&&(e.active=!0)}),this.setState({linkList:e})}},{key:"onLinkClick",value:function(e){}},{key:"renderButtons",value:function(){var e=this;return this.state.linkList.map(function(t,n){return c.default.createElement("li",{key:n,className:t.active?"active":""},c.default.createElement(s.Link,{onClick:e.onLinkClick.bind(e),className:"nav-link",to:t.link,"data-id":n},t.title))})}},{key:"render",value:function(){return c.default.createElement("div",{className:"columns small-12 large-3 admin-sidebar"},c.default.createElement("ul",{className:"vertical menu admin-side-menu"},this.renderButtons()))}}]),t}(u.Component);t.default=b},972:function(e,t,n){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function r(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var l=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}();t.default=function(e){function t(e){return{authenticated:e.auth.authenticated}}var n=function(t){function n(){return i(this,n),a(this,(n.__proto__||Object.getPrototypeOf(n)).apply(this,arguments))}return r(n,t),l(n,[{key:"componentWillMount",value:function(){this.props.authenticated||this.props.history.push("/"+s.globals.ADMIN_URL+"/protected")}},{key:"componentWillUpdate",value:function(e){e.authenticated||this.props.history.push("/"+s.globals.ADMIN_URL+"/protected")}},{key:"render",value:function(){return u.default.createElement(e,this.props)}}]),n}(o.Component);return(0,c.connect)(t)(n)};var o=n(0),u=function(e){return e&&e.__esModule?e:{default:e}}(o),c=n(7),s=n(13)}});