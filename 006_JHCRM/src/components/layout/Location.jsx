import React from 'react';

import './Location.less';

const Location = ({ text }) => {
  return (
    <div className="Loaction">当前位置：
      <span>{text}</span>
    </div>
  );
};

export default Location;
