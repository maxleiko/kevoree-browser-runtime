const removeTrailingSlash = (str) => {
  if (str.endsWith('/')) {
    return str.substr(0, str.length - 2);
  }
  return str;
};

export default removeTrailingSlash;
