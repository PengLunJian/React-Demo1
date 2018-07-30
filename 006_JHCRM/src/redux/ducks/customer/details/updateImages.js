import { JHCRM } from '../../../../service/ajax';
import {
  CALL_API
} from '../../../middlewares/api';
import { actionTypes as visitRecordDetail_actionTypes } from './visitRecordAdd';

//  actionTypes
export const actionTypes = {
  VISIT_RECORD_ADD_IMAGE: 'VISIT_RECORD_ADD_IMAGE',
  VISIT_RECORD_DELETE_IMAGE: 'VISIT_RECORD_DELETE_IMAGE',
  VISIT_RECORD_CONFIRM_IMAGES: 'VISIT_RECORD_CONFIRM_IMAGES',
  VISIT_RECORD_SYNC_IMAGES: 'VISIT_RECORD_SYNC_IMAGES',
  VISIT_RECORD_CLEAR_IMAGES: 'VISIT_RECORD_CLEAR_IMAGES',
  
  VISIT_RECORD_UPLOAD_IMAGES_REQUEST: 'VISIT_RECORD_UPLOAD_IMAGES_REQUEST',
  VISIT_RECORD_UPLOAD_IMAGES_SUCCESS: 'VISIT_RECORD_UPLOAD_IMAGES_SUCCESS',
  VISIT_RECORD_UPLOAD_IMAGES_FAILURE: 'VISIT_RECORD_UPLOAD_IMAGES_FAILURE'
};

const _addImage = (data) => ({
  type: actionTypes.VISIT_RECORD_ADD_IMAGE,
  data
});

export const addImage = (data) => (dispatch, getState) => {
  return dispatch(_addImage(data));
};

const _deleteImage = (id) => ({
  type: actionTypes.VISIT_RECORD_DELETE_IMAGE,
  id
});

export const deleteImage = (id) => (dispatch, getState) => {
  return dispatch(_deleteImage(id));
};

const _confirmImages = () => ({
  type: actionTypes.VISIT_RECORD_CONFIRM_IMAGES
});

export const confirmImages = () => (dispatch, getState) => {
  return dispatch(_confirmImages());
};

const _syncTempImages = () => ({
  type: actionTypes.VISIT_RECORD_SYNC_IMAGES
});

export const syncTempImages = () => (dispatch, getState) => {
  return dispatch(_syncTempImages());
};

const _uploadImages = (ids) => ({
  [CALL_API]: {
    types: [
      actionTypes.VISIT_RECORD_UPLOAD_IMAGES_REQUEST,
      actionTypes.VISIT_RECORD_UPLOAD_IMAGES_SUCCESS,
      actionTypes.VISIT_RECORD_UPLOAD_IMAGES_FAILURE
    ],
    endpoint: JHCRM.getURL('visitRecord_visitRecordUploadPhones', { ids })
  }
});

export const uploadImages = (ids) => (dispatch, getState) => {
  return dispatch(_uploadImages(ids));
};

const _clearImages = () => ({
  type: actionTypes.VISIT_RECORD_CLEAR_IMAGES
});

export const clearImages = () => (dispatch, getState) => {
  return dispatch(_clearImages());
};

export default function images(state = {
  images: [],         //  拜访记录详情页-拜访照片数据（初始获取时和拜访照片详情页保存后时的数据）
  tempImages: []      //  拜访记录详情页-拜访照片详情页未保存时操作的数据
}, action) {
  switch (action.type) {
    case visitRecordDetail_actionTypes.VISIT_RECORD_DETAILS_SUCCESS: {
      const data = action.response.data.data || {};
      const imageInfo = data.imageInfo || [];
      return {
        ...state,
        images: imageInfo,
        tempImages: imageInfo
      };
    }
    
    case actionTypes.VISIT_RECORD_CLEAR_IMAGES:
      return {
        ...state,
        images: [],
        tempImages: []
      };
    case actionTypes.VISIT_RECORD_ADD_IMAGE:
      return {
        ...state,
        tempImages: [...state.tempImages, action.data]
      };
    case actionTypes.VISIT_RECORD_DELETE_IMAGE:
      const deletedId = action.id;
      const newImages = state.tempImages.filter(item =>
      (item.id || item.localId) !== deletedId);
      return {
        ...state,
        tempImages: newImages
      };
    case actionTypes.VISIT_RECORD_CONFIRM_IMAGES:
      return {
        ...state,
        images: state.tempImages
      };
    case actionTypes.VISIT_RECORD_SYNC_IMAGES:
      return {
        ...state,
        tempImages: state.images
      };
    
    case actionTypes.VISIT_RECORD_UPLOAD_IMAGES_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case actionTypes.VISIT_RECORD_UPLOAD_IMAGES_SUCCESS:
      return {
        ...state,
        isLoading: false
      };
    case actionTypes.VISIT_RECORD_UPLOAD_IMAGES_FAILURE:
      return {
        ...state,
        isLoading: false
      };
    default:
      return state;
  }
}
