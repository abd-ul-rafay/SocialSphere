import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { fetchUser, fetchUserPosts } from '../../../state/slices/profileSlice';
import UserContainer from '../../components/UserContainer';
import PostsContainer from '../../components/PostsContainer';
import FriendsContainer from '../../components/FriendsContainer';

const ProfilePage = () => {
  const { userId } = useParams();
  const token = useSelector(state => state.auth.token);
  const { user, isLoading } = useSelector(state => state.profile);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser({ userId, token }));
    dispatch(fetchUserPosts({ userId, token }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!user || isLoading) {
    return;
  }

  return (
    <section className="home-container">
      <div className="home-page-sec">
        <div className="home-first-container">
          <UserContainer self={false} />
          <FriendsContainer self={false} />
        </div>
        <div className="home-second-container">
          <PostsContainer self={false}/>
        </div>
      </div>
    </section>
  )
}

export default ProfilePage;
