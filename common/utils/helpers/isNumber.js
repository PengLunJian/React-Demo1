export default function isNumber(target) {
  return Object.prototype.toString.call(target) === '[object Number]' && !Number.isNaN(target);
}
