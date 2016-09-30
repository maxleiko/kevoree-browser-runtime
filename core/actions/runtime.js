import {
  RUNTIME_STARTED, RUNTIME_ERROR, CHANGE_TAB, CHANGE_NAME, RUNTIME_STARTING,
  DEPLOY_START, DEPLOY_ERROR, DEPLOY_SUCCESS,
} from '.';
import { increaseUnread } from './log';
import { mergeScript } from './kevscript';

export function startRuntime() {
  return function startRuntimeThunk(dispatch, getState) {
    const { core, name } = getState().runtime;
    core.start(name);
    dispatch({ type: RUNTIME_STARTING });
    dispatch(mergeScript())
      .then(() => dispatch({ type: RUNTIME_STARTED }))
      .catch(err => {
        // console.log('runtimeError in startRuntime', err);
        dispatch({ type: RUNTIME_ERROR, error: err });
      });
  };
}

export function stopRuntime() {
  return function stopRuntimeThunk(dispatch, getState) {
    const { core } = getState().runtime;
    core.stop();
  };
}

export function deployModel(model) {
  return function deployModelThunk(dispatch, getState) {
    dispatch({ type: DEPLOY_START });

    return new Promise((resolve, reject) => {
      getState().runtime.core.deploy(model, err => {
        if (err) {
          // console.log('ERROR?', err);
          dispatch({ type: DEPLOY_ERROR, error: err });
          reject(err);
        } else {
          dispatch({ type: DEPLOY_SUCCESS });
          resolve();
        }
      });
    });
  };
}

export function changeTab(id) {
  return function changeTabThunk(dispatch) {
    dispatch({ type: CHANGE_TAB, id });
    if (id === 1) {
      dispatch(increaseUnread(-1, 1));
    }
  };
}

export function changeName(name) {
  return { type: CHANGE_NAME, name };
}
