import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editVisitRecordEvent } from '../../../redux/ducks/customer/details/visitRecordAdd';
import WithTopTitle from '../../common/WithTopTitle';

import './VisitRecordTextEdit.less';

class VisitRecordTextEdit extends Component {
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
    this.props.editVisitRecordEvent(this.state.value);
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
          <div>内容问题及跟进</div>
          <textarea
            name="textarea"
            value={value}
            onChange={this.onChangeFn}
            placeholder="请输入内容问题及跟进内容..."
          />
          <div className="fs-15" onClick={this.okBtn}>确认</div>
        </div>
      </WithTopTitle>
    
    );
  }
}

const mapStateToProps = (state) => {
  const { customer } = state;
  const { visitRecordAdd } = customer;
  return {
    data: visitRecordAdd.eventData
  };
};

export default connect(mapStateToProps, {
  editVisitRecordEvent
})(VisitRecordTextEdit);
