(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{324:function(e,t,n){"use strict";n.d(t,"a",(function(){return h}));var r=n(323),o=n(24),a=n(0),i=n.n(a),c=n(22),l=(n(3),n(10)),u=n(19),s=n(21);i.a.Component;i.a.Component;var f=function(e,t){return"function"==typeof e?e(t):e},p=function(e,t){return"string"==typeof e?Object(c.c)(e,null,null,t):e},d=function(e){return e},y=i.a.forwardRef;void 0===y&&(y=d);var m=y((function(e,t){var n=e.innerRef,r=e.navigate,o=e.onClick,a=Object(u.a)(e,["innerRef","navigate","onClick"]),c=a.target,s=Object(l.a)({},a,{onClick:function(e){try{o&&o(e)}catch(t){throw e.preventDefault(),t}e.defaultPrevented||0!==e.button||c&&"_self"!==c||function(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}(e)||(e.preventDefault(),r())}});return s.ref=d!==y&&t||n,i.a.createElement("a",s)}));var h=y((function(e,t){var n=e.component,o=void 0===n?m:n,a=e.replace,c=e.to,h=e.innerRef,b=Object(u.a)(e,["component","replace","to","innerRef"]);return i.a.createElement(r.d.Consumer,null,(function(e){e||Object(s.a)(!1);var n=e.history,r=p(f(c,e.location),e.location),u=r?n.createHref(r):"",m=Object(l.a)({},b,{href:u,navigate:function(){var t=f(c,e.location);(a?n.replace:n.push)(t)}});return d!==y?m.ref=t||h:m.innerRef=h,i.a.createElement(o,m)}))})),b=function(e){return e},g=i.a.forwardRef;void 0===g&&(g=b);g((function(e,t){var n=e["aria-current"],o=void 0===n?"page":n,a=e.activeClassName,c=void 0===a?"active":a,d=e.activeStyle,y=e.className,m=e.exact,v=e.isActive,E=e.location,k=e.strict,O=e.style,w=e.to,C=e.innerRef,j=Object(u.a)(e,["aria-current","activeClassName","activeStyle","className","exact","isActive","location","strict","style","to","innerRef"]);return i.a.createElement(r.d.Consumer,null,(function(e){e||Object(s.a)(!1);var n=E||e.location,a=p(f(w,n),n),u=a.pathname,_=u&&u.replace(/([.+*?=^!:${}()[\]|/\\])/g,"\\$1"),N=_?Object(r.e)(n.pathname,{path:_,exact:m,strict:k}):null,A=!!(v?v(N,n):N),R=A?function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return t.filter((function(e){return e})).join(" ")}(y,c):y,S=A?Object(l.a)({},O,{},d):O,P=Object(l.a)({"aria-current":A&&o||null,className:R,style:S,to:a},j);return b!==g?P.ref=t||C:P.innerRef=C,i.a.createElement(h,P)}))}))},326:function(e,t,n){"use strict";var r=n(0),o=n.n(r),a=n(324),i=n(327),c=n.n(i),l=n(5);function u(e){return(u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function s(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function f(e,t){return!t||"object"!==u(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function p(e){return(p=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function d(e,t){return(d=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var y=function(e){function t(e){var n;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),(n=f(this,p(t).call(this,e))).state={linkList:[{title:"Website",link:"/",active:!1},{title:"Logout",link:"/"+l.globals.ADMIN_URL+"/signout",active:!1},{title:"Dashboard",link:"/"+l.globals.ADMIN_URL,active:!1},{title:"View Articles",link:"/"+l.globals.ADMIN_URL+"/articles-list",active:!1},{title:"Add Articles",link:"/"+l.globals.ADMIN_URL+"/article-add",active:!1},{title:"View Plants",link:"/"+l.globals.ADMIN_URL+"/trees-list",active:!1},{title:"Add Plants",link:"/"+l.globals.ADMIN_URL+"/tree-add",active:!1},{title:"View Users",link:"/"+l.globals.ADMIN_URL+"/users-list",active:!1},{title:"Add User",link:"/"+l.globals.ADMIN_URL+"/signup",active:!1},{title:"View Categories",link:"/"+l.globals.ADMIN_URL+"/category-list",active:!1},{title:"Add Category",link:"/"+l.globals.ADMIN_URL+"/category-add",active:!1},{title:"Backup",link:"/"+l.globals.ADMIN_URL+"/backup",active:!1}]},n}var n,r,i;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&d(e,t)}(t,e),n=t,(r=[{key:"componentDidMount",value:function(){var e=c()(this.state.linkList);e.forEach((function(e,t){e.active&&(e.active=!1),e.link===window.location.pathname&&(e.active=!0)})),this.setState({linkList:e})}},{key:"onLinkClick",value:function(e){}},{key:"renderButtons",value:function(){var e=this;return this.state.linkList.map((function(t,n){return o.a.createElement("li",{key:n,className:"".concat(t.active?"active":"")},o.a.createElement(a.a,{onClick:e.onLinkClick.bind(e),className:"nav-link",to:t.link,"data-id":n},t.title))}))}},{key:"render",value:function(){return o.a.createElement("div",{className:"columns small-12 large-3 admin-sidebar"},o.a.createElement("ul",{className:"vertical menu admin-side-menu"},this.renderButtons()))}}])&&s(n.prototype,r),i&&s(n,i),t}(r.Component);t.a=y},327:function(e,t,n){var r=n(147);e.exports=function(e){return r(e,5)}},328:function(e,t,n){"use strict";var r=n(0),o=n.n(r),a=n(6),i=n(5);function c(e){return(c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function l(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function u(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function s(e,t){return!t||"object"!==c(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function f(e){return(f=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function p(e,t){return(p=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}t.a=function(e){var t=function(t){function n(){return l(this,n),s(this,f(n).apply(this,arguments))}var r,a,c;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&p(e,t)}(n,t),r=n,(a=[{key:"componentWillMount",value:function(){this.props.authenticated||this.props.history.push("/"+i.globals.ADMIN_URL+"/protected")}},{key:"componentWillUpdate",value:function(e){e.authenticated||this.props.history.push("/"+i.globals.ADMIN_URL+"/protected")}},{key:"render",value:function(){return o.a.createElement(e,this.props)}}])&&u(r.prototype,a),c&&u(r,c),n}(r.Component);return Object(a.b)((function(e){return{authenticated:e.auth.authenticated}}))(t)}},329:function(e,t,n){"use strict";var r=n(0),o=n.n(r);function a(){return(a=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}t.a=function(e){var t=e.meta,n=t.touched,r=t.error,i="form-group ".concat(n&&r?"has-danger":"");return"textarea"===e.type?o.a.createElement("div",{className:i},o.a.createElement("label",null,e.label),o.a.createElement("textarea",a({className:"form-control",rows:"12",cols:"50"},e.input)),o.a.createElement("div",{className:"error"},n?r:"")):o.a.createElement("div",{className:i},o.a.createElement("label",null,e.label),o.a.createElement("input",a({className:"form-control",type:"text"},e.input)),o.a.createElement("div",{className:"error"},n?r:""))}},330:function(e,t,n){"use strict";n.r(t),n.d(t,"addCategory",(function(){return c})),n.d(t,"fetchCategories",(function(){return l})),n.d(t,"deleteCategory",(function(){return u})),n.d(t,"getCategory",(function(){return s})),n.d(t,"updateCategory",(function(){return f})),n.d(t,"clearUpdateCategory",(function(){return p})),n.d(t,"clearCategory",(function(){return d})),n.d(t,"addCategoryError",(function(){return y}));var r=n(36),o=n.n(r),a=n(1),i=n(5).production.SERVER_URL;function c(e){return function(t){o.a.post("".concat(i,"/categories/create"),e).then((function(e){e.data.error?t(y("there was an error adding the category: ".concat(e.data.error))):t({type:a.c,payload:e.data})})).catch((function(e){t(y("there was an error adding the category: ".concat(e)))}))}}function l(){return function(e){o.a.get("".concat(i,"/categories/all")).then((function(t){e({type:a.v,payload:t.data})})).catch((function(e){console.log("error fetching categories: ",e)}))}}function u(e){var t=e.slug;return function(e){o.a.post("".concat(i,"/categories/delete"),{slug:t}).then((function(t){t.data.error?console.log("error: ",t.data.error):e(l())})).catch((function(e){console.log("error deleting the category: ",e)}))}}function s(e){return function(t){o.a.get("".concat(i,"/categories/single/").concat(e)).then((function(e){t({type:a.D,payload:e.data})})).catch((function(e){console.log("error getting category: ",e)}))}}function f(e){return function(t){o.a.post("".concat(i,"/categories/update"),e).then((function(e){e.data.error?t(updateCategoryError("there was an error updating the category: ".concat(e.data.error))):t({type:a.db,payload:e.data})})).catch((function(e){console.log("error upating category: ",e)}))}}function p(){return{type:a.db,payload:""}}function d(){return{type:a.c,payload:""}}function y(e){return{type:a.d,payload:e}}},372:function(e,t,n){"use strict";n.r(t);var r=n(0),o=n.n(r),a=n(92),i=n(93),c=n(6),l=n(330),u=n(326),s=n(329),f=n(328);function p(e){return(p="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function d(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function y(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function m(e,t){return!t||"object"!==p(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function h(e){return(h=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function b(e,t){return(b=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var g=function(e){function t(){return d(this,t),m(this,h(t).apply(this,arguments))}var n,r,i;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&b(e,t)}(t,e),n=t,(r=[{key:"componentWillReceiveProps",value:function(e){e.location!==this.props.location&&this.props.reset("theme-add")}},{key:"componentDidUpdate",value:function(e){this.props.themeAdded&&e.themeAdded!==this.props.themeAdded&&this.props.addCategoryError("")}},{key:"componentWillUnmount",value:function(){this.props.addCategoryError(""),this.props.clearCategory()}},{key:"handleFormSubmit",value:function(e){this.props.addCategory(e)}},{key:"renderAdded",value:function(){if(this.props.themeAdded&&!this.props.errorMessage)return o.a.createElement("div",{className:"submission-message"},o.a.createElement("span",null,"theme: ",this.props.themeAdded.name,o.a.createElement("br",null),"successfully added."))}},{key:"renderError",value:function(){if(this.props.errorMessage)return o.a.createElement("div",{className:"alert alert-danger"},o.a.createElement("strong",null,"Oops!")," ",this.props.errorMessage)}},{key:"onInputChange",value:function(){this.props.clearCategory()}},{key:"render",value:function(){var e=this.props.handleSubmit;return o.a.createElement("div",{className:"admin-main"},o.a.createElement("div",{className:"row"},o.a.createElement(u.a,null),o.a.createElement("div",{className:"main-window columns small-12 large-9"},o.a.createElement("h3",null,"Add Category"),o.a.createElement("form",{onSubmit:e(this.handleFormSubmit.bind(this))},o.a.createElement(a.a,{label:"name:",name:"name",component:s.a,onChange:this.onInputChange.bind(this),onFocus:this.onInputChange.bind(this)}),o.a.createElement(a.a,{label:"slug:",name:"slug",component:s.a,onChange:this.onInputChange.bind(this),onFocus:this.onInputChange.bind(this)}),o.a.createElement("button",{action:"submit",className:"btn btn-primary"},"Submit")),this.renderAdded(),this.renderError())))}}])&&y(n.prototype,r),i&&y(n,i),t}(r.Component);t.default=Object(f.a)(Object(i.a)({validate:function(e){var t={};return e.name||(t.name="Please enter a name"),e.slug||(t.slug="Please enter a slug"),t},form:"theme-add",fields:["name","slug"]})(Object(c.b)((function(e){return{themeAdded:e.theme.themeAdded,errorMessage:e.theme.addCategoryError}}),l)(g)))}}]);