import React, { Component } from 'react';
import CustomItem from '../../components/common/Custom-Item';
import SearchBtnContainer from '../../components/common/Search-BtnContainer';
import { obj2Search } from '../../utils/parseSearchString';


export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',          //  所在地点
      customerName: '',     //  客户名称
      customerNature: 0,           //  客户性质
      Authorization: encodeURIComponent(JSON.parse(sessionStorage.getItem('authorization_JHCRM'))['authorization'])
    };
  }
  
  exportFn = ()=> {
    const exportParams = Object.assign({}, this.state);
    console.log(exportParams)
    window.location.href = 'http://' + window.location.host + '/api/crm/customer/down?' + obj2Search(exportParams);
  }

  render() {
    const { address, customerName, nature } = this.state;
    const { dictionaryData } = this.props;
    
    const {
      customerNature, //  客户性质
      customerType,   //  客户类型
      industryType,   //  行业分类
    } = dictionaryData;
  
    return (
      <div className="topSearch customer" ref={node => this.searchContainer = node}>

        <CustomItem
          fromSearch
          value={customerName}
          type="input"
          label="客户名称"
          placeholder="请输入客户名称"
          onChange={e => {
            this.setState({ customerName: e.target.value });
            this.props.onSearchChange(e.target.value, 'customerName');
          }}
        />

        <CustomItem
          fromSearch
          value={address}
          type="input"
          label="所在地点"
          placeholder="请输入所在地点"
          onChange={e => {
            this.setState({ address: e.target.value });
            this.props.onSearchChange(e.target.value, 'address');
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