import React, { Component } from 'react';
import { connect } from 'react-redux';
import { message } from 'antd';
import CustomItem from '../../components/common/Custom-Item';
import {
  addCustomerForPC,
  customerAddEvent,
  customerDetail
} from '../../redux/ducks/customer/details/basicInfo';
import CustomModal from '../../components/common/Custom-Modal';

class CustomerDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOwn: 0,                 //  0-可以修改，1-不能修改
      customerId: '',           //  客户id
      customerNum: '',          //  客户编号，修改时必填
      fullName: '',             //  客户全称, 必填
      abbreviationName: '',     //  客户简称，必填
      openAccountDate: '',      //  开户时间
      address: '',              //  所在地点，必填
      introducer: '',           //  介绍人
      customerNature: 0,       //  客户性质
      customerType: '',         //  客户类型
      industryType: '',         //  行业分类
      keyEvent: '',             //  关键事件，增加时赋值
      remarks: '',              //  备注
      firstIncomeDate: '',      //  第一次入款时间
      userName: '',        // 销售经理
      reallyNum: '',        // 真实客户编码
    };
  }
  
  componentWillReceiveProps(nextProps) {
    if (!this.props.data || this.props.data !== nextProps.data) {
      const { data } = nextProps;
      if (data) {
        this.resetStateFn(data);
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
  saveCustomerFn = (state) => {
    if (!this.isInputValueLegal()) {
      return;
    }
    
    const { customerId, customerNum } = this.state;
  
    console.log(customerId);
  
    this.props.addCustomerForPC({ customerNum }, customerId, customerNum)
      .then(() => {
        const { addIsSuccess, addedErrorMsg, addIsFailed } = this.props;
        if (addIsSuccess && !addedErrorMsg) {
          this.props.hideEditModal();
          message.success('保存成功！');
        } else {
          message.error(addedErrorMsg || '保存失败！');
        }
      }).catch((error) => {
        console.error(error);
      });
  };
  
  //  判断输入的内容是否为空
  isInputValueLegal = () => {
    const { customerNum } = this.state;
    if (!customerNum) {
      message.warning('请输入客户编码！');
    } else {
      return true;
    }
  };
  
  resetStateFn = (data, id) => {
    this.setState({
      isOwn: data.isOwn || 0,
      customerId: data.id || '',
      customerNum: data.customerNum || '',
      fullName: data.fullName || '',
      abbreviationName: data.abbreviationName || '',
      openAccountDate: data.openAccountDate || '',
      address: data.address || '',
      introducer: data.introducer || '',
      customerType: (data.customerType || data.customerType === 0) ? data.customerType : '',
      industryType: (data.industryType || data.industryType === 0) ? data.industryType : '',
      keyEvent: data.keyEvent || '',
      remarks: data.remarks || '',
      firstIncomeDate: data.firstIncomeDate || '',
      userName: data.userName || '',
      reallyNum: data.reallyNum || ''
    });
  };
  
  //  判断性质/行业分类等接口获取数据的label显示
  showLabel = (code, type) => {
    const typeData = this.props.dictionaryData[type];
    let name = '';
    typeData && typeData.map(item => {
      if (code === item.code) {
        name = item.name;
      }
    });
    return name;
  };
  
  render() {
    const { dictionaryData, visible, data, canEdit, ...props } = this.props;
  
    const {
      customerNum,
      fullName,
      abbreviationName,
      openAccountDate,
      firstIncomeDate,
      address,
      introducer,
      customerNature,
      customerType,
      industryType,
      remarks,
      isOwn,
      keyEvent,
      userName,
      reallyNum
    } = this.state;
  
    return (
      <CustomModal
        canEdit={canEdit}
        visible={visible}
        onOk={this.saveCustomerFn}
        onCancel={this.onCancelFn}
        okText="确认"
        cancelText="取消"
        title="客户详情"
      >
        <div>
          <CustomItem
            type={canEdit ? 'input' : 'inputShow'}
            canEdit={canEdit}
            label="客户编码"
            value={customerNum}
            onChange={e => {
              this.setState({ customerNum: e.target.value });
            }}
          />
          <CustomItem
            type={canEdit ? 'input' : 'inputShow'}
            canEdit={false}
            label="真实客户编码"
            value={reallyNum}
            onChange={e => {
              this.setState({ reallyNum: e.target.value });
            }}
          />
          <CustomItem
            type={canEdit ? 'input' : 'inputShow'}
            canEdit={false}
            value={fullName}
            label="客户全称"
            placeholder={canEdit ? '请输入客户全称' : ''}
            onChange={e => {
              this.setState({ fullName: e.target.value });
            }}
          />
          <CustomItem
            type={canEdit ? 'input' : 'inputShow'}
            canEdit={false}
            label="所在地点"
            value={address}
            placeholder={canEdit ? '请输入地址' : ''}
            onChange={e => {
              this.setState({ address: e.target.value });
            }}
          />
          <CustomItem
            type={canEdit ? 'input' : 'inputShow'}
            canEdit={false}
            label="客户简称"
            value={abbreviationName}
            placeholder={canEdit ? '请输入客户简称' : ''}
            onChange={e => {
              this.setState({ abbreviationName: e.target.value });
            }}
          />
          <CustomItem
            type={canEdit ? 'input' : 'inputShow'}
            canEdit={false}
            label="介绍人"
            value={introducer}
            placeholder={canEdit ? '请输入介绍人' : ''}
            onChange={e => {
              this.setState({ introducer: e.target.value });
            }}
          />
          <CustomItem
            type={canEdit ? 'select' : 'inputShow'}
            canEdit={false}
            options={dictionaryData.industryType}
            label="行业分类"
            value={canEdit ? industryType : this.showLabel(industryType, 'industryType')}
            placeholder={canEdit ? '请选择行业分类' : ''}
            onChange={e => {
              this.setState({ industryType: e });
            }}
          />
          <CustomItem
            type={canEdit ? 'datePicker' : 'inputShow'}
            canEdit={false}
            label="第一次入款时间"
            value={firstIncomeDate}
            placeholder={canEdit ? '请选择第一次入款时间' : ''}
            onChange={(date, dateString) => {
              this.setState({ firstIncomeDate: dateString });
            }}
          />
          <CustomItem
            type={canEdit ? 'datePicker' : 'inputShow'}
            canEdit={false}
            label="开户时间"
            value={openAccountDate}
            placeholder={canEdit ? '请选择第一次开户时间' : ''}
            onChange={(date, dateString) => {
              this.setState({ openAccountDate: dateString });
            }}
          />
          <CustomItem
            type={canEdit ? 'textarea' : 'textareaShow'}
            isSingle
            canEdit={false}
            label="销售经理"
            value={userName}
            placeholder={canEdit ? '请选择销售经理' : ''}
            onChange={e => this.setState({ userName: e.target.value })}
          />
          <CustomItem
            type={canEdit ? 'textarea' : 'textareaShow'}
            isSingle
            canEdit={false}
            label="关键事件"
            value={keyEvent}
            placeholder={canEdit ? '请输入关键事件' : ''}
            onChange={e => this.setState({ keyEvent: e.target.value })}
          />
          <CustomItem
            type={canEdit ? 'textarea' : 'textareaShow'}
            isSingle
            canEdit={false}
            label="备注"
            value={remarks}
            placeholder={canEdit ? '请输入备注' : ''}
            onChange={e => this.setState({ remarks: e.target.value })}
          />
        </div>
      </CustomModal>
    );
  }
}

const mapStateToProps = (state) => {
  const { customer } = state;
  const { basicInfo } = customer;
  // const { data, eventData, addIsFailed, addIsLoading, addIsSuccess, addedId } = basicInfo;
  const { addIsFailed, addIsLoading, addIsSuccess, addedErrorMsg } = basicInfo;
  
  return {
    // data,
    addIsFailed,
    addIsLoading,
    addIsSuccess,
    addedErrorMsg,
    // eventData,
    // addedId,
    // dictionaryData: dictionaryData.data
  };
};

export default connect(mapStateToProps, {
  customerDetail,
  addCustomerForPC,
  customerAddEvent
})(CustomerDetail);
