import React, { Component } from 'react';
import { connect } from 'react-redux';
import { message, Checkbox, Row, Col } from 'antd';
import CustomItem from '../../components/common/Custom-Item';
import {
  bindUserForPC,
  customerAddEvent,
  customerDetail
} from '../../redux/ducks/customer/details/basicInfo';
import { getUserInfo } from '../../redux/ducks/customer/details/visitRecordAdd';
import CustomModal from '../../components/common/Custom-Modal';

import './CustomerDetail.less';

class CustomerDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customerNum: '',    // 客户编号
      fullName: '',          //  客户名称
      customerType: '',     //  客户类别
      address: '',          //  住址
      idCard: '',     // 身份证号
      birthday: '',   // 生日
      phone: '',      // 手机
      userInfos: [],   // 已绑定的用户
      selectedUsers: []  // 已选择的用户
    };
  }

  componentDidMount() {
   this.props.getUserInfo();
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
    const { customerNum, selectedUsers } = this.state;

    let userIds = '';
    (selectedUsers || []).map(item => {
      userIds += item + ',';
    })
    userIds = userIds.length > 1 ? userIds.slice(0, userIds.length - 1) : userIds;
  
    this.props.bindUserForPC({ custNo:customerNum, userIds }, customerNum, userIds)
      .then(() => {
        const { addIsSuccess, addedErrorMsg, addIsFailed } = this.props;
        if (addIsSuccess && !addedErrorMsg) {
          this.props.hideEditModal();
          message.success('分配销售经理成功！');
        } else {
          message.error(addedErrorMsg || '分配销售经理失败！');
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
  
  resetStateFn = (data) => {
    const ids = [];
    (data.userInfos || []).map(item => {
      ids.push(item.userNo)
    })
    this.setState({
      customerNum: data.customerNum || '',
      fullName: data.fullName || '',
      customerType: (data.customerType
        || data.customerType === 0) ? [data.customerType] : [],
      address: data.address || '',
      idCard: data.idCard || '',
      birthday: data.birthday || '',
      phone: data.phone || '',
      userInfos: data.userInfos || [],
      selectedUsers: ids || []
    });
  };
  
  //  判断性质/行业分类等接口获取数据的label显示
  showLabel = (code, type) => {
    const typeData = this.props.dictionaryData[type];
    let name = '';
    typeData && typeData.map(item => {
      if (code == item.code) {
        name = item.name;
      }
    });
    return name;
  };

  //点击选择用户
  onChange = (checkedValues) => {
    this.setState({
        selectedUsers:checkedValues,
    })
  }
  
  render() {
    const { dictionaryData, visible, data, canEdit, allUsersData, ...props } = this.props;
  
    const {
      customerNum,
      fullName,
      customerType,
      address,
      idCard,
      birthday,
      phone,
      userInfos,
      selectedUsers
    } = this.state;

    let newAllUsersData = [];
    (allUsersData || []).map(item => {
      newAllUsersData.push({
        name: item.name || '--',
        id: item.id
      })
    })

    let newUserInfos = [];
    (userInfos || []).map(item => {
      newUserInfos.push({
        name: item.userName || '--',
        id: item.userNo
      })
    })

    if(!canEdit){
      newAllUsersData = newUserInfos;
    }
  
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
            canEdit={false}
            label="客户编码"
            value={customerNum}
            onChange={e => {
              this.setState({ customerNum: e.target.value });
            }}
          />
          <CustomItem
            type={canEdit ? 'input' : 'inputShow'}
            canEdit={false}
            value={fullName}
            label="客户名称"
            placeholder="请输入客户名称"
            onChange={e => {
              this.setState({ fullName: e.target.value });
            }}
          />
          <CustomItem
            type={canEdit ? 'select' : 'inputShow'}
            canEdit={false}
            label="客户类型"
            value={canEdit ? customerType : this.showLabel(customerType, 'customerType')}
            placeholder="请选择客户类型"
            options={dictionaryData.customerType}
            onChange={e => {
              this.setState({ customerType: e.target.value });
            }}
          />
          <CustomItem
            type={canEdit ? 'input' : 'inputShow'}
            canEdit={false}
            label="生日"
            value={birthday}
            placeholder="请输入生日"
            onChange={e => {
              this.setState({ birthday: e.target.value });
            }}
          />
          <CustomItem
            type={canEdit ? 'input' : 'inputShow'}
            canEdit={false}
            label="电话"
            value={phone}
            placeholder="请选择电话"
            onChange={e => {
              this.setState({ phone: e });
            }}
          />
          <CustomItem
            type={canEdit ? 'textarea' : 'textareaShow'}
            canEdit={false}
            label="所在地点"
            value={address}
            placeholder="请输入所在地点"
            isSingle
            onChange={e => {
              this.setState({ address: e.target.value });
            }}
          />
          {<div className="userBind">
            <div className="title">分配销售经理：</div>
            <div className="checkBoxWrap">
              <Checkbox.Group disabled={!canEdit} style={{ width: '100%', padding: '15px', maxHeight: '300px', overflowY: 'auto' }}
                onChange={this.onChange}
                value={selectedUsers}
              >
                <Row>
                  {
                    newAllUsersData && newAllUsersData.map((item) => {
                      return (
                        <Col key={item.id} span={5}><Checkbox value={item.id}>{item.name}</Checkbox></Col>
                      )
                    })
                  }
                </Row>
              </Checkbox.Group>
            </div>
          </div>}
        </div>
      </CustomModal>
    );
  }
}

const mapStateToProps = (state) => {
  const { customer } = state;
  const { basicInfo, visitRecordAdd } = customer;
  const { addIsFailed, addIsLoading, addIsSuccess, addedErrorMsg } = basicInfo;
  
  return {
    addIsFailed,
    addIsLoading,
    addIsSuccess,
    addedErrorMsg,
    allUsersData: visitRecordAdd.dataUsers
  };
};

export default connect(mapStateToProps, {
  customerDetail,
  bindUserForPC,
  customerAddEvent,
  getUserInfo
})(CustomerDetail);
