import { JHCRM } from '../../../../service/ajax';
import {
  CALL_API
} from '../../../middlewares/api';
import { cardEdit } from '../list';

//  actionTypes
export const actionTypes = {
  CARD_EDIT_REQUEST: 'CARD_EDIT_REQUEST',
  CARD_EDIT_SUCCESS: 'CARD_EDIT_SUCCESS',
  CARD_EDIT_FAILURE: 'CARD_EDIT_FAILURE',
  CARD_EDIT_RESET: 'CARD_EDIT_RESET',
};

//  actions
//  保存新增或修改名片
const _saveCardEdit = (data) => ({
  [CALL_API]: {
    types: [actionTypes.CARD_EDIT_REQUEST, actionTypes.CARD_EDIT_SUCCESS, actionTypes.CARD_EDIT_FAILURE],
    endpoint: JHCRM.getURL('card_saveCard'),
    options: {
      method: 'post',
      data
    }
  }
});

//  重置保存或提交之后的状态
const _resetCardEdit = (data) => ({
  type: actionTypes.CARD_EDIT_RESET,
  data
});

export const saveCardEdit= (data, id) => (dispatch, getState) => {
  return dispatch(_saveCardEdit(data))
    .then((res) => {
      dispatch(cardEdit(res.response.data.data, id));
      return res;
    })
//  .then(() => {
//  	dispatch(_resetCardEdit())
//  })
};

//  reducers
export default function basicInfo(state = {
  isLoading: false,
  data: '',
  addIsLoading: false,
  addIsSuccess: false,
  addIsFailed: false,
  addedId: '',
}, action) {
  switch (action.type) {
    case actionTypes.CARD_EDIT_REQUEST:
      return {
        ...state,
        addIsLoading: true,
        addIsSuccess: false,
        addIsFailed: false
      };
    case actionTypes.CARD_EDIT_SUCCESS:
      return {
        ...state,
        addIsLoading: false,
        addIsSuccess: true,
        addIsFailed: false,
        addedId: action.response.data.data.id,
        data: action.response.data.data
      };
    case actionTypes.CARD_EDIT_FAILURE:
      return {
        ...state,
        addIsLoading: false,
        addIsSuccess: false,
        addIsFailed: true
      };
    case actionTypes.CARD_EDIT_RESET:
      return {
        ...state,
        addIsLoading: false,
        addIsSuccess: false,
        addIsFailed: false
      };
    default:
      return state;
  }
}

