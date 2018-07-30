import { combineReducers } from 'redux';
import dictionaryData from './searchDictionary';
import list from './list';

import basicInfo from './details/basicInfo';
import visitRecord from './details/visitRecord';

import visitRecordAdd from './details/visitRecordAdd';

import updateImages from './details/updateImages';

import factList from './factList';
import customerDetail_fact from './factDetail';

import holdings from './details/holdings';
import purchase from './details/purchase';

import allUsers from './allUsers';

export default combineReducers({
  dictionaryData,
  list,
  basicInfo,
  visitRecord,
  visitRecordAdd,
  updateImages,
	factList,
	customerDetail_fact,
  holdings,
  purchase,
  allUsers
});
