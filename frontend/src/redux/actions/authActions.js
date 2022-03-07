import { USER_SIGNUP } from '../constants/authConstants';
import { axios } from '../../api/axios';

export const userSignUp = (obj = { name: '', email: '', password: '' }) => {
	return async (dispatch) => {
		dispatch({ type: USER_SIGNUP.REQUEST });

		try {
			axios
				.post('/signup', obj)
				.then((res) => {
					dispatch({ type: USER_SIGNUP.SUCCESS, payload: res.data });
				})
				.catch((err) => {
					dispatch({
						type: USER_SIGNUP.FAIL,
						payload: err.response.data.error,
					});
				});
		} catch (error) {
			dispatch({
				type: USER_SIGNUP.FAIL,
				payload: 'Something Went Wrong',
			});
		}
	};
};
