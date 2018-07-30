//  客户报表详情
import React, { Component } from 'react';
import { List } from 'antd-mobile';
import EditItem from '../../common/EditItem';
import WithTopTitle from '../../../components-WX/common/WithTopTitle'
import isNumber from '../../../utils/helpers/isNumber';

import './Detail.less';

export default class HoldingsDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        fundName: '',
        fundCode: '',
        fshare: '',
        fbal: '',
        brokerName: '',
        custName: '',
        mangfee: '',
        srvfee: '',
        ddate: '',
        fundAcco: '',
        tradeAcc: ''
      }
    }
  }

  componentDidMount() {
    const { data } = this.props.location;
    if(data){
      this.setState({
        data
      })
    }
  }
  
  render() {
    const { data } = this.state;

    // data.srvfee = "3.232144345354e4";

    return (
      <WithTopTitle
        title="客户报表详情"
        className="hasBack black"
        hasBack
      >
        <div className="ReportCustomerDetail">
          <div className="topWrap">
            <div className="fundName">{data.fundName}({data.fundCode || '--'})</div>
            <div className="totalNum">{data.fshare || '--'}</div>
            <div className="labelName">份额(万元)</div>
            <div className="botWrap">
              <div className="botItem">
                <div className="sg">保有量 <span className="sgNum">{data.fbal || '--'}</span><span className="unit">万元</span></div>
              </div>
            </div>
          </div>
          <List>
            <EditItem
              type='inputShow'
              label="客户经理"
              value={data.brokerName || '--'}
            />
            <EditItem
              type='inputShow'
              label="客户名称"
              value={data.custName || '--'}
            />
            <EditItem
              type='inputShow'
              label="基金账号"
              value={data.fundAcco || '--'}
            />
            <EditItem
              type='inputShow'
              label="交易账号"
              value={data.tradeAcc || '--'}
            />
            <EditItem
              type='inputShow'
              label="管理费"
              value={data.mangfee ? toNonExponential(data.mangfee) + '元' : '--'}
            />
            <EditItem
              type='inputShow'
              label="销售服务费"
              value={data.srvfee ? toNonExponential(data.srvfee) + '元' : '--'}
            />
            <EditItem
              type='inputShow'
              label="日期"
              value={data.ddate || '--'}
            />
          </List>
        </div>
      </WithTopTitle>
    );
  }
}

// 把科学计数法转成正常数值
function toNonExponential(num) {
  if(isNumber(num)){
    var m = num.toExponential().match(/\d(?:\.(\d*))?e([+-]\d+)/);
    // return num.toFixed(Math.max(0, (m[1] || '').length - m[2]));
    return num < 0.01 ? num.toFixed(4) : num.toFixed(2);
  }else{
    if(Number(num) != NaN){
      return Number(num) < 0.01 ? Number(num).toFixed(4) : Number(num).toFixed(2);
    }else{
      return '--';
    }
  }
}