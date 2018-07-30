import React, { Component } from 'react';
import { Icon, SearchBar, Drawer } from 'antd-mobile';

import './SearchBox.less';

export default class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
  }
  
  onInputChange = (e, isCancel) => {
    if (isCancel) {
      const { value } = this.state;
      if (value) {
        this.setState({
          value: ''
        });
      } else {
        return;
      }
    } else {
      this.setState({
        value: e
      });
    }
    this.props.onSearchChange(e, isCancel);
  }

  filterClick = () => {
    this.props.filterClick && this.props.filterClick();
  }
  
  render() {
    const { value } = this.state;
    const { hasDrawerFilter, drawerVisible, placeholder } = this.props;
    
    return (
      <div className={`SearchBox fs-12${hasDrawerFilter ? ' hasDrawerFilter' : ''}`}>
        <SearchBar
          value={value}
          placeholder={placeholder ? placeholder : "搜索"}
          onChange={this.onInputChange}
          onCancel={(e) => this.onInputChange(e, true)}
        />
        {
          hasDrawerFilter
          ?
          <div className={`filter${drawerVisible ? '' : ' show'}`} onClick={this.filterClick}/>
          :
          null
        }
        
      </div>
    );
  }
  
};
