import resolverFactory from './resolver';

export default (getState, logger) => {
  const resolver = resolverFactory(getState, logger);

  return {
    bootstrapNodeType(name, model, done) {
      const node = model.findNodesByID(name);
      if (node) {
        const meta = node.typeDefinition.select('deployUnits[]/filters[name=platform,value=js]');
        if (meta.size() > 0) {
          resolver.resolve(meta.get(0).eContainer(), false, done);
        } else {
          const err = new Error(`No DeployUnit found for '${name}' that matches the 'js' platform`);
          done(err);
        }
      } else {
        const err = new Error(`Unable to find '${name}' in given model`);
        done(err);
      }
    },

    bootstrap(...args) {
      resolver.resolve(...args);
    },

    uninstall(...args) {
      resolver.uninstall(...args);
    }
  };
};
