import { USER_SIGNUP, USER_LOGIN } from '../constants/authConstants';
import { IntialState } from '../storeConfig/IntialState';

export const UserSignUpReducer = (state = IntialState.userSignUp, action) => {
	switch (action.type) {
		case USER_SIGNUP.REQUEST:
			return { loading: true };
		case USER_SIGNUP.SUCCESS:
			return { loading: false, userInfo: action.payload };
		case USER_SIGNUP.FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const UserLogInReducer = (state = IntialState.userLogIn, action) => {
	switch (action.type) {
		case USER_LOGIN.REQUEST:
			return { ...state, loading: true };
		case USER_LOGIN.SUCCESS:
			return { loading: false, userInfo: action.payload };
		case USER_LOGIN.FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};
