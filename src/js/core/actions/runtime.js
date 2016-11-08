import {
  CHANGE_NAME, START_NODE, STOP_NODE, NODE_STARTED, NODE_STOPPED
} from '.';
import { addLog } from './logs';

export function changeName(name) {
  return { type: CHANGE_NAME, name };
}

export function startNode() {
  return (dispatch, getState) => {
    dispatch({ type: START_NODE });
    dispatch(addLog('Runtime', `Starting node: ${getState().runtime.name}`));
    setTimeout(() => dispatch({ type: NODE_STARTED }), 2000);
  };
}

export function stopNode() {
  return (dispatch, getState) => {
    dispatch({ type: STOP_NODE });
    dispatch(addLog('Runtime', `Stopping node: ${getState().runtime.name}`));
    setTimeout(() => dispatch({ type: NODE_STOPPED }), 2000);
  };
}

export function changeRegistry(uri) {
  // TODO
}

export const STATES = ['init', 'started', 'starting', 'stopping', 'stopped', 'error'];
