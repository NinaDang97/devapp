import {
	GET_PROFILE,
	PROFILE_LOADING,
	CLEAR_CURRENT_PROFILE,
	GET_ALL_PROFILES
} from "../action/profileAction";

const INITIAL_STATE = {
	profile: null,
	allProfiles: null,
	loading: false
};

const profileReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case PROFILE_LOADING:
			return {
				...state,
				loading: true
			};
		case GET_ALL_PROFILES:
			return {
				...state,
				loading: false,
				allProfiles: action.payload
			};
		case GET_PROFILE:
			return {
				...state,
				loading: false,
				profile: action.payload
			};
		case CLEAR_CURRENT_PROFILE:
			return {
				...state,
				profile: null
			};
		default:
			return state;
	}
};

export default profileReducer;
