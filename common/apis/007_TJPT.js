;(function webpackUniversalModuleDefinition(root, factory) {
  
  // 兼容不同的模块化规范
  
  // CommonJS ?
  if (typeof exports === 'object' && typeof module === 'object')
    module.exports = factory(require('./apisMain.js'));
  // AMD
  else if (typeof define === 'function' && define.amd)
    define('007_TJPT', ['apisMain'], factory);
  // ES6 ?
  else if (typeof exports === 'object')
    exports['007_TJPT'] = factory(require('./apisMain.js'));
  else
  // 暴露给window
    root['007_TJPT'] = factory(root['apisMain']);
  
}(this, function (apisMain) {
  
  if (!apisMain || !apisMain.apisMain) {
    throw new Error('请先加载apisMain模块!');
  }
  
  var getQueryString = apisMain.getQueryString;
  var parseURL = apisMain.parseURL;
  
  var api = {
    id: 'TJPT',
    ajaxConfig: {
      method: 'get',
      headers: {
        // 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        // 'Content-Type': 'application/json',
        // 'charset': 'UTF-8',
        'Content-Type': 'application/json;charset=utf-8'
      },
      responseType: '',   //  为了兼容IE9的一个处理
      params: '',     // 与请求一起发送的URL参数
      data: '',       // PUT，POST和PATCH时发送的参数
      timeout: 20000
    },
    baseURL: '/api/edu/',
    //  登录、权限相关
    verifyCode: {                //  get 获取验证码， post验证验证码是否正确（带client_key, verify_code）
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
    userChangePassWord: {           //  PATCH   修改密码
      url: 'cms/user/passWord',
      queryParams: {
        oldPassWord: '',
        newPassWord: ''
      }
    },
    
    //  券商机构相关接口
    getOrgTree: {           //  GET 获取券商树
      url: 'cms/orgTree'
    },
    //  获取用户信息
    getUserInfo: {
      url: 'cms/user'
    },
    
    //  所有搜索框数据
    getDictionary: {    //  GET 获取所有下拉框等数据
      url: 'dataDictionary/data',
      queryParams: {
        type: ''        //  type: 1:应用, 2:重要程度, 3:发布状态,4:启用状态 ,查询多个种类可用逗号隔开
      }
    },
    
    //  内容管理-栏目展现形式
    nrgl_display: {         //  GET 查询展现形式列表
      url: 'cms/displays',
      queryParams: {
        currentPage: '',
        pageSize: '',
        name: ''
      }
    },
    nrgl_addDisplay: {         //  POST 新增展现形式列表 (name,code,type 必填)
      url: 'cms/display',
      queryParams: {
        name: '',
        code: '',
        remark: ''
      }
    },
    nrgl_deleteDisplay: {         //  DELETE  删除展现形式(可多个,逗号分隔)
      url: 'cms/display',
      queryParams: {
        displayIds: ''
      }
    },
    nrgl_getDisplayDetail: {         //  GET 查询单个展现形式列表详细信息
      url: 'cms/display/{{displayId}}'
    },
    nrgl_saveDisplayDetail: {         //  PATCH 修改展现形式列表,(name,code,type 必填)
      url: 'cms/display/{{displayId}}',
      queryParams: {
        name: '',
        code: '',
        remark: ''
      }
    },
    
    //  内容管理-轮播图
    nrgl_carousel: {          //  GET 查询轮播图列表
      url: 'cms/carousels',
      queryParams: {
        name: ''
      }
    },
    nrgl_addCarousel: {          //  POST   新增轮播图 (name,code 必填)
      url: 'cms/carousel',
      queryParams: {
        name: '',
        code: ''
      }
    },
    nrgl_deleteCarousel: {          //  DELETE /cms/carousel
      url: 'cms/carousel',
      queryParams: {
        carouselIds: ''
      }
    },
    nrgl_getCarouselDetail: {          //  GET  查询单个轮播图详细信息
      url: 'cms/carousel/{{carouselId}}'
    },
    nrgl_saveCarouselDetail: {          //  PATCH 修改轮播图
      url: 'cms/carousel/{{carouselId}}',
      queryParams: {
        name: '',
        code: ''
      }
    },
    nrgl_getCarouselPictures: {          //  GET  查询单个轮播图所有图片
      url: 'cms/carousel/{{carouselId}}/picture'
    },
    nrgl_getCarouselPictureDetails: {          //  GET 查询图片详情
      url: 'cms/carousel/picture/{{pictureId}}'
    },
    nrgl_addCarouselPictures: {          //  POST 保存图片
      url: 'cms/carousel/{{carouselId}}/picture',
      queryParams: {
        pictureUrl: '',
        orderby: '',
        status: ''
      }
    },
    nrgl_saveCarouselPicture: {          //  PATCH  修改图片信息
      url: 'cms/carousel/{{carouselId}}/picture/{{pictureId}}',
      queryParams: {
        pictureUrl: '',
        orderby: '',
        status: ''
      }
    },
    nrgl_deleteCarouselPicture: {         //  DELETE  删除轮播图图片(多个以","分割)
      url: 'cms/carousel/{{carouselId}}/picture',
      queryParams: {
        pictureIds: ''
      }
    },
    
    //  信息发布-内容分类
    xxfb_category: {        //  GET 获取内容分类树
      url: 'cms/contentTypes'
    },
    xxfb_addCategory: {     //  POST  增加分类
      url: 'cms/contentType',
      queryParams: {
        name: '',
        code: '',
        parentId: ''
      }
    },
    xxfb_deleteCategory: {   // DELETE  删除分类
      url: 'cms/contentType',
      queryParams: {
        contentTypeId: ''
      }
    },
    xxfb_getCategoryDetail: {   //  GET 获取分类详情
      url: 'cms/contentType/{{contentTypeId}}',
      queryParams: {
        currentPage: '',
        pageSize: ''
      }
    },
    xxfb_saveCategoryDetail: {   //  PATCH 修改分类详情
      url: 'cms/contentType/{{contentTypeId}}',
      queryParams: {
        name: '',
        code: '',
        isNull: '' //  是否启用
      }
    },
    
    //  信息发布-内容标签
    xxfb_tag: {        //  GET 获取内容标签树
      url: 'cms/contentLables'
    },
    xxfb_addTag: {     //  POST  增加标签
      url: 'cms/contentLable',
      queryParams: {
        name: '',
        code: ''
      }
    },
    xxfb_deleteTag: {   // DELETE  删除标签
      url: 'cms/contentLable',
      queryParams: {
        contentLableIds: ''
      }
    },
    xxfb_getTagDetail: {   //  GET 获取标签详情
      url: 'cms/contentLable/{{contentLableId}}'
    },
    xxfb_saveTagDetail: {   //  PATCH 修改标签详情
      url: 'cms/contentLable/{{contentLableId}}',
      queryParams: {
        name: '',
        code: ''
      }
    },
    
    //  信息发布-内容发布
    xxfb_publish: {         //  GET
      url: 'cms/contents',
      queryParams: {
        currentPage: '',
        pageSize: '',
        name: '',
        importantType: '',
        contentTypeId: '',
        contentLableIds: '',
        orgIds: '',
        status: '',
        messageType: ''
      }
    },
    xxfb_getPublishDetail: {  //  GET 查询单个内容详细信息
      url: 'cms/content/{{contentId}}'
    },
    xxfb_addPublish: {        //  POST 新增内容
      url: 'cms/content',
      queryParams: {
        title: '',
        subTitle: '',
        thumbnail: '',
        subContent: '',
        origin: '',
        contentBody: '',
        importantType: '',
        status: '',
        cmsContentAttachment: '',
        cmsContentTypeId: '',
        cmsContentLableIds: '',
        cmsOrgIds: ''
      }
    },
    xxfb_deletePublish: {       //  DELETE 删除单个内容
      url: 'cms/content',
      queryParams: {
        contentIds: ''
      }
    },
    xxfb_savePublishDetail: {   //  PATCH 修改内容
      url: 'cms/content/{{contentId}}',
      queryParams: {
        title: '',
        subTitle: '',
        thumbnail: '',
        subContent: '',
        origin: '',
        contentBody: '',
        importantType: '',
        status: '',
        cmsContentAttachment: '',
        cmsContentTypeId: '',
        cmsContentLableIds: '',
        cmsOrgIds: ''
      }
    },
    xxfb_uploadFile: {      //  POST  文件上传
      url: 'cms/upload',
      queryParams: {
        file: ''
      }
    },
    xxfb_uploadFiles: {                   //  POST  文件上传多个
      url: 'cms/uploads',
      queryParams: {
        file: ''
      }
    },
    xxfb_changePubStatus: {               //  PATCH 修改内容发布状态(可多个,逗号分隔)
      url: 'cms/content/status',
      queryParams: {
        contentIds: '',
        status: ''
      }
    },
    nrgl_publish_bookChapters: {          //  GET 查询章节树 contentId 图书id(即内容id)
      url: 'cms/bookChapters/{{contentId}}'
    },
    nrgl_publish_addBookChapter: {        //  POST  新增章节
      url: 'cms/bookChapter/{{contentId}}',
      queryParams: {
        name: '',
        number: '',
        orderby: '',
        parentId: '',
      }
    },
    nrgl_publish_deleteBookChapter: {     //  DELETE 删除单个章节
      url: 'cms/bookChapter',
      queryParams: {
        bookChapterId: '',
      }
    },
    nrgl_publish_saveBookChapter: {             //  PATCH   修改章节, (name,number 必填)
      url: 'cms/bookChapter/{{bookChapterId}}',
      queryParams: {
        name: '',
        number: '',
        orderby: '',
        parentId: '',
      }
    },
    nrgl_publish_bookChapterDetail: {           //  GET 查询单个章节详细信息
      url: 'cms/bookChapter/{{bookChapterId}}'
    },
    nrgl_publish_getBookContentDetail: {       //  GET 查询单个内容详细信息
      url: 'cms/bookChapterBody/{{bookChapterBodyId}}'
    },
    nrgl_publish_addPookChapterContent: {       //  POST  存章节的内容信息
      url: 'cms/bookChapterBody/{{bookChapterId}}',
      queryParams: {
        name: '',
        number: '',
        content: '',
      }
    },
    nrgl_publish_saveBookChapterContent: {      //  PATCH 修改章节的内容信息
      url: 'cms/bookChapterBody/{{bookChapterBodyId}}',
      queryParams: {
        name: '',
        number: '',
        content: '',
      }
    },
    nrgl_publish_deleteBookChapterContent: {      //  DELETE  删除章节的内容信息
      url: 'cms/bookChapterBody',
      queryParams: {
        bookChapterBodyIds: '',
      }
    },
    
    //  内容管理-傲度分类
    nrgl_alldoPublish: {            //  GET 查询内容列表（只显示傲度分类的内容）
      url: 'cms/contents/alldoType',
      queryParams: {
        currentPage: '',
        pageSize: '',
        name: '',
        contentTypeId: '',
        contentLableIds: ''
      }
    },
    nrgl_saveAlldoPublishTag: {            //  PATCH 傲度分类打标签
      url: 'cms/content/alldoType',
      queryParams: {
        contentIds: '',
        contentLableIds: ''
      }
    },
    
    //  内容管理-审核配置
    nrgl_reviews: {                         //  GET 查询审核条件列表
      url: 'cms/reviews',
      queryParams: {
        currentPage: '',
        pageSize: '',
        contentTypeId: '',
        contentLableId: '',
      }
    },
    nrgl_addReview: {                       //  POST  新增审核列表
      url: 'cms/review',
      queryParams: {
        cmsContentTypeId: '',
        cmsContentLableIds: '',
      }
    },
    nrgl_deleteReviews: {                    //  DELETE  删除审核
      url: 'cms/review',
      queryParams: {
        reviewIds: '',
      }
    },
    nrgl_getReviewDetail: {                 //  GET 查询单个审核详细信息
      url: 'cms/review/{{reviewId}}'
    },
    nrgl_saveReviewDetail: {                //  PATCH   修改审核列表
      url: 'cms/review/{{reviewId}}',
      queryParams: {
        cmsContentTypeId: '',
        cmsContentLableIds: '',
      }
    },
    
    //  应用管理-应用管理
    yygl_apps: {        //  GET 获取应用管理-应用管理
      url: 'cms/apps',
      queryParams: {
        currentPage: '',
        pageSize: '',
        name: '',
        type: ''
      }
    },
    yygl_getAppDetail: {  //  GET 查询单个应用内容
      url: 'cms/app/{{appId}}'
    },
    yygl_addApp: {      //  POST 新增应用管理
      url: 'cms/app'
    },
    yygl_deleteApp: {       //  DELETE 删除应用
      url: 'cms/app',
      queryParams: {
        appIds: ''
      }
    },
    yygl_saveAppDetail: {       //  PATCH 修改应用管理
      url: 'cms/app/{{appId}}'
    },
    
    //  应用管理-栏目管理
    yygl_columns: {         //  GET 获取栏目树
      url: 'cms/grids'
    },
    yygl_addColumn: {         //  POST 新增栏目
      url: 'cms/grid',
      queryParams: {
        name: '',
        code: '',
        cmsContentTypeList: [],
        cmsContentLableList: [],
        cmsAppList: [],
        smallImg: '',       //  小图
        bigImg: '',
        orderby: ''
      }
    },
    yygl_deleteColumn: {         //  DELETE  删除栏目
      url: 'cms/grid',
      queryParams: {
        gridId: ''
      }
    },
    yygl_getColumnDetail: {         //  GET  查询栏目详情
      url: 'cms/grid/{{gridId}}'
    },
    yygl_saveColumnDetail: {         //  PATCH  保存栏目详情
      url: 'cms/grid/{{gridId}}',
      queryParams: {
        name: '',
        code: '',
        cmsContentTypeList: [],
        cmsContentLableList: [],
        cmsAppList: [],
        smallImg: '',       //  小图
        bigImg: '',
        orderby: ''
      }
    },
    
    //  投教运营工具-题库标签管理
    yygj_tags: {         //  GET  查询所有题库标签
      url: 'question/label'
    },
    yygj_addTag: {         //  POST 新增标签
      url: 'question/label',
      queryParams: {
        code: '',
        id: '',
        name: '',
        remark: ''
      }
    },
    yygj_deleteTag: {         //  DELETE 删除标签
      url: 'question/label',
      queryParams: {
        labelIds: ''
      }
    },
    yygj_getTagDetail: {         //  GET 获取标签详情
      url: 'question/label/{{labelId}}'
    },
    yygj_saveTagDetail: {         //  PATCH 修改标签详情
      url: 'question/label/{{labelId}}'
    },
    yygj_getTagQusetionBank: {        //  GET 根据id查询标签下的题目列表
      url: 'question/questionBankLabel/{{labelId}}'
    },
    
    //  投教运营工具-投教题库管理
    yygj_questionBank: {         //  GET  查询所有投教题库
      url: 'question/questionBank',
      queryParams: {
        currentPage: '',
        pageSize: '',
        title: '',
        type: '',
        ids: ''
      }
    },
    tkgl_addQuestionBank: {                 //  POST 新增题库
      url: 'question/question',
      queryParams: {
        answerDTOS: '',
        quesStem: '',
        mediaName: '',
        gradeNumb: '',
        typeNumb: '',
        labelIds: ''
      }
    },
    tkgl_deleteQuestionBank: {              //  DELETE 删除题库
      url: 'question/question',
      queryParams: {
        questionIds: ''
      }
    },
    yygj_getQuestionBankDetail: {         //  GET 查询投教题库详情
      url: 'question/questionBank/{{questionId}}'
    },
    yygj_saveQuestionBankDetail: {         //  POST 修改投教题库详情  PATCH /question/question
      // url: 'question/questionBank/{{questionId}}'
      url: 'question/question',
      queryParams: {
        answerDTOS: '',
        quesStem: '',
        mediaName: '',
        gradeNumb: '',
        typeNumb: '',
        labelIds: ''
      }
    },
    tkgl_saveQuestionBankTag: {         //  POST 批量修改标签
      url: 'question/questionBank',
      queryParams: {
        title: '',
        type: '',
        questionIds: '',
        labelIds: ''
      }
    },
    
    //  投教运营工具-题库应用管理
    yygj_application: {         //  GET 查询所有题库应用
      url: 'question/questionClass'
    },
    yygj_addApplication: {         // POST 新增题库应用
      url: 'question/questionClass',
      queryParams: {
        name: '',
        content: '',
        remark: '',
        questionClassLabelRuleDTOList: ''
      }
    },
    yygj_deleteApplication: {         // DELETE 删除应用
      url: 'question/questionClass',
      queryParams: {
        classIds: ''
      }
    },
    yygj_getApplicationDetail: {         // GET 查询题库应用
      url: 'question/questionClass/{{classId}}'
    },
    yygj_saveApplicationDetail: {         //  POST 修改题库应用
      url: 'question/questionClass/{{classId}}',
      queryParams: {
        name: '',
        content: '',
        remark: '',
        questionClassLabelRuleDTOList: ''
      }
    },
    yygj_getQuestionBankByApplication: {  //  GET 根据id查询题库应用下的题目列表
      url: 'question/questionBankClass/{{classId}}'
    },
    yygj_getTagsTotal: {                  //  GET  查询所有题库标签对应的题目数量
      url: 'question/labelQuestionNum'
    },
    
    //  投教题库管理-答题结果
    tkgl_questionResults: {               //  GET 查询答题汇总表
      url: 'question/findQuestionCollectionResult',
      queryParams: {
        currentPage: '',
        pageSize: '',
      }
    },
    tkgl_getQuestionResultDetail: {         //  GET 根据汇总表ID查询答题结果明细
      url: 'question/findQuestionSubsetById',
      queryParams: {
        collectionId: ''
      }
    },
    
    //  投教运营工具-小游戏管理
    yygj_game: {              //  GET 查询所有游戏应用
      url: 'question/gameClass'
    },
    yygj_addGame: {           // POST   新增题库应用
      url: 'question/gameClass',
      queryParams: {
        name: '',
        code: '',
        extend: '',
        classIds: ''
      }
    },
    yygj_deleteGame: {         // DELETE  根删除游戏应用
      url: 'question/gameClass',
      queryParams: {
        gameIds: ''
      }
    },
    yygj_getGameDetail: {         // GET  查询游戏应用
      url: 'question/gameClass/{{gameId}}'
    },
    yygj_saveGameDetail: {         //  PATCH  修改游戏应用
      url: 'question/gameClass/{{gameId}}',
      queryParams: {
        name: '',
        code: '',
        extend: '',
        classIds: ''
      }
    },
    
    //  用户管理
    yhgl_userList: {              //  GET 查询用户列表
      url: 'user/users',
      queryParams: {
        currentPage: '',
        pageSize: '',
        name: '',
        phone: ''
      }
    },
    yhgl_pointList: {              //  GET 查询用户积分列表
      url: 'user/points',
      queryParams: {
        currentPage: '',
        pageSize: ''
      }
    },
    yhgl_pointLogs: {              //  GET 查询用户积分流水
      url: 'user/point/logs',
      queryParams: {
        currentPage: '',
        pageSize: ''
      }
    },
    yhgl_pointLogs_single: {       //  GET 查询单个用户积分流水
      url: 'user/point/logs',
      queryParams: {
        currentPage: '',
        pageSize: '',
        searchUserId: ''
      }
    },
    yhgl_logs: {              //  GET 查询用户行为流水
      url: 'user/logs',
      queryParams: {
        currentPage: '',
        pageSize: ''
      }
    },
    
    // 积分管理
    // 积分等级定义
    jfgl_point_levels: {              //  GET 查询积分等级定义列表
      url: 'point/levels',
      queryParams: {
        currentPage: '',
        pageSize: '',
        ruleGroup: ''  //规则分组
      }
    },
    jfgl_pointLevel_detail: {         //  GET  查询单个积分等级详情
      url: 'point/level/{{pointLevelId}}'
    },
    jfgl_pointLevel_delete: {         // DELETE  删除积分等级
      url: 'point/level',
      queryParams: {
        pointLevelIds: ''
      }
    },
    jfgl_pointLevel_edit: {         //  PATCH  编辑积分等级
      url: 'point/level/{{pointLevelId}}',
      queryParams: {
        name: '',
        pointDown: '',  //积分下限
        pointUp: '',  //积分上限
        ruleGroup: ''   //规则分组，不能为空
      }
    },
    jfgl_pointLevel_add: {         //  POST  新增积分等级
      url: 'point/level',
      queryParams: {
        name: '',
        pointDown: '',  //积分下限
        pointUp: '',  //积分上限
        ruleGroup: ''   //规则分组，不能为空
      }
    },
    
    // 积分规则定义
    jfgl_point_rules: {              //  GET 查询积分规则定义列表
      url: 'point/rules',
      queryParams: {
        currentPage: '',
        pageSize: '',
        code: '',  //规则编码
        name: '',  //规则名称
        ruleGroup: ''  //规则分组
      }
    },
    jfgl_pointRule_detail: {         //  GET  查询单个积分规则详情
      url: 'point/rule/{{id}}'
    },
    jfgl_pointRule_delete: {         // DELETE  删除积分规则
      url: 'point/rule',
      queryParams: {
        ruleIds: ''
      }
    },
    jfgl_pointRule_edit: {         //  PATCH  编辑积分规则
      url: 'point/rule/{{ruleId}}',
      queryParams: {
        name: '',   // 规则名称，不能为空
        code: '',  // 规则编码，不能为空
        point: '',  // 积分值，单次积分上限，0：表示没有上限，不能为空
        dayLimit: '',   // 日累计积分值上限，0：表示没有上限，不能为空
        monthLimit: '',   // 月累计积分值上限，0：表示没有上限，不能为空
        remarks: '',
        ruleBeginTime: '',   // 积分规则开始时间
        ruleEndTime: '',   // 积分规则结束时间
        ruleGroup: '',   // 规则分组，不能为空
        ruleTypeIndex: '',   // 规则类型，0：消费，1：发放，不能为空
        status: '',   // 规则状态，0停用,1启用，不能为空
        totalLimit: '',  // 总累计积分值上限，0：表示没有上限，不能为空
        validDays: ''   // 有效天数，计流水时计算积分有效时长，0表示永久有效，不能为空
      }
    },
    jfgl_pointRule_add: {         //  POST  新增积分规则
      url: 'point/rule',
      queryParams: {
        name: '',   // 规则名称，不能为空
        code: '',  // 规则编码，不能为空
        point: '',  // 积分值，单次积分上限，0：表示没有上限，不能为空
        dayLimit: '',   // 日累计积分值上限，0：表示没有上限，不能为空
        monthLimit: '',   // 月累计积分值上限，0：表示没有上限，不能为空
        remarks: '',
        ruleBeginTime: '',   // 积分规则开始时间
        ruleEndTime: '',   // 积分规则结束时间
        ruleGroup: '',   // 规则分组，不能为空
        ruleTypeIndex: '',   // 规则类型，0：消费，1：发放，不能为空
        status: '',   // 规则状态，0停用,1启用，不能为空
        totalLimit: '',  // 总累计积分值上限，0：表示没有上限，不能为空
        validDays: ''   // 有效天数，计流水时计算积分有效时长，0表示永久有效，不能为空
      }
    },
    
    //  投教小游戏管理
    yxgl_games: {              //  GET 查询游戏挑战记录列表
      url: 'gameEngine/games',
      queryParams: {
        curPage: '',
        pageSize: '',
        gameCode: '',
        status: ''
      }
    },
    yxgl_gameNodes: {              //  GET 查询游戏挑战节点记录列表
      url: 'gameEngine/gameNodes',
      queryParams: {
        curPage: '',
        pageSize: '',
        gameCode: '',
        gameId: ''
      }
    },
    yxgl_gameRules: {              //  GET 查询游戏相关触发规则列表
      url: 'gameEngine/gameRules',
      queryParams: {
        curPage: '',
        pageSize: '',
        gameCode: '',
        gameId: ''
      }
    },
    yxgl_gameAchieves: {              //  GET 查询游戏成就列表
      url: 'gameEngine/gameAchieves',
      queryParams: {
        curPage: '',
        pageSize: '',
        achieveCode: '',   //固定'gssg'
        userId: ''
      }
    },
    
    //  系统管理-机构用户管理
    xtgl_CommonOrgs: {                            //  GET 获取机构部门树
      url: 'common/orgs'
    },
    xtgl_addOrgDepartment: {                     //   POST  新增部门 (name,parentId 必填)
      url: 'common/org',
      queryParams: {
        name: '',
        parentId: ''
      }
    },
    xtgl_deleteOrgDepartment: {                     //   DELETE 删除部门
      url: 'common/org',
      queryParams: {
        orgId: ''
      }
    },
    xtgl_getOrgDepartmentDetail: {                     //   GET  查询单个部门信息
      url: 'common/org/{{orgId}}'
    },
    xtgl_saveOrgDepartmentDetail: {                     //   POST 修改部门 (name,parentId 必填)
      url: 'common/org/{{orgId}}',
      queryParams: {
        name: ''
        // parentId: '',
      }
    },
    xtgl_getOrgDepartmentUsers: {                       //  GET 获取部门下的用户
      url: 'common/orgUsers',
      queryParams: {
        currentPage: '',
        pageSize: '',
        name: '',
        depId: ''
      }
    },
    xtgl_addOrgDepartmentUser: {                       //  POST 部门下新增用户
      url: 'common/orgUser/{{orgId}}',
      queryParams: {
        name: '',
        phone: '',
        email: ''
      }
    },
    xtgl_deleteOrgDepartmentUsers: {                       // DELETE  删除部门下用户
      url: 'common/orgUser/{{orgId}}',
      queryParams: {
        userIds: ''
      }
    },
    xtgl_getUserDetail: {                       // GET 获取一个用户的详细信息
      url: 'common/user/{{userId}}'
    },
    xtgl_saveUserDetail: {                       // PATCH 部门下修改用户
      url: 'common/orgUser/{{orgId}}/{{userId}}',
      queryParams: {
        name: '',
        phone: '',
        email: ''
      }
    },
    xtgl_getUserRoles: {                       // GET  获取角色信息
      // url: 'common/roles'
      url: 'common/appRolesAll',
    },
    xtgl_userRoleSet: {                       // POST  用户绑定角色
      url: 'common/userAppRole/{{orgId}}/{{userId}}',
      queryParams: {
        roleIds: ''
      }
    },
    xtgl_userPassWord: {                       // POST 修改密码
      url: 'common/userPassWord/{{userId}}',
      queryParams: {
        oldpassword: '',
        newpassword: ''
      }
    },
    
    //  系统管理-角色管理
    xtgl_appRoles: {                    //  GET   获取角色列表
      url: 'common/appRoles',
      queryParams: {
        currentPage: '',
        pageSize: '',
        name: ''
      }
    },
    xtgl_addAppRoles: {                 //  POST  新增角色 (name,code 必填) resources逗号分隔
      url: 'common/appRole',
      queryParams: {
        name: '',
        code: '',
        resources: '',
        remark: ''
      }
    },
    xtgl_deleteAppRoles: {                 //  DELETE   删除角色 appRoleId
      url: 'common/appRole',
      queryParams: {
        appRoleIds: '',
      }
    },
    xtgl_getAppRoleDetail: {                 //  GET    查询单个角色信息
      url: 'common/appRole/{{appRoleId}}'
    },
    xtgl_saveAppRoleDetail: {                 //  POST  修改角色 (name,code 必填) resources逗号分隔
      url: 'common/appRole/{{appRoleId}}',
      queryParams: {
        name: '',
        code: '',
        resources: '',
        remark: ''
      }
    },
    xtgl_getRecsources: {                 //  GET   获取资源树
      url: 'common/recsource',
    },
    
    //  中心端控制台-更新包管理
    zxdkzt_clientApps: {                       //  GET   查询应用列表（分页）
      url: 'client/app',
      queryParams: {
        currentPage: '',
        pageSize: '',
      }
    },
    zxdkzt_clientAllApps: {                       //  GET   查询应用列表
      url: 'client/app/all'
    },
    zxdkzt_addClientApp: {                     // POST  新增客户端应用,1： 守护线程app ，2：实际应用app
      url: 'client/app',
      queryParams: {
        name: '',
        code: '',
        remark: '',
        appType: '',
        uploadFile: ''
      }
    },
    zxdkzt_deleteClientApps: {                       //  DELETE 删除应用
      url: 'client/app',
      queryParams: {
        ids: ''
      }
    },
    zxdkzt_getClientAppDetail: {                       //  GET  根据appId获取客户端应用详情
      url: 'client/app/{{appId}}'
    },
    zxdkzt_saveCtlientAppDetail: {                     // PATCH 编辑客户端应用,1： 守护线程app ，2：实际应用app
      url: 'client/app/{{appId}}',
      queryParams: {
        name: '',
        versionNo: '',
        remark: '',
        appType: '',
        uploadFile: ''
      }
    },
  
    //  中心端控制台-更新计划维护
    zxdkzt_clientTasks: {                         //  GET 查询任务列表（分页）
      url: 'client/task',
      queryParams: {
        currentPage: '',
        pageSize: '',
        taskType: ''
      }
    },
    zxdkzt_addClientTask: {                       //  POST 新增应用任务  字段需确认
      url: 'client/task',
      queryParams: {
        taskType: '',
        objectId: '',
        name: '',
        isAppointDepartment: '',
        remark: '',
        isForce: '',
        isUp: '',
        departmentIds: '',
        overdueTime: '',
        excuteTime: '',
        allotInterval: '',
        retryNum: '',
      }
    },
    zxdkzt_deleteClientTask: {                    //  DELETE  删除应用任务
      url: 'client/task',
      queryParams: {
        ids: '',
      }
    },
    zxdkzt_getClientTaskDetail: {                 //  GET  查询应用任务详情
      url: 'client/task/{{taskId}}',
    },
    zxdkzt_saveClientTaskDetail: {                //  PATCH 编辑应用任务
      url: 'client/task',
    },
    zxdkzt_getClientLog: {                        //  GET 查询应用任务详情
      url: 'client/log/{{taskId}}',
      queryParams: {
        currentPage: '',
        pageSize: '',
      }
    },
    zxdkzt_getCtlientDepartment: {                // GET  客户端部门列表（树结构）
      url: 'client/department/tree'
    },
    zxdkzt_disableTask: {                         //  PATCH  禁用应用任务
      url: 'client/task/disable/{{taskId}}'
    },
    zxdkzt_enableTask: {                          //  PATCH   启用应用任务
      url: 'client/task/enable/{{taskId}}'
    },
		
		//  中心端控制台-更新日志报表
		zxdkzt_updateLog: {                      //  GET 查询更新日志报表列表（分页）
			url: 'client/tasklog',
			queryParams: {
				currentPage: '',
				pageSize: '',
        departmentId: '',
        taskType: ''            //  1：更新日志报表；2：指令执行日志报表
			}
		},
    
    //  中心端控制台-指令集管理
    zxdkzt_clientCommands: {                      //  GET 查询客户端命令列表（分页）
      url: 'client/command',
      queryParams: {
        currentPage: '',
        pageSize: ''
      }
    },
    zxdkzt_clientAllCommands: {                   //  GET 查询客户端命令列表（所有）
      url: 'client/command/all'
    },
    zxdkzt_addClientCommand: {                    //  POST  新增客户端命令
      url: 'client/command',
      queryParams: {
        name: '',
        code: '',
        remark: '',
      }
    },
    zxdkzt_deleteClientCommands: {                //  DELETE  删除客户端命令
      url: 'client/command',
      queryParams: {
        ids: '',
      }
    },
    zxdkzt_getClientCommandDetail: {              //  GET 根据commandId获取指令详情
      url: 'client/command/{{commandId}}'
    },
    zxdkzt_saveCtlientCommandDetail: {            // PATCH  修改客户端命令
      url: 'client/command/{{id}}',
      queryParams: {
        name: '',
        code: '',
        remark: '',
      }
    },
    
    //  中心端控制台-指令执行计划维护
    zxdkzt_clientCommandTasks: {                  //  GET 查询客户端命令任务列表（分页）
      url: 'client/task',
      queryParams: {
        currentPage: '',
        pageSize: '',
        taskType: ''
      }
    },
    zxdkzt_addClientCommandTask: {                //  POST 新增指令任务
      url: 'client/task',
      queryParams: {
        taskType: '',
        objectId: '',
        name: '',
        isAppointDepartment: '',
        remark: '',
        isForce: '',
        isUp: '',
        departmentIds: '',
        overdueTime: '',
        excuteTime: '',
        allotInterval: '',
        retryNum: '',
      }
    },
    zxdkzt_deleteClientCommandTask: {             //  DELETE  删除客户端命令任务
      url: 'client/command/task',
      queryParams: {
        ids: '',
      }
    },
    zxdkzt_getClientCommandTaskDetail: {          //  GET  根据taskId获取指令任务详情
      url: 'client/command/task/{{taskId}}',
    },
    zxdkzt_saveClientCommandTaskDetail: {         //  PATCH 编辑指令任务
      url: 'client/command/task',
    },
    zxdkzt_getClientCommandLog: {                 //  GET   查询客户端命令任务日志列表（分页）
      url: 'client/command/task/log/{{taskId}}',
      queryParams: {
        currentPage: '',
        pageSize: '',
      }
    },
    zxdkzt_CommandTaskChange: {                         //  Post  禁用应用任务
      url: 'client/task/{{taskId}}/status',
      queryParams: {
        status: ''
      }
    },
		
		//  中心端控制台-指令执行日志报表
		zxdkzt_instructionLog: {                      //  GET 查询指令执行日志报表列表（分页）
			url: 'client/command/task/log/all',
			queryParams: {
				currentPage: '',
				pageSize: ''
			}
		},
    zxdkzt_messages: {                                //  GET 留言查询
      url: 'cms/findMessageResult',
      queryParams: {
        currentPage: '',
        pageSize: ''
      }
    },
    zxdkzt_signInLists: {                             //  GET 签到查询
      url: 'cms/findSignResult',
      queryParams: {
        currentPage: '',
        pageSize: ''
      }
    },
    
    //  营业部管理-营业部员工登记
    yybgl_staffs: {                               //  GET 查询登记用户列表
      url: 'cms/staffs',
      queryParams: {
        currentPage: '',
        pageSize: '',
        name: '',
        depId: '',
      }
    },
    yybgl_addStaff: {                             //  POST  新增登记用户列表
      url: 'cms/staff',
      queryParams: {
        name: '',
        phone: '',
        email: '',
        photo: '',
        position: '',
        remark: '',
        depId: '',
      }
    },
    yybgl_deleteStaffs: {                         //  DELETE 删除登记用户
      url: 'cms/staff',
      queryParams: {
        staffIds: ''
      }
    },
    yybgl_getStaffDetail: {                         //  GET 查询单个登记用户列表详细信息
      url: 'cms/staff/{{staffId}}'
    },
    yybgl_saveStaffDetail: {                         //  PATCH 修改登记用户列表, name,必填
      url: 'cms/staff/{{staffId}}',
      queryParams: {
        name: '',
        phone: '',
        email: '',
        photo: '',
        position: '',
        remark: '',
        depId: '',
      }
    },
    
    //  营业部管理-液晶屏登记
    yybgl_screens: {                                 //  GET 查询登记屏幕列表
      url: 'cms/equipments',
      queryParams: {
        currentPage: '',
        pageSize: '',
        name: '',
        type: '',
        depId: '',
      }
    },
    yybgl_addScreen: {                              //  POST  新增登记屏幕列表 (name,code,type,depId(营业部id) )括号中的都必填
      url: 'cms/equipment',
      queryParams: {
        name: '',
        code: '',
        type: '',
        remark: '',
        depId: '',
      }
    },
    yybgl_deleteScreens: {                          //  DELETE 删除登记屏幕
      url: 'cms/equipment',
      queryParams: {
        equipmentIds: ''
      }
    },
    yybgl_getScreenDetail: {                        //  GET 查询单个登记屏幕列表详细信息
      url: 'cms/equipment/{{equipmentId}}'
    },
    yybgl_saveScreenDetail: {                       //  PATCH 修改登记屏幕列表, (name,code,type )括号中的都必填
      url: 'cms/equipment/{{equipmentId}}',
      queryParams: {
        name: '',
        code: '',
        type: '',
        remark: '',
      }
    },
    
    //  营业部管理-场地登记
    yybgl_places: {                                 //  GET 查询登记场地列表
      url: 'cms/places',
      queryParams: {
        currentPage: '',
        pageSize: '',
        name: '',
        type: '',
        depId: '',
      }
    },
    yybgl_addPlace: {                              //  POST  新增登记场地列表  (name,code,type,depId(营业部id) )括号中的都必填
      url: 'cms/place',
      queryParams: {
        name: '',
        code: '',
        type: '',
        remark: '',
        depId: '',
        isMust: '',
        content: '',
        picture: '',
        audio: '',
      }
    },
    yybgl_deletePlaces: {                          //  DELETE 删除登记场地
      url: 'cms/place',
      queryParams: {
        placeIds: ''
      }
    },
    yybgl_getPlaceDetail: {                        //  GET 查询单个登记场地列表详细信息
      url: 'cms/place/{{placeId}}'
    },
    yybgl_savePlaceDetail: {                       //  PATCH 修改登记场地列表, (name,code,type )括号中的都必填
      url: 'cms/place/{{placeId}}',
      queryParams: {
        name: '',
        code: '',
        type: '',
        remark: '',
        isMust: '',
        content: '',
        picture: '',
        audio: '',
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
  
  apisMain.extend(api.id, api);
  
  return api;
}));
