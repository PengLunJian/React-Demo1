//  产品-pdf详情
import React, { Component } from 'react';
import WithTopTitle from '../../../components-WX/common/WithTopTitle';
import { search2Obj } from '../../../utils/parseSearchString';

import './AttachmentDetail.less';

class AttachmentDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  render() {
    const { location, ...props } = this.props;

    console.log(search2Obj(location.search))

    return (
      <WithTopTitle
        title="合同详情"
        className="hasBack"
        hasBack
        {...props}
      > 
        <div className="attachmentDetail">
          <iframe
            src={search2Obj(location.search).href}
            frameBorder="0"
          />
        </div>
        
      </WithTopTitle>
      
    );
  }
}

export default AttachmentDetail;
