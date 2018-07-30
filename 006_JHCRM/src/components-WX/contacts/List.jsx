//  联系人-列表
import React, { Component } from 'react';
import HighList from '../../hoc-WX/HighList';
import ListItem from '../common/ListItem';
import { CONTACT_DETAIL } from '../../constants/routes';
import isHavePermission from '../../utils/isHavePermission';

import './List.less';

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  toDetail = (id) => {
    const { history, detailUrl, from } = this.props;
    if (detailUrl) {
      history.push({
        pathname: detailUrl + '/' + id,
        search: '?from=' + from
      });
      return;
    }
    history.push({
      pathname: CONTACT_DETAIL + '/' + id,
    });
  };
  
  render() {
    const { data, deleteItemFn, roles, ...props } = this.props;
  
    return (
      data && data.map(item => (
        <ListItem
          key={item.id}
          data={item}
          deleteItemFn={deleteItemFn}
          toDetail={this.toDetail}
          hideDelete={item.isOwn !== 0 || isHavePermission(roles, 1) || isHavePermission(roles, 3)}
          {...props}
        >
          <div className="ContactsListItem">
            <div>
              <span className={item.sex === 0 ? 'male' : 'female'} />
              <span className="fs-15">{item.zhName}</span>
              <span className="right">
                {
                  item.state === 0 || item.state === '0' ?
                    <span className="state fs-9">草稿</span>
                    :
                    null
                }
              </span>
              <span className="fs-10">{item.position}</span>
              
            </div>
            <div className="fs-12">
              <span>{item.department}</span>
              <span>{item.phones}</span>
            </div>
          </div>
        </ListItem>
      ))
    );
  }
}

const ListComponent = HighList()(List);

export default ListComponent;
