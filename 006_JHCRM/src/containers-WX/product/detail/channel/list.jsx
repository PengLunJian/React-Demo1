//  产品详情-渠道列表
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PRODUCT_DETAIL, CHANNEL_DETAIL } from '../../../../constants/routes';
import { getChannel_product, clearChannel_product } from '../../../../redux/ducks/product/detail/channel/list';
import List from '../../../../components-WX/channel/List';

import './list.less';

class productChannel extends Component {
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
      this.props.clearChannel_product();
    }
    return new Promise((resolve, reject) => {
      this.props.getChannel_product(this.params);
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
          detailUrl={PRODUCT_DETAIL + CHANNEL_DETAIL}
          channelNature={dictionaryData && dictionaryData.channelNature}
          {...props}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { product } = state;
  const { channelList } = product;
  const { data, totalCount, isLoading } = channelList;

  
  return {
    data: data,
    totalCount: totalCount,
    isLoading
  };
};

export default connect(mapStateToProps, {
  getChannel_product,
  clearChannel_product
})(productChannel);
