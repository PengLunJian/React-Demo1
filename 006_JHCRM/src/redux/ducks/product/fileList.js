import { JHCRM } from '../../../service/ajax';
import {
  CALL_API
} from '../../middlewares/api';

//  actionTypes
export const actionTypes = {
  PRODUCT_FILELIST_LOAD_REQUEST: 'PRODUCT_FILELIST_LOAD_REQUEST',
  PRODUCT_FILELIST_LOAD_SUCCESS: 'PRODUCT_FILELIST_LOAD_SUCCESS',
  PRODUCT_FILELIST_LOAD_FAILURE: 'PRODUCT_FILELIST_LOAD_FAILURE',
  PRODUCT_FILELIST_DATA_CLEAR: 'PRODUCT_FILELIST_DATA_CLEAR',
  PRODUCT_FILELIST_ADD_REQUEST: 'PRODUCT_FILELIST_ADD_REQUEST',
  PRODUCT_FILELIST_ADD_SUCCESS: 'PRODUCT_FILELIST_ADD_SUCCESS',
  PRODUCT_FILELIST_ADD_FAILURE: 'PRODUCT_FILELIST_ADD_FAILURE',
  PRODUCT_FILELIST_EDIT_REQUEST: 'PRODUCT_FILELIST_EDIT_REQUEST',
  PRODUCT_FILELIST_EDIT_SUCCESS: 'PRODUCT_FILELIST_EDIT_SUCCESS',
  PRODUCT_FILELIST_EDIT_FAILURE: 'PRODUCT_FILELIST_EDIT_FAILURE',
  PRODUCT_FILELIST_DELETE_REQUEST: 'PRODUCT_FILELIST_DELETE_REQUEST',
  PRODUCT_FILELIST_DELETE_SUCCESS: 'PRODUCT_FILELIST_DELETE_SUCCESS',
  PRODUCT_FILELIST_DELETE_FAILURE: 'PRODUCT_FILELIST_DELETE_FAILURE',
};

//  actions
//  产品附件列表-加载数据
const _getFileList = (data, isPC) => ({
  [CALL_API]: {
    types: [actionTypes.PRODUCT_FILELIST_LOAD_REQUEST, actionTypes.PRODUCT_FILELIST_LOAD_SUCCESS, actionTypes.PRODUCT_FILELIST_LOAD_FAILURE],
    endpoint: JHCRM.getURL('product_fileList_search', data),
    otherParameters: { isPC }
  }
});

//  清空产品附件列表
const _clearFileList = () => ({
  type: actionTypes.PRODUCT_FILELIST_DATA_CLEAR,
  data: []
});

export const getFileList = (data, isPC) => (dispatch, getState) => {
  return dispatch(_getFileList(data, isPC));
};

export const clearFileList = (data) => (dispatch, getState) => {
  return dispatch(_clearFileList(data));
};

//  新增产品附件
const _addFile = (data) => ({
  [CALL_API]: {
    types: [actionTypes.PRODUCT_FILELIST_ADD_REQUEST, actionTypes.PRODUCT_FILELIST_ADD_SUCCESS, actionTypes.PRODUCT_FILELIST_ADD_FAILURE],
    endpoint: JHCRM.getURL('product_fileList_add', data),
    options: {
      method: 'post',
      data
    }
  }
});

export const addFile= (data) => (dispatch, getState) => {
  return dispatch(_addFile(data))
};

//  修改产品附件
const _editFile = (data) => ({
  [CALL_API]: {
    types: [actionTypes.PRODUCT_FILELIST_EDIT_REQUEST, actionTypes.PRODUCT_FILELIST_EDIT_SUCCESS, actionTypes.PRODUCT_FILELIST_EDIT_FAILURE],
    endpoint: JHCRM.getURL('product_fileList_edit', data),
    options: {
      method: 'patch',
      data
    }
  }
});

export const editFile= (data) => (dispatch, getState) => {
  return dispatch(_editFile(data))
};

//  删除附件
const _deleteFile = (data) => ({
  [CALL_API]: {
    types: [actionTypes.PRODUCT_FILELIST_DELETE_REQUEST, actionTypes.PRODUCT_FILELIST_DELETE_SUCCESS, actionTypes.PRODUCT_FILELIST_DELETE_FAILURE],
    endpoint: JHCRM.getURL('product_fileList_delete', data),
    options: {
      method: 'delete',
      // params: data
    },
    otherParameters: data
  }
});

export const deleteFile = (data) => (dispatch, getState) => {
  return dispatch(_deleteFile(data));
};

//  reducers
export default function fileList(state = {
  isLoading: false,
  data: [],
  totalCount: 0,
  editIsLoading: false,
  editIsSuccess: false,
  eidtIsFailed: false,
}, action) {
  switch (action.type) {
    case actionTypes.PRODUCT_FILELIST_LOAD_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.PRODUCT_FILELIST_LOAD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        totalCount: action.response.data.data.totalCount || 0,
        data: action.otherParameters.isPC ? action.response.data.data.list || [] : [...state.data, ...action.response.data.data.list || []],
      };
    case actionTypes.PRODUCT_FILELIST_LOAD_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    case actionTypes.PRODUCT_FILELIST_DATA_CLEAR:
      return {
        ...state,
        data: [],
        isLoading: false,
      };
    case actionTypes.PRODUCT_FILELIST_ADD_REQUEST:
      return {
        ...state,
        editIsLoading: true,
        editIsSuccess: false,
        eidtIsFailed: false
      };
    case actionTypes.PRODUCT_FILELIST_ADD_SUCCESS:
      return {
        ...state,
        editIsLoading: false,
        editIsSuccess: true,
        eidtIsFailed: false
      };
    case actionTypes.PRODUCT_FILELIST_ADD_FAILURE:
      return {
        ...state,
        editIsLoading: false,
        editIsSuccess: false,
        eidtIsFailed: true
      }
    case actionTypes.PRODUCT_FILELIST_EDIT_REQUEST:
      return {
        ...state,
        editIsLoading: true,
        editIsSuccess: false,
        eidtIsFailed: false
      };
    case actionTypes.PRODUCT_FILELIST_EDIT_SUCCESS:
      return {
        ...state,
        editIsLoading: false,
        editIsSuccess: true,
        eidtIsFailed: false
      };
    case actionTypes.PRODUCT_FILELIST_EDIT_FAILURE:
      return {
        ...state,
        editIsLoading: false,
        editIsSuccess: false,
        eidtIsFailed: true
      };
    case actionTypes.PRODUCT_FILELIST_DELETE_REQUEST:
      return {
        ...state,
        editIsLoading: true,
        editIsSuccess: false,
        eidtIsFailed: false,
      };
    case actionTypes.PRODUCT_FILELIST_DELETE_SUCCESS:
      const deleteId = action.otherParameters.FILEID;
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
    case actionTypes.PRODUCT_FILELIST_DELETE_FAILURE:
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

