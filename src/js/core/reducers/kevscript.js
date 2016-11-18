import {
  UPDATE_KEVSCRIPT
} from '../actions';

const initialState = {
  script: '// TODO',
  defaultScript: 'add {name}: JavascriptNode/LATEST/LATEST'
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_KEVSCRIPT:
      return {
        ...state,
        script: action.value
      };

    default:
      return state;
  }
};
