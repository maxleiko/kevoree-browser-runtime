import { combineReducers } from 'redux';

import log from './log';
import main from './main';
import runtime from './runtime';
import settings from './settings';
import bootstrap from './bootstrap';
import kevscript from './kevscript';


export default combineReducers({
  main,
  bootstrap,
  runtime,
  settings,
  kevscript,
  log,
});
