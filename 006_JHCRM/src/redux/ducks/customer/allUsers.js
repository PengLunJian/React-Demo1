import { JHCRM } from '../../../service/ajax';
import {
  CALL_API
} from '../../middlewares/api';

//  actionTypes
export const actionTypes = {
  ALLUSERS_LOAD_REQUEST: 'ALLUSERS_LOAD_REQUEST',
  ALLUSERS_LOAD_SUCCESS: 'ALLUSERS_LOAD_SUCCESS',
  ALLUSERS_LOAD_FAILURE: 'ALLUSERS_LOAD_FAILURE',
};

//  客户-所有用户获取
const _getAllUsers = (data) => ({
  [CALL_API]: {
    types: [actionTypes.ALLUSERS_LOAD_REQUEST, actionTypes.ALLUSERS_LOAD_SUCCESS, actionTypes.ALLUSERS_LOAD_FAILURE],
    endpoint: JHCRM.getURL('customer_allUsers_search', data),
  }
});

export const getAllUsers = (data) => (dispatch, getState) => {
  return dispatch(_getAllUsers(data));
};

//  reducers
export default function allUsers(state = {
  allUsersData: []
}, action) {
  switch (action.type) {
    case actionTypes.ALLUSERS_LOAD_REQUEST:
      return {
        ...state,
        allUsersData: []
      };
    case actionTypes.ALLUSERS_LOAD_SUCCESS:
      return {
        ...state,
        allUsersData: action.response.data.data
      };
    case actionTypes.ALLUSERS_LOAD_FAILURE:
      return {
        ...state,
        allUsersData: []
      };
    default:
      return state;
  }
}

