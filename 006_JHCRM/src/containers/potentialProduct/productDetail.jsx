import React, { Component } from 'react';
import { connect } from 'react-redux';
import { message } from 'antd';
import CustomItem from '../../components/common/Custom-Item';
import {
  editPotentialProduct,
  addPotentialProduct
} from '../../redux/ducks/product/potentialList';
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
      id: '',   // 产品id
      classId: '',      // 产品分类id
      zhName: '',      // 产品名称
      issueDate: '',      // 发行日期
      establishDate: '',      // 成立日期
      code: '',         // 产品编码
      // incomeunit: '',      // 万份收益
      // incomeratio: '',      // 七日年华收益率
      // netvalue: '',      // 净值
    };
  }
  
  //接收列表传过来的单条记录数据
  componentWillReceiveProps(nextProps) {
    if (!this.props.data || this.props.data !== nextProps.recordData) {
      const { recordData } = nextProps;
      if (recordData) {
        this.resetStateFn(recordData);
      }
    }
  }

  resetStateFn = (data) => {
    this.setState({
      id: data.id || '',   // 产品id
      classId: data.classId || '',      // 产品分类id
      zhName: data.zhName || '', 
      issueDate: data.issueDate || '', 
      establishDate: data.establishDate || '', 
      code: data.code || ''
      // incomeunit: data.netInfo ? data.netInfo.incomeunit : '', 
      // incomeratio: data.netInfo ? data.netInfo.incomeratio : '', 
      // netvalue: data.netInfo ? data.netInfo.netvalue : '', 
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
    this.resetStateFn(recordData || []);
    this.props.hideEditModal();
  }

  //  判断输入的内容是否为空
  isInputValueLegal = () => {
    const { zhName, classId, code } = this.state;
    if (!zhName) {
      message.warning('请输入产品名称！');
      return
    } else if (!code) {
      message.warning('请输入产品编码！');
      return
    } else if (!classId && classId != 0) {
      message.warning('请选择产品类型！');
      return
    } else {
      return true;
    }
  };
  
  //  保存修改
  saveFn = () => {
    if (!this.isInputValueLegal()) {
      return;
    }

    const infoObj = Object.assign({}, this.state);

    if(this.state.id){
      this.props.editPotentialProduct(infoObj)
        .then(() => {
          const { editIsSuccess, eidtIsFailed } = this.props;
          if (editIsSuccess) {
            this.props.hideEditModal();
            this.props.loadData();
            message.success('修改产品成功！');
          } else {
            message.error('修改产品失败！');
          }
        }).catch((error) => {
          console.error(error);
        });
      }else{
        this.props.addPotentialProduct(infoObj)
          .then(() => {
            const { editIsSuccess, eidtIsFailed } = this.props;
            if (editIsSuccess) {
              this.props.hideEditModal();
              this.props.loadData();
              message.success('添加产品成功！');
            } else {
              message.error('添加产品失败！');
            }
          }).catch((error) => {
            console.error(error);
          });
      }

    
  };
  
  render() {
    const { visible, recordData, canEdit, ...props } = this.props;
    const { id, classId, code, zhName, issueDate, establishDate, incomeunit, incomeratio, netvalue } = this.state;
   
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
            type={canEdit ? 'input' : 'inputShow'}
            label="产品名称"
            value={zhName}
            placeholder="请输入产品名称"
            onChange={e => {
              this.setState({ zhName: e.target.value });
            }}
          />
          <CustomItem
            type={canEdit ? 'select' : 'inputShow'}
            label="产品类型"
            value={canEdit? classId : this.showLabel(classId)}
            placeholder="请选择产品类型"
            options={productTypeData}
            onChange={e => {
              this.setState({ classId: e });
            }}
          />
          <CustomItem
            type={canEdit ? 'datePicker' : 'inputShow'}
            label="发行日期"
            value={issueDate}
            placeholder="请选择发行日期"
            onChange={(date, dateString) => {
              this.setState({ issueDate: dateString });
            }}
          />
          <CustomItem
            type={canEdit ? 'datePicker' : 'inputShow'}
            label="成立日期"
            value={establishDate}
            placeholder="请选择成立日期"
            onChange={(date, dateString) => {
              this.setState({ establishDate: dateString });
            }}
          />
          <CustomItem
            type={canEdit ? 'input' : 'inputShow'}
            label="产品代码"
            value={code}
            placeholder="请输入产品代码"
            onChange={e => {
              this.setState({ code: e.target.value });
            }}
          />
          {/*<CustomItem
            type={canEdit ? 'input' : 'inputShow'}
            label="万份收益"
            value={incomeunit}
            placeholder="请输入万份收益"
            onChange={e => {
              this.setState({ incomeunit: e.target.value });
            }}
          />
          <CustomItem
            type={canEdit ? 'input' : 'inputShow'}
            label="七日年华收益率"
            value={incomeratio}
            placeholder="请输入七日年华收益率"
            onChange={e => {
              this.setState({ incomeratio: e.target.value });
            }}
          />
          <CustomItem
            type={canEdit ? 'input' : 'inputShow'}
            label="净值"
            value={netvalue}
            placeholder="请输入净值"
            onChange={e => {
              this.setState({ netvalue: e.target.value });
            }}
          />*/}
        </div>
      </CustomModal>
    );
  }
}

const mapStateToProps = (state) => {
  const { product } = state;
  const { potentialList } = product;
  const { eidtIsFailed, editIsLoading, editIsSuccess } = potentialList;
  
  return {
    eidtIsFailed,
    editIsLoading,
    editIsSuccess,
  };
};

export default connect(mapStateToProps, {
  editPotentialProduct,
  addPotentialProduct
})(ProductDetail);
