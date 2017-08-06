import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'

import { actionTypes as UserAction } from './user_actions';
import { actionTypes as PostAction } from './post_actions';

import apiMiddleware from './api-middleware';

const initialState = {
  user: null,
  posts: null,
  loggedIn: false,
  err: null
}

export const initStore = (state = initialState) => {
  const middlewares = applyMiddleware(thunkMiddleware, apiMiddleware);
  return createStore(reducer, state, composeWithDevTools(middlewares))
}

const genericActionTypes = {
  CLEAN_ERR: Symbol("CLEAN_ERR")
}

// REDUCER
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    // User actions
    case UserAction.REGISTER_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case UserAction.REGISTER_SUCCESS:
      return {
        ...state,
        isFetching: false
      };
    case UserAction.REGISTER_FAILURE:
      return {
        ...state,
        isFetching: false,
        err: action.response
      };
    case UserAction.AUTH_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        isFetching: false,
        user: action.response
      };
    case UserAction.AUTH_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case UserAction.AUTH_FAILURE:
      return {
        ...state,
        loggedIn: false,
        isFetching: false,
        err: action.response
      };
    case UserAction.AUTH_DESTORY:
      return {
        ...state,
        loggedIn: false,
        user: null
      }
    // Post actions
    case PostAction.FETCH_TIMELINE_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case PostAction.FETCH_TIMELINE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        posts: action.response.posts
      };
    case PostAction.FETCH_TIMELINE_FAILURE:
      return {
        ...state,
        isFetching: false,
        err: action.response
      };
    // Generic actions
    case genericActionTypes.CLEAN_ERR:
      return {
        ...state,
        err: null
      }
    default:
      return state;
  }
}

// ACTIONS
export function cleanErr() {
  return {
    type: genericActionTypes.CLEAN_ERR
  };
}
