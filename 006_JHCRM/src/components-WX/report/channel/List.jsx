//  渠道报表-列表
import React, { Component } from 'react';
import { List } from 'antd-mobile';
import { REPORT_CHANNEL, REPORT_CHANNEL_DETAIL } from '../../../constants/routes';
import HighList from '../../../hoc-WX/HighList';

class ReportChannelList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  toDetail = (itemData) => {
    const { history, match } = this.props;
    
    history.push({
      data: itemData,
      pathname: REPORT_CHANNEL + REPORT_CHANNEL_DETAIL,
    });
  };
  
  render() {
    const { data, history, ...props } = this.props;

    return (
      data && data.map((item, index) => (
        <div className="listItem" key={index}> 
          <List.Item onClick={() => this.toDetail(item)}>
            <div>
              <div className="ListItem_product">
                <div className="title">{item.cagencyName || '--'}<span>{item.cagencyNo ? '(' + item.cagencyNo + ')' : ''}</span></div>
                <div className="numWrap">
                  <div className="left">
                    <div className="smallItem red">{item.realShares || '--'}<span className="unit">万元</span></div>
                    <div className="smallItem">保有量</div>
                  </div>
                  <div className="right">
                    <div className="smallItem">基金代码：{item.cmainFundCode || '--'}</div>
                    <div className="smallItem">基金名称：{item.cfundName || '--'}</div>
                  </div>
                </div>
              </div>
            </div>
          </List.Item>
        </div>
      ))
    );
  }
}

const ListComponent = HighList()(ReportChannelList);

export default ListComponent;
