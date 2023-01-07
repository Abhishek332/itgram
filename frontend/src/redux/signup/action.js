import { USER_SIGNUP } from './constant';
import { axios } from '../../api/axios';

export const userSignUp = (obj = { name: '', email: '', password: '' }) => {
	return async (dispatch) => {
		dispatch({ type: USER_SIGNUP.REQUEST });

		try {
			const res = await axios.post('/signup', obj);
			localStorage.setItem('userInfo', JSON.stringify(res.data));
			dispatch({ type: USER_SIGNUP.SUCCESS, payload: res.data });
		} catch (error) {
			dispatch({
				type: USER_SIGNUP.FAIL,
				payload: error.response.data.error,
			});
		}
	};
};
