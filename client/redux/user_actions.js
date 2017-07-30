import { CALL_API } from './api-middleware';

export const actionTypes = {
  AUTH_REQUEST: Symbol('AUTH_REQUEST'),
  AUTH_SUCCESS: Symbol('AUTH_SUCCESS'),
  AUTH_FAILURE: Symbol('AUTH_FAILURE'),
  AUTH_DESTORY: Symbol('AUTH_DESTORY'),
}

export function authRequest(user){
  return {
    [CALL_API]: {
    	method: 'post',
      path: '/api/login',
      sendingType: actionTypes.AUTH_REQUEST,
      successType: actionTypes.AUTH_SUCCESS,
      failureType: actionTypes.AUTH_FAILURE,
      query: user
    }
  };
}

export function authDestroy() {
  return {
    type: actionTypes.AUTH_DESTORY
  }
}
