//  客户-列表
import React, { Component } from 'react';
import { Popconfirm } from 'antd';
import CustomeTable from '../common/Custom-Table';
import CustomerDetail from '../../containers/factCustomer/CustomerDetail';
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
  showLabel = (data, code) => {
    let name = '';
    data && data.map(item => {
      if (code == item.code) {
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
        title: '客户编号',
        dataIndex: 'customerNum',
        key: 'customerNum',
      }, {
        title: '客户名称',
        dataIndex: 'fullName',
        key: 'fullName',
      }, {
        title: '客户类别',
        dataIndex: 'customerType',
        key: 'customerType',
        render: (text) => this.showLabel(dictionaryData.customerType, text)
      }, {
        title: '所在地点',
        dataIndex: 'address',
        key: 'address',
      }, {
        title: '生日',
        dataIndex: 'birthday',
        key: 'birthday',
      }, {
        title: '电话',
        dataIndex: 'phone',
        key: 'phone',
      }
    ]
    
    const editItem = {
      title: '操作',
      key: 'action',
      render: (text, record) => {
        return (
          this.props.data && this.props.data.length > 0?
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
                分配销售经理
              </div>
            </div>
            :
            null
        );
      }
    }

    const columns = isHavePermission(roles, 2) || isHavePermission(roles, 3) ? [...options, editItem] : options;
  
    return (
      <div className="TableContent customer">
        <CustomeTable
          columns={columns}
          rowKey="id"
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
