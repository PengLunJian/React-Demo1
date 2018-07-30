import { combineReducers } from 'redux';
import list from './list';
import cotactDetail from './contactDetail';

export default combineReducers({
  list,
  cotactDetail
});
