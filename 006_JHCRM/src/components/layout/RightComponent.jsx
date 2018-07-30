import React from 'react';

import './RightComponent.less';

const RightComponent = ({ children }) => {
  return (
    <div className="RightComponent">
      <div>
        {
          React.cloneElement(
            children
          )
        }
      </div>
    </div>
  );
};

export default RightComponent;
