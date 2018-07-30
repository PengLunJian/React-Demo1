//  联系人-列表
import React, { Component } from 'react';
import { Popconfirm } from 'antd';
import CustomeTable from '../common/Custom-Table';
import ContactDetail from '../../containers/contacts/ContactDetail';

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
    const { dictionaryData, ...props } = this.props;
  
    const columns = [{
      title: '姓名',
      dataIndex: 'zhName',
      key: 'zhName',
    }, {
      title: '英文名',
      dataIndex: 'enName',
      key: 'enName',
    }, {
      title: '所属类型',
      dataIndex: 'contactsType',
      key: 'contactsType',
      render: (text) => {
        if (text === 0) {
          return '客户';
        } else if (text === 1) {
          return '渠道';
        }else{
          return ''
        }
      }
    }, {
      title: '部门',
      dataIndex: 'department',
      key: 'department',
    }, {
      title: '职位',
      dataIndex: 'position',
      key: 'position',
    }, {
      title: '电话',
      dataIndex: 'phones',
      key: 'phones',
    }, {
      title: '邮箱',
      dataIndex: 'emails',
      key: 'emails',
    }, {
      title: '邮编',
      dataIndex: 'postCode',
      key: 'postCode',
    }, {
      title: '传真',
      dataIndex: 'fax',
      key: 'fax',
    }, {
      title: '性别',
      dataIndex: 'sex',
      key: 'sex',
      render: text => (text.toString() === '0' ? '男' : '女')
    }, {
      title: '生日',
      dataIndex: 'birthday',
      key: 'birthday',
    }];
  
    return (
      <div className="TableContent contacts">
        <CustomeTable
          columns={columns}
          rowKey="id"
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
        
        <ContactDetail
          canEdit={canEdit}
          visible={editVisible}
          hideEditModal={this.hideEditModal}
          recordData={recordData}
        />
      </div>
    );
  }
}
