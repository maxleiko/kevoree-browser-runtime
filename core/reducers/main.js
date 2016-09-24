import pkg from '../../package.json';
import { ROUTE } from '../actions';

const initialState = {
  version: pkg.version,
  route: '/',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ROUTE:
      return {
        ...state,
        route: action.route,
      };

    default:
      return state;
  }
};
