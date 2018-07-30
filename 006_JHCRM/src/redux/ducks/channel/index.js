import { combineReducers } from 'redux';
import dictionaryData from './searchDictionary';
import list from './list';
import basicInfo from './details/basicInfo';
import channelHoldings from './holdings';
import channelPurchase from './purchase';
import factList from './factList';
import factDetail from './factDetail';

export default combineReducers({
  dictionaryData,
  list,
  basicInfo,
  channelHoldings,
  channelPurchase,
  factList,
  factDetail
});
