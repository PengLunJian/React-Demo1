;(function webpackUniversalModuleDefinition(root, factory) {
  
  // 兼容不同的模块化规范
  
  // CommonJS ?
  if (typeof exports === 'object' && typeof module === 'object')
    module.exports = factory(require('./apisMain.js'));
  // AMD
  else if (typeof define === 'function' && define.amd)
    define('001_superF10', ['apisMain'], factory);
  // ES6 ?
  else if (typeof exports === 'object')
    exports['001_superF10'] = factory(require('./apisMain.js'));
  else
  // 暴露给window
    root['apisMain'] = factory(root['apisMain']);
  
}(this, function (apisMain) {
  
  if (!apisMain || !apisMain.apisMain) {
    throw new Error('请先加载apisMain模块!');
  }
  
  var getQueryString = apisMain.getQueryString;
  
  var superF10 = {
    id: 'superF10',
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
      timeout: 15000
    },
    baseURL: '/api/superF10/',
    login1: {   //  url传参org和sid的登录方式
      org: '',  //  客户id
      getComponentURL: function (params) {
        return 'user/' + params.org + '/login1';
      }
    },
    login2: {   //  url传参org和ssoT的登录方式
      org: '',  //  客户id
      getComponentURL: function (params) {
        return 'user/' + params.org + '/login2';
      }
    },
    login3: {   //  Login页面输入账号密码调用接口的登录方式
      org: '',  //  客户id
      getComponentURL: function (params) {
        return 'user/' + params.org + '/login3';
      }
    },
    //  获取用户的一些定制key value
    cfg: {
      org: '',  //  客户id
      getComponentURL: function (params) {
        return 'jcmk/' + params.org + '/cfg';
      }
    },
    //  日K
    kLine: {   // 获取日K数据
      stockCode: '',
      queryParams: {
        dayCount1: 100, // 往前多少天
        dayCount2: '',  // 往后多少天
        tradingDay: ''  // 特定的操作日期
      },
      getComponentURL: function (params) {
        return 'jcmk/' + params.stockCode + '/kline' + getQueryString(params, this.queryParams);
      }
    },
    //  交易日
    jyr: {
      queryParams: {
        // type: 0,        // 0: 取当天是交易日的当天日期除外的所有交易日，1: 取包括当天的交易日
        count: 10      // 取多少条数据
      },
      getComponentURL: function (params) {
        return 'jcmk/lhdsJyr' + getQueryString(params, this.queryParams);
      }
    },
    //  报告日期
    bgrq: {
      stockCode: '',
      getComponentURL: function (params) {
        return 'jcmk/' + params.stockCode + '/bgrq';
      }
    },
    //  股票查询
    gpcx: {   // 查询股票列表
      queryParams: {
        searchText: '',
        itemCount: 20
      },
      getComponentURL: function (params) {
        return 'jcmk/gpcx' + getQueryString(params, this.queryParams);
      }
    },
    //  最新异动
    zxyd: {
      moduleCode: 'all',    //  模块类型  all 或者 sjxh、lhb等
      stockCode: 'all',     //  指定搜索哪一只股票、默认全部
      queryParams: {
        // timeStamp: '',     //  从什么时间开始取历史数据，不传表示取最新的数据
        timeStamp: '',       //  传最新一条的日期，第一次穿空
        startIndex: 1,             //  相当于startIndex，第一次为0，后续每次加pageSize
        itemCount: 10        //  每次取多少条
      },
      getComponentURL: function (params) {
        return 'jcmk/' + params.moduleCode + '/' + params.stockCode + '/zxyd' + getQueryString(params, this.queryParams);
      }
    },
    //  智能MOT
    znmot: {
      stockCode: 'all',
      queryParams: {
        template: 'alldobetter',
        model: 'all',
        startIndex: 1,
        itemCount: 10,
        timeStamp: ''
      },
      getComponentURL: function (params) {
        return 'jcmk/' + params.stockCode + '/motModel' + getQueryString(params, this.queryParams);
      }
    },
    //  智能MOT总数
    znmotc: {
      stockCode: 'all',
      queryParams: {
        template: 'alldobetter',
        model: 'all'
      },
      getComponentURL: function (params) {
        return 'jcmk/' + params.stockCode + '/motModelNum' + getQueryString(params, this.queryParams);
      }
    },
    //  收盘综述
    spzh_zy: {    // 综述列表
      // isMock: true,
      stockCode: '',
      getComponentURL: function (params) {
        return 'spzs/' + params.stockCode + '/zy';
      }
    },
    //  灵动解盘
    lingdongjiepan_jszb: {  // 灵动解盘 近期股票形态(技术指标)
      stockCode: '',
      queryParams: {
        dayCount: '',
        shapeType: '',    // 返回特定shapeType的数据
        tradingDay: ''    // 从特定时期往前取数据
      },
      getComponentURL: function (params) {
        return 'ldjp/' + params.stockCode + '/jszb' + getQueryString(params, this.queryParams);
      }
    },
    //  公告解析-个股
    gonggaojiexi_gglb: {   // 公司巡航 公告列表
      stockCode: '',
      queryParams: {
        startIndex: 1,
        itemCount: 9,
        tradingDay: ''
      },
      getComponentURL: function (params) {
        return 'gsxw/' + params.stockCode + '/gglb' + getQueryString(params, this.queryParams);
      }
    },
    gonggaojiexi_zy: {   // 公司巡航 公告摘要信息
      eventId: '',
      queryParams: {
          isSummary: ''
      },
      getComponentURL: function (params) {
        return 'gsxw/' + params.eventId + '/zy' + getQueryString(params, this.queryParams);
      }
    },
    gonggaojiexi_znpc: {    // 公司巡航 智能评测列表
      eventId: '',
      getComponentURL: function (params) {
        return 'gsxw/' + params.eventId + '/znpc';
      }
    },
    gonggaojiexi_fyqx: {    // 公司巡航 历史平均反应曲线
      eventId: '',
      getComponentURL: function (params) {
        return 'gsxw/' + params.eventId + '/fyqx';
      }
    },
    gonggaojiexi_pgpc: {    // 公司巡航 计算器 配股评测
      eventId: '',
      getComponentURL: function (params) {
        return 'gsxw/' + params.eventId + '/pgpc';
      }
    },
    gonggaojiexi_fhpc: {    // 公司巡航 计算器 分红评测
      eventId: '',
      getComponentURL: function (params) {
        return 'gsxw/' + params.eventId + '/fhpc';
      }
    },
    gonggaojiexi_lszs: {    // 公司巡航 公告事件节点走势
      eventId: '',
      getComponentURL: function (params) {
        return 'gsxw/' + params.eventId + '/lszs';
      }
    },
    gonggaojiexi_tptj: {    // 公司巡航 停牌统计
      eventId: '',
      getComponentURL: function (params) {
        return 'gsxw/' + params.eventId + '/tptj';
      }
    },
    gonggaojiexi_fhl: {    // 公司巡航 分红率
      eventId: '',
      getComponentURL: function (params) {
        return 'gsxw/' + params.eventId + '/fhl';
      }
    },
    gonggaojiexi_zjc: {    // 公司巡航 增减持
      eventId: '',
      getComponentURL: function (params) {
        return 'gsxw/' + params.eventId + '/zjc';
      }
    },
    gonggaojiexi_zf: {    // 公司巡航 增发
      eventId: '',
      getComponentURL: function (params) {
        return 'gsxw/' + params.eventId + '/zf';
      }
    },
    gonggaojiexi_pg: {    // 公司巡航 配股
      eventId: '',
      getComponentURL: function (params) {
        return 'gsxw/' + params.eventId + '/pg';
      }
    },
    //  公告解析-全市场
    GGJX_zxggc: {    // 公告解析最新公告总数
      stockCode: '',
      l1Code: '',
      l2Code: '',
      getComponentURL: function (params) {
        return 'gsxw/' + params.stockCode + '/' + params.l1Code + '/zxggc';
      }
    },
    GGJX_zxgg: {    // 公告解析最新公告列表
      stockCode: '',
      l1Code: '',
      l2Code: '',
      queryParams: {
        startIndex: 1,
        itemCount: 10
      },
      getComponentURL: function (params) {
        return 'gsxw/' + params.stockCode + '/' + params.l1Code + '/zxggbp' + getQueryString(params, this.queryParams);
      }
    },
    GGJX_lsggc: {    // 公告解析历史公告总数
      stockCode: '',
      l1Code: '',
      l2Code: '',
      queryParams: {
        publDate: ''
      },
      getComponentURL: function (params) {
        return 'gsxw/' + params.stockCode + '/' + params.l1Code + '/lsggc' + getQueryString(params, this.queryParams);
      }
    },
    GGJX_lsgg: {    // 公告解析历史公告列表
      stockCode: '',
      l1Code: '',
      l2Code: '',
      queryParams: {
        startIndex: 1,
        itemCount: 10,
        publDate: ''
      },
      getComponentURL: function (params) {
        return 'gsxw/' + params.stockCode + '/' + params.l1Code + '/lsggbp' + getQueryString(params, this.queryParams);
      }
    },
    GGJX_gxlc: {    // 公告解析股息率总数
      stockCode: '',
      queryParams: {
        startIndex: 1,
        itemCount: 10,
      },
      getComponentURL: function (params) {
        return 'gsxw/' + params.stockCode + '/gxlc' + getQueryString(params, this.queryParams);
      }
    },
    GGJX_gxl: {    // 公告解析股息率列表
      stockCode: '',
      queryParams: {
          startIndex: 1,
          itemCount: 10,
      },
      getComponentURL: function (params) {
        return 'gsxw/' + params.stockCode + '/gxl' + getQueryString(params, this.queryParams);
      }
    },
    GGJX_gglx: {
      getComponentURL: function (params) {
        return 'gsxw/gglx' + getQueryString(params, this.queryParams);
      }
    },
    // 全景监测
    quanjingjiance_gpglzbydlb: {   // 全景监测 股票关联异动列表
      stockCode: '',
      queryParams: {
        startIndex: 1,
        itemCount: 9,
        tradingDay: ''    // 从特定时期往前取数据
      },
      getComponentURL: function (params) {
        return 'sjxh/' + params.stockCode + '/zbydlb' + getQueryString(params, this.queryParams);
      }
    },
    quanjingjiance_gpglzbzy: {   // 全景监测 股票关联指标异动摘要
      stockCode: '',
      indexCode: '',
      queryParams: {
        tradingDay: ''    // 从特定时期往前取数据
      },
      getComponentURL: function (params) {
        return 'sjxh/' + params.stockCode + '/' + params.indexCode + '/zy' + getQueryString(params, this.queryParams);
      }
    },
    quanjingjiance_znpc: {    // 全景监测 次日走势预测（智能评测）
      stockCode: '',
      indexCode: '',
      queryParams: {
        tradingDay: ''    // 从特定时期往前取数据
      },
      getComponentURL: function (params) {
        return 'sjxh/' + params.stockCode + '/' + params.indexCode + '/znpc' + getQueryString(params, this.queryParams);
      }
    },
    quanjingjiance_zsyc: {    // 全景监测 上涨概率表
      stockCode: '',
      indexCode: '',
      queryParams: {
        tradingDay: ''    // 从特定时期往前取数据
      },
      getComponentURL: function (params) {
        return 'sjxh/' + params.stockCode + '/' + params.indexCode + '/zsyc' + getQueryString(params, this.queryParams);
      }
    },
    quanjingjiance_fyqx: {  // 全景监测 指标反应曲线
      stockCode: '',
      indexCode: '',
      queryParams: {
        tradingDay: ''    // 从特定时期往前取数据
      },
      getComponentURL: function (params) {
        return 'sjxh/' + params.stockCode + '/' + params.indexCode + '/fyqx' + getQueryString(params, this.queryParams);
      }
    },
    quanjingjiance_lszs: {  // 全景监测 历史走势图
      indexCode: '',
      queryParams: {
        dayCount: '',
        tradingDay: ''    // 从特定时期往前取数据
      },
      getComponentURL: function (params) {
        return 'sjxh/' + params.indexCode + '/lszs' + getQueryString(params, this.queryParams);
      }
    },
    quanjingjiance_lsyd: {  // 全景监测 历史走势图(历史异动点)
      stockCode: '',
      indexCode: '',
      queryParams: {
        dayCount: '',
        tradingDay: ''    // 从特定时期往前取数据
      },
      getComponentURL: function (params) {
        return 'sjxh/' + params.indexCode + '/' + params.stockCode + '/lsyd' + getQueryString(params, this.queryParams);
      }
    },
    //  全景监测-全市场版 股票
    quanjingjiance_szgllb: {    //  最新上涨概率列表
      indexCode: 'all',
      queryParams: {
        timeStamp: '',       //  传最新一条的日期，第一次穿空
        orderBy: 'desc',
        startIndex: 1,             //  相当于startIndex，第一次为0，后续每次加pageSize
        itemCount: 10        //  每次取多少条
      },
      getComponentURL: function (params) {
        return 'sjxh/' + params.indexCode + '/szgllb' + getQueryString(params, this.queryParams);
      }
    },
    quanjingjiance_szgllbc: {    //  最新上涨概率列表总数
      indexCode: 'all',
      queryParams: {
        orderBy: 'desc'
      },
      getComponentURL: function (params) {
        return 'sjxh/' + params.indexCode + '/szgllbc' + getQueryString(params, this.queryParams);
      }
    },
    quanjingjiance_zyzblb: {    //  最新主营占比列表
      indexCode: 'all',
      queryParams: {
        timeStamp: '',       //  传最新一条的日期，第一次穿空
        startIndex: 1,             //  相当于startIndex，第一次为0，后续每次加pageSize
        itemCount: 10        //  每次取多少条
      },
      getComponentURL: function (params) {
        return 'sjxh/' + params.indexCode + '/zyzblb' + getQueryString(params, this.queryParams);
      }
    },
    quanjingjiance_zyzblbc: {    //  最新主营占比总数
      indexCode: 'all',
      queryParams: {
        timeStamp: ''       //  传最新一条的日期，第一次穿空
      },
      getComponentURL: function (params) {
        return 'sjxh/' + params.indexCode + '/zyzblbc' + getQueryString(params, this.queryParams);
      }
    },
    quanjingjiance_zbcx: {    //  指标查询
      queryParams: {
        searchText: '',       //  查询字符串
        itemCount: 10            //  返回条数
      },
      getComponentURL: function (params) {
        return 'sjxh/zbcx' + getQueryString(params, this.queryParams);
      }
    },
    //  全景监测-全市场版 指标
    quanjingjiance_zbydlb: {    //  全市场指标列表
      queryParams: {
        orderBy: 'desc',
        timeStamp: '',         //  传最新一条的日期，第一次穿空
        startIndex: 1,              //  相当于startIndex，第一次为0，后续每次加pageSize
        itemCount: 10            //  每次取多少条
      },
      getComponentURL: function (params) {
        return 'sjxh/zbydlb' + getQueryString(params, this.queryParams);
      }
    },
    quanjingjiance_zbydlbc: {    //  全市场指标列表总数
      queryParams: {
        orderBy: 'desc',
        timeStamp: ''         //  传最新一条的日期，第一次穿空
      },
      getComponentURL: function (params) {
        return 'sjxh/zbydlbc' + getQueryString(params, this.queryParams);
      }
    },
    quanjingjiance_glgplb: {    //  指标关联股票列表
      indexCode: '',
      queryParams: {
        tradingDay: '',
        relaType: '',   //  L1  强关联；  L2  弱关联
        itemCount: ''
      },
      getComponentURL: function (params) {
        return 'sjxh/' + params.indexCode + '/glgplb' + getQueryString(params, this.queryParams);
      }
    },
    quanjingjiance_zbzy: {    //  指标异动摘要信息
      indexCode: '',
      queryParams: {
        tradingDay: ''
      },
      getComponentURL: function (params) {
        return 'sjxh/' + params.indexCode + '/zy' + getQueryString(params, this.queryParams);
      }
    },
    // 龙虎榜(旧)
    longhubang_zy: {    // 龙虎榜 个股基本信息展示
      stockCode: '',
      queryParams: {
        tradingDay: ''    // 从特定时期往前取数据
      },
      getComponentURL: function (params) {
        return 'lhb/' + params.stockCode + '/zy' + getQueryString(params, this.queryParams);
      }
    },
    longhubang_yyblb: {    // 龙虎榜 营业部买5卖5
      stockCode: '',
      queryParams: {
        tradingDay: ''    // 从特定时期往前取数据
      },
      getComponentURL: function (params) {
        return 'lhb/' + params.stockCode + '/yyblb' + getQueryString(params, this.queryParams);
      }
    },
    longhubang_yybhx: {    // 龙虎榜 营业部自画像
      yybid: '',
      getComponentURL: function (params) {
        return 'lhb/' + params.yybid + '/yybhx';
      }
    },
    longhubang_hyfb: {    // 龙虎榜 近期上榜行业分布
      stockCode: '',
      queryParams: {
        tradingDay: ''    // 从特定时期往前取数据
      },
      getComponentURL: function (params) {
        return 'lhb/' + params.stockCode + '/hyfb' + getQueryString(params, this.queryParams);
      }
    },
    longhubang_nszz: {    // 龙虎榜 牛散追踪
      stockCode: '',
      getComponentURL: function (params) {
        return 'lhb/' + params.stockCode + '/nszz';
      }
    },
    longhubang_gpzz: {    // 龙虎榜 牛散追踪-股票操作列表
      investorId: '',
      getComponentURL: function (params) {
        return 'lhb/' + params.investorId + '/gpzz';
      }
    },
    longhubang_gpxq: {    // 龙虎榜 牛散追踪-股票详情
      investorId: '',
      stockCode: '',
      getComponentURL: function (params) {
        return 'lhb/' + params.investorId + '/' + params.stockCode + '/gpxq';
      }
    },
    //  龙虎大师
    longhudashi_ggxx: {    // 龙虎大师 个股信息(包含摘要和买5卖5)
      stockCode: '',
      queryParams: {
        tradingDay: ''    // 从特定时期往前取数据
      },
      getComponentURL: function (params) {
        return 'lhds/' + params.stockCode + '/ggxq' + getQueryString(params, this.queryParams);
      }
    },
    longhudashi_ggxzyyb: {    // 龙虎大师 个股 协作营业部信息
      stockCode: '',
      queryParams: {
        tradingDay: ''    // 从特定时期往前取数据
      },
      getComponentURL: function (params) {
        return 'lhds/' + params.stockCode + '/ggxzyyb' + getQueryString(params, this.queryParams);
      }
    },
    longhudashi_yybxq: {    // 龙虎大师 营业部详情
      stockCode: '',
      queryParams: {
        typeName: '',
        dept: '',
        tradingDay: ''    // 从特定时期往前取数据
      },
      getComponentURL: function (params) {
        return 'lhds/yybxq' + getQueryString(params, this.queryParams);
      }
    },
    longhudashi_drfb: {    // 龙虎大师 当日上榜行业／概念分布
      stockCode: '',
      queryParams: {
        typeName: 'hy',     //  hy: 行业， gn：概念
        tradingDay: ''    // 从特定时期往前取数据
      },
      getComponentURL: function (params) {
        return 'lhds/' + params.stockCode + '/drsbhy' + getQueryString(params, this.queryParams);
      }
    },
    //  龙虎大师全市场版
    longhudashi_jrtj: {     //  龙虎大师全市场-今日推荐
      getComponentURL: function () {
        return 'lhds/jrtj';
      }
    },
    longhudashi_zjl: {    // 龙虎大师全市场-个股-资金量列表
      queryParams: {
        tradingDay: '',   //  检索的交易日
        count: 10         //  取当天的多少条数据
      },
      getComponentURL: function (params) {
        return 'lhds/zjl' + getQueryString(params, this.queryParams);
      }
    },
    longhudashi_gmsl: {    // 龙虎大师全市场-个股-跟买胜率列表
      queryParams: {
        typeName: 3,      //  切换近3个月、近6个月、近12个月（可选0、3、6、12、24）
        tradingDay: '',   //  检索的交易日
        count: 10         //  取当天的多少条数据
      },
      getComponentURL: function (params) {
        return 'lhds/gmsl' + getQueryString(params, this.queryParams);
      }
    },
    longhudashi_jgmr: {    // 龙虎大师全市场-个股-机构买入列表
      queryParams: {
        tradingDay: '',   //  检索的交易日
        count: 10         //  取当天的多少条数据
      },
      getComponentURL: function (params) {
        return 'lhds/jgmr' + getQueryString(params, this.queryParams);
      }
    },
    longhudashi_slb: {    // 龙虎大师全市场-营业部-实力榜列表
      queryParams: {
        typeName: 3,      //  切换近3个月、近6个月、近12个月（可选0、3、6、12、24）
        tradingDay: '',   //  检索的交易日
        count: 10         //  取当天的多少条数据
      },
      getComponentURL: function (params) {
        return 'lhds/slb' + getQueryString(params, this.queryParams);
      }
    },
    longhudashi_hyb: {    // 龙虎大师全市场-营业部-活跃榜列表
      queryParams: {
        tradingDay: '',   //  检索的交易日
        count: 10         //  取当天的多少条数据
      },
      getComponentURL: function (params) {
        return 'lhds/hyb' + getQueryString(params, this.queryParams);
      }
    },
    longhudashi_slvb: {    // 龙虎大师全市场-营业部-胜率榜列表
      queryParams: {
        typeName: 3,      //  切换近3个月、近6个月、近12个月（可选0、3、6、12、24）
        tradingDay: '',   //  检索的交易日
        count: 10         //  取当天的多少条数据
      },
      getComponentURL: function (params) {
        return 'lhds/slvb' + getQueryString(params, this.queryParams);
      }
    },
    longhudashi_xzb: {    // 龙虎大师全市场-营业部-协作榜列表
      queryParams: {
        typeName: 3,      //  切换近3个月、近6个月、近12个月（可选0、3、6、12、24）
        tradingDay: '',   //  检索的交易日
        count: 10         //  取当天的多少条数据
      },
      getComponentURL: function (params) {
        return 'lhds/xzb' + getQueryString(params, this.queryParams);
      }
    },
    // 相似K线
    xiangsikxian_xsgplb: {    // 相似K线 相似股票列表（相似K线走势的轮播列表）
      stockCode: '',
      queryParams: {
        tradingDay: ''    // 从特定时期往前取数据
      },
      getComponentURL: function (params) {
        return 'xskx/' + params.stockCode + '/xsgplb' + getQueryString(params, this.queryParams);
      }
    },
    xiangsikxian_zsyc: {    // 相似K线 后续走势预测
      stockCode: '',
      queryParams: {
        tradingDay: ''    // 从特定时期往前取数据
      },
      getComponentURL: function (params) {
        return 'xskx/' + params.stockCode + '/zsyc' + getQueryString(params, this.queryParams);
      }
    },
    xiangsikxian_ggzy: {    // 相似K线 停牌信息(第一个图右上角)
      stockCode: '',
      queryParams: {
        tradingDay: ''    // 从特定时期往前取数据
      },
      getComponentURL: function (params) {
        return 'xskx/' + params.stockCode + '/zy' + getQueryString(params, this.queryParams);
      }
    },
    xiangsikxian_jszb: {    // 相似K线 相似形态（技术指标）(模拟走势和相似K线走势通用)
      stockCode: '',
      simStockCode: '',
      queryParams: {
        simTradingDay: '',
        tradingDay: ''    // 从特定时期往前取数据
      },
      getComponentURL: function (params) {
        return 'xskx/' + params.stockCode + '/' + params.simStockCode + '/jszb' + getQueryString(params, this.queryParams);
      }
    },
    xiangsikxian_zy: {    // 相似信息 相似股票的摘要信息
      stockCode: '',
      simStockCode: '',
      queryParams: {
        tradingDay: '',    // 从特定时期往前取数据
        simTradingDay: ''
      },
      getComponentURL: function (params) {
        return 'xskx/' + params.stockCode + '/' + params.simStockCode + '/zy' + getQueryString(params, this.queryParams);
      }
    },
    xiangsikxian_szyc: {    // 相似K线 上涨预测
      stockCode: '',
      queryParams: {
        tradingDay: ''    // 从特定时期往前取数据
      },
      getComponentURL: function (params) {
        return 'xskx/' + params.stockCode + '/szyc' + getQueryString(params, this.queryParams);
      }
    },
    xiangsikxian_syyc: {    // 相似K线 收益预测
      stockCode: '',
      queryParams: {
        chartType: 1,   //  1: 曲线， 2： 柱状图
        tradingDay: ''    // 从特定时期往前取数据
      },
      getComponentURL: function (params) {
        return 'xskx/' + params.stockCode + '/syyc' + getQueryString(params, this.queryParams);
      }
    },
    // 相似K线全市场版
    xiangsikxian_xsdlb: {   //    相似K线，相似度排行
      queryParams: {
        itemCount: '',
        startIndex: ''
      },
      getComponentURL: function (params) {
        return 'xskx/xsdlb' + getQueryString(params, this.queryParams);
      }
    },
    xiangsikxian_xsdlbc: {   //    相似K线，相似度排行总数
      queryParams: {
        itemCount: ''
      },
      getComponentURL: function (params) {
        return 'xskx/xsdlbc' + getQueryString(params, this.queryParams);
      }
    },
    xiangsikxian_szyclb: {    //  相似K线，上涨概率、下跌概率
      queryParams: {
        itemCount: '',
        startIndex: '',
        orderBy: 'desc'       //  desc: 上涨概率, asc: 下跌概率
      },
      getComponentURL: function (params) {
        return 'xskx/szyclb' + getQueryString(params, this.queryParams);
      }
    },
    xiangsikxian_szyclbc: {    //  相似K线，上涨概率、下跌概率 总数
      queryParams: {
        itemCount: '',
        orderBy: 'desc'       //  desc: 上涨概率, asc: 下跌概率
      },
      getComponentURL: function (params) {
        return 'xskx/szyclbc' + getQueryString(params, this.queryParams);
      }
    },
    xiangsikxian_qjdplb: {   //   相似K线，趋近大盘
      queryParams: {
        itemCount: '',
        startIndex: ''
      },
      getComponentURL: function (params) {
        return 'xskx/qjdplb' + getQueryString(params, this.queryParams);
      }
    },
    xiangsikxian_qjdplbc: {   //   相似K线，趋近大盘总数
      queryParams: {
        itemCount: ''
      },
      getComponentURL: function (params) {
        return 'xskx/qjdplbc' + getQueryString(params, this.queryParams);
      }
    },
    xiangsikxian_bldplb: {   //   相似K线，背离大盘
      queryParams: {
        itemCount: '',
        startIndex: ''
      },
      getComponentURL: function (params) {
        return 'xskx/bldplb' + getQueryString(params, this.queryParams);
      }
    },
    xiangsikxian_bldplbc: {   //   相似K线，背离大盘
      queryParams: {
        itemCount: ''
      },
      getComponentURL: function (params) {
        return 'xskx/bldplbc' + getQueryString(params, this.queryParams);
      }
    },
    // 筹码分布
    choumafenbu_zy: {   // 总揽
      stockCode: '',
      queryParams: {
        resultType: '',   // 0: 筹码分布趋势；1：主力筹码分布
        tradingDay: ''    // 从特定时期往前取数据
      },
      getComponentURL: function (params) {
        return 'cmfb/' + params.stockCode + '/zy' + getQueryString(params, this.queryParams);
      }
    },
    choumafenbu_jgt: {   // 结构图
      stockCode: '',
      queryParams: {
        resultType: '',   // 0: 筹码分布趋势；1：主力筹码分布
        tradingDay: ''    // 从特定时期往前取数据
      },
      getComponentURL: function (params) {
        return 'cmfb/' + params.stockCode + '/jgt' + getQueryString(params, this.queryParams);
      }
    },
    choumafenbu_jzd: {   // 集中度
      stockCode: '',
      queryParams: {
        resultType: '',   // 0: 筹码分布趋势；1：主力筹码分布
        tradingDay: ''    // 从特定时期往前取数据
      },
      getComponentURL: function (params) {
        return 'cmfb/' + params.stockCode + '/jzd' + getQueryString(params, this.queryParams);
      }
    },
    choumafenbu_jzdphlb: {   // 集中度排行列表
      stockCode: '',
      queryParams: {
        startIndex: 1,
        itemCount: '' //
      },
      getComponentURL: function (params) {
        return 'cmfb/jzdphlb' + getQueryString(params, this.queryParams);
      }
    },
    choumafenbu_jzdphlbc: {   // 集中度排行列表分页总数
      getComponentURL: function () {
        return 'cmfb/jzdphlbc';
      }
    },
    choumafenbu_jzdbhlb: {   // 集中度变化列表
      stockCode: '',
      queryParams: {
        startIndex: 1,
        itemCount: '' //
      },
      getComponentURL: function (params) {
        return 'cmfb/jzdbhlb' + getQueryString(params, this.queryParams);
      }
    },
    choumafenbu_jzdbhlbc: {   // 集中度变化列表分页总数
      getComponentURL: function () {
        return 'cmfb/jzdbhlbc';
      }
    },
    // 股东追踪
    gudongzhuizong_gdxx: {   // 股东信息
      stockCode: '',
      getComponentURL: function (params) {
        return 'gdzz/' + params.stockCode + '/gdxx';
      }
    },
    gudongzhuizong_gdzz: {   // 股东详情
      stockCode: '',
      queryParams: {
        shType: '',
        endDate_p0: '',
        endDate_p1: ''
      },
      getComponentURL: function (params) {
        return 'gdzz/' + params.stockCode + '/gdzz' + getQueryString(params, this.queryParams);
      }
    },
    gudongzhuizong_gbjg: {   // 股本结构
      stockCode: '',
      getComponentURL: function (params) {
        return 'gdzz/' + params.stockCode + '/gbjg';
      }
    },
    gudongzhuizong_gdhjph: {   // 户均排行
      stockCode: '',
      getComponentURL: function (params) {
        return 'gdzz/' + params.stockCode + '/gdhjph';
      }
    },
    gudongzhuizong_gdhsgx: {   // 户数关系
      stockCode: '',
      getComponentURL: function (params) {
        return 'gdzz/' + params.stockCode + '/gdhsgx';
      }
    },
    gudongzhuizong_gdhsph: {   // 户数排行
      stockCode: '',
      getComponentURL: function (params) {
        return 'gdzz/' + params.stockCode + '/gdhsph';
      }
    },
    gudongzhuizong_gdls: {   // 历史持股
      stockCode: '',
      queryParams: {
        shType: '',
        shName: ''
      },
      getComponentURL: function (params) {
        return 'gdzz/' + params.stockCode + '/gdls' + getQueryString(params, this.queryParams);
      }
    },
    gudongzhuizong_cyfb: {   // 股票持有分布
      stockCode: '',
      queryParams: {
        shName: ''
      },
      getComponentURL: function (params) {
        return 'gdzz/cyfb' + getQueryString(params, this.queryParams);
      }
    },
    gudongzhuizong_zjcls: {   // 历史增减持
      stockCode: '',
      queryParams: {
        stockCode: ''
      },
      getComponentURL: function (params) {
        return 'gdzz/' + params.stockCode + '/zjcls' + getQueryString(params, this.queryParams);
      }
    },
    gudongzhuizong_zjctb: {   // 增减持分布
      stockCode: '',
      queryParams: {
        type: '',
        stockCode: ''
      },
      getComponentURL: function (params) {
        return 'gdzz/' + params.stockCode + '/zjctb' + getQueryString(params, this.queryParams);
      }
    },
    gudongzhuizong_zjctj: {   // 增减持比例分布
      stockCode: '',
      queryParams: {
        stockCode: ''
      },
      getComponentURL: function (params) {
        return 'gdzz/' + params.stockCode + '/zjctj' + getQueryString(params, this.queryParams);
      }
    },
    gudongzhuizong_gdjggx: {   // 机构和国家队持股比例与股价关系
      stockCode: '',
      getComponentURL: function (params) {
        return 'gdzz/' + params.stockCode + '/gdjggx';
      }
    },
    gudongzhuizong_gdjgph: {   // 机构持股变动排名
      stockCode: '',
      getComponentURL: function (params) {
        return 'gdzz/' + params.stockCode + '/gdjgph';
      }
    },
    gudongzhuizong_gdgjdph: {   // 国家队变动排名
      stockCode: '',
      getComponentURL: function (params) {
        return 'gdzz/' + params.stockCode + '/gdgjdph';
      }
    },
    gudongzhuizong_cymx: {   // 股票持有明细
      queryParams: {
        shName: ''            //  股东名称
      },
      getComponentURL: function (params) {
        return 'gdzz/cymx' + getQueryString(params, this.queryParams);
      }
    },
    //产品图谱
    chanpintupu_xqzs: {   // 详情展示
      stockCode: '',
      getComponentURL: function (params) {
        return 'cptp/' + params.stockCode + '/xqzs';
      }
    },
    
    //  智能盯盘
    getSWResult: {  //  智能盯盘-查询盯盘结果(盘中异动)
      stockCode: '',
      queryParams: {
        traindgDay: '',
        warnType: '',
        startIndex: '',
        itemCount: '',
      },
      getComponentURL: function (params) {
        return 'zndp/' + params.stockCode + '/ydlb' + getQueryString(params, this.queryParams);
      }
    },
    
    getURL: function (id, params) {
      if (this[id].isMock) {
        return this.baseURL + id;
      }
      
      return this.baseURL + this[id].getComponentURL(params);
    }
  };
  
  apisMain.extend('superF10', superF10);
}));
