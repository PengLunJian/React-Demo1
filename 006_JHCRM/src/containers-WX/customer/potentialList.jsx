import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  getCustomer,
  clearCustomer,
  deleteCustomer
} from '../../redux/ducks/customer/list';
import { CUSTOMER_DETAIL } from '../../constants/routes';
import List from '../../components-WX/customer/List';
import AddBtn from '../../components-WX/common/AddBtn';
import isHavePermission from '../../utils/isHavePermission';

import './index.less';

class Customer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasMoreData: true,  //  用于下拉刷新标识
    };
    this.params = {
      currentPage: 1,
      pageSize: 10,
      customerNature: 0,
      key: '',
      start: '',
      end: '',
      userId: ''
    };
  }
  
  componentDidMount() {
    this.loadData(false);
    this.props.onRef(this);
  }
  
  componentWillReceiveProps(nextProps) {
    const { hasMoreData } = this.state;
    const { pageSize, currentPage } = this.params;
    if (pageSize * currentPage >= nextProps.totalCount) {
      hasMoreData &&
      this.setState({
        hasMoreData: false
      });
    } else {
      !hasMoreData &&
      this.setState({
        hasMoreData: true
      });
    }
  }

  filterLoad = (data) => {
    this.params = data;
    this.loadData(false, data)
  }
  
  loadData = (loadMore, data) => {
    this.params.currentPage = loadMore ?
      this.params.currentPage + 1 : 1;
    if (!loadMore) {
      this.props.clearCustomer();
    }
    return new Promise((resolve, reject) => {
      this.props.getCustomer(data ? data : this.params);
      resolve();
    });
  };
  
  //  新增客户按钮
  addCustomer = () => {
    const { history } = this.props;
    history.push({
      pathname: CUSTOMER_DETAIL,
      search: '?customerNature=0'
    });
  };
  
  deleteCustomerFn = (customerId) => {
    this.props.deleteCustomer({ customerId });
  };

  // 把20180312转成2018-03-12
  formatTime = (timeStr) => {
    if(timeStr){
      return timeStr.substring(0, 4) + '.' + timeStr.substring(5, 7) + '.' + timeStr.substring(8, 10);
    }
  }

  toDetail = (id, state, reallyNum) => {
    const { history } = this.props;
    history.push({
      pathname: CUSTOMER_DETAIL + '/' + id,
      search: '?customerNature=0&state=' + state + '&reallyNum=' + reallyNum
    });
  };
  
  render() {
    const { hasMoreData } = this.state;
    const { dictionaryData, isActive, drawerVisible, roles, ...props } = this.props;
    const { start, end } = this.params;
    
    return (
      <div className="Customer_potentail">
        <List
          loadData={this.loadData}
          hasMoreData={hasMoreData}
          deleteItemFn={this.deleteCustomerFn}
          customerType={dictionaryData && dictionaryData.customerType}
          toDetail={this.toDetail}
          {...props}
        />
        {
          !drawerVisible && isActive && !isHavePermission(roles, 1) && !isHavePermission(roles, 3)
          ?
          <AddBtn
            handleAddFn={this.addCustomer}
            {...props}
          />
          :
          null
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { customer } = state;
  const { list } = customer;
  const { data, totalCount, isLoading, deleteIsFailed, deleteIsLoading, deleteIsSuccess } = list;
  
  return {
    deleteIsFailed,
    deleteIsLoading,
    deleteIsSuccess,
    data: data,
    totalCount: totalCount,
    isLoading
  };
};

export default connect(mapStateToProps, {
  getCustomer,
  clearCustomer,
  deleteCustomer
})(Customer);
