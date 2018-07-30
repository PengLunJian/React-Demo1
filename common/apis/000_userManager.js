;(function webpackUniversalModuleDefinition(root, factory) {
  
  // 兼容不同的模块化规范
  
  // CommonJS ?
  if (typeof exports === 'object' && typeof module === 'object')
    module.exports = factory(require('./apisMain.js'));
  // AMD
  else if (typeof define === 'function' && define.amd)
    define('000_userManager', ['apisMain'], factory);
  // ES6 ?
  else if (typeof exports === 'object')
    exports['000_userManager'] = factory(require('./apisMain.js'));
  else
  // 暴露给window
    root['000_userManager'] = factory(root['apisMain']);
  
}(this, function (apisMain) {
  
  if (!apisMain || !apisMain.apisMain) {
    throw new Error('请先加载apisMain模块!');
  }
  
  var getQueryString = apisMain.getQueryString;
  
  var userManager = {
    id: 'userManager',
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
      timeout: 10000
    },
    baseURL: '/api/fof/api/common/',
    
    login: {                //  用户登录
      getComponentURL: function () {
        return '/api/fof/login';
      }
    },
    emailValidate: {  //  发送邮件
      getComponentURL: function () {
        return 'userInfo/emailValidate';
      }
    },
    codeValidate: {   //  邮件验证码验证
      queryParams: {
        email: '',
        code: ''
      },
      getComponentURL: function (params) {
        return 'userInfo/codeValidate' + getQueryString(params, this.queryParams);
      }
    },
    register: {   //  注册
      getComponentURL: function () {
        return 'userInfo/register';
      }
    },
    
    inviteSearch: {   //  用户邀请列表
      queryParams: {
        currentPage: '',
        pageSize: '',
        key: ''
      },
      getComponentURL: function (params) {
        return 'invite/search' + getQueryString(params, this.queryParams);
      }
    },
    setInviteStatus: {   //  设置用户邀请状态
      inviteId: '',
      type: '', //  1:同意；2:拒绝
      getComponentURL: function (params) {
        return 'invite/setInviteStatus/' + params.inviteId + '/' + params.type;
      }
    },
    
    getURL: function (id, params) {
      if (this[id].isMock) {
        return this.baseURL + id;
      }
      
      return (id === 'login' ? '' : this.baseURL) + this[id].getComponentURL(params);
    }
  };
  
  apisMain.extend('userManager', userManager);
}));
