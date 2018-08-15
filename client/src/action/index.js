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
export const CLEAR_CURRENT_PROFILE = 'CLEAR_CURRENT_PROFILE'; //logout => profile cleared
export const CREATE_PROFILE = 'CREATE_PROFILE';
export const DELETE_EXP = 'DELETE_EXP';
export const DELETE_EDU = 'DELETE_EDU';

////////// POST TYPES /////////////
export const GET_ALL_POSTS = 'GET_ALL_POSTS';
export const GET_POST = 'GET_POST';
export const CREATE_POST = 'CREATE_POST';
export const DELETE_POST = 'DELETE_POST';
export const POST_LOADING = 'POST_LOADING';
export const ADD_LIKE = 'ADD_LIKE';

/////////////////////////////////////
////////// AUTH ACTIONS /////////////
/////////////////////////////////////
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

/////////////////////////////////////
////////// PROFILE ACTIONS /////////////
/////////////////////////////////////
export const getAllProfiles = () => dispatch => {
  dispatch(setProfileLoading());

  axios
    .get('/api/profile/all')
    .then(res => {
      dispatch({
        type: GET_ALL_PROFILES,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const getProfileByHandle = handle => dispatch => {
  dispatch(setProfileLoading());

  axios
    .get(`/api/profile/handle/${handle}`)
    .then(res => dispatch({ type: GET_PROFILE, payload: res.data }))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

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

//Create Profile
export const createProfile = (newProfile, history) => dispatch => {
  axios
    .post('/api/profile', newProfile)
    .then(res => history.push('/dashboard'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Delete current user's profile and account
export const deleteAccount = () => dispatch => {
  if (window.confirm('Are you sure? This can NOT be undone!')) {
    axios
      .delete('/api/profile')
      .then(res =>
        dispatch({
          type: SET_CURRENT_USER,
          payload: {}
        })
      )
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  }
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

//Add Experience
export const addExperience = (newExp, history) => dispatch => {
  axios
    .post('/api/profile/experience', newExp)
    .then(res => history.push('/dashboard'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Add Education
export const addEducation = (newEdu, history) => dispatch => {
  axios
    .post('/api/profile/education', newEdu)
    .then(res => history.push('/dashboard'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Delete Experience
export const deleteExp = exp_id => dispatch => {
  if (window.confirm('Are you sure to delete this?')) {
    axios
      .delete(`/api/profile/experience/${exp_id}`)
      .then(res => dispatch({ type: GET_PROFILE, payload: res.data }))
      .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
  }
};

//Delete Education
export const deleteEdu = edu_id => dispatch => {
  if (window.confirm('Are you sure to delete this?')) {
    axios
      .delete(`/api/profile/education/${edu_id}`)
      .then(res => dispatch({ type: GET_PROFILE, payload: res.data }))
      .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
  }
};

/////////////////////////////////////
////////// POST ACTIONS /////////////
/////////////////////////////////////
export const createPost = newPost => dispatch => {
  axios
    .post('/api/posts', newPost)
    .then(res =>
      dispatch({
        type: CREATE_POST,
        payload: res.data
      })
    )
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

export const getAllPosts = () => dispatch => {
  dispatch(setPostLoading());

  axios
    .get('/api/posts')
    .then(res =>
      dispatch({
        type: GET_ALL_POSTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const deletePost = postId => dispatch => {
  axios
    .delete(`/api/posts/${postId}`)
    .then(res =>
      dispatch({
        type: DELETE_POST,
        payload: postId
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const addLike = postId => dispatch => {
  axios
    .post(`/api/posts/like/${postId}`)
    .then(res =>
      dispatch({
        type: ADD_LIKE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const setPostLoading = () => {
  return {
    type: POST_LOADING
  };
};
