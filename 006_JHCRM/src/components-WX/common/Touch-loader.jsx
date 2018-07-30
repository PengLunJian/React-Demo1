//  https://github.com/Broltes/react-touch-loader
import React from 'react';
import './Touch-loader.less';

const STATS = {
  init: '',
  pulling: 'pulling',
  enough: 'pulling enough',
  refreshing: 'refreshing',
  refreshed: 'refreshed',
  reset: 'reset',
  
  loading: 'loading'// loading more
};

// pull to refresh
// tap bottom to load more
class TouchLoader extends React.Component {
  constructor() {
    super();
    this.state = {
      loaderState: STATS.init,
      pullHeight: 0,
      progressed: 0
    };
  }
  
  componentWillReceiveProps(nextProps) {
    //  更改：增加父组件传过来refreshing，接收并显示refreshing
    if (nextProps.refreshing) {
      this.setState({
        loaderState: STATS.refreshing
      });
    } else {
      this.setState({
        loaderState: STATS.init
      });
    }
    if (nextProps.initializing < 2) {
      this.setState({
        progressed: 0 // reset progress animation state
      });
    }
  }
  
  onScroll(e) {
    if (
      this.props.autoLoadMore &&
      this.props.hasMore &&
      this.state.loaderState !== STATS.loading
    ) {
      const panel = e.currentTarget;
      const scrollBottom = panel.scrollHeight - panel.clientHeight - panel.scrollTop;
      
      if (scrollBottom < 5) this.loadMore();
    }
  }
  
  touchStart(e) {
    if (!this.canRefresh()) return;
    if (e.touches.length === 1) {
      this._initialTouch = {
        clientY: e.touches[0].clientY,
        scrollTop: this.panel.scrollTop
      };
    }
  }
  
  touchMove(e) {
    if (!this.canRefresh()) return;
    const scrollTop = this.panel.scrollTop;
    const distance = this.calculateDistance(e.touches[0]);
    
    if (distance > 0 && scrollTop <= 0) {
      let pullDistance = distance - this._initialTouch.scrollTop;
      if (pullDistance < 0) {
        // 修复 webview 滚动过程中 touchstart 时计算panel.scrollTop不准
        pullDistance = 0;
        this._initialTouch.scrollTop = distance;
      }
      const pullHeight = this.easing(pullDistance);
      if (pullHeight) e.preventDefault();// 减弱滚动
      
      this.setState({
        loaderState: pullHeight > this.props.distanceToRefresh ? STATS.enough : STATS.pulling,
        pullHeight: pullHeight
      });
    }
  }
  
  touchEnd() {
    if (!this.canRefresh()) return;
    const endState = {
      loaderState: STATS.reset,
      pullHeight: 0
    };
    
    if (this.state.loaderState === STATS.enough) {
      // refreshing
      this.setState({
        loaderState: STATS.refreshing,
        pullHeight: 0
      });
      
      // trigger refresh action
      this.props.onRefresh(() => {
        // resolve
        
        //  更改：由于没有loading效果显示，注释掉refreshed状态以及pullHeight。
        this.setState({
          // loaderState: STATS.refreshed,
          // pullHeight: 0
        });
      }, () => {
        // reject
        this.setState(endState);// reset
      });
    } else this.setState(endState);// reset
  }
  
  animationEnd() {
    const newState = {};
    
    if (this.state.loaderState === STATS.refreshed) newState.loaderState = STATS.init;
    if (this.props.initializing > 1) newState.progressed = 1;
    
    this.setState(newState);
  }
  
  setInitialTouch(touch) {
    this._initialTouch = {
      clientY: touch.clientY
    };
  }
  
  calculateDistance(touch) {
    return touch.clientY - this._initialTouch.clientY;
  }
  
  // 拖拽的缓动公式 - easeOutSine
  easing(distance) {
    // t: current time, b: begInnIng value, c: change In value, d: duration
    const t = distance;
    const b = 0;
    const d = screen.availHeight; // 允许拖拽的最大距离
    const c = d / 2.5; // 提示标签最大有效拖拽距离
    
    return c * Math.sin(t / d * (Math.PI / 2)) + b;
  }
  
  canRefresh() {
    return this.props.onRefresh
      &&
      [STATS.refreshing, STATS.loading].indexOf(this.state.loaderState) < 0;
  }
  
  loadMore() {
    this.setState({ loaderState: STATS.loading });
    this.props.onLoadMore(() => {
      // resolve
      this.setState({ loaderState: STATS.init });
    });
  }
  
  render() {
    const { className, hasMore, initializing } = this.props;
    const { loaderState, pullHeight, progressed } = this.state;
    
    const footer = hasMore ? (
      <div className="tloader-footer">
        <div className="tloader-btn" onClick={e => this.loadMore(e)} />
        <div className="tloader-loading"><i className="ui-loading" /></div>
      </div>
    ) : null;
    
    const style = pullHeight ? {
      WebkitTransform: `translate3d(0, ${pullHeight}px, 0)`,
      transform: `translate3d(0, ${pullHeight}px, 0)`
    } : null;
    
    let progressClassName = '';
    if (!progressed) {
      if (initializing > 0) progressClassName += ' tloader-progress';
      if (initializing > 1) progressClassName += ' ed';
    }
    
    return (
      <div
        ref={panel => this.panel = panel}
        className={`tloader fs-12 state-${loaderState} ${className}${progressClassName}`}
        onScroll={e => this.onScroll(e)}
        onTouchStart={e => this.touchStart(e)}
        onTouchMove={e => this.touchMove(e)}
        onTouchEnd={e => this.touchEnd(e)}
        onAnimationEnd={e => this.animationEnd(e)}
      >
        <div className="tloader-symbol">
          <div className="tloader-msg"><i /></div>
          <div className="tloader-loading"><i className="ui-loading" /></div>
        </div>
        <div className="tloader-body" style={style}>{this.props.children}</div>
        {footer}
      </div>
    );
  }
}

TouchLoader.defaultProps = {
  distanceToRefresh: 60,
  autoLoadMore: 1
};

export default TouchLoader;
