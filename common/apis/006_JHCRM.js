;(function webpackUniversalModuleDefinition(root, factory) {
  
  // 兼容不同的模块化规范
  
  // CommonJS ?
  if (typeof exports === 'object' && typeof module === 'object')
    module.exports = factory(require('./apisMain.js'));
  // AMD
  else if (typeof define === 'function' && define.amd)
    define('006_JHCRM', ['apisMain'], factory);
  // ES6 ?
  else if (typeof exports === 'object')
    exports['006_JHCRM'] = factory(require('./apisMain.js'));
  else
  // 暴露给window
    root['006_JHCRM'] = factory(root['apisMain']);
  
}(this, function (apisMain) {
  
  if (!apisMain || !apisMain.apisMain) {
    throw new Error('请先加载apisMain模块!');
  }
  
  var getQueryString = apisMain.getQueryString;
  var parseURL = apisMain.parseURL;
  
  var api = {
    id: 'JHCRM',
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
    baseURL: '/api/crm/',
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
    personalInfo: {     //  登录用户的信息（当前只取客户名称显示使用）
      url: 'userInfo/personalInfo'
    },
    //  微信签名
    WX_Signature: {     //  get
                        //  url: 当前网页的URL，location.href.split(‘#’)[0]；包括’http(s)://‘部分，以及’？’后面的GET参数部分,但不包括’#’hash后面的部分
      queryParams: {
        url: ''   //
      },
      url: 'wechat/getWechatTicket'
    },
    
    //  数据字典
    dictionary_search: {
      url: 'dataDictionary/search',
      queryParams: {
        type: ''                  // 1:客户性质；2：客户类型；3：行业分类
      }
    },
    
    //  客户
    customer_search: {  //  客户查询列表
      url: 'customer/search',
      queryParams: {
        currentPage: '',
        pageSize: '',
        customerNature: '',
        key: '',                  //  关键字
        start: '',
        end: '',
				userId: ''
      }
    },
    customer_saveCustomer: {  //  新增客户
      url: 'customer/saveCustomer',
      queryParams: {
        customerNum: '',          //  客户编号
        fullName: '',             //  客户全称
        abbreviationName: '',     //  客户简称
        openAccountDate: '',      //  开户时间
        address: '',              //  所在地点
        introducer: '',           //  介绍人
        customerNature: '',       //  客户性质
        customerType: '',         //  客户类型
        industryType: '',         //  行业分类
        keyEvent: '',             //  关键事件，增加时赋值
        remarks: '',              //  备注
        firstIncomeDate: '',      //  第一次入款时间
        contactsId: ''           //  联系人
      }
    },
    customer_deleteCustomer: {    //  删除客户
      url: 'customer/deleteCustomer/{{customerId}}'
    },
    customer_searchDetails: {     //  客户详情
      url: 'customer/searchDetails/{{customerId}}'
    },
    customer_allCustomer: {   //  查询所有客户
      url: 'customer/searchAllCustomer'
    },
    customer_searchForPC: {  //  客户查询列表-PC
      url: 'customer/searchForPC',
      queryParams: {
        currentPage: '',
        pageSize: '',
        customerNature: '',
        introducer: '',
        // remarks: '',
        address: '',
        customerName: ''
      }
    },
    customer_editNum: {     //  PATCH PC端修改客户编号
      url: 'customer/{{id}}',
      queryParams: {
        customerNum: '',          //  客户编号
      }
    },
    
    // 客户详情--拜访记录
    visitRecord_userInfoUsers: {
      url: 'userInfo/users'
    },
    visitRecord_productGetProducts: {
      url: 'productInfo/search/all'
    },
    visitRecord_searchAllContacts: {
      url: 'contacts/searchAllContacts',
      queryParams: {
        contactsType: '',
        typeId: ''
      }
    },
    visitRecord_dictionarySearch: {
      url: 'dataDictionary/search',
      queryParams: {
        type: ''
      }
    },
    visitRecord_saveVisitRecord: {    //  删除拜访记录
      url: 'visitRecord/saveVisitRecord',
      queryParams: {
        visitRecordId: '',
        state: '',
        subject: '',
        address: '',
        type: 1,
        visitDate: '',
        contactsId: '',
        visitType: '',
        content: '',
        image: '',
        typeId: '',
        accompanyPeopleId: '',
        productInfoId: ''
      }
    },
    visitRecord_visitRecordSearch: {    //  查询拜访记录
      url: 'visitRecord/search',
      queryParams: {
        currentPage: '',
        pageSize: '',
        type: '',
        typeId: '',
        name: ''
      }
    },
    visitRecord_deleteVisitRecord: {
      url: 'visitRecord/deleteVisitRecord/{{visitRecordId}}'
    },
    visitRecord_searchDetails: {
      url: 'visitRecord/serrchDetails/{{visitRecordId}}'
    },
    
    visitRecord_visitRecordUploadPhones: {
      url: 'visitRecord/uploadPhotos',
      queryParams: {
        ids: ''
      }
    },
    visitRecord_visitRecordSearch_PC: {    //  查询拜访记录-PC
      url: 'visitRecord/searchPC',
      queryParams: {
        currentPage: '',
        pageSize: '',
        name: '',
        type: '',  // 客户/渠道
        status: '',  // 潜在/事实
        startDate: '',  //提交时间
        endDate: ''  //拜访时间
      }
    },

    //联系人列表
    contacts_search: {
      url: 'contacts/search',
      queryParams: {
        name: '',                  //  搜索关键字
        currentPage: 1,
        pageSize: 5,
        contactsType: '',
        typeId: ''
      }
    },
    contacts_saveContact: {  //  新增联系人
      url: 'contacts/saveContact',
      queryParams: {
        contactsId: '',
        zhName: '',         //  中文名字，必填
        sex: 0,             //  性别
        enName: '',         //  英文名字
        birthday: '',       //  生日
        family: '',         //  家庭
        education: '',      //  教育背景
        department: '',     //  部门
        position: '',       //  职位
        phones: '',         //  电话，可多条
        emails: '',         //  邮箱，可多条
        postCode: '',       //  邮编
        fax: '',            //  传真
        contactsType: 0,    //  所属客户/渠道，必填
        typeIds: '',        //  所属客户或渠道的所有id,只能选一个
        remarks: ''        //  备注
      }
    },
    contacts_deleteContacts: {  //  删除联系人
      url: 'contacts/deleteContact/{{contactsId}}'
    },
    contacts_searchDetails: {     //  联系人详情
      url: 'contacts/searchDetails/{{contactsId}}'
    },
    contacts_searchForPC: {     //  PC获取联系人列表
      url: 'contacts/searchForPC',
      queryParams: {
        name: '',                  //  搜索关键字
        currentPage: 1,
        pageSize: 5,
        phone: '',
        position: ''
      }
    },
    
    //渠道
    channel_search: {  //  渠道查询列表
      url: 'channel/search',
      queryParams: {
        currentPage: '',
        pageSize: '',
        channelNature: '',
				code: '',   // 渠道编码
        key: ''    //  关键字
      }
    },
    channel_search_PC: {  //  渠道查询列表-PC
      url: 'channel/searchForPC',
      queryParams: {
        currentPage: '',
        pageSize: '',
        channelNature: '',
        channelName: '',  //渠道名称
        // remarks: ''  //搜索关键字
      }
    },
    channel_deleteChannel: {  //  删除渠道
      url: 'channel/deleteChannel/{{channelId}}'
    },
    channel_saveChannel: {  //  添加/修改渠道
      url: 'channel/saveChannel',
      queryParams: {
        channelId: '',
        parentId: '',   //父渠道id
        channelNum: '',   //渠道编号
        fullName: '',   //全名
        abbreviationName: '',  //简称
        channelNature: '',   //性质
        remarks: '',  //备注
        state: ''  //状态 0草稿 1已提交
      }
    },
    channel_searchAllChannel: {  //  查询所有渠道（列表形式）
      url: 'channel/searchAllChannel'
    },
    channel_searchTreeChannel: {  //  查询所有渠道（树状形式）
      url: 'channel/searchTreeChannel'
    },
    channel_searchDetails: {  //  查询渠道详情
      url: 'channel/searchDetails/{{channelId}}'
    },
    
    //  名片管理
    card_readCard: {
      queryParams: {
        id: ''    //  微信jssdk上传成功后返回的serverId
      },
      url: 'card/readCard'
    },
    
    card_searchCard: {  //  名片查询列表-PC
      url: 'card/searchCard',
      queryParams: {
        currentPage: '',
        pageSize: '',
        name: '',   //客户名
        phone: '',  //电话
        position: '',  //职位
      }
    },
    card_deleteCard: {  //  删除名片
      url: 'card/deleteCard/{{cardId}}'
    },
    card_saveCard: {  //  添加/修改名片
      url: 'card/saveCard',
      queryParams: {
        cardImagePath: '',
        cardId: '',   //名片id
        birthday: '',   //生日
        department: '',   //部门名称
        education: '',  //教育
        emails: '',   //邮箱
        fax: '',  //传真
        phones: '',  //手机号 可多条
        position: '',   //职位
        postCode: '',  //邮编
        remarks: '',   //性质
        sex: '',  //性别
        zhName: ''  //中文名
      }
    },
    product_search: {  //  产品查询列表
      url: 'productInfo/search',
			queryParams: {
				classId: ''
			}
    },
    product_searchDetails: {     //  产品详情
      url: 'productInfo/product/{{productId}}'
    },
    product_customer_list: {     //  产品--客户列表
      url: 'product/{{productId}}/customer',
      currentPage: '',
    	pageSize: '',
    },
    product_channel_list: {     //  产品--渠道列表
      url: 'product/{{productId}}/channel',
      currentPage: '',
    	pageSize: '',
    },
    
    // 导出功能
    customer_export: {
    	url: 'customer/down',
    	customerNature: '',   //客户性质
    	address: '',   //所在地点
    	introducer: '',   //行业分类
    	remarks: '',    //备注
    	customerName: '',   //客户名称
    },
    
    // 渠道报表/产品报表/渠道里面的保有量和申购赎回列表
    channel_holdings_list: {     
      url: 'channel/report',
      queryParams:{
      	agencyNo: '',  //渠道编号
      	cdateStart: '',     //开始日期
				cdateEnd: '',     //结束日期
      	currentPage: '',  
      	pageSize: '',  
      	fundName: '',  //基金名称
      	fundCode: '',  //基金代码
      }
    },
    product_allProduct: {  //  获取所有产品
      url: 'productInfo/search/all',
    },
		
		// 数据报表-客户列表
		report_customer_list: {     
			url: 'customer/report',
			queryParams:{
				cdateStart: '',  // 开始日期
				cdateEnd: '',     // 结束日期
				currentPage: '',  
				pageSize: '',
				custNo: ''   //客户编号
			}
		},
		
		// 事实客户
		customer_search_fact: {      // 事实客户列表
			url: 'custInfo/search',
			queryParams:{
				currentPage: '',  // 开始日期
				pageSize: '',     // 结束日期
				startDate: '',  
				endDate: '',
				name: '',
				userId: ''   
			}
		},
		
		customer_searchDetails_fact: {     //  事实客户详情
			url: 'custInfo/search/{{custNo}}'
		},
		
		customer_search_fact_pc: {      // 事实客户列表-pc端
			url: 'custInfo/search/pc',
			queryParams:{
				currentPage: '',  // 开始日期
				pageSize: '',     // 结束日期
				startDate: '',  
				endDate: '',
				name: ''   
			}
		},
		
		// 事实渠道
		channel_search_fact: {      // 事实渠道列表
			url: 'channelInfo/search',
			queryParams:{
				currentPage: '',  // 开始日期
				pageSize: '',     // 结束日期
				startDate: '',  
				endDate: '',
				name: '',
				code: ''
			}
		},
		
		channel_searchDetails_fact: {     //  事实渠道详情
			url: 'channelInfo/search/{{agencyNo}}'
		},
		
		channel_search_fact_pc: {      // 事实渠道列表-pc端
			url: 'channelInfo/search/pc',
			queryParams:{
				currentPage: '',  // 开始日期
				pageSize: '',     // 结束日期
				startDate: '',  
				endDate: '',
				name: '',
				code: ''
			}
		},
		
		// 产品-pc端
		product_search_pc: {      // 产品列表-pc
			url: 'productInfo/search/pc',
			queryParams:{
				currentPage: '',  // 开始日期
				pageSize: '',     // 结束日期
				startDate: '',  
				endDate: '',
				name: '',
				code: ''
			}
		},
		
		product_editType_pc: {     //  设置产品分类-pc-patch
			url: 'productInfo/class/{{productId}}',
			queryParams:{
				classId: '',   // 分类id
			}
		},
		
		customer_allUsers_search: {     //  客户-所有用户获取
			url: 'customer/search/user'
		},
		
		customer_bindUser: {     //  PATCH PC端事实客户绑定销售经理
			url: 'custInfo/cust/user',
			queryParams: {
				custNo: '',          //  客户编号
				userIds: ''    // 分配的销售经理编号
			}
		},
		
		// 产品附件部分
		product_fileList_search: {      // 产品附件列表-pc
			url: 'productInfo/file/search',
			queryParams:{
				currentPage: '',  
				pageSize: '',    
				productId: ''
			}
		},
		product_fileList_add: {      // 产品附件列表-新增产品附件
			url: 'productInfo/file',
			queryParams:{
				productId: '',  
				fileName: '',    
				filePath: '',
				fileType: ''
			}
		},
		product_fileList_edit: {      // 产品附件列表-编辑产品附件
			url: 'productInfo/file',
			queryParams:{
				id: '',
				productId: '',  
				fileName: '',    
				filePath: '',
				fileType: ''
			}
		},
		product_fileList_delete: {  //  删除附件
			url: 'productInfo/file/{{id}}'
		},
		
		// 产品外链部分
		product_urlList_search: {      // 产品外链列表-pc
			url: 'productInfo/link/search',
			queryParams:{
				currentPage: '',  
				pageSize: '',    
				productId: ''
			}
		},
		product_urlList_add: {      // 产品外链列表-新增产品外链
			url: 'productInfo/link',
			queryParams:{
				productId: '',  
				fileName: '',    
				filePath: '',
				fileType: ''
			}
		},
		product_urlList_edit: {      // 产品外链列表-编辑产品外链
			url: 'productInfo/link',
			queryParams:{
				id: '',
				productId: '',  
				fileName: '',    
				filePath: '',
				fileType: ''
			}
		},
		product_urlList_delete: {  //  删除外链
			url: 'productInfo/link/{{id}}'
		},
		
		// 渠道-授权
		channel_setPermission_pc: {     //  渠道授权-pc-patch
			url: 'channel/authority/user',
			queryParams:{
				channelId: '',   // 渠道id
				userIds: ''      // 授权的用户id, 逗号隔开
			}
		},
		
		// 潜在产品
		product_potential_search: {      // 产品列表--潜在
			url: 'product/search/potential',
			queryParams:{
				currentPage: '',  
				pageSize: '',    
				classId: ''
			}
		},
		
		product_potential_edit: {     //  PATCH PC端未发行产品编辑
			url: 'product/potential',
			queryParams: {
				id: '',         
				zhName: '', 
				code: '',         
				establishDate: '',
				issueDate: '',         
				classId: '',
			}
		},
		
		product_potential_add: {     //  POST PC端未发行产品新增
			url: 'product/potential',
			queryParams: {        
				zhName: '', 
				code: '',         
				establishDate: '',
				issueDate: '',         
				classId: '',
			}
		},
		
		product_potential_delete: {     //  DELETE PC端未发行产品删除
			url: 'product/potential/{{productId}}'
		},
    
    getURL: function (id, params) {
      var api = this[id];
      if (api.isMock) {
        return this.baseURL + id;
      }
      return this.baseURL + parseURL(api.url, params) + getQueryString(params, api.queryParams);
    }
  };
  
  apisMain.extend('JHCRM', api);
  
  return api;
}));
