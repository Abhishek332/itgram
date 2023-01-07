import { useCallback, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
	NavBar,
	PostCard,
	Footer,
	Loader,
	PortFolioForm,
} from '../../components';
import { allPostCall } from '../../redux/homepage/action';
import { useDispatch, useSelector } from 'react-redux';
import { Loader2 } from '../../assets/images';
import { useToaster, ToastBox } from '../../utils/toaster';

const HomePage = () => {
	const { state } = useLocation(),
		source = state?.source || 'auto-redirect',
		navigate = useNavigate(),
		toaster = useToaster(),
		dispatch = useDispatch(),
		{ loading, allpost } = useSelector((state) => state.allPost);

	const getData = useCallback((message) => {
		dispatch(allPostCall());
		message && toaster('success', message);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (!localStorage.getItem('userInfo')) navigate('/');
		getData();
	}, [getData, navigate]);

	const defaultMsg = {
		textAlign: 'center',
	};

	return (
		<>
			<NavBar />
			<div className='page-container'>
				{Array.isArray(allpost) && allpost.length !== 0 ? (
					allpost.map((Post, index) => (
						<PostCard key={`post-${index}`} {...Post} getData={getData} />
					))
				) : (
					<p style={defaultMsg}>There is no post to show.</p>
				)}
			</div>
			<Footer />
			<ToastBox />
			{loading && <Loader Illustration={Loader2} />}
			<PortFolioForm source={source} />
		</>
	);
};

export default HomePage;
