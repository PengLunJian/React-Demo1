import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  getCustomer,
  clearCustomer,
  deleteCustomer
} from '../../redux/ducks/customer/list';
import { getDictionary } from '../../redux/ducks/customer/searchDictionary';
import Search from '../../components/customer/Search';
import TableContent from '../../components/customer/TableContent';

class Customer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // searchHeight: 0
    };
    this.params = {
      currentPage: 1,
      pageSize: 10,
      remarks: '',          //关键字
      introducer: '',       // 介绍人
      address: '',          //  所在地点
      customerName: '',     //  客户名称
      customerNature: 0,           //  客户性质
    };
    this.dictionaryParams = {
      type: '1,2,3'
    };
  }
  
  componentWillMount() {
    document.title = '客户管理';
  }
  
  componentDidMount() {
    this.props.getDictionary(this.dictionaryParams);
    this.loadData();
  }
  
  //  搜索框
  onSearchChange = (value, paramsKey) => {
    this.params[paramsKey] = value;
  };
  
  //  分页
  onPageChange = (pageNo) => {
    this.params.currentPage = pageNo;
    this.loadData();
  };
  
  //  搜索
  searchClick = () => {
    this.loadData();
  };
  
  loadData = (loadMore) => {
    this.props.getCustomer(this.params, true);
  };
  
  //  删除客户
  deleteCustomerFn = (customerId) => {
    this.props.deleteCustomer({ customerId })
        .then(() => {
          this.loadData();
        })
        .catch((error) => {
          console.error(error);
        });
  };
  
  render() {
    const { dictionaryData, data, ...props } = this.props;
    
    return (
      <div className="listContent Customer">
        <Search
          dictionaryData={dictionaryData}
          onSearchChange={this.onSearchChange}
          searchClick={this.searchClick}
        />
        <TableContent
          searchHeight={this.state.searchHeight}
          data={data}
          dictionaryData={dictionaryData}
          pageSize={this.params.pageSize}
          onPageChange={this.onPageChange}
          deleteCustomerFn={this.deleteCustomerFn}
          {...props}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { customer, loginStatus } = state;
  const { list, dictionaryData } = customer;
  const { data, totalCount, isLoading, deleteIsFailed, deleteIsLoading, deleteIsSuccess } = list;
  
  return {
    isLoading,
    data: data,
    totalCount: totalCount,
    dictionaryData: dictionaryData.data,
    roles: loginStatus.roles
  };
};

export default connect(mapStateToProps, {
  getCustomer,
  clearCustomer,
  deleteCustomer,
  getDictionary
})(Customer);
