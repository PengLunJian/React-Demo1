import { JHCRM } from '../../../service/ajax';
import {
  CALL_API
} from '../../middlewares/api';

//  actionTypes
export const actionTypes = {
  CARD_LOAD_REQUEST: 'CARD_LOAD_REQUEST',
  CARD_LOAD_SUCCESS: 'CARD_LOAD_SUCCESS',
  CARD_LOAD_FAILURE: 'CARD_LOAD_FAILURE',
  CARD_DATA_CLEAR: 'CARD_DATA_CLEAR',
  CARD_DELETE_REQUEST: 'CARD_DELETE_REQUEST',
  CARD_DELETE_SUCCESS: 'CARD_DELETE_SUCCESS',
  CARD_DELETE_FAILURE: 'CARD_DELETE_FAILURE',
  CARD_EDIT: 'CARD_EDIT',
};

//  actions
//  名片列表-加载数据
const _getCard = (data) => ({
  [CALL_API]: {
    types: [actionTypes.CARD_LOAD_REQUEST, actionTypes.CARD_LOAD_SUCCESS, actionTypes.CARD_LOAD_FAILURE],
    endpoint: JHCRM.getURL('card_searchCard', data),
  }
});

//  清空名片列表
const _clearCard = () => ({
  type: actionTypes.CARD_DATA_CLEAR,
  data: []
});

//  删除名片
const _deleteCard = (data) => ({
  [CALL_API]: {
    types: [actionTypes.CARD_DELETE_REQUEST, actionTypes.CARD_DELETE_SUCCESS, actionTypes.CARD_DELETE_FAILURE],
    endpoint: JHCRM.getURL('card_deleteCard', data),
    options: {
      method: 'delete',
      // params: data
    },
    otherParameters: data
  }
});

//  新增名片
const _cardEdit = (data, id) => ({
  type: actionTypes.CARD_EDIT,
  data,
  id
});

export const getCard = (data) => (dispatch, getState) => {
  return dispatch(_getCard(data));
};

export const clearCard = (data) => (dispatch, getState) => {
  return dispatch(_clearCard(data));
};

export const deleteCard = (data) => (dispatch, getState) => {
  return dispatch(_deleteCard(data));
};

export const cardEdit = (data, id) => (dispatch) => {
  return dispatch(_cardEdit(data, id));
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
    case actionTypes.CARD_LOAD_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.CARD_LOAD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        totalCount: action.response.data.data.totalCount || 0,
        data: action.response.data.data.list || [],
      };
    case actionTypes.CARD_LOAD_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    case actionTypes.CARD_DATA_CLEAR:
      return {
        ...state,
        data: [],
        isLoading: false,
      };
    case actionTypes.CARD_DELETE_REQUEST:
      return {
        ...state,
        deleteIsLoading: true,
        deleteIsSuccess: false,
        deleteIsFailed: false,
      };
    case actionTypes.CARD_DELETE_SUCCESS:
      const deleteId = action.otherParameters.CARDId;
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
    case actionTypes.CARD_DELETE_FAILURE:
      return {
        ...state,
        deleteIsLoading: false,
        deleteIsSuccess: false,
        deleteIsFailed: true,
      };
    case actionTypes.CARD_EDIT:
      let data;
      if (action.id) {  //  修改
        data = state.data.map((item) => {
          if (item.id === action.id) {
            item = action.data;
          }
          return item;
        });
      } else {
        data = [action.data];
      }
      return {
        ...state,
        data
      };
      
    default:
      return state;
  }
}

