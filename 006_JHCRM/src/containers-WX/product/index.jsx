import React, { Component } from 'react';
import WithTopTitle from '../../components-WX/common/WithTopTitle';
import Tab from '../../components-WX/common/Tab';
import Issued from './issued.jsx';
import Unissued from './unissued.jsx';

import './index.less';

export default class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabs: [
        {
          title: '已发行',
          sub: '1',
          Component: Issued
        }, {
          title: '未发行',
          sub: '2',
          Component: Unissued
        }
      ]
    };
  }
  
  render() {
    const { tabs } = this.state;
    const { ...props } = this.props;
    
    return (
      <WithTopTitle
        title="产品列表"
        hasSearch
      > 
        <div className="ProductContainer">
          <Tab tabs={tabs} {...this.props} />
        </div>
      </WithTopTitle>
    );
  }
}
