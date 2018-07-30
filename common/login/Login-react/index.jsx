import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  isWeiXin,
  getSearch
} from './utils';
import WeiXinLoginWrapper from './WeiXinLoginWrapper';
import Login from './Login';

class LoginWrapper extends Component {
  static propTypes = {
    onLoginSuccess: PropTypes.func.isRequired,                //  登录成功之后执行的方法
    isWeiXin: PropTypes.bool,                                 //  是否是微信端
    ajax: PropTypes.func.isRequired,                          //  ajax方法
    apis: PropTypes.shape({                                   //  接口地址集合
      verifyCode: PropTypes.string.isRequired,                //  验证获取和验证接口
      getOrgs: PropTypes.string.isRequired,                   //  获取机构列表接口
      login: PropTypes.string.isRequired                      //  登录接口
    }),
    targetPath: PropTypes.string.isRequired,                  //  登录成功后需要进入的路由
    logo: PropTypes.string,                                   //  界面上的logo图片
    search: PropTypes.string,                                 //  url参数，跳转路由时需要，不传将自动获取或者也可以targetPath中附带
    setAuthorizationHeader: PropTypes.func.isRequired,        //  登录成功后设置请求头
    setAuthorization: PropTypes.func.isRequired,              //  登录成功后存储token
    setRoles: PropTypes.func.isRequired,                      //  登陆成功后存储角色权限
    setPermissionUnits: PropTypes.func.isRequired             //  登陆成功后存储权限单元
  };
  
  constructor(props) {
    super(props);
    const _isWeiXin = props.isWeiXin || isWeiXin();
    const search = getSearch();
    this.state = {
      isWeiXin: _isWeiXin,
      search: props.search || search,
      isLoading: false,
      isLogined: false,
      isFailed: false,
      status: 0
    };
  }
  
  getVerifyCode = (params) => {
    return this.props.ajax({
      method: 'get',
      url: this.props.apis.verifyCode,
      params
    });
  };
  
  verifyCode = (data) => {          //  验证验证码请求
    return this.props.ajax({
      method: 'post',
      url: this.props.apis.verifyCode,
      data
    });
  };
  
  getOrgs = (params) => {           //  获取机构列表请求
    return this.props.ajax({
      method: 'get',
      url: this.props.apis.getOrgs,
      params
    });
  };
  
  login = (data) => {               //  登录请求
    this.setState({
      isLoading: true,
      isLogined: false,
      isFailed: false
    });
    return this.props.ajax({
                 method: 'post',
                 url: this.props.apis.login,
                 data
               })
               .then((res) => {
                 if (res && res.status === 28) {
                   //  验证码错误刷新验证码
                   this.setState({
                     isLoading: false,
                     isLogined: false,
                     isFailed: true,
                     status: 28
                   });
                 } else {
                   //  登录成功
                   this.setState({
                     isLoading: false,
                     isLogined: true,
                     isFailed: false
                   });
                   const authorization = res.headers.authorization;
                   const message = res.data.message || '';
                   const permissionGroups = (message.indexOf('|') > -1 ? message : message + '|').split('|');
                   const roles = permissionGroups[0].split(';').filter((item) => !!item);
                   const permissionUnits = permissionGroups[1].split(',').filter((item) => !!item);
                   this.props.setRoles(roles);
                   this.props.setPermissionUnits(permissionUnits);
                   this.props.setAuthorization(authorization);
                   this.props.setAuthorizationHeader(authorization);
                   this.props.onLoginSuccess({ roles, permissionUnits });
                 }
               })
               .catch((error) => {
                 console.error(error);
                 console.dir(error);
                 this.setState({
                   isLoading: false,
                   isLogined: false,
                   isFailed: true,
                   status: error.response.data.status || error.response.status
                 });
               });
  };
  
  render() {
    const { isWeiXin: discarded_isWeiXin, ...props } = this.props;
    const { isWeiXin, ...state } = this.state;
    const search = props.targetPath.indexOf('?') > -1 ? '' : state.search;
    const fns = {
      getVerifyCode: this.getVerifyCode,
      verifyCode: this.verifyCode,
      getOrgs: this.getOrgs,
      login: this.login
    };
    
    if (state.isLogined) {
      return (
        <Redirect
          to={{
            pathname: props.targetPath,
            search
          }}
        />
      );
    }
    
    if (isWeiXin) {
      return (
        <WeiXinLoginWrapper
          {...fns}
          {...state}
          {...props}
        />
      );
    }
    return (
      <Login
        {...fns}
        {...state}
        {...props}
      />
    );
  }
}

export default LoginWrapper;
