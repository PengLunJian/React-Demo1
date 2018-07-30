import React, { Component } from 'react';
import CustomItem from '../../components/common/Custom-Item';
import SearchBtnContainer from '../../components/common/Search-BtnContainer';
import { obj2Search } from '../../utils/parseSearchString';


export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',     //  客户名称
      Authorization: encodeURIComponent(JSON.parse(sessionStorage.getItem('authorization_JHCRM'))['authorization'])
    };
  }
  
  exportFn = ()=> {
    const exportParams = Object.assign({}, this.state);
    console.log(exportParams)
    window.location.href = 'http://' + window.location.host + '/api/crm/custInfo/down?' + obj2Search(exportParams);
  }

  render() {
    const { name } = this.state;
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
          value={name}
          type="input"
          label="客户名称"
          placeholder="请输入客户名称"
          onChange={e => {
            this.setState({ name: e.target.value });
            this.props.onSearchChange(e.target.value, 'name');
          }}
        />
  
        {/*<CustomItem
          fromSearch
          value={nature}
          type="select"
          label="客户性质"
          placeholder="请选择客户性质"
          options={customerNature}
          onChange={e => {
            this.setState({ nature: e });
            this.props.onSearchChange(e, 'customerNature');
          }}
        />*/}

        
        <SearchBtnContainer
          seachFn={this.props.searchClick}
          exportFn={this.exportFn}
        />
        
      </div>
    );
  }
}