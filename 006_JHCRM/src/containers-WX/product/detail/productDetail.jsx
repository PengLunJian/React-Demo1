import React, { Component } from 'react';
import WithTopTitle from '../../../components-WX/common/WithTopTitle';
import TabContent from '../../../components-WX/product/TabContent';

export default class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  render() {
    const { ...props } = this.props;
    
    return (
      <WithTopTitle
        title="产品详情"
        className="hasBack"
        hasBack
        {...props}
      >
        <TabContent {...props} />
      </WithTopTitle>
    );
  }
}
