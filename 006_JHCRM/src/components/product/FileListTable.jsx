//  名片-列表
import React, { Component } from 'react';
import { Popconfirm } from 'antd';
import CustomeTable from '../common/Custom-Table';
import ProductDetail from '../../containers/product/ProductDetail';
import isHavePermission from '../../utils/isHavePermission';
import FileDetail from '../../containers/product/fileDetail';

export default class TableContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editVisible: false, //  编辑框
      fileRecordData: null,   //  内容
      canEditFile: false,     //  是否可以编辑
    };
  }

  addFileFn = () => {
    this.setState({
      editVisible: true,
      canEditFile: true,
      fileRecordData: {}
    })
  }

  hideFileDetail = () => {
    this.setState({
      editVisible: false,
      canEditFile: false
    });
  };

  render() {
    const { editVisible, fileRecordData, canEditFile } = this.state;
    const { roles, fileTypeData, ...props } = this.props;

    const options = [
      {
        title: '附件名称',
        dataIndex: 'fileName',
        key: 'fileName',
      }, {
        title: '附件类型',
        dataIndex: 'fileType',
        key: 'fileType',
        render: (text) => this.props.showLabel(text, fileTypeData)
      }
    ]
    
    const editItem = {
      title: '操作',
      key: 'action',
      render: (text, record) => {
        return (
          this.props.data && this.props.data.length > 0 ?
            <div>
              {
                isHavePermission(roles, 3)
                ?
                <div
                  className="editBtn"
                  onClick={(e) => {
                    e.stopPropagation();
                    this.setState({
                      editVisible: true,
                      fileRecordData: record,
                      canEditFile: true
                    });
                  }}
                >
                  编辑
                </div>
                :
                null
              }
              <div
                className="uploadBtn"
                onClick={(e) => {
                  e.stopPropagation();
                  window.location.href = record.filePath;
                }}
              >
                下载
              </div>
              {
                isHavePermission(roles, 3)
                ?
                <Popconfirm
                  title="确认删除此附件？"
                  onConfirm={(e) => {
                    e.stopPropagation();
                    this.props.deleteFileFn(record.id);
                  }}
                  onCancel={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <span className="deleteBtn" onClick={(e) => { e.stopPropagation() }}>删除</span>
                </Popconfirm>
                :
                null
              }
              
            </div>
            :
            null
        );
      },
    }

    const columns = [...options, editItem];
  
    return (
      <div className="TableContent fileList">
        {
          isHavePermission(roles, 3)
          ?
          <div className="fileListTable">
            <div className="Search-BtnContainer">
              <div>
                <div className="addBtn" onClick={this.addFileFn}>新增附件</div>
              </div>
            </div>
          </div>
          :
          null
        }
        <CustomeTable
          columns={columns}
          rowKey="id"
          onRow={(record) => ({
            onClick: () => {
              this.setState({
                editVisible: true,
                fileRecordData: record,
                canEditFile: false
              });
            },
          })}
          {...props}
        />

        <FileDetail
          canEditFile={canEditFile}
          visible={editVisible}
          hideFileDetail={this.hideFileDetail}
          fileRecordData={fileRecordData}
          loadData={this.props.loadFileList}
          fileTypeData={fileTypeData}
          {...props}
        />
      </div>
    );
  }
}
