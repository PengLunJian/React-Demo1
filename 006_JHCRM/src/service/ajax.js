import axios from 'axios';
import Ajax from '../../../common/login/ajax';
import '../../../common/apis/apisMain';
import api from '../../../common/apis/006_JHCRM';

const ajaxInstance = new Ajax({
  api,
  library: axios,
  authorizationKey: 'authorization_JHCRM',
  rolesKey: 'rolesKey_JHCRM',
  // vaildPeriod: 10000,
  // validInterval: 1000
});

export const JHCRM = ajaxInstance.api;
export const ajax = ajaxInstance.ajax;
export const setAuthorization = ajaxInstance.setAuthorization.bind(ajaxInstance);
export const getAuthorization = ajaxInstance.getAuthorization.bind(ajaxInstance);
export const removeAuthorization = ajaxInstance.removeAuthorization.bind(ajaxInstance);
export const setRoles = ajaxInstance.setRoles.bind(ajaxInstance);
export const getRoles = ajaxInstance.getRoles.bind(ajaxInstance);
export const removeRoles = ajaxInstance.removeRoles.bind(ajaxInstance);
export const setAuthorizationHeader = ajaxInstance.setAuthorizationHeader.bind(ajaxInstance);
export const removeAuthorizationHeader = ajaxInstance.removeAuthorizationHeader.bind(ajaxInstance);
