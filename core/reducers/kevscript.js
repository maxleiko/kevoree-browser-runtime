import {
  MERGE_SCRIPT_START, KEVSCRIPT_ERROR, MERGE_SCRIPT_SUCCESS, CHANGE_SCRIPT,
  EXECUTE_SCRIPT_SUCCESS, CHANGE_CTX_VARS, CHANGE_MODEL,
} from '../actions';

const initialState = {
  state: 'init',
  error: null,
  script: `// bootstrap kevscript\n`,
  ctxVars: {},
  model: null,
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

    case EXECUTE_SCRIPT_SUCCESS:
      return {
        ...state,
        ctxVars: action.ctxVars,
      };

    case MERGE_SCRIPT_START:
      return {
        ...state,
        state: 'merging',
      };

    case KEVSCRIPT_ERROR:
      return {
        ...state,
        state: 'error',
        error: action.error,
      };

    case CHANGE_CTX_VARS:
      return {
        ...state,
        ctxVars: action.ctxVars,
      };

    case MERGE_SCRIPT_SUCCESS:
      return {
        ...state,
        state: 'merged',
      };

    default:
      return state;
  }
};
