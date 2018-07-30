import { combineReducers } from 'redux';
import dictionaryData from './searchDictionary';
import list from './list';

import basicInfo from './details/basicInfo';

export default combineReducers({
  dictionaryData,
  list,
  basicInfo
});
