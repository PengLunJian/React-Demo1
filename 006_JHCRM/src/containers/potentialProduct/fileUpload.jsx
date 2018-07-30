import React, { Component } from 'react';
import { connect } from 'react-redux';
import { message, Upload, Button, Icon } from 'antd';
import CustomItem from '../../components/common/Custom-Item';
import {
  saveCardEdit
} from '../../redux/ducks/card/details/basicInfo';
import CustomModal from '../../components/common/Custom-Modal';

import './fileUpload.less';

class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileList: [],   // 文件列表
      uploading: false,   // 是否正在上传文件
      productId: '',   // 产品id
    };
  }
  
  //接收列表传过来的单条记录数据
  componentWillReceiveProps(nextProps) {
    if (!this.props.data || this.props.data !== nextProps.recordData) {
      const { recordData } = nextProps;
      if (recordData) {
        this.resetStateFn(recordData);
      }
    }
  }
  
  //  取消-还原操作
  onCancelFn = () => {
    const { data } = this.props;
    this.resetStateFn(data);
    this.props.hideEditModal();
  }
  
  //  保存修改
  saveFn = () => {
    this.props.hideEditModal();
  };

  resetStateFn = (data) => {
    this.setState({
      fileList: [],
      uploading: false,
      productId: data.fundcode || '',   // 产品id
    });
  };
  
  // 移除文件
  onRemove = (file) => {
    this.setState(({ fileList }) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      return {
        fileList: newFileList,
      };
    });
  }
  
  // 上传前检查
  beforeUpload = (file) => {
    const isPdf = file.name.substring(file.name.lastIndexOf("."),file.name.length);
    const isValid = isPdf=='.pdf'||isPdf=='.doc'||isPdf=='.docx';
    if (!isValid) {
      message.error('只能上传pdf/doc/docx格式的文件!');
    }
    const isOverLimited = file.size / 1024 / 1024 < 10;
    if (!isOverLimited) {
      message.error('文件大小不能超过10MB!');
    }
    if(isValid && isOverLimited){
      this.setState(({ fileList }) => ({
        fileList: [...fileList, file],
      }));
    }
    return isValid && isOverLimited;
  }
  
  // 点击上传
  handleUpload = () => {
    const { fileList } = this.state;
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append('files[]', file);
    });

    this.setState({
      uploading: true,
    });
  }
  
  render() {
    const { visible, recordData, ...props } = this.props;
    const { fileList, uploading, productId} = this.state;
    
    const canEdit = true;

    return (
      <CustomModal
        canEdit={false}
        visible={visible}
        onOk={this.saveFn}
        onCancel={this.onCancelFn}
        title="产品附件编辑"
      >
        <div>
          <div className="uploadWrap">
            <Upload 
              action="//jsonplaceholder.typicode.com/posts/"
              onRemove={this.onRemove}
              beforeUpload={this.beforeUpload}
              fileList={fileList}
              multiple
            >
              <Button
                disabled={uploading || !canEdit}
              >
                <Icon type="upload" /> 选择文件
              </Button>
              <div className="header">
                
              </div>
            </Upload>
            <Button
              className="startUpload"
              type="primary"
              onClick={this.handleUpload}
              disabled={fileList.length === 0 || !canEdit}
              loading={uploading}
            >
              {uploading ? '正在上传' : '开始上传' }
            </Button>
          </div>
        </div>
      </CustomModal>
    );
  }
}

const mapStateToProps = (state) => {
  const { card } = state;
  const { basicInfo } = card;
  const { data, addIsFailed, addIsLoading, addIsSuccess } = basicInfo;
  
  return {
    data, 
    addIsFailed,
    addIsLoading,
    addIsSuccess,
  };
};

export default connect(mapStateToProps, {
  saveCardEdit
})(ProductDetail);
