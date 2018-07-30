import { JHCRM } from '../../service/ajax';
import {
  CALL_API
} from '../middlewares/api';

//  actionTypes
export const actionTypes = {
  EXPORT_CUSTOMER_REQUEST: 'EXPORT_CUSTOMER_REQUEST',
  EXPORT_CUSTOMER_SUCCESS: 'EXPORT_CUSTOMER_SUCCESS',
  EXPORT_CUSTOMER_FAILURE: 'EXPORT_CUSTOMER_FAILURE',
};

//  actions
const _exportCustomer = (data) => ({
  [CALL_API]: {
    types: [actionTypes.EXPORT_CUSTOMER_REQUEST, actionTypes.EXPORT_CUSTOMER_SUCCESS, actionTypes.EXPORT_CUSTOMER_FAILURE],
    endpoint: JHCRM.getURL('customer_export', data)
  }
});

export const exportCustomer = (data) => (dispatch, getState) => {
  return dispatch(_exportCustomer(data));
};

//  reducers
export default function customerExport(state = {
  data: '',
}, action) {
  switch (action.type) {
    case actionTypes.EXPORT_CUSTOMER_REQUEST:
      return {
        ...state,
        data: '',
      };
    case actionTypes.EXPORT_CUSTOMER_SUCCESS:
      return {
        ...state,
        data: action.response.data.data || '',
      };
    case actionTypes.EXPORT_CUSTOMER_FAILURE:
      return {
        ...state,
        data: '',
      };
    default:
      return state;
  }
}
