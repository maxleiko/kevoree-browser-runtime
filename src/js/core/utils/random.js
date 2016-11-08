const NUMBER = '0123456789';
const UPPERCASE = `ABCDEFGHIJKLMNOPQRSTUVWXYZ${NUMBER}`;
const CHARS = `abcdefghijklmnopqrstuvwxyz${UPPERCASE}`;

export function int(min = 0, max = 100) {
  const min2 = Math.ceil(min);
  const max2 = Math.floor(max);
  return Math.floor(Math.random() * (max2 - min2)) + min2;
}

export function id(length = 3) {
  let res = UPPERCASE[int(0, UPPERCASE.length)];
  for (let i = 0; i < length - 1; i++) {
    res += CHARS[int(0, CHARS.length)];
  }
  return res;
}
