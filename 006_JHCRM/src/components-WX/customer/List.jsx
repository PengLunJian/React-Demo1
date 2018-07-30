//  客户-列表
import React, { Component } from 'react';
import { connect } from 'react-redux';
import HighList from '../../hoc-WX/HighList';
import ListItem from '../common/ListItem';
import { CUSTOMER_DETAIL } from '../../constants/routes';
import isHavePermission from '../../utils/isHavePermission';

import './List.less';

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  //  判断客户类型
  showLabel = (code) => {
    const { customerType } = this.props;
    let name = '';
    customerType && customerType.map(item => {
      if (code.toString() === item.code.toString()) {
        name = item.name;
      }
    });
    return name;
  };

  formatUserame = (arr) => {
    let str = '';
    if(arr && arr.length > 0){
      arr.map(item => {
        str += (item.userName || '--') + '，';
      })
      str = str.length > 1 ? str.slice(0, str.length - 1) : str;
    }
    return str;
  }
  
  render() {
    const { data, deleteItemFn, roles, ...props } = this.props;

    return (
      data && data.map(item => (
        <ListItem
          key={item.id}
          data={item}
          deleteItemFn={deleteItemFn}
          hideDelete={item.isOwn !== 0 || isHavePermission(roles, 1) || isHavePermission(roles, 3)}
          nature="customerNature"
          {...props}
        >
          <div className={`CustomerListItem info ${item.reallyNum || item.reallyNum === '1' ? 'reallyNum' : ''}`}>
            <div>
              <span className={`title width_60${item.state === '0' || item.state === 0 ? ' width_50' : ''}`}>{item.fullName || '--'}</span>
              {
                item.phone
                ?
                <span>手机号：{item.phone}</span>
                :
                null
              }
              <span className="right">
                {
                  item.state === 0 || item.state === '0' ?
                    <span className="state fs-9">草稿</span>
                    :
                    null
                }
                {/*客户类型：0个人，1机构，2产品*/}
                {
                  item.customerType || item.customerType === 0 ?
                    <span className="tag fs-9">{this.showLabel(item.customerType)}</span>
                    :
                    null
                }
                
              </span>
            </div>
            <div className="fs-12 bot">
              {
                item.userInfos
                ?
                <span>客户经理：{this.formatUserame(item.userInfos)}</span>
                :
                <span>客户经理：{item.userName || '--'}</span>
              }
              { 
                /*事实客户显示开户时间，潜在客户显示创建时间*/
                item.customerNature === 0 || item.customerNature === '0'
                ?
                <span>创建时间：{item.createDate || '--'}</span>
                :
                null
              }
            </div>
          </div>
        </ListItem>
      ))
    );
  }
}

const ListComponent = HighList()(List);

const mapStateToProps = (state) => {
  const { loginStatus } = state;
  
  return {
    roles: loginStatus.roles || []
  };
};

export default connect(mapStateToProps, {})(ListComponent);

// export default ListComponent;
