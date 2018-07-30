//  申购赎回详情
import React, { Component } from 'react';
import { List, Toast } from 'antd-mobile';
import EditItem from '../../../common/EditItem';
import WithTopTitle from '../../../../components-WX/common/WithTopTitle';

import './details.less';

export default class PurchaseDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  
  render() {
    const data = this.props.location.data || [];
    
    return (
      <WithTopTitle
        title="申购赎回"
      >
        <div className="purchase_detail">
          <div className="topWrap">
            <div className="fundName">{data.cfundName}({data.cmainFundCode})</div>
            <div className="totalNum">{data.sgbal || '--'}</div>
            <div className="labelName">申购赎回(万元)</div>
            <div className="botWrap">
              <div className="botItem">
                <div className="sg">初期申购 <span className="sgNum">{data.jjzh || '--'}</span><span className="unit">万元</span></div>
                <div className="sh">初期赎回<span className="shNum">{data.jjzh || '--'}</span><span className="unit">万元</span></div>
              </div>
              <div className="botItem">
                <div className="sg">期末申购 <span className="sgNum">{data.jjzh || '--'}</span><span className="unit">万元</span></div>
                <div className="sh">期末赎回 <span className="shNum">{data.jjzh || '--'}</span><span className="unit">万元</span></div>
              </div>
            </div>
          </div>
          <List>
            <EditItem
              type='inputShow'
              label="基金账号"
              value={data.jjzh || '--'}
            />
            <EditItem
              type='inputShow'
              label="客户名称"
              value={data.jjzh || '--'}
            />
            <EditItem
              type='inputShow'
              label="经纪人"
              value={data.jjzh || '--'}
            />
            <EditItem
              type='inputShow'
              label="总天数"
              value={data.jjzh || '--'}
            />
            <EditItem
              type='inputShow'
              label="日期"
              value={data.jjzh || '--'}
            />
          </List>
        </div>
      </WithTopTitle>
    );
  }
}
