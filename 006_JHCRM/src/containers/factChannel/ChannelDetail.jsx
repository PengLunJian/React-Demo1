import React, { Component } from 'react';
import { connect } from 'react-redux';
import { message } from 'antd';
import CustomItem from '../../components/common/Custom-Item';
import {
  addChannel,
  channelAddEvent,
  channelDetail
} from '../../redux/ducks/channel/details/basicInfo';
import { getDictionary } from '../../redux/ducks/channel/searchDictionary';
import { getChannelTree } from '../../redux/ducks/channel/list';
import CustomModal from '../../components/common/Custom-Modal';

class ChannelDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      channelId: '',           //  渠道id
      channelNum: '',          //  渠道编号，修改时必填
      fullName: '',             //  渠道全称, 必填
      abbreviationName: '',     //  渠道简称，必填
      channelAuthorityUserIds: '',  //
      parentId: '',   //父渠道id
      channelNature: '',   //渠道性质
      remarks: '',   //备注
    };
    this.params = {
      treeData: []
    }
  }

  componentWillMount() {
    this.props.getChannelTree();
  }
  
  componentWillReceiveProps(nextProps) {
    if (this.props.recordData !== nextProps) {
      const { recordData } = nextProps;
      if (recordData) {
        this.resetStateFn(recordData);
      }
    }
  }
  
  //  保存修改
  saveChannelFn = (state) => {
    const { channelId, channelNum, fullName, abbreviationName, parentId, channelNature, remarks } = this.state;
    
    if (!this.isInputValueLegal()) {
      return;
    }
    
    const ChannelInfo = Object.assign({}, this.state);
  
    this.props.addChannel(ChannelInfo, ChannelInfo.channelId)
      .then(() => {
        this.props.hideEditModal();
        this.props.loadData();
        message.success('新增/编辑成功！');
      })
  };
  
  //  判断输入的内容是否为空
  isInputValueLegal = () => {
    const { fullName, abbreviationName, address } = this.state;
    if (!fullName) {
      message.warning('请输入渠道全称！');
    } else if (!abbreviationName) {
      message.warning('请输入渠道简称！');
    } else {
      return true;
    }
  };
  
  resetStateFn = (data, id) => {
    this.setState({
      channelId: data.id || '',
      channelNature: (data.channelNature || data.channelNature === 0) ? data.channelNature : '',
      channelNum: data.channelNum || '',
      fullName: data.fullName || '',
      abbreviationName: data.abbreviationName || '',
      remarks: data.remarks || '',
      parentId: data.parentId || ''
    });
  };

  //  取消-还原操作
  onCancelFn = () => {
    const { recordData } = this.props;
    if (recordData) {
      this.resetStateFn(recordData);
    }
    this.props.hideEditModal();
  }
  
  //遍历渠道树替换label和value
  recursionTreeData = (treeData) => {
    let menu = '';
    for(let i = 0 ; i < treeData.length ; i++){
        menu = treeData[i];
        menu['value'] = menu['id'];
        menu['label'] = menu['abbreviationName'] || '';
        menu['children'] = menu['childrens'];
        this.params.treeData.push(menu);
        if(menu['childrens'] && menu['childrens'].length > 0){
            this.recursionTreeData(menu['childrens']);
        }
    }
    return treeData;
  }

  //  判断性质/行业分类等接口获取数据的label显示
  showLabel = (code, type) => {
    const typeData = this.props.dictionaryData[type];
    let name = '';
    typeData && typeData.map(item => {
      if (code === item.code) {
        name = item.name;
      }
    });
    return name;
  };

  showParentChannel = (data, parentId) => {
    let name = '';
    data && data.map(item => {
      if (parentId === item.id) {
        name = item.abbreviationName;
      }
    });
    return name;
  };
  
  render() {
    const { dictionaryData, visible, channelTreeData, canEdit, ...props } = this.props;
    const treeData = this.recursionTreeData(channelTreeData);
    const {
      channelNum,
      fullName,
      abbreviationName,
      parentId,
      channelNature,
      remarks
    } = this.state;
  
    return (
      <CustomModal
        visible={visible}
        onOk={this.saveChannelFn}
        onCancel={this.onCancelFn}
        okText="确认"
        cancelText="取消"
        canEdit={canEdit}
        title="渠道详情"
      >
        <div>
          <CustomItem
            canEdit={false}
            type={canEdit ? 'input' : 'inputShow'}
            label="渠道编码"
            value={channelNum}
          />
          <CustomItem
            canEdit={canEdit}
            type={canEdit ? 'input' : 'inputShow'}
            value={fullName}
            label="渠道全称"
            placeholder="请输入渠道全称"
            onChange={e => {
              this.setState({ fullName: e.target.value });
            }}
          />
          <CustomItem
            canEdit={canEdit}
            type={canEdit ? 'input' : 'inputShow'}
            value={abbreviationName}
            label="渠道简称"
            placeholder="请输入渠道简称"
            onChange={e => {
              this.setState({ abbreviationName: e.target.value });
            }}
          />
          {/*<CustomItem
            canEdit={canEdit}
            type={canEdit ? 'select' : 'inputShow'}
            options={dictionaryData.channelNature}
            label="渠道性质"
            value={canEdit ? channelNature : this.showLabel(channelNature, 'channelNature')}
            placeholder="请选择渠道性质"
            onChange={e => {
              this.setState({ channelNature: e });
            }}
          />
          <CustomItem
            canEdit={canEdit}
            type={canEdit ? 'treeSelect' : 'inputShow'}
            treeData={treeData}
            label="父渠道名称"
            value={canEdit ? parentId : this.showParentChannel(this.params.treeData, parentId)}
            placeholder="请选择父渠道"
            treeDefaultExpandAll='true'
            onChange={e => {
              this.setState({ parentId: e });
            }}
          />
          <CustomItem
            canEdit={canEdit}
            type={canEdit ? 'textarea' : 'textareaShow'}
            isSingle
            label="备注"
            value={remarks}
            placeholder="请输入备注"
            onChange={e => {
              this.setState({ remarks: e.target.value });
            }}
          />*/}
        </div>
      </CustomModal>
    );
  }
}

const mapStateToProps = (state) => {
  const { channel } = state;
  const { basicInfo, dictionaryData, list } = channel;
   const { addIsFailed, addIsLoading, addIsSuccess } = basicInfo;
  const { channelTreeData } = list;
  
  return {
    addIsFailed,
    addIsLoading,
    addIsSuccess,
    channelTreeData
  };
};

export default connect(mapStateToProps, {
  channelDetail,
  addChannel,
  getDictionary,
  channelAddEvent,
  getChannelTree
})(ChannelDetail);
