import { JHCRM } from '../../../service/ajax';
import {
  CALL_API
} from '../../middlewares/api';

//  actionTypes
export const actionTypes = {
  REPORT_CUSTOMER_LOAD: 'REPORT_CUSTOMER_LOAD',
  REPORT_CUSTOMER_SUCCESS: 'REPORT_CUSTOMER_SUCCESS',
  REPORT_CUSTOMER_FAILURE: 'REPORT_CUSTOMER_FAILURE',
  REPORT_CUSTOMER_CLEAR: 'REPORT_CUSTOMER_CLEAR',
};

//  actions
//  客户报表列表-加载数据
const _getReportCustomer = (data) => ({
  [CALL_API]: {
    types: [actionTypes.REPORT_CUSTOMER_LOAD, actionTypes.REPORT_CUSTOMER_SUCCESS, actionTypes.REPORT_CUSTOMER_FAILURE],
    endpoint: JHCRM.getURL('report_customer_list', data),
  }
});

//  清空客户报表列表
const _clearReportCustomer = () => ({
  type: actionTypes.REPORT_CUSTOMER_CLEAR,
  data: []
});

export const getReportCustomer = (data) => (dispatch, getState) => {
  return dispatch(_getReportCustomer(data));
};

export const clearReportCustomer = (data) => (dispatch, getState) => {
  return dispatch(_clearReportCustomer(data));
};

//  reducers
export default function customer(state = {
  isLoading: false,
  totalCount: 0,
  data: [],
}, action) {
  switch (action.type) {
    case actionTypes.REPORT_CUSTOMER_LOAD:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.REPORT_CUSTOMER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        totalCount: action.response.data.data.totalCount || 0,
        data: [...state.data, ...action.response.data.data.list || []],
      };
    case actionTypes.REPORT_CUSTOMER_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    case actionTypes.REPORT_CUSTOMER_CLEAR:
      return {
        ...state,
        data: [],
        isLoading: false,
      };
    
    default:
      return state;
  }
}

