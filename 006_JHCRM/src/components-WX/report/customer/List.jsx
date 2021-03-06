//  客户报表-列表
import React, { Component } from 'react';
import { REPORT_CUSTOMER, REPORT_CUSTOMER_DETAIL } from '../../../constants/routes';
import { List } from 'antd-mobile';
import HighList from '../../../hoc-WX/HighList';
import ListItem from './../../common/ListItem';

import './List.less';

class ReportCustomerDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  toDetail = (itemData) => {
    const { history, match } = this.props;
    history.push({
      data: itemData,
      pathname: REPORT_CUSTOMER + REPORT_CUSTOMER_DETAIL,
    });
  };
  
  render() {
    const { data, ...props } = this.props;

    return (
      data && data.map((item, index) => (
        <div className="ListItem" key={index}>
          <List.Item
            onClick={() => this.toDetail(item)}
          > 
            <div className="reportCustomer_ListItem">
              <div className="title">{item.brokerName || '--'}</div>
              <div className="botWrap fs-12">
                <div className="org">客户名称：{item.custName || '--'}</div>
                <div className="fund">基金：{item.fundName || '--'}{item.fundCode ? '(' + item.fundCode + ')' : ''} <div className="date">{item.ddate || ''}</div></div>
                
              </div>
              
            </div>
          </List.Item>
        </div>
        
      ))
    );
  }
}

const ListComponent = HighList()(ReportCustomerDetail);

export default ListComponent;
