import {
  BOOTSTRAP_VERSION, BOOTSTRAP_START, BOOTSTRAP_ERROR, BOOTSTRAP_SUCCESS,
  RETRY_BOOTSTRAP, INSTALLING, INSTALLED, RUNTIME_READY, DOWNLOADING,
  DOWNLOADED, RUNTIME_ERROR, RUNTIME_STOPPED,
} from '.';
import { changeScript } from './kevscript';
import { addLog } from './log';
import history from '../history';
import installer from '../kevoree/installer';
import KevoreeLogger from '../kevoree/KevoreeLogger';
import KevoreeModuleLoader from '../kevoree/KevoreeModuleLoader';

function downloadAndEvalTarball(resolver, dispatch, name, version) {
  dispatch({ type: DOWNLOADING, name, version });
  return installer(resolver, name, version)
    .then(() => dispatch({ type: DOWNLOADED, name, version }));
}

function fetchPkg(name, version) {
  return fetch(`https://unpkg.com/${name}@${version}`)
    .then(resp => {
      const splitted = resp.url.split('@');
      return splitted[splitted.length - 1];
    });
}

export function bootstrap() {
  return function bootstrapThunk(dispatch, getState) {
    dispatch({ type: BOOTSTRAP_START });
    const modules = getState().bootstrap.modules;
    const resolver = getState().settings.resolver;
    // TODO use localForage to cache downloads ?
    Object
      .keys(modules)
      .reduce((prev, name) => prev.then(() => {
        dispatch({ type: INSTALLING, name, version: modules[name].version });
        return fetchPkg(name, modules[name].version)
          .then(version => downloadAndEvalTarball(resolver, dispatch, name, version)
            .then(() => version))
          .then(version => dispatch({
            type: INSTALLED,
            name,
            version,
          }));
      }), Promise.resolve())
      .then(() => {
        dispatch({ type: BOOTSTRAP_SUCCESS });

        const logger = new KevoreeLogger('BrowserRuntime', dispatch);
        const kevs = new KevoreeKevscript(logger);
        const core = new KevoreeCore(kevs, '_fake_', logger);

        core.on('error', err => {
          dispatch(addLog('error', Date.now(), 'Core', err.stack));
          dispatch({ type: RUNTIME_ERROR, error: err });
        });

        core.on('stopped', () => dispatch({ type: RUNTIME_STOPPED }));

        core.setBootstrapper({
          name: 'BrowserResolver',
          bootstrapNodeType(nodeName, model, done) {
            const node = model.findNodesByID(nodeName);
            if (node) {
              const meta = node.typeDefinition
                .select('deployUnits[]/filters[name=platform,value=js]');
              if (meta.size() > 0) {
                this.resolve(meta.get(0).eContainer(), false, done);
              } else {
                const err = new Error(
                  `No DeployUnit found for '${nodeName}' that matches the 'js' platform`);
                done(err);
              }
            } else {
              const err = new Error(
                `Unable to find '${nodeName}' in given model`);
              done(err);
            }
          },
          bootstrap(du, forceInstall, done) {
            this.resolve(du, forceInstall, done);
          },
          resolve(du, forceInstall, done) {
            logger.debug(this.name, `Resolving ${du.name}@${du.version}...`);
            installer(resolver, du.name, du.version)
              .then(() => done(null, KevoreeModuleLoader.require(du.name, du.version)))
              .catch(done);
          },
          uninstall(du, done) {
            logger.debug(this.name, `Uninstalling DeployUnit ${du.name}@${du.version}...`);
            done();
          },
        });

        const { name } = getState().runtime;
        const script = `// bootstrap script
add ${name}: JavascriptNode/LATEST/LATEST
`;

        dispatch(changeScript(script));
        dispatch({ type: RUNTIME_READY, core, kevs, logger });
        history.push('/runtime');
      })
      .catch(error => dispatch({ type: BOOTSTRAP_ERROR, error }));
  };
}

export function changeVersion(name, newVal) {
  return {
    type: BOOTSTRAP_VERSION,
    name,
    version: newVal,
  };
}

export function retryBootstrap() {
  return {
    type: RETRY_BOOTSTRAP,
  };
}
