import React, { Component } from 'react';
import { connect } from 'react-redux';
import { visitRecordSearch } from '../../redux/ducks/customer/details/visitRecord';
import { getDictionary } from '../../redux/ducks/searchDictionary';
import Search from '../../components/visitrecord/Search';
import TableContent from '../../components/visitrecord/TableContent';

class VisitRecord extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.params = {
      currentPage: 1,
      pageSize: 10,
      name: '', 
      type: '',  // 客户/渠道
      status: '',  // 潜在/事实
      startDate: '',  //提交时间
      endDate: ''  //拜访时间
    };
    this.dictionaryParams = {
      type: '1,4,5'
    };
  }
  
  componentWillMount() {
    document.title = '联拜访记录管理';
  }
  
  componentDidMount() {
    this.props.getDictionary(this.dictionaryParams)
      .then(() => {
        this.loadData();
      })
      .catch((error) => {
        console.log(error)
      })
  }
  
  
  //  搜索框
  onSearchChange = (value, paramsKey) => {
    this.params[paramsKey] = value;
  };
  
  //  分页
  onPageChange = (pageNo) => {
    this.params.currentPage = pageNo;
    this.loadData();
  };
  
  //  搜索
  searchClick = () => {
    this.loadData();
  };
  
  loadData = () => {
    this.props.visitRecordSearch(this.params, true);
  };
  
  render() {
    const { dictionaryData, data, ...props } = this.props;
    
    return (
      <div className="listContent VisitRecord">
        <Search
          dictionaryData={dictionaryData}
          onSearchChange={this.onSearchChange}
          searchClick={this.searchClick}
        />
  
        <TableContent
          searchHeight={this.state.searchHeight}
          data={data}
          pageSize={this.params.pageSize}
          onPageChange={this.onPageChange}
          dictionaryData={dictionaryData}
          {...props}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { customer, searchDictionary } = state;
  const { visitRecord } = customer;
  const { data, totalCount, isLoading, deleteIsFailed, deleteIsLoading, deleteIsSuccess } = visitRecord;
  
  return {
    deleteIsFailed,
    deleteIsLoading,
    deleteIsSuccess,
    data: data,
    totalCount: totalCount,
    isLoading,
    dictionaryData: searchDictionary
  };
};

export default connect(mapStateToProps, {
  visitRecordSearch,
  getDictionary
})(VisitRecord);
