import { GET_ERRORS } from "../action/errorAction";

const INITIAL_STATE = {};

const errorReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case GET_ERRORS:
			return action.payload;
		default:
			return state;
	}
};

export default errorReducer;
