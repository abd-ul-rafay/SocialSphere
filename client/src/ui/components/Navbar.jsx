import { useDispatch, useSelector } from 'react-redux';
import { MdLightMode, MdDarkMode, MdLogout } from 'react-icons/md';
import { logout, toggleThemeMode } from '../../state/slices/authSlice';
import { clearPosts } from '../../state/slices/postsSlice';

const Navbar = () => {
  const { user, themeMode } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const logoutAndClearPosts = () => {
    dispatch(logout());
    dispatch(clearPosts());
  }

  return (
    <nav>
      <div>
        <h1>SocialSphere</h1>
      </div>
      <div className='nav-right'>
        <div className='icon' onClick={() => dispatch(toggleThemeMode())}>
          {themeMode === 'light' ? <MdLightMode /> : <MdDarkMode />}
        </div>
        {
          user && (<div className='icon' onClick={logoutAndClearPosts}>
            <MdLogout />
          </div>)
        }
      </div>
    </nav>
  )
}

export default Navbar;
