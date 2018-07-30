import { JHCRM } from '../../service/ajax';
import {
  CALL_API
} from '../middlewares/api';

//  actionTypes
export const actionTypes = {
  PERSONALINFO_REQUEST: 'PERSONALINFO_REQUEST',
  PERSONALINFO_SUCCESS: 'PERSONALINFO_SUCCESS',
  PERSONALINFO_FAILURE: 'PERSONALINFO_FAILURE',
};

//  actions
const _getPersonalInfo = (data) => ({
  [CALL_API]: {
    types: [actionTypes.PERSONALINFO_REQUEST, actionTypes.PERSONALINFO_SUCCESS, actionTypes.PERSONALINFO_FAILURE],
    endpoint: JHCRM.getURL('personalInfo', data)
  }
});

export const getPersonalInfo = (data) => (dispatch, getState) => {
  return dispatch(_getPersonalInfo(data));
};

//  reducers
export default function personalInfo(state = {
  userName: '',
}, action) {
  switch (action.type) {
    case actionTypes.PERSONALINFO_REQUEST:
      return {
        ...state,
        userName: '',
      };
    case actionTypes.PERSONALINFO_SUCCESS:
      return {
        ...state,
        userName: action.response.data.data.userName || '',
      };
    case actionTypes.PERSONALINFO_FAILURE:
      return {
        ...state,
        userName: '',
      };
    default:
      return state;
  }
}
