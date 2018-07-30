import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  getProduct,
  clearProduct,
} from '../../redux/ducks/product/list';
import WithTopTitle from '../../components-WX/common/WithTopTitle';
import Search from '../../components-WX/common/SearchBox';
import List from '../../components-WX/product/List';
import NavTabs from '../../components-WX/product/NavTabs';

import './index.less';

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasMoreData: false,  //  用于下拉刷新标识
    };
    this.params = {
      classId: 1
    }
  }
  
  componentDidMount() {
    this.loadData();
  }
  
  loadData = () => {
    const { classId } = this.params;
    return new Promise((resolve, reject) => {
      this.props.getProduct(this.params);
      resolve();
    });
  };

  tabChangeFn = (id) => {
    this.params.classId = id;
    this.loadData();
  }
  
  render() {
    const { hasMoreData } = this.state;
    const { ...props } = this.props;
    
    return (
      <div className="Product">
        <NavTabs tabChangeFn={this.tabChangeFn}/>
        
        <List
          loadData={this.loadData}
          hasMoreData={hasMoreData}
          {...props}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { product } = state;
  const { list } = product;
  const { data, isLoading } = list;
  
  return {
    data: data,
    isLoading
  };
};

export default connect(mapStateToProps, {
  getProduct,
  clearProduct
})(Product);
