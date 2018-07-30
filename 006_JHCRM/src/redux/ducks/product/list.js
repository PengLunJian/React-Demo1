import { JHCRM } from '../../../service/ajax';
import {
  CALL_API
} from '../../middlewares/api';

//  actionTypes
export const actionTypes = {
  PRODUCT_LOAD_REQUEST: 'PRODUCT_LOAD_REQUEST',
  PRODUCT_LOAD_SUCCESS: 'PRODUCT_LOAD_SUCCESS',
  PRODUCT_LOAD_FAILURE: 'PRODUCT_LOAD_FAILURE',
  PRODUCT_DATA_CLEAR: 'PRODUCT_DATA_CLEAR',
  ALLPRODUCT_LOAD_REQUEST: 'ALLPRODUCT_LOAD_REQUEST',
  ALLPRODUCT_LOAD_SUCCESS: 'ALLPRODUCT_LOAD_SUCCESS',
  ALLPRODUCT_LOAD_FAILURE: 'ALLPRODUCT_LOAD_FAILURE',
  PRODUCT_EDIT: 'PRODUCT_EDIT',
};

//  actions
//  产品列表-加载数据
const _getProduct = (data, isPC) => ({
  [CALL_API]: {
    types: [actionTypes.PRODUCT_LOAD_REQUEST, actionTypes.PRODUCT_LOAD_SUCCESS, actionTypes.PRODUCT_LOAD_FAILURE],
    endpoint: JHCRM.getURL(isPC ? 'product_search_pc' : 'product_search', data),
    otherParameters: { isPC }
  }
});

//  清空产品列表
const _clearProduct = () => ({
  type: actionTypes.PRODUCT_DATA_CLEAR,
  data: []
});

//  产品列表-加载所有产品数据
const _getAllProduct = (data) => ({
  [CALL_API]: {
    types: [actionTypes.ALLPRODUCT_LOAD_REQUEST, actionTypes.ALLPRODUCT_LOAD_SUCCESS, actionTypes.ALLPRODUCT_LOAD_FAILURE],
    endpoint: JHCRM.getURL('product_allProduct', data),
  }
});

//  编辑产品
const _editProduct = (id, classId) => ({
  type: actionTypes.PRODUCT_EDIT,
  id,
  classId
});

export const getProduct = (data, isPC) => (dispatch, getState) => {
  return dispatch(_getProduct(data, isPC));
};

export const clearProduct = (data) => (dispatch, getState) => {
  return dispatch(_clearProduct(data));
};

export const getAllProduct = (data) => (dispatch, getState) => {
  return dispatch(_getAllProduct(data));
};

export const editProduct = (id, classId) => (dispatch) => {
  return dispatch(_editProduct(id, classId));
};

//  reducers
export default function list(state = {
  isLoading: false,
  data: [],
  totalCount: 0,
  allProduct: [],
}, action) {
  switch (action.type) {
    case actionTypes.PRODUCT_LOAD_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.PRODUCT_LOAD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        totalCount: action.response.data.data.totalCount || 0,
        data: [...action.response.data.data.list || []],
      };
    case actionTypes.PRODUCT_LOAD_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    case actionTypes.PRODUCT_DATA_CLEAR:
      return {
        ...state,
        data: [],
        isLoading: false,
      };
    case actionTypes.ALLPRODUCT_LOAD_REQUEST:
      return {
        ...state,
        allProduct: []
      };
    case actionTypes.ALLPRODUCT_LOAD_SUCCESS:
      return {
        ...state,
        allProduct: action.response.data.data
      };
    case actionTypes.ALLPRODUCT_LOAD_FAILURE:
      return {
        ...state,
        allProduct: []
      };
    case actionTypes.PRODUCT_EDIT:
      let data;
      if (action.id) {  //  修改
        data = state.data.map((item) => {
          if (item.productId === action.id) {
            item.classId = action.classId;
          }
          return item;
        });
      } else {
        data = [...state.data];
      }
      return {
        ...state,
        data
      };
    
    default:
      return state;
  }
}

