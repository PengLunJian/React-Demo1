import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  List,
  Toast
} from 'antd-mobile';
import { WX_Promise } from '../../../service/wx';
import {
  saveVisitRecord,
  clearVisitRecord,
  visitRecordSearch
} from '../../../redux/ducks/customer/details/visitRecord';
import {
  uploadImages,
  clearImages
} from '../../../redux/ducks/customer/details/updateImages';
import {
  getContacts,
  getUserInfo,
  getProducts,
  getDictionary,
  getVisitRecordDetails
} from '../../../redux/ducks/customer/details/visitRecordAdd';
import WithTopTitle from '../../../components-WX/common/WithTopTitle';
import EditItem from '../../common/EditItem';
import {
  UPLOAD_IMAGES,
  CONTACT_DETAIL,
  CUSTOMER_DETAIL,
  CHANNEL_DETAIL,
  ADD_VISIT_RECORD,
  VISIT_RECORD_PROBLEM_EDIT
} from '../../../constants/routes';
import dateFormatter from '../../../utils/dataTimeFormatter';
import { search2Obj } from '../../../utils/parseSearchString';
import isHavePermission from '../../../utils/isHavePermission';

import './VisitRecordAdd.less';

class VisitRecordAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOwn: 0,
      visitSubject: '',
      visitAddress: '',
      visitTime: '',
      visitPerson: [],
      visitUsers: [],
      visitType: [],
      visitProduct: [],
      visitContent: '',
      isNull_visitSubject: false,
      isNull_visitAddress: false,
      isNull_visitTime: false,
      isNull_visitType: false
    };
    this.contactsParams = {
      contactsType: search2Obj(this.props.location.search).contactId || '0',
      typeId: props.match.params.id
    };
    this.dictionaryParams = {
      type: 5
    };
    this.jsApiList = ['chooseImage', 'getLocalImgData', 'uploadImage'];
  }
  
  componentDidMount() {
    this.props.getContacts(this.contactsParams);
    this.props.getDictionary(this.dictionaryParams);
    this.props.getProducts();
    this.props.getUserInfo();
    
    const recordId = this.props.match.params.recordId;
    if (recordId) { //编辑
      Toast.loading('正在加载...', 0);
      const params = { visitRecordId: recordId };
      this.props.getVisitRecordDetails(params)
          .then(() => {
            const { visitRecordAdd } = this.props;
            const { dataDetails } = visitRecordAdd;
            this.resetStateFn(dataDetails);
            Toast.hide();
          })
          .catch((error) => {
            console.error(error);
            Toast.fail('请求失败...');
          });
    }
    
    //  调用微信JSSDK
    WX_Promise({ jsApiList: this.jsApiList })
      .then(wx => {
        wx.checkJsApi({
          jsApiList: this.jsApiList,  // 需要检测的JS接口列表，所有JS接口列表见附录2,
          success: (res) => {
            // 以键值对的形式返回，可用的api值true，不可用为false
            // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
            const checkResult = res.checkResult;
            const hasValid = Object.values(checkResult).some(item => !item);
            if (hasValid) {
              alert('您的微信版本过低，将不能使用扫描名片功能');
            }
          }
        });
      })
      .catch(err => {
        console.error(err);
      });
  }
  
  componentWillReceiveProps(nextProps) {
    const value_1 = this.props.location.search ?
      search2Obj(this.props.location.search).from : '';
    const value_2 = nextProps.location.search ?
      search2Obj(nextProps.location.search).from : '';
    if (value_1 !== value_2 && value_1 === 'VisitRecordDetails') {
      this.props.getContacts(this.contactsParams)
          .then(() => {
            const { cotactDetail } = this.props;
            const { addedId } = cotactDetail;
            if (addedId) {
              const selectedContact = [addedId] || '';
              this.setState({
                visitPerson: selectedContact
              });
            }
          })
          .catch((err) => {
            console.log(err);
          });
    }
  }
  
  componentWillUnmount() {
    this.props.clearImages();
  }
  
  getImagesSrc = () => {
    let tempStr = '';
    let imagesSrc = '';
    const { images } = this.props;
    for (let i = 0; i < images.length; i++) {
      tempStr = i === images.length - 1 ? '' : ',';
      imagesSrc += images[i].src + tempStr;
    }
    tempStr = null;
    return imagesSrc;
  };
  
  resetStateFn = (data, id) => {
    if (!data) return;
    this.setState({
      isOwn: 0,
      visitRecordId: id || '',
      visitSubject: data.subject || '',
      visitAddress: data.address || '',
      visitTime: new Date(data.visitDate) || '',
      visitPerson: (data.contactsInfo && data.contactsInfo.length)
        ? [data.contactsInfo[0].id] : [],
      visitUsers: (data.usersInfo && data.usersInfo.length)
        ? [data.usersInfo[0].id] : [],
      visitType: (data.visitType || data.visitType === 0)
        ? [data.visitType] : [],
      visitProduct: (data.product && data.product.length)
        ? [data.product[0].id] : [],
      visitContent: data.content || ''
    });
  };
  
  saveVisitRecordFn = (state) => {
    const id = this.props.match.params.id;
    const type = this.props.location.search ?
      search2Obj(this.props.location.search).from : '0';
    const recordId = this.props.match.params.recordId || '';
    const {
      visitSubject,
      visitAddress,
      visitTime,
      visitPerson,
      visitUsers,
      visitType,
      visitProduct
    } = this.state;
    
    const params = {
      state: state,
      visitRecordId: recordId,
      subject: visitSubject,
      address: visitAddress,
      type: type,
      visitDate: dateFormatter(new Date(visitTime).getTime(), 2),
      content: this.props.eventData,
      image: this.getImagesSrc(),
      typeId: id,
      contactsId: visitPerson
      && visitPerson.length ? visitPerson[0] : '',
      accompanyPeoplesId: visitUsers
      && visitUsers.length ? visitUsers[0] : '',
      visitType: visitType
      && visitType.length ? visitType[0] : '',
      productInfoId: visitProduct
      && visitProduct.length ? visitProduct[0] : ''
    };
    
    if (this.checkInput()) {
      // 根据判断是否有图片进行提交
      // if (this.props.images.length) {
      Toast.loading('上传中...', 0);
      this.uploadImage()
          .then((res) => {
            params.image = res || '';
            return this.props.saveVisitRecord(params, this.props.match.params.recordId);
          })
          .then(() => {
            const {
              history, match, addIsSuccess,
              addIsFailed, addedId
            } = this.props;
            Toast.hide();
            if (match.params.recordId) { // 修改
              if (addIsSuccess) {
                Toast.success('拜访记录修改成功！', 1);
                // 无论成功还是失败都去刷新拜访记录列表
                this.props.clearVisitRecord();
                this.props.visitRecordSearch({
                  currentPage: 1,
                  pageSize: 5,
                  type: type || '0',
                  typeId: match.params.id,
                  name: ''//关键字
                });
                history.goBack();
              } else if (addIsFailed) {
                Toast.fail('拜访记录修改失败！', 1);
              }
            } else { // 新增
              if (addIsSuccess) {
                Toast.success('拜访记录新增成功！', 1);
                history.goBack();
                // 无论成功还是失败都去刷新拜访记录列表
                this.props.clearVisitRecord();
                this.props.visitRecordSearch({
                  currentPage: 1,
                  pageSize: 5,
                  type: type || '0',
                  typeId: match.params.id,
                  name: ''//关键字
                });
              } else if (addIsFailed) {
                Toast.fail('拜访记录新增失败！', 1);
              }
            }
        
            const prevId = match.params.id;
            if (type && type === '1') {
              history.replace({
                pathname: CHANNEL_DETAIL + '/' + prevId
                + ADD_VISIT_RECORD + '/' + addedId,
                search: '?from=' + type + '&contactId=1'
              });
            } else {
              history.replace({
                pathname: CUSTOMER_DETAIL + '/' + prevId
                + ADD_VISIT_RECORD + '/' + addedId,
                search: '?contactId=0'
              });
            }
          })
          .catch((error) => {
            Toast.fail('请求失败...');
            console.error(error);
          });
    }
  };
  
  checkInput = () => {
    const {
      visitSubject,
      visitAddress,
      visitTime,
      visitType,
    } = this.state;
    this.setState({
      isNull_visitSubject: !visitSubject ? true : false,
      isNull_visitAddress: !visitAddress ? true : false,
      isNull_visitTime: !visitTime ? true : false,
      isNull_visitType: !visitType || visitType.length < 1 ? true : false
    })
    if (!visitSubject) {
      Toast.info('请输入拜访主题！', 1);
    } else if (!visitAddress) {
      Toast.info('请输入拜访地点！', 1);
    } else if (!visitTime) {
      Toast.info('请选择拜访时间！', 1);
    } else if (!visitType.length) {
      Toast.info('请选择拜访形式！', 1);
    } else {
      return true;
    }
  };
  
  uploadImage = () => {
    const { images } = this.props;
    return new Promise((resolve, reject) => {
      if (images && images.length) {
        //  如果images不存在本地chooseImage选择的图片，则不需要调用uploadPhoto接口
        if (images.every(item => !item.localId)) {
          resolve(images.map(image => image.src).join(','));
        } else {
          const serverIdArr = [];
          const srcArr = [];
          WX_Promise()
            .then(wx => {
              const length = images.length;
              const fn = (_i) => {
                if (_i < length) {
                  const image = images[_i];
                  const localId = image.localId;
                  if (localId) {
                    wx.uploadImage({
                      localId: localId,
                      isShowProgressTips: 1,
                      success: (res) => {
                        const serverId = res.serverId; // 返回图片的服务器端ID
                        serverIdArr.push(serverId);
                      },
                      fail: (err) => {
                        console.error(err);
                      },
                      complete: () => {
                        if (_i === images.length - 1) {
                          this.props.uploadImages(serverIdArr.join(','))
                              .then(res => {
                                const srcs = res.response.data.data || '';
                                resolve(srcArr.concat(srcs).join(','));
                              })
                              .catch(err => {
                                reject(err);
                              });
                        } else {
                          fn(++_i);
                        }
                      }
                    });
                  } else {
                    srcArr.push(image.src);
                    if (_i === images.length - 1) {
                      this.props.uploadImages(serverIdArr.join(','))
                          .then(res => {
                            const srcs = res.response.data.data || '';
                            resolve(srcArr.concat(srcs).join(','));
                          })
                          .catch(err => {
                            reject(err);
                          });
                    } else {
                      fn(++_i);
                    }
                  }
                }
              };
              fn(0);
            })
            .catch(err => {
              reject(err);
            });
        }
      } else {
        resolve();
      }
    });
  };
  
  openAddContact = () => {
    const { history, match } = this.props;
    history.push({
      pathname: match.url + CONTACT_DETAIL,
      search: '?from=VisitRecordDetails&type='
      + this.contactsParams.contactsType
      + '&typeId=' + match.params.id
    });
  };
  
  render() {
    const {
      isOwn,
      visitSubject,
      visitAddress,
      visitTime,
      visitPerson,
      visitUsers,
      visitType,
      visitProduct,
      isNull_visitSubject,
      isNull_visitAddress,
      isNull_visitTime,
      isNull_visitType
    } = this.state;
    const { visitRecordAdd, images, roles } = this.props;
    const { eventData } = visitRecordAdd;
    const canEdit = (isOwn === 0 || isOwn === '0') && !isHavePermission(roles, 1) && !isHavePermission(roles, 3);
    
    const VISIT_DATA_2 = [
      (visitRecordAdd.dataContacts
        || []).map((item) => ({
        label: item.name,
        value: item.id
      }))
    ];
    const VISIT_DATA_3 = [
      (visitRecordAdd.dataUsers
        || []).map((item) => ({
        label: item.name,
        value: item.id
      }))
    ];
    const VISIT_DATA_4 = [
      (visitRecordAdd.dataDictionary
        || []).map((item) => ({
        label: item.name,
        value: item.code
      }))
    ];
    const VISIT_DATA_5 = [
      (visitRecordAdd.dataProducts
        || []).map((item) => ({
        label: item.fundname,
        value: item.fundcode
      }))
    ];

    const value_visitUsers = [];
    visitRecordAdd.dataUsers && visitRecordAdd.dataUsers.map(item => {
      if(item.id === visitUsers[0]){
        value_visitUsers.push(visitUsers[0])
      }
    })
    
    const newImages = images.length > 4 ?
      images.slice(0, 4) : images;
    
    return (
      <WithTopTitle 
        title="拜访信息"
        className="hasBack"
        hasBack
      >
        <div className="AddVisitRecordContainer">
          <div className="AddVisitRecordContent">
            <div className="AddVisitRecordHeader" />
            <div className="AddVisitRecordBody">
              <List>
                <EditItem
                  type={canEdit ? 'input' : 'inputShow'}
                  label="拜访主题"
                  isNull={isNull_visitSubject}
                  value={visitSubject}
                  placeholder="请输入拜访主题"
                  onChange={value => {
                    this.setState({ 
                      visitSubject: value,
                      isNull_visitSubject: !value ? true : false
                    });
                  }}
                />
                <EditItem
                  type={canEdit ? 'input' : 'inputShow'}
                  label="拜访地点"
                  isNull={isNull_visitAddress}
                  value={visitAddress}
                  placeholder="请输入拜访地点"
                  onChange={value => {
                    this.setState({ 
                      visitAddress: value,
                      isNull_visitAddress: !value ? true : false, 
                    });
                  }}
                />
                <EditItem
                  canEdit={canEdit}
                  disabled={!canEdit}
                  mode="date"
                  type="datePicker"
                  label="被拜访时间"
                  isNull={isNull_visitTime}
                  placeholder="请选择"
                  value={visitTime}
                  onChange={v => {
                    this.setState({ 
                      visitTime: v,
                      isNull_visitTime: !v ? true : false 
                    });
                  }}
                />
                <div className="EditGroup">
                  <EditItem
                    canEdit={canEdit}
                    disabled={!canEdit}
                    type="picker"
                    label="被拜访人"
                    placeholder=" "
                    pickerDatas={VISIT_DATA_2}
                    value={visitPerson}
                    onOk={v => this.setState({ visitPerson: v })}
                  />
                  {
                    canEdit
                    ?
                    <button className="btn-add" onClick={this.openAddContact}>&nbsp;</button>
                    :
                    null
                  }
                </div>
                <EditItem
                  canEdit={canEdit}
                  disabled={!canEdit}
                  type="picker"
                  label="同行人"
                  value={value_visitUsers}
                  pickerDatas={VISIT_DATA_3}
                  placeholder="请选择"
                  onOk={value => this.setState({ visitUsers: value })}
                />
                <EditItem
                  canEdit={canEdit}
                  disabled={!canEdit}
                  type="picker"
                  label="拜访形式"
                  isNull={isNull_visitType}
                  placeholder="请选择"
                  value={visitType}
                  pickerDatas={VISIT_DATA_4}
                  onOk={value => this.setState({ 
                    visitType: value,
                    isNull_visitType: !value ? true : false, 
                  })}
                />
                <EditItem
                  canEdit={canEdit}
                  disabled={!canEdit}
                  type="picker"
                  label="涉及产品"
                  placeholder="请选择"
                  value={visitProduct}
                  pickerDatas={VISIT_DATA_5}
                  onOk={value => this.setState({ visitProduct: value })}
                />
              </List>
              
              <List
                onClick={
                  () => {
                    const { history, match } = this.props;
                    console.log(canEdit)
                    if(canEdit){
                      history.push(match.url + VISIT_RECORD_PROBLEM_EDIT);
                    }
                  }
                }
              >
                <EditItem
                  canEdit={canEdit}
                  type={canEdit ? 'input' : 'inputShow'}
                  value={eventData}
                  arrow
                  label="内容问题及跟进"
                  placeholder="请输入"
                />
              </List>
              
              <List
                onClick={
                  () => {
                    const { history, match } = this.props;
                    if(canEdit){
                      history.push(match.url + UPLOAD_IMAGES);
                    }
                  }
                }
              >
                <EditItem
                  canEdit={canEdit}
                  label="拜访照片"
                  arrow
                  placeholder=""
                />
                {
                  newImages && newImages.length ?
                    <div className="img">
                      {
                        newImages.map(item => (
                          <div className="item" key={item.id || item.localId}>
                            <img src={item.src} alt="" />
                          </div>
                        ))
                      }
                    </div> : null
                }
              </List>
            </div>
            {
              canEdit
              ?
              <div className="AddVisitRecordFooter">
                <div className="saveContainer fs-16">
                  <div onClick={() => this.saveVisitRecordFn(0)}>保存</div>
                  <div onClick={() => this.saveVisitRecordFn(1)}>提交</div>
                </div>
              </div>
              :
              null
            }
          </div>
        </div>
      </WithTopTitle>
    );
  }
}

const mapStateToProps = (state) => {
  const { customer, contacts, loginStatus } = state;
  const {
    visitRecord,
    visitRecordAdd,
    updateImages
  } = customer;
  const {
    data,
    addIsFailed,
    addIsLoading,
    addIsSuccess,
    addedId
  } = visitRecord;
  
  const {
    eventData,
    dataDetails
  } = visitRecordAdd;
  
  const { images } = updateImages;
  const { cotactDetail } = contacts;
  
  return {
    data,
    addIsFailed,
    addIsLoading,
    addIsSuccess,
    eventData,
    addedId,
    visitRecordAdd,
    images,
    dataDetails,
    cotactDetail,
    roles: loginStatus.roles || []
  };
};

export default connect(mapStateToProps, {
  getContacts,
  getUserInfo,
  getProducts,
  getDictionary,
  getVisitRecordDetails,
  saveVisitRecord,
  uploadImages,
  clearImages,
  clearVisitRecord,
  visitRecordSearch
})(VisitRecordAdd);
