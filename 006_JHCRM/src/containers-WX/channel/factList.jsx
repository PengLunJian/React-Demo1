import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  getChannel_fact,
  clearChannel_fact
} from '../../redux/ducks/channel/factList';
import List from '../../components-WX/channel/List';
import { CHANNEL_DETAIL } from '../../constants/routes';

import './index.less';

class Channel_fact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasMoreData: true,  //  用于下拉刷新标识
    };
    this.params = {
      currentPage: 1,
      pageSize: 10,
      name: '',
      code: ''
    };
  }
  
  componentDidMount() {
    this.loadData_fact(false);
    this.props.onRef_fact(this);
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

  filterLoad_fact = (data) => {
    console.log(data)
    this.params = data;
    this.loadData_fact(false, data)
  }
  
  loadData_fact = (loadMore, data) => {
    this.params.currentPage = loadMore ?
      this.params.currentPage + 1 : 1;
    if (!loadMore) {
      this.props.clearChannel_fact();
    }
    return new Promise((resolve, reject) => {
      this.props.getChannel_fact(data ? data : this.params);
      resolve();
    });
  };

  toDetail = (id) => {
    const { history } = this.props;
    history.push({
      pathname: CHANNEL_DETAIL + '/' + id,
      search: '?channelNature=1'
    });
  };
  
  render() {
    const { hasMoreData } = this.state;
    const { dictionaryData, ...props } = this.props;
    const { start, end } = this.params;
    
    return (
      <div className="Channel_fact">
        {<List
          loadData={this.loadData_fact}
          hasMoreData={hasMoreData}
          toDetail={this.toDetail}
          nature="channelNature_fact"
          hideDelete
          {...props}
        />}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { channel } = state;
  const { factList } = channel;
  const { data, totalCount, isLoading } = factList;
  
  return {
    data: data,
    totalCount: totalCount,
    isLoading
  };
};

export default connect(mapStateToProps, {
  getChannel_fact,
  clearChannel_fact
})(Channel_fact);
