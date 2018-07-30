import React, { Component } from 'react';
import TouchLoader from '../components-WX/common/Touch-loader';

import './HighList.less';

export const highList = () => (WrappedComponent) => {
  class HighList extends Component {
    constructor() {
      super();
      this.state = {
        canRefreshResolve: true,   //  开启下拉刷新
        initializing: 0,        // 不显示顶部进度条
        // hasMore: true,          // 加载更多
        refreshing: false,      // 是否是在下拉刷新标识
      };
    }
    
    componentWillReceiveProps(nextProps) {
      const { refreshing } = this.state;
      // console.log(nextProps.isLoading);
      if (refreshing !== nextProps.isLoading) {
        this.setState({
          refreshing: nextProps.isLoading
        });
      }
    }
  
    refresh = (resolve, reject) => {    //  下拉刷新
      if (!this.state.canRefreshResolve) return reject();
      this.props.loadData(false).then(() => {
        resolve && resolve();
      }).catch((error) => {
        console.error(error);
      });
    };
  
    loadMore = (resolve) => {       //  上拉加载更多
      this.props.loadData(true).then(() => {
        resolve && resolve();
      }).catch((error) => {
        console.error(error);
      });
    };
    
    render() {
      const { initializing, refreshing, canRefreshResolve } = this.state;
      const { data, hasFilter, isLoading, hasMoreData, ...props } = this.props;
      
      return (
        <TouchLoader
          className={`HighList ${hasFilter ? 'hasFilter' : ''}`}
          initializing={initializing}
          onRefresh={canRefreshResolve ? this.refresh : undefined}
          hasMore={hasMoreData}
          onLoadMore={(resolve) => this.loadMore(resolve)}
          refreshing={this.state.refreshing}
        >
          <WrappedComponent data={data} {...props} />
          {
            hasMoreData || refreshing ?
              null
              :
              <div className="g-noMore">没有更多了</div>
          }
        </TouchLoader>
      
      );
    }
  }
  
  return HighList;
};

export default highList;
