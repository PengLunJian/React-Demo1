//  产品报表-列表
import React, { Component } from 'react';
import { CHANNEL_DETAIL, HOLDINGS_DETAIL } from '../../../constants/routes';
import HighList from '../../../hoc-WX/HighList';
import ListItem from './../../common/ListItem';

class ReportChannelList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  render() {
    const { data, ...props } = this.props;

    return (
      data && data.map((item, index) => (
        <ListItem
          key={index}
          data={item}
          hideDelete
        > 
          <div>
            <div className="ListItem_product">
              <div className="title">{item.cfundName || '--'}<span>{item.cmainFundCode ? '(' + item.cmainFundCode + ')' : ''}</span></div>
              <div className="numWrap">
                <div className="left">
                  <div className="smallItem red">{item.realShares || '--'}<span className="unit">万元</span></div>
                  <div className="smallItem">保有量</div>
                </div>
                <div className="right">
                  <div className="smallItem">渠道代码：{item.cagencyNo || '--'}</div>
                  <div className="smallItem">渠道名称：{item.cagencyName || '--'}</div>
                </div>
              </div>
            </div>
          </div>

          
        </ListItem>
      ))
    );
  }
}

const ListComponent = HighList()(ReportChannelList);

export default ListComponent;
