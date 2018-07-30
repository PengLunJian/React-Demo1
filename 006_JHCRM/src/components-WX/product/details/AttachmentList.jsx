//  产品附件--列表
import React, { Component } from 'react';
import { List } from 'antd-mobile';
import { PRODUCT_DETAIL, ATTACHMENT_DETAIL } from '../../../constants/routes';
import HighList from '../../../hoc-WX/HighList';

import './AttachmentList.less';

class AttachmentList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  //  判断性质/行业分类等接口获取数据的label显示
  showLabel = (code, data) => {
    let typeName = '';
    data && data.map(item => {
      if (code == item.code) {
        typeName = item.name;
      }
    });
    return typeName;
  };

  toDetail = (href) => {
    const { match, history } = this.props;
    // window.location.href = href;
    window.open(href);
    // history.push({
    //   pathname: PRODUCT_DETAIL + '/' + match.params.id + ATTACHMENT_DETAIL,
    //   search: '?href=' + encodeURI(href)
    // })
  }
  
  render() {
    const { AttachmentData, history, fileTypeData,  ...props } = this.props;

    return (
      AttachmentData && AttachmentData.map(item => (
        <div className="listItem" key={item.id}> 
          <List.Item onClick={() => this.toDetail(item.filePath)}>
            <div className="AttachmentList">
              <div className="fileName">{item.fileName}</div>
              <div className="fileType">文件类型：{this.showLabel(item.fileType, fileTypeData)}</div>
            </div>
          </List.Item>
        </div>
      ))
    );
  }
}

const ListComponent = HighList()(AttachmentList);

export default ListComponent;
