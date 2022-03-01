import './Authenticator.scss';
import { WelCome } from '../../assets/images';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

const Authenticator = () => {
	const { search } = useLocation(),
		[showSignUp, setShowSignUp] = useState(search.includes('signup')),
		[state, setState] = useState(
			showSignUp
				? {
						name: '',
						email: '',
						password: '',
				  }
				: {
						email: '',
						password: '',
				  }
		);

	const handleChange = ({ target: { name, value } }) => {
		setState({ ...state, [name]: value });
	};

	const handleSubmit = () => {
		console.log(state);
	};
	return (
		<>
			<div className='authenticator-container'>
				<div className='auth-box'>
					<div className='form-box'>
						<h2>{showSignUp ? 'SignUp' : 'SignIn'}</h2>
						{showSignUp && (
							<input
								type='text'
								name='name'
								placeholder='Enter your name*'
								value={state.name}
								onChange={handleChange}
								required
							/>
						)}
						<input
							type='email'
							name='email'
							placeholder='Enter your email*'
							value={state.email}
							onChange={handleChange}
							required
						/>
						<input
							type='password'
							name='password'
							placeholder='Password*'
							value={state.password}
							onChange={handleChange}
							required
						/>
						<button onClick={handleSubmit}>Submit</button>
						<p>
							{showSignUp
								? 'Already have an account?'
								: "Don't have an account?"}
							<span onClick={() => setShowSignUp(!showSignUp)}>
								{showSignUp ? ' SignIn' : ' SignUp'}
							</span>
						</p>
					</div>
					<img src={WelCome} alt='' />
				</div>
			</div>
		</>
	);
};

export default Authenticator;
