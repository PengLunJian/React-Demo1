import { combineReducers } from 'redux';
import loginStatus from './login';
import customer from './customer';
import channel from './channel';
import contacts from './contacts';
import card from './card';
import product from './product';
import searchDictionary from './searchDictionary';
import personalInfo from './personalInfo';
import report from './report';

export default combineReducers({
  loginStatus,
  customer,
  channel,
  contacts,
  card,
  product,
  searchDictionary,
  personalInfo,
	report
});
