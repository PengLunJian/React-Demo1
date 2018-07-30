import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  getCustomer_fact,
  clearCustomer_fact
} from '../../redux/ducks/customer/factList';
import { getDictionary } from '../../redux/ducks/customer/searchDictionary';
import Search from '../../components/factCustomer/Search';
import TableContent from '../../components/factCustomer/TableContent';

class Customer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.params = {
      currentPage: 1,
      pageSize: 10,
      startDate: '',         
      endDate: '',       
      name: '',          // 客户名称
      code: '',          // 客户编码
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
    this.props.getCustomer_fact(this.params, true);
  };
  
  render() {
    const { dictionaryData, data, ...props } = this.props;
    
    return (
      <div className="listContent FactCustomer">
        <Search
          dictionaryData={dictionaryData}
          onSearchChange={this.onSearchChange}
          searchClick={this.searchClick}
        />
        <TableContent
          data={data}
          dictionaryData={dictionaryData}
          pageSize={this.params.pageSize}
          onPageChange={this.onPageChange}
          {...props}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { customer, loginStatus } = state;
  const { factList, dictionaryData } = customer;
  const { data, totalCount, isLoading } = factList;
  
  return {
    isLoading,
    data: data,
    totalCount: totalCount,
    dictionaryData: dictionaryData.data,
    roles: loginStatus.roles
  };
};

export default connect(mapStateToProps, {
  getCustomer_fact,
  clearCustomer_fact,
  getDictionary
})(Customer);
