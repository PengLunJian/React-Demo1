import { JHCRM } from '../../../service/ajax';
import {
  CALL_API
} from '../../middlewares/api';

//  actionTypes
export const actionTypes = {
  CUSTOMER_DETAIL_REQUEST: 'CUSTOMER_DETAIL_REQUEST',
  CUSTOMER_DETAIL_SUCCESS: 'CUSTOMER_DETAIL_SUCCESS',
  CUSTOMER_DETAIL_FAILURE: 'CUSTOMER_DETAIL_FAILURE',
  CUSTOMER_DETAIL_CLEAR: 'CUSTOMER_DETAIL_CLEAR',
};

//  actions
const _saveCustomerDetail = (data) => ({
  [CALL_API]: {
    types: [actionTypes.CUSTOMER_DETAIL_REQUEST, actionTypes.CUSTOMER_DETAIL_SUCCESS, actionTypes.CUSTOMER_DETAIL_FAILURE],
    endpoint: JHCRM.getURL('CUSTOMER_DETAIL_search'),
    options: {
      method: 'post',
      data
    }
  }
  // type: actionTypes.CUSTOMER_DETAIL_SUCCESS,
  // data: testData(params)
});

export const saveCustomerDetail = (data) => (dispatch, getState) => {
  return dispatch(_saveCustomerDetail(data));
};

//  reducers
export default function getCustomerDetail(state = {
  isLoading: false,
  data: [],
}, action) {
  switch (action.type) {
    case actionTypes.CUSTOMER_DETAIL_REQUEST:
      return {
        ...state,
        data: [],
        isLoading: true,
      };
    case actionTypes.CUSTOMER_DETAIL_SUCCESS:
			console.log(state.data)
      return {
        ...state,
        isLoading: false,
        data: [...state.data, ...action.data],
      };
    case actionTypes.CUSTOMER_DETAIL_FAILURE:
      return {
        ...state,
        data: [],
        isLoading: false,
      };
    case actionTypes.CUSTOMER_DETAIL_CLEAR:
      return {
        ...state,
        data: [],
        isLoading: false,
      };
    default:
      return state;
  }
}

//  测试数据
function testData(params) {
  const dataArr = [];
  for (let i = 1; i <= 20; i++) {
    dataArr.push({
      id: i + '-' + params.pageNo,
      name: 'customer' + i + '-' + params.pageNo
    });
  }
  return dataArr;
}
