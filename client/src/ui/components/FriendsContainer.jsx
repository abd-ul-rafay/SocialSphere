import { useSelector } from 'react-redux';
import { HiUserRemove } from 'react-icons/hi';
import UserRow from './UserRow';

const FriendsContainer = ({ self = true }) => {
    const friends = self
        ? useSelector(state => state.auth.user.friends)
        : useSelector(state => state.profile.user.friends);

    if (!friends) {
        return;
    } 

    return (
        <section className='widget friends-container'>
            <p>Friend List</p>
            {(friends.length < 1)
                ? <p className='small-text' style={{ marginTop: '0.5rem' }}>No friends</p>
                : friends.map(friend => <div className='friend' key={friend._id}>
                    <UserRow
                        _id={friend._id}
                        fullName={friend.fullName}
                        subTitle={friend.bio}
                        imagePath={friend.imagePath}
                        CornerWidget={HiUserRemove}
                    />
                </div>)}
        </section>
    )
}

export default FriendsContainer;
