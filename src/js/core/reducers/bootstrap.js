import {
  CHANGE_VERSION
} from '../actions';

const initialState = {
  modules: {
    'kevoree-library': {
      version: 'next',
      downloaded: false,
      downloading: false,
      installed: false,
      installing: false
    },
    'kevoree-validator': {
      version: 'latest',
      downloaded: false,
      downloading: false,
      installed: false,
      installing: false
    },
    'kevoree-registry-api': {
      version: 'latest',
      downloaded: false,
      downloading: false,
      installed: false,
      installing: false
    },
    'kevoree-kevscript': {
      version: 'next',
      downloaded: false,
      downloading: false,
      installed: false,
      installing: false
    },
    'kevoree-core': {
      version: 'next',
      downloaded: false,
      downloading: false,
      installed: false,
      installing: false
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

    default:
      return state;
  }
};
