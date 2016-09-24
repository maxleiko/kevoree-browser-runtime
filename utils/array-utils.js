exports.arrayRemove = function arrayRemove(array, item) {
  const index = array.indexOf(item);
  return [
    ...array.slice(0, index),
    ...array.slice(index + 1),
  ];
};

exports.arrayUpdate = function arrayUpdate(array, index, item) {
  return [
    ...array.slice(0, index),
    item,
    ...array.slice(index + 1),
  ];
};
