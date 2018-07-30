import React, { Component } from 'react';
import { connect } from 'react-redux';
import { message, Upload, Button, Icon } from 'antd';
import CustomItem from '../../components/common/Custom-Item';
import {
  getUrlList,
  deleteUrl
} from '../../redux/ducks/product/urlList';
import CustomModal from '../../components/common/Custom-Modal';
import UrlListTable from '../../components/potentialProduct/UrlListTable';

import './urlList.less';

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

class UrlList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editVisible: false, //  编辑框
    };
    this.params = {
      currentPage: 1,
      pageSize: 10,
      productId: ''
    };
  }
  
  //接收列表传过来的单条记录数据，请求外链列表数据
  componentWillReceiveProps(nextProps) {
    if (!this.props.recordData || this.props.recordData !== nextProps.recordData) {
      const { recordData } = nextProps;
      if (recordData) {
        this.params.productId = recordData.id;
        this.loadData();
      }
    }
  }
  
  //  关闭外链列表
  saveFn = () => {
    this.props.hideUrlListModal();
  };

  loadData = () => {
    return new Promise((resolve, reject) => {
      this.props.getUrlList(this.params, true);
      resolve();
    });
  };

  //  分页
  onPageChange = (pageNo) => {
    this.params.currentPage = pageNo;
    this.loadData();
  };

  //  取消-还原操作
  onCancelFn = () => {
    const { data } = this.props;
    this.props.hideUrlListModal();
  }

  //  判断性质/行业分类等接口获取数据的label显示
  showLabel = (code, data) => {
    let typeName = '';
    data && data.map(item => {
      if (code == item.code) {
        typeName = item.name;
      }
    });
    return typeName;
  };
  
  // 删除外链
  deleteUrlFn = (id) => {
    this.props.deleteUrl({ id })
      .then(() => {
        message.success('删除外链成功！');
        this.loadData();
      })
      .catch((error) => {
        message.error('删除外链失败！');
        console.error(error);
      });
  }
  
  render() {
    const { visible, data, ...props } = this.props;
    const { editVisible} = this.state;
    
    const canEdit = true;

    return (
      <div>
        <CustomModal
          canEdit={false}
          visible={visible}
          onOk={this.saveFn}
          onCancel={this.onCancelFn}
          title="产品外链列表"
        > 
          <UrlListTable
            data={data}
            pageSize={this.params.pageSize}
            loadUrlList={this.loadData}
            onPageChange={this.onPageChange}
            fileTypeData={fileTypeData}
            showLabel={this.showLabel}
            deleteUrlFn={this.deleteUrlFn}
            {...props}
          />
        </CustomModal>
      </div>

    );
  }
}

const mapStateToProps = (state) => {
  const { product } = state;
  const { urlList } = product;
  const { data, isLoading, totalCount } = urlList;
  
  return {
    data, 
    isLoading,
    totalCount
  };
};

export default connect(mapStateToProps, {
  getUrlList,
  deleteUrl
})(UrlList);
