import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Checkbox, Row, Col, message } from 'antd';
import {
  getUserInfo,
} from '../../redux/ducks/customer/details/visitRecordAdd';
import {
  setPerminssion
} from '../../redux/ducks/channel/details/basicInfo';

import './ChannelPermission.less';

//checkBox容器
const CheckBoxItem = ({data, onChange, value}) => {
  return(
    <Checkbox.Group style={{ width: '100%', padding: '15px', maxHeight: '300px', overflowY: 'auto' }}
      onChange={onChange}
      value={value}
    >
      <Row>
        {
          data && data.map((item) => {
            return (
              <Col key={item.id} span={8}><Checkbox value={item.id}>{item.name}</Checkbox></Col>
            )
          })
        }
      </Row>
    </Checkbox.Group>
  )
}

class ChannelPermission extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selUserData: [],  //已选的用户数组
    };
  }

  componentWillMount() {
    this.props.getUserInfo();
  }
  
  componentWillReceiveProps(nextProps) {
    if (this.props.recordData !== nextProps) {
      const { recordData } = nextProps;
      if (recordData) {
        let selData = [];
        (recordData.users || []).map(item => {
          selData.push(item.id);
        })
        this.setState({
          selUserData: selData
        });
      }
    }
  }
  
  //  保存修改
  saveChannelFn = (state) => {
    const { selUserData } = this.state;
    
    const ChannelInfo = Object.assign({}, this.props.recordData);
    const selStr = selUserData.join();
    ChannelInfo.userIds = selStr;
    ChannelInfo.channelId = ChannelInfo.channelNum;
  
    this.props.setPerminssion({channelId: ChannelInfo.channelId, userIds: ChannelInfo.userIds})
      .then(() => {
        this.props.hidePermissionModel();
        this.props.loadData();
        message.success("授权成功！");
      })
      .catch((error) => {
        message.success("授权失败！");
        console.log(error);
      })
  };
  
  //点击选择用户
  onChange = (checkedValues) => {
    this.setState({
        selUserData:checkedValues,
    })
  }

  hidePermissionModel = () => {
    this.props.hidePermissionModel && this.props.hidePermissionModel();
    this.state = {
      selUserData: [],
    };
  }
  
  render() {
    const { visible, visitRecordAdd, ...props } = this.props;
    const { selUserData } = this.state;
    
    const selArr = [];
    visitRecordAdd.dataUsers && visitRecordAdd.dataUsers.map((item) => {
      selUserData && selUserData.map((selItem) => {
        if(item.id === selItem){
          selArr.push(item)
        }
      })
    })
  
    return (
      <Modal
        className="ChannelPermission"
        title="渠道授权"
        visible={visible}
        onOk={this.saveChannelFn}
        onCancel={this.props.hidePermissionModel}
        okText="确认"
        cancelText="取消"
      >
      <div className="ratioWrap">
        <div className="ratioBox ratioBox_left">
          <div className="ratioTitle">所有用户</div>
          <CheckBoxItem 
            onChange={this.onChange} 
            value={this.state.selUserData}
            data={visitRecordAdd.dataUsers}
          />
        </div>
        <div className="midWrap"></div>
        <div className="ratioBox ratioBox_left">
          <div className="ratioTitle">已选用户</div>
          <CheckBoxItem 
            onChange={this.onChange} 
            value={this.state.selUserData}
            data={selArr}
          />
        </div>
      </div>
        
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  const { customer } = state;
  const { visitRecordAdd } = customer;
  
  return {
    visitRecordAdd
  };
};

export default connect(mapStateToProps, {
  getUserInfo,
  setPerminssion
})(ChannelPermission);