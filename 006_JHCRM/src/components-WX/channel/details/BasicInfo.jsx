//  渠道详情-基本信息
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List, Toast } from 'antd-mobile';
import { CHANNEL_DETAIL } from '../../../constants/routes';
import { channelDetail, addChannel } from '../../../redux/ducks/channel/details/basicInfo';
import {
  getChannel,
  clearChannel
} from '../../../redux/ducks/channel/list';
import {
  getAllChannel
} from '../../../redux/ducks/channel/list';
import EditItem from '../../common/EditItem';
import { search2Obj } from '../../../utils/parseSearchString';
import SaveBtnContainer from '../../common/SaveBtnContainer';
import isHavePermission from '../../../utils/isHavePermission';

import './BasicInfo.less';

class BasicInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      channelNum: '',
      parentId: '',
      fullName: '',
      abbreviationName: '',
      remarks: '',
      customerManager: '',
      parentId: '',
      state: '',
      channelNature: 0,
      isNull_fullName: false,
      isNull_abbreviationName: false,
      reallyNum: ''
    }
    this.params = {
      type: '1,2,3,4'
    };
    this.listParams = {
      currentPage: 1,
      pageSize: 10,
      channelNature: 0
    };
  }
  
  componentDidMount() {
    this.props.getAllChannel();
    const { match } = this.props;
    //  有路由id则请求数据
    if (match.params && match.params.id) {
      Toast.loading('正在加载...');
      this.props.channelDetail({ channelId: match.params.id })
          .then(() => {
            Toast.hide();
            const { data } = this.props;
            this.resetStateFn(data, match.params.id);
          })
          .catch((error) => {
            Toast.fail('请求失败...');
            console.error(error);
          });
    }else{
      Toast.hide();
    }
  }

  resetStateFn = (data, id) => {
    if (!data) {
      return;
    }
    this.setState({
      channelId: id || '',
      channelNum: data.channelNum || '',
      parentId: data.parentId || '',
      fullName: data.fullName || '',
      abbreviationName: data.abbreviationName || '',
      remarks: data.remarks || '',
      customerManager: data.customerManager || '',
      parentId: data.parentId || '',
      state: data.state || '',
      reallyNum: data.reallyNum || ''
    });
  };

  //  新增渠道
  addChannelFn = (state) => {

    const { reallyNum } = this.state;
    
    // 已经提交过的不允许保存，只能提交
    if (state === 0 && (this.state.state === 1 || this.state.state === '1')) {
      Toast.fail('已经提交过的渠道不允许保存，请直接提交！', 1);
      return;
    }
    
    if (!this.isInputValueLegal()) {
      return;
    }

    const channelInfo = Object.assign({}, this.state);
    if(channelInfo.parentId && channelInfo.parentId.length > 0){
      channelInfo.parentId = channelInfo.parentId[0];
    }
    //  增加或修改渠道数据（若为增加 则替换页面）
    this.props.addChannel(channelInfo, this.props.match.params.id)
        .then(() => {
          const { history, match, addIsSuccess, addIsFailed } = this.props;
      
          //  操作提示
          if (match.params.id) {  //修改
            if (addIsSuccess) {
              Toast.success('修改渠道成功！', 1);
              history.goBack();
            } else if (addIsFailed) {
              Toast.fail('修改渠道失败', 1);
            }
          } else {   //添加
            if (addIsSuccess) {
              Toast.success('添加渠道成功！', 1);
              this.props.clearChannel();
              this.props.getChannel(this.listParams);
              history.goBack();
            } else if (addIsFailed) {
              Toast.fail('添加渠道失败', 1);
            }
          }
          this.resetStateFn(this.props.data, this.props.addedId);
      
          //  获取当前url中的ChannelNature，以判断是否需要replace页面
          const { location, data } = this.props;
          const { search } = location;
          let nowUrlchannelNature = '';
          let nowState = '';
          if (search) {
            const channelNature = search2Obj(search).channelNature;
            const state = search2Obj(search).state;
            nowUrlchannelNature = channelNature;
            nowState = state;
          }
      
          //  替换页面
          if (!match.params || !match.params.id || !nowUrlchannelNature || (nowUrlchannelNature.toString() !== data.channelNature.toString()) || !nowState || (nowState.toString() !== data.state.toString())) {
            history.replace({
              pathname: CHANNEL_DETAIL + '/' + this.props.addedId,
              search: '?channelNature=' + data.channelNature + '&state=' + data.state + '&reallyNum=' + reallyNum
            });
          }
        })
        .catch((error) => {
          console.error(error);
        });
  };

  //  判断输入的内容是否为空
  isInputValueLegal = () => {
    const { fullName, abbreviationName } = this.state;
    this.setState({
      isNull_fullName: !fullName ? true : false,
      isNull_abbreviationName: !abbreviationName ? true : false
    })
    
    if (!fullName) {
      Toast.info('请输入渠道全称！', 1);
    } else if (!abbreviationName) {
      Toast.info('请输入渠道简称！', 1);
    } else {
      return true;
    }
  };

  render() {
    const {
      channelNum,
      parentId,
      fullName,
      abbreviationName,
      remarks,
      customerManager,
      isNull_fullName,
      isNull_abbreviationName,
      reallyNum
    } = this.state;

    const { roles, allChannel } = this.props;

    const channelNature = search2Obj(this.props.location.search).channelNature;

    const canEdit = (channelNature === '0' || channelNature === 0) && !isHavePermission(roles, 1) && !isHavePermission(roles, 3);
    
    let allChannelData = [];
    (allChannel || []).map(item => {
      allChannelData.push({
        label: item.fullName || '--',
        value: item.id || ''
      });
    });
    
    return (
      <div className="BasicInfo_channel">
        <List>
          {
            channelNum && channelNum !== ''
              ?
              <EditItem
                type="inputShow"
                label="渠道编码"
                value={channelNum}
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
            label="渠道全称"
            value={fullName}
            placeholder="请输入渠道全称"
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
            label="渠道简称"
            value={abbreviationName}
            placeholder="请输入渠道简称"
            isNull={isNull_abbreviationName}
            onChange={value => {
              this.setState({ 
                abbreviationName: value,
                isNull_abbreviationName: !value ? true : false,
              });
            }}
          />
          {<EditItem
            disabled={!canEdit}
            canEdit={canEdit}
            type="picker"
            label="父渠道名称"
            placeholder="请选择父渠道"
            pickerDatas={allChannelData}
            value={[parentId]}
            cascade
            onOk={v => this.setState({ parentId: v })}
            cols="1"
          />}
        </List>
        
        <List>
          <EditItem
            type={canEdit ? 'input' : 'inputShow'}
            label="备注"
            value={remarks}
            placeholder="请输入备注"
            onChange={value => {
              this.setState({ 
                remarks: value
              });
            }}
          />
        </List>
        {
          canEdit && <SaveBtnContainer saveFn={(state) => this.addChannelFn(state)} />
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { channel, loginStatus } = state;
  const { basicInfo, dictionaryData } = channel;
  const { data, eventData, addIsFailed, addIsLoading, addIsSuccess, addedId } = basicInfo;
  const { allChannel } = channel.list;
  
  return {
    data,
    addIsFailed,
    addIsLoading,
    addIsSuccess,
    eventData,
    addedId,
    dictionaryData: dictionaryData.data,
    roles: loginStatus.roles || [],
    allChannel
  };
};

export default connect(mapStateToProps, {
  channelDetail,
  getChannel,
  clearChannel,
  addChannel,
  getAllChannel
})(BasicInfo);
