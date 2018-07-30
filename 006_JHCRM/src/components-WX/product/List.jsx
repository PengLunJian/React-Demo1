//  客户-列表
import React, { Component } from 'react';
import { List } from 'antd-mobile';
import HighList from '../../hoc-WX/HighList';
import { PRODUCT_DETAIL } from '../../constants/routes';

import './List.less';

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  toDetail = (id) => {
    const { history } = this.props;
    history.push({
      pathname: PRODUCT_DETAIL + '/' + id
    });
  };
  
  render() {
    const { data, ...props } = this.props;

    return (
      data && data.map((item, index) => (
        <List.Item
          key={index}
        > 
          <div className="ListItem_product" 
            onClick={() => this.toDetail(item.fundcode)}
          >
            <div className="title">{item.fundname} <span>{item.fundcode ? '(' + item.fundcode + ')' : ''}</span> </div>
            <div className="numWrap">
              <div className="left">
                <div className="smallItem red">{item.netInfo ? item.netInfo.incomeratio : '--'}<span className="unit">%</span></div>
                <div className="smallItem">七日年化收益率</div>
              </div>
              <div className="right">
                <div className="smallItem">成立日期：{item.setupdate || '--'}</div>
                <div className="smallItem">发行日期：{item.issuedate || '--'}</div>
              </div>
            </div>
          </div>
        </List.Item>
      ))
    );
  }
}

const ListComponent = HighList()(ProductList);

export default ListComponent;
