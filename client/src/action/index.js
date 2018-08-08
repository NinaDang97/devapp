import axios from 'axios';
import jwtDecode from 'jwt-decode';

import { setAuthToken } from '../utils/setAuthToken';

////////// ERROR TYPE /////////////
export const GET_ERRORS = 'GET_ERRORS';

////////// AUTH TYPES /////////////
export const SIGN_UP = 'SIGN_UP';
export const SET_CURRENT_USER = 'SET_CURRENT_USER';

////////// PROFILE TYPES /////////////
export const GET_ALL_PROFILES = 'GET_ALL_PROFILES';
export const GET_PROFILE = 'GET_PROFILE';
export const PROFILE_LOADING = 'PROFILE_LOADING';
export const PROFILE_NOT_FOUND = 'PROFILE_NOT_FOUND';
export const CLEAR_CURRENT_PROFILE = 'CLEAR_CURRENT_PROFILE'; //logout => profile cleared

////////// AUTH ACTIONS /////////////
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
      //1) Save TOKEN to LOCAL STORAGE
      const { token } = res.data;
      localStorage.setItem('jwtToken', token);
      //2) Set token to auth header
      setAuthToken(token);
      //Decode token to get user data
      const decoded = jwtDecode(token);
      //3) Set current user
      dispatch(setCurrentUser(decoded));
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
  //Clear current profile
  dispatch(clearCurrentProfile());
};

////////// PROFILE ACTIONS /////////////
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());

  axios
    .get('/api/profile')
    .then(res => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    );
};

//Profile loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

//Clear profile when Logout
export const clearCurrentProfile = () => dispatch => {
  dispatch({
    type: CLEAR_CURRENT_PROFILE
  });
};
