import React, { Component } from 'react';
import { connect } from 'react-redux';
import { message } from 'antd';
import CustomItem from '../../components/common/Custom-Item';
import CustomModal from '../../components/common/Custom-Modal';

class contactDetail extends Component {
  constructor(props) {
    super(props);
    this.details = {
      contactId: '',        //  联系人id
      birthday: '',         //  生日
      department: '',       //  部门
      education: '',        //  教育学历
      emails: '',           //  邮箱
      fax: '',              //  传真
      phones: '',           //  电话（多条）
      position: '',         //  职位
      postCode: '',         //  邮编
      sex: '',              //  性别 0：男 1：女
      zhName: '',           //  姓名
      enName: '',           //  英文姓名
      contactsType: '',     //  所属客户/渠道
      phoneTags: [],
      emailTags: [],
    };
  }

  componentWillMount() {
    if (this.props.recordData) {
      this.resetStateFn(this.props.recordData);
    }
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

  resetStateFn = (data) => {
    this.details = {
      contactId: data.id || '',                   
      birthday: data.birthday || '',              
      department: data.department || '',          
      education: data.education || '',             
      emails: data.emails || '',                  
      fax: data.fax || '',                         
      phones: data.phones || '',                   
      position: data.position || '',              
      postCode: data.postCode || '',              
      sex: data.sex ? (data.sex === 0 ? '男' : '女') : '',                    
      zhName: data.zhName || '',                   
      phoneTags: data.phones ? data.phones.split(',') : [],
      emailTags: data.emails ? data.emails.split(',') : [],
      contactsType: data.contactsType ? (data.contactsType === 0 ? '客户' : '渠道') : '',
    };
  };
  
  render() {
    const { dictionaryData, visible, recordData, canEdit, ...props } = this.props;
    
    const {
      birthday,
      department,
      education,
      emails,
      fax,       
      phones,
      position,
      postCode,
      sex,
      zhName,
      phoneTags,
      emailTags,
      enName,
      contactsType
    } = this.details;
  
    return (
      <CustomModal
        canEdit={canEdit}
        visible={visible}
        onOk={this.saveCardFn}
        onCancel={this.onCancelFn}
        okText="确认"
        cancelText="取消"
        title="联系人详情"
      >
        <div>
          <CustomItem
            type={canEdit ? 'input' : 'inputShow'}
            canEdit={canEdit}
            label="姓名"
            value={zhName}
            onChange={e => {
              this.setState({ zhName: e.target.value });
            }}
          />
          <CustomItem
            type={canEdit ? 'input' : 'inputShow'}
            canEdit={canEdit}
            label="英文名"
            value={enName}
            onChange={e => {
              this.setState({ enName: e.target.value });
            }}
          />
          <CustomItem
            type={canEdit ? 'input' : 'inputShow'}
            canEdit={canEdit}
            label="所属类型"
            value={contactsType}
            onChange={e => {
              this.setState({ contactsType: e.target.value });
            }}
          />
          <CustomItem
            type={canEdit ? 'input' : 'inputShow'}
            label="部门名称"
            value={department}
            placeholder="请输入部门名称"
            onChange={e => {
              this.setState({ department: e.target.value });
            }}
          />
          <CustomItem
            type={canEdit ? 'input' : 'inputShow'}
            label="职位"
            value={position}
            placeholder="请填写职位"
            onChange={e => {
              this.setState({ position: e.target.value });
            }}
          />
          <CustomItem
            type={canEdit ? 'input' : 'inputShow'}
            label="邮编"
            value={postCode}
            placeholder="请输入邮编"
            onChange={e => {
              this.setState({ postCode: e.target.value });
            }}
          />
          <CustomItem
            type={canEdit ? 'input' : 'inputShow'}
            label="传真"
            value={fax}
            placeholder="请输入传真号"
            onChange={e => {
              this.setState({ fax: e.target.value });
            }}
          />
          <CustomItem
            type={canEdit ? 'input' : 'inputShow'}
            label="性别"
            value={sex}
            placeholder="请选择性别"
            onChange={e => {
              this.setState({ sex: e });
            }}
          />
          <CustomItem
            type={canEdit ? 'datePicker' : 'inputShow'}
            label="生日"
            value={birthday}
            placeholder="请选择生日"
            onChange={(date, dateString) => {
              this.setState({ birthday: dateString });
            }}
          />
          <CustomItem
            type={canEdit ? 'input' : 'inputShow'}
            label="教育"
            value={education}
            placeholder="请输入教育学历"
            onChange={e => {
              this.setState({ education: e.target.value });
            }}
          />
          <CustomItem 
            type={canEdit ? 'multiTags' : 'multiTags'}
            label="电话"
            tagsData={phoneTags}
            isSingle
            canEdit={canEdit}
          />
          <CustomItem 
            type={'multiTags'}
            label="邮箱"
            tagsData={emailTags}
            isSingle
            canEdit={canEdit}
          />
        </div>
      </CustomModal>
    );
  }
}

const mapStateToProps = (state) => {
  
  return {
    
  };
};

export default connect(mapStateToProps, {
  
})(contactDetail);
