//  渠道分类tab
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Tab from '../../components-WX/channel/ListTab';
import WithTopTitle from '../../components-WX/common/WithTopTitle';
import { getDictionary } from '../../redux/ducks/channel/searchDictionary';
import DrawerFilter from '../../components-WX/common/DrawerFilter';
import dateFormatter from '../../utils/dataTimeFormatter';
import FactList from './factList';
import PotentialList from './potentialList';

import './index.less';

class ChannelTab extends Component {
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
      type: '4'
    };
  }

  componentDidMount() {
    this.props.getDictionary(this.dictionaryParams)
  }

  render() {
    const { tabs, drawerVisible, filterData } = this.state;
    const { ...props } = this.props;
  
    return (
      <WithTopTitle title="渠道列表" hasSearch>
        <div className="Channel">
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
  const { channel } = state;
  const { dictionaryData } = channel;
  
  return {
    dictionaryData: dictionaryData.data
  };
};

export default connect(mapStateToProps, {
  getDictionary
})(ChannelTab);