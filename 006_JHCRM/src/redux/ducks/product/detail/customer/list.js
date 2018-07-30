import { JHCRM } from '../../../../../service/ajax';
import {
  CALL_API
} from '../../../../middlewares/api';

//  actionTypes
export const actionTypes = {
  PRODUCT_CUSTOMER_LOAD_REQUEST: 'PRODUCT_CUSTOMER_LOAD_REQUEST',
  PRODUCT_CUSTOMER_LOAD_SUCCESS: 'PRODUCT_CUSTOMER_LOAD_SUCCESS',
  PRODUCT_CUSTOMER_LOAD_FAILURE: 'PRODUCT_CUSTOMER_LOAD_FAILURE',
  PRODUCT_CUSTOMER_DATA_CLEAR: 'PRODUCT_CUSTOMER_DATA_CLEAR'
};

//  actions
//  产品详情--客户列表-加载数据
const _getCustomer_product = (data) => ({
  [CALL_API]: {
    types: [actionTypes.PRODUCT_CUSTOMER_LOAD_REQUEST, actionTypes.PRODUCT_CUSTOMER_LOAD_SUCCESS, actionTypes.PRODUCT_CUSTOMER_LOAD_FAILURE],
    endpoint: JHCRM.getURL('product_customer_list', data),
  }
});

//  产品详情--清空客户列表
const _clearCustomer_product = () => ({
  type: actionTypes.PRODUCT_CUSTOMER_DATA_CLEAR,
  data: []
});

export const getCustomer_product = (data) => (dispatch, getState) => {
  return dispatch(_getCustomer_product(data));
};

export const clearCustomer_product = (data) => (dispatch, getState) => {
  return dispatch(_clearCustomer_product(data));
};

//  reducers
export default function customerList(state = {
  isLoading: false,
  totalCount: 0,
  data: [],
  
  deleteIsLoading: false,
  deleteIsSuccess: false,
  deleteIsFailed: false,
}, action) {
  switch (action.type) {
    case actionTypes.PRODUCT_CUSTOMER_LOAD_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.PRODUCT_CUSTOMER_LOAD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        totalCount: action.response.data.data.totalCount || 0,
        data: [...state.data, ...action.response.data.data.list || []],
      };
    case actionTypes.PRODUCT_CUSTOMER_LOAD_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    case actionTypes.PRODUCT_CUSTOMER_DATA_CLEAR:
      return {
        ...state,
        data: [],
        isLoading: false,
      };
    
    default:
      return state;
  }
}

