;(function webpackUniversalModuleDefinition(root, factory) {
  if (typeof exports === 'object' && typeof module === 'object')
    module.exports = factory();
  else if (typeof define === 'function' && define.amd)
    define([], factory);
  else if (typeof exports === 'object')
    exports['LoginLogic'] = factory();
  else
    root['LoginLogic'] = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  function _create(o) {
    if (Object.create) {
      return Object.create(o);
    }
    
    function F() {
    }
    
    F.prototype = o;
    return new F();
  }
  
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }
  
  function _inherit(subClass, superClass) {
    if (typeof superClass !== 'function' && superClass !== null) {
      throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
    }
    subClass.prototype = _create(superClass && superClass.prototype);
    subClass.prototype.constructor = subClass;
    // if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }
  
  var Ajax = function () {
    function Ajax(options) {
      _classCallCheck(this, Ajax);
      
      return this.init(options);
    }
    
    Ajax.prototype = {
      constructor: Ajax,
      init: function (options) {
        if (options.type === 'IE8') {
          return new Ajax_jQuery(options);
        } else {
          return new Ajax_axios(options);
        }
      }
    };
    
    return Ajax;
  }();
  
  var BaseAjax = function () {
    function BaseAjax(options) {
      _classCallCheck(this, BaseAjax);
      var type = options.type,
          library = options.library,
          api = options.api,
          authorizationKey = options.authorizationKey,
          rolesKey = options.rolesKey,
          permissionUnitsKey = options.permissionUnitsKey,
          vaildPeriod = options.vaildPeriod,
          validInterval = options.validInterval;
      
      if (!library) {
        throw new Error('请指定使用的ajax库，可选jQuery或axios!');
      }
      if (!api) {
        throw new Error('请指定需要请求的接口地址集，可选项在common/apis内! 可选项如001_superf10、002_fof');
      }
      
      this.options = {};
      this.options.type = type;
      this.options.library = library;
      this.options.api = api;
      this.options.authorizationKey = authorizationKey || 'authorization';
      this.options.rolesKey = rolesKey || 'roles';
      this.options.permissionUnitsKey = permissionUnitsKey || 'permissionUnits';
      this.options.vaildPeriod = vaildPeriod || 28 * 60 * 999;
      this.options.validInterval = validInterval || 60 * 999;
      
      this.__validTimer = null; //  检测token是否过期的定时器索引
    }
    
    BaseAjax.prototype = {
      constructor: BaseAjax,
      //  存储加密串
      setAuthorization: function (authorization) {
        var _this = this;
        var authorizationObj = {
          authorization: authorization,
          expiredTime: Date.now() + this.options.vaildPeriod
        };
        sessionStorage.setItem(_this.options.authorizationKey, JSON.stringify(authorizationObj));
        _this.checkAuthorizationIsValid();
      },
      //  获取加密串
      getAuthorization: function () {
        var _this = this;
        var authorizationObj = null;
        try {
          authorizationObj = JSON.parse(sessionStorage.getItem(_this.options.authorizationKey)) || {};
        } catch (e) {
          //  兼容之前的版本: authorizationKey只是存储的token字符串
          _this.removeAuthorization();
          _this.removeRoles();
          _this.removePermissionUnits();
          return null;
        }
        var authorization = authorizationObj.authorization;
        var expiredTime = authorizationObj.expiredTime;
        if (!_this._checkAuthorizationIsValid(expiredTime)) {          //  如果token已经过期了，就需要重新登录
          _this.removeAuthorization();
          _this.removeRoles();
          return null;
        }
        _this.checkAuthorizationIsValid();                     //  开启定时器检查token是否已过期
        return authorization;
      },
      //  移除加密串
      removeAuthorization: function () {
        var _this = this;
        sessionStorage.removeItem(_this.options.authorizationKey);
      },
      //  存储权限角色
      setRoles: function (roles) {
        var _this = this;
        sessionStorage.setItem(_this.options.rolesKey, JSON.stringify(roles));
      },
      //  获取权限角色
      getRoles: function () {
        var _this = this;
        return JSON.parse(sessionStorage.getItem(_this.options.rolesKey));
      },
      //  移除权限角色
      removeRoles: function () {
        var _this = this;
        sessionStorage.removeItem(_this.options.rolesKey);
      },
      //  存储权限单元
      setPermissionUnits: function (permissionUnits) {
        var _this = this;
        sessionStorage.setItem(_this.options.permissionUnitsKey, JSON.stringify(permissionUnits));
      },
      //  获取权限单元
      getPermissionUnits: function () {
        var _this = this;
        return JSON.parse(sessionStorage.getItem(_this.options.permissionUnitsKey));
      },
      //  移除权限单元
      removePermissionUnits: function () {
        var _this = this;
        sessionStorage.removeItem(_this.options.permissionUnitsKey);
      },
      //  验证加密串是否过期的单次判断
      _checkAuthorizationIsValid: function (expiredTime) {
        var _this = this;
        var time = Date.now();
        if (!expiredTime || time >= expiredTime) {
          return false;
        }
        return true;
      },
      //  验证加密串是否过期
      checkAuthorizationIsValid: function (expiredTime) {
        var _this = this;
        if (expiredTime) {
          return _this._checkAuthorizationIsValid(expiredTime);
        } else {
          var authorizationObj = null;
          try {
            authorizationObj = JSON.parse(sessionStorage.getItem(_this.options.authorizationKey)) || {};
          } catch (e) {
            console.error(e);
            //  兼容之前的版本: authorizationKey只是存储的token字符串
            return false;
          }
          _this.__validTimer && clearTimeout(_this.__validTimer);
          _this.__validTimer = setTimeout(function setTimeoutFn() {
            if (!_this._checkAuthorizationIsValid(authorizationObj.expiredTime)) {
              clearTimeout(_this.__validTimer);
              _this.ajaxForNewAuthorization();
            } else {
              _this.__validTimer = setTimeout(setTimeoutFn, _this.options.validInterval);
            }
          }, _this.options.validInterval);
        }
      },
      //  验证过期后执行请求获取新的token并设置请求头、开启定时器检查
      ajaxForNewAuthorization: function () {
        throw new Error('子类必须实现自己的"ajaxForNewAuthorization"方法');
      },
      //  设置请求头
      setAuthorizationHeader: function () {
        throw new Error('子类必须实现自己的"setAuthorizationHeader"方法');
      },
      //  移除请求头
      removeAuthorizationHeader: function () {
        throw new Error('子类必须实现自己的"setAuthorizationHeader"方法');
      }
    };
    
    return BaseAjax;
  }();
  
  var Ajax_axios = function (_Ajax) {
    _inherit(Ajax_axios, _Ajax);
    
    function Ajax_axios(options) {
      _classCallCheck(this, Ajax_axios);
      _Ajax.call(this, options);
      var axios = options.library;
      var api = options.api;
      this.api = api;
      this.ajax = axios.create(api.ajaxConfig);
      this.__authorizationInterceptor = null;   //  设置请求头的拦截器的索引，用于获取新的token后，清除原来的拦截器、设置新的拦截器
      this.init();
    }
    
    Ajax_axios.prototype.init = function () {
      var _this = this;
      //  解决IE 9 responseType为json时res.data是undefined的情况
      _this.ajax.interceptors.response.use(
          function (response) {
            if (response.data == null && (response.config.responseType === 'json' || response.config.responseType === '') && response.request.responseText != null) {
              try {
                // eslint-disable-next-line no-param-reassign
                response.data = JSON.parse(response.request.responseText);
              } catch (e) {
                // ignored
              }
            }
            return response;
          }
      );
      //  解决IE10下发送的中文参数不会转码导致请求失败的情况，统一编码中文字符
      _this.ajax.interceptors.request.use(
          function (config) {
            if (/.*[\u4e00-\u9fa5]+.*$/.test(config.url)) {
              config.url = encodeURI(config.url);
            }
            return config;
          },
          function (error) {
            return Promise.reject(error);
          }
      );
    };
    Ajax_axios.prototype.ajaxForNewAuthorization = function () {
      var _this = this;
      var errorTimes = 0;
      var maxErrorTimes = 3;
      //  获取新的token,存储、设置拦截器
      var ajaxFn = function () {
        _this.ajax({
               method: 'post',
               url: _this.api.getURL('refreshRestToken')
             })
             .then(function (res) {
               errorTimes = 0;
               var newAuthorization = res.headers.authorization;
               _this.setAuthorizationHeader(newAuthorization);
               _this.setAuthorization(newAuthorization);
               _this.checkAuthorizationIsValid();
             })
             .catch(function (error) {
               console.error(error);
               errorTimes++;
               if (errorTimes < maxErrorTimes) {
                 ajaxFn();
               } else {
                 console.error('获取新token已经失败' + maxErrorTimes + '次，请确认！');
               }
             });
      };
      ajaxFn();
    };
    Ajax_axios.prototype.setAuthorizationHeader = function (authorization) {
      var _this = this;
      //  设置拦截器，给请求加上authorization请求头
      _this.removeAuthorizationHeader();
      _this.__authorizationInterceptor = _this.ajax.interceptors.request.use(function (config) {
        // if (config.url.indexOf(_this.api.getURL('login')) === -1) {
        //   config.headers.authorization = authorization;
        // }
        config.headers.authorization = authorization;
        return config;
      }, function (error) {
        return Promise.reject(error);
      });
      return _this.__authorizationInterceptor;
    };
    Ajax_axios.prototype.removeAuthorizationHeader = function () {
      var _this = this;
      if (_this.__authorizationInterceptor) {
        _this.ajax.interceptors.request.eject(_this.__authorizationInterceptor);
      }
    };
    
    return Ajax_axios;
  }(BaseAjax);
  
  var Ajax_jQuery = function (_Ajax) {
    _inherit(Ajax_jQuery, _Ajax);
    
    function Ajax_jQuery() {
      _classCallCheck(this, Ajax_jQuery);
    }
    
    return Ajax_jQuery;
  }(BaseAjax);
  
  return Ajax;
});
