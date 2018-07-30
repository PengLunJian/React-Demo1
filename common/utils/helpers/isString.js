export default function isString(target) {
  return Object.prototype.toString.call(target) === '[object String]';
}
