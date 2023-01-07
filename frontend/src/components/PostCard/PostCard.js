import './PostCard.scss';
import { AiFillHeart, AiOutlineHeart, AiOutlineComment } from 'react-icons/ai';
import { FiSend } from 'react-icons/fi';
import { useState, memo } from 'react';
import { Like } from '../../assets/images';
import { axios } from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { MdDelete } from 'react-icons/md';
import { PopupGenerator } from '../';

const PostCard = memo(
	({ title, body, photo, postedBy, _id, likes, comments, getData }) => {
		const navigate = useNavigate(),
			loggedUserId = JSON.parse(localStorage.getItem('userInfo'))._id,
			[likesData, setLikesData] = useState(likes),
			[liked, setLiked] = useState(likes.includes(loggedUserId)),
			[likeAnimation, setLikeAnimation] = useState(false),
			[showPopup, setShowPopup] = useState(false),
			[textArea, setTextArea] = useState(),
			[followers, setFollowers] = useState(postedBy.followers);

		const handleLike_UnLike = (val) => {
				axios
					.put(`/${val}`, { postId: _id })
					.then((res) => {
						setLikesData(res.data.result.likes);
						setLiked(res.data.result.likes.includes(loggedUserId));
					})
					.catch((err) => console.log('error', err));
			},
			handleLikeAnimation = () => {
				setLikeAnimation(true);
				handleLike_UnLike('like');
				setTimeout(() => {
					setLikeAnimation(false);
				}, 1000);
			},
			handleComment = () => {
				axios
					.put('/add-comment', { postId: _id, text: textArea })
					.then((res) => navigate(`/comments/${_id}`))
					.catch((err) => console.log(err));
			},
			handleFollowUnfollow = (option) => {
				axios
					.put(`/${option}/${postedBy._id}`)
					.then((res) => setFollowers(res.data.followers))
					.catch((error) => console.log(error));
			},
			handleDeletePost = () => {
				axios
					.put(`/delete-post/${_id}`)
					.then(({ data: { message } }) => {
						!getData && navigate(-1);
						getData(message);
					})
					.catch((err) => console.log(err));
			};

		return (
			<div className='post-card-wrapper page-container'>
				<div className='header'>
					<div className='left'>
						<Link to={`/profile/${postedBy._id}`}>
							{' '}
							<h3>{postedBy.name}</h3>
						</Link>
						{loggedUserId !== postedBy._id &&
							(followers.includes(loggedUserId) ? (
								<button
									className='unfollow-btn'
									onClick={() => handleFollowUnfollow('unfollow')}>
									Unfollow
								</button>
							) : (
								<button
									className='follow-btn'
									onClick={() => handleFollowUnfollow('follow')}>
									Follow
								</button>
							))}
					</div>
					{loggedUserId === postedBy._id && (
						<MdDelete
							className='delete-btn'
							onClick={() => setShowPopup(true)}
						/>
					)}
				</div>
				<div className='post-img-wrapper'>
					<img
						className='post-img'
						src={photo}
						alt=''
						onDoubleClick={handleLikeAnimation}
					/>
					{likeAnimation && (
						<img src={Like} alt='' className='like-animation' />
					)}
				</div>
				<div className='footer'>
					<h3>{title}</h3>
					<p>{body}</p>
					<div className='footer-top'>
						{liked ? (
							<AiFillHeart
								onClick={() => handleLike_UnLike('unlike')}
								style={{ cursor: 'pointer' }}
							/>
						) : (
							<AiOutlineHeart
								onClick={() => handleLike_UnLike('like')}
								style={{ cursor: 'pointer' }}
							/>
						)}
						<AiOutlineComment
							onClick={() => navigate(`/comments/${_id}`)}
							style={{ cursor: 'pointer' }}
						/>
					</div>
					<Link to={`/likes/${_id}`} className='span'>
						<span>{`${likesData.length} likes`}</span>
					</Link>
					<span>{' | '}</span>
					<Link to={`/comments/${_id}`} className='span'>
						<span>{`${comments.length} comments`}</span>
					</Link>
					<div className='comment-input'>
						<textarea
							placeholder='comment here ...'
							value={textArea}
							onChange={(e) => setTextArea(e.target.value)}></textarea>
						<FiSend
							className='comment-btn'
							onClick={handleComment}
							style={{ cursor: 'pointer' }}
						/>
					</div>
				</div>

				{showPopup && (
					<PopupGenerator popupCloser={setShowPopup}>
						<div className='popup-box'>
							<p>Are you want to delete your post?</p>
							<span>😢</span>
							<div className='flexer'>
								<button
									onClick={() => {
										handleDeletePost();
										setShowPopup(false);
									}}>
									Yes
								</button>
								<button onClick={() => setShowPopup(false)}>No</button>
							</div>
						</div>
					</PopupGenerator>
				)}
			</div>
		);
	}
);

export default PostCard;
