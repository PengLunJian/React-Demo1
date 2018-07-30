import React, { Component } from 'react';
import CustomItem from '../../components/common/Custom-Item';
import SearchBtnContainer from '../../components/common/Search-BtnContainer';
import { obj2Search } from '../../utils/parseSearchString';
import ProductDetail from '../../containers/potentialProduct/ProductDetail';

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',     //  姓名
      position: '',   //  职位
      phone: '',  // 电话  
      editVisible: false
    };
    this.params = {};
  }

  hideEditModal = () => {
    this.setState({
      editVisible: false
    });
  };

  showEditModel = () => {
    this.setState({ 
      editVisible: true
    })
  }

  render() {
    const { name, position, phone, editVisible } = this.state;
    const { ...props } = this.props;

    return (
      <div className="topSearch card">
        {/*<CustomItem
          fromSearch
          value={name}
          type="input"
          label="姓名"
          placeholder="请输入姓名"
          onChange={e => {
            this.setState({ name: e.target.value });
            this.props.onSearchChange(e.target.value, 'name');
          }}
        />*/}
        
        <SearchBtnContainer
          addFn={this.showEditModel}
        />

        <ProductDetail
          visible={editVisible}
          hideEditModal={this.hideEditModal}
          canEdit={true}
          data={[]}
          {...props}
        />

      </div>
    );
  }
}

