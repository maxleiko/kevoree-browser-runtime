import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';
import persistState from 'redux-localstorage';

const LS_KEY = 'kevoree';

const initialState = JSON.parse(localStorage.getItem(LS_KEY) || '{}');

const store = createStore(reducer, initialState, compose(
  applyMiddleware(thunk),
  persistState(['settings'], { key: LS_KEY }),
  window.devToolsExtension ? window.devToolsExtension() : f => f
));

export default store;
