;(function webpackUniversalModuleDefinition(root, factory) {
  
  // 兼容不同的模块化规范
  
  // CommonJS ?
  if (typeof exports === 'object' && typeof module === 'object')
    module.exports = factory(require('./apisMain.js'));
  // AMD
  else if (typeof define === 'function' && define.amd)
    define('005_HTZQ', ['apisMain'], factory);
  // ES6 ?
  else if (typeof exports === 'object')
    exports['005_HTZQ'] = factory(require('./apisMain.js'));
  else
  // 暴露给window
    root['005_HTZQ'] = factory(root['apisMain']);
  
}(this, function (apisMain) {
  
  if (!apisMain || !apisMain.apisMain) {
    throw new Error('请先加载apisMain模块!');
  }
  
  var getQueryString = apisMain.getQueryString;
  var parseURL = apisMain.parseURL;
  
  // var HTZQ = {
  //     id: 'HTZQ',
  //
  //     ajaxConfig: {
  //         method: 'get',
  //         headers: {
  //             'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
  //         },
  //         responseType: '',   //  为了兼容IE9的一个处理
  //         params: '',         // 与请求一起发送的URL参数
  //         data: '',           // PUT，POST和PATCH时发送的参数
  //         timeout: 20000
  //     },
  //
  //     baseURL: '/ht-tjwz/',
  //     // 财商测试接口
  //     question: {
  //         queryParams: {
  //             type: '121'
  //         },
  //         url: 'question'
  //     },
  //     // 风险评测接口
  //     questionIndex: {
  //         queryParams: {
  //             type: '120'
  //         },
  //         url: 'question/index'
  //     },
  //     // 基地概况详情
  //     contentGetJdjs: {
  //         queryParams: {
  //             categoryId: '102'
  //         },
  //         url: 'content/getJdjs'
  //     },
  //     // 基地概况 列表页
  //     content: {
  //         queryParams: {
  //             categoryId: '',// 100 基地概况 101 专家讲堂
  //             pageNo: '',
  //             pageSize: 10
  //         },
  //         url: 'content'
  //     },
  //     // 基地概况 详情页
  //     contentGetDetails: {
  //         queryParams: {
  //             id: ''
  //         },
  //         url: 'content/getDetails'
  //     },
  //     // 新闻列表接口
  //     getOutNews: {
  //         queryParams: {
  //             newsClass: '',
  //             pageNo: '',
  //             pageSize: 10
  //         },
  //         url: 'outNews'
  //     },
  //     // 新闻详情接口
  //     getOutNewsFindOutNewsInfo: {
  //         queryParams: {
  //             id: '',
  //             newsClass: ''
  //         },
  //         url: 'outNews/findOutNewsInfo'
  //     },
  //     // 获取热门视频
  //     contentGetHotVideos: {
  //         queryParams: {
  //             categoryId: '',
  //             pageNo: '',
  //             pageSize: 10
  //         },
  //         url: 'content/geHotVideos'
  //     },
  //     // 视频播放统计接口
  //     contentSetBcById: {
  //         queryParams: {
  //             id: ''
  //         },
  //         url: 'content/setBcById'
  //     },
  //     // 全文搜索接口
  //     fullSerachNewsIndex: {
  //         url: 'fullSerachNews/index'
  //     },
  //
  //     getURL: function (id, params) {
  //         var api = this[id];
  //         if (api.isMock) {
  //             return this.baseURL + id;
  //         }
  //
  //         return this.baseURL + parseURL(api.url, params)
  //             + getQueryString(params, api.queryParams);
  //     }
  // };
  
  var HTZQ = {
    id: 'HTZQ',
    
    ajaxConfig: {
      method: 'get',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      responseType: '',   //  为了兼容IE9的一个处理
      params: '',         // 与请求一起发送的URL参数
      data: '',           // PUT，POST和PATCH时发送的参数
      timeout: 20000
    },
    
    baseURL: '/api/edusite/cms/',
    
    gridCode: {
      queryParams: {
        currentPage: 1,
        pageSize: 10,
        includeFile: '',
        includeBody: 1
      },
      url: 'grid/code/{{code}}'
    },
    
    question: {
      queryParams: {},
      url: 'question/{{type}}'
    },
    
    videoHotSearch: {
      url: 'videoHotSearch'
    },
    
    gridVideo: {
      url: 'grid/video/{{id}}'
    },
    
    gridArticle: {
      url: 'grid/article/{{id}}'
    },
    
    gridContent: {
      queryParams: {
        currentPage: 1,
        pageSize: 10,
        key: ''
      },
      url: 'grid/content'
    },
    
    userLog: {
      url: 'user/log'
    },
    
    getURL: function (id, params) {
      var api = this[id];
      if (api.isMock) {
        return this.baseURL + id;
      }
      
      return this.baseURL + parseURL(api.url, params)
          + getQueryString(params, api.queryParams);
    }
  };
  
  apisMain.extend('HTZQ', HTZQ);
}));
