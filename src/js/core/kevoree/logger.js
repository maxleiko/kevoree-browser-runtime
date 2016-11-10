import { addLog } from '../actions/logs';

export default (dispatch) => {
  return {
    info(tag = 'kevoree', message) {
      dispatch(addLog(tag, message, 'INFO'));
    },

    debug(tag = 'kevoree', message) {
      dispatch(addLog(tag, message, 'DEBUG'));
    },

    warn(tag = 'kevoree', message) {
      dispatch(addLog(tag, message, 'WARN'));
    },

    error(tag = 'kevoree', message) {
      dispatch(addLog(tag, message, 'ERROR'));
    },

    setLevel(level) {
      // TODO
    },

    setFilter(filter) {
      // TODO
    }
  };
};
