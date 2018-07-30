//  产品详情
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Tab from '../../components-WX/common/Tab';
import BasicInfo from '../../components-WX/product/details/BasicInfo';
import Customer from '../../containers-WX/product/detail/customer/list';
import Channel from '../../containers-WX/product/detail/channel/list';
import { getDictionary } from '../../redux/ducks/searchDictionary';
import Attachment from '../../containers-WX/product/detail/attachment';
import Url from '../../containers-WX/product/detail/url';

import './TabContent.less';

class TabContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabs: [
        {
          title: '基本信息',
          sub: '1',
          Component: BasicInfo
        }, {
          title: '合同附件',
          sub: '2',
          Component: Attachment
        }, {
          title: '外链',
          sub: '3',
          Component: Url
        } 
        // {
        //   title: '机构客户',
        //   sub: '2',
        //   Component: Customer
        // }, {
        //   title: '渠道',
        //   sub: '3',
        //   Component: Channel
        // }
      ]
    };
    this.dictionaryParams = {
      type: '1,4'
    };
  }

  componentDidMount() {
    // this.props.getDictionary(this.dictionaryParams);
  }
  
  render() {
    const { tabs } = this.state;
    const { dictionaryData } = this.props;
  
    return (
      <div className="TabContent">
        <Tab tabs={tabs} dictionaryData={dictionaryData} {...this.props} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { searchDictionary } = state;
  return {
    dictionaryData: searchDictionary.data,
  };
};

export default connect(mapStateToProps, {
  getDictionary
})(TabContent);
