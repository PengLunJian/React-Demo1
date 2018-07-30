import React, { Component } from 'react';
import * as UUID from 'uuidjs';
import { Icon } from 'antd';

import './VerifyCode.less';

export default class VerifyCode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      imgSrc: '',
      countDown: 0
    };
    this.uuid = '';       //  外层组件可以通过ref获取到本组件的索引然后获取到这两个值
    this.sault = '';      //  外层组件可以通过ref获取到本组件的索引然后获取到这两个值
    this.ajaxTimer = null;    //  验证码请求定时器，用于避免登录成功后路由跳转可能会先渲染一下下Login导致发起一次没必要的请求
    this.countTimer = null;   //  倒计时定时器
  }
  
  componentDidMount() {
    this.ajaxTimer = setTimeout(() => {
      this.ajaxForIMG();
    }, 0);
  }
  
  componentDidUpdate() {
    if (!this.countTimer && this.state.countDown > 0) {
      this.countTimer = setInterval(() => {
        this.setState({
          countDown: this.state.countDown - 1
        });
      }, 1000);
    } else if (this.countTimer && this.state.countDown === 0) {
      clearInterval(this.countTimer);
      this.countTimer = null;
    }
  }
  
  componentWillUnmount() {
    this.ajaxTimer && clearInterval(this.ajaxTimer);
    this.countTimer && clearInterval(this.countTimer);
  }
  
  generateUUID() {
    this.uuid = UUID.genV4().toString();
  }
  
  ajaxForIMG = () => {
    this.setState({
      isLoading: true
    });
    this.generateUUID();      //  每次请求前生成一个新的uuid
    this.props.getVerifyCode({ client_key: this.uuid })
      .then((res) => {
        const rawData = res.data;
        if (rawData) {
          const key = Object.keys(rawData)[0];
          const value = rawData[key];
          this.sault = key;
          this.setState({
            imgSrc: 'data:image/jpeg;base64,' + value,
            countDown: 60
          });
        }
      })
      .finally(() => {
        this.setState({
          isLoading: false
        });
      });
  };
  
  render() {
    const { imgSrc, countDown, isLoading } = this.state;
    return (
      <div className="common__verifyCode clearfix">
        <div className="common__verifyCode__img" onClick={this.ajaxForIMG}>
          {
            countDown ?
              <img
                src={imgSrc}
                alt="验证码"
              />
              :
              <div className="refresh"><Icon type="reload" spin={!!isLoading} />重新获取</div>
          }
        </div>
        <span className="common__verifyCode__hint">
          {
            countDown ?
              countDown + '秒后请重新获取'
              :
              '验证码已失效，请重新获取'
          }
        </span>
      </div>
    );
  }
}
