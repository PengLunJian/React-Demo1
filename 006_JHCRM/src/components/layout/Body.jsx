import React, { Component } from 'react';
import RouteWithSubRoutes from '../../routes/RouteWithSubRoutes';
import Navs from './Navs';

import './Body.less';

export default class Body extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  //  把routes分类成菜单和内容
  classifyRoutes = (routes) => {
    const classifiedRoutes = {
      menuRoutes: [],
      contentRoutes: []
    };
    const filterMenuRoutes = (data) => {
      data.forEach(item => {
        if (item.isNav) {
          classifiedRoutes.menuRoutes.push(item);
        }
      });
    };
    const filterContentRoutes = (data) => {
      data.forEach(item => {
        if (item.path && item.component) {
          classifiedRoutes.contentRoutes.push(item);
        }
        if (item.children) {
          filterContentRoutes(item.children);
        }
      });
    };
    
    filterMenuRoutes(routes);
    filterContentRoutes(routes);
    
    return classifiedRoutes;
  };

  render() {
    const { routes, ...props } = this.props;
    const { menuRoutes, contentRoutes } = this.classifyRoutes(routes);

    return (
      <div className="Body">
        <Navs menuRoutes={menuRoutes} contentRoutes={contentRoutes} {...props} />
        <div className="rightContent">
          {
            contentRoutes.map((route, index) => (
              <RouteWithSubRoutes key={index} {...route} />
            ))
          }
        </div>
      </div>
    )
  }
}
