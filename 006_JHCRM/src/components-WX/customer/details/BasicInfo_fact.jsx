//  客户详情-事实-基本信息
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  List,
  Toast
} from 'antd-mobile';
import dataTimeFormatter from '../../../utils/dataTimeFormatter';
import { search2Obj } from '../../../utils/parseSearchString';
import {
  getCustomerDetail_fact
} from '../../../redux/ducks/customer/factDetail';
import { getDictionary } from '../../../redux/ducks/customer/searchDictionary';
import {
  CUSTOMER_DETAIL,
  CUSTOMER_DETAIL_EVENT
} from '../../../constants/routes';
import EditItem from '../../common/EditItem';
import SaveBtnContainer from '../../common/SaveBtnContainer';
import isHavePermission from '../../../utils/isHavePermission';

import './BasicInfo.less';

class BasicInfo_fact extends Component {
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

    };
    this.params = {
      type: '2'
    };
    this.listParams = {
      currentPage: 1,
      pageSize: 10,
      name: ''
    };
  }
  
  componentDidMount() {
    Toast.loading('正在加载...', 0);
    const { match, location } = this.props;
    const tabNature = search2Obj(location.search).tabNature;
    this.props.getDictionary(this.params)
        .then(() => {
          Toast.hide();
        })
        .catch(err => {
          console.error(err);
        });
    //  有路由id则请求数据
    if (match.params && match.params.id) {
      this.props.getCustomerDetail_fact({ custNo: match.params.id })
      .then(() => {
        const { data } = this.props;
        this.resetStateFn(data, match.params.id);
      })
      .catch((error) => {
        console.error(error);
        Toast.fail('请求失败...');
      });
    }
  }
  
  resetStateFn = (data, id) => {
    if (!data) {
      return;
    }
    this.setState({
      customerNum: data.customerNum || '',
      fullName: data.fullName || '',
      customerType: (data.customerType
        || data.customerType === 0) ? [data.customerType] : [],
      address: data.address || '',
      idCard: data.idCard || '',
      birthday: data.birthday || '',
      phone: data.phone || '',
    });
  };
  
  render() {
    const {
      customerNum,
      fullName,
      customerType,
      address,
      idCard,
      birthday,
      phone
    } = this.state;

    const { dictionaryData, roles } = this.props;

    const canEdit = isHavePermission(roles, 3) ? isHavePermission(roles, 3) : false;
    
    //  antd-mobile特殊需要的data格式处理
    const customerTypes = [(dictionaryData.customerType || []).map((item) => ({
      label: item.name,
      value: item.code
    }))];
    
    return (
      <div className="BasicInfo_customer">
        <List>
          {
            customerNum && customerNum !== ''
              ?
              <EditItem
                type="inputShow"
                label="客户编号"
                value={customerNum}
              />
              :
              null
          }
          
          <EditItem
            type='inputShow'
            label="客户名称"
            value={fullName}
          />
          <EditItem
            disabled={true}
            canEdit={false}
            type="picker"
            label="客户类型"
            pickerDatas={customerTypes}
            value={customerType}
          />
          :
          <EditItem
            type='inputShow'
            label="住址"
            value={address}
          />
          {/*<EditItem
            type='inputShow'
            label="身份证号"
            value={idCard}
          />*/}
          <EditItem
            type='inputShow'
            label="生日"
            value={birthday}
          />
          <EditItem
            type='inputShow'
            label="电话"
            value={phone}
          />
          
        </List>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { customer, loginStatus } = state;
  const { customerDetail_fact, dictionaryData, factList } = customer;
  const { data } = customerDetail_fact;
  
  return {
    data,
    dictionaryData: dictionaryData.data,
    factList,
    roles: loginStatus.roles || []
  };
};

export default connect(mapStateToProps, {
  getCustomerDetail_fact,
  getDictionary
})(BasicInfo_fact);
