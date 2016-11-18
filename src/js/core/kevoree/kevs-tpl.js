// replaces all {key} occurences in the given script with the
// corresponding value from context[key]
export default (script, context) => {
  return Object.keys(context).reduce((script, key) => {
    return script.replace(new RegExp('{' + key + '}', 'g'), context[key]);
  }, script);
};
