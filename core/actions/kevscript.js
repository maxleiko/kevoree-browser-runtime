import {
  CHANGE_SCRIPT, MERGE_SCRIPT_START, KEVSCRIPT_ERROR, MERGE_SCRIPT_SUCCESS,
  EXECUTE_SCRIPT_START, EXECUTE_SCRIPT_SUCCESS, CHANGE_CTX_VARS, CHANGE_MODEL,
  MERGE_MODEL_START, MERGE_MODEL_ERROR, MERGE_MODEL_SUCCESS,
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

export function executeScript(script) {
  return function executeScriptThunk(dispatch, getState) {
    dispatch({ type: EXECUTE_SCRIPT_START, script });

    return new Promise((resolve, reject) => {
      const { core, kevs } = getState().runtime;
      const { ctxVars } = getState().kevscript;
      const ctxVarsClone = { ...ctxVars };
      kevs.parse(script, core.getCurrentModel(), ctxVarsClone, (err, model, warnings) => {
        if (err) {
          dispatch(addLog('error', Date.now(), 'KevScript', err.stack));
          dispatch({ type: KEVSCRIPT_ERROR, error: err, warnings });
          reject({ error: err, warnings });
        } else {
          dispatch({ type: EXECUTE_SCRIPT_SUCCESS, ctxVars: ctxVarsClone, model, warnings });
          resolve({ model, warnings });
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
      .then(res => dispatch(deployModel(res.model))
          .then(() => dispatch({ type: MERGE_SCRIPT_SUCCESS }))
          .catch(err => Promise.reject({ error: err })))
      .catch(res => Promise.reject(res.error));
  };
}

export function mergeModel() {
  return function mergeModelThunk(dispatch, getState) {
    dispatch({ type: MERGE_MODEL_START });
    const { model } = getState().kevscript;

    return dispatch(deployModel(model))
      .then(() => dispatch({ type: MERGE_MODEL_SUCCESS }))
      .catch(error => dispatch({ type: MERGE_MODEL_ERROR, error }));
  };
}
