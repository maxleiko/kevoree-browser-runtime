import { combineReducers } from 'redux';

import bootstrap from './bootstrap';
import { routerReducer as routing } from 'react-router-redux';

export default combineReducers({
  bootstrap,
  routing
});
