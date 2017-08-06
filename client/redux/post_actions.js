import { CALL_API } from './api-middleware';

export const actionTypes = {
  POST_CREATE_REQUEST: Symbol('POST_CREATE_REQUEST'),
  POST_CREATE_SUCCESS: Symbol('POST_CREATE_SUCCESS'),
  POST_CREATE_FAILURE: Symbol('POST_CREATE_FAILURE'),

  POST_MODIFY_REQUEST: Symbol('POST_MODIFY_REQUEST'),
  POST_MODIFY_SUCCESS: Symbol('POST_MODIFY_SUCCESS'),
  POST_MODIFY_FAILURE: Symbol('POST_MODIFY_FAILURE'),

  POST_DELETE_REQUEST: Symbol('POST_DELETE_REQUEST'),
  POST_DELETE_SUCCESS: Symbol('POST_DELETE_SUCCESS'),
  POST_DELETE_FAILURE: Symbol('POST_DELETE_FAILURE'),

  FETCH_TIMELINE_REQUEST: Symbol('FETCH_TIMELINE_REQUEST'),
  FETCH_TIMELINE_SUCCESS: Symbol('FETCH_TIMELINE_SUCCESS'),
  FETCH_TIMELINE_FAILURE: Symbol('FETCH_TIMELINE_FAILURE')
}

export function addPost(post, tk) {
  return {
    [CALL_API]: {
    	method: 'post',
      path: '/api/posts',
      authToken: tk,
      sendingType: actionTypes.POST_CREATE_REQUEST,
      successType: actionTypes.POST_CREATE_SUCCESS,
      failureType: actionTypes.POST_CREATE_FAILURE,
      query: post
    }
  };
}

export function deletePost(post, tk) {
  return {
    [CALL_API]: {
      method: 'delete',
      path: '/api/post/' + post._id,
      authToken: tk,
      sendingType: actionTypes.POST_DELETE_REQUEST,
      successType: actionTypes.POST_DELETE_SUCCESS,
      failureType: actionTypes.POST_DELETE_FAILURE,
      query: post
    }
  };
}

export function modifyPost(post, tk) {
  return {
    [CALL_API]: {
      method: 'put',
      path: '/api/post/' + post._id,
      authToken: tk,
      sendingType: actionTypes.POST_MODIFY_REQUEST,
      successType: actionTypes.POST_MODIFY_SUCCESS,
      failureType: actionTypes.POST_MODIFY_FAILURE,
      query: post
    }
  };
}

export function fetchTimeline(tk) {
  return {
    [CALL_API]: {
      method: 'get',
      path: '/api/timeline',
      authToken: tk,
      sendingType: actionTypes.FETCH_TIMELINE_REQUEST,
      successType: actionTypes.FETCH_TIMELINE_SUCCESS,
      failureType: actionTypes.FETCH_TIMELINE_FAILURE,
    }
  };
}
