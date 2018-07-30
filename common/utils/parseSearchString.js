/**
 * 获取url传参
 * @returns {string}
 */
export function getSearch() {
  return window.location.search || window.location.hash.indexOf('?') > -1 ? window.location.hash.slice(window.location.hash.indexOf('?')) : '';
}

/**
 * 转换url参数成对象
 * @param str 需要转换的参数，不传将自动取
 * @returns 转化后的对象
 */
export function search2Obj(str) {
  str = str || getSearch();
  str = str.indexOf('?') > -1 ? str.slice(str.indexOf('?') + 1) : str;
  
  const items = str.split('&');
  const result = {};
  for (let i = 0; i < items.length; i++) {
    const arr = items[i].split('=');
    const key = arr[0];
    const value = arr[1];
    if (key) {
      if (result[key]) {
        if (Array.isArray(value)) {
          result[key] = result[key].concat(value);
        } else {
          result[key] = [result[key]].concat(value);
        }
      } else {
        result[key] = value;
      }
    }
  }
  return result;
}

/**
 * 转换对象成url参数
 * @param obj 需要转化的对象
 */
export function obj2Search(obj, needSymbol) {
  if (Object.prototype.toString.call(obj) !== '[object Object]' || !Object.keys(obj).length) {
    return '';
  }
  let result = needSymbol ? '?' : '';
  const _arr = [];
  for (const k in obj) {
    const value = obj[k];
    if (Array.isArray(value)) {
      // _arr.push(k + '=' + value.join(','));
      value.forEach(item => {
        _arr.push(k + '=' + item);
      });
    } else {
      _arr.push(k + '=' + value);
    }
  }
  
  result += _arr.join('&');
  return result;
}

export default search2Obj;
