//  地点、性质筛选
import React, { Component } from 'react';
import { Icon } from 'antd-mobile';

import './Filter.less';

//  地点筛选内容
const AddressContent =  (props) => {
  return (
    <div>address</div>
  );
};

//  性质筛选内容
const PropertyContent = (props) => {
  const { newCustomerNature, proppertyCode, proppertyLabel } = props;
  
  return (
    newCustomerNature && newCustomerNature.length ?
      newCustomerNature.map(item => (
        <div
          className={proppertyCode === item.code ? 'chooseItem' : ''}
          key={item.code}
          onClick={() => {
            props.hideContent();
            props.clickProperty(item.code, item.name);
            props.onFilterChange(item.code);
          }}
        >
          {item.name}
        </div>
      ))
      :
      <div>暂无数据</div>
  );
};

export default class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,        //  是否显示详情内容
      type: null,         //  显示哪部分详情内容；address-地点，property-性质
      proppertyCode: '',  //  显示的性质code
      proppertyLabel: '全部',  //  显示的性质code
    };
  }
  
  //  更改筛选条件
  changeStatus = (nowType) => {
    const { type } = this.state;
    if (type === nowType) {
      this.setState({
        show: false,
        type: null
      });
      return;
    }
    this.setState({
      show: true,
      type: nowType
    });
  };
  
  hideContent = () => {
    this.setState({
      show: false,
      type: null
    });
  };
  
  clickProperty = (code, label) => {
    this.setState({
      proppertyCode: code,
      proppertyLabel: label,
    });
  };
  
  render() {
    const { dictionaryData, onFilterChange } = this.props;
    const { show, type, proppertyCode, proppertyLabel } = this.state;
    
    const newCustomerNature = [{
      code: '',
      name: '全部'
    }];
    dictionaryData && dictionaryData.map(item => {
      newCustomerNature.push(item);
    });
    
    return (
      <div className="Fitler fs-14 clearfix">
        
        <div className="Filter_title">
          {/*<div onClick={() => { this.changeStatus('address'); }}>*/}
            {/*<span>地点</span>*/}
            {/*<Icon className="icon" type="down" size="xxs" />*/}
          {/*</div>*/}
          <div onClick={() => { this.changeStatus('property'); }}>
            <span>性质：{proppertyLabel}</span>
            <Icon className="icon" type="down" size="xxs" />
          </div>
        </div>
        
        {
          show &&
            <div className="Filter_content">
              {
                type && type === 'address' ?
                  <AddressContent />
                  :
                  <PropertyContent
                    proppertyCode={proppertyCode}
                    proppertyLabel={proppertyLabel}
                    hideContent={this.hideContent}
                    newCustomerNature={newCustomerNature}
                    onFilterChange={onFilterChange}
                    clickProperty={this.clickProperty}
                  />
              }
            </div>
        }
        
        {
          show &&
            <div className="Fitler_mask" onClick={this.hideContent} />
        }
      </div>
    );
  }
}
