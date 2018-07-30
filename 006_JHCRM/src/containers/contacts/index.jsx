import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getContacts, clearContacts, deleteContacts } from '../../redux/ducks/contacts/list';
import Search from '../../components/contacts/Search';
import TableContent from '../../components/contacts/TableContent';

class Contacts extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.params = {
      currentPage: 1,
      pageSize: 10,
      name: '',
      phone: '',
      position: '',
    };
    this.dictionaryParams = {
      type: '1,2,3'
    };
  }
  
  componentWillMount() {
    document.title = '联系人管理';
  }
  
  componentDidMount() {
    this.loadData();
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
    this.props.getContacts(this.params, true);
  };
  
  render() {
    const { dictionaryData, data, ...props } = this.props;
    
    return (
      <div className="listContent Contacts">
        <Search
          dictionaryData={{}}
          onSearchChange={this.onSearchChange}
          searchClick={this.searchClick}
        />
  
        <TableContent
          searchHeight={this.state.searchHeight}
          data={data}
          pageSize={this.params.pageSize}
          onPageChange={this.onPageChange}
          {...props}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { contacts } = state;
  const { list } = contacts;
  const { data, totalCount, isLoading, deleteIsFailed, deleteIsLoading, deleteIsSuccess } = list;
  
  return {
    deleteIsFailed,
    deleteIsLoading,
    deleteIsSuccess,
    data: data,
    totalCount: totalCount,
    isLoading
  };
};

export default connect(mapStateToProps, {
  getContacts,
  clearContacts,
  deleteContacts
})(Contacts);
