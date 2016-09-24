import {
  RUNTIME_READY, RUNTIME_STARTED, RUNTIME_ERROR, CHANGE_TAB, CHANGE_NAME,
  RUNTIME_STARTING,
} from '../actions';
import random from '../../utils/random';

const id = random.id();

const initialState = {
  state: 'init',
  error: null,
  activeTab: 0,
  name: `node${id.charAt(0).toUpperCase() + id.slice(1)}`,
  core: null,
  kevs: null,
  logger: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case RUNTIME_STARTED:
      return {
        ...state,
        state: 'started',
      };

    case RUNTIME_STARTING:
      return {
        ...state,
        state: 'starting',
      };

    case RUNTIME_READY:
      return {
        ...state,
        state: 'ready',
        core: action.core,
        kevs: action.kevs,
        logger: action.logger,
      };

    case RUNTIME_ERROR:
      return {
        ...state,
        state: 'error',
        error: action.error,
      };

    case CHANGE_TAB:
      return {
        ...state,
        activeTab: action.id,
      };

    case CHANGE_NAME:
      return {
        ...state,
        name: action.name,
      };

    default:
      return state;
  }
};
