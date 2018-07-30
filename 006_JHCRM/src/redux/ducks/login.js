import {
  CALL_API
} from '../middlewares/api';

//  actionTypes
export const actionTypes = {
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGOUT_REQUEST: 'LOGOUT_REQUEST',
  LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
  LOGOUT_FAILURE: 'LOGOUT_FAILURE'
};

//  actions

//  登录
export const login = ({ roles }) => ({
  type: actionTypes.LOGIN_SUCCESS,
  roles
});

//  注销
const _logout = () => ({
  [CALL_API]: {
    types: [actionTypes.LOGOUT_REQUEST, actionTypes.LOGOUT_SUCCESS, actionTypes.LOGOUT_FAILURE],
    endpoint: 'logout'
  }
});
export const logout = () => (dispatch) => {
  return dispatch(_logout());
};

//  reducers
export default function loginStatus(state = {
  isLogined: false,
  roles: ''
}, action) {
  //  捕获所有接口返回401的情况，需要跳转回登录页面重新登录
  if (action.status === 401) {
    return {
      isLoading: false,
      isLogined: false,
      isFailed: true,
      status: action.status
    };
  }
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isLogined: true,
        roles: action.roles
      };
    case actionTypes.LOGOUT_SUCCESS:
      return {
        ...state,
        isLogined: false
      };
      
    default:
      return state;
  }
}

//  selectors
