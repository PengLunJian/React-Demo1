import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Upload, message, Button, Icon } from 'antd';
import CustomItem from '../../components/common/Custom-Item';
import {
  addUrl,
  editUrl
} from '../../redux/ducks/product/urlList';
import CustomModal from '../../components/common/Custom-Modal';

import './productDetail.less';
import './fileUpload.less';

class FileDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',          // 链接id
      productId: '',   // 产品id
      name: '',      // 产品分类id
      link: '',      // 产品名称
    };
  }
  
  //接收列表传过来的单条记录数据
  componentWillReceiveProps(nextProps) {
    if(!this.props.urlRecordData || this.props.urlRecordData !== nextProps.urlRecordData){
      const { urlRecordData } = nextProps;
      if (urlRecordData) {
        this.resetStateFn(urlRecordData);
      }
    }
  }

  resetStateFn = (data) => {
    const { recordData } = this.props;
    const { fundcode } = recordData;
    this.setState({
      id: data.id || '',
      productId: fundcode,
      name: data.name || '',      // 产品分类id
      link: data.link || ''
    });
  };

  //  取消-还原操作
  onCancelFn = () => {
    const { urlRecordData } = this.props;
    this.resetStateFn(urlRecordData);
    this.props.hideUrlDetail();
  }
  
  //  判断输入的内容是否为空
  isInputValueLegal = () => {
    const { name, link, fileType } = this.state;
    if (!name) {
      message.warning('请输入链接名称！');
      return false;
    } else if (!link) {
      message.warning('请输入链接地址！');
      return false;
    } else {
      return true;
    }
  };

  //  保存修改
  saveFn = () => {
    if (!this.isInputValueLegal()) {
      return;
    }

    const { id } = this.state;
    const copyParams = Object.assign({}, this.state);

    const newParams = {
      id,
      productId: copyParams.productId,  
      name: copyParams.name,  
      link: copyParams.link
    };

    // const newParams = {
    //   id,
    //   productId: '005090',   // 产品id
    //   name: '测试文件上传333',      // 产品分类id
    //   link: '/uploadfile/COMMON-WEB/CRM/201807/周工作安排.doc',      // 产品名称
    //   fileType: 1      // 发行日期
    // };

    if(id){   // 修改
      this.props.editUrl(newParams)
        .then(() => {
          const { editIsSuccess, eidtIsFailed } = this.props;
          if (editIsSuccess) {
            this.props.hideUrlDetail();
            this.props.loadUrlList();
            const { urlRecordData } = this.props;
            this.resetStateFn(urlRecordData);
            message.success('修改链接成功！');
          } else {
            message.error('修改链接失败！');
          }
        }).catch((error) => {
          console.error(error);
        });
    }else{   // 新增
      this.props.addUrl(newParams)
        .then(() => {
          const { editIsSuccess, eidtIsFailed } = this.props;
          if (editIsSuccess) {
            this.props.hideUrlDetail();
            this.props.loadUrlList();
            const { urlRecordData } = this.props;
            this.resetStateFn(urlRecordData);
            message.success('添加链接成功！');
          } else {
            message.error('添加链接失败！');
          }
        }).catch((error) => {
          console.error(error);
        });
    }
  };
  
  render() {
    const { visible, urlRecordData, canEditUrl, ...props } = this.props;
    const { id, productId, name, link } = this.state;
   
    return (
      <CustomModal
        canEdit={canEditUrl}
        visible={visible}
        onOk={this.saveFn}
        onCancel={this.onCancelFn}
        title="外链编辑"
      >
        <div>
          <CustomItem
            type={canEditUrl ? 'input' : 'inputShow'}
            canEdit={canEditUrl}
            label="链接名称"
            value={name}
            onChange={e => {
              this.setState({ name: e.target.value });
            }}
          />
          <CustomItem
            type={canEditUrl ? 'textarea' : 'textareaShow'}
            canEdit={canEditUrl}
            label="链接地址"
            value={link}
            onChange={e => {
              this.setState({ link: e.target.value });
            }}
            isSingle
          />
        </div>
      </CustomModal>
    );
  }
}

const mapStateToProps = (state) => {
  const { product } = state;
  const { urlList } = product;
  const { eidtIsFailed, editIsLoading, editIsSuccess } = urlList;
  
  return {
    eidtIsFailed,
    editIsLoading,
    editIsSuccess,
  };
};

export default connect(mapStateToProps, {
  addUrl,
  editUrl
})(FileDetail);
