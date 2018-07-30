import React, { Component } from 'react';
import CustomItem from '../common/Custom-Item';
import ChannelDetail from '../../containers/factChannel/ChannelDetail';
import SearchBtnContainer from '../../components/common/Search-BtnContainer';

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',     //  渠道名称
      code: '',   //  备注关键字
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
    const { code, name, editVisible } = this.state;
    const { dictionaryData, ...props } = this.props;
    
    return (
      <div className="topSearch channel">
        
        <CustomItem
          fromSearch
          value={name}
          type="input"
          label="渠道名称"
          placeholder="请输入渠道名称"
          onChange={e => {
            this.setState({ name: e.target.value });
            this.props.onSearchChange(e.target.value, 'name');
          }}
        />

        <CustomItem
          fromSearch
          value={code}
          type="input"
          label="渠道编码"
          placeholder="请输入渠道编码"
          onChange={e => {
            this.setState({ code: e.target.value });
            this.props.onSearchChange(e.target.value, 'code');
          }}
        />
  
        <SearchBtnContainer
          seachFn={this.props.searchClick}
        />

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
