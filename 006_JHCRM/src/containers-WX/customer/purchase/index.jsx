//  客户申购赎回列表
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCustomerPurchase, clearCustomerPurchase } from '../../../redux/ducks/customer/details/purchase';
import List from '../../../components-WX/customer/details/purchase/List';
import dateFormatter from '../../../utils/dataTimeFormatter';
import DrawerFilter from '../../../components-WX/common/DrawerFilter';
import getDaysOfNowMonth from '../../../utils/getDaysOfNowMonth';
import { search2Obj } from '../../../utils/parseSearchString';

import './index.less';

class reportCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasMoreData: true,  //  用于下拉刷新标识
      drawerVisible: false   //是否弹出筛选抽屉
    };
    this.params = {
      cdateStart: getDaysOfNowMonth().start,
      cdateEnd: getDaysOfNowMonth().end,
      currentPage: 1,  
      pageSize: 10,
      custNo: ''
    };
  }
  
  componentDidMount() {
    const { match, location } = this.props;
    if(search2Obj(location.search).reallyNum){
      this.params.custNo = search2Obj(location.search).reallyNum;
    }else if(match.params.id && match.params.id != ''){
      this.params.custNo = match.params.id;
    }
    this.loadData();
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
      this.props.clearCustomerPurchase();
    }
    return new Promise((resolve, reject) => {
      this.props.getCustomerPurchase(this.params);
      resolve();
    });
  };

  filterClick = () => {
    this.setState({ drawerVisible: !this.state.drawerVisible });
  }
  
  // 高级搜索
  onFilterChange = (data) => {
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
    const { ...props } = this.props;
    const { drawerVisible, hasMoreData } = this.state;
    const { cdateStart, cdateEnd } = this.params;

    return (
      <div className="reportCustomer_OutWrap customerHoldings">
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
        <div className="reportCustomer_Wrap">
          <div className="reportCustomer_list">
            <List
              loadData={this.loadData}
              hasMoreData={hasMoreData}
              {...props}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { customer } = state;
  const { purchase } = customer;
  const { data, totalCount, isLoading } = purchase;
  
  return {
    data: data,
    totalCount: totalCount,
    isLoading
  };
};

export default connect(mapStateToProps, {
  getCustomerPurchase,
  clearCustomerPurchase,
})(reportCustomer);
