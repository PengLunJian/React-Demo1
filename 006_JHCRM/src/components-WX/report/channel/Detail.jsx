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
        cagencyName: '',
        cagencyNo: '',
        cmainFundCode: '',
        realShares: '',
        sgbal: '',
        shbal: ''
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

    // console.log(data)

    return (
      <WithTopTitle
        title="渠道报表详情"
        hasBack
        className="hasBack black"
      >
        <div className="ReportChannelDetail">
          <div className="topWrap">
            <div className="fundName">{data.cfundName}({data.cmainFundCode || '--'})</div>
            <div className="totalNum">{data.realShares || '--'}</div>
            <div className="labelName">保有量(万元)</div>
            {/*<div className="botWrap">
              <div className="botItem">
                <div className="sg">当天申购 <span className="sgNum">{data.sgbal || '--'}</span><span className="unit">万元</span></div>
                <div className="sh">当天赎回 <span className="shNum">{data.shbal || '--'}</span><span className="unit">万元</span></div>
              </div>
            </div>*/}
          </div>
          <List>
            <EditItem
              type='inputShow'
              label="渠道名称"
              value={data.cagencyName || '--'}
            />
            <EditItem
              type='inputShow'
              label="渠道编码"
              value={data.cagencyNo || '--'}
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