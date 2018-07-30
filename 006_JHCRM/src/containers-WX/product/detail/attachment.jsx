//  产品详情-附件列表
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Toast } from 'antd-mobile';
import {
  getFileList,
  clearFileList
} from '../../../redux/ducks/product/fileList';
import List from '../../../components-WX/product/details/AttachmentList';

const fileTypeData = [
  {
    name: 'PDF',
    code: '0',
  }, {
    name: 'WORD',
    code: '1',
  }, {
    name: 'EXCEL',
    code: '2',
  }, {
    name: '图片',
    code: '3',
  }, {
    name: '其他',
    code: '4',
  }
]

class Attachment extends Component {
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
      this.props.clearFileList();
    }
    return new Promise((resolve, reject) => {
      this.props.getFileList(this.params);
      resolve();
    });
  };
  
  render() {
    const { ...props } = this.props;
    const { hasMoreData } = this.state;
    
    return (
      <div className="Attachment">
        <List
            loadData={this.loadData}
            hasMoreData={hasMoreData}
            fileTypeData={fileTypeData}
            {...props}
          />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { product } = state;
  const { fileList } = product;
  const { data, isLoading, totalCount } = fileList;
  
  return {
    AttachmentData: data,
    isLoading,
    totalCount
  };
};

export default connect(mapStateToProps, {
  getFileList,
  clearFileList
})(Attachment);

