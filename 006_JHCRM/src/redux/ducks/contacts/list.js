import { JHCRM } from '../../../service/ajax';
import {
  CALL_API
} from '../../middlewares/api';

//  actionTypes
export const actionTypes = {
  CONTACTS_LOAD_REQUEST: 'CONTACTS_LOAD_REQUEST',
  CONTACTS_LOAD_SUCCESS: 'CONTACTS_LOAD_SUCCESS',
  CONTACTS_LOAD_FAILURE: 'CONTACTS_LOAD_FAILURE',
  CONTACTS_DATA_CLEAR: 'CONTACTS_DATA_CLEAR',
  CONTACTS_DELETE_REQUEST: 'CONTACTS_DELETE_REQUEST',
  CONTACTS_DELETE_SUCCESS: 'CONTACTS_DELETE_SUCCESS',
  CONTACTS_DELETE_FAILURE: 'CONTACTS_DELETE_FAILURE',
  CONTACTS_EDIT: 'CONTACTS_EDIT'
};

//  actions
//  联系人列表-加载数据
const _getContacts = (data, isPC) => ({
  [CALL_API]: {
    types: [actionTypes.CONTACTS_LOAD_REQUEST, actionTypes.CONTACTS_LOAD_SUCCESS, actionTypes.CONTACTS_LOAD_FAILURE],
    endpoint: JHCRM.getURL(isPC ? 'contacts_searchForPC' : 'contacts_search', data),
    otherParameters: { isPC }
  }
});

//  清空联系人列表
const _clearContacts = () => ({
  type: actionTypes.CONTACTS_DATA_CLEAR,
  data: []
});

//  删除联系人
const _deleteContacts = (data) => ({
  [CALL_API]: {
    types: [actionTypes.CONTACTS_DELETE_REQUEST, actionTypes.CONTACTS_DELETE_SUCCESS, actionTypes.CONTACTS_DELETE_FAILURE],
    endpoint: JHCRM.getURL('contacts_deleteContacts', data),
    options: {
      method: 'delete',
    },
    otherParameters: data
  }
});

//  新增联系人
const _editContacts = (data, id) => ({
  type: actionTypes.CONTACTS_EDIT,
  data,
  id
});


//  isPC判断是否是PC端，PC为true
export const getContacts = (data, isPC) => (dispatch, getState) => {
  return dispatch(_getContacts(data, isPC));
};

export const clearContacts = (data) => (dispatch, getState) => {
  return dispatch(_clearContacts(data));
};

export const deleteContacts = (data) => (dispatch, getState) => {
  return dispatch(_deleteContacts(data));
};

export const editContacts = (data, id) => (dispatch) => {
  return dispatch(_editContacts(data, id));
};


//  reducers
export default function list(state = {
  isLoading: false,
  totalCount: 0,
  data: [],
  
  deleteIsLoading: false,
  deleteIsSuccess: false,
  deleteIsFailed: false,
}, action) {
  switch (action.type) {
    case actionTypes.CONTACTS_LOAD_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.CONTACTS_LOAD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        totalCount: action.response.data.data.totalCount || 0,
        // data: [...state.data, ...action.response.data.data.list || []],
        data: action.otherParameters.isPC ? action.response.data.data.list || [] : [...state.data, ...action.response.data.data.list || []],
      };
    case actionTypes.CONTACTS_LOAD_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    case actionTypes.CONTACTS_DATA_CLEAR:
      return {
        ...state,
        data: [],
        isLoading: false,
      };
    case actionTypes.CONTACTS_DELETE_REQUEST:
      return {
        ...state,
        deleteIsLoading: true,
        deleteIsSuccess: false,
        deleteIsFailed: false,
      };
    case actionTypes.CONTACTS_DELETE_SUCCESS:
      const deleteId = action.otherParameters.contactsId;
      const deletedDatas = state.data.filter((item) => (
        item.id !== deleteId
      ));
      return {
        ...state,
        data: deletedDatas,
        deleteIsLoading: false,
        deleteIsSuccess: true,
        deleteIsFailed: false,
      };
    case actionTypes.CONTACTS_DELETE_FAILURE:
      return {
        ...state,
        deleteIsLoading: false,
        deleteIsSuccess: false,
        deleteIsFailed: true,
      };
    case actionTypes.CONTACTS_EDIT:
      let data;
      if (action.id) {  //  修改
        data = state.data.map((item) => {
          if (item.id === action.id) {
            item = action.data;
          }
          return item;
        });
      } else {
        data = [...state.data];
      }
      // if (action.data) {
      //   data.push(action.data);
      // }
      return {
        ...state,
        data
      };
    
    default:
      return state;
  }
}

