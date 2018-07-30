import {
  axios,
  ajax,
  JHCRM,
  setAuthorizationHeader,
  setAuthorization,
  setRoles,
  removeAuthorizationHeader,
  removeAuthorization,
  removeRoles
} from '../../service/ajax';

const callApi = (endpoint, options) => {
  const defaultOption = {
    method: 'get',
    url: endpoint
  };
  //  请求单个接口的情况
  const finalOptions = {
    ...defaultOption,
    ...options
  };
  return ajax(finalOptions)
    .then(response => {
      return response;
    });
};

// Action key that carries API call info interpreted by this Redux middleware.
export const CALL_API = 'Call API';

// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
export default store => next => action => {
  const callAPI = action[CALL_API];
  if (typeof callAPI === 'undefined') {
    return next(action);
  }
  
  let { endpoint } = callAPI;
  const { types, options, otherParameters } = callAPI;
  
  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState());
  }
  
  if (!(typeof endpoint === 'string' || Array.isArray(endpoint))) {
    throw new Error('Specify a string endpoint URL or an array of any string endpoint URL.');
  }
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.');
  }
  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.');
  }
  
  const actionWith = data => {
    const finalAction = Object.assign({ otherParameters }, action, data);
    delete finalAction[CALL_API];
    return finalAction;
  };
  
  const [requestType, successType, failureType] = types;
  
  //  登出现在没有接口，先简单处理下
  if (endpoint === 'logout') {
    //  移除本地存储中的token
    removeAuthorization();
    removeRoles();
    removeAuthorizationHeader();
    window.location.reload();
    
    //  todo: 清空当前store，暂时无法实现，用上面的刷新页面实现
    //  传递给下一个dispatch
    // return next({
    //   type: successType
    // });
  }
  
  next(actionWith({ type: requestType }));
  
  return callApi(endpoint, options).then(
    response => {
      // if (endpoint === JHCRM.getURL('login')) {
      //   //  接口是登录的时候，保存返回值并且设置拦截器给login之外的接口添加authorization请求头
      //   const authorization = response.headers.authorization;
      //   //  持久存储用户权限角色数据
      //   const rolesStr = response.data.message || '';
      //   const roles = rolesStr.split(';').filter((item) => !!item);
      //   setRoles(roles);
      //   setAuthorizationHeader(authorization);
      //   return next(actionWith({
      //     response,
      //     type: successType,
      //     roles
      //   }));
      // }
      // if (endpoint === JHCRM.getURL('changeOrg')) {
      //   const authorization = response.headers.authorization;
      //   setAuthorizationHeader(authorization);
      // }
      return next(actionWith({
        response,
        type: successType
      }));
    },
    error => {
      const { response, message } = error;
      // const { status } = response;
      const status = response.data.status || response.status;
      
      if (Number(status) === 401) {
        //  401会跳转回登录界面，所以要清除存储的信息否则登录相关接口带请请求头后会返回401
        removeAuthorization();
        removeRoles();
        removeAuthorizationHeader();
      }
      
      return next(actionWith({
        type: failureType,
        status: status,
        errorMessage: message || 'Something bad happened'
      }));
    }
  );
};
