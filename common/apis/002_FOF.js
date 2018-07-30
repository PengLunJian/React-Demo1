;(function webpackUniversalModuleDefinition(root, factory) {
  
  // 兼容不同的模块化规范
  
  // CommonJS ?
  if (typeof exports === 'object' && typeof module === 'object')
    module.exports = factory(require('./apisMain.js'));
  // AMD
  else if (typeof define === 'function' && define.amd)
    define('002_FOF', ['apisMain'], factory);
  // ES6 ?
  else if (typeof exports === 'object')
    exports['002_FOF'] = factory(require('./apisMain.js'));
  else
  // 暴露给window
    root['002_FOF'] = factory(root['apisMain']);
  
}(this, function (apisMain) {
  
  if (!apisMain || !apisMain.apisMain) {
    throw new Error('请先加载apisMain模块!');
  }
  
  var getQueryString = apisMain.getQueryString;
  var parseURL = apisMain.parseURL;
  
  var api = {
    id: 'FOF',
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
      timeout: 20000
    },
    baseURL: '/api/fof/',
    getVerifyCode: {                //  get 获取验证码， post验证验证码是否正确（带client_key, verify_code）
      url: 'auth/defaultKaptcha',
      queryParams: {
        client_key: ''      //  uuid
      }
    },
    refreshRestToken: {     //  post token有效期为30分钟，重新获取新的token
      url: 'auth/refreshRestToken'
    },
    preLogin_orgs: {                //  用户登录前获取用户机构列表
      // username: '',
      url: 'prelogin/orgs',
      queryParams: {
        username: ''
      }
    },
    login: {                //  用户登录
      url: 'login'
    },
    userInfo: {     //  用户信息
      url: 'home/userinfo'
    },
    //全局搜索
    global_search: {
      url: 'home/search',
      queryParams: {
        key: '',                  //  搜索关键字
        currentPage: 1,
        pageSize: 5
      }
    },
    //  个人首页
    personal_follows: {      //  个人首页-个人关注
      url: 'personal/subscribe'
    },
    personal_products: {      //  个人首页-我的产品
      url: 'personal/products'
    },
    personal_products_upload: {      //  个人首页-我的产品-上传新产品
      url: 'personal/products/upload',
      queryParams: {
        type: '',                    //   股票型，管理期货型
        cycle: ''                    //   D-日净值，W-周净值
      }
    },
    personal_portfolios: {    //  个人首页-我的组合
      url: 'personal/portfolios'
    },
    personal_tags: {          //  个人首页-我的分组（get获取分组，post添加分组）
      url: 'personal/tags'
    },
    personal_tags_tag: {           //  个人首页-我的分组-具体某个分组（get获取分组下数据，delete删除分组，put修改分组）
      url: 'personal/tags/{{tagId}}'
    },
    personal_tags_tag_funds: {    //  个人首页-我的分组-在分组下添加删除产品（delete删除产品，post增加产品）
      url: 'personal/tags/{{tagId}}/funds'
    },
    personal_tags_search: {      //  个人首页-我的分组-添加产品搜索 get请求
      url: 'personal/tags/search',
      queryParams: {
        key: '',                  //  搜索关键字
        currentPage: 1,
        pageSize: 5
      }
    },
    personal_shares: {      //  个人首页-分享查看 get请求
      url: 'personal/share'
    },
    personal_shares_funds: {      //  个人首页-分享查看-移除分享列表中的报告
      url: 'personal/share/funds'
    },
    //  公司首页
    company_products: {           //  公司首页-公司产品
      url: 'company/products'
    },
    company_tags: {               //  公司首页-公司分组（get获取分组，post添加分组）
      url: 'company/tags'
    },
    company_tags_tag: {           //  公司首页-公司分组-具体某个分组（get获取分组下数据，delete删除分组，put修改分组）
      url: 'company/tags/{{tagId}}'
    },
    company_tags_tag_funds: {     //  公司首页-公司分组-在分组下添加删除产品（delete删除产品，post增加产品）
      url: 'company/tags/{{tagId}}/funds'
    },
    company_tags_search: {        //  公司首页-公司分组-添加产品搜索 get请求
      url: 'company/tags/search',
      queryParams: {
        key: '',                  //  搜索关键字
        currentPage: 1,
        pageSize: 5
      }
    },
    //  归因报告
    report_info: {      //  产品详情
      url: 'report/{{fundId}}/info'
      //   nav：                       净值
      //   navEndDate：                净值结束时间（报告时间）
      //   navStartDate：              净值开始时间
      //   fundStatus：                0 不公开，1公开
      //   typeFlag：                  F：单个基金，P：组合 (P显示FOF标签)
      //   allocationMode：            typeFlag=P 才显示(整个返回值)（IV：风险评价IV）
      //   allocationMoney：           分配金额
      //   isSubscribe：               0 未订阅，1已订阅
    },
    report_options: {      //  指数列表
      url: 'report/index'
    },
    report_detail_history: {      //  历史净值
      url: 'report/{{fundId}}/history',
      queryParams: {
        indexId: ''
      }
    },
    report_detail_performance: {      //  组合累计表现
      url: 'report/{{fundId}}/performance',
      queryParams: {
        indexId: ''
      }
    },
    report_detail_factorRisk: {      //  因子风险贡献比例
      url: 'report/{{fundId}}/factorRisk'
    },
    report_detail_profitAnalyse: {      //  组合累计收益分解
      url: 'report/{{fundId}}/profitAnalyse'
    },
    report_detail_profitCompare: {      //  组合和模型累计收益比较
      url: 'report/{{fundId}}/profitCompare'
    },
    //  订阅、取消订阅
    subscribe: {                  //  post订阅，delete取消订阅
      url: 'report/{{fundId}}/subscribe'
    },
    //  删除产品
    deleteProduct: {              //  delete删除产品
      url: 'report/{{fundId}}'
    },
    //  分享
    shareReport: {              //  delete删除产品
      url: 'report/{{fundId}}/share'
    },
    //  风险评价资产配置-预览
    riskPreview: {              //  post  生成预览
      url: 'asset/risk/preview'
    },
    //  风险评价资产配置-生成报告
    riskGenerate: {              //  post  生成报告
      url: 'asset/risk/generate'
    },
    
    getURL: function (id, params) {
      var api = this[id];
      if (api.isMock) {
        return this.baseURL + id;
      }
      return this.baseURL + parseURL(api.url, params) + getQueryString(params, api.queryParams);
    }
  };
  
  apisMain.extend('FOF', api);
  
  return api;
}));
