import { JHCRM } from '../../../service/ajax';
import {
  CALL_API
} from '../../middlewares/api';

//  actionTypes
export const actionTypes = {
  CUSTOMER_FACT_LOAD_REQUEST: 'CUSTOMER_FACT_LOAD_REQUEST',
  CUSTOMER_FACT_LOAD_SUCCESS: 'CUSTOMER_FACT_LOAD_SUCCESS',
  CUSTOMER_FACT_LOAD_FAILURE: 'CUSTOMER_FACT_LOAD_FAILURE',
  CUSTOMER_FACT_DATA_CLEAR: 'CUSTOMER_FACT_DATA_CLEAR',
};

//  actions
//  客户列表-加载数据
const _getCustomer_fact = (data, isPC) => ({
  [CALL_API]: {
    types: [actionTypes.CUSTOMER_FACT_LOAD_REQUEST, actionTypes.CUSTOMER_FACT_LOAD_SUCCESS, actionTypes.CUSTOMER_FACT_LOAD_FAILURE],
    endpoint: JHCRM.getURL(isPC ? 'customer_search_fact_pc' : 'customer_search_fact', data),
    otherParameters: { isPC }
  }
});

//  清空客户列表
const _clearCustomer_fact = () => ({
  type: actionTypes.CUSTOMER_FACT_DATA_CLEAR,
  data: []
});

//  isPC判断是否是PC端，PC为true
export const getCustomer_fact = (data, isPC) => (dispatch, getState) => {
  return dispatch(_getCustomer_fact(data, isPC));
};

export const clearCustomer_fact = (data) => (dispatch, getState) => {
  return dispatch(_clearCustomer_fact(data));
};


//  reducers
export default function factList(state = {
  isLoading: false,
  totalCount: 0,
  data: [],
}, action) {
  switch (action.type) {
    case actionTypes.CUSTOMER_FACT_LOAD_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.CUSTOMER_FACT_LOAD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        totalCount: action.response.data.data.totalCount || 0,
        data: action.otherParameters.isPC ? action.response.data.data.list || [] : [...state.data, ...action.response.data.data.list || []],
      };
    case actionTypes.CUSTOMER_FACT_LOAD_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    case actionTypes.CUSTOMER_FACT_DATA_CLEAR:
      return {
        ...state,
        data: [],
        isLoading: false,
      };
      
    default:
      return state;
  }
}

