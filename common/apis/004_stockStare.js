;(function webpackUniversalModuleDefinition(root, factory) {
  
  // 兼容不同的模块化规范
  
  // CommonJS ?
  if (typeof exports === 'object' && typeof module === 'object')
    module.exports = factory(require('./apisMain.js'));
  // AMD
  else if (typeof define === 'function' && define.amd)
    define('004_stockStare', ['apisMain'], factory);
  // ES6 ?
  else if (typeof exports === 'object')
    exports['004_stockStare'] = factory(require('./apisMain.js'));
  else
  // 暴露给window
    root['004_stockStare'] = factory(root['apisMain']);
  
}(this, function (apisMain) {
  
  if (!apisMain || !apisMain.apisMain) {
    throw new Error('请先加载apisMain模块!');
  }
  
  var getQueryString = apisMain.getQueryString;
  var parseURL = apisMain.parseURL;
  
  var stockStare = {
    id: 'stockStare',
    ajaxConfig: {
      method: 'get',
      headers: {
        // 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        // 'Content-Type': 'application/json',
        // 'charset': 'UTF-8',
        'Content-Type': 'application/json;charset=utf-8'
        // 'authorization': 'ALLDOBETTER BSdjqpEhOFIphNuqURUux2YBO8ahku+IKWn4XV9Cu0kpS5bdPBLg/q2k8beggefBd122MQi62frNOq3s/Vh5PGuIlLuXnjSQLgfiXfdUeGNhs8P1LWmS3fuu9m81KKS2'
      },
      responseType: '',   //  为了兼容IE9的一个处理
      params: '',     // 与请求一起发送的URL参数
      data: '',       // PUT，POST和PATCH时发送的参数
      timeout: 8000
    },
    baseURL: '/api/stockwatching/',
  
    getSWBasciConfig: {     //  获取用户盯盘配置-基础配置
      url: 'getSWBasciConfig',
    },
    setSWBasicConfig: {     //  切换用户盯盘配置-切换监控 PATCH
      url: 'setSWBasicConfig',
      queryParams: {
        type: '',
        isEnabled: ''
      }
    },
    
    //  获取高级设置列表数据
    userStockCustom: {     //  获取用户盯盘配置-自定义股票配置
      url: 'getSWSeniorConfig/userStockCustom',
    },
    userStockHold: {     //  获取用户盯盘配置-持仓股票配置
      url: 'getSWSeniorConfig/userStockHold',
    },
    userStockOptional: {     //  获取用户盯盘配置-自选股票配置
      url: 'getSWSeniorConfig/userStockOptional',
    },
  
    //  基础设置更改
    setSWBasicConfig_userStockHold: {     //  切换用户盯盘配置-切换监控-持仓股票  PATCH
      url: 'setSWBasicConfig/userStockHold',
      queryParams: {
        warnType: '',
        isEnabled: '',
        warnThreshold: '',
        warnThreshold2	: '',
        warnThreshold3: '',
      }
    },
    setSWBasicConfig_userStockOptional: {     //  切换用户盯盘配置-切换监控-自选股票  PATCH
      url: 'setSWBasicConfig/userStockOptional',
      queryParams: {
        warnType: '',
        isEnabled: '',
        warnThreshold: '',
        warnThreshold2	: '',
        warnThreshold3: '',
      }
    },
    setSWBasicConfig_userStockCustom: {     //  切换用户盯盘配置-切换监控-自定义股票  PATCH
      url: 'setSWBasicConfig/userStockCustom',
      queryParams: {
        warnType: '',
        isEnabled: '',
        warnThreshold: '',
        warnThreshold2	: '',
        warnThreshold3: '',
      }
    },
    
    //  高级设置更改
    setSWSeniorConfig_userStockHold: {      //  切换用户盯盘配置-切换监控规则-持仓股票 PATCH
      url: 'setSWSeniorConfig/UserStockHold',
      queryParams: {
        stockCode: '',
        isEnabled: '',
      }
    },
    setSWSeniorConfig_userStockOptional: {      //  切换用户盯盘配置-切换监控规则-自选股票 PATCH
      url: 'setSWSeniorConfig/UserStockOptional',
      queryParams: {
        stockCode: '',
        isEnabled: '',
      }
    },
    setSWSeniorConfig_userStockCustom: {      //  切换用户盯盘配置-切换监控规则-自定义股票 PATCH
      url: 'setSWSeniorConfig/UserStockCustom',
      queryParams: {
        stockCode: '',
        isEnabled: '',
      }
    },
    
    //  获取个股数据
    getStockHold: {      //  获取用户盯盘配置-持仓股票配置-股票
      url: 'getSWSeniorConfig/userStockHold/{{stockCode}}'
    },
    getStockOptional: {      //  获取用户盯盘配置-自选股票配置-股票
      url: 'getSWSeniorConfig/userStockOptional/{{stockCode}}'
    },
    getStockCustom: {      //  获取用户盯盘配置-自定义股票配置-股票
      url: 'getSWSeniorConfig/userStockCustom/{{stockCode}}'
    },
    
    
    //  高级设置个股更改
    setUserStockHoldStock: {      //  切换用户盯盘配置-切换监控规则-持仓股票 PATCH
      url: 'setSWSeniorConfig/userStockHold/{{stockCode}}',
      queryParams: {
        warnType: '',
        isEnabled: '',
        warnThreshold: '',
        warnThreshold2	: '',
        warnThreshold3: '',
      }
    },
    setUserStockOptionalStock: {      //  切换用户盯盘配置-切换监控规则-自选股票 PATCH
      url: 'setSWSeniorConfig/userStockOptional/{{stockCode}}',
      queryParams: {
        warnType: '',
        isEnabled: '',
        warnThreshold: '',
        warnThreshold2	: '',
        warnThreshold3: '',
      }
    },
    setUserStockCustomStock: {      //  切换用户盯盘配置-切换监控规则-自定义股票 PATCH
      url: 'setSWSeniorConfig/userStockCustom/{{stockCode}}',
      queryParams: {
        warnType: '',
        isEnabled: '',
        warnThreshold: '',
        warnThreshold2	: '',
        warnThreshold3: '',
      }
    },
    
    getURL: function (id, params) {
      var api = this[id];
      if (api.isMock) {
        return this.baseURL + id;
      }
      return this.baseURL + parseURL(api.url, params) + getQueryString(params, api.queryParams);
    }
  };
  
  apisMain.extend('stockStare', stockStare);
}));
