import React, { Component } from 'react';
import { connect } from 'react-redux';
import VisitRecordItems from './VisitRecordItems';
import Search from '../../../components-WX/common/SearchBox';
import AddBtn from '../../common/AddBtn';
import {
  CUSTOMER_DETAIL,
  ADD_VISIT_RECORD
} from '../../../constants/routes';
import {
  clearVisitRecord,
  visitRecordSearch,
  deleteVisitRecord
} from '../../../redux/ducks/customer/details/visitRecord';
import isHavePermission from '../../../utils/isHavePermission';

import './VisitRecord.less';

class VisitRecord extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasMoreData: true  //  用于下拉刷新标识
    };
    this.params = {
      currentPage: 1,
      pageSize: 5,
      type: 0,
      typeId: props.match.params.id,
      name: ''   //关键字
    };
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
  
  loadData = (loadMore) => {
    this.params.currentPage = loadMore ?
      this.params.currentPage + 1 : 1;
    if (!loadMore) {
      this.props.clearVisitRecord();
    }
    return new Promise((resolve, reject) => {
      this.props.visitRecordSearch(this.params);
      resolve();
    });
  };
  
  openAddVisitRecord = () => {
    const { history, match } = this.props;
    const id = match.params.id;
    history.push({
      pathname: CUSTOMER_DETAIL + '/' + id + ADD_VISIT_RECORD,
      search: '?from=0&contactId=0'
    });
  };
  
  onSearchChange = (e, isCancel) => {
    this.props.clearVisitRecord();
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
  
  render() {
    const { hasMoreData } = this.state;
    const { data, isActive, roles, ...props } = this.props;
    
    return (
      <div className="VisitRecord">
        <Search onSearchChange={this.onSearchChange} />
        <VisitRecordItems
          type="0"
          data={data}
          loadData={this.loadData}
          hasMoreData={hasMoreData}
          roles={roles}
          {...props}
        />
        {
          isActive && !isHavePermission(roles, 1) && !isHavePermission(roles, 3)
          ?
          <AddBtn
            handleAddFn={this.openAddVisitRecord}
            {...props}
          /> 
          : 
          null
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { customer, loginStatus } = state;
  const { visitRecord } = customer;
  const { data, totalCount, isLoading } = visitRecord;
  return {
    isLoading,
    data,
    totalCount,
    roles: loginStatus.roles || []
  };
};

export default connect(mapStateToProps, {
  clearVisitRecord,
  visitRecordSearch,
  deleteVisitRecord
})(VisitRecord);
