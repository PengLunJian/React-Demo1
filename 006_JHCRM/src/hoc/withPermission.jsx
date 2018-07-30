import React, { Component } from 'react';
import { connect } from 'react-redux';

export const withPermission = (NoPermissionComponent = null) => (WrappedComponent) => {
  class WithPermission extends Component {
    render() {
      const { permissions, roles, dispatch, ...props } = this.props;
     	const permissionRoles = roles || [];
      const hasPermission = !permissions || permissionRoles.some(role => permissions.indexOf(role) > -1);
      
      //  有权限
      if (hasPermission) {
        return <WrappedComponent {...props} />;
      }
      //  无权限
      return (
        NoPermissionComponent ? <NoPermissionComponent {...props} /> : null
      );
    }
  }
  
  //  包装显示名字以便于调试
  WithPermission.displayName = `WithPermission(${getDisplayName(WrappedComponent)})`;
  
  //  连接redux，获取状态中的权限角色
  const mapStateToProps = (state) => {
    const { roles } = state.loginStatus;
    return {
      roles
    };
  };
  
  return connect(mapStateToProps)(WithPermission);
};

export default withPermission;

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}
