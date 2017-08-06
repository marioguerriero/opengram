import superAgent from 'superagent';

export const CALL_API = Symbol('CALL_API');

export default store => next => action => {
  if ( ! action[CALL_API] ) {
  	return next(action);
  }
  let request = action[CALL_API];
  let { method, authToken, path, query, failureType, successType, sendingType } = request;
  let { dispatch } = store;

  dispatch({ type: sendingType });
  let call = superAgent[method](path);
  if(authToken != null) {
    call.set('x-access-token', authToken);
  }
  call.send(query)
      .end((err, res)=> {
      	if (err) {
        	dispatch({
          	type: failureType,
            response: err
          });
        } else {
          dispatch({
      	    type: successType,
            response: res.body
          });
        }
    });
};
