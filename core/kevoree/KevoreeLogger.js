import { addLog } from '../actions/log';

export default class KevoreeLogger {
  constructor(tag, dispatch) {
    this.tag = tag;
    this.dispatch = dispatch;
  }

  info(tag = this.tag, msg) {
    this.dispatch(addLog('info', Date.now(), tag, msg));
  }

  debug(tag = this.tag, msg) {
    this.dispatch(addLog('debug', Date.now(), tag, msg));
  }

  warn(tag = this.tag, msg) {
    this.dispatch(addLog('warn', Date.now(), tag, msg));
  }

  error(tag = this.tag, msg) {
    this.dispatch(addLog('error', Date.now(), tag, msg));
  }

  setLevel() { /* TODO dispatch */ }
  setFilter() { /* TODO dispatch */ }
}
