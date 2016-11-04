/* globals NODE_ENV */

import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';

import reducers from './reducers';

const initialState = {};

const customCompose =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__  &&
    NODE_ENV === 'development' ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;
const enhancer = customCompose(
  // Middlewares to use in development:
  applyMiddleware(thunk, routerMiddleware(browserHistory))
);

// Sync dispatched route actions to the history
const store = createStore(reducers, initialState, enhancer);

if (module.hot) {
  module.hot.accept('./reducers', () => {
    store.replaceReducer(require('./reducers').default);
  });
}

export default store;
