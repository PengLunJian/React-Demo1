import { JHCRM } from '../../../../../service/ajax';
import {
  CALL_API
} from '../../../../middlewares/api';

//  actionTypes
export const actionTypes = {
  PRODUCT_CHANNEL_LOAD_REQUEST: 'PRODUCT_CHANNEL_LOAD_REQUEST',
  PRODUCT_CHANNEL_LOAD_SUCCESS: 'PRODUCT_CHANNEL_LOAD_SUCCESS',
  PRODUCT_CHANNEL_LOAD_FAILURE: 'PRODUCT_CHANNEL_LOAD_FAILURE',
  PRODUCT_CHANNEL_DATA_CLEAR: 'PRODUCT_CHANNEL_DATA_CLEAR'
};

//  actions
//  产品详情--渠道列表-加载数据
const _getChannel_product = (data) => ({
  [CALL_API]: {
    types: [actionTypes.PRODUCT_CHANNEL_LOAD_REQUEST, actionTypes.PRODUCT_CHANNEL_LOAD_SUCCESS, actionTypes.PRODUCT_CHANNEL_LOAD_FAILURE],
    endpoint: JHCRM.getURL('product_channel_list', data),
  }
});

//  产品详情--清空渠道列表
const _clearChannel_product = () => ({
  type: actionTypes.PRODUCT_CHANNEL_DATA_CLEAR,
  data: []
});

export const getChannel_product = (data) => (dispatch, getState) => {
  return dispatch(_getChannel_product(data));
};

export const clearChannel_product = (data) => (dispatch, getState) => {
  return dispatch(_clearChannel_product(data));
};

//  reducers
export default function channelList(state = {
  isLoading: false,
  totalCount: 0,
  data: [],
  
  deleteIsLoading: false,
  deleteIsSuccess: false,
  deleteIsFailed: false,
}, action) {
  switch (action.type) {
    case actionTypes.PRODUCT_CHANNEL_LOAD_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.PRODUCT_CHANNEL_LOAD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        totalCount: action.response.data.data.totalCount || 0,
        data: [...state.data, ...action.response.data.data.list || []],
      };
    case actionTypes.PRODUCT_CHANNEL_LOAD_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    case actionTypes.PRODUCT_CHANNEL_DATA_CLEAR:
      return {
        ...state,
        data: [],
        isLoading: false,
      };
    
    default:
      return state;
  }
}

