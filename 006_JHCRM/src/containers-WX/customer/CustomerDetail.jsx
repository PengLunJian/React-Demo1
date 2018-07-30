import React, { Component } from 'react';
import WithTopTitle from '../../components-WX/common/WithTopTitle';
import TabContent from '../../components-WX/customer/TabContent';

export default class CustomerDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  render() {
    const { ...props } = this.props;
    
    return (
      <WithTopTitle
        title="客户详情"
        className="hasBack"
        hasBack
        {...props}
      >
        <TabContent {...props} />
      </WithTopTitle>
    );
  }
}
