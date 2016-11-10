import { combineReducers } from 'redux';

import bootstrap from './bootstrap';
import runtime from './runtime';
import logs from './logs';

export default combineReducers({
  bootstrap,
  runtime,
  logs
});
