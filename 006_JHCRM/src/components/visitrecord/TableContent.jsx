//  联系人-列表
import React, { Component } from 'react';
import { Popconfirm } from 'antd';
import CustomeTable from '../common/Custom-Table';
import VisitRecordDetail from '../../containers/visitrecord/vistirecordDetail';
import dateFormatter from '../../utils/dataTimeFormatter';

export default class TableContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editVisible: false, //  编辑框
      recordData: null,   //  内容
      canEdit: false,     //  是否可以编辑
    };
  }
  
  //  判断性质/行业分类等接口获取数据的label显示
  showLabel = (code, type) => {
    const typeData = this.props.dictionaryData.data && this.props.dictionaryData.data[type];
    let name = '';
    typeData && typeData.map(item => {
      if (code === item.code) {
        name = item.name;
      }
    });
    return name;
  };

  //取多条数据里面的单个字段名称集合
  gatherLabel = (data, label) => {
    let labels = [];
    data && data.map(item => {
      if(item[label]){
        labels.push(item[label])
      }
    })
    return labels.join()
  }
  
  hideEditModal = () => {
    this.setState({
      editVisible: false
    });
  };
  
  render() {
    const { editVisible, recordData, canEdit } = this.state;
    const { dictionaryData, ...props } = this.props;
    
    const columns = [{
      title: '报告人',
      dataIndex: 'userName',
      key: 'userName',
    },{
      title: '拜访主题',
      dataIndex: 'subject',
      key: 'subject',
    }, {
      title: '拜访时间',
      dataIndex: 'visitDate',
      key: 'visitDate',
      render: (text) => text ? dateFormatter(text, 2) : ''
    }, {
      title: '拜访形式',
      dataIndex: 'visitType',
      key: 'visitType',
      render: (text) => this.showLabel(text, 'visitType')
    }, {
      title: '提交日期',
      dataIndex: 'createDate',
      key: 'createDate',
      render: (text) => text ? dateFormatter(text, 2) : ''
    }, {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      render: (text,record) => text==0 ? '客户' : '渠道'
    }, {
      title: '拜访对象',
      dataIndex: 'customersInfo',
      key: 'customersInfo',
      render: (text,record) => {
        const visitObj = record.channelsInfo ? record.channelsInfo : record.customersInfo;
        return this.gatherLabel(visitObj, 'name');
      }
    }, {
      title: '被拜访人',
      dataIndex: 'contactsInfo',
      key: 'contactsInfo',
      render: (text) => this.gatherLabel(text, 'name')
    }, {
      title: '涉及产品',
      dataIndex: 'product',
      key: 'product',
      render: (text) => this.gatherLabel(text, 'name')
    }, {
      title: '同行人',
      dataIndex: 'usersInfo',
      key: 'usersInfo',
      render: (text) => this.gatherLabel(text, 'name')
    }];
  
    return (
      <div className="TableContent visitRecord">
        <CustomeTable
          columns={columns}
          rowKey="visitRecordId"
          onRow={(record) => ({
            onClick: () => {
              this.setState({
                editVisible: true,
                recordData: record
              });
            },
          })}
          {...props}
        />
        
        <VisitRecordDetail
          canEdit={canEdit}
          visible={editVisible}
          hideEditModal={this.hideEditModal}
          recordData={recordData}
          dictionaryData={dictionaryData}
        />
      </div>
    );
  }
}
