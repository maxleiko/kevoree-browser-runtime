export default (resolver, name, version) => new Promise((resolve, reject) => {
  const script = document.createElement('script');
  const srcPath = `${resolver}/${name}@${version}/browser/${name}.js`;
  script.setAttribute('src', srcPath);
  script.async = true;
  script.onload = () => {
    document.body.removeChild(script);
    resolve();
  };
  script.onerror = () => {
    document.body.removeChild(script);
    reject(new Error(`Unable to load script ${srcPath}`));
  };
  document.body.appendChild(script);
});
