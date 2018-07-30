import React, { Component } from 'react';
import CustomItem from '../../components/common/Custom-Item';
import SearchBtnContainer from '../../components/common/Search-BtnContainer';
import { obj2Search } from '../../utils/parseSearchString';

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',     //  姓名
      position: '',   //  职位
      phone: '',  // 电话  
    };
    this.params = {};
  }

  exportFn = ()=> {
    const exportParams = Object.assign({}, this.state);
    window.location.href = 'http://' + window.location.host + '/api/crm/card/down?' + obj2Search(exportParams);
  }

  render() {
    const { name, position, phone } = this.state;

    return (
      <div className="topSearch card">
        <CustomItem
          fromSearch
          value={name}
          type="input"
          label="姓名"
          placeholder="请输入姓名"
          onChange={e => {
            this.setState({ name: e.target.value });
            this.props.onSearchChange(e.target.value, 'name');
          }}
        />
        
        <SearchBtnContainer
          seachFn={this.props.searchClick}
          exportFn={this.exportFn}
        />

      </div>
    );
  }
}

