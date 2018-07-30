import { JHCRM } from '../../../../service/ajax';
import {
  CALL_API
} from '../../../middlewares/api';

//  actionTypes
export const actionTypes = {
  PRODUCT_DETAIL_REQUEST: 'PRODUCT_DETAIL_REQUEST',
  PRODUCT_DETAIL_SUCCESS: 'PRODUCT_DETAIL_SUCCESS',
  PRODUCT_DETAIL_FAILURE: 'PRODUCT_DETAIL_FAILURE',
  PRODUCT_DETAIL_CLEAR: 'PRODUCT_DETAIL_CLEAR',
};

//  actions
const _loadProductDetail = (data) => ({
  [CALL_API]: {
    types: [actionTypes.PRODUCT_DETAIL_REQUEST, actionTypes.PRODUCT_DETAIL_SUCCESS, actionTypes.PRODUCT_DETAIL_FAILURE],
    endpoint: JHCRM.getURL('product_searchDetails', data),
  }
});

export const loadProductDetail = (data) => (dispatch, getState) => {
  return dispatch(_loadProductDetail(data));
};

//  reducers
export default function getProductDetail(state = {
  isLoading: false,
  data: [],
}, action) {
  switch (action.type) {
    case actionTypes.PRODUCT_DETAIL_REQUEST:
      return {
        ...state,
        data: null,
        isLoading: true,
      };
    case actionTypes.PRODUCT_DETAIL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.response.data.data
      };
    case actionTypes.PRODUCT_DETAIL_FAILURE:
      return {
        ...state,
        data: null,
        isLoading: false,
      };
    case actionTypes.PRODUCT_DETAIL_CLEAR:
      return {
        ...state,
        data: [],
        isLoading: false,
      };
    default:
      return state;
  }
}
