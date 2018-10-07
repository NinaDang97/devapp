import axios from "axios";

import { GET_ERRORS } from "./errorAction";

////////// POST TYPES /////////////
export const GET_ALL_POSTS = "GET_ALL_POSTS";
export const GET_POST = "GET_POST";
export const CREATE_POST = "CREATE_POST";
export const DELETE_POST = "DELETE_POST";
export const POST_LOADING = "POST_LOADING";
export const SET_LIKE = "SET_LIKE";

/////////////////////////////////////
////////// POST ACTIONS /////////////
/////////////////////////////////////
export const createPost = newPost => dispatch => {
	axios
		.post("/api/posts", newPost)
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
		.get("/api/posts")
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

export const getPost = postId => dispatch => {
	axios
		.get(`/api/posts/${postId}`)
		.then(res => dispatch({ type: GET_POST, payload: res.data }))
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
				type: SET_LIKE,
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

export const unLike = postId => dispatch => {
	axios
		.post(`/api/posts/unlike/${postId}`)
		.then(res =>
			dispatch({
				type: SET_LIKE,
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

export const createComment = (postId, newComment) => dispatch => {
	axios
		.post(`/api/posts/comment/${postId}`, newComment)
		.then(res =>
			dispatch({
				type: GET_POST,
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

export const deleteComment = (postId, commentId) => dispatch => {
	axios
		.delete(`/api/posts/comment/${postId}/${commentId}`)
		.then(() => {
			axios.get(`/api/posts/${postId}`).then(res =>
				dispatch({
					type: GET_POST,
					payload: res.data
				})
			);
		})
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
