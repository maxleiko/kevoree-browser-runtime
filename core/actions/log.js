import {
  LOG, CLEAR_LOGS, POP_LOG, LOG_UNREAD,
} from '.';

export function increaseUnread(unread, activeTab) {
  let unreadCount = unread;
  if (activeTab === 1) {
    unreadCount = 0;
  } else {
    unreadCount++;
  }
  return { type: LOG_UNREAD, value: unreadCount };
}

export function addLog(level, time, tag, message) {
  return function addLogThunk(dispatch, getState) {
    const state = getState();

    if (state.log.logs.length >= 250) {
      dispatch({ type: POP_LOG });
    }
    dispatch(increaseUnread(state.log.unread, state.runtime.activeTab));
    dispatch({ type: LOG, time, level, tag, message });
  };
}

export function clearLogs() {
  return { type: CLEAR_LOGS };
}
