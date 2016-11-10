import {ADD_LOG} from '.';

export function addLog(tag, message, level = 'INFO', time = Date.now()) {
  return {
    type: ADD_LOG,
    log: {
      id: performance.now(),
      time,
      level,
      tag,
      content: message
    }
  };
}
