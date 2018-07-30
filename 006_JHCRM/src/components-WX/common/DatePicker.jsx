//  地点、性质筛选
import React, { Component } from 'react';
import { DatePicker, Icon } from 'antd-mobile';
import dateFormatter from '../../utils/dataTimeFormatter';

import './DatePicker.less';

export default class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: this.props.date || ''
    };
  }

  sendDate = (date) => {
    this.props.getDateVal && this.props.getDateVal(dateFormatter(date, 2));
  }
  
  render() {
    const date = this.state.date || '';
    return (
      <div className="datePicker">
        <DatePicker
          mode="date"
          title="Select Date"
          extra="Optional"
          value={this.state.date}
          title='选择日期'
          onOk={date => {
              this.setState({ date })
              this.sendDate(date);
            }
          }
        >
          <div className="dateLabel">
            选择日期： 
            <span className="dateVal">{dateFormatter(date, 2)}</span>
            <Icon className="icon" type="down" size="xs" />
          </div>
        </DatePicker>
      </div>
    );
  }
}