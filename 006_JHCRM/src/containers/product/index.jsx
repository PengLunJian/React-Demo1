import React, { Component } from 'react';
import { connect } from 'react-redux';
import { message } from 'antd';
import {
  getProduct,
  clearProduct
} from '../../redux/ducks/product/list';
import Search from '../../components/product/Search';
import TableContent from '../../components/product/TableContent';


class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.params = {
      currentPage: 1,
      pageSize: 10,
      startDate: '',  
      endDate: '',
      name: '',
      code: ''
    };
  }
  
  componentWillMount() {
    document.title = '已发行产品';
  }
  
  componentDidMount() {
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
  
  loadData = () => {
    return new Promise((resolve, reject) => {
      this.props.getProduct(this.params, true);
      resolve();
    });
  };
  
  render() {
    const { dictionaryData, data, ...props } = this.props;
    
    return (
      <div className="listContent Product">
        {/*<Search
          dictionaryData={dictionaryData}
          onSearchChange={this.onSearchChange}
          searchClick={this.searchClick}
        />*/}
        <TableContent
          data={data}
          dictionaryData={dictionaryData}
          pageSize={this.params.pageSize}
          onPageChange={this.onPageChange}
          loadData={this.loadData}
          {...props}
        />
        
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { product, loginStatus } = state;
  const { list } = product;
  const { data, totalCount, isLoading } = list;
  
  return {
    data: data,
    totalCount: totalCount,
    isLoading,
    roles: loginStatus.roles
  };
};

export default connect(mapStateToProps, {
  getProduct,
  clearProduct
})(Product);
