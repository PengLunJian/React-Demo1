import React, { Component } from 'react';
import { connect } from 'react-redux';
import { customerAddEvent } from '../../../redux/ducks/customer/details/basicInfo';
import WithTopTitle from '../../common/WithTopTitle';

import './EditEvent.less';

class EditEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.data || ''
    };
  }
  
  componentDidMount() {
  
  }
  
  onChangeFn = (e) => {
    this.setState({
      value: e.target.value
    });
  };
  
  okBtn = () => {
    const { history } = this.props;
    this.props.customerAddEvent(this.state.value);
    history.goBack();
  };
  
  render() {
    const { value } = this.state;
    const { ...props } = this.props;
    
    return (
      <WithTopTitle
        title="编辑"
        className="EditEventContainer hasBack"
        hasBack
      >
        <div className="EditEvent fs-15">
          <div>关键事件</div>
          <textarea
            name="textarea"
            value={value}
            onChange={this.onChangeFn}
            placeholder="请输入关键事件内容..."
          />
          <div className="fs-15" onClick={this.okBtn}>确认</div>
        </div>
      </WithTopTitle>
      
    );
  }
}


const mapStateToProps = (state) => {
  const { customer } = state;
  const { basicInfo } = customer;
  return {
    data: basicInfo.eventData
  };
};

export default connect(mapStateToProps, {
  customerAddEvent
})(EditEvent);
