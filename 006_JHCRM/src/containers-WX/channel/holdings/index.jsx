//  渠道详情-保有量列表
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getChannelHoldings, clearChannelHoldings } from '../../../redux/ducks/channel/holdings';
import List from '../../../components-WX/channel/details/holdings/List';
import DatePicker from '../../../components-WX/common/DatePicker';
import getDaysOfNowMonth from '../../../utils/getDaysOfNowMonth';
import { search2Obj } from '../../../utils/parseSearchString';

import './index.less';

const zerofill = val => val >= 10 ? val : '0' + val;

class ChannelHoldings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasMoreData: true,  //  用于下拉刷新标识
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
    const { match, location } = this.props;
    if(search2Obj(location.search).reallyNum){
      this.params.agencyNo = search2Obj(location.search).reallyNum;
    }else if(match.params.id && match.params.id != ''){
      this.params.agencyNo = match.params.id;
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
      this.props.clearChannelHoldings();
    }
    return new Promise((resolve, reject) => {
      this.props.getChannelHoldings(this.params);
      resolve();
    });
  };
  
  getDateVal = (date) => {
    this.params.cdateStart = date ? date.split('-').join('') : '';
    this.params.cdateEnd = date ? date.split('-').join('') : '';
    this.loadData();
  }

  // 把20180312转成时间戳
  formatTime = (timeStr) => {
    if(timeStr){
      return new Date(timeStr.substring(0, 4), (zerofill(timeStr.substring(4, 6).toString() - 1)), timeStr.substring(6, 8));
    }
  }

  render() {
    const { ...props } = this.props;
    const { hasMoreData } = this.state;
    
    return (
      <div className="HoldingsOutWrap">
        <DatePicker
          getDateVal={this.getDateVal}
          date={this.params.cdateStart ? this.formatTime(this.params.cdateStart) : ''}
        />
        <div className="HoldingsWrap">
          <div className="Holdings_list">
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
  const { channel } = state;
  const { channelHoldings } = channel;
  const { data, totalCount, isLoading } = channelHoldings;
  
  return {
    data: data,
    totalCount: totalCount,
    isLoading
  };
};

export default connect(mapStateToProps, {
  getChannelHoldings,
  clearChannelHoldings
})(ChannelHoldings);
