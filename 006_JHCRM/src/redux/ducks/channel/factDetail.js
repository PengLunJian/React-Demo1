import { JHCRM } from '../../../service/ajax';
import {
  CALL_API
} from '../../middlewares/api';

//  actionTypes
export const actionTypes = {
  CHANNEL_DETAIL_FACT_REQUEST: 'CHANNEL_DETAIL_FACT_REQUEST',
  CHANNEL_DETAIL_FACT_SUCCESS: 'CHANNEL_DETAIL_FACT_SUCCESS',
  CHANNEL_DETAIL_FACT_FAILURE: 'CHANNEL_DETAIL_FACT_FAILURE',
  CHANNEL_DETAIL_FACT_CLEAR: 'CHANNEL_DETAIL_FACT_CLEAR',
};

//  actions
const _getChannelDetail_fact = (data) => ({
  [CALL_API]: {
    types: [actionTypes.CHANNEL_DETAIL_FACT_REQUEST, actionTypes.CHANNEL_DETAIL_FACT_SUCCESS, actionTypes.CHANNEL_DETAIL_FACT_FAILURE],
    endpoint: JHCRM.getURL('channel_searchDetails_fact', data)
  }
});

export const getChannelDetail_fact = (data) => (dispatch) => {
  return dispatch(_getChannelDetail_fact(data));
};

//  reducers
export default function factDetail(state = {
  isLoading: false,
  data: [],
}, action) {
  switch (action.type) {
    case actionTypes.CHANNEL_DETAIL_FACT_REQUEST:
      return {
        ...state,
        data: null,
        isLoading: true,
      };
    case actionTypes.CHANNEL_DETAIL_FACT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.response.data.data
      };
    case actionTypes.CHANNEL_DETAIL_FACT_FAILURE:
      return {
        ...state,
        data: null,
        isLoading: false,
      };
    case actionTypes.CHANNEL_DETAIL_FACT_CLEAR:
      return {
        ...state,
        data: [],
        isLoading: false,
      };
    default:
      return state;
  }
}
