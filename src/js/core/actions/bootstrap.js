import {
  CHANGE_VERSION
} from '.';
import { push } from 'react-router-redux';

export function changeVersion(name, value) {
  return { type: CHANGE_VERSION, name, value };
}

export function bootstrap() {
  return (dispatch) => {
    dispatch(push('/runtime'));
  };
}
