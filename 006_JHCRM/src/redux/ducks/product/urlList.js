import { JHCRM } from '../../../service/ajax';
import {
  CALL_API
} from '../../middlewares/api';

//  actionTypes
export const actionTypes = {
  PRODUCT_URLLIST_LOAD_REQUEST: 'PRODUCT_URLLIST_LOAD_REQUEST',
  PRODUCT_URLLIST_LOAD_SUCCESS: 'PRODUCT_URLLIST_LOAD_SUCCESS',
  PRODUCT_URLLIST_LOAD_FAILURE: 'PRODUCT_URLLIST_LOAD_FAILURE',
  PRODUCT_URLLIST_DATA_CLEAR: 'PRODUCT_URLLIST_DATA_CLEAR',
  PRODUCT_URLLIST_ADD_REQUEST: 'PRODUCT_URLLIST_ADD_REQUEST',
  PRODUCT_URLLIST_ADD_SUCCESS: 'PRODUCT_URLLIST_ADD_SUCCESS',
  PRODUCT_URLLIST_ADD_FAILURE: 'PRODUCT_URLLIST_ADD_FAILURE',
  PRODUCT_URLLIST_EDIT_REQUEST: 'PRODUCT_URLLIST_EDIT_REQUEST',
  PRODUCT_URLLIST_EDIT_SUCCESS: 'PRODUCT_URLLIST_EDIT_SUCCESS',
  PRODUCT_URLLIST_EDIT_FAILURE: 'PRODUCT_URLLIST_EDIT_FAILURE',
  PRODUCT_URLLIST_DELETE_REQUEST: 'PRODUCT_URLLIST_DELETE_REQUEST',
  PRODUCT_URLLIST_DELETE_SUCCESS: 'PRODUCT_URLLIST_DELETE_SUCCESS',
  PRODUCT_URLLIST_DELETE_FAILURE: 'PRODUCT_URLLIST_DELETE_FAILURE',
};

//  actions
//  产品外链列表-加载数据
const _getUrlList = (data, isPC) => ({
  [CALL_API]: {
    types: [actionTypes.PRODUCT_URLLIST_LOAD_REQUEST, actionTypes.PRODUCT_URLLIST_LOAD_SUCCESS, actionTypes.PRODUCT_URLLIST_LOAD_FAILURE],
    endpoint: JHCRM.getURL('product_urlList_search', data),
    otherParameters: { isPC }
  }
});

//  清空产品外链列表
const _clearUrlList = () => ({
  type: actionTypes.PRODUCT_URLLIST_DATA_CLEAR,
  data: []
});

export const getUrlList = (data, isPC) => (dispatch, getState) => {
  return dispatch(_getUrlList(data, isPC));
};

export const clearUrlList = (data) => (dispatch, getState) => {
  return dispatch(_clearUrlList(data));
};

//  新增产品外链
const _addUrl = (data) => ({
  [CALL_API]: {
    types: [actionTypes.PRODUCT_URLLIST_ADD_REQUEST, actionTypes.PRODUCT_URLLIST_ADD_SUCCESS, actionTypes.PRODUCT_URLLIST_ADD_FAILURE],
    endpoint: JHCRM.getURL('product_urlList_add', data),
    options: {
      method: 'post',
      data
    }
  }
});

export const addUrl= (data) => (dispatch, getState) => {
  return dispatch(_addUrl(data))
};

//  修改产品外链
const _editUrl = (data) => ({
  [CALL_API]: {
    types: [actionTypes.PRODUCT_URLLIST_EDIT_REQUEST, actionTypes.PRODUCT_URLLIST_EDIT_SUCCESS, actionTypes.PRODUCT_URLLIST_EDIT_FAILURE],
    endpoint: JHCRM.getURL('product_urlList_edit', data),
    options: {
      method: 'patch',
      data
    }
  }
});

export const editUrl= (data) => (dispatch, getState) => {
  return dispatch(_editUrl(data))
};

//  删除外链
const _deleteUrl = (data) => ({
  [CALL_API]: {
    types: [actionTypes.PRODUCT_URLLIST_DELETE_REQUEST, actionTypes.PRODUCT_URLLIST_DELETE_SUCCESS, actionTypes.PRODUCT_URLLIST_DELETE_FAILURE],
    endpoint: JHCRM.getURL('product_urlList_delete', data),
    options: {
      method: 'delete',
      // params: data
    },
    otherParameters: data
  }
});

export const deleteUrl = (data) => (dispatch, getState) => {
  return dispatch(_deleteUrl(data));
};

//  reducers
export default function urlList(state = {
  isLoading: false,
  data: [],
  totalCount: 0,
  editIsLoading: false,
  editIsSuccess: false,
  eidtIsFailed: false,
}, action) {
  switch (action.type) {
    case actionTypes.PRODUCT_URLLIST_LOAD_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.PRODUCT_URLLIST_LOAD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        totalCount: action.response.data.data.totalCount || 0,
        data: action.otherParameters.isPC ? action.response.data.data.list || [] : [...state.data, ...action.response.data.data.list || []],
      };
    case actionTypes.PRODUCT_URLLIST_LOAD_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    case actionTypes.PRODUCT_URLLIST_DATA_CLEAR:
      return {
        ...state,
        data: [],
        isLoading: false,
      };
    case actionTypes.PRODUCT_URLLIST_ADD_REQUEST:
      return {
        ...state,
        editIsLoading: true,
        editIsSuccess: false,
        eidtIsFailed: false
      };
    case actionTypes.PRODUCT_URLLIST_ADD_SUCCESS:
      return {
        ...state,
        editIsLoading: false,
        editIsSuccess: true,
        eidtIsFailed: false
      };
    case actionTypes.PRODUCT_URLLIST_ADD_FAILURE:
      return {
        ...state,
        editIsLoading: false,
        editIsSuccess: false,
        eidtIsFailed: true
      }
    case actionTypes.PRODUCT_URLLIST_EDIT_REQUEST:
      return {
        ...state,
        editIsLoading: true,
        editIsSuccess: false,
        eidtIsFailed: false
      };
    case actionTypes.PRODUCT_URLLIST_EDIT_SUCCESS:
      return {
        ...state,
        editIsLoading: false,
        editIsSuccess: true,
        eidtIsFailed: false
      };
    case actionTypes.PRODUCT_URLLIST_EDIT_FAILURE:
      return {
        ...state,
        editIsLoading: false,
        editIsSuccess: false,
        eidtIsFailed: true
      };
    case actionTypes.PRODUCT_URLLIST_DELETE_REQUEST:
      return {
        ...state,
        editIsLoading: true,
        editIsSuccess: false,
        eidtIsFailed: false,
      };
    case actionTypes.PRODUCT_URLLIST_DELETE_SUCCESS:
      const deleteId = action.otherParameters.URLID;
      const deletedDatas = state.data.filter((item) => (
        item.id !== deleteId
      ));
      return {
        ...state,
        data: deletedDatas,
        editIsLoading: false,
        editIsSuccess: true,
        eidtIsFailed: false,
      };
    case actionTypes.PRODUCT_URLLIST_DELETE_FAILURE:
      return {
        ...state,
        editIsLoading: false,
        editIsSuccess: false,
        eidtIsFailed: true,
      };
    default:
      return state;
  }
}

