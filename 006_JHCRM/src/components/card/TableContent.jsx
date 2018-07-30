//  名片-列表
import React, { Component } from 'react';
import { Popconfirm } from 'antd';
import CustomeTable from '../common/Custom-Table';
import CardDetail from '../../containers/card/CardDetail';
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
        title: '姓名',
        dataIndex: 'zhName',
        key: 'zhName',
      }, {
        title: '性别',
        dataIndex: 'sex',
        key: 'sex',
        render: (text) => text.toString()==='0' ? '男' : '女'
      }, {
        title: '职位',
        dataIndex: 'position',
        key: 'position',
      }, {
        title: '部门',
        dataIndex: 'department',
        key: 'department'
      }, {
        title: '手机',
        dataIndex: 'phones',
        key: 'phones',
      }, {
        title: '邮箱',
        dataIndex: 'emails',
        key: 'emails',
      }, {
        title: '传真',
        dataIndex: 'fax',
        key: 'fax',
      }, {
        title: '邮编',
        dataIndex: 'postCode',
        key: 'postCode',
      }, {
        title: '教育',
        dataIndex: 'education',
        key: 'education',
      }, {
        title: '生日',
        dataIndex: 'birthday',
        key: 'birthday',
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
              <Popconfirm
                title="确认删除此名片？"
                onConfirm={(e) => {
                  e.stopPropagation();
                  this.props.deleteCardFn(record.id);
                }}
                onCancel={(e) => {
                  e.stopPropagation();
                }}
              >
                <span className="deleteBtn" onClick={(e) => { e.stopPropagation() }}>删除</span>
              </Popconfirm>
            </div>
            :
            null
        );
      },
    }

    const columns = isHavePermission(roles, 3) ? [...options, editItem] : options;
  
    return (
      <div className="TableContent card">
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
        
        <CardDetail
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
