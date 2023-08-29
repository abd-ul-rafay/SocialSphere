import { useSelector } from 'react-redux';
import UserRow from "../UserRow";
import IconInfoRow from './IconInfoRow';
import { MdContactPage, MdLocationCity, MdCreate } from 'react-icons/md';
import { FaUserFriends, FaBirthdayCake } from 'react-icons/fa';
import { BsFillPersonFill } from 'react-icons/bs';

const UserContainer = ({ self = true }) => {
  const user = self
    ? useSelector(state => state.auth.user)
    : useSelector(state => state.profile.user);

  if (!user) {
    return;
  }

  return (
    <section className="user-container widget">
      <UserRow _id={user._id} fullName={user.fullName} subTitle={user.bio} imagePath={user.imagePath} self={true} />
      <hr className='light-line' />
      <IconInfoRow Icon={FaUserFriends} info={`${user.friends?.length || 0} friends`} />
      <IconInfoRow Icon={MdCreate} info={new Date(user.createdAt).toLocaleDateString('en-GB')} />
      <hr className='light-line' />
      <IconInfoRow Icon={BsFillPersonFill} info={user.gender || 'Not mentioned'} />
      <IconInfoRow Icon={FaBirthdayCake} info={user.dob || 'Not mentioned'} />
      <hr className='light-line' />
      <IconInfoRow Icon={MdLocationCity} info={user.location || 'Not mentioned'} />
      <IconInfoRow Icon={MdContactPage} info={user.contact || 'Not mentioned'} />
    </section>
  )
}

export default UserContainer;
