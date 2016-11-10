/* globals TinyConf */

const updateRegistry = (uri) => {
  const registry = new URL(uri);
  const host = registry.host;
  const ssl = registry.protocol === 'https:';
  let port = ssl ? 443 : 80;
  if (registry.port) {
    port = registry.port;
  }
  TinyConf.set('registry', {
    host,
    port,
    ssl,
    oauth: {
      client_id: 'kevoree_registryapp',
      client_secret: 'kevoree_registryapp_secret'
    }
  });
};

export default updateRegistry;
