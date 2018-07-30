import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Upload, message, Button, Icon } from 'antd';
import CustomItem from '../../components/common/Custom-Item';
import {
  addFile,
  editFile
} from '../../redux/ducks/product/fileList';
import CustomModal from '../../components/common/Custom-Modal';

import './productDetail.less';
import './fileUpload.less';

class FileDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      canUpload: true,
      fileList: [],
      id: '',          // 附件id
      productId: '',   // 产品id
      fileName: '',      // 产品分类id
      filePath: '',      // 产品名称
      fileType: ''      // 发行日期
    };
  }
  
  //接收列表传过来的单条记录数据
  componentWillReceiveProps(nextProps) {
    if(!this.props.fileRecordData || this.props.fileRecordData !== nextProps.fileRecordData){
      const { fileRecordData } = nextProps;
      if (fileRecordData) {
        this.resetStateFn(fileRecordData);
      }
    }
  }

  resetStateFn = (data) => {
    const { recordData } = this.props;
    const { fundcode } = recordData;

    this.setState({
      canUpload: true,
      fileList: [],
      id: data.id || '',
      productId: fundcode,
      fileName: data.fileName || '',      // 产品分类id
      filePath: data.filePath || '', 
      fileType: data.fileType || ''
    });
  };

  //  取消-还原操作
  onCancelFn = () => {
    const { fileRecordData } = this.props;
    this.resetStateFn(fileRecordData);
    this.props.hideFileDetail();
  }
  
  //  判断输入的内容是否为空
  isInputValueLegal = () => {
    const { fileName, filePath, fileType } = this.state;
    if (!fileName) {
      message.warning('请输附件名称！');
      return false;
    } else if (!fileType && fileType !='0') {
      message.warning('请选择附件类型！');
      return false;
    } else if (!filePath) {
      message.warning('请选择附件！');
      return false;
    } else {
      return true;
    }
  };

  //  保存修改
  saveFn = () => {
    console.log(this.state)
    if (!this.isInputValueLegal()) {
      return;
    }

    const { id } = this.state;
    const copyParams = Object.assign({}, this.state);

    const newParams = {
      id,
      productId: copyParams.productId,  
      fileName: copyParams.fileName,  
      filePath: copyParams.filePath,  
      fileType: copyParams.fileType
    };

    // const newParams = {
    //   id,
    //   productId: '005090',   // 产品id
    //   fileName: '测试文件上传333',      // 产品分类id
    //   filePath: '/uploadfile/COMMON-WEB/CRM/201807/周工作安排.doc',      // 产品名称
    //   fileType: 1      // 发行日期
    // };

    if(id){   // 修改
      this.props.editFile(newParams)
        .then(() => {
          const { editIsSuccess, eidtIsFailed } = this.props;
          if (editIsSuccess) {
            this.props.hideFileDetail();
            this.props.loadFileList();
            const { fileRecordData } = this.props;
            this.resetStateFn(fileRecordData);
            message.success('修改附件成功！');
          } else {
            message.error('修改附件失败！');
          }
        }).catch((error) => {
          console.error(error);
        });
    }else{   // 新增
      this.props.addFile(newParams)
        .then(() => {
          const { editIsSuccess, eidtIsFailed } = this.props;
          if (editIsSuccess) {
            this.props.hideFileDetail();
            this.props.loadFileList();
            const { fileRecordData } = this.props;
            this.resetStateFn(fileRecordData);
            message.success('添加附件成功！');
          } else {
            message.error('添加附件失败！');
          }
        }).catch((error) => {
          console.error(error);
        });
    }
  };

  // 上传前检查
  beforeUpload = (file, fileList) => {
    if(fileList.length > 1){
      message.error('只能上传单个文件!');
      return 
    }
    const isOverLimited = file.size / 1024 / 1024 < 10;
    if (!isOverLimited) {
      message.error('文件大小不能超过10MB!');
    }
    return isOverLimited;
  }

  onRemove = () => {
    this.setState({
      filePath: '',
      fileList: [],
      canUpload: true
    })
  }

  onChangeFile = (info) =>  {
    if(info.fileList.length > 0){
      this.setState({
        canUpload: false,
        fileList: info.fileList
      })
    }else{
      this.setState({
        canUpload: true
      })
    }
    if (info.file.status === 'done') {
      this.setState({
        filePath: info.file.response.data
      })
      message.success(`${info.file.name}上传成功！`);
      console.log(info)
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name}上传失败！`);
      console.log(info)
    }
  }
  
  render() {
    const { visible, fileRecordData, canEditFile, fileTypeData, ...props } = this.props;
    const { id, productId, fileName, filePath, fileType, canUpload, fileList } = this.state;

    const actionUrl = '/api/crm/productInfo/product/upload';
    
    return (
      <CustomModal
        canEdit={canEditFile}
        visible={visible}
        onOk={this.saveFn}
        onCancel={this.onCancelFn}
        title="附件编辑"
      >
        <div>
          <CustomItem
            type={canEditFile ? 'input' : 'inputShow'}
            canEdit={canEditFile}
            label="附件名称"
            value={fileName}
            onChange={e => {
              this.setState({ fileName: e.target.value });
            }}
          />
          <CustomItem
            type={canEditFile ? 'select' : 'inputShow'}
            label="附件类型"
            value={!canEditFile? fileType : this.props.showLabel(fileType, fileTypeData)}
            placeholder="请选择附件类型"
            options={fileTypeData}
            onChange={e => {
              this.setState({ fileType: e });
            }}
          />
          {
            !id
            ?
            <div className="uploadWrap">
              <Upload
                name='uploadFile'
                action={actionUrl}
                onRemove={this.onRemove}
                beforeUpload={this.beforeUpload}
                onChange={this.onChangeFile}
                disabled={!canUpload}
                fileList={fileList}
              >
                <Button disabled={!canUpload}>
                  <Icon type="upload" />上传附件
                </Button>
              </Upload>
            </div>
            :
            null
          }
        </div>
      </CustomModal>
    );
  }
}

const mapStateToProps = (state) => {
  const { product } = state;
  const { fileList } = product;
  const { eidtIsFailed, editIsLoading, editIsSuccess } = fileList;
  
  return {
    eidtIsFailed,
    editIsLoading,
    editIsSuccess,
  };
};

export default connect(mapStateToProps, {
  addFile,
  editFile
})(FileDetail);
