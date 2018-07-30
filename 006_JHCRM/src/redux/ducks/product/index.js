import { combineReducers } from 'redux';
import list from './list';
import potentialList from './potentialList';
import details from './detail/productDetail';
import customerList from './detail/customer/list';
import channelList from './detail/channel/list';
import productEdit from './editType';
import fileList from './fileList';
import urlList from './urlList';

export default combineReducers({
  list,
  potentialList,
  details,
  customerList,
  channelList,
  productEdit,
  fileList,
  urlList
});
