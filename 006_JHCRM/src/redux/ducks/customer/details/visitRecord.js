import { JHCRM } from '../../../../service/ajax';
import {
  CALL_API
} from '../../../middlewares/api';

//  actionTypes
export const actionTypes = {
  VISIT_RECORD_LIST_CLEAR: 'VISIT_RECORD_LIST_CLEAR',
  VISIT_RECORD_ADD_REQUEST: 'VISIT_RECORD_ADD_REQUEST',
  VISIT_RECORD_ADD_SUCCESS: 'VISIT_RECORD_ADD_SUCCESS',
  VISIT_RECORD_ADD_FAILURE: 'VISIT_RECORD_ADD_FAILURE',
  VISIT_RECORD_LIST_REQUEST: 'VISIT_RECORD_LIST_REQUEST',
  VISIT_RECORD_LIST_SUCCESS: 'VISIT_RECORD_LIST_SUCCESS',
  VISIT_RECORD_LIST_FAILURE: 'VISIT_RECORD_LIST_FAILURE',
  VISIT_RECORD_DELETE_REQUEST: 'VISIT_RECORD_DELETE_REQUEST',
  VISIT_RECORD_DELETE_SUCCESS: 'VISIT_RECORD_DELETE_SUCCESS',
  VISIT_RECORD_DELETE_FAILURE: 'VISIT_RECORD_DELETE_FAILURE',
  VISIT_RECORD_EDIT: 'VISIT_RECORD_EDIT',
};
//  清空客户列表
const _clearVisitRecord = () => ({
  type: actionTypes.VISIT_RECORD_LIST_CLEAR,
  data: []
});
//  新增拜访记录
const _saveVisitRecord = (data) => ({
  [CALL_API]: {
    types: [
      actionTypes.VISIT_RECORD_ADD_REQUEST,
      actionTypes.VISIT_RECORD_ADD_SUCCESS,
      actionTypes.VISIT_RECORD_ADD_FAILURE
    ],
    endpoint: JHCRM.getURL('visitRecord_saveVisitRecord'),
    options: {
      method: 'post',
      data
    }
  }
});
//  查询拜访记录
const _visitRecordSearch = (data, isPC) => ({
  [CALL_API]: {
    types: [
      actionTypes.VISIT_RECORD_LIST_REQUEST,
      actionTypes.VISIT_RECORD_LIST_SUCCESS,
      actionTypes.VISIT_RECORD_LIST_FAILURE
    ],
    endpoint: JHCRM.getURL(isPC? 'visitRecord_visitRecordSearch_PC' : 'visitRecord_visitRecordSearch', data),
    otherParameters: { isPC }
  }
});
//  删除拜访记录
const _deleteVisitRecord = (data) => ({
  [CALL_API]: {
    types: [
      actionTypes.VISIT_RECORD_DELETE_REQUEST,
      actionTypes.VISIT_RECORD_DELETE_SUCCESS,
      actionTypes.VISIT_RECORD_DELETE_FAILURE
    ],
    endpoint: JHCRM.getURL('visitRecord_deleteVisitRecord', data),
    options: {
      method: 'delete'
    },
    otherParameters: data
  }
});
//  新增/修改拜访记录
const _editVisitRecord = (data, id) => ({
  type: actionTypes.VISIT_RECORD_EDIT,
  data,
  id
});

export const clearVisitRecord = (data) => (dispatch) => {
  return dispatch(_clearVisitRecord(data));
};

export const saveVisitRecord = (data, id) => (dispatch) => {
  return dispatch(_saveVisitRecord(data))
    //编辑拜访记录之后没返回数据，暂时先刷新列表
    // .then((res) => {
    //   dispatch(editVisitRecord(res.response.data.data, id));
    //   return res
    // })
};

export const visitRecordSearch = (data, isPC) => (dispatch) => {
  return dispatch(_visitRecordSearch(data, isPC));
};

export const deleteVisitRecord = (data) => (dispatch) => {
  return dispatch(_deleteVisitRecord(data));
};
export const editVisitRecord = (data, id) => (dispatch) => {
  return dispatch(_editVisitRecord(data, id));
};
//  reducers
export default function visitRecord(state = {
  isLoading: false,
  data: [],
  addedId: '',
  totalCount: 0,
  addIsLoading: false,
  addIsSuccess: false,
  addIsFailed: false,
  eventData: ''
}, action) {
  switch (action.type) {
    case actionTypes.VISIT_RECORD_LIST_CLEAR:
      return {
        ...state,
        data: [],
        isLoading: false
      };
    case actionTypes.VISIT_RECORD_ADD_REQUEST:
      return {
        ...state,
        addIsLoading: true,
        addIsSuccess: false,
        addIsFailed: false
      };
    case actionTypes.VISIT_RECORD_ADD_SUCCESS:
      return {
        ...state,
        addIsLoading: false,
        addIsSuccess: true,
        addIsFailed: false,
        addedId: action.response.data.data ?
          action.response.data.data.visitRecordId : ''
      };
    case actionTypes.VISIT_RECORD_ADD_FAILURE:
      return {
        ...state,
        addIsLoading: false,
        addIsSuccess: false,
        addIsFailed: true
      };
    case actionTypes.VISIT_RECORD_ADD_RESET:
      return {
        ...state,
        addIsLoading: false,
        addIsSuccess: false,
        addIsFailed: false
      };
    case actionTypes.VISIT_RECORD_ADD_EVENT:
      return {
        ...state,
        eventData: action.data
      };
    case actionTypes.VISIT_RECORD_ADD_CLEAR:
      return {
        ...state,
        eventData: ''
      };
    case actionTypes.VISIT_RECORD_LIST_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case actionTypes.VISIT_RECORD_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        totalCount: action.response.data.data.totalCount || 0,
        data: action.otherParameters.isPC ? action.response.data.data.list || [] : [...state.data, ...action.response.data.data.list || []]
      };
    case actionTypes.VISIT_RECORD_LIST_FAILURE:
      return {
        ...state,
        isLoading: false
      };
    case actionTypes.VISIT_RECORD_DELETE_REQUEST:
      return {
        ...state,
        deleteIsLoading: true,
        deleteIsSuccess: false,
        deleteIsFailed: false
      };
    case actionTypes.VISIT_RECORD_DELETE_SUCCESS:
      const deleteId = action.otherParameters.visitRecordId;
      const data = state.data.filter(item => (
        item.id !== deleteId
      ));
      return {
        ...state,
        data,
        deleteIsLoading: false,
        deleteIsSuccess: true,
        deleteIsFailed: false
      };
    case actionTypes.VISIT_RECORD_DELETE_FAILURE:
      return {
        ...state,
        deleteIsLoading: false,
        deleteIsSuccess: false,
        deleteIsFailed: true
      };
    case actionTypes.VISIT_RECORD_EDIT:
      let editData;
      if (action.id) {  //  修改
        editData = state.data.map((item) => {
          if (item.id === action.id) {
            item = action.data;
          }
          return item;
        });
      } else {
        editData = [...state.data];
      }
      return {
        ...state,
        data: editData
      };
    default:
      return state;
  }
}
