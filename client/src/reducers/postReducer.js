import {
	CREATE_POST,
	GET_ALL_POSTS,
	GET_POST,
	DELETE_POST,
	POST_LOADING,
	SET_LIKE
} from "../action/postAction";

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
				post: {},
				allPosts: action.payload,
				loading: false
			};
		case GET_POST:
			return {
				...state,
				post: action.payload,
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
		case SET_LIKE:
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
