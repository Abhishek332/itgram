import './CreatePost.scss';
import { useState } from 'react';
import { Loader3 } from '../../assets/images';
import { NavBar } from '../../components';
import { FileUploader } from 'react-drag-drop-files';

const fileTypes = ['JPEG', 'PNG', 'GIF', 'WEBP'];

const CreatePost = () => {
	const [state, setState] = useState({
		title: '',
		body: '',
		photo: '',
	});
	const [loader, setLoader] = useState(false);

	const handleChange = ({ target: { name, value } }) => {
		setState({ ...state, [name]: value });
		console.log('state', state);
	};

	const handlePhotoChange = (file) => {
		setState({ ...state, photo: file });
		console.log('state', state);
	};

	const handleSubmit = () => {
		console.log(state);
		setLoader(true);
		setTimeout(() => {
			setLoader(false);
		}, 5000);
	};

	return (
		<>
			<NavBar />
			<div className='create-post-container'>
				<div className='form-wrapper'>
					<FileUploader
						className='img-handler'
						handleChange={handlePhotoChange}
						onDrop={handlePhotoChange}
						name='photo'
						types={fileTypes}
						value={state.photo}
					/>
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
