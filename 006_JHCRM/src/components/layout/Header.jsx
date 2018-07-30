import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logout } from '../../redux/ducks/login';
import { getPersonalInfo } from '../../redux/ducks/personalInfo';
import './Header.less';

class Header extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getPersonalInfo();
  }

  render(){
    return (
      <div className="Header">
        <div>
          <div className="logo"></div>
          <div className="userInfo">
              {this.props.userName}，你好！欢迎登录
              <div className="logout" onClick={this.props.logout}>注销</div>
          </div>
        </div>
        
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { loginStatus, personalInfo } = state;
  const { userName } = personalInfo;
  return {
    isLogined: loginStatus.isLogined,
    userName
  };
};

export default connect(mapStateToProps, {
  logout,
  getPersonalInfo
})(Header);