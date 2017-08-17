import { CALL_API } from './api-middleware';

export const actionTypes = {
  REGISTER_REQUEST: Symbol('REGISTER_REQUEST'),
  REGISTER_SUCCESS: Symbol('REGISTER_SUCCESS'),
  REGISTER_FAILURE: Symbol('REGISTER_FAILURE'),
  CLEAN_REGISTER_SUCCESS: Symbol('CLEAN_REGISTER_SUCCESS'),
  AUTH_REQUEST: Symbol('AUTH_REQUEST'),
  AUTH_SUCCESS: Symbol('AUTH_SUCCESS'),
  AUTH_FAILURE: Symbol('AUTH_FAILURE'),
  AUTH_DESTORY: Symbol('AUTH_DESTORY'),
  PROFILE_REQUEST: Symbol('PROFILE_REQUEST'),
  PROFILE_SUCCESS: Symbol('PROFILE_SUCCESS'),
  PROFILE_FAILURE: Symbol('PROFILE_FAILURE'),
  USER_POSTS_REQUEST: Symbol('USER_POSTS_REQUEST'),
  USER_POSTS_SUCCESS: Symbol('USER_POSTS_SUCCESS'),
  USER_POSTS_FAILURE: Symbol('USER_POSTS_FAILURE'),
  FOLLOW_REQUEST: Symbol('FOLLOW_REQUEST'),
  FOLLOW_SUCCESS: Symbol('FOLLOW_SUCCESS'),
  FOLLOW_FAILURE: Symbol('FOLLOW_FAILURE'),
  DEFOLLOW_REQUEST: Symbol('DEFOLLOW_REQUEST'),
  DEFOLLOW_SUCCESS: Symbol('DEFOLLOW_SUCCESS'),
  DEFOLLOW_FAILURE: Symbol('DEFOLLOW_FAILURE'),
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

export function register(user){
  return {
    [CALL_API]: {
    	method: 'post',
      path: '/api/users',
      sendingType: actionTypes.REGISTER_REQUEST,
      successType: actionTypes.REGISTER_SUCCESS,
      failureType: actionTypes.REGISTER_FAILURE,
      query: user
    }
  };
}


export function authDestroy() {
  return {
    type: actionTypes.AUTH_DESTORY
  }
}

export function cleanRegisterSuccess() {
  return {
    type: actionTypes.CLEAN_REGISTER_SUCCESS
  };
}

export function profileRequest(userid, tk) {
  return {
    [CALL_API]: {
      method: 'get',
      path: '/api/user/' + userid,
      authToken: tk,
      sendingType: actionTypes.PROFILE_REQUEST,
      successType: actionTypes.PROFILE_SUCCESS,
      failureType: actionTypes.PROFILE_FAILURE
    }
  };
}

export function userPostsRequest(userid, tk) {
  const query = { "_id": userid };
  return {
    [CALL_API]: {
      method: 'get',
      path: '/api/posts',
      authToken: tk,
      sendingType: actionTypes.USER_POSTS_REQUEST,
      successType: actionTypes.USER_POSTS_SUCCESS,
      failureType: actionTypes.USER_POSTS_FAILURE,
      query
    }
  };
}

export function followRequest(userid, tk){
  return {
    [CALL_API]: {
    	method: 'post',
      path: '/api/user/follow/' + userid,
      authToken: tk,
      sendingType: actionTypes.FOLLOW_REQUEST,
      successType: actionTypes.FOLLOW_SUCCESS,
      failureType: actionTypes.FOLLOW_FAILURE
    }
  };
}

export function defollowRequest(userid, tk){
  return {
    [CALL_API]: {
    	method: 'delete',
      path: '/api/user/follow/' + userid,
      authToken: tk,
      sendingType: actionTypes.DEFOLLOW_REQUEST,
      successType: actionTypes.DEFOLLOW_SUCCESS,
      failureType: actionTypes.DEFOLLOW_FAILURE
    }
  };
}
