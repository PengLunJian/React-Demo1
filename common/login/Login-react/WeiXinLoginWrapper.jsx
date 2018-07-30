import React, {
  Component
} from 'react';
import PropTypes from 'prop-types';
import { getSearch, search2Obj } from './utils';
import Login from './Login';

class WeiXinLoginWrapper extends Component {
  static propTypes = {
    login: PropTypes.func.isRequired,                      //  登录请求
    isFailed: PropTypes.bool.isRequired,                   //  登录请求关联的状态：是否登录失败
    search: PropTypes.string,                              //  url参数，不传将自动获取或者也可以targetPath中附带
  }
  
  constructor(props) {
    super(props);
    const search = props.search || getSearch();
    const searchObj = search2Obj(search);                //  从url参数中获取wid和token参数
    const { token, wid } = searchObj;
    this.state = {
      tempToken: token,
      wid
    };
  }
  
  componentDidMount() {
    const { login } = this.props;
    const { tempToken } = this.state;
    if (tempToken) {
      login({ tempToken });
    }
  }
  
  render() {
    const { isFailed, ...props } = this.props;
    const { tempToken, wid } = this.state;
    const loginComponent = (
        <Login wid={wid} {...props} />
    );
    //  tempToken存在的情况
    if (tempToken) {
      //  直接登录失败，展现登录界面
      if (isFailed) {
        return loginComponent;
      }
      //  表示能够直接登录，什么都不渲染，componentDidMount执行登录逻辑
      return null;
    }
    
    //  tempToken不存在的情况
    return loginComponent;
  }
}

export default WeiXinLoginWrapper;
