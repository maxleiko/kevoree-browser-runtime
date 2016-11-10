import qs from 'querystring';

import KevoreeModuleLoader from './module-loader';

export default (getState, logger) => {
  return {
    resolve(du, forceInstall, done) {
      const resolver = getState().runtime.resolver;
      const devMode = getState().runtime.devMode;
      logger.debug(this.name, `Resolving ${du.name}@${du.version}...`);
      const iframe = document.createElement('iframe');
      iframe.src = `${window.location.origin}/installer.html?${qs.stringify({
        resolver,
        devMode,
        name: du.name,
        version: du.version
      })}`;
      iframe.style = 'display: none';

      const messageHandler = (event) => {
        if (event.origin === window.location.origin) {
          switch (event.data.type) {
            case 'installed':
              window.removeEventListener('message', messageHandler);
              logger.debug(
                this.name, `${du.name}@${du.version} resolved from ${event.data.resolver}`);
              done(null, KevoreeModuleLoader.require(du.name, du.version));
              break;

            case 'error':
              window.removeEventListener('message', messageHandler);
              document.body.removeChild(iframe);
              done(new Error(
                `Unable to install ${du.name}@${du.version} (${event.data.message})`
              ));
              break;

            default:
              break;
          }
        }
      };

      window.addEventListener('message', messageHandler);
      document.body.appendChild(iframe);
    },

    uninstall(du, done) {
      logger.debug(this.name, `Uninstalling DeployUnit ${du.name}@${du.version}... (Not implemented yet)`);
      done();
    }
  };
};
