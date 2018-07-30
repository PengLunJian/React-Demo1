//  产品分类
import React, { Component } from 'react';
import { Tabs } from 'antd-mobile';
import './../common/Tab.less';

export default class NavTabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialPage: props.initialPage || 0,
      tabs: [
        {
          title: '货币类',
          id: '1',
        }, {
          title: '混合类',
          id: '2',
        }, {
          title: '债券类',
          id: '3',
        }, {
          title: '权益类',
          id: '4',
        }
      ]
    };
  }
  
  render() {
    const { tabs, initialPage } = this.state;
  
    return (
      <div className="Tab NavTabs_product">
        <Tabs
          swipeable={false}
          tabs={tabs}
          initialPage={initialPage}
          onChange={(tab, index) => {
            this.props.tabChangeFn(tab.id)
            this.setState({
              initialPage: index
            });
          }}
        />
      </div>
    );
  }
}
