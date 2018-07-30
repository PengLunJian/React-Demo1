import { JHCRM } from '../../../service/ajax';
import {
  CALL_API
} from '../../middlewares/api';

import editProduct from './list';

//  actionTypes
export const actionTypes = {
  PRODUCTTYPE_EDIT_REQUEST: 'PRODUCTTYPE_EDIT_REQUEST',
  PRODUCTTYPE_EDIT_SUCCESS: 'PRODUCTTYPE_EDIT_SUCCESS',
  PRODUCTTYPE_EDIT_FAILURE: 'PRODUCTTYPE_EDIT_FAILURE',
};

//  actions
//  保存新增或修改产品
const _editProductType = (data, id) => ({
  [CALL_API]: {
    types: [actionTypes.PRODUCTTYPE_EDIT_REQUEST, actionTypes.PRODUCTTYPE_EDIT_SUCCESS, actionTypes.PRODUCTTYPE_EDIT_FAILURE],
    endpoint: JHCRM.getURL('product_editType_pc', data, {id}),
    options: {
      method: 'patch',
      data
    }
  }
});

export const editProductType= (data, id) => (dispatch, getState) => {
  return dispatch(_editProductType(data, id))
    .then((res) => {
      // console.log(data)
      // const productId = data.productId;
      // const classId = data.classId;
      // dispatch(editProduct(productId, classId));
      // return res;
    })
};

//  reducers
export default function productEdit(state = {
  data: '',
  editIsLoading: false,
  editIsSuccess: false,
  eidtIsFailed: false,
}, action) {
  switch (action.type) {
    case actionTypes.PRODUCTTYPE_EDIT_REQUEST:
      return {
        ...state,
        editIsLoading: true,
        editIsSuccess: false,
        eidtIsFailed: false
      };
    case actionTypes.PRODUCTTYPE_EDIT_SUCCESS:
      return {
        ...state,
        editIsLoading: false,
        editIsSuccess: true,
        eidtIsFailed: false,
        data: action.response.data.data
      };
    case actionTypes.PRODUCTTYPE_EDIT_FAILURE:
      return {
        ...state,
        editIsLoading: false,
        editIsSuccess: false,
        eidtIsFailed: true
      };
    default:
      return state;
  }
}

