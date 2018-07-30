//  渠道详情-事实-基本信息
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  List,
  Toast
} from 'antd-mobile';
import dataTimeFormatter from '../../../utils/dataTimeFormatter';
import { search2Obj } from '../../../utils/parseSearchString';
import {
  getChannelDetail_fact
} from '../../../redux/ducks/channel/factDetail';
import EditItem from '../../common/EditItem';

import './BasicInfo.less';

class BasicInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      channelNum: '',
      fullName: '',
      abbreviationName: ''
    };
  }
  
  componentDidMount() {
    Toast.loading('正在加载...');
    
    const { match } = this.props;
    //  有路由id则请求数据
    if (match.params && match.params.id) {
      this.props.getChannelDetail_fact({ agencyNo: match.params.id })
          .then(() => {
            Toast.hide();
            const { data } = this.props;
            this.resetStateFn(data);
          })
          .catch((error) => {
            Toast.fail('请求失败...');
            console.error(error);
          });
    }
  }
  
  resetStateFn = (data) => {
    if (!data) {
      return;
    }
    this.setState({
      channelNum: data.channelNum || '',
      fullName: data.fullName || '',
      abbreviationName: data.abbreviationName || ''
    });
  };
  
  render() {
    const { channelNum, fullName, abbreviationName } = this.state;
    
    return (
      <div className="BasicInfo_channel">
        <List>
          <EditItem
            type='inputShow'
            label="渠道编码"
            value={channelNum}
          />
          <EditItem
            type='inputShow'
            label="渠道全称"
            value={fullName}
          />
          <EditItem
            type='inputShow'
            label="渠道简称"
            value={abbreviationName}
          />
        </List>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { channel } = state;
  const { factDetail } = channel;
  const { data } = factDetail;
  
  return {
    data
  };
};

export default connect(mapStateToProps, {
  getChannelDetail_fact
})(BasicInfo);
