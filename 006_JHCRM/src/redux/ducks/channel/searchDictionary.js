import { JHCRM } from '../../../service/ajax';
import {
  CALL_API
} from '../../middlewares/api';

//  actionTypes
export const actionTypes = {
  DICTIONARY_SEARCH_REQUEST: 'DICTIONARY_SEARCH_REQUEST',
  DICTIONARY_SEARCH_SUCCESS: 'DICTIONARY_SEARCH_SUCCESS',
  DICTIONARY_SEARCH_FAILURE: 'DICTIONARY_SEARCH_FAILURE',
};

//  actions
const _getDictionary = (data) => ({
  [CALL_API]: {
    types: [actionTypes.DICTIONARY_SEARCH_REQUEST, actionTypes.DICTIONARY_SEARCH_SUCCESS, actionTypes.DICTIONARY_SEARCH_FAILURE],
    endpoint: JHCRM.getURL('dictionary_search', data)
  }
});

export const getDictionary = (data) => (dispatch, getState) => {
  return dispatch(_getDictionary(data));
};

//  reducers
export default function getSearchDictionary(state = {
  data: {},
}, action) {
  switch (action.type) {
    case actionTypes.DICTIONARY_SEARCH_REQUEST:
      return {
        ...state,
        data: {},
      };
    case actionTypes.DICTIONARY_SEARCH_SUCCESS:
      return {
        ...state,
        data: action.response.data.data || {},
      };
    case actionTypes.DICTIONARY_SEARCH_FAILURE:
      return {
        ...state,
        data: {},
      };
    default:
      return state;
  }
}
