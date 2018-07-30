;(function webpackUniversalModuleDefinition(root, factory) {
  
  // 兼容不同的模块化规范
  
  // CommonJS ?
  if (typeof exports === 'object' && typeof module === 'object')
    module.exports = factory(require('./apisMain.js'));
  // AMD
  else if (typeof define === 'function' && define.amd)
    define('008_HKF10', ['apisMain'], factory);
  // ES6 ?
  else if (typeof exports === 'object')
    exports['008_HKF10'] = factory(require('./apisMain.js'));
  else
  // 暴露给window
    root['008_HKF10'] = factory(root['apisMain']);
  
}(this, function (apisMain) {
  
  if (!apisMain || !apisMain.apisMain) {
    throw new Error('请先加载apisMain模块!');
  }
  
  var getQueryString = apisMain.getQueryString;
  var parseURL = apisMain.parseURL;
  
  var api = {
    id: 'HKF10',
    ajaxConfig: {
      method: 'get',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      responseType: '',   //  为了兼容IE9的一个处理
      params: '',     // 与请求一起发送的URL参数
      data: '',       // PUT，POST和PATCH时发送的参数
      timeout: 20000
    },
    baseURL: '/api/data/stock/hk/stock',
    
    // 新闻
    news_list: {    //  查询新闻列表
      url: '/{{stockCode}}/news',
      queryParams: {
        pageNum: '',
        pageSize: '',
        stockCode: ''
      }
    },
    news_detail: {     //  新闻详情
      url: '/news/{{newsId}}',
    },
    
    // F10页面
    f10_gjtj: {     //  F10--关键统计
      url: '/{{innerCode}}/key/count',
    },
    f10_gsgk: {     //  F10--公司概况
      url: '/{{innerCode}}/general',
    },
    f10_zygd_new: {     //  F10--主要股东--最新
      url: '/{{innerCode}}/newest',
    },
		f10_zygd_new_xyzq: {     //  F10--主要股东--最新--兴业证券
			url: '/{{innerCode}}/newest_xyzq',
		},
    f10_zygd_history: {     //  F10--主要股东--历史
      url: '/{{innerCode}}/history',
    },
    f10_fhpx: {     //  F10--分红派息
      url: '/{{innerCode}}/bonus',
    },
    f10_scbx_chart: {     //  F10--市场表现（图表部分）
      url: '/{{innerCode}}/market',
    },
    f10_scbx: {     //  F10--市场表现统计(文字部分)
      url: '/{{innerCode}}/market/count',
    },
    
    // 公告
    announce_list: {    //  查询公告列表
      url: '/{{innerCode}}/notice',
      queryParams: {
        pageNum: '',
        pageSize: '',
        innerCode: ''
      }
    },
    announce_detail: {     //  公告详情
      url: '/announce/{{announceId}}',
    },
    announce_pdf: {       //  pdf获取是单个或多个
      url: '/announce/{{annoID}}',
      // queryParams: {
      //   secret: '426877d29bce4b8da7e6c120101121c9',
      //   AnnoID: ''
      // }
    },
    
    // 机构评级
    overview_load: {     //  评级总览
      url: '/{{innerCode}}/grade/view',
    },
    profit_load: {     //  综合盈利预测
      url: '/{{innerCode}}/grade/forecast',
    },
    grade_load: {     //  预测评级概览
      url: '/{{innerCode}}/grade',
    },
    
    // 财报页面
    fnsreport_profit: {     //  财报--盈利能力
      url: '/{{innerCode}}/financial/profit',
    },
    fnsreport_grow: {     //  财报--成长能力
      url: '/{{innerCode}}/financial/grow',
    },
    fnsreport_summary: {     //  财报--财务摘要
      url: '/{{innerCode}}/financial/summary',
    },
    fnsreport_compare: {     //  财报--同行业公司比较
      url: '/{{innerCode}}/financial/compare',
    },
    fnsreport_index: {     //  财报--主要财务指标
      url: '/{{innerCode}}/financial/index',
    },
    
    getURL: function (id, params) {
      var api = this[id];
      if (api.isMock) {
        return this.baseURL + id;
      }
      return this.baseURL + parseURL(api.url, params) + getQueryString(params, api.queryParams);
    }
  };
  
  apisMain.extend('HKF10', api);
  
  return api;
}));
