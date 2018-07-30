import React, { Component } from 'react';
import { Drawer, Tag, Button, Calendar, SearchBar } from 'antd-mobile';
import dateFormatter from '../../utils/dataTimeFormatter';
import EditItem from '../../components-WX/common/EditItem';

import './DrawerFilter.less';

const now = new Date();
let yearData = [];
for(let i = new Date().getFullYear(); i > 1900; i--){
  yearData.push({label: i, value: i})
}
const quarterData = [
  yearData,
  [
    {
      label: '一季度',
      value: '1',
    },
    {
      label: '二季度',
      value: '2',
    },
    {
      label: '三季度',
      value: '3',
    },
    {
      label: '四季度',
      value: '4',
    },
  ],
];

// 时间类型标签数据
const timeLabelData = [
  {
    code: '1',
    name: '按天'
  }, {
    code: '2',
    name: '按月份'
  }, {
    code: '3',
    name: '按季度'
  }, {
    code: '4',
    name: '按时间段'
  }
];

const zerofill = val => val >= 10 ? val : '0' + val;

export default class DrawerFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nature: '',
      showDate: '',
      startTime: undefined,
      endTime: undefined,
      channelNum: [],
      productCode: [],
      day: '',   //按天查询
      month: '',   //按月查询
      quarter: '',   //按季度查询
      timeMode: '1',  //查询方式 天1 月2 季度3 时间段4
      channelName: '',  //渠道名称
      channelCode: '',  //渠道编码
      customerName: '',  //客户名称
      userId: '',     //用户id
    }
  }
  
  // 取消搜索
  onOpenChange = () => {
    this.props.filterClick && this.props.filterClick();
    this.setState({
      showDate: false,
    });
  }
  
  // 改变性质
  ChangeNature = (value) => {
    this.setState({
      nature: value
    });
  };

  // 改变时间选择方式
  changeTimeMode = (value) => {
    this.setState({
      timeMode: value
    });
  };
  
  //获取指定季度的起止时间
  formatQuarter = (quarterArr, noSplitLine) => {
    let splitLine = '-';
    if(noSplitLine){
      splitLine = '';
    }
    let qt = {
      start: '',
      end: ''
    };
    let nowYear = '';
    if(quarterArr){
      nowYear = quarterArr[0];
      switch(quarterArr[1]){
        case "1":
          qt = {
            start: nowYear + splitLine + '01' + splitLine + '01',
            end: nowYear + splitLine + '03' + splitLine + '31',
          }
          break;
        case "2":
          qt = {
            start: nowYear + splitLine + '04' + splitLine + '01',
            end: nowYear + splitLine + '06' + splitLine + '30',
          }
          break;
        case "3":
          qt = {
            start: nowYear + splitLine + '07' + splitLine + '01',
            end: nowYear + splitLine + '09' + splitLine + '30',
          }
          break;
        case "4":
          qt = {
            start: nowYear + splitLine + '10' + splitLine + '01',
            end: nowYear + splitLine + '12' + splitLine + '31',
          }
          break;
        default:
          qt = {
            start: '',
            end: ''
          }
      }
    }
    return qt;
  }
  
  //获取指定月的起止时间
  getCountDays = (dateVal, noSplitLine) => {
    let splitLine = '-';
    if(noSplitLine){
      splitLine = '';
    }
    const date = new Date(dateVal);  //获取所选时间
    const nowYear = date.getFullYear();  //获取年（yyyy）
    const nowMonth = date.getMonth()+1;  //获取月份（0-11，0代表1月）

    const newDate = new Date(nowYear,nowMonth,1);
    const lastDay = (new Date(newDate.getTime()-1000*60*60*24)).getDate();
    
    return {
      start: nowYear + splitLine + zerofill(nowMonth) + splitLine + '01',
      end: nowYear + splitLine + zerofill(nowMonth) + splitLine + lastDay
    }
  }
  
  // 查询
  searchFn = (noSplitLine) => {
    const stateData = Object.assign({}, this.state);
    /* 起止时间/按天/按月/按季度，只保留其中的一种查询条件 */
    if(stateData.startTime != ''){
      stateData.startTime = dateFormatter(stateData.startTime, 2, noSplitLine);
      stateData.endTime = dateFormatter(stateData.endTime, 2, noSplitLine);
    }else{
      if(stateData.day !=''){
        stateData.startTime = dateFormatter(stateData.day, 2, noSplitLine);
        stateData.endTime = dateFormatter(stateData.day, 2, noSplitLine);
      }else if(stateData.month !=''){
        stateData.startTime = this.getCountDays(stateData.month, noSplitLine).start;
        stateData.endTime = this.getCountDays(stateData.month, noSplitLine).end;
      }else if(stateData.quarter !=''){
        stateData.startTime = this.formatQuarter(stateData.quarter, noSplitLine).start;
        stateData.endTime = this.formatQuarter(stateData.quarter, noSplitLine).end;
      }
    }
    this.props.filterClick && this.props.filterClick();
    this.props.onFilterChange && this.props.onFilterChange(stateData);
  }
  
  // 确认-时间区间选择
  onDateConfirm = (startTime, endTime) => {
    this.setState({
      showDate: false,
      startTime,
      endTime,
      day: '',
      month: '',
      quarter: ''
    });
  }

  // 取消-时间区间选择
  onDateCancel  = (startTime, endTime) => {
    this.setState({
      showDate: false,
      // startTime: undefined,
      // endTime: undefined
    });
  }

  // 清除-时间区间选择
  onDateClear  = () => {
    this.setState({
      startTime: undefined,
      endTime: undefined
    });
  }
  
  render() {
    const { drawerVisible, natureData, hasTime, natureName, productData, channelData, rangeTimeTitle, noSplitLine,
      channelNameSearch, channelCodeSearch, customerNameSearch, allUsersData, timeSearchTitle } = this.props;
    const { nature, showDate, startTime, endTime, channelNum, productCode, day, month, quarter, timeMode, customerName, 
      channelCode, userId} = this.state;
    
    const newNatureData = [{
      code: '',
      name: '全部'
    }];
    natureData && natureData.map(item => {
      newNatureData.push(item);
    });

    const newChannelData = [{
      label: '全部', 
      value: ''
    }];
    
    const newAllUsersData = [{
      label: '全部', 
      value: ''
    }];

    (channelData || []).map(item => {
      newChannelData.push({
        label: item.fullName || '', 
        value: item.id || ''
      });
    });

    const newProductData = [{
      label: '全部', 
      value: ''
    }];

    (productData || []).map(item => {
      newProductData.push({
        label: item.zhName || '', 
        value: item.code || ''
      });
    });

    (allUsersData || []).map(item => {
      newAllUsersData.push({
        label: item.userName || '', 
        value: item.userId || ''
      });
    });

    //抽屉里面的筛选内容
    const drawerContent = (
      <div className="drawerContent">
        <div className="topTitle">高级筛选</div>
        {/* 按客户名称筛选-客户列表*/}
        {
          customerNameSearch
          ?
          <div className="filterItem channel">
            <div className="title">客户名称</div>
            <div className="itemsWrap SearchBox">
              <SearchBar 
                onChange={e => this.setState({customerName: e})} 
                placeholder="请输入客户名称"
                cancelText="清空"
              />
            </div>
          </div>
          :
          null
        }
      {/* 按客户编号筛选-客户列表*/}
        {
          allUsersData
          ?
          <div className="filterItem channel">
            <div className="title">按用户查询</div>
            <div className="itemsWrap">
              <EditItem
                type="picker"
                pickerDatas={newAllUsersData}
                value={userId}
                label="选择用户"
                placeholder="选择用户"
                cascade
                cols={1}
                onOk={v => {
                  this.setState({ userId: v });
                }}
              />
            </div>
          </div>
          :
          null
        }
        {/* 按性质筛选 */}
        {
          natureData
          ?
          <div className="filterItem nature">
            <div className="title">{natureName ? natureName : '客户性质'}</div>
            <div className="itemsWrap">
              {newNatureData && newNatureData.map(item => (
                <Tag 
                  key={item.code} 
                  selected={nature === item.code} 
                  onChange={() => this.ChangeNature(item.code)}
                >
                  {item.name}
                </Tag>
              ))}
            </div>
          </div>
          :
          null
        }
        {/* 按渠道名称筛选-渠道列表*/}
        {
          channelNameSearch
          ?
          <div className="filterItem channel">
            <div className="title">渠道名称</div>
            <div className="itemsWrap SearchBox">
              <SearchBar 
                onChange={e => this.setState({channelName: e})} 
                placeholder="请输入渠道名称"
                cancelText="清空"
              />
            </div>
          </div>
          :
          null
        }
        {/* 按渠道编码筛选-渠道列表*/}
        {
          channelCodeSearch
          ?
          <div className="filterItem channel">
            <div className="title">渠道编码</div>
            <div className="itemsWrap SearchBox">
              <SearchBar 
                onChange={e => this.setState({channelCode: e})} 
                placeholder="请输入渠道编码"
                cancelText="清空"
              />
            </div>
          </div>
          :
          null
        }
        {/* 按渠道名称筛选-客户报表*/}
        {
          channelData
          ?
          <div className="filterItem channel">
            <div className="title">渠道</div>
            <div className="itemsWrap">
              <EditItem
                type="picker"
                pickerDatas={newChannelData}
                value={channelNum}
                label="选择渠道"
                placeholder="选择渠道"
                cascade
                cols={1}
                onOk={v => {
                  this.setState({ channelNum: v });
                }}
              />
            </div>
          </div>
          :
          null
        }
        {/* 按产品筛选 */}
        {
          productData
          ?
          <div className="filterItem channel">
            <div className="title">产品</div>
            <div className="itemsWrap">
              <EditItem
                type="picker"
                pickerDatas={newProductData}
                value={productCode}
                label="选择产品"
                placeholder="选择产品"
                cascade
                cols={1}
                onOk={v => {
                  this.setState({ productCode: v });
                }}
              />
            </div>
          </div>
          :
          null
        }
        {/* 按时间筛选，包含天，月，季度，时间段 */}
        {
          hasTime
          ?
          <div className="filterItem channel time">
            <div className="title">{timeSearchTitle || '时间查询'}</div>
            {/* 时间类型标签 */}
            <div className="itemsWrap">
              {timeLabelData.map(item => (
                <Tag 
                  key={item.code} 
                  selected={timeMode === item.code} 
                  onChange={() => this.changeTimeMode(item.code)}
                >
                  {item.name}
                </Tag>
              ))}
            </div>
            <div>
              {/* 按天筛选 */}
              {
                timeMode==='1'
                ?
                <EditItem
                  type="datePicker"
                  mode="date"
                  value={day}
                  label="选择日期"
                  placeholder="选择日期"
                  onChange={date => {
                    this.setState({ 
                      day: date,
                      month: '',
                      quarter: '',
                      startTime: '',
                      endTime: ''
                    });
                  }}
                />
                :
                null
              }
              {/* 按月筛选 */}
              {
                timeMode==='2'
                ?
                <EditItem
                  type="datePicker"
                  mode="month"
                  format={val => dateFormatter(val, 4)}
                  value={month}
                  label="选择月份"
                  placeholder="选择月份"
                  onChange={month => {
                    this.setState({ 
                      month: month,
                      quarter: '',
                      startTime: '',
                      endTime: '',
                      day: ''
                    });
                  }}
                />
                :
                null
              }
              {/* 按季度筛选 */}
              {
                timeMode==='3'
                ?
                <EditItem
                  type="picker"
                  pickerDatas={quarterData}
                  value={quarter}
                  label="选择季度"
                  placeholder="选择季度"
                  cols={1}
                  onOk={v => {
                    this.setState({ 
                      quarter: v,
                      startTime: '',
                      endTime: '',
                      day: '',
                      month: ''
                    });
                  }}
                />
                :
                null
              }
              {/* 按时间段筛选 */}
              {
                timeMode==='4'
                ?
                <div>
                  <div className="selectDate">
                    <div className="startTime">
                      <div className="label">开始时间：</div>
                      <div className="value" onClick={() => this.setState({showDate: true})}>{dateFormatter(startTime, 2)}</div>
                    </div>
                    <div className="minLine">--</div>
                    <div className="endTime">
                      <div className="label">结束时间：</div>
                      <div className="value" onClick={() => this.setState({showDate: true})}>{dateFormatter(endTime, 2)}</div>
                    </div>
                    {
                      (startTime && endTime)
                      ?
                      <div className="clearDate" onClick={this.onDateClear}></div>
                      :
                      null
                    }  
                  </div>
                  <div className="itemsWrap">
                    <Calendar
                      visible={showDate}
                      onCancel={this.onDateCancel}
                      onConfirm={this.onDateConfirm}
                      defaultDate={now}
                      defaultValue={[startTime, endTime]}
                    />
                  </div>
                </div>
                :
                null
              }
            </div>
          </div>
          :
          null
        }
        
        <div className="botWrap">
          <div onClick={this.onOpenChange}>取消</div>
          <div onClick={() => this.searchFn(noSplitLine)} className="sure">查询</div>
        </div>
      </div>
    )
    
    return (
      <Drawer
        className={`filterWrap${drawerVisible ? ' show' : ''}`}
        style={{ minHeight: document.documentElement.clientHeight }}
        sidebar={drawerContent}
        open={drawerVisible}
        onOpenChange={this.onOpenChange}
        position="right"
        contentStyle={{ 
          color: '#A6A6A6', 
          textAlign: 'center', 
          paddingTop: 42 
        }}
        sidebarStyle={{ 
          width: '80%',
          backgroundColor: '#fff',
          padding: '18px 10px 1.3rem',
          overflowY: 'auto'
        }}
        overlayStyle={{ 
          backgroundColor: 'rgba(0, 0, 0, 0.2)'
        }}
      >
        <div className="blank"></div>
      </Drawer>
    );
  }
  
};
