import { JHCRM } from '../../../service/ajax';
import {
  CALL_API
} from '../../middlewares/api';

//  actionTypes
export const actionTypes = {
  CHANNEL_SETPERMISSION_REQUEST: 'CHANNEL_SETPERMISSION_REQUEST',
  CHANNEL_SETPERMISSION_SUCCESS: 'CHANNEL_SETPERMISSION_SUCCESS',
  CHANNEL_SETPERMISSION_FAILURE: 'CHANNEL_SETPERMISSION_FAILURE',
};

//  渠道-授权
const _setPerminssion = (data) => ({
  [CALL_API]: {
    types: [actionTypes.CHANNEL_SETPERMISSION_REQUEST, actionTypes.CHANNEL_SETPERMISSION_SUCCESS, actionTypes.CHANNEL_SETPERMISSION_FAILURE],
    endpoint: JHCRM.getURL('channel_setPermission_pc', data),
    options: {
      method: 'post',
      data
    }
  }
});

export const setPerminssion = (data) => (dispatch, getState) => {
  return dispatch(_setPerminssion(data));
};

//  reducers
export default function channelPermission(state = {
  allUsersData: []
}, action) {
  switch (action.type) {
    case actionTypes.CHANNEL_SETPERMISSION_REQUEST:
      return {
        ...state,
        addIsLoading: true,
        addIsSuccess: false,
        addIsFailed: false,
      };
    case actionTypes.CHANNEL_SETPERMISSION_SUCCESS:
      return {
        ...state,
        addIsLoading: false,
        addIsSuccess: true,
        addIsFailed: false,
      };
    case actionTypes.CHANNEL_SETPERMISSION_FAILURE:
      return {
        ...state,
        addIsLoading: false,
        addIsSuccess: false,
        addIsFailed: false,
      };
    default:
      return state;
  }
}

