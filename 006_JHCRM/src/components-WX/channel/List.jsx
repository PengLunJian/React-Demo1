//  渠道-列表
import React, { Component } from 'react';
import HighList from '../../hoc-WX/HighList';
import ListItem from './../common/ListItem';

import './List.less';

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  //  判断性质
  showNatureLabel = (code) => {
    const { channelNature } = this.props;
    let name = '';
    channelNature && channelNature.map(item => {
      if (code === item.code) {
        name = item.name;
      }
    });
    return name;
  };
  
  render() {
    const { data, deleteItemFn, ...props } = this.props;
  
    return (
      data && data.map(item => (
        <ListItem
          key={item.channelNum}
          data={item}
          deleteItemFn={deleteItemFn}
          {...props}
        >
          <div className={`CustomerListItem info ${item.reallyNum || item.reallyNum === '1' ? 'reallyNum' : ''}`}>
            <div>
              <span>{item.fullName || '--'}</span>
              <span className="right">
                {
                  item.state === 0 || item.state === '0' ?
                    <span className="state fs-9">草稿</span>
                    :
                    null
                }
              </span>
            </div>
            <div className="fs-12">
              {
                item.userName ?
                <span>客户经理：{item.userName}</span>
                :
                null
              }
              {
                item.channelNum ?
                <span>渠道编码：{item.channelNum}</span>
                :
                null
              }
            </div>
          </div>
        </ListItem>
      ))
    );
  }
}

const ListComponent = HighList()(List);

export default ListComponent;
