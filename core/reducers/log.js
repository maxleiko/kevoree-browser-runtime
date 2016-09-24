import {
  LOG, LOG_UNREAD, CLEAR_LOGS, POP_LOG,
} from '../actions';

const initialState = {
  logs: [],
  unread: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOG:
      return {
        ...state,
        logs: state.logs.concat([{
          time: action.time,
          level: action.level,
          tag: action.tag,
          message: action.message,
        }]),
      };

    case LOG_UNREAD:
      return {
        ...state,
        unread: action.value,
      };

    case POP_LOG:
      return {
        ...state,
        logs: state.logs.slice(1, state.logs.length - 1),
      };

    case CLEAR_LOGS:
      return {
        ...state,
        logs: [],
      };

    default:
      return state;
  }
};
