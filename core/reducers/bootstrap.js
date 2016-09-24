import {
  BOOTSTRAP_VERSION, BOOTSTRAP_START, BOOTSTRAP_ERROR, BOOTSTRAP_SUCCESS,
  RETRY_BOOTSTRAP, DOWNLOADED, DOWNLOADING, INSTALLED, INSTALLING,
} from '../actions';

const initialState = {
  state: 'init',
  error: null,
  modules: {
    'kevoree-library': {
      version: 'next',
      downloaded: false,
      downloading: false,
      installed: false,
      installing: false,
    },
    'kevoree-validator': {
      version: 'latest',
      downloaded: false,
      downloading: false,
      installed: false,
      installing: false,
    },
    'kevoree-registry-api': {
      version: 'latest',
      downloaded: false,
      downloading: false,
      installed: false,
      installing: false,
    },
    'kevoree-kevscript': {
      version: 'next',
      downloaded: false,
      downloading: false,
      installed: false,
      installing: false,
    },
    'kevoree-core': {
      version: 'next',
      downloaded: false,
      downloading: false,
      installed: false,
      installing: false,
    },
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case BOOTSTRAP_VERSION:
      return {
        ...state.bootstrap,
        modules: {
          ...state.modules,
          [action.name]: {
            ...state.modules[action.name],
            version: action.version,
          },
        },
      };

    case BOOTSTRAP_START:
      return {
        ...state,
        state: 'inProgress',
      };

    case BOOTSTRAP_ERROR:
      return {
        ...state,
        state: 'error',
        error: action.error,
      };

    case BOOTSTRAP_SUCCESS:
      return {
        ...state,
        state: 'done',
      };

    case RETRY_BOOTSTRAP:
      return initialState;

    case DOWNLOADING:
      return {
        ...state,
        modules: {
          ...state.modules,
          [action.name]: {
            ...state.modules[action.name],
            version: action.version,
            downloading: true,
          },
        },
      };

    case DOWNLOADED:
      return {
        ...state,
        modules: {
          ...state.modules,
          [action.name]: {
            ...state.modules[action.name],
            downloading: false,
            downloaded: true,
          },
        },
      };

    case INSTALLING:
      return {
        ...state,
        modules: {
          ...state.modules,
          [action.name]: {
            ...state.modules[action.name],
            installing: true,
            version: action.version,
          },
        },
      };

    case INSTALLED:
      return {
        ...state,
        modules: {
          ...state.modules,
          [action.name]: {
            ...state.modules[action.name],
            installing: false,
            installed: true,
            version: action.version,
          },
        },
      };

    default:
      return state;
  }
};
