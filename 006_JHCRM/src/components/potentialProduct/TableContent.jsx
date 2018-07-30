//  潜在产品-列表
import React, { Component } from 'react';
import { Popconfirm } from 'antd';
import CustomeTable from '../common/Custom-Table';
import ProductDetail from '../../containers/potentialProduct/ProductDetail';
import FileList from '../../containers/potentialProduct/fileList';
import UrlList from '../../containers/potentialProduct/urlList';
import isHavePermission from '../../utils/isHavePermission';

const productTypeData = [
  {
    name: '货币类',
    code: '1',
  }, {
    name: '混合类',
    code: '2',
  }, {
    name: '债券类',
    code: '3',
  }, {
    name: '权益类',
    code: '4',
  }
]

export default class TableContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editVisible: false, //  编辑框
      recordData: null,   //  内容
      canEdit: false,     //  是否可以编辑
      fileListVisible: false,  // 附件列表框
      urlListVisible: false,  // 附件列表框
    };
  }
  
  hideEditModal = () => {
    this.setState({
      editVisible: false
    });
  };

  hideFileListModal = () => {
    this.setState({
      fileListVisible: false
    });
  };

  hideUrlListModal = () => {
    this.setState({
      urlListVisible: false
    });
  };

  //  判断性质/行业分类等接口获取数据的label显示
  showLabel = (code) => {
    const typeData = productTypeData;
    let typeName = '';
    typeData && typeData.map(item => {
      if (code == item.code) {
        typeName = item.name;
      }
    });
    return typeName;
  };
  
  render() {
    const { editVisible, recordData, canEdit, fileListVisible, urlListVisible } = this.state;
    const { roles, ...props } = this.props;

    const options = [
      {
        title: '产品名称',
        dataIndex: 'zhName',
        key: 'zhName',
      }, {
        title: '产品代码',
        dataIndex: 'code',
        key: 'code',
      }, {
        title: '产品类型',
        dataIndex: 'classId',
        key: 'classId',
        render: (text) => this.showLabel(text)
      }, {
        title: '发行日期',
        dataIndex: 'issueDate',
        key: 'issueDate',
      }, {
        title: '成立日期',
        dataIndex: 'establishDate',
        key: 'establishDate',
      }, 
      // {
      //   title: '万份收益',
      //   dataIndex: 'netInfo.incomeunit',
      //   key: 'netInfo.incomeunit',
      // }, {
      //   title: '七日年华收益率',
      //   dataIndex: 'netInfo.incomeratio',
      //   key: 'netInfo.incomeratio',
      // }, {
      //   title: '净值',
      //   dataIndex: 'netInfo.netvalue',
      //   key: 'netInfo.netvalue',
      // }
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
                      recordData: record,
                      canEdit: true
                    });
                  }}
                >
                  编辑
                </div>
                :
                null
              }
              <div
                className="editBtn"
                onClick={(e) => {
                  e.stopPropagation();
                  this.setState({
                    fileListVisible: true,
                    recordData: record
                  });
                }}
              >
                附件
              </div>
              <div
                className="editBtn second"
                onClick={(e) => {
                  e.stopPropagation();
                  this.setState({
                    urlListVisible: true,
                    recordData: record
                  });
                }}
              >
                外链
              </div>
              {
                isHavePermission(roles, 3)
                ?
                <Popconfirm
                  title="确认删除此产品"
                  onConfirm={(e) => {
                    e.stopPropagation();
                    this.props.deleteProductFn(record.id);
                  }}
                  onCancel={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <div className="deleteBtn" onClick={(e) => {e.stopPropagation();}}>删除</div>
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
      <div className="TableContent product">
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
        
        <ProductDetail
          canEdit={canEdit}
          visible={editVisible}
          hideEditModal={this.hideEditModal}
          recordData={recordData}
          loadData={this.props.loadData}
        />

        <FileList
          visible={fileListVisible}
          hideFileListModal={this.hideFileListModal}
          recordData={recordData}
          roles={roles}
          {...props}
        />

        <UrlList
          visible={urlListVisible}
          hideUrlListModal={this.hideUrlListModal}
          recordData={recordData}
          roles={roles}
          {...props}
        />

      </div>
    );
  }
}
