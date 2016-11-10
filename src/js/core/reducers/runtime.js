import {
  RUNTIME_START, RUNTIME_STOP, CHANGE_NAME, CHANGE_STATE, TOGGLE_DEV_MODE,
  ERROR, CHANGE_RESOLVER, CHANGE_REGISTRY
} from '../actions';
import { id as randomId } from '../utils/random';

const initialState = {
  state: 'init',
  name: `node${randomId()}`,
  registry: 'https://kevoree.braindead.fr',
  resolver: 'https://unpkg.com',
  devMode: false,
  error: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case RUNTIME_START:
      return {
        ...state,
        state: 'started'
      };

    case RUNTIME_STOP:
      return {
        ...state,
        state: 'stopped'
      };

    case CHANGE_NAME:
      return {
        ...state,
        name: action.name
      };

    case CHANGE_REGISTRY:
      return {
        ...state,
        registry: action.value
      };

    case CHANGE_RESOLVER:
      return {
        ...state,
        resolver: action.value
      };

    case CHANGE_STATE:
      return {
        ...state,
        state: action.value
      };

    case TOGGLE_DEV_MODE:
      return {
        ...state,
        devMode: !state.devMode
      };

    case ERROR:
      return {
        ...state,
        error: action.error
      };

    default:
      return state;
  }
};
