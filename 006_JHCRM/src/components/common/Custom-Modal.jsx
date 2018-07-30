import React, { Component } from 'react';
import { Modal, Button } from 'antd';

import './Custom-Modal.less';

export default class CustomModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  render() {
    const {
      title,
      visible,
      children,
      canEdit,   //  是否只是展示数据
    } = this.props;
    
    return (
      <Modal
        className="Custom-Modal"
        title={title || '信息编辑'}
        visible={visible}
        onOk={this.props.onOk}
        onCancel={this.props.onCancel}
        okText="确认"
        cancelText="取消"
        // closable={false}
        footer={
          canEdit ?
          [
            <Button key="ok" type="primary" onClick={this.props.onOk}>确定</Button>,
            <Button key="cancel" onClick={this.props.onCancel}>取消</Button>,
          ]
            :
            null
        }
      >
        {
          React.cloneElement(
            children
          )
        }
      </Modal>
    );
  }
}
