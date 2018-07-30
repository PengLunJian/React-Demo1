import React, { Component } from 'react';

import './Search-BtnContainer.less';

export default class SearchBtnContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  render() {
    const { seachFn, exportFn, addFn } = this.props;
    
    return (
      <div className="Search-BtnContainer">
        <div>
          {
            seachFn && <div className="searchBtn" onClick={seachFn}>查询</div>
          }
          
          {
            exportFn && <div className="exportBtn" onClick={exportFn}>导出</div>
          }
          {
            addFn && <div className="addBtn" onClick={addFn}>新增</div>
          }
        </div>
      </div>
    );
  }
}
