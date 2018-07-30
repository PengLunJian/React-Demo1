import React, { Component } from 'react';
import { Spin, Icon } from 'antd';

export default class Loading extends Component {
    constructor(props) {
      super(props);
      this.state = {
        showLoading: this.props.showLoading || false
      }
    }
    
    render() {
      const { showLoading } = this.state;
      console.log(showLoading)
      return (
        showLoading
        ?
        <div className="loading_bg">
          <Spin size='large' />
        </div>
        :
        null
      )
    }
}