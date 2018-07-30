import React, { Component } from 'react';
import {
  Menu,
  Icon
} from 'antd';
import { BASE_ROUTE_PATH } from '../../constants/routes';
import { NavLink } from 'react-router-dom';
import { withPermission } from '../../hoc/withPermission';

import './Navs.less';

const { SubMenu } = Menu;

export default class Navs extends Component {
  constructor(props) {
    super(props);
    //  根据路由匹配根subMenu的展开状态
    const { menuRoutes, match } = props;
    const openKeys = [];
    const rootSubmenuKeys = [];
    menuRoutes.forEach((menuRoute) => {
      if (match.url.indexOf(menuRoute.key) > -1) {
        openKeys.push(menuRoute.key);
      }
      rootSubmenuKeys.push(menuRoute.key);
    });
    this.state = {
      openKeys: openKeys
    };
    this.rootSubmenuKeys = rootSubmenuKeys;
  }

  componentWillReceiveProps(nextProps) {
    //  根据路由匹配根subMenu的展开状态
    const { menuRoutes, match } = nextProps;
    if (this.props.match.url === BASE_ROUTE_PATH) {
      const openKeys = [];
      menuRoutes.forEach((menuRoute) => {
        if (match.url.indexOf(menuRoute.key) > -1) {
          openKeys.push(menuRoute.key);
        }
      });
      this.setState({
        openKeys: openKeys
      });
    }
  }

  onOpenChange = (openKeys) => {
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : []
      });
    }
  };
  
  // 区分一级菜单或子菜单
  renderRecursion = (routes, hasChild) => {                 //    不能把MenuItem单独写个组件，antd内部不支持
    return routes.map((route, index) => {
      const { key, path, text, children } = route;
      
      if (children && children.length) {
        return (
          <SubMenu key={key} title={<span className="title">{text}</span>}>
            {
              this.renderRecursion(children, true)
            }
          </SubMenu>
        );
        return this.renderRecursion(children, true);
      }
      
      return (
        <Menu.Item key={key}>
          <NavLink
            className={hasChild ? 'childNav' : `nav nav_${path.replace('/', '')}`}
            activeClassName={hasChild ? 'active' : `active active_${path.replace('/', '')}`}
            to={path}
           >
            {text}
          </NavLink>
        </Menu.Item>
      );
      
      return null;
    });
  };
  
  render() {
    const { menuRoutes, contentRoutes, match } = this.props;

    //  根据路由匹配menu的active状态
    const selectedKeys = [];
    contentRoutes.forEach((route) => {
      if (route.path === match.url) {
        selectedKeys.push(route.key);
      }
    });

    return (
      <div className="Navs">
        <Menu
          openKeys={this.state.openKeys}
          selectedKeys={selectedKeys}
          onOpenChange={this.onOpenChange}
          mode="inline"
        >
          {
            this.renderRecursion(menuRoutes)
          }
        </Menu>
      </div>
    );
  }
}
