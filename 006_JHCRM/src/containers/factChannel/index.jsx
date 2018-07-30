import React, { Component } from 'react';
import { connect } from 'react-redux';
import { message } from 'antd';
import {
  getChannel_fact,
  clearChannel_fact
} from '../../redux/ducks/channel/factList';
import { getDictionary } from '../../redux/ducks/channel/searchDictionary';
import Search from '../../components/factChannel/Search';
import TableContent from '../../components/factChannel/TableContent';

class Channel extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.params = {
      currentPage: 1,
      pageSize: 10,
      name: '',
      code: ''
    };
    this.dictionaryParams = {
      type: '4'
    };
  }
  
  componentWillMount() {
    document.title = '渠道管理';
  }
  
  componentDidMount() {
    this.props.getDictionary(this.dictionaryParams)
        .then(() => {
          this.loadData();
        })
        .catch((error) => {
          console.error(error);
        });
  }
  
  //  搜索框
  onSearchChange = (value, paramsKey) => {
    this.params[paramsKey] = value;
  };
  
  //  搜索
  searchClick = () => {
    console.log(this.params)
    this.loadData();
  };
  
  //  分页
  onPageChange = (pageNo) => {
    this.params.currentPage = pageNo;
    this.loadData();
  };
  
  loadData = () => {
    this.props.getChannel_fact(this.params, true);
  };
  
  render() {
    const { dictionaryData, data, ...props } = this.props;
    const { totalCount } = data;
    return (
      <div className="listContent FactChannel">
        <Search
          dictionaryData={dictionaryData}
          onSearchChange={this.onSearchChange}
          searchClick={this.searchClick}
          loadData={this.loadData}
        />
        <TableContent
          data={data}
          totalCount={totalCount}
          dictionaryData={dictionaryData}
          pageSize={this.params.pageSize}
          onPageChange={this.onPageChange}
          loadData={this.loadData}
          {...props}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { channel, loginStatus } = state;
  const { factList, dictionaryData } = channel;
  const { data, totalCount, isLoading } = factList;
  return {
    data: data,
    totalCount: totalCount,
    isLoading,
    dictionaryData: dictionaryData.data,
    roles: loginStatus.roles
  };
};

export default connect(mapStateToProps, {
  getChannel_fact,
  clearChannel_fact,
  getDictionary
})(Channel);
