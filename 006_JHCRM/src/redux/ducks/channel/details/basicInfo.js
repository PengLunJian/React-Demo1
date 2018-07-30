import { JHCRM } from '../../../../service/ajax';
import {
  CALL_API
} from '../../../middlewares/api';
import { editChannel } from '../list';

//  actionTypes
export const actionTypes = {
  CHANNEL_DETAIL_REQUEST: 'CHANNEL_DETAIL_REQUEST',
  CHANNEL_DETAIL_SUCCESS: 'CHANNEL_DETAIL_SUCCESS',
  CHANNEL_DETAIL_FAILURE: 'CHANNEL_DETAIL_FAILURE',
  CHANNEL_ADD_REQUEST: 'CHANNEL_ADD_REQUEST',
  CHANNEL_ADD_SUCCESS: 'CHANNEL_ADD_SUCCESS',
  CHANNEL_ADD_FAILURE: 'CHANNEL_ADD_FAILURE',
  CHANNEL_ADD_RESET: 'CHANNEL_ADD_RESET',
  CHANNEL_ADDEVENT: 'CHANNEL_ADDEVENT',
  CHANNEL_ADDEVENT_CLEAR: 'CHANNEL_ADDEVENT_CLEAR',
  CHANNEL_SETPERMISSION_REQUEST: 'CHANNEL_SETPERMISSION_REQUEST',
  CHANNEL_SETPERMISSION_SUCCESS: 'CHANNEL_SETPERMISSION_SUCCESS',
  CHANNEL_SETPERMISSION_FAILURE: 'CHANNEL_SETPERMISSION_FAILURE',
};

//  actions
//  查询客户信息
const _channelDetail = (data) => ({
  [CALL_API]: {
    types: [actionTypes.CHANNEL_DETAIL_REQUEST, actionTypes.CHANNEL_DETAIL_SUCCESS, actionTypes.CHANNEL_DETAIL_FAILURE],
    endpoint: JHCRM.getURL('channel_searchDetails', data)
  }
});

//  保存新增或修改客户
const _saveChannelAdd = (data) => ({
  [CALL_API]: {
    types: [actionTypes.CHANNEL_ADD_REQUEST, actionTypes.CHANNEL_ADD_SUCCESS, actionTypes.CHANNEL_ADD_FAILURE],
    endpoint: JHCRM.getURL('channel_saveChannel'),
    options: {
      method: 'post',
      data
    }
  }
});

//  关键事件保存
const _channelAddEvent = (data) => ({
  type: actionTypes.CHANNEL_ADDEVENT,
  data
});

//  重置保存或提交之后的状态
const _resetChannelAdd = (data) => ({
  type: actionTypes.CHANNEL_ADD_RESET,
  data
});

export const channelDetail = (data) => (dispatch) => {
  return dispatch(_channelDetail(data));
};

export const addChannel = (data, id) => (dispatch, getState) => {
  return dispatch(_saveChannelAdd(data))
    .then((res) => {
      dispatch(editChannel(res.response.data.data, id));
      return res;
    });
};

export const channelAddEvent = (data) => (dispatch, getState) => {
  return dispatch(_channelAddEvent(data));
};

//  渠道-授权
const _setPerminssion = (data) => ({
  [CALL_API]: {
    types: [actionTypes.CHANNEL_SETPERMISSION_REQUEST, actionTypes.CHANNEL_SETPERMISSION_SUCCESS, actionTypes.CHANNEL_SETPERMISSION_FAILURE],
    endpoint: JHCRM.getURL('channel_setPermission_pc', data),
    options: {
      method: 'patch',
      data
    }
  }
});

export const setPerminssion = (data) => (dispatch, getState) => {
  return dispatch(_setPerminssion(data));
};

//  reducers
export default function channelAdd(state = {
  isLoading: false,
  data: '',
  addIsLoading: false,
  addIsSuccess: false,
  addIsFailed: false,
  addedId: '',
  eventData: ''
}, action) {
  switch (action.type) {
    case actionTypes.CHANNEL_DETAIL_REQUEST:
      return {
        ...state,
        isLoading: true,
        data: ''
      };
    case actionTypes.CHANNEL_DETAIL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.response.data.data
      };
    case actionTypes.CHANNEL_DETAIL_FAILURE:
      return {
        ...state,
        isLoading: false,
        data: ''
      };
    case actionTypes.CHANNEL_ADD_REQUEST:
      return {
        ...state,
        addIsLoading: true,
        addIsSuccess: false,
        addIsFailed: false,
      };
    case actionTypes.CHANNEL_ADD_SUCCESS:
      return {
        ...state,
        addIsLoading: false,
        addIsSuccess: true,
        addIsFailed: false,
        addedId: action.response.data.data.id,
        data: action.response.data.data
      };
    case actionTypes.CHANNEL_ADD_FAILURE:
      return {
        ...state,
        addIsLoading: false,
        addIsSuccess: false,
        addIsFailed: true,
      };
    case actionTypes.CHANNEL_ADD_RESET:
      return {
        ...state,
        addIsLoading: false,
        addIsSuccess: false,
        addIsFailed: false,
      };
    case actionTypes.CHANNEL_ADDEVENT:
      return {
        ...state,
        eventData: action.data,
      };
    case actionTypes.CHANNEL_ADDEVENT_CLEAR:
      return {
        ...state,
        eventData: '',
      };
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

