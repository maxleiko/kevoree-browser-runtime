/* globals KevoreeCore, KevoreeKevscript */

import {
  CHANGE_NAME, CHANGE_STATE, TOGGLE_DEV_MODE, ERROR, CHANGE_REGISTRY,
  CHANGE_RESOLVER
} from '.';
import { addLog } from './logs';
import { bootstrap } from './bootstrap';
import loggerFactory from '../kevoree/logger';
import bootstrapperFactory from '../kevoree/bootstrapper';
import updateRegistry from '../kevoree/update-registry';

export function changeName(name) {
  return { type: CHANGE_NAME, name };
}

export function start() {
  return (dispatch, getState) => {
    dispatch(bootstrap())
      .then(() => dispatch({ type: CHANGE_STATE, value: 'starting' }))
      .then(() => dispatch(addLog('Runtime', `Starting node: ${getState().runtime.name}`)))
      .then(() => {
        return new Promise((resolve, reject) => {
          const logger = loggerFactory(dispatch);
          const kevs = new KevoreeKevscript(logger);
          const core = new KevoreeCore(kevs, '_fake_', logger);

          core.setBootstrapper(bootstrapperFactory(getState, logger));

          core.on('error', (err) => {
            dispatch({ type: ERROR, error: err });
            dispatch({ type: CHANGE_STATE, value: 'error' });
          });

          core.on('stopped', () => {
            dispatch({ type: CHANGE_STATE, value: 'stopped' });
          });

          const { name } = getState().runtime;
          core.start(name);

          const script = `add ${name}: JavascriptNode/LATEST/LATEST`;

          kevs.parse(script, (err, model) => {
            if (err) {
              reject(err);
            } else {
              core.deploy(model, (err) => {
                if (err) {
                  reject(err);
                } else {
                  resolve();
                }
              });
            }
          });
        });
      })
      .then(() => dispatch({ type: CHANGE_STATE, value: 'started' }))
      .catch(err => {
        dispatch(addLog('Runtime', err.message, 'ERROR'));
        dispatch({ type: ERROR, error: err });
        dispatch({ type: CHANGE_STATE, value: 'error' });
      });
  };
}

export function stop() {
  return (dispatch, getState) => {
    dispatch({ type: CHANGE_STATE, value: 'stopping' });
    dispatch(addLog('Runtime', `Stopping node: ${getState().runtime.name}`));
    setTimeout(() => dispatch({ type: CHANGE_STATE, value: 'stopped' }), 2000);
  };
}

export function changeRegistry(uri) {
  updateRegistry(uri);
  return { type: CHANGE_REGISTRY, value: uri };
}

export function changeResolver(uri) {
  return { type: CHANGE_RESOLVER, value: uri };
}

export function toggleDevMode() {
  return { type: TOGGLE_DEV_MODE };
}

export const STATES = [
  'init', 'bootstrapping', 'bootstrapped', 'started', 'starting', 'stopping',
  'stopped', 'error'
];
