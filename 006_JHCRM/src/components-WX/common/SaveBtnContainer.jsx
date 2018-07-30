import React, { Component } from 'react';

import './SaveBtnContainer.less';

export default class SaveBtnContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  render() {
    return (
      <div className="SaveBtnContainer fs-16" >
        <div onClick={() => this.props.saveFn(0)}>保存</div>
        <div onClick={() => this.props.saveFn(1)}>提交</div>
      </div>
    );
  }
}
