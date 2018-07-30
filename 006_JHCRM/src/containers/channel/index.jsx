import React, { Component } from 'react';
import { connect } from 'react-redux';
import { message } from 'antd';
import {
  getChannel,
  clearChannel,
  deleteChannel
} from '../../redux/ducks/channel/list';
import { getDictionary } from '../../redux/ducks/channel/searchDictionary';
import Search from '../../components/channel/Search';
import TableContent from '../../components/channel/TableContent';

class Channel extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.params = {
      currentPage: 1,
      pageSize: 10,
      channelNature: 0,
      channelName: '',
      remarks: '',
    };
    this.dictionaryParams = {
      type: '4'
    };
  }
  
  componentWillMount() {
    document.title = '渠道管理';
  }
  
  componentDidMount() {
    this.props.getDictionary(this.dictionaryParams)
        .then(() => {
          this.loadData();
        })
        .catch((error) => {
          console.error(error);
        });
  }
  
  //  搜索框
  onSearchChange = (value, paramsKey) => {
    this.params[paramsKey] = value;
  };
  
  //  搜索
  searchClick = () => {
    console.log(this.params)
    this.loadData();
  };
  
  //  分页
  onPageChange = (pageNo) => {
    this.params.currentPage = pageNo;
    this.loadData();
  };
  
  loadData = () => {
    this.props.getChannel(this.params, true);
  };
  
  //  删除客户
  deleteChannelFn = (channelId) => {
    this.props.deleteChannel({ channelId })
        .then(() => {
          message.success('删除渠道成功！');
          this.loadData();
        })
        .catch((error) => {
           message.success('删除渠道失败！');
          console.error(error);
        });
  };
  
  render() {
    const { dictionaryData, data, ...props } = this.props;
    const { totalCount } = data;
    return (
      <div className="listContent Channel">
        <Search
          dictionaryData={dictionaryData}
          onSearchChange={this.onSearchChange}
          searchClick={this.searchClick}
          loadData={this.loadData}
          {...props}
        />
        <TableContent
          data={data}
          totalCount={totalCount}
          dictionaryData={dictionaryData}
          pageSize={this.params.pageSize}
          onPageChange={this.onPageChange}
          deleteChannelFn={this.deleteChannelFn}
          loadData={this.loadData}
          {...props}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { channel, loginStatus } = state;
  const { list, dictionaryData } = channel;
  const { data, totalCount, isLoading, deleteIsFailed, deleteIsLoading, deleteIsSuccess } = list;
  return {
    deleteIsFailed,
    deleteIsLoading,
    deleteIsSuccess,
    data: data,
    totalCount: totalCount,
    isLoading,
    dictionaryData: dictionaryData.data,
    roles: loginStatus.roles
  };
};

export default connect(mapStateToProps, {
  getChannel,
  clearChannel,
  deleteChannel,
  getDictionary
})(Channel);
