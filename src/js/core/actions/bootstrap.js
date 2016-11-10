import {
  CHANGE_VERSION, CHANGE_STATE, BOOTSTRAP_STATE, UPDATE_OPTIONS
} from '.';
import { addLog } from './logs';
import addScript from '../utils/add-script';
import rts from '../utils/remove-trailing-slash';

export function changeVersion(name, value) {
  return { type: CHANGE_VERSION, name, value };
}

export function getOptions() {
  return (dispatch, getState) => {
    const modules = getState().bootstrap.modules;
    Object.keys(modules).forEach(name => {
      fetch(`https://registry.npmjs.cf/${name}`)
        .then(res => res.json())
        .then(json => {
          const options = Object.keys(json.versions)
            .reverse()
            .map(vers => {
              let sub = undefined;
              for (const key in json['dist-tags']) {
                if (json['dist-tags'][key] === vers) {
                  sub = key;
                  break;
                }
              }
              return { value: vers, tag: sub };
            });
          dispatch({ type: UPDATE_OPTIONS, name, options });
          dispatch({ type: CHANGE_VERSION, name, value: options[0].value });
        })
        .catch(err =>
          dispatch(addLog('Runtime', `Fetching ${name} failed`, 'ERROR')));
    });
  };
}

export function bootstrap() {
  return (dispatch, getState) => {
    dispatch(addLog('Runtime', 'Bootstrapping platform...', 'DEBUG'));
    dispatch({ type: CHANGE_STATE, value: 'bootstrapping' });

    const { modules } = getState().bootstrap;
    const { resolver, devMode } = getState().runtime;

    return Object
      .keys(modules)
      .reduce((prev, name) => prev.then(() => {
        dispatch({ type: BOOTSTRAP_STATE, name, value: 'installing' });
        const version = modules[name].version;
        if (devMode) {
          return addScript(`http://localhost:59000/browser/${name}.js`)
            .then(() => dispatch({ type: BOOTSTRAP_STATE, name, value: 'installed' }))
            .catch(() => {
              // if unable to install script from localhost:59000 then try with resolver
              return addScript(`${rts(resolver)}/${name}@${version}/browser/${name}.js`);
            });
        } else {
          return addScript(`${rts(resolver)}/${name}@${version}/browser/${name}.js`)
            .then(() => dispatch({ type: BOOTSTRAP_STATE, name, value: 'installed' }));
        }
      }), Promise.resolve());
  };
}
