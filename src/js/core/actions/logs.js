import {ADD_LOG} from '.';

export function addLog(tag, message, time = Date.now()) {
  return {
    type: ADD_LOG,
    log: {
      id: performance.now(),
      time,
      tag,
      content: message
    }
  };
}
