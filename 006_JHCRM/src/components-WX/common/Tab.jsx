import React, { Component } from 'react';
import { Tabs } from 'antd-mobile';
import DrawerFilter from './DrawerFilter';
import isHavePermission from '../../utils/isHavePermission';

import './Tab.less';

export default class Tab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialPage: props.initialPage || 0,
      drawerVisible: false,   //是否弹出筛选抽屉
    };
  }

  filterClick = () => {
    this.setState({ drawerVisible: !this.state.drawerVisible });
  }

  onFilterChange = (data) => {
    const { initialPage } = this.state;
    if(initialPage === 0){
      const params = {
        currentPage: 1,
        pageSize: 10,
        name: data.customerName,
        userId: data.userId || ''
      };
      this.child_fact.filterLoad_fact(params)
    }else{
      const params = {
        currentPage: 1,
        pageSize: 10,
        customerNature: 0,
        key: data.customerName,
        start: data.startTime || '',
        end: data.endTime || '',
        userId: data.userId || ''
      };
      this.child.filterLoad(params)
    }
    
  };

  onRef = (ref) => {
    this.child = ref;
  }

  onRef_fact = (ref) => {
    this.child_fact = ref;
  }
  
  render() {
    const { tabs, hasDrawer, allUsersData, roles } = this.props;
    const { initialPage, drawerVisible } = this.state;

    return (
      <div className="Tab fs-15">
        <div className="filter" onClick={this.filterClick}></div>
        {
          hasDrawer
          ?
          <DrawerFilter 
            drawerVisible={drawerVisible}
            filterClick={this.filterClick}
            onFilterChange={this.onFilterChange}
            hasTime={initialPage===1}
            timeSearchTitle="开户时间"
            customerNameSearch
            allUsersData={isHavePermission(roles, 1) || isHavePermission(roles, 2) || isHavePermission(roles, 3) ? allUsersData : false}
          />
          :
          null
        }
        
        <Tabs
          swipeable={false}
          tabs={tabs}
          initialPage={initialPage}
          prerenderingSiblingsNumber={4}
          onChange={(tab, index) => {
            this.setState({
              initialPage: index
            });
          }}
        >
          {
            tabs && tabs.length && tabs.map((item, index) => (
              <div key={item.sub} className="content fs-15">
                <item.Component {...this.props} onRef_fact={this.onRef_fact} onRef={this.onRef} drawerVisible={drawerVisible} isActive={initialPage === index } />
              </div>
            ))
          }
        </Tabs>
      </div>
    );
  }
}
