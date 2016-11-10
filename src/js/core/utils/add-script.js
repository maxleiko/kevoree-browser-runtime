const addScript = (src) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => {
      document.body.removeChild(script);
      resolve();
    };
    script.onerror = () => {
      const err = new Error(`Unable to install script ${src}`);
      document.body.removeChild(script);
      reject(err);
    };
    document.body.appendChild(script);
  });
};

export default addScript;
