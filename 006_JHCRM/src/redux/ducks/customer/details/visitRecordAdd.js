import { JHCRM } from '../../../../service/ajax';
import {
  CALL_API
} from '../../../middlewares/api';

//  actionTypes
export const actionTypes = {
  VISIT_RECORD_KEYEVENT: 'VISIT_RECORD_KEYEVENT',
  VISIT_RECORD_KEYEVENT_RESET: 'VISIT_RECORD_KEYEVENT_RESET',
  VISIT_RECORD_DETAILS_REQUEST: 'VISIT_RECORD_DETAILS_REQUEST',
  VISIT_RECORD_DETAILS_SUCCESS: 'VISIT_RECORD_DETAILS_SUCCESS',
  VISIT_RECORD_DETAILS_FAILURE: 'VISIT_RECORD_DETAILS_FAILURE',
  VISIT_RECORD_PERSONS_REQUEST: 'VISIT_RECORD_PERSONS_REQUEST',
  VISIT_RECORD_PERSONS_SUCCESS: 'VISIT_RECORD_PERSONS_SUCCESS',
  VISIT_RECORD_PERSONS_FAILURE: 'VISIT_RECORD_PERSONS_FAILURE',
  VISIT_RECORD_USER_INFO_REQUEST: 'VISIT_RECORD_USER_INFO_REQUEST',
  VISIT_RECORD_USER_INFO_SUCCESS: 'VISIT_RECORD_USER_INFO_SUCCESS',
  VISIT_RECORD_USER_INFO_FAILURE: 'VISIT_RECORD_USER_INFO_FAILURE',
  VISIT_RECORD_PRODUCTS_REQUEST: 'VISIT_RECORD_PRODUCTS_REQUEST',
  VISIT_RECORD_PRODUCTS_SUCCESS: 'VISIT_RECORD_PRODUCTS_SUCCESS',
  VISIT_RECORD_PRODUCTS_FAILURE: 'VISIT_RECORD_PRODUCTS_FAILURE',
  VISIT_RECORD_DICTIONARY_REQUEST: 'VISIT_RECORD_DICTIONARY_REQUEST',
  VISIT_RECORD_DICTIONARY_SUCCESS: 'VISIT_RECORD_DICTIONARY_SUCCESS',
  VISIT_RECORD_DICTIONARY_FAILURE: 'VISIT_RECORD_DICTIONARY_FAILURE'
};

const _editVisitRecordEvent = (data) => ({
  type: actionTypes.VISIT_RECORD_KEYEVENT,
  data
});

export const editVisitRecordEvent = (data) => (dispatch, getState) => {
  return dispatch(_editVisitRecordEvent(data));
};

const _getContacts = (data) => ({
  [CALL_API]: {
    types: [
      actionTypes.VISIT_RECORD_PERSONS_REQUEST,
      actionTypes.VISIT_RECORD_PERSONS_SUCCESS,
      actionTypes.VISIT_RECORD_PERSONS_FAILURE
    ],
    endpoint: JHCRM.getURL('visitRecord_searchAllContacts', data)
  }
});

export const getContacts = (data) => (dispatch, getState) => {
  return dispatch(_getContacts(data));
};

const _getUserInfo = (data) => ({
  [CALL_API]: {
    types: [
      actionTypes.VISIT_RECORD_USER_INFO_REQUEST,
      actionTypes.VISIT_RECORD_USER_INFO_SUCCESS,
      actionTypes.VISIT_RECORD_USER_INFO_FAILURE
    ],
    endpoint: JHCRM.getURL('visitRecord_userInfoUsers')
  }
});

export const getUserInfo = (data) => (dispatch, getState) => {
  return dispatch(_getUserInfo(data));
};

const _getProducts = (data) => ({
  [CALL_API]: {
    types: [
      actionTypes.VISIT_RECORD_PRODUCTS_REQUEST,
      actionTypes.VISIT_RECORD_PRODUCTS_SUCCESS,
      actionTypes.VISIT_RECORD_PRODUCTS_FAILURE
    ],
    endpoint: JHCRM.getURL('product_allProduct', data)
  }
});

export const getProducts = (data) => (dispatch, getState) => {
  return dispatch(_getProducts(data));
};

const _getDictionary = (data) => ({
  [CALL_API]: {
    types: [
      actionTypes.VISIT_RECORD_DICTIONARY_REQUEST,
      actionTypes.VISIT_RECORD_DICTIONARY_SUCCESS,
      actionTypes.VISIT_RECORD_DICTIONARY_FAILURE
    ],
    endpoint: JHCRM.getURL('visitRecord_dictionarySearch', data)
  }
});

export const getDictionary = (data) => (dispatch, getState) => {
  return dispatch(_getDictionary(data));
};

const _getVisitRecordDetails = (data) => ({
  [CALL_API]: {
    types: [
      actionTypes.VISIT_RECORD_DETAILS_REQUEST,
      actionTypes.VISIT_RECORD_DETAILS_SUCCESS,
      actionTypes.VISIT_RECORD_DETAILS_FAILURE
    ],
    endpoint: JHCRM.getURL('visitRecord_searchDetails', data)
  }
});

export const getVisitRecordDetails = (data) => (dispatch, getState) => {
  return dispatch(_getVisitRecordDetails(data));
};

export default function visitRecordAdd(state = {
  eventData: '',//存储事件编辑的内容
  dataDetails: {}
}, action) {
  switch (action.type) {
    case actionTypes.VISIT_RECORD_KEYEVENT:
      return {
        ...state,
        eventData: action.data
      };
    case actionTypes.VISIT_RECORD_KEYEVENT_RESET:
      return {
        ...state,
        eventData: ''
      };
    
    case actionTypes.VISIT_RECORD_DETAILS_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case actionTypes.VISIT_RECORD_DETAILS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        dataDetails: action.response.data.data || {}
      };
    case actionTypes.VISIT_RECORD_DETAILS_FAILURE:
      return {
        ...state,
        isLoading: false,
        data: ''
      };
    
    case actionTypes.VISIT_RECORD_PERSONS_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case actionTypes.VISIT_RECORD_PERSONS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        dataContacts: action.response.data.data || []
      };
    case actionTypes.VISIT_RECORD_PERSONS_FAILURE:
      return {
        ...state,
        isLoading: false
      };
    
    case actionTypes.VISIT_RECORD_USER_INFO_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case actionTypes.VISIT_RECORD_USER_INFO_SUCCESS:
      return {
        ...state,
        isLoading: false,
        dataUsers: action.response.data.data || []
      };
    case actionTypes.VISIT_RECORD_USER_INFO_FAILURE:
      return {
        ...state,
        isLoading: false
      };
    
    case actionTypes.VISIT_RECORD_PRODUCTS_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case actionTypes.VISIT_RECORD_PRODUCTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        dataProducts: action.response.data.data || []
      };
    case actionTypes.VISIT_RECORD_PRODUCTS_FAILURE:
      return {
        ...state,
        isLoading: false
      };
    
    case actionTypes.VISIT_RECORD_DICTIONARY_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case actionTypes.VISIT_RECORD_DICTIONARY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        dataDictionary: action.response.data.data.visitType || []
      };
    case actionTypes.VISIT_RECORD_DICTIONARY_FAILURE:
      return {
        ...state,
        isLoading: false
      };
    default:
      return state;
  }
}
