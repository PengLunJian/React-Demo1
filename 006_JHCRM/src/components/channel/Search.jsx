import React, { Component } from 'react';
import CustomItem from '../common/Custom-Item';
import ChannelDetail from '../../containers/channel/ChannelDetail';
import SearchBtnContainer from '../../components/common/Search-BtnContainer';
import isHavePermission from '../../utils/isHavePermission';

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      channelName: '',     //  渠道名称
      remarks: '',   //  备注关键字
      channelNature: '',
      editVisible: false
    };
    this.params = {};

  }

  //  判断性质/行业分类等接口获取数据的label显示
  showLabel = (code, type) => {
    const typeData = this.props.dictionaryData[type];
    let name = '';
    typeData && typeData.map(item => {
      if (code === item.code) {
        name = item.name;
      }
    });
    return name;
  };
  
  hideEditModal = () => {
    this.setState({
      editVisible: false
    });
  };

  showEditModel = () => {
    this.setState({ 
      editVisible: true
    })
  }
  
  render() {
    const { remarks, channelName, channelNature, editVisible } = this.state;
    const { dictionaryData, roles, ...props } = this.props;
    
    return (
      <div className="topSearch channel">
        {/*<CustomItem
          fromSearch
          value={remarks}
          type="input"
          label="关键字"
          placeholder="请输入关键字"
          onChange={e => {
            this.setState({ remarks: e.target.value });
            this.props.onSearchChange(e.target.value, 'remarks');
          }}
        />*/}
        <CustomItem
          fromSearch
          value={channelName}
          type="input"
          label="渠道名称"
          placeholder="请输入渠道名称"
          onChange={e => {
            this.setState({ channelName: e.target.value });
            this.props.onSearchChange(e.target.value, 'channelName');
          }}
        />
  
        {/*<CustomItem
          fromSearch
          value={channelNature}
          type="select"
          label="渠道性质"
          placeholder="请选择渠道性质"
          options={dictionaryData.channelNature}
          onChange={e => {
            this.setState({ channelNature: e });
            this.props.onSearchChange(e, 'channelNature');
          }}
        />*/}

        {
          !isHavePermission(roles, 1)
          ?
          <SearchBtnContainer
            seachFn={this.props.searchClick}
            addFn={this.showEditModel}
          />
          :
          <SearchBtnContainer
            seachFn={this.props.searchClick}
          />
        }

        <ChannelDetail
          visible={editVisible}
          hideEditModal={this.hideEditModal}
          canEdit={true}
          dictionaryData={dictionaryData}
          {...props}
        />
      </div>
    );
  }
}
