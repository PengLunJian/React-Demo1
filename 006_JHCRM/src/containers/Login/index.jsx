import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { ajax, JHCRM, setAuthorizationHeader, setAuthorization, setRoles } from '../../service/ajax';
import { login } from '../../redux/ducks/login';
import { BASE_ROUTE_PATH } from '../../constants/routes';
import LoginWrapper from './Login-react/index';

if (__isWX__) {
  require('./Login-react/Login-WX.less');
} else {
  require('./Login-react/Login-PC.less');
}

const logo = require('../../asset/images/logo.png');

class Login extends Component {
  render() {
    const { isLogined, history, location } = this.props;
    const apis = {
      verifyCode: JHCRM.getURL('verifyCode'),
      getOrgs: JHCRM.getURL('preLogin_orgs'),
      login: JHCRM.getURL('login')
    };
    const targetPath = history.location.from || BASE_ROUTE_PATH;
    if (isLogined) {
      return (
        <Redirect
          to={{
            pathname: targetPath,
            search: location.search
          }}
        />
      );
    }
    return (
      <React.Fragment>
        <LoginWrapper
          onLoginSuccess={this.props.login}
          ajax={ajax}
          apis={apis}
          targetPath={targetPath}
          logo={logo}
          setAuthorizationHeader={setAuthorizationHeader}
          setAuthorization={setAuthorization}
          setRoles={setRoles}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLogined: state.loginStatus.isLogined
  };
};

const mapDispatchToProps = {
  login
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
