import React, { Component } from 'react';
import { Table } from 'antd';

import './Custom-Table.less';

export default class CustomeTable extends Component {
  constructor() {
    super();
    this.state = {};
  }
  
  render() {
    const { pageSize, data, columns, totalCount, rowKey, onRow, isLoading, rowClassName } = this.props;

    return (
      <Table
        className="Custom-Table"
        rowClassName={rowClassName}
        pageSize={pageSize}
        dataSource={data}
        columns={columns}
        rowKey={rowKey}
        scroll={{ x: true, y: true }}
        loading={{
          spinning: isLoading,
          size: 'large'
        }}
        pagination={{
          itemRender: pagiItemRender,
          total: totalCount,
          showTotal: (totalCount) => <div>共<span> {totalCount} </span>条数据</div>,
          onChange: (pageNo, pageSize) => {
            this.props.onPageChange(pageNo, pageSize);
          }
        }}
        onRow={(record, index) => onRow(record)}
        locale={{
          emptyText: '暂无数据'
        }}
      />
    );
  }
}

function pagiItemRender(current, type, originalElement) {
  if (type === 'prev') {
    return <a>上一页</a>;
  } else if (type === 'next') {
    return <a>下一页</a>;
  }
  return originalElement;
}
