import '../scss/index.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, Redirect, IndexRedirect, browserHistory } from 'react-router';
import TinyConf from 'tiny-conf';

import store from './core/store';
import Runtime from './components/runtime/Runtime';
import Status from './components/runtime/status/Status';
import Logs from './components/runtime/logs/Logs';
import Grid from './components/runtime/grid/Grid';
import About from './components/runtime/about/About';

import { getOptions } from './core/actions/bootstrap';
import updateRegistry from './core/kevoree/update-registry';

// get latest versions from npm registry for bootstrap deps
store.dispatch(getOptions());

// set TinyConf accessible to anyone (singleton)
global.TinyConf = TinyConf;
updateRegistry(store.getState().runtime.registry);

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Runtime}>
        <IndexRedirect to="status" />
        <Route path="status" component={Status} />
        <Route path="logs" component={Logs} />
        <Route path="grid" component={Grid} />
        <Route path="about" component={About} />
      </Route>
      <Redirect path="*" to="/" />
    </Router>
  </Provider>, document.getElementById('content'));

document.body.classList.remove('loading');
