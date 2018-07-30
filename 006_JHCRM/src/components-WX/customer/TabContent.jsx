//  客户详情
import React, { Component } from 'react';
import Tab from '../../components-WX/common/Tab';
import BasicInfo from '../../components-WX/customer/details/BasicInfo';
import BasicInfo_fact from '../../components-WX/customer/details/BasicInfo_fact';
import VisitRecord from '../../components-WX/customer/details/VisitRecord';
import Contacts from '../../components-WX/customer/details/contacts/Contacts';
import Holdings from '../../containers-WX/customer/holdings/index';
import Purchase from '../../containers-WX/customer/purchase/index'
import { search2Obj } from '../../utils/parseSearchString';

import './TabContent.less';

export default class TabContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabs: [
        {
          title: '基本信息',
          sub: '1',
          Component: search2Obj(this.props.location.search).customerNature === '0' || search2Obj(this.props.location.search).customerNature === 0 ? BasicInfo : BasicInfo_fact
        }, {
          title: '拜访记录',
          sub: '2',
          Component: VisitRecord
        }, {
          title: '联系人',
          sub: '3',
          Component: Contacts
        }, {
          title: '保有量',
          sub: '4',
          Component: Holdings
        }, {
          title: '申购赎回',
          sub: '5',
          Component: Purchase
        }
      ]
    };
  }
  
  matchTabs = (indexs) => {
    const { tabs } = this.state;
    const newTabs = [];
    tabs && tabs.length && tabs.map((item, index) => {
      if (indexs.indexOf(index) > -1) {
        newTabs.push(item);
      }
    });
    return newTabs;
  };
  
  render() {
    const { tabs } = this.state;
    let latestTabs = [];
    
    const { match } = this.props;
    const { location } = this.props;
    const { search } = location;
    
    if (!match.params.id) { //  新增时只显示基本信息
      latestTabs = this.matchTabs([0]);
    } else if (!search) {  //  不是新增时,如果没传search
      latestTabs = this.matchTabs([0, 1, 2]);
    } else {  //  不是新增，且传了search，判断是否是事实客户
      const customerNature = search2Obj(search).customerNature;
      const state = search2Obj(search).state;
      const reallyNum = search2Obj(search).reallyNum;
      if (customerNature === '1' || customerNature === 1 || reallyNum) {
        latestTabs = tabs;
      } else {
        latestTabs = this.matchTabs([0, 1, 2]);
      }
      // latestTabs = this.matchTabs([0, 1, 2]);  // 客户暂时没做保有量和申购赎回
    }
  
    return (
      <div className="TabContent">
        <Tab tabs={latestTabs} {...this.props} />
      </div>
    );
  }
}

