import React, { Component } from 'react';
import CustomItem from '../../components/common/Custom-Item';
import SearchBtnContainer from '../../components/common/Search-BtnContainer';
import dateFormatter from '../../utils/dataTimeFormatter';
import { obj2Search } from '../../utils/parseSearchString';

const typeOptions = [
  {'code': 0, 'name': '客户'},
  {'code': 1, 'name': '渠道'}
]

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '', 
      type: '',  // 客户/渠道
      status: '',  // 潜在/事实
      startDate: '',  //提交时间
      endDate: '',  //拜访时间
      Authorization: encodeURIComponent(JSON.parse(sessionStorage.getItem('authorization_JHCRM'))['authorization'])
    };
  }

  exportFn = ()=> {
    const exportParams = Object.assign({}, this.state);
    exportParams.startDate = exportParams.startDate ? dateFormatter(exportParams.startDate, 2) : '';
    exportParams.endDate = exportParams.endDate ? dateFormatter(exportParams.endDate, 2) : '';
    window.location.href = 'http://' + window.location.host + '/api/crm/visitRecord/downVisitRecord?' + obj2Search(exportParams);
  }
  
  render() {
    const { name, type, status, startDate, endDate } = this.state;
    const { dictionaryData } = this.props;
    const {
      customerNature, //  客户性质
      channelNature,  //  渠道性质
      visitType,   //拜访方式
    } = dictionaryData.data;

    return (
      <div className="topSearch visitrecord">
        <CustomItem
          fromSearch
          value={name}
          type="input"
          label="拜访主题"
          placeholder="请输入拜访主题"
          onChange={e => {
            this.setState({ name: e.target.value });
            this.props.onSearchChange(e.target.value, 'name');
          }}
        />
        
        <CustomItem
          fromSearch
          value={type}
          type="select"
          label="拜访对象类型"
          placeholder="请选择拜访对象类型"
          options={typeOptions}
          onChange={e => {
            this.setState({ type: e });
            this.props.onSearchChange(e, 'type');
          }}
        />

        <CustomItem
          fromSearch
          value={startDate}
          type="datePicker"
          label="提交时间"
          placeholder="请选提交时间"
          onChange={e => {
            this.setState({ startDate: e });
            this.props.onSearchChange(e ? dateFormatter(e, 2) : '', 'startDate');
          }}
        />

        <CustomItem
          fromSearch
          value={endDate}
          type="datePicker"
          label="拜访时间"
          placeholder="请选择拜访时间"
          onChange={e => {
            this.setState({ endDate: e });
            this.props.onSearchChange(e ? dateFormatter(e, 2) : '', 'endDate');
          }}
        />
        
        <SearchBtnContainer
          seachFn={this.props.searchClick}
          exportFn={this.exportFn}
        />

      </div>
    );
  }
}

