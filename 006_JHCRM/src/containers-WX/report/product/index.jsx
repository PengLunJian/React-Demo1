//  数据报告-产品列表
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getChannelHoldings, clearChannelHoldings } from '../../../redux/ducks/channel/holdings';
import { getAllChannel } from '../../../redux/ducks/channel/list';
import { getAllProduct } from '../../../redux/ducks/product/list';
import List from '../../../components-WX/report/product/List';
import dateFormatter from '../../../utils/dataTimeFormatter';
import WithTopTitle from '../../../components-WX/common/WithTopTitle';
import DrawerFilter from '../../../components-WX/common/DrawerFilter';
import getDaysOfNowMonth from '../../../utils/getDaysOfNowMonth';

import './index.less';

class ChannelHoldings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasMoreData: true,  //  用于下拉刷新标识
      drawerVisible: false   //是否弹出筛选抽屉
    };
    this.params = {
      agencyNo: '',  //渠道编号
      cdateStart: getDaysOfNowMonth().start,
      cdateEnd: getDaysOfNowMonth().end,
      currentPage: 1,  
      pageSize: 10,  
      fundCode: '',  //产品code
    };
  }
  
  componentDidMount() {
    this.loadData();
    // this.props.getAllChannel();
    // this.props.getAllProduct();
  }

  componentWillReceiveProps(nextProps) {
    const { hasMoreData } = this.state;
    const { pageSize, currentPage } = this.params;
    if (pageSize * currentPage >= nextProps.totalCount) {
      hasMoreData &&
        this.setState({
          hasMoreData: false
        });
    } else {
      !hasMoreData &&
        this.setState({
          hasMoreData: true
        });
    }
  }
  
  loadData = (loadMore) => {
    this.params.currentPage = loadMore ? this.params.currentPage + 1 : 1;
    if (!loadMore) {
      this.props.clearChannelHoldings();
    }
    return new Promise((resolve, reject) => {
      this.props.getChannelHoldings(this.params);
      resolve();
    });
  };

  filterClick = () => {
    this.setState({ drawerVisible: !this.state.drawerVisible });
  }
  
  // 高级搜索
  onFilterChange = (data) => {
    this.params.agencyNo = data.channelNum || '';
    this.params.fundCode = data.productCode || '';
    this.params.cdateStart = data.startTime || this.params.cdateStart;
    this.params.cdateEnd = data.endTime || this.params.cdateEnd;
    this.loadData();
  };

  // 把20180312转成2018-03-12
  formatTime = (timeStr) => {
    if(timeStr){
      return timeStr.substring(0, 4) + '.' + timeStr.substring(4, 6) + '.' + timeStr.substring(6, 8);
    }
  }

  render() {
    const { allChannel, allProduct, ...props } = this.props;
    const { drawerVisible, hasMoreData } = this.state;
    const { cdateStart, cdateEnd } = this.params;

    return (
      <WithTopTitle
        title="产品报表"
      > 
        <div className="reportProduct_OutWrap">
          <div className="filter_report">
            <div className="selectedDate">{(cdateEnd && cdateEnd != cdateStart) ? this.formatTime(cdateStart) + ' - ' + this.formatTime(cdateEnd) : this.formatTime(cdateStart)}</div>
            <div className="filter" onClick={this.filterClick}></div>
          </div>
          <DrawerFilter 
            drawerVisible={drawerVisible}
            filterClick={this.filterClick}
            onFilterChange={this.onFilterChange}
            hasTime
            rangeTimeTitle="选择时间段"
            noSplitLine
          />
          <div className="reportProduct_Wrap">
            <div className="reportProduct_list">
              <List
                loadData={this.loadData}
                hasMoreData={hasMoreData}
                {...props}
              />
            </div>
          </div>
        </div>
      </WithTopTitle>
    );
  }
}

const mapStateToProps = (state) => {
  const { channel, product } = state;
  const { channelHoldings, list } = channel;
  const { data, totalCount, isLoading } = channelHoldings;
  const { allChannel } = list;
  
  return {
    data: data,
    totalCount: totalCount,
    isLoading,
    allChannel,
    allProduct: product.list.allProduct
  };
};

export default connect(mapStateToProps, {
  getChannelHoldings,
  clearChannelHoldings,
  getAllChannel,
  getAllProduct
})(ChannelHoldings);
