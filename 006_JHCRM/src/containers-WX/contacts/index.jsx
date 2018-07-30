import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getContacts, clearContacts, deleteContacts } from '../../redux/ducks/contacts/list';
import { CONTACT_DETAIL } from '../../constants/routes';
import WithTopTitle from '../../components-WX/common/WithTopTitle';
import Search from '../../components-WX/common/SearchBox';
import List from '../../components-WX/contacts/List';
import AddBtn from '../../components-WX/common/AddBtn';
import isHavePermission from '../../utils/isHavePermission';

import './index.less';

class Contacts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasMoreData: true,  //  用于下拉刷新标识
    };
    this.params = {
      currentPage: 1,
      pageSize: 10,
      name: '',
      contactsType: '',
      typeId: '',
    };
  }
  
  componentWillMount() {
    document.title = '联系人列表';
  }
  
  componentDidMount() {
    this.loadData(false);
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
  
  //  搜索框
  onSearchChange = (e, isCancel) => {
    this.props.clearContacts();
    if (isCancel) {
      if (e) {
        this.params.name = '';
        this.loadData();
      }
      return;
    }
    this.params.name = e;
    this.loadData();
  };
  
  loadData = (loadMore) => {
    this.params.currentPage = loadMore ? this.params.currentPage + 1 : 1;
    if (!loadMore) {
      this.props.clearContacts();
    }
    return new Promise((resolve, reject) => {
      this.props.getContacts(this.params);
      resolve();
    });
  };
  
  //  新增联系人
  addContact = () => {
    const { history } = this.props;
    history.push({
      pathname: CONTACT_DETAIL
    });
  };
  
  deleteContactFn = (contactsId) => {
    this.props.deleteContacts({ contactsId });
  };
  
  render() {
    const { hasMoreData } = this.state;
    const { roles, ...props } = this.props;
    
    return (
      <WithTopTitle
        title="联系人列表"
        hasSearch
      >
        <div className="Contacts">
          <Search onSearchChange={this.onSearchChange} />
          
          <List
            loadData={this.loadData}
            hasMoreData={hasMoreData}
            deleteItemFn={this.deleteContactFn}
            roles={roles}
            {...props}
          />
          {
            !isHavePermission(roles, 1) && !isHavePermission(roles, 3)
            ?
            <AddBtn handleAddFn={this.addContact} {...props} />
            :
            null
          }
        </div>
      </WithTopTitle>
    );
  }
}

const mapStateToProps = (state) => {
  const { contacts, loginStatus } = state;
  const { list } = contacts;
  const { data, totalCount, isLoading, deleteIsFailed, deleteIsLoading, deleteIsSuccess } = list;
  
  return {
    deleteIsFailed,
    deleteIsLoading,
    deleteIsSuccess,
    data: data,
    totalCount: totalCount,
    isLoading,
    roles: loginStatus.roles || []
  };
};

export default connect(mapStateToProps, {
  getContacts,
  clearContacts,
  deleteContacts
})(Contacts);
