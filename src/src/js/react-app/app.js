/* ==========================================================================
load foundation plugins - keep this
========================================================================== */
import $ from 'jquery';
import whatInput from 'what-input';
window.$ = $;
// import Foundation from 'foundation-sites';
// If you want to pick and choose which modules to include, 
// comment out the above and uncomment the line below
import './lib/foundation-explicit-pieces';
$(document).foundation(); 

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import customHistory from './history';
import { Router, Route, Switch } from 'react-router-dom';
import reduxThunk from 'redux-thunk';
import asyncComponent from './lib/async_component';

import Main from './components/main';
import ArtPiece from './components/art_piece';
import reducers from './reducers';
import { AUTH_USER } from './actions/types';
import { PrefixerProvider, withPrefixer } from 'react-prefixer-provider';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

const token = localStorage.getItem('token');
// If we have a token, consider the user to be signed in
if (token) {
  // we need to update application state
  store.dispatch({ type: AUTH_USER });
}


const protecetWarning = asyncComponent(() => 
  System.import('./components/admin/protected_warning').then(module => module.default)
)

const signin = asyncComponent(() => 
  System.import('./components/admin/auth/signin').then(module => module.default)
)

const signout = asyncComponent(() => 
  System.import('./components/admin/auth/signout').then(module => module.default)
)

const signup = asyncComponent(() => 
  System.import('./components/admin/auth/signup').then(module => module.default)
)

const admin = asyncComponent(() => 
  System.import('./components/admin/dashboard').then(module => module.default)
)

const articlesList = asyncComponent(() => 
  System.import('./components/admin/articles/articles_list').then(module => module.default)
)

const articleEdit = asyncComponent(() => 
  System.import('./components/admin/articles/article_edit').then(module => module.default)
)

const articleAdd = asyncComponent(() => 
  System.import('./components/admin/articles/article_add').then(module => module.default)
)

const usersList = asyncComponent(() => 
  System.import('./components/admin/users/users_list').then(module => module.default)
)

const categoryAdd = asyncComponent(() => 
  System.import('./components/admin/categories/category_add').then(module => module.default)
)

const categoryList = asyncComponent(() => 
  System.import('./components/admin/categories/category_list').then(module => module.default)
)

const categoryEdit = asyncComponent(() => 
  System.import('./components/admin/categories/category_edit').then(module => module.default)
)

const themeAdd = asyncComponent(() => 
  System.import('./components/admin/themes/theme_add').then(module => module.default)
)

const themeList = asyncComponent(() => 
  System.import('./components/admin/themes/theme_list').then(module => module.default)
)

const themeEdit = asyncComponent(() => 
  System.import('./components/admin/themes/theme_edit').then(module => module.default)
)

const backup = asyncComponent(() => 
  System.import('./components/admin/backup/backup').then(module => module.default)
)

// This prefixes everything with the webkit prefix. 
const myPrefixer = (styles) => {
  const prefixed = {}
  for (let key in styles) {
    prefixed["Webkit" + key[0].toUpperCase() + key.substr(1)] = styles[key]
  }
  return prefixed
}

//Header needs to be a pathless Route so it updates when 
//the route changes and use props.history
//<Route history={customHistory} component={Header} />

//note the "exact" in the /articles-list route
//for root app, swap /explore.html/ for /
ReactDOM.render(
  <PrefixerProvider prefixer={myPrefixer}>
  <Provider store={store}>
    <Router history={customHistory}>
      <div>
       <Switch history={customHistory}>
          {/* website */}
          <Route history={customHistory} exact path="/filter" component={withPrefixer(Main)} />
          <Route history={customHistory} path="/filter/artwork/:artId" component={ArtPiece} />
          {/* admin */}
          <Route history={customHistory} path="/admin/protected" component={protecetWarning} />
          <Route history={customHistory} path="/admin/signin" component={signin} />
          <Route history={customHistory} path="/admin/signout" component={signout} />
          <Route history={customHistory} exact path="/admin" component={admin} />
          <Route history={customHistory} path="/admin/signup" component={signup} /> 
          <Route history={customHistory} exact path="/admin/articles-list" component={articlesList} />
          <Route history={customHistory} path="/admin/articles-list/:articleId" component={articleEdit} />
          <Route history={customHistory} path="/admin/article-add" component={articleAdd} />
          <Route history={customHistory} path="/admin/users-list" component={usersList} />
          <Route history={customHistory} path="/admin/category-add" component={categoryAdd} />
          <Route history={customHistory} exact path="/admin/category-list" component={categoryList} />
          <Route history={customHistory} path="/admin/category-list/:categoryId" component={categoryEdit} />
          <Route history={customHistory} path="/admin/theme-add" component={themeAdd} />
          <Route history={customHistory} exact path="/admin/theme-list" component={themeList} />
          <Route history={customHistory} path="/admin/theme-list/:themeId" component={themeEdit} />
          <Route history={customHistory} path="/admin/backup" component={backup} />
        </Switch> 
      </div>  
    </Router>
  </Provider>
  </PrefixerProvider>
  , document.querySelector('.app-container'));

//export store for use with redux-watch
export { store };
