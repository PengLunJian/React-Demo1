import { JHCRM } from '../../../service/ajax';
import {
  CALL_API
} from '../../middlewares/api';

//  actionTypes
export const actionTypes = {
  CUSTOMER_LOAD_REQUEST: 'CUSTOMER_LOAD_REQUEST',
  CUSTOMER_LOAD_SUCCESS: 'CUSTOMER_LOAD_SUCCESS',
  CUSTOMER_LOAD_FAILURE: 'CUSTOMER_LOAD_FAILURE',
  CUSTOMER_DATA_CLEAR: 'CUSTOMER_DATA_CLEAR',
  CUSTOMER_DELETE_REQUEST: 'CUSTOMER_DELETE_REQUEST',
  CUSTOMER_DELETE_SUCCESS: 'CUSTOMER_DELETE_SUCCESS',
  CUSTOMER_DELETE_FAILURE: 'CUSTOMER_DELETE_FAILURE',
  CUSTOMER_EDIT: 'CUSTOMER_EDIT',
  ALLCUSTOMER_LOAD_REQUEST: 'ALLCUSTOMER_LOAD_REQUEST',
  ALLCUSTOMER_LOAD_SUCCESS: 'ALLCUSTOMER_LOAD_SUCCESS',
  ALLCUSTOMER_LOAD_FAILURE: 'ALLCUSTOMER_LOAD_FAILURE',
};

//  actions
//  客户列表-加载数据
const _getCustomer = (data, isPC) => ({
  [CALL_API]: {
    types: [actionTypes.CUSTOMER_LOAD_REQUEST, actionTypes.CUSTOMER_LOAD_SUCCESS, actionTypes.CUSTOMER_LOAD_FAILURE],
    endpoint: JHCRM.getURL(isPC ? 'customer_searchForPC' : 'customer_search', data),
    otherParameters: { isPC }
  }
});
//  客户列表-加载所有客户数据
const _getAllCustomer = (data) => ({
  [CALL_API]: {
    types: [actionTypes.ALLCUSTOMER_LOAD_REQUEST, actionTypes.ALLCUSTOMER_LOAD_SUCCESS, actionTypes.ALLCUSTOMER_LOAD_FAILURE],
    endpoint: JHCRM.getURL('customer_allCustomer', data),
  }
});

//  清空客户列表
const _clearCustomer = () => ({
  type: actionTypes.CUSTOMER_DATA_CLEAR,
  data: []
});

//  删除客户
const _deleteCustomer = (data) => ({
  [CALL_API]: {
    types: [actionTypes.CUSTOMER_DELETE_REQUEST, actionTypes.CUSTOMER_DELETE_SUCCESS, actionTypes.CUSTOMER_DELETE_FAILURE],
    endpoint: JHCRM.getURL('customer_deleteCustomer', data),
    options: {
      method: 'delete',
      // params: data
    },
    otherParameters: data
  }
});

//  新增客户
const _editCustomer = (data, id, customerNum, isPC) => ({
  type: actionTypes.CUSTOMER_EDIT,
  data,
  id,
  isPC,
  customerNum
});

//  isPC判断是否是PC端，PC为true
export const getCustomer = (data, isPC) => (dispatch, getState) => {
  return dispatch(_getCustomer(data, isPC));
};

export const getAllCustomer = (data) => (dispatch, getState) => {
  return dispatch(_getAllCustomer(data));
};

export const clearCustomer = (data) => (dispatch, getState) => {
  return dispatch(_clearCustomer(data));
};

export const deleteCustomer = (data) => (dispatch, getState) => {
  return dispatch(_deleteCustomer(data));
};

export const editCustomer = (data, id, customerNum, isPC) => (dispatch) => {
  return dispatch(_editCustomer(data, id, customerNum, isPC));
};


//  reducers
export default function list(state = {
  isLoading: false,
  totalCount: 0,
  data: [],
  allCustomer: [],
  deleteIsLoading: false,
  deleteIsSuccess: false,
  deleteIsFailed: false,
}, action) {
  switch (action.type) {
    case actionTypes.CUSTOMER_LOAD_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.CUSTOMER_LOAD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        totalCount: action.response.data.data.totalCount || 0,
        data: action.otherParameters.isPC ? action.response.data.data.list || [] : [...state.data, ...action.response.data.data.list || []],
      };
    case actionTypes.CUSTOMER_LOAD_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    case actionTypes.CUSTOMER_DATA_CLEAR:
      return {
        ...state,
        data: [],
        isLoading: false,
      };
    case actionTypes.CUSTOMER_DELETE_REQUEST:
      return {
        ...state,
        deleteIsLoading: true,
        deleteIsSuccess: false,
        deleteIsFailed: false,
      };
    case actionTypes.CUSTOMER_DELETE_SUCCESS:
      const deleteId = action.otherParameters.customerId;
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
    case actionTypes.CUSTOMER_DELETE_FAILURE:
      return {
        ...state,
        deleteIsLoading: false,
        deleteIsSuccess: false,
        deleteIsFailed: true,
      };
    case actionTypes.CUSTOMER_EDIT:
      let data;
      if (action.id) {  //  修改
        data = state.data.map((item) => {
          if (item.id === action.id) {
            if (action.isPC) {
              item.customerNum = action.customerNum;
            } else {
              item = action.data;
            }
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
    case actionTypes.ALLCUSTOMER_LOAD_REQUEST:
      return {
        ...state,
        allCustomer: []
      };
    case actionTypes.ALLCUSTOMER_LOAD_SUCCESS:
      return {
        ...state,
        allCustomer: action.response.data.data
      };
    case actionTypes.ALLCUSTOMER_LOAD_FAILURE:
      return {
        ...state,
        allCustomer: []
      };
      
    default:
      return state;
  }
}

