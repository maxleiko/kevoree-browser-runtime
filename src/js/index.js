import '../scss/index.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, Redirect, IndexRedirect, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import store from './core/store';
import Bootstrap from './components/Bootstrap';
import Runtime from './components/runtime/Runtime';
import Status from './components/runtime/status/Status';
import Logs from './components/runtime/logs/Logs';
import Grid from './components/runtime/grid/Grid';

const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={Bootstrap} />
      <Route path="runtime" component={Runtime}>
        <IndexRedirect to="status" />
        <Route path="status" component={Status} />
        <Route path="logs" component={Logs} />
        <Route path="grid" component={Grid} />
      </Route>
      <Redirect path="*" to="/" />
    </Router>
  </Provider>, document.getElementById('content'));

document.body.classList.remove('loading');
