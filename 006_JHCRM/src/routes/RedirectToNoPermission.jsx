import React, { Component } from 'react';
import {
  connect
} from 'react-redux';
import { logout } from '../redux/ducks/login';

class RedirectToNoPermission extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.logout();
  }

  render() {
    return null;
  }
}

const mapStateToProps = (state) => {
  const {
    loginStatus
  } = state;
  return {
    isLogined: loginStatus.isLogined,
  };
};

export default connect(mapStateToProps, {
  logout,
})(RedirectToNoPermission);