import React from 'react';
import { Icon } from 'antd-mobile';

import './TopTitle.less';

const TopTitle = (props) => {
  const { title, history } = props;
  
  return (
    <div className="TopTitle fs-15">
      <Icon className="backBtn" type="left" onClick={() => { history.goBack(); }} />
      {title}
    </div>
  );
};

export default TopTitle;
