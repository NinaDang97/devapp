import { SET_CURRENT_USER } from "../action/authAction";
import _ from "lodash";

const INITIAL_STATE = {
	isAuthenticated: false,
	currentUser: {}
};

const authReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case SET_CURRENT_USER:
			return {
				...state,
				isAuthenticated: !_.isEmpty(action.payload),
				currentUser: action.payload
			};
		default:
			return state;
	}
};

export default authReducer;
