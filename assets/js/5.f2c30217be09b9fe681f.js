(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{324:function(e,t,n){"use strict";n.d(t,"a",(function(){return b}));var r=n(323),o=n(24),a=n(0),i=n.n(a),c=n(22),s=(n(3),n(10)),l=n(19),u=n(21);i.a.Component;i.a.Component;var f=function(e,t){return"function"==typeof e?e(t):e},p=function(e,t){return"string"==typeof e?Object(c.c)(e,null,null,t):e},m=function(e){return e},d=i.a.forwardRef;void 0===d&&(d=m);var y=d((function(e,t){var n=e.innerRef,r=e.navigate,o=e.onClick,a=Object(l.a)(e,["innerRef","navigate","onClick"]),c=a.target,u=Object(s.a)({},a,{onClick:function(e){try{o&&o(e)}catch(t){throw e.preventDefault(),t}e.defaultPrevented||0!==e.button||c&&"_self"!==c||function(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}(e)||(e.preventDefault(),r())}});return u.ref=m!==d&&t||n,i.a.createElement("a",u)}));var b=d((function(e,t){var n=e.component,o=void 0===n?y:n,a=e.replace,c=e.to,b=e.innerRef,h=Object(l.a)(e,["component","replace","to","innerRef"]);return i.a.createElement(r.d.Consumer,null,(function(e){e||Object(u.a)(!1);var n=e.history,r=p(f(c,e.location),e.location),l=r?n.createHref(r):"",y=Object(s.a)({},h,{href:l,navigate:function(){var t=f(c,e.location);(a?n.replace:n.push)(t)}});return m!==d?y.ref=t||b:y.innerRef=b,i.a.createElement(o,y)}))})),h=function(e){return e},v=i.a.forwardRef;void 0===v&&(v=h);v((function(e,t){var n=e["aria-current"],o=void 0===n?"page":n,a=e.activeClassName,c=void 0===a?"active":a,m=e.activeStyle,d=e.className,y=e.exact,g=e.isActive,w=e.location,k=e.strict,E=e.style,O=e.to,_=e.innerRef,j=Object(l.a)(e,["aria-current","activeClassName","activeStyle","className","exact","isActive","location","strict","style","to","innerRef"]);return i.a.createElement(r.d.Consumer,null,(function(e){e||Object(u.a)(!1);var n=w||e.location,a=p(f(O,n),n),l=a.pathname,N=l&&l.replace(/([.+*?=^!:${}()[\]|/\\])/g,"\\$1"),S=N?Object(r.e)(n.pathname,{path:N,exact:y,strict:k}):null,R=!!(g?g(S,n):S),U=R?function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return t.filter((function(e){return e})).join(" ")}(d,c):d,C=R?Object(s.a)({},E,{},m):E,P=Object(s.a)({"aria-current":R&&o||null,className:U,style:C,to:a},j);return h!==v?P.ref=t||_:P.innerRef=_,i.a.createElement(b,P)}))}))},326:function(e,t,n){"use strict";var r=n(0),o=n.n(r),a=n(324),i=n(327),c=n.n(i),s=n(5);function l(e){return(l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function u(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function f(e,t){return!t||"object"!==l(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function p(e){return(p=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function m(e,t){return(m=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var d=function(e){function t(e){var n;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),(n=f(this,p(t).call(this,e))).state={linkList:[{title:"Website",link:"/",active:!1},{title:"Logout",link:"/"+s.globals.ADMIN_URL+"/signout",active:!1},{title:"Dashboard",link:"/"+s.globals.ADMIN_URL,active:!1},{title:"View Articles",link:"/"+s.globals.ADMIN_URL+"/articles-list",active:!1},{title:"Add Articles",link:"/"+s.globals.ADMIN_URL+"/article-add",active:!1},{title:"View Plants",link:"/"+s.globals.ADMIN_URL+"/trees-list",active:!1},{title:"Add Plants",link:"/"+s.globals.ADMIN_URL+"/tree-add",active:!1},{title:"View Users",link:"/"+s.globals.ADMIN_URL+"/users-list",active:!1},{title:"Add User",link:"/"+s.globals.ADMIN_URL+"/signup",active:!1},{title:"View Categories",link:"/"+s.globals.ADMIN_URL+"/category-list",active:!1},{title:"Add Category",link:"/"+s.globals.ADMIN_URL+"/category-add",active:!1},{title:"Backup",link:"/"+s.globals.ADMIN_URL+"/backup",active:!1}]},n}var n,r,i;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&m(e,t)}(t,e),n=t,(r=[{key:"componentDidMount",value:function(){var e=c()(this.state.linkList);e.forEach((function(e,t){e.active&&(e.active=!1),e.link===window.location.pathname&&(e.active=!0)})),this.setState({linkList:e})}},{key:"onLinkClick",value:function(e){}},{key:"renderButtons",value:function(){var e=this;return this.state.linkList.map((function(t,n){return o.a.createElement("li",{key:n,className:"".concat(t.active?"active":"")},o.a.createElement(a.a,{onClick:e.onLinkClick.bind(e),className:"nav-link",to:t.link,"data-id":n},t.title))}))}},{key:"render",value:function(){return o.a.createElement("div",{className:"columns small-12 large-3 admin-sidebar"},o.a.createElement("ul",{className:"vertical menu admin-side-menu"},this.renderButtons()))}}])&&u(n.prototype,r),i&&u(n,i),t}(r.Component);t.a=d},327:function(e,t,n){var r=n(147);e.exports=function(e){return r(e,5)}},328:function(e,t,n){"use strict";var r=n(0),o=n.n(r),a=n(6),i=n(5);function c(e){return(c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function s(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function l(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function u(e,t){return!t||"object"!==c(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function f(e){return(f=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function p(e,t){return(p=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}t.a=function(e){var t=function(t){function n(){return s(this,n),u(this,f(n).apply(this,arguments))}var r,a,c;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&p(e,t)}(n,t),r=n,(a=[{key:"componentWillMount",value:function(){this.props.authenticated||this.props.history.push("/"+i.globals.ADMIN_URL+"/protected")}},{key:"componentWillUpdate",value:function(e){e.authenticated||this.props.history.push("/"+i.globals.ADMIN_URL+"/protected")}},{key:"render",value:function(){return o.a.createElement(e,this.props)}}])&&l(r.prototype,a),c&&l(r,c),n}(r.Component);return Object(a.b)((function(e){return{authenticated:e.auth.authenticated}}))(t)}},329:function(e,t,n){"use strict";var r=n(0),o=n.n(r);function a(){return(a=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}t.a=function(e){var t=e.meta,n=t.touched,r=t.error,i="form-group ".concat(n&&r?"has-danger":"");return"textarea"===e.type?o.a.createElement("div",{className:i},o.a.createElement("label",null,e.label),o.a.createElement("textarea",a({className:"form-control",rows:"12",cols:"50"},e.input)),o.a.createElement("div",{className:"error"},n?r:"")):o.a.createElement("div",{className:i},o.a.createElement("label",null,e.label),o.a.createElement("input",a({className:"form-control",type:"text"},e.input)),o.a.createElement("div",{className:"error"},n?r:""))}},332:function(e,t,n){"use strict";n.r(t),n.d(t,"signinUser",(function(){return s})),n.d(t,"signupUser",(function(){return l})),n.d(t,"clearUser",(function(){return u})),n.d(t,"authError",(function(){return f})),n.d(t,"signoutUser",(function(){return p})),n.d(t,"fetchMessage",(function(){return m}));var r=n(36),o=n.n(r),a=(n(11),n(1)),i=n(5).production.SERVER_URL,c=n(5).globals.POST_CONFIG;function s(e){var t=e.email,n=e.password,r=e.key;return function(e){o.a.post("".concat(i,"/users/sign_in"),{email:t,password:n,key:r},c).then((function(t){t.data.token?(e({type:a.k}),localStorage.setItem("token",t.data.token)):e(f("Bad Login Info"))})).catch((function(){e(f("Error logging in"))}))}}function l(e){var t=e.email,n=e.password;return function(e){o.a.post("".concat(i,"/users/create"),{email:t,password:n}).then((function(t){t.data.error?e(f("there was an error signing up user: ".concat(t.data.error))):e({type:a.i,payload:t.data})})).catch((function(t){return e(f("there was an error signing up: ".concat(t)))}))}}function u(){return{type:a.i,payload:""}}function f(e){return{type:a.j,payload:e}}function p(){return localStorage.removeItem("token"),{type:a.ab}}function m(){return function(e){o.a.get(i,{headers:{authorization:localStorage.getItem("token")}}).then((function(t){e({type:a.w,payload:t.data.message})}))}}},366:function(e,t,n){"use strict";n.r(t);var r=n(0),o=n.n(r),a=n(326),i=n(92),c=n(93),s=n(332),l=n(6),u=n(329),f=n(328);function p(e){return(p="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function m(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function d(e,t){return!t||"object"!==p(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function y(e){return(y=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function b(e,t){return(b=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var h=function(e){function t(e){var n;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),(n=d(this,y(t).call(this,e))).state={renderSuccess:!1},n}var n,r,c;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&b(e,t)}(t,e),n=t,(r=[{key:"componentWillReceiveProps",value:function(e){e.location!==this.props.location&&this.props.reset("signup")}},{key:"handleFormSubmit",value:function(e){this.props.signupUser(e)}},{key:"renderAlert",value:function(){if(this.props.errorMessage)return o.a.createElement("div",{className:"alert alert-danger"},o.a.createElement("strong",null,"Oops!")," ",this.props.errorMessage)}},{key:"renderSuccess",value:function(){if(this.props.user&&!this.props.errorMessage){var e=this.props.user;return o.a.createElement("p",null,"user: ",e," successfully added")}}},{key:"componentDidUpdate",value:function(e){this.props.user&&this.props.user!=this.props.user&&this.props.authError("")}},{key:"componentWillUnmount",value:function(){this.props.authError(""),this.props.clearUser()}},{key:"render",value:function(){var e=this.props,t=e.handleSubmit,n=e.fields;return n.email,n.password,n.passwordConfirm,o.a.createElement("div",{className:"admin-main"},o.a.createElement("div",{className:"row"},o.a.createElement(a.a,null),o.a.createElement("div",{className:"columns small-12 large-9"},o.a.createElement("h3",{className:"margin-bottom"},"Add User"),o.a.createElement("form",{onSubmit:t(this.handleFormSubmit.bind(this))},o.a.createElement(i.a,{label:"Email:",name:"email",component:u.a}),o.a.createElement(i.a,{label:"Password:",name:"password",component:u.a}),o.a.createElement(i.a,{label:"Confirm Password:",name:"passwordConfirm",component:u.a}),o.a.createElement("button",{action:"submit",className:"btn btn-primary"},"Sign up!")),this.renderAlert(),this.renderSuccess())))}}])&&m(n.prototype,r),c&&m(n,c),t}(r.Component);t.default=Object(f.a)(Object(c.a)({validate:function(e){var t={};return e.email||(t.email="Please enter an email"),e.password||(t.password="Please enter a password"),e.passwordConfirm||(t.passwordConfirm="Please enter a password confirmation"),e.password!==e.passwordConfirm&&(t.password="Passwords must match"),new RegExp("^((?=.*[A-Z]|[a-z])(?=.*[0-9]))(?=.{6,})").test(e.password)||(t.password="password must be at least 6 characters long with at least one numeric character"),t},form:"signup",fields:["email","password","passwordConfirm"]})(Object(l.b)((function(e){return{errorMessage:e.auth.error,user:e.auth.user}}),{signupUser:s.signupUser,authError:s.authError,clearUser:s.clearUser})(h)))}}]);