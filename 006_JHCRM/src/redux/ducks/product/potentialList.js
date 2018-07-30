import { JHCRM } from '../../../service/ajax';
import {
  CALL_API
} from '../../middlewares/api';

//  actionTypes
export const actionTypes = {
  POTENTIALPRODUCT_LOAD_REQUEST: 'POTENTIALPRODUCT_LOAD_REQUEST',
  POTENTIALPRODUCT_LOAD_SUCCESS: 'POTENTIALPRODUCT_LOAD_SUCCESS',
  POTENTIALPRODUCT_LOAD_FAILURE: 'POTENTIALPRODUCT_LOAD_FAILURE',
  POTENTIALPRODUCT_DATA_CLEAR: 'POTENTIALPRODUCT_DATA_CLEAR',
  POTENTIALPRODUCT_EDIT_REQUEST: 'POTENTIALPRODUCT_EDIT_REQUEST',
  POTENTIALPRODUCT_EDIT_SUCCESS: 'POTENTIALPRODUCT_EDIT_SUCCESS',
  POTENTIALPRODUCT_EDIT_FAILURE: 'POTENTIALPRODUCT_EDIT_FAILURE',
  POTENTIALPRODUCT_ADD_REQUEST: 'POTENTIALPRODUCT_ADD_REQUEST',
  POTENTIALPRODUCT_ADD_SUCCESS: 'POTENTIALPRODUCT_ADD_SUCCESS',
  POTENTIALPRODUCT_ADD_FAILURE: 'POTENTIALPRODUCT_ADD_FAILURE',
  POTENTIALPRODUCT_DELETE_REQUEST: 'POTENTIALPRODUCT_DELETE_REQUEST',
  POTENTIALPRODUCT_DELETE_SUCCESS: 'POTENTIALPRODUCT_DELETE_SUCCESS',
  POTENTIALPRODUCT_DELETE_FAILURE: 'POTENTIALPRODUCT_DELETE_FAILURE',
};

//  actions
//  潜在产品列表-加载数据
const _getProduct = (data, isPC) => ({
  [CALL_API]: {
    types: [actionTypes.POTENTIALPRODUCT_LOAD_REQUEST, actionTypes.POTENTIALPRODUCT_LOAD_SUCCESS, actionTypes.POTENTIALPRODUCT_LOAD_FAILURE],
    endpoint: JHCRM.getURL('product_potential_search', data),
    otherParameters: { isPC }
  }
});

//  清空潜在产品列表
const _clearProduct = () => ({
  type: actionTypes.POTENTIALPRODUCT_DATA_CLEAR,
  data: []
});

//  actions
//  修改产品
const _editPotentialProduct = (data) => ({
  [CALL_API]: {
    types: [actionTypes.POTENTIALPRODUCT_EDIT_REQUEST, actionTypes.POTENTIALPRODUCT_EDIT_SUCCESS, actionTypes.POTENTIALPRODUCT_EDIT_FAILURE],
    endpoint: JHCRM.getURL('product_potential_edit', data),
    options: {
      method: 'patch',
      data
    }
  }
});

export const editPotentialProduct= (data) => (dispatch, getState) => {
  return dispatch(_editPotentialProduct(data))
};

//  新增产品
const _addPotentialProduct = (data) => ({
  [CALL_API]: {
    types: [actionTypes.POTENTIALPRODUCT_EDIT_REQUEST, actionTypes.POTENTIALPRODUCT_EDIT_SUCCESS, actionTypes.POTENTIALPRODUCT_EDIT_FAILURE],
    endpoint: JHCRM.getURL('product_potential_add', data),
    options: {
      method: 'post',
      data
    }
  }
});

export const addPotentialProduct= (data) => (dispatch, getState) => {
  return dispatch(_addPotentialProduct(data))
};

export const getProduct = (data, isPC) => (dispatch, getState) => {
  return dispatch(_getProduct(data, isPC));
};

export const clearProduct = (data) => (dispatch, getState) => {
  return dispatch(_clearProduct(data));
};

//  删除渠道
const _deleteProduct = (data) => ({
  [CALL_API]: {
    types: [actionTypes.POTENTIALPRODUCT_DELETE_REQUEST, actionTypes.POTENTIALPRODUCT_DELETE_SUCCESS, actionTypes.POTENTIALPRODUCT_DELETE_FAILURE],
    endpoint: JHCRM.getURL('product_potential_delete', data),
    options: {
      method: 'delete',
      // params: data
    },
    otherParameters: data
  }
});

export const deleteProduct = (data) => (dispatch, getState) => {
  return dispatch(_deleteProduct(data));
};

//  reducers
export default function potentailList(state = {
  isLoading: false,
  data: [],
  totalCount: 0,
  editIsLoading: false,
  editIsSuccess: false,
  eidtIsFailed: false,
}, action) {
  switch (action.type) {
    case actionTypes.POTENTIALPRODUCT_LOAD_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.POTENTIALPRODUCT_LOAD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        totalCount: action.response.data.data.totalCount || 0,
        data: [...action.response.data.data.list || []],
      };
    case actionTypes.POTENTIALPRODUCT_LOAD_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    case actionTypes.POTENTIALPRODUCT_DATA_CLEAR:
      return {
        ...state,
        data: [],
        isLoading: false,
      };
    case actionTypes.POTENTIALPRODUCT_EDIT_REQUEST:
      return {
        ...state,
        editIsLoading: true,
        editIsSuccess: false,
        eidtIsFailed: false
      };
    case actionTypes.POTENTIALPRODUCT_EDIT_SUCCESS:
      return {
        ...state,
        editIsLoading: false,
        editIsSuccess: true,
        eidtIsFailed: false
      };
    case actionTypes.POTENTIALPRODUCT_EDIT_FAILURE:
      return {
        ...state,
        editIsLoading: false,
        editIsSuccess: false,
        eidtIsFailed: true
      };
    case actionTypes.POTENTIALPRODUCT_ADD_REQUEST:
      return {
        ...state,
        editIsLoading: true,
        editIsSuccess: false,
        eidtIsFailed: false
      };
    case actionTypes.POTENTIALPRODUCT_ADD_SUCCESS:
      return {
        ...state,
        editIsLoading: false,
        editIsSuccess: true,
        eidtIsFailed: false
      };
    case actionTypes.POTENTIALPRODUCT_ADD_FAILURE:
      return {
        ...state,
        editIsLoading: false,
        editIsSuccess: false,
        eidtIsFailed: true
      };
    case actionTypes.POTENTIALPRODUCT_DELETE_REQUEST:
      return {
        ...state,
        editIsLoading: true,
        editIsSuccess: false,
        eidtIsFailed: false,
      };
    case actionTypes.POTENTIALPRODUCT_DELETE_SUCCESS:
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
        editIsLoading: false,
        editIsSuccess: true,
        eidtIsFailed: false,
      };
    case actionTypes.POTENTIALPRODUCT_DELETE_FAILURE:
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

