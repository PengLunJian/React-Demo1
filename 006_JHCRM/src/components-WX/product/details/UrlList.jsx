//  产品附件--列表
import React, { Component } from 'react';
import { List } from 'antd-mobile';
import { PRODUCT_DETAIL, ATTACHMENT_DETAIL } from '../../../constants/routes';
import HighList from '../../../hoc-WX/HighList';

import './UrlList.less';

class UrlList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  toDetail = (href) => {
    const { match, history } = this.props;
    // const testHref = 'http://app.haoamc.com/uploadfile/COMMON-WEB/CRM/201807/%E5%91%A8%E5%B7%A5%E4%BD%9C%E5%AE%89%E6%8E%92.doc';
    // const testHref = 'https://app.alldobetter.com/static/f10_xy/9a1b9468cb02034e764ab05d33cdc35d.png';
    // window.location.href = href;
    window.open(href);
    // history.push({
    //   pathname: PRODUCT_DETAIL + '/' + match.params.id + ATTACHMENT_DETAIL,
    //   search: '?href=' + encodeURI(href)
    // })
  }
  
  render() {
    const { UrlData, history,  ...props } = this.props;

    return (
      UrlData && UrlData.map(item => (
        <div className="listItem" key={item.id}> 
          <List.Item onClick={() => this.toDetail(item.link)}>
            <div className="urlListItem">
              <div className="fileName">{item.name}</div>
            </div>
          </List.Item>
        </div>
      ))
    );
  }
}

const ListComponent = HighList()(UrlList);

export default ListComponent;
