import React, { Component } from 'react';
import { connect } from 'react-redux';
import { message } from 'antd';
import {
  getCard,
  clearCard,
  deleteCard
} from '../../redux/ducks/card/list';
import { getDictionary } from '../../redux/ducks/card/searchDictionary';
import Search from '../../components/card/Search';
import TableContent from '../../components/card/TableContent';


class Card extends Component {
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
    document.title = '名片管理';
  }
  
  componentDidMount() {
    this.props.getDictionary(this.dictionaryParams);
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
  
  loadData = (loadMore) => {
    this.props.getCard(this.params, true)
  };
  
  //  删除名片
  deleteCardFn = (cardId) => {
    this.props.deleteCard({ cardId })
        .then(() => {
          message.success('删除名片成功！');
          this.loadData();
        })
        .catch((error) => {
          message.error('删除名片失败！');
          console.error(error);
        });
  };
  
  render() {
    const { dictionaryData, data, ...props } = this.props;
    
    return (
      <div className="listContent Card">
        <Search
          dictionaryData={dictionaryData}
          onSearchChange={this.onSearchChange}
          searchClick={this.searchClick}
        />
        <TableContent
          data={data}
          dictionaryData={dictionaryData}
          pageSize={this.params.pageSize}
          onPageChange={this.onPageChange}
          deleteCardFn={this.deleteCardFn}
          {...props}
        />
        
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { card, loginStatus } = state;
  const { list, dictionaryData } = card;
  const { data, totalCount, isLoading, deleteIsFailed, deleteIsLoading, deleteIsSuccess } = list;
  
  return {
    data: data,
    totalCount: totalCount,
    dictionaryData: dictionaryData.data,
    isLoading,
    roles: loginStatus.roles
  };
};

export default connect(mapStateToProps, {
  getCard,
  clearCard,
  deleteCard,
  getDictionary
})(Card);
