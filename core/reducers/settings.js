import {
  REGISTRY_HOST, REGISTRY_PORT, REGISTRY_SSL, RESOLVER,
} from '../actions';

const initialState = {
  host: 'kevoree.braindead.fr',
  port: 443,
  ssl: true,
  resolver: 'https://unpkg.com', // 'http://unpkg.com',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case REGISTRY_HOST:
      return {
        ...state,
        host: action.value,
      };

    case REGISTRY_PORT:
      return {
        ...state,
        port: action.value,
      };

    case REGISTRY_SSL:
      return {
        ...state,
        ssl: action.value,
      };

    case RESOLVER:
      return {
        ...state,
        resolver: action.value,
      };

    default:
      return state;
  }
};
