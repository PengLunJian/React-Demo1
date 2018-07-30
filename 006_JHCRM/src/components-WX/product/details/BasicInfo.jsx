//  产品详情-基本信息
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  List,
  Toast
} from 'antd-mobile';
import {
  loadProductDetail
} from '../../../redux/ducks/product/detail/productDetail';
import EditItem from '../../common/EditItem';

import './BasicInfo.less';

class BasicInfo extends Component {
  componentDidMount() {
    const { match } = this.props;
    //  有路由id则请求数据
    if (match.params && match.params.id) {
      // Toast.loading('正在加载...', 0);
      this.props.loadProductDetail({ productId: match.params.id })
          .then(() => {
            Toast.hide();
          })
          .catch(err => {
            console.error(err);
            Toast.fail('请求失败...'); 
          });
    }
  }
  
  render() {
    let valueObj = {
      fundname: '',
      fundcode: '',
      classId: '',
      issuedate: '',
      setupdate: '',
      incomeunit: '',
      incomeratio: '',
      netvalue: ''
    };
    const { data } = this.props;
    if (data) {
      valueObj = data;
      valueObj.incomeunit = data.netInfo ? data.netInfo.incomeunit : '';
      valueObj.incomeratio = data.netInfo ? data.netInfo.incomeratio : '';
      valueObj.netvalue = data.netInfo ? data.netInfo.netvalue : '';
    }
    
    return (
      <div className="BasicInfo BasicInfo_product">
        <List>
          <EditItem
            type="inputShow"
            label="产品名称"
            value={valueObj.fundname}
          />
          <EditItem
            type="inputShow"
            label="产品代码"
            value={valueObj.fundcode}
          />
          <EditItem
            type="inputShow"
            label="产品类型"
            value={valueObj.classId}
          />
          <EditItem
            type="inputShow"
            label="发行日期"
            value={valueObj.issuedate}
          />
          <EditItem
            type="inputShow"
            label="成立日期"
            value={valueObj.setupdate}
          />
          <EditItem
            type="inputShow"
            label="万份收益(元)"
            value={valueObj.incomeunit}
          />
          <EditItem
            type="inputShow"
            label="七日年华收益率(%)"
            value={ valueObj.incomeratio }
          />
          <EditItem
            type="inputShow"
            label="净值"
            value={valueObj.netvalue}
          />
        </List>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { product } = state;
  const { details } = product;
  const { data, isLoading } = details;
  
  return {
    data,
    isLoading
  };
};

export default connect(mapStateToProps, {
  loadProductDetail
})(BasicInfo);
