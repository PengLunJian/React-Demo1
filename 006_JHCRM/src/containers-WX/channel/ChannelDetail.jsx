import React, { Component } from 'react';
import WithTopTitle from '../../components-WX/common/WithTopTitle';
import TabContent from '../../components-WX/channel/TabContent';

export default class ChannelDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  render() {
    const { ...props } = this.props;
    
    return (
      <WithTopTitle
        title="渠道详情"
        className="hasBack"
        hasBack
        {...props}
      >
        <TabContent {...props} />
      </WithTopTitle>
    );
  }
}