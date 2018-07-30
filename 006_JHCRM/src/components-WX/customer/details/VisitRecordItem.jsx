import React, { Component } from 'react';
import {
  SwipeAction,
  List
} from 'antd-mobile';
import {
  CUSTOMER_DETAIL,
  CHANNEL_DETAIL,
  ADD_VISIT_RECORD
} from '../../../constants/routes';
import dateFormatter from '../../../utils/dataTimeFormatter';
import isHavePermission from '../../../utils/isHavePermission';

import './VisitRecordItem.less';

export default class VisitRecordItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      btnDeleteText: '删除'
    };
  }
  
  onOpenFn = () => {
  
  };
  
  onCloseFn = () => {
    this.setState({
      btnDeleteText: '删除'
    });
  };
  
  confirmDelete = (e) => {
    e = e || window.event;
    e.stopPropagation();
    if (this.state.btnDeleteText === '确认删除') {
      this.props.deleteVisitRecord(
        { visitRecordId: this.props.data.id }
      );
    } else {
      this.setState({
        btnDeleteText: '确认删除'
      });
    }
  };
  
  openEditVisitRecord = () => {
    const { history, data, type } = this.props;
    const prevId = this.props.match.params.id;
    if (type && type.toString() === '1') {
      history.push({
        pathname: CHANNEL_DETAIL + '/'
        + prevId + ADD_VISIT_RECORD + '/' + data.id,
        search: '?from=' + type + '&contactId=1'
      });
    } else {
      history.push({
        pathname: CUSTOMER_DETAIL + '/' + prevId
        + ADD_VISIT_RECORD + '/' + data.id,
        search: '?contactId=0'
      });
    }
  };
  
  render() {
    const { btnDeleteText } = this.state;
    const { data, roles } = this.props;
    
    return (
      <div className="VisitRecord__Item" onClick={this.openEditVisitRecord}>
        <div className="ItemTop">
          <SwipeAction
            right={[
              {
                text: btnDeleteText,
                onPress: this.confirmDelete,
                style: {
                  backgroundColor: '#F4333C',
                  color: 'white'
                }
              }
            ]}
            onOpen={this.onOpenFn}
            onClose={this.onCloseFn}
            disabled={isHavePermission(roles, 1) || isHavePermission(roles, 3)}
          >
            <List.Item>
              <label className="ItemTitle">{data.name || '--'}</label>
              {!data.state ?
                <span className="ItemText">草稿</span> : null
              }
            </List.Item>
          </SwipeAction>
        </div>
        <div className="ItemBottom">
          <label className="ItemLabel">被拜访人：</label>
          <span className="ItemName">{data.subName}</span>
          <time className="ItemTime">{dateFormatter(data.date, 2)}</time>
        </div>
      </div>
    );
  }
}
