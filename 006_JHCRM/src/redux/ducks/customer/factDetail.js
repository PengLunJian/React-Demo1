import { JHCRM } from '../../../service/ajax';
import {
  CALL_API
} from '../../middlewares/api';

//  actionTypes
export const actionTypes = {
  CUSTOMER_DETAIL_FACT_REQUEST: 'CUSTOMER_DETAIL_FACT_REQUEST',
  CUSTOMER_DETAIL_FACT_SUCCESS: 'CUSTOMER_DETAIL_FACT_SUCCESS',
  CUSTOMER_DETAIL_FACT_FAILURE: 'CUSTOMER_DETAIL_FACT_FAILURE',
  CUSTOMER_DETAIL_FACT_CLEAR: 'CUSTOMER_DETAIL_FACT_CLEAR',
};

//  actions
const _getCustomerDetail_fact = (data) => ({
  [CALL_API]: {
    types: [actionTypes.CUSTOMER_DETAIL_FACT_REQUEST, actionTypes.CUSTOMER_DETAIL_FACT_SUCCESS, actionTypes.CUSTOMER_DETAIL_FACT_FAILURE],
    endpoint: JHCRM.getURL('customer_searchDetails_fact', data)
  }
});

export const getCustomerDetail_fact = (data) => (dispatch) => {
  return dispatch(_getCustomerDetail_fact(data));
};

//  reducers
export default function customerDetail_fact(state = {
  isLoading: false,
  data: [],
}, action) {
  switch (action.type) {
    case actionTypes.CUSTOMER_DETAIL_FACT_REQUEST:
      return {
        ...state,
        data: null,
        isLoading: true,
      };
    case actionTypes.CUSTOMER_DETAIL_FACT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.response.data.data
      };
    case actionTypes.CUSTOMER_DETAIL_FACT_FAILURE:
      return {
        ...state,
        data: null,
        isLoading: false,
      };
    case actionTypes.CUSTOMER_DETAIL_FACT_CLEAR:
      return {
        ...state,
        data: [],
        isLoading: false,
      };
    default:
      return state;
  }
}
