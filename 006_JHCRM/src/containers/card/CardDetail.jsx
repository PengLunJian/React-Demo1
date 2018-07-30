import React, { Component } from 'react';
import { connect } from 'react-redux';
import { message } from 'antd';
import CustomItem from '../../components/common/Custom-Item';
import {
  saveCardEdit
} from '../../redux/ducks/card/details/basicInfo';
import CustomModal from '../../components/common/Custom-Modal';

const genderOptions = [
  {code: '', name: '未选择'},
  {code: 0, name: '男'},
  {code: 1, name: '女'}
]

class CardDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardId: '',           //  名片id
      birthday: '',         //  生日
      cardImagePath: '',    //  图片路径（不可更改）
      department: '',       //  部门
      education: '',        //  教育学历
      emails: '',           //  邮箱
      fax: '',              //  传真
      phones: '',           //  电话（多条）
      position: '',         //  职位
      postCode: '',         //  邮编
      sex: '',              //  性别 0：男 1：女
      zhName: '',           //  姓名
      phoneTags: [],
      emailTags: [],
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
  
  //  取消-还原操作
  onCancelFn = () => {
    const { data } = this.props;
    this.resetStateFn(data);
    this.props.hideEditModal();
  }
  
  //  保存修改
  saveCardFn = (state) => {
    if (!this.isInputValueLegal()) {
      return;
    }
    
    const cardInfo = Object.assign({}, this.state);
    
    cardInfo.phones = cardInfo.phoneTags ? cardInfo.phoneTags.join() : '';
    cardInfo.emails = cardInfo.emailTags ? cardInfo.emailTags.join() : '';
    cardInfo.phoneTags = '';
    cardInfo.emailTags = '';
    this.props.saveCardEdit(cardInfo, cardInfo.cardId)
      .then(() => {
        const { addIsSuccess, addIsFailed, data } = this.props;
        if (addIsSuccess) {
          this.props.hideEditModal();
          this.resetStateFn(data);
          message.success('修改名片成功！');
        } else {
          message.error('修改名片失败！');
        }
      }).catch((error) => {
        console.error(error);
      });
  };
  
  //  判断输入的内容是否为空
  isInputValueLegal = () => {
    const { zhName, phones } = this.state;
    if (!zhName) {
      message.warning('请输入姓名！');
    } else {
      return true;
    }
  };

  resetStateFn = (data, id) => {
    this.setState({
      cardId: data.id || '',                       //  名片id
      birthday: data.birthday || '',               //  生日
      cardImagePath: data.cardImagePath || '',     //  图片路径（不可更改）
      department: data.department || '',           //  部门
      education: data.education || '',             //  教育学历
      emails: data.emails || '',                   //  邮箱
      fax: data.fax || '',                         //  传真
      phones: data.phones || '',                   //  电话（可多条）
      position: data.position || '',               //  职位
      postCode: data.postCode || '',               //  邮编
      sex: data.sex !==null ? data.sex : '',                         //  性别 0：男 1：女
      zhName: data.zhName || '',                   //  姓名
      phoneTags: data.phones ? data.phones.split(',') : [],
      emailTags: data.emails ? data.emails.split(',') : [],
    });
  };
  
  //  判断性质/行业分类等接口获取数据的label显示
  showLabel = (code, type) => {
    const typeData = genderOptions;
    let gender = '';
    typeData && typeData.map(item => {
      if (code === item.code) {
        gender = item.name;
      }
    });
    return gender;
  };

  addPhoneTags = (tags) => {
    const editTags = tags ? tags : [];
    this.setState({
      phoneTags: tags
    })
  }

  addEmailTags = (tags) => {
    const editTags = tags ? tags : [];
    this.setState({
      emailTags: tags
    })
  }
  
  render() {
    const { dictionaryData, visible, recordData, canEdit, ...props } = this.props;
    
    const {
      birthday,
      department,
      education,
      emails,
      fax,       
      phones,
      position,
      postCode,
      sex,
      zhName,
      phoneTags,
      emailTags
    } = this.state;
  
    return (
      <CustomModal
        canEdit={canEdit}
        visible={visible}
        onOk={this.saveCardFn}
        onCancel={this.onCancelFn}
        okText="确认"
        cancelText="取消"
        title="名片详情"
      >
        <div>
          <CustomItem
            type={canEdit ? 'input' : 'inputShow'}
            canEdit={canEdit}
            label="姓名"
            value={zhName}
            onChange={e => {
              this.setState({ zhName: e.target.value });
            }}
          />
          <CustomItem
            type={canEdit ? 'select' : 'inputShow'}
            label="性别"
            value={canEdit? sex : this.showLabel(sex)}
            placeholder="请选择性别"
            options={genderOptions}
            onChange={e => {
              this.setState({ sex: e });
            }}
          />
          <CustomItem
            type={canEdit ? 'input' : 'inputShow'}
            label="职位"
            value={position}
            placeholder="请填写职位"
            onChange={e => {
              this.setState({ position: e.target.value });
            }}
          />
          <CustomItem
            type={canEdit ? 'input' : 'inputShow'}
            label="部门名称"
            value={department}
            placeholder="请输入部门名称"
            onChange={e => {
              this.setState({ department: e.target.value });
            }}
          />
          <CustomItem
            type={canEdit ? 'input' : 'inputShow'}
            label="传真"
            value={fax}
            placeholder="请输入传真号"
            onChange={e => {
              this.setState({ fax: e.target.value });
            }}
          />
          <CustomItem
            type={canEdit ? 'input' : 'inputShow'}
            label="邮编"
            value={postCode}
            placeholder="请输入邮编"
            onChange={e => {
              this.setState({ postCode: e.target.value });
            }}
          />
          <CustomItem
            type={canEdit ? 'input' : 'inputShow'}
            label="教育"
            value={education}
            placeholder="请输入教育学历"
            onChange={e => {
              this.setState({ education: e.target.value });
            }}
          />
          <CustomItem
            type={canEdit ? 'datePicker' : 'inputShow'}
            label="生日"
            value={birthday}
            placeholder="请选择生日"
            onChange={(date, dateString) => {
              this.setState({ birthday: dateString });
            }}
          />
          <CustomItem 
            type={canEdit ? 'multiTags' : 'multiTags'}
            label="电话"
            tagsData={phoneTags}
            addTagsFn={this.addPhoneTags}
            isSingle
            canEdit={canEdit}
          />
          <CustomItem 
            type={'multiTags'}
            label="邮箱"
            tagsData={emailTags}
            addTagsFn={this.addEmailTags}
            isSingle
            canEdit={canEdit}
          />
        </div>
      </CustomModal>
    );
  }
}

const mapStateToProps = (state) => {
  const { card } = state;
  const { basicInfo } = card;
  const { data, addIsFailed, addIsLoading, addIsSuccess } = basicInfo;
  
  return {
    data, 
    addIsFailed,
    addIsLoading,
    addIsSuccess,
  };
};

export default connect(mapStateToProps, {
  saveCardEdit
})(CardDetail);
