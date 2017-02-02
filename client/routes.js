/* eslint-disable global-require */
import React from 'react';
import { Route, IndexRoute, IndexRedirect } from 'react-router';
import App from './modules/App/App';
import Auth from './modules/Auth/models/Auth';

// require.ensure polyfill for node
if (typeof require.ensure !== 'function') {
  require.ensure = function requireModule(deps, callback) {
    callback(require);
  };
}

/* Workaround for async react routes to work with react-hot-reloader till
  https://github.com/reactjs/react-router/issues/2182 and
  https://github.com/gaearon/react-hot-loader/issues/288 is fixed.
 */
if (process.env.NODE_ENV !== 'production') {
  // Require async routes only in development for react-hot-reloader to work.
  require('./modules/Post/pages/PostListPage/PostListPage');
  require('./modules/Post/pages/PostDetailPage/PostDetailPage');
  require('./modules/Auth/pages/LoginPage/LoginPage');
  require('./modules/Auth/pages/SignUpPage/SignUpPage');
}
const cb = () => {
  setTimeout(() => window.scrollTo(0, 0), 1000);
}
const requireLogin = (nextState, replace, cb) => {
        const isAuthenticated = Auth.isUserAuthenticated();
        console.log("in requireLogin",isAuthenticated);
        if (!isAuthenticated) {
            replace('/login');
        }
        cb();
};

// react-router setup with code-splitting
// More info: http://blog.mxstbr.com/2016/01/react-apps-with-pages/
export default (
  <Route path="/" component={App}>
    <Route
      path="/signup"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/Auth/pages/SignUpPage/SignUpPage').default);
        });
      }}
    />
    <Route
      path="/login"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/Auth/pages/LoginPage/LoginPage').default);
        });
      }}
    />
    <IndexRedirect
      to="/posts"
    />
    <Route
      path="/posts"
      onEnter={requireLogin}
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/Post/pages/PostListPage/PostListPage').default);
        });
      }}
    />
    <Route
      path="/posts/:slug-:cuid"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/Post/pages/PostDetailPage/PostDetailPage').default);
        });
      }}
    />
  </Route>
);
