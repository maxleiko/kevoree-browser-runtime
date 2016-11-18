import {
  UPDATE_KEVSCRIPT
} from '.';

export function updateScript(script) {
  return { type: UPDATE_KEVSCRIPT, value: script };
}
