import {
  CREATE_POST,
  GET_ALL_POSTS,
  DELETE_POST,
  POST_LOADING,
  ADD_LIKE
} from '../action';

const INITIAL_STATE = {
  allPosts: [],
  post: {},
  loading: false
};

const postReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CREATE_POST:
      const allPosts = [...state.allPosts];
      allPosts.unshift(action.payload);
      return {
        ...state,
        allPosts
      };
    case GET_ALL_POSTS:
      return {
        ...state,
        allPosts: action.payload,
        loading: false
      };
    case DELETE_POST:
      return {
        ...state,
        allPosts: state.allPosts.filter(post => post._id !== action.payload)
      };
    case POST_LOADING:
      return {
        ...state,
        loading: true
      };
    case ADD_LIKE:
      return {
        ...state,
        allPosts: state.allPosts.map(post => {
          if (post._id === action.payload._id) {
            post.likes = action.payload.likes;
          }
          return post;
        })
      };
    default:
      return state;
  }
};

export default postReducer;
