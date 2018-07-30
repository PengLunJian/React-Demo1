import React, { Component } from 'react';
import { connect } from 'react-redux';
import { message } from 'antd';
import CustomItem from '../../components/common/Custom-Item';
import {
  editProductType
} from '../../redux/ducks/product/editType';
import CustomModal from '../../components/common/Custom-Modal';

import './productDetail.less';

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

class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: '',   // 产品id
      classId: '',      // 产品分类id
      fundname: '',      // 产品名称
      issuedate: '',      // 发行日期
      setupdate: '',      // 成立日期
      incomeunit: '',      // 万份收益
      incomeratio: '',      // 七日年华收益率
      netvalue: '',      // 净值
    };
  }
  
  //接收列表传过来的单条记录数据
  componentWillReceiveProps(nextProps) {
    if (!this.props.recordData || this.props.recordData !== nextProps.recordData) {
      const { recordData } = nextProps;
      this.resetStateFn(recordData);
    }
  }

  resetStateFn = (data) => {
    this.setState({
      productId: data.fundcode || '',   // 产品id
      classId: data.classId || '',      // 产品分类id
      fundname: data.fundname || '', 
      issuedate: data.issuedate || '', 
      setupdate: data.setupdate || '', 
      incomeunit: data.netInfo ? data.netInfo.incomeunit : '', 
      incomeratio: data.netInfo ? data.netInfo.incomeratio : '', 
      netvalue: data.netInfo ? data.netInfo.netvalue : '', 
    });
  };

  //  判断性质/行业分类等接口获取数据的label显示
  showLabel = (code) => {
    const typeData = productTypeData;
    let typeName = '';
    typeData && typeData.map(item => {
      if (code === item.code) {
        typeName = item.name;
      }
    });
    return typeName;
  };

  //  取消-还原操作
  onCancelFn = () => {
    const { recordData } = this.props;
    this.resetStateFn(recordData);
    this.props.hideEditModal();
  }
  
  //  保存修改
  saveFn = () => {
    const { classId, productId } = this.state;
    this.props.editProductType({classId, productId})
      .then(() => {
        const { editIsSuccess, eidtIsFailed, data } = this.props;
        if (editIsSuccess) {
          this.props.hideEditModal();
          this.props.loadData();
          this.resetStateFn(data);
          message.success('修改产品类型成功！');
        } else {
          message.error('修改产品类型失败！');
        }
      }).catch((error) => {
        console.error(error);
      });
  };
  
  render() {
    const { visible, recordData, canEdit, ...props } = this.props;
    const { productId, classId, fundname, issuedate, setupdate, incomeunit, incomeratio, netvalue } = this.state;

    console.log(classId)
   
    return (
      <CustomModal
        canEdit={canEdit}
        visible={visible}
        onOk={this.saveFn}
        onCancel={this.onCancelFn}
        title="产品详情"
      >
        <div>
          <CustomItem
            type={'inputShow'}
            canEdit={canEdit}
            label="产品名称"
            value={fundname}
          />
          <CustomItem
            type={canEdit ? 'select' : 'inputShow'}
            label="产品类型"
            value={canEdit? classId || '' : this.showLabel(classId)}
            placeholder="请选择产品类型"
            options={productTypeData}
            onChange={e => {
              this.setState({ classId: e });
            }}
          />
          <CustomItem
            type={'inputShow'}
            canEdit={false}
            label="发行日期"
            value={issuedate}
          />
          <CustomItem
            type={'inputShow'}
            canEdit={false}
            label="产品代码"
            value={productId}
          />
          <CustomItem
            type={'inputShow'}
            canEdit={false}
            label="成立日期"
            value={setupdate}
          />
          <CustomItem
            type={'inputShow'}
            canEdit={false}
            label="万份收益"
            value={incomeunit}
          />
          <CustomItem
            type={'inputShow'}
            canEdit={false}
            label="七日年华收益率"
            value={incomeratio}
          />
          <CustomItem
            type={'inputShow'}
            canEdit={false}
            label="净值"
            value={netvalue}
          />
        </div>
      </CustomModal>
    );
  }
}

const mapStateToProps = (state) => {
  const { product } = state;
  const { productEdit } = product;
  const { data, eidtIsFailed, editIsLoading, editIsSuccess } = productEdit;
  
  return {
    data, 
    eidtIsFailed,
    editIsLoading,
    editIsSuccess,
  };
};

export default connect(mapStateToProps, {
  editProductType
})(ProductDetail);
