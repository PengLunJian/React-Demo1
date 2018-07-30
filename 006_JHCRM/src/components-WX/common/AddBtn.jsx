import React, { Component } from 'react';
import { matchPath } from 'react-router';
import ReactDOM from 'react-dom';

import './AddBtn.less';

export default class AddBtn extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  render() {
    const { match, location } = this.props;
    const showAddBtn = matchPath(location.pathname, {
      path: match.path,
      exact: true,
      strict: false
    });
    if (showAddBtn) {
      return ReactDOM.createPortal(
        <div className="AddBtn" onClick={this.props.handleAddFn}>+</div>
        , document.getElementsByTagName('body')[0]);
    } else {
      return null;
    }
  }
}
