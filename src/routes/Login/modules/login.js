var _ = require ('lodash');
import fetch from '../../../utils/fetch';

// ------------------------------------
// Constants
// ------------------------------------
export const LOGIN_SUBMIT = 'LOGIN_SUBMIT';

// ------------------------------------
// Actions
// ------------------------------------

/*  This is a thunk, meaning it is a function that immediately
 returns a function for lazy evaluation. It is incredibly useful for
 creating async actions, especially when combined with redux-thunk! */

export const loginSubmit = (body) => {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
        console.log('loginSubmit', body);

        fetch('loginPost', {body}).then((result)=>{
          console.log('fetchResult_result: ', result);

          dispatch({
            type    : LOGIN_SUBMIT,
            payload : result
          });

          resolve('successfully');
        });
    })
  }
};

export const actions = {
  loginSubmit
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [LOGIN_SUBMIT]    : (state, action) => {
    console.log('ACTION_HANDLERS - LOGIN_SUBMIT', state, action);

    var newState = _.assign({}, state, action.payload);
    console.log('newState', newState);
    return newState;
  }
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = null;
export default function counterReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state
}
