//  产品详情-渠道列表
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PRODUCT_DETAIL, CUSTOMER_DETAIL } from '../../../../constants/routes';
import { getCustomer_product, clearCustomer_product } from '../../../../redux/ducks/product/detail/customer/list';
import List from '../../../../components-WX/customer/List';

import './list.less';

class productCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasMoreData: true,  //  用于下拉刷新标识
    };
    this.params = {
      currentPage: 1,
      pageSize: 10,
      productId: ''
    };
  }
  
  componentDidMount() {
    const { match } = this.props;
    if (match.params && match.params.id) {
      this.params.productId = match.params.id;
    }
    this.loadData(false);
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
  
  loadData = (loadMore) => {
    this.params.currentPage = loadMore ? this.params.currentPage + 1 : 1;
    if (!loadMore) {
      this.props.clearCustomer_product();
    }
    return new Promise((resolve, reject) => {
      this.props.getCustomer_product(this.params);
      resolve();
    });
  };
  
  render() {
    const { isActive, dictionaryData, ...props } = this.props;
  
    const { hasMoreData } = this.state;
    
    return (
      <div className="ProductCustomer">
        <List
          loadData={this.loadData}
          hasMoreData={hasMoreData}
          detailUrl={PRODUCT_DETAIL + CUSTOMER_DETAIL}
          customerNature={dictionaryData && dictionaryData.customerNature}
          {...props}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { product } = state;
  const { customerList } = product;
  const { data, totalCount, isLoading } = customerList;
  
  return {
    data: data,
    totalCount: totalCount,
    isLoading
  };
};

export default connect(mapStateToProps, {
  getCustomer_product,
  clearCustomer_product
})(productCustomer);
