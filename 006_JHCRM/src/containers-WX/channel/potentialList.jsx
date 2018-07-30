import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  getChannel,
  clearChannel,
  deleteChannel
} from '../../redux/ducks/channel/list';
import { CHANNEL_DETAIL } from '../../constants/routes';
import List from '../../components-WX/channel/List';
import AddBtn from '../../components-WX/common/AddBtn';
import isHavePermission from '../../utils/isHavePermission';

import './index.less';

class Channel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasMoreData: true,  //  用于下拉刷新标识
    };
    this.params = {
      currentPage: 1,
      pageSize: 10,
      key: '',
      code: '',
      channelNature: 0
    };
  }
  
  componentDidMount() {
    this.loadData(false);
    this.props.onRef(this);
  }
  
  componentWillReceiveProps(nextProps) {
    const { hasMoreData } = this.state;
    const { pageSize, currentPage } = this.params;
    if (pageSize * currentPage >= nextProps.totalCount) {
      hasMoreData &&
      this.setState({
        hasMoreData: false
      });
    } else {
      !hasMoreData &&
      this.setState({
        hasMoreData: true
      });
    }
  }

  filterLoad = (data) => {
    this.params = data;
    this.loadData(false, data)
  }
  
  loadData = (loadMore, data) => {
    console.log(data)
    this.params.currentPage = loadMore ?
      this.params.currentPage + 1 : 1;
    if (!loadMore) {
      this.props.clearChannel();
    }
    return new Promise((resolve, reject) => {
      this.props.getChannel(data ? data : this.params);
      resolve();
    });
  };

  toDetail = (id, state, reallyNum) => {
    const { history } = this.props;
    history.push({
      pathname: CHANNEL_DETAIL + '/' + id,
      search: '?channelNature=0&reallyNum=' + reallyNum
    });
  };

  deleteChannelFn = (channelId) => {
    this.props.deleteChannel({ channelId });
  };

  //  新增潜在渠道按钮
  addChannel = () => {
    const { history } = this.props;
    history.push({
      pathname: CHANNEL_DETAIL,
      search: '?channelNature=0'
    });
  };
  
  render() {
    const { hasMoreData } = this.state;
    const { dictionaryData, isActive, drawerVisible, roles, ...props } = this.props;

    return (
      <div className="Channel_potentail">
        <List
          loadData={this.loadData}
          hasMoreData={hasMoreData}
          toDetail={this.toDetail}
          nature="channelNature"
          deleteItemFn={this.deleteChannelFn}
          hideDelete={false}
          {...props}
        />
        {
          !drawerVisible && isActive && !isHavePermission(roles, 1) && !isHavePermission(roles, 3)
          ?
          <AddBtn
            handleAddFn={this.addChannel}
            {...props}
          />
          :
          null
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { channel, loginStatus } = state;
  const { list } = channel;
  const { data, totalCount, isLoading, deleteIsFailed, deleteIsLoading, deleteIsSuccess } = list;
  
  return {
    deleteIsFailed,
    deleteIsLoading,
    deleteIsSuccess,
    data: data,
    totalCount: totalCount,
    isLoading,
    roles: loginStatus.roles || [],
  };
};

export default connect(mapStateToProps, {
  getChannel,
  clearChannel,
  deleteChannel
})(Channel);
