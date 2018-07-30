import React, { Component } from 'react';
import { connect } from 'react-redux';

import WithTopTitle from '../../components-WX/common/WithTopTitle';
import DetailIndex from '../../components-WX/contacts/details/index';

class ContactDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    document.title = '联系人详情';
  }
  
  render() {
    const { ...props } = this.props;
    
    return (
      <WithTopTitle
        title="联系人资料"
        className="hasBack"
        hasBack
      >
        <DetailIndex {...props} />
      </WithTopTitle>
    );
  }
}


const mapStateToProps = (state) => {
  
  return {
  
  };
};

export default connect(mapStateToProps, {

})(ContactDetail);
