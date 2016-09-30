import {
  MERGE_SCRIPT_START, KEVSCRIPT_ERROR, MERGE_SCRIPT_SUCCESS, CHANGE_SCRIPT,
  EXECUTE_SCRIPT_SUCCESS, CHANGE_CTX_VARS, CHANGE_MODEL, EXECUTE_SCRIPT_START,
  MERGE_MODEL_START, MERGE_MODEL_ERROR, MERGE_MODEL_SUCCESS,
} from '../actions';

const initialState = {
  state: 'init',
  script: `// bootstrap kevscript\n`,
  ctxVars: {},
  model: null,
  error: null,
  warnings: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_SCRIPT:
      return {
        ...state,
        script: action.script,
      };

    case CHANGE_MODEL:
      return {
        ...state,
        model: action.model,
      };

    case EXECUTE_SCRIPT_START:
      return {
        ...state,
        state: 'executing',
        script: action.script,
      };

    case EXECUTE_SCRIPT_SUCCESS:
      return {
        ...state,
        state: 'mergeable',
        ctxVars: action.ctxVars,
        model: action.model,
        warnings: action.warnings,
        error: null,
      };

    case MERGE_SCRIPT_START:
      return {
        ...state,
        state: 'merging',
      };

    case MERGE_SCRIPT_SUCCESS:
      return {
        ...state,
        state: 'merged',
        script: '',
        model: null,
        ctxVars: {},
      };

    case MERGE_MODEL_START:
      return {
        ...state,
        state: 'merging',
      };

    case MERGE_MODEL_ERROR:
      return {
        ...state,
        state: 'error',
        error: action.error,
      };

    case MERGE_MODEL_SUCCESS:
      return {
        ...state,
        state: 'merged',
        script: '',
      };

    case KEVSCRIPT_ERROR:
      return {
        ...state,
        state: 'error',
        error: action.error,
        warnings: action.warnings,
      };

    case CHANGE_CTX_VARS:
      return {
        ...state,
        ctxVars: action.ctxVars,
      };

    default:
      return state;
  }
};
