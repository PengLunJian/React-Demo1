;(function webpackUniversalModuleDefinition(root, factory) {
  
  // 兼容不同的模块化规范
  
  // CommonJS ?
  if (typeof exports === 'object' && typeof module === 'object')
    module.exports = factory();
  // AMD
  else if (typeof define === 'function' && define.amd)
    define('apisMain', [], factory);
  // ES6 ?
  else if (typeof exports === 'object')
    exports['apisMain'] = factory();
  else
  // 暴露给window
    root['apisMain'] = factory();
  
}(this, function () {
  
  function __getQueryString(obj) {
    var arr = [];
    for (var k in obj) {
      if (obj[k] !== '') {
        arr.push(k + '=' + obj[k]);
      }
    }
    if (!arr.length) {
      return '';
    }
    return '?' + arr.join('&');
  }
  
  /**
   *
   * @param params 传过来的整体params
   * @param queryParams  this.queryParams占位对象
   * @returns {*}
   */
  function getQueryString(params, queryParams) {
    if (!queryParams) {
      return '';
    }
    var resultObj = {};
    for (var k in params) {
      for (var j in queryParams) {
        if (k === j) {
          resultObj[k] = params[k];
        }
      }
    }
    return __getQueryString(resultObj);
  }
  
  /**
   * parseURL('/api/{{name}}', {name: 'joke'}) ---> '/api/joke'
   * @param url           原始字符串
   * @param params        需要替换的数据
   */
  function parseURL(url, params) {
    url = url || '';
    if (!params) {
      return url;
    }
    
    return url.replace(/{{\w.*?}}/g, function (match) {
      var key = match.replace(/{{(\w+)}}/, '$1');
      return params[key] || match;
    });
  }
  
  // 暴露模块
  return {
    apisMain: true,
    apis: {},
    getQueryString: getQueryString,
    parseURL: parseURL,
    extend: function (id, apiConfig) {
      this.apis[id] = apiConfig;
    }
  };
}));
