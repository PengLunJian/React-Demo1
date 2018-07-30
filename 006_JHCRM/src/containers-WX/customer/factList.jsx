import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  getCustomer_fact,
  clearCustomer_fact
} from '../../redux/ducks/customer/factList';
import { CUSTOMER_DETAIL } from '../../constants/routes';
import List from '../../components-WX/customer/List';

import './index.less';

class Customer_fact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasMoreData: true,  //  用于下拉刷新标识
    };
    this.params = {
      currentPage: 1,
      pageSize: 10,
      name: '',
      userId: ''
    };
  }
  
  componentDidMount() {
    this.loadData_fact(false);
    this.props.onRef_fact(this);
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

  filterLoad_fact = (data) => {
    this.params = data;
    this.loadData_fact(false, data)
  }
  
  loadData_fact = (loadMore, data) => {
    this.params.currentPage = loadMore ?
      this.params.currentPage + 1 : 1;
    if (!loadMore) {
      this.props.clearCustomer_fact();
    }
    return new Promise((resolve, reject) => {
      this.props.getCustomer_fact(data ? data : this.params);
      resolve();
    });
  };

  toDetail = (id) => {
    const { history } = this.props;
    history.push({
      pathname: CUSTOMER_DETAIL + '/' + id,
      search: '?customerNature=1'
    });
  };
  
  render() {
    const { hasMoreData } = this.state;
    const { dictionaryData, ...props } = this.props;
    const { start, end } = this.params;
    
    return (
      <div className="Customer_fact">
        {<List
          loadData={this.loadData_fact}
          hasMoreData={hasMoreData}
          customerType={dictionaryData && dictionaryData.customerType}
          toDetail={this.toDetail}
          {...props}
        />}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { customer } = state;
  const { factList } = customer;
  const { data, totalCount, isLoading } = factList;
  
  return {
    data: data,
    totalCount: totalCount,
    isLoading
  };
};

export default connect(mapStateToProps, {
  getCustomer_fact,
  clearCustomer_fact
})(Customer_fact);
