import { JHCRM } from '../../../../service/ajax';
import {
  CALL_API
} from '../../../middlewares/api';

//  actionTypes
export const actionTypes = {
  CUSTOMER_HOLDINGS_LOAD: 'CUSTOMER_HOLDINGS_LOAD',
  CUSTOMER_HOLDINGS_SUCCESS: 'CUSTOMER_HOLDINGS_SUCCESS',
  CUSTOMER_HOLDINGS_FAILURE: 'CUSTOMER_HOLDINGS_FAILURE',
  CUSTOMER_HOLDINGS_CLEAR: 'CUSTOMER_HOLDINGS_CLEAR',
};

//  actions
//  客户保有量列表-加载数据
const _getCustomerHoldings = (data) => ({
  [CALL_API]: {
    types: [actionTypes.CUSTOMER_HOLDINGS_LOAD, actionTypes.CUSTOMER_HOLDINGS_SUCCESS, actionTypes.CUSTOMER_HOLDINGS_FAILURE],
    endpoint: JHCRM.getURL('report_customer_list', data),
  }
});

//  清空客户保有量列表
const _clearCustomerHoldings = () => ({
  type: actionTypes.CUSTOMER_HOLDINGS_CLEAR,
  data: []
});

export const getCustomerHoldings = (data) => (dispatch, getState) => {
  return dispatch(_getCustomerHoldings(data));
};

export const clearCustomerHoldings = (data) => (dispatch, getState) => {
  return dispatch(_clearCustomerHoldings(data));
};

//  reducers
export default function holdings(state = {
  isLoading: false,
  totalCount: 0,
  data: [],
}, action) {
  switch (action.type) {
    case actionTypes.CUSTOMER_HOLDINGS_LOAD:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.CUSTOMER_HOLDINGS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        totalCount: action.response.data.data.totalCount || 0,
        data: [...state.data, ...action.response.data.data.list || []],
      };
    case actionTypes.CUSTOMER_HOLDINGS_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    case actionTypes.CUSTOMER_HOLDINGS_CLEAR:
      return {
        ...state,
        data: [],
        isLoading: false,
      };
    
    default:
      return state;
  }
}

