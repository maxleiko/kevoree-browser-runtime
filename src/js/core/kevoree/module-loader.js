class KevoreeModuleLoader {
  constructor() {
    this.modules = {};
  }

  register(name, version, module) {
    this.modules[`${name}@${version}`] = module;
  }

  require(name, version) {
    const module = this.modules[`${name}@${version}`];
    if (module) {
      return module;
    }
    throw new Error(`KevoreeModule "${name}@${version}" not found`);
  }

  remove(name, version) {
    delete this.modules[`${name}@${version}`];
  }
}

// Be sure that KevoreeModuleLoader is available globally
global.KevoreeModuleLoader = global.KevoreeModuleLoader || new KevoreeModuleLoader();

export default global.KevoreeModuleLoader;
