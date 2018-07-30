import { JHCRM } from '../../../service/ajax';
import {
  CALL_API
} from '../../middlewares/api';

//  actionTypes
export const actionTypes = {
  CHANNEL_LOAD_REQUEST: 'CHANNEL_LOAD_REQUEST',
  CHANNEL_LOAD_SUCCESS: 'CHANNEL_LOAD_SUCCESS',
  CHANNEL_LOAD_FAILURE: 'CHANNEL_LOAD_FAILURE',
  CHANNEL_DATA_CLEAR: 'CHANNEL_DATA_CLEAR',
  CHANNEL_DELETE_REQUEST: 'CHANNEL_DELETE_REQUEST',
  CHANNEL_DELETE_SUCCESS: 'CHANNEL_DELETE_SUCCESS',
  CHANNEL_DELETE_FAILURE: 'CHANNEL_DELETE_FAILURE',
  CHANNEL_EDIT: 'CHANNEL_EDIT',
  ALLCHANNEL_LOAD_REQUEST: 'ALLCHANNEL_LOAD_REQUEST',
  ALLCHANNEL_LOAD_SUCCESS: 'ALLCHANNEL_LOAD_SUCCESS',
  ALLCHANNEL_LOAD_FAILURE: 'ALLCHANNEL_LOAD_FAILURE',
  CHANNELTREE_LOAD_REQUEST: 'CHANNELTREE_LOAD_REQUEST',
  CHANNELTREE_LOAD_SUCCESS: 'CHANNELTREE_LOAD_SUCCESS',
  CHANNELTREE_LOAD_FAILURE: 'CHANNELTREE_LOAD_FAILURE',
};

//  actions
//  渠道列表-加载数据
const _getChannel = (data, isPC) => ({
  [CALL_API]: {
    types: [actionTypes.CHANNEL_LOAD_REQUEST, actionTypes.CHANNEL_LOAD_SUCCESS, actionTypes.CHANNEL_LOAD_FAILURE],
    endpoint: JHCRM.getURL(isPC?'channel_search_PC':'channel_search', data),
    otherParameters: { isPC }
  }
});

//  渠道-所有渠道获取（列表形式）
const _getAllChannel = (data) => ({
  [CALL_API]: {
    types: [actionTypes.ALLCHANNEL_LOAD_REQUEST, actionTypes.ALLCHANNEL_LOAD_SUCCESS, actionTypes.ALLCHANNEL_LOAD_FAILURE],
    endpoint: JHCRM.getURL('channel_searchAllChannel', data),
  }
});

//  渠道-所有渠道获取（树状形式）
const _getChannelTree = (data) => ({
  [CALL_API]: {
    types: [actionTypes.CHANNELTREE_LOAD_REQUEST, actionTypes.CHANNELTREE_LOAD_SUCCESS, actionTypes.CHANNELTREE_LOAD_FAILURE],
    endpoint: JHCRM.getURL('channel_searchTreeChannel', data),
  }
});

//  清空渠道列表
const _clearChannel = () => ({
  type: actionTypes.CHANNEL_DATA_CLEAR,
  data: []
});

//  删除渠道
const _deleteChannel = (data) => ({
  [CALL_API]: {
    types: [actionTypes.CHANNEL_DELETE_REQUEST, actionTypes.CHANNEL_DELETE_SUCCESS, actionTypes.CHANNEL_DELETE_FAILURE],
    endpoint: JHCRM.getURL('channel_deleteChannel', data),
    options: {
      method: 'delete',
      // params: data
    },
    otherParameters: data
  }
});

//  新增渠道
const _editChannel = (data, id) => ({
  type: actionTypes.CHANNEL_EDIT,
  data,
  id
});


//  isPC判断是否是分页模式
export const getChannel = (data, isPC) => (dispatch, getState) => {
  return dispatch(_getChannel(data, isPC));
};

export const getAllChannel = (data) => (dispatch, getState) => {
  return dispatch(_getAllChannel(data));
};

export const getChannelTree = (data) => (dispatch, getState) => {
  return dispatch(_getChannelTree(data));
};

export const clearChannel = (data) => (dispatch, getState) => {
  return dispatch(_clearChannel(data));
};

export const deleteChannel = (data) => (dispatch, getState) => {
  return dispatch(_deleteChannel(data));
};

export const editChannel = (data, id) => (dispatch) => {
  return dispatch(_editChannel(data, id));
};


//  reducers
export default function list(state = {
  isLoading: false,
  totalCount: 0,
  data: [],
  allChannel: [],
  channelTreeData: [],
  deleteIsLoading: false,
  deleteIsSuccess: false,
  deleteIsFailed: false,
}, action) {
  switch (action.type) {
    case actionTypes.CHANNEL_LOAD_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.CHANNEL_LOAD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        totalCount: action.response.data.data.totalCount || 0,
        data: action.otherParameters.isPC ? action.response.data.data.list || [] : [...state.data, ...action.response.data.data.list || []],
      };
    case actionTypes.CHANNEL_LOAD_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    case actionTypes.CHANNEL_DATA_CLEAR:
      return {
        ...state,
        data: [],
        isLoading: false,
      };
    case actionTypes.CHANNEL_DELETE_REQUEST:
      return {
        ...state,
        deleteIsLoading: true,
        deleteIsSuccess: false,
        deleteIsFailed: false,
      };
    case actionTypes.CHANNEL_DELETE_SUCCESS:
      const deletedDatas = state.data;
      const deleteId = action.otherParameters.channelId;
      for (let i = 0; i < deletedDatas.length; i++) {
        if (deletedDatas[i].id === deleteId) {
          deletedDatas.splice(i, 1);
          break;
        }
      }
      return {
        ...state,
        data: deletedDatas,
        deleteIsLoading: false,
        deleteIsSuccess: true,
        deleteIsFailed: false,
      };
    case actionTypes.CHANNEL_DELETE_FAILURE:
      return {
        ...state,
        deleteIsLoading: false,
        deleteIsSuccess: false,
        deleteIsFailed: true,
      };
    case actionTypes.CHANNEL_EDIT:
      let data;
      if (action.id) {  //  修改
        data = state.data.map((item) => {
          if (item.id === action.id) {
            item = action.data;
          }
          return item;
        });
      } else {
        data = [...state.data, action.data];
      }
      // if (action.data) {
      //   data.push(action.data);
      // }
      return {
        ...state,
        data
      };
    case actionTypes.ALLCHANNEL_LOAD_REQUEST:
      return {
        ...state,
        allChannel: []
      };
    case actionTypes.ALLCHANNEL_LOAD_SUCCESS:
      return {
        ...state,
        allChannel: action.response.data.data
      };
    case actionTypes.ALLCHANNEL_LOAD_FAILURE:
      return {
        ...state,
        allChannel: []
      };
    case actionTypes.CHANNELTREE_LOAD_REQUEST:
      return {
        ...state,
        channelTreeData: []
      };
    case actionTypes.CHANNELTREE_LOAD_SUCCESS:
      return {
        ...state,
        channelTreeData: action.response.data.data
      };
    case actionTypes.CHANNELTREE_LOAD_FAILURE:
      return {
        ...state,
        channelTreeData: []
      };
    default:
      return state;
  }
}

