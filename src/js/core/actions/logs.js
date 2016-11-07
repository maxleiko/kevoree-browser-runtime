import {
  ADD_LOG
} from '.';

export function addLog(tag, message, time = Date.now()) {
  return { type: ADD_LOG, log: { time, tag, content: message } };
}
