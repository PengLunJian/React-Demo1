//  联系人资料
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  List,
  Toast,
  ActivityIndicator
} from 'antd-mobile';
import { WX_Promise } from '../../../service/wx';
import {
  ajax,
  JHCRM
} from '../../../service/ajax';
import {
  contactDetail,
  addContact
} from '../../../redux/ducks/contacts/contactDetail';
import {
  getAllCustomer
} from '../../../redux/ducks/customer/list';
import {
  getAllChannel
} from '../../../redux/ducks/channel/list';
import { getContacts, clearContacts } from '../../../redux/ducks/contacts/list';
import dataTimeFormatter from '../../../utils/dataTimeFormatter';
import { search2Obj } from '../../../utils/parseSearchString';
import EditItem from '../../common/EditItem';
import SaveBtnContainer from '../../common/SaveBtnContainer';
import isHavePermission from '../../../utils/isHavePermission';

import './index.less';

class ContactDetailIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOwn: 0,                 //  0-可以修改，1-不能修改
      contactsId: '',
      zhName: '',         //  中文名字，必填
      sex: 0,             //  性别
      enName: '',         //  英文名字
      birthday: '',       //  生日
      family: '',         //  家庭
      education: '',      //  教育背景
      department: '',     //  部门
      position: '',       //  职位
      phones: '',         //  电话，可多条
      emails: '',         //  邮箱，可多条
      postCode: '',       //  邮编
      fax: '',            //  传真
      contactsType: '',    //  所属客户/渠道，必填
      typeIds: '',        //  所属客户或渠道的所有id,只能选一个
      remarks: '',        //  备注
      //  创建人还没有
      defaultData: ['', ''],    //  取第一个所属客户/渠道 和 第一个id
      labelData: [
        {
          label: '客户',
          value: 0
        },
        {
          label: '渠道',
          value: 1
        }
      ],  //  自定义写死
      cardImagePath: '',  //  微信返回的path，需要在提交或保存时传给后端
      animating: false,
      isNull_zhName: false,
    };
    this.params = {
      from: '',  //来源：客户customer，渠道channel，联系人'', 拜访记录里面添加联系人VisitRecordDetails
      id: '',  //联系人id 编辑的时候才有
      typeId:'',   //来源是客户和渠道的话，typeId固定，隐藏客户/渠道选择项
      type: '',
      cols: 2,  //渠道/客户列数
      belongName: '所属客户/渠道'
    };
    this.listParams = {
      currentPage: 1,
      pageSize: 10,
      name: '',
      contactsType: '',
      typeId: '',
    };
    this.jsApiList = ['chooseImage', 'uploadImage'];  //  调用微信JSSDK用到的接口列表
  }
  
  componentDidMount() {
    const { match } = this.props;
    //来源
    this.params.from = this.props.location.search ? search2Obj(this.props.location.search).from : '';
    //客户或渠道的id
    this.params.typeId = this.props.location.search ? search2Obj(this.props.location.search).typeId : '';
    //联系人类型
    this.params.type = this.props.location.search ? search2Obj(this.props.location.search).type : '';
  
    Toast.loading('正在加载...', 0);
    this.props.getAllCustomer()
      .then(() => {
        this.props.getAllChannel()
            .then(() => {
              Toast.hide();
              const { allCustomer, allChannel } = this.props;
              let labelData = [];
              let contactsType = '';
              let defaultData = [];
              const customerChildren = [];
              const channelChildren = [];
              (allCustomer || []).map(item => {
                customerChildren.push({
                  label: item.fullName,
                  value: item.id
                });
              });
              (allChannel || []).map(item => {
                channelChildren.push({
                  label: item.fullName, //  todo: 修改字段名
                  value: item.id
                });
              });
              if(this.params.from){   //  //非联系人页面跳转过来的，有路由id则请求数据(拜访记录传过来的是客户或渠道id 不是联系人id 所以不请求数据)
                if (match.params && match.params.id && this.params.from !='VisitRecordDetails') {   //有联系人id而且不是拜访记录跳转过来的
                  this.props.contactDetail({ contactsId: match.params.id })
                      .then(() => {
                        const { data } = this.props;
                        this.resetStateFn(data, match.params.id);
                      })
                      .catch((error) => {
                        console.error(error);
                      });
                }else {
                  contactsType = this.params.type;
                  if(this.params.from === 'customer' || this.params.from === 'channel'){
                    defaultData = [this.params.typeId];
                  }else{
                    defaultData = [this.params.type,  this.params.typeId];
                  }
                }
                if(this.params.from === 'customer' || this.params.type==='0'){
                  this.params.belongName = '所属客户';
                  this.params.cols = 1;
                  labelData = customerChildren;
                }else if(this.params.from === 'channel' || this.params.type==='1'){
                  this.params.belongName = '所属渠道';
                  this.params.cols = 1;
                  labelData = channelChildren;
                }
              }else{
                if (match.params && match.params.id) {
                  this.props.contactDetail({ contactsId: match.params.id })
                      .then(() => {
                        const { data } = this.props;
                        this.resetStateFn(data, match.params.id);
                      })
                      .catch((error) => {
                        console.error(error);
                      });
                }
                labelData = [
                  {
                    label: '客户',
                    value: 0
                  },
                  {
                    label: '渠道',
                    value: 1
                  }
                ],
                labelData[0].children = customerChildren;  //  加入所有客户
                labelData[1].children = channelChildren;  //  加入所有渠道
              }
              
              this.setState({
                labelData,
                contactsType,
                defaultData,
                typeIds: this.params.typeId || ''
              });
            })
            .catch((error) => {
              console.error(error);
              Toast.fail('请求失败...');
            });
      })
      .catch((error) => {
        Toast.fail('请求失败...');
        console.error(error);
      });
    
    //  调用微信JSSDK
    WX_Promise({ jsApiList: this.jsApiList })
      .then(wx => {
        wx.checkJsApi({
          jsApiList: this.jsApiList,    // 需要检测的JS接口列表，所有JS接口列表见附录2,
          success: (res) => {
            // 以键值对的形式返回，可用的api值true，不可用为false
            // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
            const checkResult = res.checkResult;
            const hasValid = Object.values(checkResult).some(item => !item);
            if (hasValid) {
              this.onScanClick = () => {
                alert('您的当前环境不支持或者微信版本过低，将不能使用扫描名片功能');
              };
            }
          }
        });
      })
      .catch(err => {
        console.error(err);
      });
  }
  
  //  扫描（拍照）上传名片
  onScanClick = () => {
    WX_Promise()
      .then(wx => {
        wx.chooseImage({
          count: 1,
          success: (res) => {
            const localIds = res.localIds;
            const localId = localIds[0];
  
            Toast.loading('正在读取名片...', 0);
            wx.uploadImage({
              localId,
              success: res => {
                this.setState({
                  animating: true
                });
                const id = res.serverId;
  
                ajax({
                  method: 'get',
                  url: JHCRM.getURL('card_readCard', { id })
                })
                  .then(res => {
                    Toast.hide();
                    const data = res.data.data;
                    let contactsId = '';
                    const { match } = this.props;
                    if (match.params && match.params.id) {
                      contactsId = match.params.id;
                    }
                    this.resetStateFn(data, contactsId);
                    this.setState({
                      animating: false,
                      cardImagePath: data.cardImagePath
                    });
                  })
                  .catch(err => {
                    Toast.fail('读取失败...', 2);
                    console.error(err);
                  });
              },
              fail: res => {
                Toast.fail('读取失败...', 2);
                console.log(res.errMsg);
              }
            });
          }
        });
      })
      .catch(err => {
        console.error(err);
      });
  };
  
  resetStateFn = (data, id) => {
    const {
      contactsType,
      customerDTOS,
      channelDTOS
    } = data;
    
    //  判断是客户还是渠道，赋值id
    let typeIds = '';
    if (contactsType === 0) {
      if (customerDTOS && customerDTOS.length) {
        typeIds = customerDTOS[0].id;
      }
    } else if (contactsType === 1) {
      if (channelDTOS && channelDTOS.length) {
        typeIds = channelDTOS[0].id;
      }
    }
    
    this.setState({
      contactsId: id || '',
      isOwn: data.isOwn || 0,
      zhName: data.zhName || '',
      sex: data.sex || 0,
      enName: data.enName || '',
      birthday: data.birthday || '',
      family: data.family || '',
      education: data.education || '',
      department: data.department || '',
      position: data.position || '',
      phones: data.phones || '',
      emails: data.emails || '',
      postCode: data.postCode || '',
      fax: data.fax || '',
      contactsType: data.contactsType || '',
      typeIds,
      remarks: data.remarks || '',
      defaultData: this.params.from ? [typeIds] : [contactsType, typeIds]
    });
  };
  
  //  新增联系人
  addContactsFn = (state) => {
    const { birthday, defaultData } = this.state;
    if (!this.isInputValueLegal()) {
      return;
    }
    const customerInfo = Object.assign({}, this.state);
    //  状态填写
    customerInfo.state = state;
    //  清空多余的字段
    customerInfo.labelData = '';
    customerInfo.defaultData = '';
    customerInfo.typeIds = (defaultData && defaultData.length > 1) ? defaultData[1] : customerInfo.typeIds;
    customerInfo.contactsType = (defaultData && defaultData.length > 1) ? defaultData[0] : customerInfo.contactsType;
    //  生日格式化
    customerInfo.birthday = birthday ? dataTimeFormatter(birthday, 2) : '';
    //  可多条数据处理
    customerInfo.phones = '';
    this.state.phones.split(',').map(item => {
      if (item) {
        customerInfo.phones += item + ',';
      }
    });
    customerInfo.phones = customerInfo.phones.substring(0, customerInfo.phones.length - 1);
    
    this.props.addContact(customerInfo, customerInfo.contactsId)
      .then(() => {
        const { history, match, addIsSuccess, addIsFailed } = this.props;
        //  操作提示
        if(customerInfo.contactsId){  //修改
          if (addIsSuccess) {
            Toast.success('更改联系人成功！', 1);
            // history.goBack();
          } else if (addIsFailed) {
            Toast.fail('更改联系人失败', 1);
          }
        }else{   //添加
          if (addIsSuccess) {
            Toast.success('添加联系人成功！', 1);
            //刷新联系人列表的参数处理
            if(this.params.from){
              this.listParams.typeId = (defaultData && defaultData.length > 1) ? defaultData[1] : customerInfo.typeIds;
              this.listParams.contactsType = (defaultData && defaultData.length > 1) ? defaultData[0] : customerInfo.contactsType;
            }
            this.props.clearContacts();
            this.props.getContacts(this.listParams);
          } else if (addIsFailed) {
            Toast.fail('添加联系人失败', 1);
          }
        }
        this.resetStateFn(this.props.data, this.props.addedId);
        //  替换页面
        if (!match.params || !match.params.id) {
          history.replace({
            pathname: `${match.url}/` + this.props.addedId
          });
        }
      })
      .then(() => {
        if ('VisitRecordDetails' === this.params.from) {   //如果上级是拜访记录,返回上级页面
          // const { history } = this.props;
          // history.goBack();
        }
        const { history } = this.props;
        history.goBack();  // 添加成功后返回上级页面
      })
      .catch((error) => {
        console.error(error);
      });
  };
  
  //  判断输入的内容是否为空
  isInputValueLegal = () => {
    const { zhName } = this.state;
    this.setState({
      isNull_zhName: !zhName ? true : false
    })
    if (!zhName) {
      Toast.info('请输入姓名！', 1);
    } else {
      return true;
    }
  };
  
  //  添加行
  addMultiplyInput = (key) => {
    if (!this.state[key]) {
      Toast.info('请先填写！', 1);
      return;
    }
    
    const nowStateArr = this.state[key].split(',');
    for (let i = 0; i < nowStateArr.length; i++) {
      if (!nowStateArr[i]) {
        Toast.info('请先填写！', 1);
        return;
      }
    }
    
    this.setState({
      [key]: this.state[key] + ','
    });
  };
  
  //  多行的change事件
  multiplyInputChange = (value, index, key) => {
    if (this.state[key]) {
      const newArr = this.state[key].split(',');
      newArr[index] = value;
      this.setState({
        [key]: newArr.join(',')
      });
    } else {
      this.setState({
        [key]: value
      });
    }
  };
  
  render() {
    const {
      isOwn,
      zhName,
      sex,
      enName,
      birthday,
      family,
      education,
      department,
      position,
      phones,
      emails,
      postCode,
      fax,
      contactsType,
      remarks,
      defaultData,
      labelData,
      animating,
      isNull_zhName
    } = this.state;
    
    const { roles } = this.props;
    const { belongName, cols } = this.params;

    const canEdit = (isOwn === 0 || isOwn === '0') && !isHavePermission(roles, 1) && !isHavePermission(roles, 3);
    
    return (
      <div className="ContactDetailIndex">
        {
          canEdit &&
          <div className="sanner fs-15" onClick={this.onScanClick}>
            <span>扫描名片</span>
          </div>
        }
        
        <List>
          <EditItem
            type={canEdit ? 'input' : 'inputShow'}
            label="姓名"
            isNull={isNull_zhName}
            value={zhName}
            placeholder="请输入姓名"
            onChange={value => {
              this.setState({ 
                zhName: value,
                isNull_zhName: !value ? true : false, 
              });
            }}
          />
          <EditItem
            type="radio"
            label="性别"
            value={sex}
            options={[
              {
                label: '男',
                value: 0
              }, {
                label: '女',
                value: 1
              }
            ]}
            onChange={value => {
              if (!canEdit) {
                return;
              }
              this.setState({ sex: value });
            }}
          />
          <EditItem
            type={canEdit ? 'input' : 'inputShow'}
            label="英文名"
            value={enName}
            placeholder="请输入英文名"
            onChange={value => {
              this.setState({ enName: value });
            }}
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
          <EditItem
            type={canEdit ? 'input' : 'inputShow'}
            label="家庭"
            value={family}
            placeholder="请输入家庭"
            onChange={value => {
              this.setState({ family: value });
            }}
          />
          <EditItem
            type={canEdit ? 'input' : 'inputShow'}
            label="教育背景"
            value={education}
            placeholder="请输入教育背景"
            onChange={value => {
              this.setState({ education: value });
            }}
          />
        </List>
        
        <List>
          <EditItem
            type={canEdit ? 'input' : 'inputShow'}
            label="部门"
            value={department}
            placeholder="请输入部门"
            onChange={value => {
              this.setState({ department: value });
            }}
          />
          <EditItem
            type={canEdit ? 'input' : 'inputShow'}
            label="职位"
            value={position}
            placeholder="请输入职位"
            onChange={value => {
              this.setState({ position: value });
            }}
          />
          <EditItem
            type="multiplyInput"
            canEdit={canEdit}
            label="电话"
            value={phones}
            placeholder="请输入电话"
            onChange={(value, index) => this.multiplyInputChange(value, index, 'phones')}
            addFn={() => this.addMultiplyInput('phones')}
          />
          <EditItem
            type="multiplyInput"
            canEdit={canEdit}
            label="邮箱"
            value={emails}
            placeholder="请输入邮箱"
            onChange={(value, index) => this.multiplyInputChange(value, index, 'emails')}
            addFn={() => this.addMultiplyInput('emails')}
          />
          <EditItem
            type={canEdit ? 'input' : 'inputShow'}
            label="传真"
            value={fax}
            placeholder="请输入传真号"
            onChange={value => {
              this.setState({ fax: value });
            }}
          />
          <EditItem
            type={canEdit ? 'input' : 'inputShow'}
            label="邮编"
            value={postCode}
            placeholder="请输入邮编"
            onChange={value => {
              this.setState({ postCode: value });
            }}
          />
          {
            !this.params.typeId
            ?
            <EditItem
              canEdit={canEdit}
              disabled={!canEdit}
              type="picker"
              cascade
              cols={cols}
              pickerDatas={labelData}
              value={defaultData}
              label={belongName}
              placeholder="请选择"
              onOk={v => {
                this.setState({ defaultData: v });
              }}
            />
            :
            null
          }
          
        </List>
        
        <List>
          <EditItem
            type={canEdit ? 'input' : 'inputShow'}
            label="备注"
            value={remarks}
            placeholder="请输入备注"
            onChange={value => {
              this.setState({ remarks: value });
            }}
          />
        </List>
        
        {
          canEdit && <SaveBtnContainer saveFn={(state) => this.addContactsFn(state)} />
        }
        
        <ActivityIndicator
          toast
          text="加载中..."
          animating={animating}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  // console.log(state);
  const { customer, channel, contacts, loginStatus } = state;
  const { allCustomer } = customer.list;
  const { allChannel } = channel.list;
  const { cotactDetail, list } = contacts;
  const { data, eventData, addIsFailed, addIsLoading, addIsSuccess, addedId } = cotactDetail;
  
  return {
    data,
    addIsFailed,
    addIsLoading,
    addIsSuccess,
    eventData,
    addedId,
    allCustomer,
    allChannel,
    list,
    roles: loginStatus.roles || []
  };
};

export default connect(mapStateToProps, {
  contactDetail,
  addContact,
  getAllCustomer,
  getAllChannel,
  getContacts,
  clearContacts
})(ContactDetailIndex);
