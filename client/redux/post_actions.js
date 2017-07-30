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
  POST_DELETE_FAILURE: Symbol('POST_DELETE_FAILURE')
}

export function addPost(post) {
  return {
    [CALL_API]: {
    	method: 'post',
      path: '/api/posts',
      sendingType: actionTypes.POST_CREATE_REQUEST,
      successType: actionTypes.POST_CREATE_SUCCESS,
      failureType: actionTypes.POST_CREATE_FAILURE,
      query: post
    }
  };
}

export function deletePost(post) {
  return {
    [CALL_API]: {
      method: 'delete',
      path: '/api/post/' + post._id,
      sendingType: actionTypes.POST_DELETE_REQUEST,
      successType: actionTypes.POST_DELETE_SUCCESS,
      failureType: actionTypes.POST_DELETE_FAILURE,
      query: post
    }
  };
}

export function modifyPost(post) {
  return {
    [CALL_API]: {
      method: 'put',
      path: '/api/post/' + post._id,
      sendingType: actionTypes.POST_MODIFY_REQUEST,
      successType: actionTypes.POST_MODIFY_SUCCESS,
      failureType: actionTypes.POST_MODIFY_FAILURE,
      query: post
    }
  };
}
