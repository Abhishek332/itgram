import { combineReducers } from 'redux';

import { UserSignUpReducer, UserLogInReducer } from '../reducers/authReducers';

export const rootReducer = combineReducers({
	userSignUp: UserSignUpReducer,
	userLogIn: UserLogInReducer,
});
