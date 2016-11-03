import '../scss/index.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRedirect, Redirect, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import store from './core/store';
import Index from './components/Index';
import Bootstrap from './components/Bootstrap';
import Runtime from './components/Runtime';

const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={Index}>
        <IndexRedirect to="/bootstrap" />
        <Route path="bootstrap" component={Bootstrap} />
        <Route path="runtime" component={Runtime} />
        <Redirect path="*" to="/" />
      </Route>
    </Router>
  </Provider>, document.getElementById('content'));

document.body.classList.remove('loading');
