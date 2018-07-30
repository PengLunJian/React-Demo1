import React, { Component } from 'react';
import { connect } from 'react-redux';
import { message } from 'antd';
import CustomItem from '../../components/common/Custom-Item';
import CustomModal from '../../components/common/Custom-Modal';
import dateFormatter from '../../utils/dataTimeFormatter';

export default class VisitRecordDetail extends Component {
  constructor(props) {
    super(props);
    this.details = {
      userName: '',        //  报告人
      subject: '',         //  拜访主题
      visitDate: '',       //  拜访时间
      visitType: '',        //  拜访形式
      createDate: '',           //  提交日期
      type: '',              //  拜访对象类型
      customersInfo: '',           //  拜访对象
      contactsInfo: '',         //  被拜访人
      product: '',         //  涉及产品
      usersInfo: '',              //  同行人
      imageInfo: []
    };
  }
  
  //接收列表传过来的单条记录数据
  componentWillReceiveProps(nextProps) {
    if (!this.props.recordData || this.props.recordData !== nextProps.recordData) {
      const { recordData } = nextProps;
      if (recordData) {
        this.resetStateFn(recordData);
      }
    }
  }
  
  //  取消-还原操作
  onCancelFn = () => {
    const { data } = this.props;
    // this.resetStateFn(data);
    this.props.hideEditModal();
  }

  //  判断性质/行业分类等接口获取数据的label显示
  showLabel = (code, type) => {
    const typeData = this.props.dictionaryData.data && this.props.dictionaryData.data[type];
    let name = '';
    typeData && typeData.map(item => {
      if (code === item.code) {
        name = item.name;
      }
    });
    return name;
  };

  //取多条数据里面的单个字段名称集合
  gatherLabel = (data, label) => {
    let labels = [];
    data && data.map(item => {
      if(item[label]){
        labels.push(item[label])
      }
    })
    return labels.join()
  }

  resetStateFn = (data) => {
    const { dictionaryData } = this.props;
    const theType = data.channelsInfo ? 'channelNature' : 'customerNature';
    const visitObj = data.channelsInfo ? data.channelsInfo : data.customersInfo;
    this.details = {
      userName: data.userName || '',        
      subject: data.subject || '',         
      visitDate: data.visitDate && dateFormatter(data.visitDate, 2) || '',       
      visitType: (data.visitType || data.visitType===0) && this.showLabel(data.visitType, 'visitType') || '',       
      createDate: data.createDate && dateFormatter(data.createDate, 2) || '',           
      type: (data.type || data.type==0) ? data.type == 0 ? '客户' : '渠道' : '',        
      customersInfo: this.gatherLabel(visitObj, 'name'),          
      contactsInfo: data.contactsInfo && this.gatherLabel(data.contactsInfo, 'name') || '',        
      product: data.product && this.gatherLabel(data.product, 'name') || '',               
      usersInfo: data.usersInfo && this.gatherLabel(data.usersInfo, 'name') || '',   
      imageInfo: data.imageInfo || []             
    };
  };
  
  render() {
    const { dictionaryData, visible, recordData, canEdit, ...props } = this.props;
    
    const {
      userName,        
      subject,         
      visitDate,      
      visitType,       
      createDate,         
      type,              
      customersInfo,           
      contactsInfo,         
      product,        
      usersInfo, 
      imageInfo
    } = this.details;
  
    return (
      <CustomModal
        canEdit={canEdit}
        visible={visible}
        onOk={this.saveCardFn}
        onCancel={this.onCancelFn}
        okText="确认"
        cancelText="取消"
        title="拜访记录详情"
      >
        <div>
          <CustomItem
            type={'inputShow'}
            canEdit={false}
            label="报告人"
            value={userName}
          />
          <CustomItem
            type={'inputShow'}
            canEdit={false}
            label="拜访主题"
            value={subject}
          />
          <CustomItem
            type={'inputShow'}
            canEdit={false}
            label="拜访时间"
            value={visitDate}
          />
          <CustomItem
            type={'inputShow'}
            canEdit={false}
            label="拜访形式"
            value={visitType}
          />
          <CustomItem
            type={'inputShow'}
            canEdit={false}
            label="提交日期"
            value={createDate}
          />
          <CustomItem
            type={'inputShow'}
            canEdit={false}
            label="拜访对象类型"
            value={type}
          />
          <CustomItem
            type={'inputShow'}
            canEdit={false}
            label="拜访对象"
            value={customersInfo}
          />
          <CustomItem
            type={'inputShow'}
            canEdit={false}
            label="被拜访人"
            value={contactsInfo}
          />
          <CustomItem
            type={'inputShow'}
            canEdit={false}
            label="涉及产品"
            value={product}
          />
          <CustomItem
            type={'inputShow'}
            canEdit={false}
            label="同行人"
            value={usersInfo}
          />
          <CustomItem
            type={'images'}
            label="图片信息"
            imageData={imageInfo}
            isSingle
          />
          
        </div>
      </CustomModal>
    );
  }
}