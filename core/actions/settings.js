import {
  REGISTRY_HOST, REGISTRY_PORT, REGISTRY_SSL, RESOLVER,
} from '.';

export function changeHost(host) {
  TinyConf.set('registry.host', host);
  return { type: REGISTRY_HOST, value: host };
}

export function changePort(port) {
  TinyConf.set('registry.port', port);
  return { type: REGISTRY_PORT, value: port };
}

export function changeSsl(ssl) {
  TinyConf.set('registry.ssl', ssl);
  return { type: REGISTRY_SSL, value: ssl };
}

export function changeResolver(host) {
  return { type: RESOLVER, value: host };
}
