import { JHCRM } from '../../../service/ajax';
import {
  CALL_API
} from '../../middlewares/api';

//  actionTypes
export const actionTypes = {
  CHANNEL_PURCHASE_LOAD: 'CHANNEL_PURCHASE_LOAD',
  CHANNEL_PURCHASE_SUCCESS: 'CHANNEL_PURCHASE_SUCCESS',
  CHANNEL_PURCHASE_FAILURE: 'CHANNEL_PURCHASE_FAILURE',
  CHANNEL_PURCHASE_CLEAR: 'CHANNEL_PURCHASE_CLEAR',
};

//  actions
//  联系人列表-加载数据
const _getChannelPurchase = (data) => ({
  [CALL_API]: {
    types: [actionTypes.CHANNEL_PURCHASE_LOAD, actionTypes.CHANNEL_PURCHASE_SUCCESS, actionTypes.CHANNEL_PURCHASE_FAILURE],
    endpoint: JHCRM.getURL('channel_holdings_list', data),
  }
});

//  清空联系人列表
const _clearChannelPurchase = () => ({
  type: actionTypes.CHANNEL_PURCHASE_CLEAR,
  data: []
});

export const getChannelPurchase = (data) => (dispatch, getState) => {
  return dispatch(_getChannelPurchase(data));
};

export const clearChannelPurchase = (data) => (dispatch, getState) => {
  return dispatch(_clearChannelPurchase(data));
};

//  reducers
export default function channelPurchase(state = {
  isLoading: false,
  totalCount: 0,
  data: [],
}, action) {
  switch (action.type) {
    case actionTypes.CHANNEL_PURCHASE_LOAD:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.CHANNEL_PURCHASE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        totalCount: action.response.data.data.totalCount || 0,
        data: [...state.data, ...action.response.data.data.list || []],
      };
    case actionTypes.CHANNEL_PURCHASE_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    case actionTypes.CHANNEL_PURCHASE_CLEAR:
      return {
        ...state,
        data: [],
        isLoading: false,
      };
    
    default:
      return state;
  }
}

