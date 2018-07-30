import { JHCRM } from '../../../service/ajax';
import {
  CALL_API
} from '../../middlewares/api';

//  actionTypes
export const actionTypes = {
  CHANNEL_HOLDINGS_LOAD: 'CHANNEL_HOLDINGS_LOAD',
  CHANNEL_HOLDINGS_SUCCESS: 'CHANNEL_HOLDINGS_SUCCESS',
  CHANNEL_HOLDINGS_FAILURE: 'CHANNEL_HOLDINGS_FAILURE',
  CHANNEL_HOLDINGS_CLEAR: 'CHANNEL_HOLDINGS_CLEAR',
};

//  actions
//  保有量列表-加载数据
const _getChannelHoldings = (data) => ({
  [CALL_API]: {
    types: [actionTypes.CHANNEL_HOLDINGS_LOAD, actionTypes.CHANNEL_HOLDINGS_SUCCESS, actionTypes.CHANNEL_HOLDINGS_FAILURE],
    endpoint: JHCRM.getURL('channel_holdings_list', data),
  }
});

//  清空保有量列表
const _clearChannelHoldings = () => ({
  type: actionTypes.CHANNEL_HOLDINGS_CLEAR,
  data: []
});

export const getChannelHoldings = (data) => (dispatch, getState) => {
  return dispatch(_getChannelHoldings(data));
};

export const clearChannelHoldings = (data) => (dispatch, getState) => {
  return dispatch(_clearChannelHoldings(data));
};

//  reducers
export default function channelHoldings(state = {
  isLoading: false,
  totalCount: 0,
  data: [],
}, action) {
  switch (action.type) {
    case actionTypes.CHANNEL_HOLDINGS_LOAD:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.CHANNEL_HOLDINGS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        totalCount: action.response.data.data.totalCount || 0,
        data: [...state.data, ...action.response.data.data.list || []],
      };
    case actionTypes.CHANNEL_HOLDINGS_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    case actionTypes.CHANNEL_HOLDINGS_CLEAR:
      return {
        ...state,
        data: [],
        isLoading: false,
      };
    
    default:
      return state;
  }
}

