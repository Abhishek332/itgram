import './Footer.scss';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const Footer = () => {
	return (
		<div className='footer-wrapper'>
			<Link to='/create-post' className='create-btn'>
				<AiOutlinePlusCircle />
			</Link>
		</div>
	);
};

export default Footer;
