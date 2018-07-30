;(function webpackUniversalModuleDefinition(root, factory) {
  
  // 兼容不同的模块化规范
  
  // CommonJS ?
  if (typeof exports === 'object' && typeof module === 'object')
    module.exports = factory(require('./apisMain.js'));
  // AMD
  else if (typeof define === 'function' && define.amd)
    define('003_QDYH', ['apisMain'], factory);
  // ES6 ?
  else if (typeof exports === 'object')
    exports['003_QDYH'] = factory(require('./apisMain.js'));
  else
  // 暴露给window
    root['003_QDYH'] = factory(root['apisMain']);
  
}(this, function (apisMain) {
  
  if (!apisMain || !apisMain.apisMain) {
    throw new Error('请先加载apisMain模块!');
  }
  
  var getQueryString = apisMain.getQueryString;
  var parseURL = apisMain.parseURL;
  
  var QDYH = {
    id: 'QDYH',
    ajaxConfig: {
      method: 'get',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
        // 'authorization': 'ALLDOBETTER BSdjqpEhOFIphNuqURUux2YBO8ahku+IKWn4XV9Cu0kpS5bdPBLg/q2k8beggefBd122MQi62frNOq3s/Vh5PGuIlLuXnjSQLgfiXfdUeGNhs8P1LWmS3fuu9m81KKS2'
      },
      responseType: '',   //  为了兼容IE9的一个处理
      params: '',         // 与请求一起发送的URL参数
      data: '',           // PUT，POST和PATCH时发送的参数
      timeout: 20000
    },
    baseURL: '/api/data/',
    //  基金净值走势（移动端第一个tab）
    getFundIopuTrend: {
      queryParams: {
        conType: '',
        choiceCode: ''
      },
      url: 'fund/getFundIopuTrend/{{fundCode}}'
    },
    //  基金收益走势（移动端第一个tab）
    getFundIncomeTrend: {
      queryParams: {
        conType: '',
        choiceCode: ''
      },
      url: 'fund/getFundIncomeTrend/{{fundCode}}'
    },
    //  基金基本信息（移动端第二个tab；网银-基本信息、投资目标、购买信息）
    getFundInfo: {
      queryParams: {
        fundType: '0',
        riskDeg: '0',
        fundStatus: '0',
        fundRate: '0',
        fundComCode: '0',
        fundAbbr: '0',
        orderRule: '1',
        startIndex: '0',
        itemCount: '20'
      },
      url: 'fund/getFundInfo/{{fundCode}}'
    },
    //  基金经理（移动端第二个tab；网银-基金经理变更：onDateType = 0）
    getFundManager: {
      queryParams: {
        onDateType: ''
      },
      url: 'fund/getFundManager/{{fundCode}}'
    },
    //  基金费率结构（移动端第三个tab）
    getFundStructureDate: {
      url: 'fund/getFundStructureDate/{{fundCode}}'
    },
    //  基金资产配置（移动端第四个tab；网银-资产配置、基金历年资产配置 传入日期待定）
    getFundAssallocation: {
      queryParams: {
        beginDate: '',
        endDate: '',
        conType: ''
      },
      url: 'fund/getFundAssallocation/{{fundCode}}'
    },
    //  基金行业分布（移动端第四个tab）
    getFundIndustry: {
      queryParams: {
        beginDate: '',
        endDate: ''
      },
      url: 'fund/getFundIndustry/{{fundCode}}'
    },
    //  基金券种配置（网银-券种配置）
    getFundBondConfig: {
      queryParams: {
        beginDate: '',
        endDate: ''
      },
      url: 'fund/getFundBondConfig/{{fundCode}}'
    },
    //  基金重仓股票（网银-重仓股票）
    getFundHWS: {
      queryParams: {
        beginDate: '',
        endDate: ''
      },
      url: 'fund/getFundHWS/{{fundCode}}'
    },
    //  基金重仓债券（网银-重仓债券）
    getFundHeavydebt: {
      queryParams: {
        beginDate: '',
        endDate: ''
      },
      url: 'fund/getFundHeavydebt/{{fundCode}}'
    },
    //  基金资金规模（网银-历年规模变化）
    getFundScale: {
      queryParams: {
        beginDate: '',
        endDate: '',
        conType: ''
      },
      url: 'fund/getFundScale/{{fundCode}}'
    },
    //  基金公司（pc-首页）
    getFundCompany: {
      url: 'fund/getFundCompany'
    },
    //  基金搜索（pc-首页）
    searchFund: {
      queryParams: {
        itemCount: ''
      },
      url: 'fund/searchFund/{{searchStr}}'
    },
    //  基金热搜记录（pc-首页）
    getFundHotSearch: {
      url: 'fund/getFundHotSearch'
    },
    //  推荐基金列表（pc-首页）
    getFundRecommend: {
      queryParams: {
        startIndex: '',
        itemCount: '',
        fundRecommendType: 'TTJJ'       //  TTJJ: 推荐基金
      },
      url: 'fund/getFundRecommend'
    },
    //  单个基金推荐（pc-）
    getFundRecommendById: {
      url: 'fund/getFundRecommendById/{{id}}'
    },
    //  公告列表（pc-首页）
    getAnnounce: {
      queryParams: {
        startIndex: '',
        itemCount: '',
        contentType: 'GG'             //  GG: 公告
      },
      url: 'info/getAnnounce'
    },
    //  公告详情（pc-公告详情）
    getAnnounceById: {
      url: 'info/getAnnounceById/{{id}}'
    },
    //  基金收益信息（pc-基金收益信息）
    getFundIncomeInfo: {
      queryParams: {
        fundType: '0',
        riskDeg: '0',
        fundStatus: '0',
        fundRate: '0',
        fundComCode: '0',
        fundAbbr: '0',
        orderRule: '1',
        startIndex: '0',
        itemCount: '20',
        saleOrg: ''
      },
      url: 'fund/getFundIncomeInfo/{{fundCode}}'
    },
    //  基金收益率同类排名（网银-业绩表现）
    getFundRank: {
      queryParams: {
        choiceCode: ''  // 1:南方中债中期票据A  2:沪深300
      },
      url: 'fund/getFundRank/{{fundCode}}'
    },
    //  基金收益率年度回报（网银-年度回报）
    getFundAnnualisedReturn: {
      queryParams: {
        choiceCode: ''  // 1:南方中债中期票据A  2:沪深300
      },
      url: 'fund/getFundAnnualisedReturn/{{fundCode}}'
    },
    //  基金定投收益计算器
    getAIPFundCalculator: {
      url: 'fund/getFundCalculator/{{fundCode}}',
      queryParams: {
        startDay: '',       //  定投开始日
        endDay: '',         //  定投结束日
        redemDay: '',       //  定投赎回日
        cycle: '',          //  定投周期
        type: '',           //  0：周;1：月
        fixDay: '',         //  定投日，如果type为0，则1代表周日，2代表周一，否则填1~28
        rates: '',          //  申购费率
        fixAmount: '',      //  每期定投金额
        bonus: '',          //  0：现金分红；1：红利再投
        Debit: ''           //  0：首次扣款日；1：
      }
    },
    //  开放式基金收益计算器
    getOpenedFundCalculator: {
      url: 'fund/getdevfundalculator/{{fundCode}}',
      queryParams: {
        startDay: '',       //  开始持有日期
        endDay: '',         //  结束持有日期
        fixAmount: '',      //  申购金额
        rates: '',          //  申购费率
        reRdates: '',       //  赎回费率
        bonus: ''          //  分红方式，0：现金分红；1：红利再投
      }
    },
    //  开放式基金收益计算器
    getCarouselsQDYHPCLB: {
      url: 'info/getCarousels/qdyhpclb'
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
  
  apisMain.extend('QDYH', QDYH);
}));
