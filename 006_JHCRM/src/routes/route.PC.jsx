import React, {
  Component
} from 'react';
import {
  HashRouter as Router,
  Redirect,
  Switch,
  Route
} from 'react-router-dom';
import { connect } from 'react-redux';
import { message } from 'antd';

import RedirectToNoPermission from './RedirectToNoPermission';
import * as ROUTES from '../constants/routes';
import RouteWithSubRoutes from './RouteWithSubRoutes';
import MainContainer from '../components/layout/MainContainer';
import Location from '../components/layout/Location';
import RightComponent from '../components/layout/RightComponent';
import Login from '../containers/Login';
import Customer from '../containers/customer';
import Channel from '../containers/channel';
import VisitRecord from '../containers/visitrecord';
import Contacts from '../containers/contacts';
import Card from '../containers/card';
import Product from '../containers/product';
import PotentialProduct from '../containers/potentialProduct';
import FactCustomer from '../containers/factCustomer';
import FactChannel from '../containers/factChannel';

import isHavePermission from '../utils/isHavePermission';

require('../styles/global.less');                   //  重置样式
require('../index-PC.less');

//  在右侧包装面包屑组件
const CrumbsWrapper = (props) => {
  return [
  <Location key="location" text={props.text} />,
  <RightComponent key="content">
  <props.content />
  </RightComponent>
  ];
};

//  定义路由组件
const FactCustomerPage = () => <CrumbsWrapper content={FactCustomer} text="事实客户" />;
const PotentailCustomerPage = () => <CrumbsWrapper content={Customer} text="客户管理" />;
const FactChannelPage = () => <CrumbsWrapper content={FactChannel} text="事实渠道" />;
const PotentialChannelPage = () => <CrumbsWrapper content={Channel} text="渠道管理" />;
const VisitRecordPage = () => <CrumbsWrapper content={VisitRecord}text="拜访记录管理" />;
const ContactsPage = () => <CrumbsWrapper content={Contacts}text="联系人管理" />;
const CardPage = () => <CrumbsWrapper content={Card} text="名片管理" />;
const FactProductPage = () => <CrumbsWrapper content={Product} text="已发行产品" />;
const PotentialProductPage = () => <CrumbsWrapper content={PotentialProduct} text="未发行产品" />;

//  定义一些没有实际组件的路由组件
const RouteComp = ({ redirectPath }) => <Redirect to={`${redirectPath}`} />;
const OtherComponents = (props) => {
  const { isLogined, routes, location } = props;

  if (isLogined) {
    return (
      <MainContainer {...props} />
    );
  }
  if (location.pathname === ROUTES.LOGIN) {
    return null;
  }
  return (
    <Redirect
      to={{
        pathname: `${ROUTES.LOGIN}`,
        search: location.search,
        from: location.pathname
      }}
    />
  );
};

class Root extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  render() {
    const { isLogined } = this.props;
    
    const routes = [
      {
        path: ROUTES.BASE_ROUTE_PATH,
        exact: true,
        redirectPath: ROUTES.FACTCUSTOMER,
        component: RouteComp
      },
      {
        exact: true,
        text: '客户管理',
        key: 'Customer',
        isNav: true,
        children: [
          {
            path: ROUTES.FACTCUSTOMER,
            component: FactCustomerPage,
            text: '事实客户',
            isNav: true,
            key: 'FactCustomer'
          },
          {
            path: ROUTES.POTENTIALCUSTOMER,
            component: PotentailCustomerPage,
            text: '潜在客户',
            isNav: true,
            key: 'PotentialCustomer'
          }
        ]
      },
      {
        exact: true,
        text: '渠道管理',
        key: 'Channel',
        isNav: true,
        children: [
          {
            path: ROUTES.FACTCHANNEL,
            component: FactChannelPage,
            text: '事实渠道',
            isNav: true,
            key: 'FactChannel'
          },
          {
            path: ROUTES.POTENTIALCHANNEL,
            component: PotentialChannelPage,
            text: '潜在渠道',
            isNav: true,
            key: 'PotentialChannel'
          }
        ]
      },
      {
        path: ROUTES.VISIT_RECORD,
        component: VisitRecordPage,
        isNav: true,
        text: '拜访记录管理',
        key: ROUTES.VISIT_RECORD
      },
      {
        path: ROUTES.CONTACTS,
        component: ContactsPage,
        isNav: true,
        text: '联系人管理',
        key: ROUTES.CONTACTS
      },
      {
        path: ROUTES.CARD,
        component: CardPage,
        isNav: true,
        text: '名片管理',
        key: ROUTES.CARD
      },
      {
        text: '产品管理',
        key: 'Product',
        isNav: true,
        children: [
          {
            path: ROUTES.FACTPRODUCT,
            component: FactProductPage,
            text: '已发行',
            isNav: true,
            key: 'FactProduct'
          },
          {
            path: ROUTES.POTENTIALPRODUCT,
            component: PotentialProductPage,
            text: '未发行',
            isNav: true,
            key: 'PotentialProduct'
          }
        ]
      },
    ];
    
    const outerRoutes = [             //  外层路由，Switch控制是渲染登录组件或者其他组件
      {
        path: ROUTES.LOGIN,
        exact: true,
        component: Login
      },
      {
        path: '*',
        exact: true,
        isLogined,
        routes,
        component: OtherComponents
      }
    ];

    return (
      <Router>
        <Switch>
        {
          outerRoutes.map((route, index) => (
            <RouteWithSubRoutes key={index} {...route} />
          ))
        }
        </Switch>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  const { loginStatus } = state;
  const { isLogined } = loginStatus;
  return {
    isLogined
  };
};

export default connect(mapStateToProps)(Root);
