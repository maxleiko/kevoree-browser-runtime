import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import bootstrap from './bootstrap';
import runtime from './runtime';

export default combineReducers({
  bootstrap,
  runtime,
  routing
});
