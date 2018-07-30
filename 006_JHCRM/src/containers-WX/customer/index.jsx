//  客户分类tab
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Tab from '../../components-WX/common/Tab';
import WithTopTitle from '../../components-WX/common/WithTopTitle';
import { getDictionary } from '../../redux/ducks/customer/searchDictionary';
import { getAllUsers } from '../../redux/ducks/customer/allUsers';
import DrawerFilter from '../../components-WX/common/DrawerFilter';
import dateFormatter from '../../utils/dataTimeFormatter';
import FactList from './factList';
import PotentialList from './potentialList';

import './index.less';

class customerTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerVisible: false,   //是否弹出筛选抽屉
      tabs: [
        {
          title: '事实',
          sub: '1',
          Component: FactList
        }, {
          title: '潜在',
          sub: '2',
          Component: PotentialList
        }
      ],
      filterData: {}
    };
    this.dictionaryParams = {
      type: '1,2,3'
    };
  }

  componentDidMount() {
    this.props.getDictionary(this.dictionaryParams);
    this.props.getAllUsers();
  }
  
  render() {
    const { tabs, drawerVisible, filterData } = this.state;
    const { ...props } = this.props;
  
    return (
      <WithTopTitle title="客户列表" hasSearch>
        <div className="Customer">
          <div className="filter_report">
            <div className="navTab">
              <Tab tabs={tabs} hasDrawer {...props} />
            </div>
          </div>
        </div>
      </WithTopTitle>
    );
  }
}

const mapStateToProps = (state) => {
  const { customer, loginStatus } = state;
  const { dictionaryData, allUsers } = customer;
  const { allUsersData } = allUsers
  
  return {
    dictionaryData: dictionaryData.data,
    roles: loginStatus.roles || [],
    allUsersData
  };
};

export default connect(mapStateToProps, {
  getDictionary,
  getAllUsers
})(customerTab);