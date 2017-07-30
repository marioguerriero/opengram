import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'

import { actionTypes as UserAction } from './user_actions';
import { actionTypes as PostAction } from './post_actions';

const initialState = {
  user: null,
  posts: null
}

export const initStore = (state = initialState) => {
  return createStore(reducer, state, composeWithDevTools(applyMiddleware(thunkMiddleware)))
}

// REDUCER
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UserAction.AUTH_SUCCESS:
      return {
        ...state,
        user: action.response
      };
    case UserAction.AUTH_REQUEST:
      return state;
    case UserAction.AUTH_FAILURE:
      return {
        ...state,
        err: action.response
      };
    default:
      return state;
  }
}
