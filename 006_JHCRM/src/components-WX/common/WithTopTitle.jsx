import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Icon } from 'antd-mobile';
import Search from '../../components-WX/common/SearchBox';

import './WithTopTitle.less';

class TopTitle extends Component {
  componentDidMount() {
    this.setTitle();
  }
  
  componentDidUpdate() {
    this.setTitle();
  }
  
  setTitle() {
    const { title, match } = this.props;
    if(match.isExact){
      document.title = title;
    }
  }
  
  render() {
    const {
      title,
      className,
      backFn = () => {
        history.goBack();
      },
      children,
      history,
      hasBack
    } = this.props;
  
    return (
      <div className={`WithTopTitle ${className || ''}`}>
        {
          hasBack
          ?
          <div className="TopTitle" key="TopTitle">
            <Icon
              className="backBtn"
              type="left"
              onClick={backFn}
            />
          </div>
          :
          null
        } 
        <div className="MainContainer" key="MainContainer">
          {
            React.cloneElement(children)
          }
        </div>
      </div>
    );
  }
};

export default withRouter(TopTitle);
