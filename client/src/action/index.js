import axios from 'axios';
import jwtDecode from 'jwt-decode';

import { setAuthToken } from '../utils/setAuthToken';

export const SIGN_UP = 'SIGN_UP';
export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const GET_ERRORS = 'GET_ERRORS';

export const signUpUser = (newUser, history) => dispatch => {
  axios
    .post('/api/users/signup', newUser)
    .then(res => {
      dispatch({
        type: SIGN_UP,
        payload: res.data
      });
      history.push('/login');
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Login - get user's token
export const logInUser = (user, history) => dispatch => {
  axios
    .post('/api/users/login', user)
    .then(res => {
      //Save TOKEN to LOCAL STORAGE
      const { token } = res.data;
      localStorage.setItem('jwtToken', token);
      //Set token to auth header
      setAuthToken(token);
      //Decode token to get user data
      const decoded = jwtDecode(token);
      console.log(decoded);
      //Set current user
      setCurrentUser(decoded);
      history.push('/dashboard');
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Set user logged in for 3 hours
export const setCurrentUser = decoded => dispatch => {
  dispatch({
    type: SET_CURRENT_USER,
    payload: decoded
  });
};

//Log user out
export const logOutUser = () => dispatch => {
  localStorage.removeItem('jwtToken');
  //Remove auth header for future request
  setAuthToken(false);
  //Set current user to {} and isAuthenticated: false
  dispatch(setCurrentUser({}));
};
