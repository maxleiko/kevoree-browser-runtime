import {
  CHANGE_VERSION, BOOTSTRAP_STATE, UPDATE_OPTIONS
} from '../actions';

const initialState = {
  modules: {
    'kevoree-library': {
      version: undefined,
      state: undefined,
      options: []
    },
    'kevoree-validator': {
      version: undefined,
      state: undefined,
      options: []
    },
    'kevoree-registry-api': {
      version: undefined,
      state: undefined,
      options: []
    },
    'kevoree-kevscript': {
      version: undefined,
      state: undefined,
      options: []
    },
    'kevoree-core': {
      version: undefined,
      state: undefined,
      options: []
    }
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_VERSION:
      return {
        ...state,
        modules: {
          ...state.modules,
          [action.name]: {
            ...state.modules[action.name],
            version: action.value
          }
        }
      };

    case UPDATE_OPTIONS:
      return {
        ...state,
        modules: {
          ...state.modules,
          [action.name]: {
            ...state.modules[action.name],
            options: action.options
          }
        }
      };

    case BOOTSTRAP_STATE:
      return {
        ...state,
        modules: {
          ...state.modules,
          [action.name]: {
            ...state.modules[action.name],
            state: action.value
          }
        }
      };

    default:
      return state;
  }
};
