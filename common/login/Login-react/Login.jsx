import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  Radio,
  Icon
} from 'antd';
// import JSEncrypt from '../asset/lib/JSEncrypt';
import VerifyCode from './VerifyCode';

require('./Login.less');

const RadioGroup = Radio.Group;

const VerifyCodeArea = ({ getVerfyCodeRef, getVerifyCode, value, onChange }) => {
  return (
    <div className="verifyCodeArea clearfix">
      <input type="text" placeholder="请输入验证码" value={value} onChange={onChange} />
      <VerifyCode ref={(ref) => getVerfyCodeRef(ref)} getVerifyCode={getVerifyCode} />
    </div>
  );
};

const LoginPanel = ({ getVerfyCodeRef, getVerifyCode, username, password, verifyCode, onChange, handleLogin, isLoading, errorMsg, logo }) => {
  return (
    <div className="loginPanel">
      <img className="logo" src={logo} alt="logo" />
      <form
        onSubmit={
          (e) => {
            e.preventDefault();
          }
        }
      >
        <input type="text" placeholder="请输入用户名" value={username} onChange={onChange('username')} />
        <input type="password" placeholder="请输入密码" value={password} onChange={onChange('password')} />
        <VerifyCodeArea getVerfyCodeRef={getVerfyCodeRef}
                        getVerifyCode={getVerifyCode}
                        value={verifyCode}
                        onChange={onChange('verifyCode')} />
        {
          errorMsg ?
            <p className="errorMsg">{errorMsg}</p>
            :
            null
        }
        {
          isLoading ?
            <button type="submit" onClick={(e) => e.preventDefault()} disabled>正在登录...</button>
            :
            <button type="submit" onClick={handleLogin}>登录</button>
        }
      </form>
      <div className="turnRegister" style={{ display: 'none' }}>
        <span>还没有账号？</span>
        <span
          className="registerBtn"
          onClick={
            (e) => {
              e.stopPropagation();
              alert('跳转到注册页');
            }}
        >
          <span>立即注册</span>
          <Icon type="login" />
          </span>
      </div>
    </div>
  );
};

class Login extends Component {
  static propTypes = {
    wid: PropTypes.string,                          //  如果是微信端则会有这个参数，登录时只传wid参数
    logo: PropTypes.string,                         //  界面上的logo图片
    getVerifyCode: PropTypes.func.isRequired,       //  获取验证码请求
    verifyCode: PropTypes.func.isRequired,          //  验证验证码是否正确请求
    getOrgs: PropTypes.func.isRequired,             //  获取机构列表请求
    login: PropTypes.func.isRequired                //  登录请求
  };

  constructor(props) {
    super(props);
    this.state = {
      username: '',                 //  input框输入的用户名
      password: '',                 //  input框输入的密码
      verifyCode: '',               //  input框输入的验证码
      orgId: '',
      orgData: null,
      modalVisible: false,
      errorMsg: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    const { isFailed, status } = nextProps;
    if (isFailed) {
      let errorMsg = '';
      switch (Number(status)) {
        case 28:
          errorMsg = '验证码错误';
          break;
        case 401:
          errorMsg = '用户名或密码错误';
          break;
        default:
          errorMsg = '验证失败，请重试';
      }
      this.setState({
        errorMsg
      });
    }
  }

  //  获取VerifyCode组件
  getVerfyCodeRef = (ref) => {
    this.VerifyCode = ref;
  };

  //  input框输入
  handleInputChange = (key) => (event) => {
    const newState = {
      [key]: event.target.value.trim()
    };
    newState.errorMsg = '';
    this.setState(newState);
  };

  //  先进行登录前操作（验证表单非空、验证验证码是否正确、获取机构列表）
  preLogin = () => {
    const { username, password, verifyCode } = this.state;
    if (!username || !password) {
      this.setState({
        errorMsg: '请输入帐号密码！'
      });
      return;
    } else if (!verifyCode) {
      this.setState({
        errorMsg: '请输入验证码！'
      });
      return;
    }

    this.props.verifyCode({
          client_key: this.VerifyCode.uuid,
          verify_code: verifyCode
        })
        .then((res) => {
          //  验证码正确，获取机构列表
          if (res.data) {
            return this.props.getOrgs({ username });
          }
          //  验证码错误，抛出异常，进入catch
          throw new Error('验证码错误');
        })
        .then((res) => {
          if (res.data.error) {
            this.setState({
              errorMsg: '您还未被授权使用此应用，请联系管理员。'
            });
            return;
          }
          const data = res.data.data;

          // //  模拟数据
          // const data = [{
          //   id: '8ec8dd3e-c1b1-4ca6-8831-fee04bc6e5df',
          //   name: '上海傲度信息'
          // }, {
          //   id: '8ec8dd3e-c1b1-4ca6-8831-fee04bc6e5df1',
          //   name: '上海傲度'
          // }, {
          //   id: '8ec8dd3e-c1b1-4ca6-8831-fee04bc6e5df21',
          //   name: '上海傲度金融信息科技有限公司上海傲度金融信息科技有限公司'
          // }, {
          //   id: '8ec8dd3e-c1b1-4ca6-8831-fee04bc6e5df2',
          //   name: '上海傲度金融信息'
          // }];

          // 接口返回一条数据，直接使用机构id登录
          if (data.length === 1) {
            const orgId = data[0].id;
            this.setState({
              orgId
            }, this.handleLogin);
          } else {  //  弹窗展示所有机构，选择机构后确定才登录
            this.setState({
              modalVisible: true,
              orgData: data,
              orgId: data[0].id
            });
          }
        })
        .catch(error => {
          console.error(error);
          if (error.message === '验证码错误') {
            //  重新获取验证码
            this.VerifyCode.ajaxForIMG();
            this.setState({
              errorMsg: '验证码错误！'
            });
            return;
          }
        });
  };

  handleLogin = () => {
    const { username, password, verifyCode, orgId } = this.state;
    const uuid = this.VerifyCode.uuid;
    // const sault = this.VerifyCode.sault;

    //  加密密码
    // const encrypt = new JSEncrypt();
    // let encryptedPassword = password;
    // if (sault && password) {
    //   encrypt.setPublicKey(sault);
    //   encryptedPassword = encrypt.encrypt(password).replace(/\+/g, '%2B');
    // }

    const data = {
      username,
      // password: encryptedPassword,
      password,
      verifyCode,
      clientKey: uuid,
      orgId
    };

    if (this.props.wid) {
      data.wid = this.props.wid;
    }

    this.props.login(data);
  };

  //  机构选择
  handleOrgSelect = () => {
    this.setState({
      modalVisible: false
    }, this.handleLogin);
  };

  //  模态框取消
  handleModalCancel = () => {
    this.setState({
      modalVisible: false
    });
  };

  render() {
    const { isLoading, getVerifyCode, logo } = this.props;
    const { username, password, verifyCode, orgId, orgData, errorMsg } = this.state;

    return (
      <div className="common__Login">
        <LoginPanel
          getVerfyCodeRef={this.getVerfyCodeRef}
          getVerifyCode={getVerifyCode}
          username={username}
          password={password}
          verifyCode={verifyCode}
          onChange={this.handleInputChange}
          handleLogin={this.preLogin}
          isLoading={isLoading}
          errorMsg={errorMsg}
          logo={logo}
        />
        <Modal
          className="common_login__modal"
          title="选择机构"
          visible={this.state.modalVisible}
          onOk={this.handleOrgSelect}
          onCancel={this.handleModalCancel}
        >
          <RadioGroup
            onChange={this.handleInputChange('orgId')}
            value={orgId}
          >
            {
              (orgData || []).map(item => (
                <Radio className="radioWrapper" key={item.id} value={item.id}>{item.name}</Radio>
              ))
            }
          </RadioGroup>
        </Modal>
      </div>
    );
  }
}

export default Login;
