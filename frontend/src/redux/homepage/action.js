import { axios } from '../../api/axios';
import { ALL_POST } from './constant';

export const allPostCall = () => {
	return async (dispatch) => {
		dispatch({ type: ALL_POST.REQUEST });
		try {
			const res = await axios.get('/allpost');
			dispatch({ type: ALL_POST.SUCCESS, payload: res.data.posts });
		} catch (error) {
			console.log(error);
		}
	};
};
