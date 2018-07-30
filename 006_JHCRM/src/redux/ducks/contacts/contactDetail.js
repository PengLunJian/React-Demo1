import { JHCRM } from '../../../service/ajax';
import {
  CALL_API
} from '../../middlewares/api';
import { editContacts } from './list';

//  actionTypes
export const actionTypes = {
  CONTACT_DETAIL_REQUEST: 'CONTACT_DETAIL_REQUEST',
  CONTACT_DETAIL_SUCCESS: 'CONTACT_DETAIL_SUCCESS',
  CONTACT_DETAIL_FAILURE: 'CONTACT_DETAIL_FAILURE',
  CONTACT_ADD_REQUEST: 'CONTACT_ADD_REQUEST',
  CONTACT_ADD_SUCCESS: 'CONTACT_ADD_SUCCESS',
  CONTACT_ADD_FAILURE: 'CONTACT_ADD_FAILURE',
  CONTACT_ADD_RESET: 'CONTACT_ADD_RESET',
  CONTACT_ADDEVENT: 'CONTACT_ADDEVENT',
  CONTACT_ADDEVENT_CLEAR: 'CONTACT_ADDEVENT_CLEAR',
};

//  actions
//  查询客户信息
const _contactDetail = (data) => ({
  [CALL_API]: {
    types: [actionTypes.CONTACT_DETAIL_REQUEST, actionTypes.CONTACT_DETAIL_SUCCESS, actionTypes.CONTACT_DETAIL_FAILURE],
    endpoint: JHCRM.getURL('contacts_searchDetails', data)
  }
});

//  保存新增或修改客户
const _saveContactAdd = (data) => ({
  [CALL_API]: {
    types: [actionTypes.CONTACT_ADD_REQUEST, actionTypes.CONTACT_ADD_SUCCESS, actionTypes.CONTACT_ADD_FAILURE],
    endpoint: JHCRM.getURL('contacts_saveContact'),
    options: {
      method: 'post',
      data
    }
  }
});

//  关键事件保存
const _contactAddEvent = (data) => ({
  type: actionTypes.contact_ADDEVENT,
  data
});

//  重置保存或提交之后的状态
const _resetContactAdd = (data) => ({
  type: actionTypes.CONTACT_ADD_RESET,
  data
});

export const contactDetail = (data) => (dispatch) => {
  return dispatch(_contactDetail(data));
};

export const addContact = (data, id) => (dispatch, getState) => {
  return dispatch(_saveContactAdd(data))
    .then((res) => {
      dispatch(editContacts(res.response.data.data, id));
      return res;
    });
};

export const contactAddEvent = (data) => (dispatch, getState) => {
  return dispatch(_contactAddEvent(data));
};

//  reducers
export default function contactAdd(state = {
  isLoading: false,
  data: '',
  addIsLoading: false,
  addIsSuccess: false,
  addIsFailed: false,
  addedId: '',
  eventData: ''
}, action) {
  switch (action.type) {
    case actionTypes.CONTACT_DETAIL_REQUEST:
      return {
        ...state,
        isLoading: true,
        data: ''
      };
    case actionTypes.CONTACT_DETAIL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.response.data.data
      };
    case actionTypes.CONTACT_DETAIL_FAILURE:
      return {
        ...state,
        isLoading: false,
        data: ''
      };
    case actionTypes.CONTACT_ADD_REQUEST:
      return {
        ...state,
        addIsLoading: true,
        addIsSuccess: false,
        addIsFailed: false,
      };
    case actionTypes.CONTACT_ADD_SUCCESS:
      return {
        ...state,
        addIsLoading: false,
        addIsSuccess: true,
        addIsFailed: false,
        addedId: action.response.data.data.id,
        data: action.response.data.data
      };
    case actionTypes.CONTACT_ADD_FAILURE:
      return {
        ...state,
        addIsLoading: false,
        addIsSuccess: false,
        addIsFailed: true,
      };
    case actionTypes.CONTACT_ADD_RESET:
      return {
        ...state,
        addIsLoading: false,
        addIsSuccess: false,
        addIsFailed: false,
      };
    case actionTypes.CONTACT_ADDEVENT:
      return {
        ...state,
        eventData: action.data,
      };
    case actionTypes.CONTACT_ADDEVENT_CLEAR:
      return {
        ...state,
        eventData: '',
      };
    default:
      return state;
  }
}

