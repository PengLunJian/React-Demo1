//  名片-列表
import React, { Component } from 'react';
import { Popconfirm } from 'antd';
import CustomeTable from '../common/Custom-Table';
import isHavePermission from '../../utils/isHavePermission';
import UrlDetail from '../../containers/product/urlDetail';

export default class TableContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editVisible: false, //  编辑框
      urlRecordData: null,   //  内容
      canEditUrl: false,     //  是否可以编辑
    };
  }

  addFileFn = () => {
    this.setState({
      editVisible: true,
      canEditUrl: true,
      urlRecordData: {}
    })
  }

  hideUrlDetail = () => {
    this.setState({
      editVisible: false,
      canEditUrl: false
    });
  };

  render() {
    const { editVisible, urlRecordData, canEditUrl } = this.state;
    const { roles, fileTypeData, ...props } = this.props;

    const options = [
      {
        title: '链接名称',
        dataIndex: 'name',
        key: 'name',
      }, {
        title: '链接地址',
        dataIndex: 'link',
        key: 'link'
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
                      urlRecordData: record,
                      canEditUrl: true
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
                  window.open(record.link);
                }}
              >
                打开链接
              </div>
              {
                isHavePermission(roles, 3)
                ?
                <Popconfirm
                  title="确认删除此链接？"
                  onConfirm={(e) => {
                    e.stopPropagation();
                    this.props.deleteUrlFn(record.id);
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

    const columns = !isHavePermission(roles, 1) ? [...options, editItem] : options;
  
    return (
      <div className="TableContent fileList">
        {
          isHavePermission(roles, 3)
          ?
          <div className="fileListTable">
            <div className="Search-BtnContainer">
              <div>
                <div className="addBtn" onClick={this.addFileFn}>新增外链</div>
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
                urlRecordData: record,
                canEditUrl: false
              });
            },
          })}
          {...props}
        />

        <UrlDetail
          canEditUrl={canEditUrl}
          visible={editVisible}
          hideUrlDetail={this.hideUrlDetail}
          urlRecordData={urlRecordData}
          loadData={this.props.loadUrlList}
          fileTypeData={fileTypeData}
          {...props}
        />
      </div>
    );
  }
}
