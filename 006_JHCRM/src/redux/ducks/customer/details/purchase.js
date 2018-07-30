import { JHCRM } from '../../../../service/ajax';
import {
  CALL_API
} from '../../../middlewares/api';

//  actionTypes
export const actionTypes = {
  CUSTOMER_PURCHASE_LOAD: 'CUSTOMER_PURCHASE_LOAD',
  CUSTOMER_PURCHASE_SUCCESS: 'CUSTOMER_PURCHASE_SUCCESS',
  CUSTOMER_PURCHASE_FAILURE: 'CUSTOMER_PURCHASE_FAILURE',
  CUSTOMER_PURCHASE_CLEAR: 'CUSTOMER_PURCHASE_CLEAR',
};

//  actions
//  客户申购赎回列表-加载数据
const _getCustomerPurchase = (data) => ({
  [CALL_API]: {
    types: [actionTypes.CUSTOMER_PURCHASE_LOAD, actionTypes.CUSTOMER_PURCHASE_SUCCESS, actionTypes.CUSTOMER_PURCHASE_FAILURE],
    endpoint: JHCRM.getURL('report_customer_list', data),
  }
});

//  清空客户申购赎回列表
const _clearCustomerPurchase = () => ({
  type: actionTypes.CUSTOMER_PURCHASE_CLEAR,
  data: []
});

export const getCustomerPurchase = (data) => (dispatch, getState) => {
  return dispatch(_getCustomerPurchase(data));
};

export const clearCustomerPurchase = (data) => (dispatch, getState) => {
  return dispatch(_clearCustomerPurchase(data));
};

//  reducers
export default function purchase(state = {
  isLoading: false,
  totalCount: 0,
  data: [],
}, action) {
  switch (action.type) {
    case actionTypes.CUSTOMER_PURCHASE_LOAD:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.CUSTOMER_PURCHASE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        totalCount: action.response.data.data.totalCount || 0,
        data: [...state.data, ...action.response.data.data.list || []],
      };
    case actionTypes.CUSTOMER_PURCHASE_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    case actionTypes.CUSTOMER_PURCHASE_CLEAR:
      return {
        ...state,
        data: [],
        isLoading: false,
      };
    
    default:
      return state;
  }
}

