import {
  CHANGE_SCRIPT, MERGE_SCRIPT_START, KEVSCRIPT_ERROR, MERGE_SCRIPT_SUCCESS,
  EXECUTE_SCRIPT_START, EXECUTE_SCRIPT_SUCCESS, CHANGE_CTX_VARS, CHANGE_MODEL,
} from '.';
import { addLog } from './log';
import { deployModel } from './runtime';

export function changeScript(script) {
  return { type: CHANGE_SCRIPT, script };
}

export function changeCtxVars(ctxVars) {
  return { type: CHANGE_CTX_VARS, ctxVars };
}

export function changeModel(model) {
  return { type: CHANGE_MODEL, model };
}

export function executeScript(script, ctxModel, ctxVars) {
  return function executeScriptThunk(dispatch, getState) {
    dispatch({ type: EXECUTE_SCRIPT_START });

    return new Promise((resolve, reject) => {
      const ctxVarsClone = { ...ctxVars };
      getState().runtime.kevs.parse(script, ctxModel, ctxVarsClone, (err, model) => {
        if (err) {
          dispatch(addLog('error', Date.now(), 'KevScript', err.stack));
          dispatch({ type: KEVSCRIPT_ERROR, error: err });
          reject(err);
        } else {
          dispatch({ type: EXECUTE_SCRIPT_SUCCESS, ctxVars: ctxVarsClone });
          resolve(model);
        }
      });
    });
  };
}

export function mergeScript() {
  return function mergeScriptThunk(dispatch, getState) {
    dispatch({ type: MERGE_SCRIPT_START });

    const { core } = getState().runtime;
    const { script, ctxVars } = getState().kevscript;
    return dispatch(executeScript(script, core.getCurrentModel(), ctxVars))
      .then(model => dispatch(deployModel(model)))
      .then(() => dispatch({ type: MERGE_SCRIPT_SUCCESS }));
  };
}
