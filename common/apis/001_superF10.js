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
    root['001_superF10'] = factory(root['apisMain']);
  
}(this, function (apisMain) {
  
  if (!apisMain || !apisMain.apisMain) {
    throw new Error('请先加载apisMain模块!');
  }
  
  var getQueryString = apisMain.getQueryString;
  var parseURL = apisMain.parseURL;
  
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
      url: 'user/{{org}}/login1'
    },
    login2: {   //  url传参org和ssoT的登录方式
      url: 'user/{{org}}/login2'
    },
    login3: {   //  Login页面输入账号密码调用接口的登录方式
      url: 'user/{{org}}/login3'
    },
    //  获取用户的一些定制key value
    cfg: {
      url: 'jcmk/{{org}}/cfg'
    },
    //  日K
    kLine: {   // 获取日K数据
      url: 'jcmk/{{stockCode}}/kline',
      queryParams: {
        dayCount1: 100, // 往前多少天
        dayCount2: '',  // 往后多少天
        tradingDay: ''  // 特定的操作日期
      }
    },
    //  交易日
    jyr: {
      url: 'jcmk/lhdsJyr',
      queryParams: {
        // type: 0,        // 0: 取当天是交易日的当天日期除外的所有交易日，1: 取包括当天的交易日
        count: 10      // 取多少条数据
      }
    },
    //  报告日期
    bgrq: {
      url: 'jcmk/{{stockCode}}/bgrq',
    },
    //  股票查询
    gpcx: {   // 查询股票列表
      url: 'jcmk/gpcx',
      queryParams: {
        searchText: '',
        itemCount: 20
      }
    },
    //  最新异动
    zxyd: {
      // moduleCode: 'all',    //  模块类型  all 或者 sjxh、lhb等
      // stockCode: 'all',     //  指定搜索哪一只股票、默认全部
      url: 'jcmk/{{moduleCode}}/{{stockCode}}/zxyd',
      queryParams: {
        // timeStamp: '',     //  从什么时间开始取历史数据，不传表示取最新的数据
        timeStamp: '',       //  传最新一条的日期，第一次穿空
        startIndex: 1,             //  相当于startIndex，第一次为0，后续每次加pageSize
        itemCount: 10        //  每次取多少条
      },
    },
    //  智能MOT
    znmot: {
      url: 'jcmk/{{stockCode}}/motModel',
      queryParams: {
        template: 'alldobetter',
        model: 'all',
        startIndex: 1,
        itemCount: 10,
        timeStamp: ''
      }
    },
    //  智能MOT总数
    znmotc: {
      url: 'jcmk/{{stockCode}}/motModelNum',
      queryParams: {
        template: 'alldobetter',
        model: 'all'
      }
    },
    //  收盘综述
    spzh_zy: {    // 综述列表
      // isMock: true,
      url: 'spzs/{{stockCode}}/zy'
    },
    //  灵动解盘
    lingdongjiepan_jszb: {  // 灵动解盘 近期股票形态(技术指标)
      url: 'ldjp/{{stockCode}}/jszb',
      queryParams: {
        dayCount: '',
        shapeType: '',    // 返回特定shapeType的数据
        tradingDay: ''    // 从特定时期往前取数据
      }
    },
    //  公告解析-个股
    gonggaojiexi_gglb: {   // 公司巡航 公告列表
      url: 'gsxw/{{stockCode}}/gglb',
      queryParams: {
        startIndex: 1,
        itemCount: 9,
        tradingDay: ''
      }
    },
    gonggaojiexi_zy: {   // 公司巡航 公告摘要信息
      url: 'gsxw/{{eventId}}/zy',
      queryParams: {
          isSummary: ''
      }
    },
    gonggaojiexi_znpc: {    // 公司巡航 智能评测列表
      url: 'gsxw/{{eventId}}/znpc'
    },
    gonggaojiexi_fyqx: {    // 公司巡航 历史平均反应曲线
      url: 'gsxw/{{eventId}}/fyqx'
    },
    gonggaojiexi_pgpc: {    // 公司巡航 计算器 配股评测
      url: 'gsxw/{{eventId}}/pgpc'
    },
    gonggaojiexi_fhpc: {    // 公司巡航 计算器 分红评测
      url: 'gsxw/{{eventId}}/fhpc'
    },
    gonggaojiexi_lszs: {    // 公司巡航 公告事件节点走势
      url: 'gsxw/{{eventId}}/lszs'
    },
    gonggaojiexi_tptj: {    // 公司巡航 停牌统计
      url: 'gsxw/{{eventId}}/tptj'
    },
    gonggaojiexi_fhl: {    // 公司巡航 分红率
      url: 'gsxw/{{eventId}}/fhl'
    },
    gonggaojiexi_zjc: {    // 公司巡航 增减持
      url: 'gsxw/{{eventId}}/zjc'
    },
    gonggaojiexi_zf: {    // 公司巡航 增发
      url: 'gsxw/{{eventId}}/zf'
    },
    gonggaojiexi_pg: {    // 公司巡航 配股
      url: 'gsxw/{{eventId}}/pg'
    },
    //  公告解析-全市场
    GGJX_zxggc: {    // 公告解析最新公告总数
      url: 'gsxw/{{stockCode}}/{{l1Code}}/zxggc'
    },
    GGJX_zxgg: {    // 公告解析最新公告列表
      url: 'gsxw/{{stockCode}}/{{l1Code}}/zxggbp',
      queryParams: {
        startIndex: 1,
        itemCount: 10
      }
    },
    GGJX_lsggc: {    // 公告解析历史公告总数
      url: 'gsxw/{{stockCode}}/{{l1Code}}/lsggc',
      queryParams: {
        publDate: ''
      }
    },
    GGJX_lsgg: {    // 公告解析历史公告列表
      url: 'gsxw/{{stockCode}}/{{l1Code}}/lsggbp',
      queryParams: {
        startIndex: 1,
        itemCount: 10,
        publDate: ''
      }
    },
    GGJX_gxlc: {    // 公告解析股息率总数
      url: 'gsxw/{{stockCode}}/gxlc',
      queryParams: {
        startIndex: 1,
        itemCount: 10,
      }
    },
    GGJX_gxl: {    // 公告解析股息率列表
      url: 'gsxw/{{stockCode}}/gxl',
      queryParams: {
          startIndex: 1,
          itemCount: 10,
      }
    },
    GGJX_gglx: {
      url: 'gsxw/gglx'
    },
    // 全景监测
    quanjingjiance_gpglzbydlb: {   // 全景监测 股票关联异动列表
      url: 'sjxh/{{stockCode}}/zbydlb',
      queryParams: {
        startIndex: 1,
        itemCount: 9,
        tradingDay: ''    // 从特定时期往前取数据
      }
    },
    quanjingjiance_gpglzbzy: {   // 全景监测 股票关联指标异动摘要
      url: 'sjxh/{{stockCode}}/{{indexCode}}/zy',
      queryParams: {
        tradingDay: ''    // 从特定时期往前取数据
      }
    },
    quanjingjiance_znpc: {    // 全景监测 次日走势预测（智能评测）
      url: 'sjxh/{{stockCode}}/{{indexCode}}/znpc',
      queryParams: {
        tradingDay: ''    // 从特定时期往前取数据
      }
    },
    quanjingjiance_zsyc: {    // 全景监测 上涨概率表
      url: 'sjxh/{{stockCode}}/{{indexCode}}/zsyc',
      queryParams: {
        tradingDay: ''    // 从特定时期往前取数据
      }
    },
    quanjingjiance_fyqx: {  // 全景监测 指标反应曲线
      url: 'sjxh/{{stockCode}}/{{indexCode}}/fyqx',
      queryParams: {
        tradingDay: ''    // 从特定时期往前取数据
      }
    },
    quanjingjiance_lszs: {  // 全景监测 历史走势图
      url: 'sjxh/{{indexCode}}/lszs',
      queryParams: {
        dayCount: '',
        tradingDay: ''    // 从特定时期往前取数据
      }
    },
    quanjingjiance_lsyd: {  // 全景监测 历史走势图(历史异动点)
      url: 'sjxh/{{indexCode}}/{{stockCode}}/lsyd',
      queryParams: {
        dayCount: '',
        tradingDay: ''    // 从特定时期往前取数据
      }
    },
    //  全景监测-全市场版 股票
    quanjingjiance_szgllb: {    //  最新上涨概率列表
      url: 'sjxh/{{indexCode}}/szgllb',
      queryParams: {
        timeStamp: '',       //  传最新一条的日期，第一次穿空
        orderBy: 'desc',
        startIndex: 1,             //  相当于startIndex，第一次为0，后续每次加pageSize
        itemCount: 10        //  每次取多少条
      }
    },
    quanjingjiance_szgllbc: {    //  最新上涨概率列表总数
      url: 'sjxh/{{indexCode}}/szgllbc',
      queryParams: {
        orderBy: 'desc'
      }
    },
    quanjingjiance_zyzblb: {    //  最新主营占比列表
      url: 'sjxh/{{indexCode}}/zyzblb',
      queryParams: {
        timeStamp: '',       //  传最新一条的日期，第一次穿空
        startIndex: 1,             //  相当于startIndex，第一次为0，后续每次加pageSize
        itemCount: 10        //  每次取多少条
      }
    },
    quanjingjiance_zyzblbc: {    //  最新主营占比总数
      url: 'sjxh/{{indexCode}}/zyzblbc',
      queryParams: {
        timeStamp: ''       //  传最新一条的日期，第一次穿空
      }
    },
    quanjingjiance_zbcx: {    //  指标查询
      url: 'sjxh/zbcx',
      queryParams: {
        searchText: '',       //  查询字符串
        itemCount: 10            //  返回条数
      }
    },
    //  全景监测-全市场版 指标
    quanjingjiance_zbydlb: {    //  全市场指标列表
      url: 'sjxh/zbydlb',
      queryParams: {
        orderBy: 'desc',
        timeStamp: '',         //  传最新一条的日期，第一次穿空
        startIndex: 1,              //  相当于startIndex，第一次为0，后续每次加pageSize
        itemCount: 10            //  每次取多少条
      }
    },
    quanjingjiance_zbydlbc: {    //  全市场指标列表总数
      url: 'sjxh/zbydlbc',
      queryParams: {
        orderBy: 'desc',
        timeStamp: ''         //  传最新一条的日期，第一次穿空
      }
    },
    quanjingjiance_glgplb: {    //  指标关联股票列表
      url: 'sjxh/{{indexCode}}/glgplb',
      queryParams: {
        tradingDay: '',
        relaType: '',   //  L1  强关联；  L2  弱关联
        itemCount: ''
      }
    },
    quanjingjiance_zbzy: {    //  指标异动摘要信息
      url: 'sjxh/{{indexCode}}/zy',
      queryParams: {
        tradingDay: ''
      }
    },
    // 龙虎榜(旧)
    longhubang_zy: {    // 龙虎榜 个股基本信息展示
      url: 'lhb/{{stockCode}}/zy',
      queryParams: {
        tradingDay: ''    // 从特定时期往前取数据
      }
    },
    longhubang_yyblb: {    // 龙虎榜 营业部买5卖5
      url: 'lhb/{{stockCode}}/yyblb',
      queryParams: {
        tradingDay: ''    // 从特定时期往前取数据
      }
    },
    longhubang_yybhx: {    // 龙虎榜 营业部自画像
      url: 'lhb/{{yybid}}/yybhx'
    },
    longhubang_hyfb: {    // 龙虎榜 近期上榜行业分布
      url: 'lhb/{{stockCode}}/hyfb',
      queryParams: {
        tradingDay: ''    // 从特定时期往前取数据
      }
    },
    longhubang_nszz: {    // 龙虎榜 牛散追踪
      url: 'lhb/{{stockCode}}/nszz'
    },
    longhubang_gpzz: {    // 龙虎榜 牛散追踪-股票操作列表
      url: 'lhb/{{investorId}}/gpzz'
    },
    longhubang_gpxq: {    // 龙虎榜 牛散追踪-股票详情
      url: 'lhb/{{investorId}}/{{stockCode}}/gpxq'
    },
    //  龙虎大师
    longhudashi_ggxx: {    // 龙虎大师 个股信息(包含摘要和买5卖5)
      url: 'lhds/{{stockCode}}/ggxq',
      queryParams: {
        tradingDay: ''    // 从特定时期往前取数据
      }
    },
    longhudashi_ggxzyyb: {    // 龙虎大师 个股 协作营业部信息
      url: 'lhds/{{stockCode}}/ggxzyyb',
      queryParams: {
        tradingDay: ''    // 从特定时期往前取数据
      }
    },
    longhudashi_yybxq: {    // 龙虎大师 营业部详情
      url: 'lhds/yybxq',
      queryParams: {
        typeName: '',
        dept: '',
        tradingDay: ''    // 从特定时期往前取数据
      }
    },
    longhudashi_drfb: {    // 龙虎大师 当日上榜行业／概念分布
      url: 'lhds/{{stockCode}}/drsbhy',
      queryParams: {
        typeName: 'hy',     //  hy: 行业， gn：概念
        tradingDay: ''    // 从特定时期往前取数据
      }
    },
    //  龙虎大师全市场版
    longhudashi_jrtj: {     //  龙虎大师全市场-今日推荐
      url: 'lhds/jrtj'
    },
    longhudashi_zjl: {    // 龙虎大师全市场-个股-资金量列表
      url: 'lhds/zjl',
      queryParams: {
        tradingDay: '',   //  检索的交易日
        count: 10         //  取当天的多少条数据
      }
    },
    longhudashi_gmsl: {    // 龙虎大师全市场-个股-跟买胜率列表
      url: 'lhds/gmsl',
      queryParams: {
        typeName: 3,      //  切换近3个月、近6个月、近12个月（可选0、3、6、12、24）
        tradingDay: '',   //  检索的交易日
        count: 10         //  取当天的多少条数据
      }
    },
    longhudashi_jgmr: {    // 龙虎大师全市场-个股-机构买入列表
      url: 'lhds/jgmr',
      queryParams: {
        tradingDay: '',   //  检索的交易日
        count: 10         //  取当天的多少条数据
      }
    },
    longhudashi_slb: {    // 龙虎大师全市场-营业部-实力榜列表
      url: 'lhds/slb',
      queryParams: {
        typeName: 3,      //  切换近3个月、近6个月、近12个月（可选0、3、6、12、24）
        tradingDay: '',   //  检索的交易日
        count: 10         //  取当天的多少条数据
      }
    },
    longhudashi_hyb: {    // 龙虎大师全市场-营业部-活跃榜列表
      url: 'lhds/hyb',
      queryParams: {
        tradingDay: '',   //  检索的交易日
        count: 10         //  取当天的多少条数据
      }
    },
    longhudashi_slvb: {    // 龙虎大师全市场-营业部-胜率榜列表
      url: 'lhds/slvb',
      queryParams: {
        typeName: 3,      //  切换近3个月、近6个月、近12个月（可选0、3、6、12、24）
        tradingDay: '',   //  检索的交易日
        count: 10         //  取当天的多少条数据
      }
    },
    longhudashi_xzb: {    // 龙虎大师全市场-营业部-协作榜列表
      url: 'lhds/xzb',
      queryParams: {
        typeName: 3,      //  切换近3个月、近6个月、近12个月（可选0、3、6、12、24）
        tradingDay: '',   //  检索的交易日
        count: 10         //  取当天的多少条数据
      }
    },
    // 相似K线
    xiangsikxian_xsgplb: {    // 相似K线 相似股票列表（相似K线走势的轮播列表）
      url: 'xskx/{{stockCode}}/xsgplb',
      queryParams: {
        tradingDay: ''    // 从特定时期往前取数据
      }
    },
    xiangsikxian_zsyc: {    // 相似K线 后续走势预测
      url: 'xskx/{{stockCode}}/zsyc',
      queryParams: {
        tradingDay: ''    // 从特定时期往前取数据
      }
    },
    xiangsikxian_ggzy: {    // 相似K线 停牌信息(第一个图右上角)
      url: 'xskx/{{stockCode}}/zy',
      queryParams: {
        tradingDay: ''    // 从特定时期往前取数据
      }
    },
    xiangsikxian_jszb: {    // 相似K线 相似形态（技术指标）(模拟走势和相似K线走势通用)
      url: 'xskx/{{stockCode}}/{{simStockCode}}/jszb',
      queryParams: {
        simTradingDay: '',
        tradingDay: ''    // 从特定时期往前取数据
      }
    },
    xiangsikxian_zy: {    // 相似信息 相似股票的摘要信息
      url: 'xskx/{{stockCode}}/{{simStockCode}}/zy',
      queryParams: {
        tradingDay: '',    // 从特定时期往前取数据
        simTradingDay: ''
      }
    },
    xiangsikxian_szyc: {    // 相似K线 上涨预测
      url: 'xskx/{{stockCode}}/szyc',
      queryParams: {
        tradingDay: ''    // 从特定时期往前取数据
      }
    },
    xiangsikxian_syyc: {    // 相似K线 收益预测
      url: 'xskx/{{stockCode}}/syyc',
      queryParams: {
        chartType: 1,   //  1: 曲线， 2： 柱状图
        tradingDay: ''    // 从特定时期往前取数据
      }
    },
    // 相似K线全市场版
    xiangsikxian_xsdlb: {   //    相似K线，相似度排行
      url: 'xskx/xsdlb',
      queryParams: {
        itemCount: '',
        startIndex: ''
      }
    },
    xiangsikxian_xsdlbc: {   //    相似K线，相似度排行总数
      url: 'xskx/xsdlbc',
      queryParams: {
        itemCount: ''
      }
    },
    xiangsikxian_szyclb: {    //  相似K线，上涨概率、下跌概率
      url: 'xskx/szyclb',
      queryParams: {
        itemCount: '',
        startIndex: '',
        orderBy: 'desc'       //  desc: 上涨概率, asc: 下跌概率
      }
    },
    xiangsikxian_szyclbc: {    //  相似K线，上涨概率、下跌概率 总数
      url: 'xskx/szyclbc',
      queryParams: {
        itemCount: '',
        orderBy: 'desc'       //  desc: 上涨概率, asc: 下跌概率
      }
    },
    xiangsikxian_qjdplb: {   //   相似K线，趋近大盘
      url: 'xskx/qjdplb',
      queryParams: {
        itemCount: '',
        startIndex: ''
      }
    },
    xiangsikxian_qjdplbc: {   //   相似K线，趋近大盘总数
      url: 'xskx/qjdplbc',
      queryParams: {
        itemCount: ''
      }
    },
    xiangsikxian_bldplb: {   //   相似K线，背离大盘
      url: 'xskx/bldplb',
      queryParams: {
        itemCount: '',
        startIndex: ''
      }
    },
    xiangsikxian_bldplbc: {   //   相似K线，背离大盘
      url: 'xskx/bldplbc',
      queryParams: {
        itemCount: ''
      }
    },
    // 筹码分布
    choumafenbu_zy: {   // 总揽
      url: 'cmfb/{{stockCode}}/zy',
      queryParams: {
        resultType: '',   // 0: 筹码分布趋势；1：主力筹码分布
        tradingDay: ''    // 从特定时期往前取数据
      }
    },
    choumafenbu_jgt: {   // 结构图
      url: 'cmfb/{{stockCode}}/jgt',
      queryParams: {
        resultType: '',   // 0: 筹码分布趋势；1：主力筹码分布
        tradingDay: ''    // 从特定时期往前取数据
      }
    },
    choumafenbu_jzd: {   // 集中度
      url: 'cmfb/{{stockCode}}/jzd',
      queryParams: {
        resultType: '',   // 0: 筹码分布趋势；1：主力筹码分布
        tradingDay: ''    // 从特定时期往前取数据
      }
    },
    choumafenbu_jzdphlb: {   // 集中度排行列表
      url: 'cmfb/jzdphlb',
      queryParams: {
        startIndex: 1,
        itemCount: '' //
      }
    },
    choumafenbu_jzdphlbc: {   // 集中度排行列表分页总数
      url: 'cmfb/jzdphlbc'
    },
    choumafenbu_jzdbhlb: {   // 集中度变化列表
      url: 'cmfb/jzdbhlb',
      queryParams: {
        startIndex: 1,
        itemCount: '' //
      }
    },
    choumafenbu_jzdbhlbc: {   // 集中度变化列表分页总数
      url: 'cmfb/jzdbhlbc'
    },
    // 股东追踪
    gudongzhuizong_gdxx: {   // 股东信息
      url: 'gdzz/{{stockCode}}/gdxx'
    },
    gudongzhuizong_gdzz: {   // 股东详情
      url: 'gdzz/{{stockCode}}/gdzz',
      queryParams: {
        shType: '',
        endDate_p0: '',
        endDate_p1: ''
      }
    },
    gudongzhuizong_gbjg: {   // 股本结构
      url: 'gdzz/{{stockCode}}/gbjg'
    },
    gudongzhuizong_gdhjph: {   // 户均排行
      url: 'gdzz/{{stockCode}}/gdhjph'
    },
    gudongzhuizong_gdhsgx: {   // 户数关系
      url: 'gdzz/{{stockCode}}/gdhsgx'
    },
    gudongzhuizong_gdhsph: {   // 户数排行
      url: 'gdzz/{{stockCode}}/gdhsph'
    },
    gudongzhuizong_gdls: {   // 历史持股
      url: 'gdzz/{{stockCode}}/gdls',
      queryParams: {
        shType: '',
        shName: ''
      }
    },
    gudongzhuizong_cyfb: {   // 股票持有分布
      url: 'gdzz/cyfb',
      queryParams: {
        shName: ''
      }
    },
    gudongzhuizong_zjcls: {   // 历史增减持
      url: 'gdzz/{{stockCode}}/zjcls',
      queryParams: {
        stockCode: ''
      }
    },
    gudongzhuizong_zjctb: {   // 增减持分布
      url: 'gdzz/{{stockCode}}/zjctb',
      queryParams: {
        type: '',
        stockCode: ''
      }
    },
    gudongzhuizong_zjctj: {   // 增减持比例分布
      url: 'gdzz/{{stockCode}}/zjctj',
      queryParams: {
        stockCode: ''
      }
    },
    gudongzhuizong_gdjggx: {   // 机构和国家队持股比例与股价关系
      url: 'gdzz/{{stockCode}}/gdjggx'
    },
    gudongzhuizong_gdjgph: {   // 机构持股变动排名
      url: 'gdzz/{{stockCode}}/gdjgph'
    },
    gudongzhuizong_gdgjdph: {   // 国家队变动排名
      url: 'gdzz/{{stockCode}}/gdgjdph'
    },
    gudongzhuizong_cymx: {   // 股票持有明细
      url: 'gdzz/cymx',
      queryParams: {
        shName: ''            //  股东名称
      }
    },
    //  产品图谱
    chanpintupu_xqzs: {   // 详情展示
      url: 'cptp/{{stockCode}}/xqzs'
    },
    
    //  智能盯盘
    getSWResult: {  //  智能盯盘-查询盯盘结果(盘中异动)
      url: 'zndp/{{stockCode}}/ydlb',
      queryParams: {
        traindgDay: '',
        warnType: '',
        startIndex: '',
        itemCount: '',
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
  
  apisMain.extend('superF10', superF10);
}));
