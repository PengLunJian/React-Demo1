import { JHCRM } from '../../../../service/ajax';
import {
  CALL_API
} from '../../../middlewares/api';
import { editCustomer } from '../list';

//  actionTypes
export const actionTypes = {
  CUSTOMER_DETAIL_REQUEST: 'CUSTOMER_DETAIL_REQUEST',
  CUSTOMER_DETAIL_SUCCESS: 'CUSTOMER_DETAIL_SUCCESS',
  CUSTOMER_DETAIL_FAILURE: 'CUSTOMER_DETAIL_FAILURE',
  CUSTOMER_ADD_REQUEST: 'CUSTOMER_ADD_REQUEST',
  CUSTOMER_ADD_SUCCESS: 'CUSTOMER_ADD_SUCCESS',
  CUSTOMER_ADD_FAILURE: 'CUSTOMER_ADD_FAILURE',
  CUSTOMER_ADD_RESET: 'CUSTOMER_ADD_RESET',
  CUSTOMER_ADDEVENT: 'CUSTOMER_ADDEVENT',
  CUSTOMER_ADDEVENT_CLEAR: 'CUSTOMER_ADDEVENT_CLEAR',
  CUSTOMER_BINDUSER_REQUEST: 'CUSTOMER_BINDUSER_REQUEST',
  CUSTOMER_BINDUSER_SUCCESS: 'CUSTOMER_BINDUSER_SUCCESS',
  CUSTOMER_BINDUSER_FAILURE: 'CUSTOMER_BINDUSER_FAILURE',

};

//  actions
//  查询客户信息
const _customerDetail = (data) => ({
  [CALL_API]: {
    types: [actionTypes.CUSTOMER_DETAIL_REQUEST, actionTypes.CUSTOMER_DETAIL_SUCCESS, actionTypes.CUSTOMER_DETAIL_FAILURE],
    endpoint: JHCRM.getURL('customer_searchDetails', data)
  }
});

//  保存新增或修改客户
const _saveCustomerAdd = (data) => ({
  [CALL_API]: {
    types: [actionTypes.CUSTOMER_ADD_REQUEST, actionTypes.CUSTOMER_ADD_SUCCESS, actionTypes.CUSTOMER_ADD_FAILURE],
    endpoint: JHCRM.getURL('customer_saveCustomer'),
    options: {
      method: 'post',
      data
    }
  }
});

const _saveCustomerAddForPC = (data, id) => ({
  [CALL_API]: {
    types: [actionTypes.CUSTOMER_ADD_REQUEST, actionTypes.CUSTOMER_ADD_SUCCESS, actionTypes.CUSTOMER_ADD_FAILURE],
    endpoint: JHCRM.getURL('customer_editNum', { id }),
    options: {
      method: 'patch',
      data
    }
  }
});

const _bindUserForPC = (data, custNo, userIds) => ({
  [CALL_API]: {
    types: [actionTypes.CUSTOMER_BINDUSER_REQUEST, actionTypes.CUSTOMER_BINDUSER_SUCCESS, actionTypes.CUSTOMER_BINDUSER_FAILURE],
    endpoint: JHCRM.getURL('customer_bindUser', { custNo, userIds }),
    options: {
      method: 'patch',
      data
    }
  }
});

//  关键事件保存
const _customerAddEvent = (data) => ({
  type: actionTypes.CUSTOMER_ADDEVENT,
  data
});

//  重置保存或提交之后的状态
const _resetCustomerAdd = (data) => ({
  type: actionTypes.CUSTOMER_ADD_RESET,
  data
});

export const customerDetail = (data) => (dispatch) => {
  return dispatch(_customerDetail(data));
};

export const addCustomer = (data, id) => (dispatch, getState) => {
  return dispatch(_saveCustomerAdd(data))
    .then((res) => {
      dispatch(editCustomer(res.response.data.data, id));
      return res;
    });
  // .then(() => {
  //   dispatch(_resetCustomerAdd());
  // });
};


export const addCustomerForPC = (data, id, customerNum, isPC = true) => (dispatch, getState) => {
  return dispatch(_saveCustomerAddForPC(data, id, isPC))
    .then((res) => {
      if (res.response.data.status.toString() === '0') {  //  如果成功再更改数据
        dispatch(editCustomer(res.response.data.data, id, customerNum, isPC));
      }
      return res;
    });
};

export const bindUserForPC = (data, custNo, userIds, customerNum, isPC = true) => (dispatch, getState) => {
  return dispatch(_bindUserForPC(data, custNo, userIds, isPC))
    .then((res) => {
      if (res.response.data.status.toString() === '0') {  //  如果成功再更改数据
        dispatch(editCustomer(res.response.data.data, custNo, customerNum, isPC));
      }
      return res;
    });
};

export const customerAddEvent = (data) => (dispatch, getState) => {
  return dispatch(_customerAddEvent(data));
};

//  reducers
export default function customerAdd(state = {
  isLoading: false,
  data: '',
  addIsLoading: false,
  addIsSuccess: false,
  addIsFailed: false,
  addedId: '',
  addedErrorMsg: '', //  保存时存储后端返回的错误信息
  eventData: ''
}, action) {
  switch (action.type) {
    case actionTypes.CUSTOMER_DETAIL_REQUEST:
      return {
        ...state,
        isLoading: true,
        data: ''
      };
    case actionTypes.CUSTOMER_DETAIL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.response.data.data
      };
    case actionTypes.CUSTOMER_DETAIL_FAILURE:
      return {
        ...state,
        isLoading: false,
        data: ''
      };
    case actionTypes.CUSTOMER_ADD_REQUEST:
      return {
        ...state,
        addIsLoading: true,
        addIsSuccess: false,
        addIsFailed: false
      }; 
    case actionTypes.CUSTOMER_ADD_SUCCESS:
      return {
        ...state,
        addIsLoading: false,
        addIsSuccess: true,
        addIsFailed: false,
        addedId: action.response.data.data ? action.response.data.data.id : '',
        data: action.response.data.data,
        addedErrorMsg: action.response.data.status.toString() === '0' ? '' : action.response.data.error,
      };
    case actionTypes.CUSTOMER_ADD_FAILURE:
      return {
        ...state,
        addIsLoading: false,
        addIsSuccess: false,
        addIsFailed: true,
      };
    case actionTypes.CUSTOMER_ADD_RESET:
      return {
        ...state,
        addIsLoading: false,
        addIsSuccess: false,
        addIsFailed: false
      };
    case actionTypes.CUSTOMER_ADDEVENT:
      return {
        ...state,
        eventData: action.data
      };
    case actionTypes.CUSTOMER_ADDEVENT_CLEAR:
      return {
        ...state,
        eventData: ''
      };
    case actionTypes.CUSTOMER_BINDUSER_REQUEST:
      return {
        ...state,
        addIsLoading: true,
        addIsSuccess: false,
        addIsFailed: false
      }; 
    case actionTypes.CUSTOMER_BINDUSER_SUCCESS:
      return {
        ...state,
        addIsLoading: false,
        addIsSuccess: true,
        addIsFailed: false,
        addedId: action.response.data.data ? action.response.data.data.id : '',
        data: action.response.data.data,
        addedErrorMsg: action.response.data.status.toString() === '0' ? '' : action.response.data.error,
      };
    case actionTypes.CUSTOMER_BINDUSER_FAILURE:
      return {
        ...state,
        addIsLoading: false,
        addIsSuccess: false,
        addIsFailed: true,
      };
    default:
      return state;
  }
}

