import {
  RUNTIME_START, RUNTIME_STOP, CHANGE_NAME, START_NODE, STOP_NODE, NODE_STARTED,
  NODE_STOPPED
} from '../actions';
import { id as randomId } from '../utils/random';

const initialState = {
  state: 'init',
  name: `node${randomId()}`,
  registry: 'https://kevoree.braindead.fr',
  resolver: 'https://unpkg.com'
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

    case START_NODE:
      return {
        ...state,
        state: 'starting'
      };

    case STOP_NODE:
      return {
        ...state,
        state: 'stopping'
      };

    case NODE_STARTED:
      return {
        ...state,
        state: 'started'
      };

    case NODE_STOPPED:
      return {
        ...state,
        state: 'stopped'
      };

    default:
      return state;
  }
};
