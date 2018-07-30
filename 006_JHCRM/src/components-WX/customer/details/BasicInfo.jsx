//  客户详情-基本信息
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  List,
  Toast
} from 'antd-mobile';
import dataTimeFormatter from '../../../utils/dataTimeFormatter';
import { search2Obj } from '../../../utils/parseSearchString';
import {
  customerDetail,
  addCustomer,
  customerAddEvent
} from '../../../redux/ducks/customer/details/basicInfo';
import {
  getCustomer,
  clearCustomer
} from '../../../redux/ducks/customer/list';
import { getDictionary } from '../../../redux/ducks/customer/searchDictionary';
import {
  CUSTOMER_DETAIL,
  CUSTOMER_DETAIL_EVENT
} from '../../../constants/routes';
import EditItem from '../../common/EditItem';
import SaveBtnContainer from '../../common/SaveBtnContainer';
import isHavePermission from '../../../utils/isHavePermission';

import './BasicInfo.less';

class BasicInfo extends Component {
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
      customerNature: [0],       //  客户性质
      customerType: [],         //  客户类型
      industryType: [],         //  行业分类
      keyEvent: '',             //  关键事件，增加时赋值
      remarks: '',              //  备注
      firstIncomeDate: '',      //  第一次入款时间
      state: '',
      isNull_fullName: false,
      isNull_abbreviationName: false,
      isNull_address: false,
      isNull_idCard: false,
      isNull_phone: false,
      idCard: '',     // 身份证号
      birthday: '',   // 生日
      phone: '',      // 手机
      reallyNum: ''   // 真实客户编码
    };
    this.params = {
      type: '1,2,3,4'
    };
    this.listParams = {
      currentPage: 1,
      pageSize: 10,
      customerNature: 0,
      key: '',
      address: ''
    };
  }
  
  componentDidMount() {
    Toast.loading('正在加载...', 0);
    const { match, location } = this.props;
    this.props.getDictionary(this.params)
        .then(() => {
          Toast.hide();
        })
        .catch(err => {
          console.error(err);
        });
    //  有路由id则请求数据
    if (match.params && match.params.id) {
      this.props.customerDetail({ customerId: match.params.id })
          .then(() => {
            const { data } = this.props;
            this.resetStateFn(data, match.params.id);
            this.props.customerAddEvent(data.keyEvent);
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
      isOwn: data.isOwn || 0,
      customerId: id || '',
      customerNum: data.customerNum || '',
      fullName: data.fullName || '',
      abbreviationName: data.abbreviationName || '',
      openAccountDate: data.openAccountDate || '',
      address: data.address || '',
      introducer: data.introducer || '',
      customerType: (data.customerType
        || data.customerType === 0) ? [data.customerType] : [],
      industryType: (data.industryType
        || data.industryType === 0) ? [data.industryType] : [],
      keyEvent: data.keyEvent || '',
      remarks: data.remarks || '',
      firstIncomeDate: data.firstIncomeDate || '',
      state: data.state || '',
      idCard: data.idCard || '',
      birthday: data.birthday || '',
      phone: data.phone || '',
      userName: data.userName || '',
      createDate: data.createDate || '',
      reallyNum: data.reallyNum || ''
    });
  };
  
  //  新增客户
  addCustomerFn = (state) => {
    const {
      openAccountDate, firstIncomeDate,
      customerNature, customerType, industryType, reallyNum
    } = this.state;
    
    if (state === 0 && (this.state.state === 1 || this.state.state === '1')) {
      Toast.fail('已经提交过的客户不允许保存，请直接提交！', 1);
      return;
    }
    
    if (!this.isInputValueLegal()) {
      return;
    }
    
    const customerInfo = Object.assign({}, this.state);
    //  状态填写
    customerInfo.state = state;
    //  加入关键事件
    customerInfo.keyEvent = this.props.eventData;
    //  开户时间格式化
    customerInfo.openAccountDate = openAccountDate ? dataTimeFormatter(openAccountDate, 2) : '';
    customerInfo.firstIncomeDate = firstIncomeDate ? dataTimeFormatter(firstIncomeDate) : '';
    
    //  类型处理
    customerInfo.customerNature = customerNature && customerNature.length ? customerNature[0] : '';
    customerInfo.customerType = customerType && customerType.length ? customerType[0] : '';
    customerInfo.industryType = industryType && industryType.length ? industryType[0] : '';
    
    //  增加或修改客户数据（若为增加 则替换页面）
    this.props.addCustomer(customerInfo, this.props.match.params.id)
        .then(() => {
          const { history, match, addIsSuccess, addIsFailed } = this.props;
      
          //  操作提示
          if (match.params.id) {  //修改
            if (addIsSuccess) {
              Toast.success('更改客户成功！', 1);
              history.goBack();
            } else if (addIsFailed) {
              Toast.fail('更改客户失败', 1);
            }
          } else {   //添加
            if (addIsSuccess) {
              Toast.success('添加客户成功！', 1);
              this.props.clearCustomer();
              this.props.getCustomer(this.listParams);
              history.goBack();
            } else if (addIsFailed) {
              Toast.fail('添加客户失败', 1);
            }
          }
          this.resetStateFn(this.props.data, this.props.addedId);
      
          //  获取当前url中的customerNature，以判断是否需要replace页面
          const { location, data } = this.props;
          const { search } = location;
          let nowUrlcustomerNature = '';
          let nowState = '';
          if (search) {
            const customerNature = search2Obj(search).customerNature;
            const state = search2Obj(search).state;
            nowUrlcustomerNature = customerNature;
            nowState = state;
          }
      
          //  替换页面
          if (!match.params || !match.params.id || !nowUrlcustomerNature || (nowUrlcustomerNature.toString() !== data.customerNature.toString()) || !nowState || (nowState.toString() !== data.state.toString())) {
            history.replace({
              pathname: CUSTOMER_DETAIL + '/' + this.props.addedId,
              search: '?customerNature=' + data.customerNature + '&state=' + data.state + '&reallyNum=' + reallyNum
            });
          }
        })
        .catch((error) => {
          console.error(error);
        });
  };
  
  //  判断输入的内容是否为空
  isInputValueLegal = () => {
    const { fullName, abbreviationName, address, idCard, phone } = this.state;
    const reg_id = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/; 
    const reg_phone = /^[1][3,4,5,7,8][0-9]{9}$/;
    this.setState({
      isNull_fullName: !fullName ? true : false,
      isNull_abbreviationName: !abbreviationName ? true : false,
      isNull_address: !address ? true : false
    })
    
    if (!fullName) {
      Toast.info('请输入客户全称！', 1);
    } else if (!abbreviationName) {
      Toast.info('请输入客户简称！', 1);
    } else if (!address) {
      Toast.info('请输入客户地址！', 1);
    } else if (idCard && !reg_id.test(idCard)) {
      this.setState({
        isNull_idCard: true
      })
      Toast.info('身份证号格式有误！', 1);
    } else if (phone && !reg_phone.test(phone)) {
      this.setState({
        isNull_phone: true
      })
      Toast.info('手机号格式有误！', 1);
    } else {
      return true;
    }
  };
  
  render() {
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
      isNull_fullName,
      isNull_abbreviationName,
      isNull_address,
      isNull_idCard,
      isNull_phone,
      idCard,
      birthday,
      phone,
      reallyNum
    } = this.state;
    
    const { eventData, dictionaryData, roles } = this.props;

    const canEdit = (customerNature[0] === '0' || customerNature[0] === 0) && !isHavePermission(roles, 1) && !isHavePermission(roles, 3);
    
    //  antd-mobile特殊需要的data格式处理
    const customerNatureOptions = [(dictionaryData.customerNature || []).map((item) => ({
      label: item.name,
      value: item.code
    }))];
    const customerTypes = [(dictionaryData.customerType || []).map((item) => ({
      label: item.name,
      value: item.code
    }))];
    const industyClassify = [(dictionaryData.industryType || []).map((item) => ({
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
                label="客户编码"
                value={customerNum}
              />
              :
              null
          }
          <EditItem
            type={canEdit ? 'input' : 'inputShow'}
            label="真实客户编码"
            value={reallyNum}
            onChange={value => {
              this.setState({ 
                reallyNum: value,
              });
            }}
          />
          <EditItem
            type={canEdit ? 'input' : 'inputShow'}
            label="客户全称"
            value={fullName}
            placeholder="请输入客户全称"
            isNull={isNull_fullName}
            onChange={value => {
              this.setState({ 
                fullName: value,
                isNull_fullName: !value ? true : false,
              });
            }}
          />
          <EditItem
            type={canEdit ? 'input' : 'inputShow'}
            label="客户简称"
            isNull={isNull_abbreviationName}
            value={abbreviationName}
            placeholder="请输入客户简称"
            onChange={value => {
              this.setState({ 
                abbreviationName: value,
                isNull_abbreviationName: !value ? true : false
             });
            }}
          />
          
          <EditItem
            disabled={!canEdit}
            canEdit={canEdit}
            mode="date"
            type="datePicker"
            label="开户时间"
            value={openAccountDate ? new Date(openAccountDate) : ''}
            placeholder="请选择"
            onChange={date => {
              this.setState({ openAccountDate: date });
            }}
          />
          <EditItem
            disabled={!canEdit}
            canEdit={canEdit}
            type="datePicker"
            label="第一次入款时间"
            value={firstIncomeDate ? new Date(firstIncomeDate) : ''}
            placeholder="请选择"
            onChange={date => {
              this.setState({ firstIncomeDate: date });
            }}
          />
        </List>
        
        <List>
          <EditItem
            type={canEdit ? 'input' : 'inputShow'}
            // type="input"
            label="所在地点"
            isNull={isNull_address}
            value={address}
            placeholder="请输入客户地址"
            onChange={value => {
              this.setState({ 
                address: value,
                isNull_address: !value ? true : false, 
              });
            }}
          />
          <EditItem
            type={canEdit ? 'input' : 'inputShow'}
            // type="input"
            label="介绍人"
            value={introducer}
            placeholder="请输入名称"
            onChange={date => {
              this.setState({ introducer: date });
            }}
          />
          
          {/*<EditItem
            disabled={true}
            canEdit={false}
            type="picker"
            pickerDatas={customerNatureOptions}
            value={customerNature}
            label="客户性质"
            placeholder="请选择"
            onOk={v => {
              this.setState({ customerNature: v });
            }}
          />*/}
          {
            <EditItem
              disabled={!canEdit}
              canEdit={canEdit}
              type="picker"
              label="客户类型"
              placeholder="请选择"
              pickerDatas={customerTypes}
              value={customerType}
              onOk={v => this.setState({ customerType: v })}
            />
          }
          
          <EditItem
            disabled={!canEdit}
            canEdit={canEdit}
            type="picker"
            label="行业分类"
            placeholder="请选择"
            pickerDatas={industyClassify}
            value={industryType}
            onOk={v => this.setState({ industryType: v })}
          />
          <EditItem
            disabled={!canEdit}
            canEdit={canEdit}
            mode="date"
            type="datePicker"
            label="生日"
            value={birthday ? new Date(birthday) : ''}
            placeholder="请选择"
            onChange={date => {
              this.setState({ birthday: date });
            }}
          />
          {/*<EditItem
            type={canEdit ? 'input' : 'inputShow'}
            label="身份证号"
            value={idCard}
            placeholder="请输入身份证号"
            isNull={isNull_idCard}
            onChange={value => {
              this.setState({ idCard: value });
              if(!value){
                this.setState({
                  isNull_idCard: false
                })
              }
            }}
          />*/}
          <EditItem
            type={canEdit ? 'input' : 'inputShow'}
            label="手机号"
            value={phone}
            placeholder="请输入手机号"
            isNull={isNull_phone}
            onChange={value => {
              this.setState({ phone: value });
              if(value === ''){
                this.setState({
                  isNull_phone: false
                })
              }
            }}
          />
        </List>
        
        <List>
          <EditItem
            type={canEdit ? 'input' : 'inputShow'}
            // type="input"
            label="备注"
            value={remarks}
            placeholder="请输入备注"
            onChange={value => {
              this.setState({ remarks: value });
            }}
          />
          
          <EditItem
            type="inputShow"
            value={eventData}
            arrow
            canEdit={canEdit}
            label="关键事件"
            placeholder="请输入"
            onClick={() => {
              if (!canEdit) {
                return;
              }
              const { history, match } = this.props;
              history.push(match.url + CUSTOMER_DETAIL_EVENT);
            }}
          />
        </List>
        
        {
          canEdit && <SaveBtnContainer saveFn={(state) => this.addCustomerFn(state)} />
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { customer, loginStatus } = state;
  const { basicInfo, dictionaryData, list } = customer;
  const { data, eventData, addIsFailed, addIsLoading, addIsSuccess, addedId } = basicInfo;
  
  return {
    data,
    addIsFailed,
    addIsLoading,
    addIsSuccess,
    eventData,
    addedId,
    dictionaryData: dictionaryData.data,
    list,
    roles: loginStatus.roles || []
  };
};

export default connect(mapStateToProps, {
  customerDetail,
  addCustomer,
  getDictionary,
  customerAddEvent,
  getCustomer,
  clearCustomer
})(BasicInfo);
