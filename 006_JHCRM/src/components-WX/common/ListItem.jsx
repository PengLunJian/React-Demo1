import React, { Component } from 'react';
import { SwipeAction, List } from 'antd-mobile';

import './ListItem.less';

export default class ListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isComfired: false       //  是否已经确认过删除
    };
  }
  
  onOpenFn = () => {
    this.setState({
      isComfired: false
    });
  };
  
  confirmDelete = () => {
    this.setState({
      isComfired: true
    });
    
    if (this.state.isComfired) {
      this.props.deleteItemFn(this.props.data.id);
    }
  }
  
  turnToDetail = () => {
    const { data } = this.props;
    const { id, channelNum, state, reallyNum } = data;
    const nature = this.props.nature;
    const realNum = reallyNum || '';
    if(this.props.toDetail){
      if(nature === 'channelNature'){
        this.props.toDetail(id, state, realNum);
      }else if(nature === 'channelNature_fact'){
        this.props.toDetail(channelNum, state);
      }else{
        this.props.toDetail(id, state, realNum);
      }
    }
  };
  
  render() {
    const { isComfired } = this.state;
    const { children, hideDelete } = this.props;
  
    return (
      <div className="ListItem">
        <SwipeAction
          right={[
            {
              text: isComfired ? '确认删除' : '删除',
              onPress: this.confirmDelete,
            },
          ]}
          onOpen={this.onOpenFn}
          disabled={hideDelete}
        >
          <List.Item
            onClick={this.turnToDetail}
          >
            {
              React.cloneElement(
                children
              )
            }
          </List.Item>
        </SwipeAction>
      </div>
    );
  }
}
