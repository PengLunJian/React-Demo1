//  客户-列表
import React, { Component } from 'react';
import { Popconfirm } from 'antd';
import CustomeTable from '../common/Custom-Table';
import ChannelDetail from '../../containers/channel/ChannelDetail';
import ChannelPermission from '../../containers/channel/ChannelPermission';
import isHavePermission from '../../utils/isHavePermission';

export default class TableContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editVisible: false, //  编辑框
      recordData: null,   //  内容
      permissionVisible: false,  //权限编辑框
      canEdit: true   //是否可以编辑
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
      editVisible: false,
      canEdit: true
    });
  };

  showEditModel = (record) => {
    this.setState({ 
      editVisible: true, 
      recordData: record,
      canEdit: true
    })
  }

  showPermissionModel = (record) => {
    this.setState({ 
      permissionVisible: true,
      recordData: record 
    })
  }

  hidePermissionModel = () => {
    this.setState({ 
      permissionVisible: false
    })
  }
  
  render() {
    const { editVisible, permissionVisible, recordData, canEdit } = this.state;
    const { dictionaryData, roles, ...props } = this.props;

    const options = [
      {
        title: '渠道编码',
        dataIndex: 'channelNum',
        key: 'channelNum',
      }, {
        title: '渠道全称',
        dataIndex: 'fullName',
        key: 'fullName',
      }, {
        title: '渠道简称',
        dataIndex: 'abbreviationName',
        key: 'abbreviationName',
      }, {
        title: '父渠道名称',
        dataIndex: 'parentFullName',
        key: 'parentFullName',
      }, {
        title: '备注',
        dataIndex: 'remarks',
        key: 'remarks',
        width: 200
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
                onClick={(e) => { e.stopPropagation(); this.showEditModel(record)}}
              >
                编辑
              </div>
              <div
                className="addBtn"
                onClick={(e) => { e.stopPropagation(); this.showPermissionModel(record)}}
              >
                授权
              </div>
              <Popconfirm
                title="确认删除此渠道？"
                onConfirm={(e) => {
                  e.stopPropagation();
                  this.props.deleteChannelFn(record.id);
                }}
                onCancel={(e) => {
                  e.stopPropagation();
                }}
              >
                <div className="deleteBtn" onClick={(e) => {e.stopPropagation();}}>删除</div>
              </Popconfirm>
            </div>
            :
            null
        );
      },
    }

    const columns = !isHavePermission(roles, 1) ? [...options, editItem] : options;
    
    return (
      <div className="TableContent channel">
        <CustomeTable
          columns={columns}
          rowKey="id"
          rowClassName={(record, index) => record.reallyNum ? 'reallyNum' : ''}
          onRow={(record, index) => ({
            onClick: (e) => {
              this.setState({ editVisible: true, recordData: record, canEdit: false });
            },
          })}
          {...props}
        />
        
        <ChannelDetail
          visible={editVisible}
          hideEditModal={this.hideEditModal}
          recordData={recordData}
          canEdit={canEdit}
          dictionaryData={dictionaryData}
          {...props}
        />
        <ChannelPermission
          visible={permissionVisible}
          hidePermissionModel={this.hidePermissionModel}
          recordData={recordData}
          {...props}
        />
      </div>
    );
  }
}
