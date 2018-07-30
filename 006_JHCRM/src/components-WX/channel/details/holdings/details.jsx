//  保有量详情
import React, { Component } from 'react';
import { List, Toast } from 'antd-mobile';
import EditItem from '../../../common/EditItem';
import WithTopTitle from '../../../../components-WX/common/WithTopTitle';

import './details.less';

export default class HoldingsDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  
  render() {
    const data = this.props.location.data || [];

    return (
      <WithTopTitle
        title="保有量"
      >
        <div className="holdings_detail">
          <div className="topWrap">
            <div className="fundName">{data.cfundName}({data.cmainFundCode})</div>
            <div className="totalNum">{data.realShares}</div>
            <div className="labelName">保有量(万元)</div>
            <div className="botWrap">
              <div className="botItem">
                <div className="sg">初期申购 <span className="sgNum">{data.cqsg || '--'}</span><span className="unit">万元</span></div>
                <div className="sh">初期申购 <span className="shNum">{data.cqsg || '--'}</span><span className="unit">万元</span></div>
              </div>
            </div>
          </div>
          <List>
            <EditItem
              type='inputShow'
              label="每天份额保有量"
              value={data.mtfebyl || '--'}
            />
            <div className="splitLine"></div>
            <EditItem
              type='inputShow'
              label="基金账号"
              value={data.jjzh || '--'}
            />
            <EditItem
              type='inputShow'
              label="客户名称"
              value={data.khmc || '--'}
            />
            <EditItem
              type='inputShow'
              label="经纪人"
              value={data.jjr || '--'}
            />
            <EditItem
              type='inputShow'
              label="总天数"
              value={data.zts || '--'}
            />
            <EditItem
              type='inputShow'
              label="日期"
              value={data.date || '--'}
            />
          </List>
        </div>
      </WithTopTitle>
    );
  }
}
