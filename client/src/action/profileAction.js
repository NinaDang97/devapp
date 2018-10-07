import axios from "axios";

import { GET_ERRORS } from "./errorAction";
import { SET_CURRENT_USER } from "./authAction";

////////// PROFILE TYPES /////////////
export const GET_ALL_PROFILES = "GET_ALL_PROFILES";
export const GET_PROFILE = "GET_PROFILE";
export const PROFILE_LOADING = "PROFILE_LOADING";
export const CLEAR_CURRENT_PROFILE = "CLEAR_CURRENT_PROFILE"; //logout => profile cleared
export const CREATE_PROFILE = "CREATE_PROFILE";
export const DELETE_EXP = "DELETE_EXP";
export const DELETE_EDU = "DELETE_EDU";

/////////////////////////////////////
////////// PROFILE ACTIONS /////////////
/////////////////////////////////////
export const getAllProfiles = () => dispatch => {
	dispatch(setProfileLoading());

	axios
		.get("/api/profile/all")
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
		.get("/api/profile")
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
		.post("/api/profile", newProfile)
		.then(res => history.push("/dashboard"))
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};

//Delete current user's profile and account
export const deleteAccount = () => dispatch => {
	if (window.confirm("Are you sure? This can NOT be undone!")) {
		axios
			.delete("/api/profile")
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
		.post("/api/profile/experience", newExp)
		.then(res => history.push("/dashboard"))
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
		.post("/api/profile/education", newEdu)
		.then(res => history.push("/dashboard"))
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};

//Delete Experience
export const deleteExp = exp_id => dispatch => {
	if (window.confirm("Are you sure to delete this?")) {
		axios
			.delete(`/api/profile/experience/${exp_id}`)
			.then(res => dispatch({ type: GET_PROFILE, payload: res.data }))
			.catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
	}
};

//Delete Education
export const deleteEdu = edu_id => dispatch => {
	if (window.confirm("Are you sure to delete this?")) {
		axios
			.delete(`/api/profile/education/${edu_id}`)
			.then(res => dispatch({ type: GET_PROFILE, payload: res.data }))
			.catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
	}
};
