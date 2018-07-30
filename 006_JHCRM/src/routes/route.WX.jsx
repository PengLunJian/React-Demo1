import React, {
  Component
} from 'react';
import {
  HashRouter as Router,
  Switch,
  Redirect
} from 'react-router-dom';
import { connect } from 'react-redux';
import * as ROUTES from '../constants/routes';
import RouteWithSubRoutes from './RouteWithSubRoutes';
import Login from '../containers/Login';
import Customer from '../containers-WX/customer/index';
import CustomerDetail from '../containers-WX/customer/CustomerDetail';
import AddVisitRecord from '../components-WX/customer/details/VisitRecordAdd';
import EditEvent from '../components-WX/customer/details/EditEvent';
import VisitRecordTextEdit from '../components-WX/customer/details/VisitRecordTextEdit';

import Channel from '../containers-WX/channel/index';
import ChannelDetail from '../containers-WX/channel/ChannelDetail';
import UploadImages from '../components-WX/customer/details/UploadImages';

import Contacts from '../containers-WX/contacts/index';
import ContactDetail from '../containers-WX/contacts/ContactDetail';

import Product from '../containers-WX/product/index';
import ProductDetail from '../containers-WX/product/detail/productDetail';
import AttachmentDetail from '../components-WX/product/details/AttachmentDetail';

import holdingsDetail from '../components-WX/channel/details/holdings/details';
import purchaseDetail from '../components-WX/channel/details/purchase/details';

import reportChannel from '../containers-WX/report/channel/index';
import reportChannelDetail from '../components-WX/report/channel/Detail';
import reportCustomer from '../containers-WX/report/customer/index';
import reportCustomerDetail from '../components-WX/report/customer/Detail';
import reportProduct from '../containers-WX/report/product/index';

import customerHoldingsDetail from '../components-WX/customer/details/holdings/Detail';  //客户保有量详情
import customerPurchaseDetail from '../components-WX/customer/details/purchase/Detail';  //客户申购赎回详情

require('../asset/lib/flexible/flexible.debug');    //  使用flexible适配移动端
require('../styles/global.less');                   //  重置样式
require('../index-WX.less');

//  定义一些没有实际组件的路由组件
const RouteComp = () => <Redirect to={`${ROUTES.CUSTOMER}`} />;
const OtherComponents = (props) => {
  const { isLogined, routes, location } = props;
  if (isLogined) {
    return (
      routes.map((route) => (
        <RouteWithSubRoutes key={route.path} {...route} />
      ))
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
        component: RouteComp
      },
      {
        path: ROUTES.CUSTOMER,
        component: Customer
      },
      {
        path: ROUTES.CUSTOMER_DETAIL + '/:id?',
        component: CustomerDetail
      },
      {
        path: ROUTES.CUSTOMER_DETAIL + '/:id?' + ROUTES.CUSTOMER_DETAIL_EVENT,
        exact: true,
        component: EditEvent
      },
      {
        path: ROUTES.CUSTOMER_DETAIL
        + ROUTES.CONTACT_DETAIL + '/:id?',
        component: ContactDetail
      },
      {
        path: ROUTES.CUSTOMER_DETAIL + '/:id?'
        + ROUTES.ADD_VISIT_RECORD + '/:recordId?',
        component: AddVisitRecord
      },
      {
        path: ROUTES.CUSTOMER_DETAIL + '/:id?'
        + ROUTES.ADD_VISIT_RECORD + '/:recordId?'
        + ROUTES.CONTACT_DETAIL,
        component: ContactDetail
      },
      {
        path: ROUTES.CUSTOMER_DETAIL + '/:id?'
        + ROUTES.ADD_VISIT_RECORD + '/:recordId?'
        + ROUTES.VISIT_RECORD_PROBLEM_EDIT,
        exact: true,
        component: VisitRecordTextEdit
      },
      {
        path: ROUTES.CUSTOMER_DETAIL + '/:id?'
        + ROUTES.ADD_VISIT_RECORD + '/:recordId?'
        + ROUTES.UPLOAD_IMAGES,
        exact: true,
        component: UploadImages
      },
      {
        path: ROUTES.CHANNEL,
        component: Channel
      },
      {
        path: ROUTES.CHANNEL_DETAIL + '/:id?',
        component: ChannelDetail
      },
      {
        path: ROUTES.CHANNEL_DETAIL + ROUTES.CONTACT_DETAIL + '/:id?',
        component: ContactDetail
      },
      {
        path: ROUTES.CHANNEL_DETAIL + '/:id?' + ROUTES.CHANNEL_DETAIL_EVENT,
        exact: true,
        component: EditEvent
      },
      {
        path: ROUTES.CHANNEL_DETAIL + '/:id?'
        + ROUTES.ADD_VISIT_RECORD + '/:recordId?',
        component: AddVisitRecord
      },
      {
        path: ROUTES.CHANNEL_DETAIL + '/:id?'
        + ROUTES.ADD_VISIT_RECORD + '/:recordId?'
        + ROUTES.CONTACT_DETAIL,
        component: ContactDetail
      },
      {
        path: ROUTES.CHANNEL_DETAIL + '/:id?'
        + ROUTES.ADD_VISIT_RECORD + '/:recordId?'
        + ROUTES.VISIT_RECORD_PROBLEM_EDIT,
        exact: true,
        component: VisitRecordTextEdit
      },
      {
        path: ROUTES.CHANNEL_DETAIL + '/:id?'
        + ROUTES.ADD_VISIT_RECORD + '/:recordId?'
        + ROUTES.UPLOAD_IMAGES,
        exact: true,
        component: UploadImages
      },
      {
        path: ROUTES.CONTACTS,
        component: Contacts
      },
      {
        path: ROUTES.CONTACT_DETAIL + '/:id?',
        component: ContactDetail
      },
      {
        path: ROUTES.PRODUCT,
        component: Product
      },
      {
        path: ROUTES.PRODUCT_DETAIL + '/:id?',
        component: ProductDetail
      },
      {
        path: ROUTES.PRODUCT_DETAIL + ROUTES.CUSTOMER_DETAIL + '/:id?',
        component: CustomerDetail,
        exact: true
      },
      {
        path: ROUTES.PRODUCT_DETAIL + ROUTES.CHANNEL_DETAIL + '/:id?',
        component: ChannelDetail,
        exact: true
      },
      {
        path: ROUTES.PRODUCT_DETAIL + '/:id?' + ROUTES.ATTACHMENT_DETAIL,
        component: AttachmentDetail,
        exact: true
      },
      {
        path: ROUTES.CHANNEL_DETAIL + '/:id?' + ROUTES.HOLDINGS_DETAIL,
        component: holdingsDetail
      },
      {
        path: ROUTES.CHANNEL_DETAIL + '/:id?' + ROUTES.PURCHASE_DETAIL,
        component: purchaseDetail
      },
      {
        path: ROUTES.REPORT_CHANNEL,
        component: reportChannel
      },
			{
				path: ROUTES.REPORT_CHANNEL + ROUTES.REPORT_CHANNEL_DETAIL,
				component: reportChannelDetail
			},
      {
        path: ROUTES.REPORT_CUSTOMER,
        component: reportCustomer
      },
			{
				path: ROUTES.REPORT_CUSTOMER + ROUTES.REPORT_CUSTOMER_DETAIL,
				component: reportCustomerDetail
			},
			{
				path: ROUTES.REPORT_PRODUCT,
				component: reportProduct
			},
			{
				path: ROUTES.CUSTOMER_DETAIL + '/:id?' + ROUTES.HOLDINGS_DETAIL,
				component: customerHoldingsDetail
			},
			{
				path: ROUTES.CUSTOMER_DETAIL + '/:id?' + ROUTES.PURCHASE_DETAIL,
				component: customerPurchaseDetail
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
            outerRoutes.map((route) => (
              <RouteWithSubRoutes key={route.path} {...route} />
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
