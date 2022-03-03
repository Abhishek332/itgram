import './CreatePost.scss';
import { useState } from 'react';
import { Loader3 } from '../../assets/images';
import { NavBar } from '../../components';

const CreatePost = () => {
	const [state, setState] = useState({
		title: '',
		body: '',
	});
	const [loader, setLoader] = useState(false);

	const handleChange = ({ target: { name, value } }) => {
		setState({ ...state, [name]: value });
		console.log('state', state);
	};

	const handleSubmit = () => {
		console.log(state);
		setLoader(true);
		setTimeout(() => {
			setLoader(false);
		}, 1000);
	};

	return (
		<>
			<NavBar />
			<div className='create-post-container'>
				<div className='form-wrapper'>
					<input
						type='text'
						name='title'
						placeholder='Title'
						value={state.title}
						onChange={handleChange}
					/>
					<textarea
						name='body'
						placeholder='Enter post description'
						value={state.body}
						onChange={handleChange}
					/>
					<button className='post-btn' onClick={handleSubmit}>
						Post
					</button>
				</div>
				{loader && (
					<div className='loader'>
						<img src={Loader3} alt='' />
					</div>
				)}
			</div>
		</>
	);
};

export default CreatePost;
