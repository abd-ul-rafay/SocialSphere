import UserRow from "../UserRow";
import { BASE_URL } from "../../../api";
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { BiCommentDetail, BiSolidShareAlt } from 'react-icons/bi';
import { HiUserAdd, HiUserRemove } from 'react-icons/hi';
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { commentPost, likeUnlikePost } from "../../../state/slices/postsSlice";

const PostContainer = (props) => {
    const {
        _id,
        desc,
        createdAt,
        imagePath,
        likes,
        comments,
        userId: {
            _id: postUserId,
            imagePath: userImagePath,
            fullName: userFullName
        }, 
    } = props;

    const [showComment, setShowComment] = useState(false);
    const [commentText, setCommentText] = useState('');
    const token = useSelector(state => state.auth.token);
    const { _id: userId, friends } = useSelector(state => state.auth.user);
    const dispatch = useDispatch();

    const isLiked = likes.includes(userId);

    const handleLike = () => {
        dispatch(likeUnlikePost({ token, postId: _id }));
    }

    const sendComment = () => {
        if (!commentText) {
            return;
        }

        dispatch(commentPost({ token, postId: _id, text: commentText }));
        setCommentText('');
    }

    const isAlreadyFriend = (postUserId) => {
        const isFriend = friends.find(friend => friend._id === postUserId);
        return isFriend ? true : false;
    }

    const isMyFriend = isAlreadyFriend(postUserId);

    return (
        <section className="post-container widget">
            <UserRow
                _id={postUserId}
                fullName={userFullName}
                subTitle={new Date(createdAt).toLocaleDateString('en-GB')}
                imagePath={userImagePath}
                CornerWidget={postUserId === userId
                    ? undefined
                    : isMyFriend
                        ? HiUserRemove
                        : HiUserAdd
                }
            />
            <p className="desc small-text">{desc}</p>
            {
                imagePath && <img className="post-img" src={`${BASE_URL}/assets/${imagePath}`} alt={desc} />
            }
            <div className="post-icons">
                <div>
                    <div className="left">
                        <div onClick={handleLike}>
                            {isLiked
                                ? <AiFillHeart className="icon" color="red" />
                                : <AiOutlineHeart className="icon" />}
                        </div>
                        <p className="small-text">{likes?.length || 0}</p>
                    </div>
                    <div className="left">
                        <BiCommentDetail className="icon" onClick={() => setShowComment(state => !state)} />
                        <p className="small-text">{comments?.length || 0}</p>
                    </div>
                </div>
                <BiSolidShareAlt className="icon" />
            </div>
            {
                showComment && (
                    <div className='post-comment'>
                        {comments.length > 0
                            ? comments.map(comment => <div className='single-comment' key={comment.user._id}>
                                <img style={{ objectFit: 'cover' }} src={`${BASE_URL}/assets/${comment.user.imagePath}`} alt={comment.user.fullName} />
                                <div>
                                    <p>{comment.user.fullName}</p>
                                    <p>{comment.text}</p>
                                </div>
                            </div>)
                            : <div>
                                <p className='no-one-commented'>No one commented</p>
                            </div>
                        }
                        <div className='my-input'>
                            <input type='text' name='name' placeholder='Your comment' value={commentText} onChange={(e) => setCommentText(e.target.value)} />
                            <p className='send' onClick={sendComment}>Send</p>
                        </div>
                    </div>
                )
            }
        </section>
    )
}

export default PostContainer;
