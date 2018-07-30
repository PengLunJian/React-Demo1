export default function isArray(target) {
  return Object.prototype.toString.call(target) === '[object Array]';
}
