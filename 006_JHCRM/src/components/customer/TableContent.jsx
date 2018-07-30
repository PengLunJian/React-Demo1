//  客户-列表
import React, { Component } from 'react';
import { Popconfirm } from 'antd';
import CustomeTable from '../common/Custom-Table';
import CustomerDetail from '../../containers/customer/CustomerDetail';
import isHavePermission from '../../utils/isHavePermission';

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
    const typeData = this.props.dictionaryData[type];
    let name = '';
    typeData && typeData.map(item => {
      if (code === item.code) {
        name = item.name;
      }
    });
    return name;
  };
  
  hideEditModal = () => {
    this.setState({
      editVisible: false
    });
  };
  
  render() {
    const { editVisible, recordData, canEdit } = this.state;
    const { dictionaryData, roles, ...props } = this.props;

    const options = [
      {
        title: '客户编码',
        dataIndex: 'customerNum',
        key: 'customerNum'
      }, {
        title: '客户全称',
        dataIndex: 'fullName',
        key: 'fullName',
      }, {
        title: '客户简称',
        dataIndex: 'abbreviationName',
        key: 'abbreviationName',
      }, {
        title: '所在地点',
        dataIndex: 'address',
        key: 'address',
      }, {
        title: '介绍人',
        dataIndex: 'introducer',
        key: 'introducer',
      }, {
        title: '行业分类',
        dataIndex: 'industryType',
        key: 'industryType',
        render: (text) => this.showLabel(text, 'industryType')
      }, {
        title: '开户时间',
        dataIndex: 'openAccountDate',
        key: 'openAccountDate',
      }, {
        title: '第一次入款时间',
        dataIndex: 'firstIncomeDate',
        key: 'firstIncomeDate',
      }
    ]

    const editItem = {
      title: '操作',
      key: 'action',
      render: (text, record) => {
        return (
          this.props.data && this.props.data.length > 0 ?
            <div>
              <div
                className="editBtn"
                onClick={(e) => {
                  e.stopPropagation();
                  this.setState({
                    editVisible: true,
                    recordData: record,
                    canEdit: true
                  });
                }}
              >
                编辑
              </div>
            </div>
            :
            null
        );
      }
    }
    
    const columns = !isHavePermission(roles, 1) ? [...options, editItem] : options;
  
    return (
      <div className="TableContent customer">
        <CustomeTable
          columns={columns}
          rowKey="id"
          rowClassName={(record, index) => record.reallyNum ? 'reallyNum' : ''}
          onRow={(record) => ({
            onClick: () => {
              this.setState({
                editVisible: true,
                recordData: record,
                canEdit: false
              });
            },
          })}
          {...props}
        />
        
        <CustomerDetail
          canEdit={canEdit}
          visible={editVisible}
          hideEditModal={this.hideEditModal}
          data={recordData}
          dictionaryData={dictionaryData}
        />
      </div>
    );
  }
}
