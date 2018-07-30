//  产品详情-外链列表
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Toast } from 'antd-mobile';
import {
  getUrlList,
  clearUrlList
} from '../../../redux/ducks/product/urlList';
import List from '../../../components-WX/product/details/UrlList';

class UrlList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasMoreData: false,  //  用于下拉刷新标识
    };
    this.params = {
      currentPage: 1,
      pageSize: 10,
      productId: ''
    };
  }

  componentDidMount() {
    const { match } = this.props;
    //  有路由id则请求数据
    if (match.params && match.params.id) {
      this.params.productId = match.params.id;
      this.loadData(false);
    }
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
      this.props.clearUrlList();
    }
    return new Promise((resolve, reject) => {
      this.props.getUrlList(this.params);
      resolve();
    });
  };
  
  render() {
    const { ...props } = this.props;
    const { hasMoreData } = this.state;
    
    return (
      <div className="UrlList">
        <List
            loadData={this.loadData}
            hasMoreData={hasMoreData}
            {...props}
          />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { product } = state;
  const { urlList } = product;
  const { data, isLoading, totalCount } = urlList;
  
  return {
    UrlData: data,
    isLoading,
    totalCount
  };
};

export default connect(mapStateToProps, {
  getUrlList,
  clearUrlList
})(UrlList);

