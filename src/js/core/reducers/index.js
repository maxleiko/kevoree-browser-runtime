import { combineReducers } from 'redux';

import bootstrap from './bootstrap';
import kevscript from './kevscript';
import runtime from './runtime';
import logs from './logs';

export default combineReducers({
  bootstrap,
  kevscript,
  runtime,
  logs
});
