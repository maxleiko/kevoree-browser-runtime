import {
  CHANGE_VERSION
} from '.';

export function changeVersion(name, value) {
  return { type: CHANGE_VERSION, name, value };
}
