import { JHCRM } from '../../../service/ajax';
import {
  CALL_API
} from '../../middlewares/api';

//  actionTypes
export const actionTypes = {
  CHANNEL_FACT_LOAD_REQUEST: 'CHANNEL_FACT_LOAD_REQUEST',
  CHANNEL_FACT_LOAD_SUCCESS: 'CHANNEL_FACT_LOAD_SUCCESS',
  CHANNEL_FACT_LOAD_FAILURE: 'CHANNEL_FACT_LOAD_FAILURE',
  CHANNEL_FACT_DATA_CLEAR: 'CHANNEL_FACT_DATA_CLEAR',
};

//  actions
//  事实渠道列表-加载数据
const _getChannel_fact = (data, isPC) => ({
  [CALL_API]: {
    types: [actionTypes.CHANNEL_FACT_LOAD_REQUEST, actionTypes.CHANNEL_FACT_LOAD_SUCCESS, actionTypes.CHANNEL_FACT_LOAD_FAILURE],
    endpoint: JHCRM.getURL(isPC ? 'channel_search_fact_pc' : 'channel_search_fact', data),
    otherParameters: { isPC }
  }
});

//  清空事实渠道列表
const _clearChannel_fact = () => ({
  type: actionTypes.CHANNEL_FACT_DATA_CLEAR,
  data: []
});

//  isPC判断是否是PC端，PC为true
export const getChannel_fact = (data, isPC) => (dispatch, getState) => {
  return dispatch(_getChannel_fact(data, isPC));
};

export const clearChannel_fact = (data) => (dispatch, getState) => {
  return dispatch(_clearChannel_fact(data));
};


//  reducers
export default function factList(state = {
  isLoading: false,
  totalCount: 0,
  data: [],
}, action) {
  switch (action.type) {
    case actionTypes.CHANNEL_FACT_LOAD_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.CHANNEL_FACT_LOAD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        totalCount: action.response.data.data.totalCount || 0,
        data: action.otherParameters.isPC ? action.response.data.data.list || [] : [...state.data, ...action.response.data.data.list || []],
      };
    case actionTypes.CHANNEL_FACT_LOAD_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    case actionTypes.CHANNEL_FACT_DATA_CLEAR:
      return {
        ...state,
        data: [],
        isLoading: false,
      };
      
    default:
      return state;
  }
}

