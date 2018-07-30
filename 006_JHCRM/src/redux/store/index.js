import configureStore from './configureStore';
import {
  getAuthorization,
  getRoles,
  setAuthorizationHeader
} from '../../service/ajax';

const initialState = {
  loginStatus: {}
};

const authorization = getAuthorization();
const roles = getRoles();
if (authorization) {
  initialState.loginStatus.isLogined = true;
  setAuthorizationHeader(authorization);
}
if (roles) {
  initialState.loginStatus.roles = roles;
}

// initialState.loginStatus.isLogined = true;  //  todo:登录接口不通 暂时先写死

const store = configureStore(
  initialState
);

export default store;
