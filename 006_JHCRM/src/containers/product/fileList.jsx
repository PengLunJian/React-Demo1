import React, { Component } from 'react';
import { connect } from 'react-redux';
import { message, Upload, Button, Icon } from 'antd';
import CustomItem from '../../components/common/Custom-Item';
import {
  getFileList,
  deleteFile
} from '../../redux/ducks/product/fileList';
import CustomModal from '../../components/common/Custom-Modal';
import FileListTable from '../../components/product/FileListTable';

import './fileList.less';

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

class FileList extends Component {
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
  
  //接收列表传过来的单条记录数据，请求附件列表数据
  componentWillReceiveProps(nextProps) {
    if (!this.props.recordData || this.props.recordData !== nextProps.recordData) {
      const { recordData } = nextProps;
      if (recordData) {
        this.params.productId = recordData.fundcode;
        this.loadData();
      }
    }
  }
  
  //  关闭附件列表
  saveFn = () => {
    this.props.hideFileListModal();
  };

  loadData = () => {
    return new Promise((resolve, reject) => {
      this.props.getFileList(this.params, true);
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
    this.props.hideFileListModal();
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
  
  // 删除附件
  deleteFileFn = (id) => {
    this.props.deleteFile({ id })
      .then(() => {
        message.success('删除附件成功！');
        this.loadData();
      })
      .catch((error) => {
        message.error('删除附件失败！');
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
          title="产品附件列表"
        > 
          <FileListTable
            data={data}
            pageSize={this.params.pageSize}
            loadFileList={this.loadData}
            onPageChange={this.onPageChange}
            fileTypeData={fileTypeData}
            showLabel={this.showLabel}
            deleteFileFn={this.deleteFileFn}
            {...props}
          />
        </CustomModal>
      </div>

    );
  }
}

const mapStateToProps = (state) => {
  const { product } = state;
  const { fileList } = product;
  const { data, isLoading, totalCount } = fileList;
  
  return {
    data, 
    isLoading,
    totalCount
  };
};

export default connect(mapStateToProps, {
  getFileList,
  deleteFile
})(FileList);
