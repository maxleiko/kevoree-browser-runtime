const CHARS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

function int(min = 0, max = 100) {
  const min2 = Math.ceil(min);
  const max2 = Math.floor(max);
  return Math.floor(Math.random() * (max2 - min2)) + min2;
}

function id(length = 3) {
  let res = '';
  for (let i = 0; i < length; i++) {
    res += CHARS[int(0, CHARS.length)];
  }
  return res;
}

module.exports = { id, int };
