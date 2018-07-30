//  保有量-列表
import React, { Component } from 'react';
import { CHANNEL_DETAIL, PURCHASE_DETAIL } from '../../../../constants/routes';
import { SwipeAction, List } from 'antd-mobile';
import HighList from '../../../../hoc-WX/HighList';
import ListItem from './../../../common/ListItem';

import './List.less';

class PurchaseList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  toDetail = (itemData) => {
    const { history, match } = this.props;
    const id = match.params.id;
    history.push({
      data: itemData,
      pathname: CHANNEL_DETAIL + '/' + id + PURCHASE_DETAIL,
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
          <div className="PurchaseListItem" 
            // onClick={(item)=>this.toDetail(data[index])}
          >
            <div className="title">{item.cfundName} <span className="fundCode">{item.cmainFundCode}</span> </div>
            <div className="right">
              <div className="rightItem">期末申购：{item.sgbal || '--'}万元</div>
              <div className="rightItem">期末赎回：{item.shbal || '--'}万元</div>
            </div>
          </div>
        </ListItem>
      ))
    );
  }
}

const ListComponent = HighList()(PurchaseList);

export default ListComponent;
