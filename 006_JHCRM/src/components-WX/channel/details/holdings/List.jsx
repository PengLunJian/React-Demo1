//  保有量-列表
import React, { Component } from 'react';
import { CHANNEL_DETAIL, HOLDINGS_DETAIL } from '../../../../constants/routes';
import { SwipeAction, List } from 'antd-mobile';
import HighList from '../../../../hoc-WX/HighList';
import ListItem from './../../../common/ListItem';

import './List.less';

class HoldingsList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  toDetail = (itemData) => {
    const { history, match } = this.props;
    const id = match.params.id;
    history.push({
      data: itemData,
      pathname: CHANNEL_DETAIL + '/' + id + HOLDINGS_DETAIL,
    });
  };
  
  render() {
    const { data, ...props } = this.props;

    return (
      data && data.map((item, index) => (
        <ListItem
          key={index}
          data={item}
          hideDelete
        > 
          <div className="HoldingsListItem" 
            // onClick={(item)=>this.toDetail(data[index])}
          >
            <div className="title">{item.cfundName} <span className="fundCode">{item.cmainFundCode}</span> </div>
            <div className="total">
              {item.realShares || '--'} <span className="unit">万元</span>
            </div>
          </div>
        </ListItem>
      ))
    );
  }
}

const ListComponent = HighList()(HoldingsList);

export default ListComponent;
