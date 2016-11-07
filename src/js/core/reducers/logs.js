import {
  ADD_LOG
} from '../actions';

const initialState = {
  messages: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_LOG:
      return {
        ...state,
        messages: [...state.messages, action.log]
      };

    default:
      return state;
  }
};
