(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{324:function(t,e,n){"use strict";n.d(e,"a",(function(){return v}));var r=n(323),o=n(24),a=n(0),i=n.n(a),c=n(22),l=(n(3),n(10)),u=n(19),s=n(21);i.a.Component;i.a.Component;var f=function(t,e){return"function"==typeof t?t(e):t},p=function(t,e){return"string"==typeof t?Object(c.c)(t,null,null,e):t},b=function(t){return t},y=i.a.forwardRef;void 0===y&&(y=b);var m=y((function(t,e){var n=t.innerRef,r=t.navigate,o=t.onClick,a=Object(u.a)(t,["innerRef","navigate","onClick"]),c=a.target,s=Object(l.a)({},a,{onClick:function(t){try{o&&o(t)}catch(e){throw t.preventDefault(),e}t.defaultPrevented||0!==t.button||c&&"_self"!==c||function(t){return!!(t.metaKey||t.altKey||t.ctrlKey||t.shiftKey)}(t)||(t.preventDefault(),r())}});return s.ref=b!==y&&e||n,i.a.createElement("a",s)}));var v=y((function(t,e){var n=t.component,o=void 0===n?m:n,a=t.replace,c=t.to,v=t.innerRef,d=Object(u.a)(t,["component","replace","to","innerRef"]);return i.a.createElement(r.d.Consumer,null,(function(t){t||Object(s.a)(!1);var n=t.history,r=p(f(c,t.location),t.location),u=r?n.createHref(r):"",m=Object(l.a)({},d,{href:u,navigate:function(){var e=f(c,t.location);(a?n.replace:n.push)(e)}});return b!==y?m.ref=e||v:m.innerRef=v,i.a.createElement(o,m)}))})),d=function(t){return t},h=i.a.forwardRef;void 0===h&&(h=d);h((function(t,e){var n=t["aria-current"],o=void 0===n?"page":n,a=t.activeClassName,c=void 0===a?"active":a,b=t.activeStyle,y=t.className,m=t.exact,g=t.isActive,k=t.location,w=t.strict,O=t.style,_=t.to,j=t.innerRef,N=Object(u.a)(t,["aria-current","activeClassName","activeStyle","className","exact","isActive","location","strict","style","to","innerRef"]);return i.a.createElement(r.d.Consumer,null,(function(t){t||Object(s.a)(!1);var n=k||t.location,a=p(f(_,n),n),u=a.pathname,R=u&&u.replace(/([.+*?=^!:${}()[\]|/\\])/g,"\\$1"),A=R?Object(r.e)(n.pathname,{path:R,exact:m,strict:w}):null,E=!!(g?g(A,n):A),L=E?function(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];return e.filter((function(t){return t})).join(" ")}(y,c):y,C=E?Object(l.a)({},O,{},b):O,D=Object(l.a)({"aria-current":E&&o||null,className:L,style:C,to:a},N);return d!==h?D.ref=e||j:D.innerRef=j,i.a.createElement(v,D)}))}))},326:function(t,e,n){"use strict";var r=n(0),o=n.n(r),a=n(324),i=n(327),c=n.n(i),l=n(5);function u(t){return(u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function s(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function f(t,e){return!e||"object"!==u(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function p(t){return(p=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function b(t,e){return(b=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}var y=function(t){function e(t){var n;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),(n=f(this,p(e).call(this,t))).state={linkList:[{title:"Website",link:"/",active:!1},{title:"Logout",link:"/"+l.globals.ADMIN_URL+"/signout",active:!1},{title:"Dashboard",link:"/"+l.globals.ADMIN_URL,active:!1},{title:"View Articles",link:"/"+l.globals.ADMIN_URL+"/articles-list",active:!1},{title:"Add Articles",link:"/"+l.globals.ADMIN_URL+"/article-add",active:!1},{title:"View Plants",link:"/"+l.globals.ADMIN_URL+"/trees-list",active:!1},{title:"Add Plants",link:"/"+l.globals.ADMIN_URL+"/tree-add",active:!1},{title:"View Users",link:"/"+l.globals.ADMIN_URL+"/users-list",active:!1},{title:"Add User",link:"/"+l.globals.ADMIN_URL+"/signup",active:!1},{title:"View Categories",link:"/"+l.globals.ADMIN_URL+"/category-list",active:!1},{title:"Add Category",link:"/"+l.globals.ADMIN_URL+"/category-add",active:!1},{title:"Backup",link:"/"+l.globals.ADMIN_URL+"/backup",active:!1}]},n}var n,r,i;return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&b(t,e)}(e,t),n=e,(r=[{key:"componentDidMount",value:function(){var t=c()(this.state.linkList);t.forEach((function(t,e){t.active&&(t.active=!1),t.link===window.location.pathname&&(t.active=!0)})),this.setState({linkList:t})}},{key:"onLinkClick",value:function(t){}},{key:"renderButtons",value:function(){var t=this;return this.state.linkList.map((function(e,n){return o.a.createElement("li",{key:n,className:"".concat(e.active?"active":"")},o.a.createElement(a.a,{onClick:t.onLinkClick.bind(t),className:"nav-link",to:e.link,"data-id":n},e.title))}))}},{key:"render",value:function(){return o.a.createElement("div",{className:"columns small-12 large-3 admin-sidebar"},o.a.createElement("ul",{className:"vertical menu admin-side-menu"},this.renderButtons()))}}])&&s(n.prototype,r),i&&s(n,i),e}(r.Component);e.a=y},327:function(t,e,n){var r=n(147);t.exports=function(t){return r(t,5)}},328:function(t,e,n){"use strict";var r=n(0),o=n.n(r),a=n(6),i=n(5);function c(t){return(c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function l(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function u(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function s(t,e){return!e||"object"!==c(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function f(t){return(f=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function p(t,e){return(p=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}e.a=function(t){var e=function(e){function n(){return l(this,n),s(this,f(n).apply(this,arguments))}var r,a,c;return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&p(t,e)}(n,e),r=n,(a=[{key:"componentWillMount",value:function(){this.props.authenticated||this.props.history.push("/"+i.globals.ADMIN_URL+"/protected")}},{key:"componentWillUpdate",value:function(t){t.authenticated||this.props.history.push("/"+i.globals.ADMIN_URL+"/protected")}},{key:"render",value:function(){return o.a.createElement(t,this.props)}}])&&u(r.prototype,a),c&&u(r,c),n}(r.Component);return Object(a.b)((function(t){return{authenticated:t.auth.authenticated}}))(e)}},367:function(t,e,n){"use strict";n.r(e);var r=n(0),o=n.n(r),a=n(326),i=n(328);e.default=Object(i.a)((function(){return o.a.createElement("div",{className:"admin-main"},o.a.createElement("div",{className:"row"},o.a.createElement(a.a,null),o.a.createElement("div",{className:"main-window columns small-12 large-9"},o.a.createElement("h1",{className:"margin-bottom"},"Dashboard"),"Admin Area. ",o.a.createElement("br",null),"If you're seeing this, you must be logged in.")))}))}}]);