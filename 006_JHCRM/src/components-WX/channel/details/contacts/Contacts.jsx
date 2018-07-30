//  渠道详情-联系人
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CHANNEL_DETAIL, CONTACT_DETAIL } from '../../../../constants/routes';
import { getContacts, clearContacts, deleteContacts } from '../../../../redux/ducks/contacts/list';
import List from '../../../../components-WX/contacts/List';
import AddBtn from '../../../common/AddBtn';
import isHavePermission from '../../../../utils/isHavePermission';

import './Contacts.less';

class CustomerContacts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasMoreData: true,  //  用于下拉刷新标识
    };
    this.params = {
      currentPage: 1,
      pageSize: 10,
      name: '',
      contactsType: 1,
      typeId: '',
    };
  }
  
  componentDidMount() {
    const { match } = this.props;
    if (match.params && match.params.id) {
      this.params.typeId = match.params.id;
      this.loadData(false);
    }
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
      this.props.clearContacts();
    }
    return new Promise((resolve, reject) => {
      this.props.getContacts(this.params);
      resolve();
    });
  };
  
  deleteContactFn = (contactsId) => {
    this.props.deleteContacts({ contactsId });
  };
  
  //  新增联系人
  addContact = () => {
    const { history } = this.props;
    history.push({
      pathname: CHANNEL_DETAIL + CONTACT_DETAIL,
      search: '?from=channel&type=1&typeId=' + this.params.typeId
    });
  };
  
  render() {
    const { isActive, roles, ...props } = this.props;
    if (!this.props.match.params || !this.props.match.params.id) {
      return (
        <div>请先保存或提交客户</div>
      );
    }
    const { hasMoreData } = this.state;
    
    return (
      <div className="CustomerContacts">
        <List
          loadData={this.loadData}
          hasMoreData={hasMoreData}
          deleteItemFn={this.deleteContactFn}
          detailUrl={CHANNEL_DETAIL + CONTACT_DETAIL}
          from={'channel'}
          roles={roles}
          {...props}
        />
        {
          isActive && !isHavePermission(roles, 1) && !isHavePermission(roles, 3) ? <AddBtn handleAddFn={this.addContact} {...props} /> : null
        }
        
      </div>
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
})(CustomerContacts);
