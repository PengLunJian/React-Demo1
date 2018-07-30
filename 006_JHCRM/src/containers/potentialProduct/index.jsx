import React, { Component } from 'react';
import { connect } from 'react-redux';
import { message } from 'antd';
import {
  getProduct,
  clearProduct,
  deleteProduct
} from '../../redux/ducks/product/potentialList';
import Search from '../../components/potentialProduct/Search';
import TableContent from '../../components/potentialProduct/TableContent';
import isHavePermission from '../../utils/isHavePermission';

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.params = {
      currentPage: 1,
      pageSize: 10
    };
  }
  
  componentWillMount() {
    document.title = '未发行产品';
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

  //  删除客户
  deleteProductFn = (productId) => {
    this.props.deleteProduct({ productId })
        .then(() => {
          message.success('删除产品成功！');
          this.loadData();
        })
        .catch((error) => {
           message.success('删除产品失败！');
          console.error(error);
        });
  };
  
  render() {
    const { dictionaryData, data, roles, ...props } = this.props;
    
    return (
      <div className={`listContent PotentialProduct ${!isHavePermission(roles, 3) ? 'noAddBtn' : ''}`}>
        {
          isHavePermission(roles, 3)
          ?
          <Search
            dictionaryData={dictionaryData}
            onSearchChange={this.onSearchChange}
            searchClick={this.searchClick}
            addFn={this.addFn}
            loadData={this.loadData}
            {...props}
          />
          :
          null
        }
        <TableContent
          data={data}
          dictionaryData={dictionaryData}
          pageSize={this.params.pageSize}
          onPageChange={this.onPageChange}
          loadData={this.loadData}
          deleteProductFn={this.deleteProductFn}
          roles={roles}
          {...props}
        />
        
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { product, loginStatus } = state;
  const { potentialList } = product;
  const { data, totalCount, isLoading } = potentialList;
  
  return {
    data: data,
    totalCount: totalCount,
    isLoading,
    roles: loginStatus.roles
  };
};

export default connect(mapStateToProps, {
  getProduct,
  clearProduct,
  deleteProduct
})(Product);
