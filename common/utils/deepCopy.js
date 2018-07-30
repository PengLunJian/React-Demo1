/**
 * 深克隆单个对象
 * @param target
 * @param source
 * @returns {*}
 */
function deepCopySingle(target, source) {
  if (!source || typeof source !== 'object') {
    return target;
  }
  for (var k in source) {
    if (typeof source[k] !== 'object' || source[k] === null) {
      target[k] = source[k];
    } else {
      target[k] = source[k].constructor === Array ? [] : {};
      deepCopySingle(target[k], source[k]);
    }
  }
  return target;
}

/**
 * 深克隆任意多个对象到第一个对象上
 * @returns {T}
 */
export default function deepCopy() {
  var args = Array.prototype.slice.call(arguments);
  var obj = args.splice(0, 1)[0];
  while (args.length) {
    obj = deepCopySingle(obj, args.splice(0, 1)[0]);
  }
  return obj;
}
