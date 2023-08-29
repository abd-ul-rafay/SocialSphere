import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './ui/pages/HomePage';
import LoginPage from './ui/pages/LoginPage';
import ProfilePage from './ui/pages/ProfilePage';
import NotFoundPage from './ui/pages/NotFoundPage';
import Navbar from './ui/components/Navbar';
import { useSelector } from 'react-redux';
import BeatLoader from "react-spinners/BeatLoader";

const App = () => {
  const { user, themeMode, isAuthLoading } = useSelector(state => state.auth);
  const isProfileLoading = useSelector(state => state.profile.isLoading);

  return (
    <div className={themeMode === 'light' ? 'app light-theme' : 'app dark-theme'}>
      <Navbar />
      {(isAuthLoading || isProfileLoading) && <div className='loading-txt'>
        <BeatLoader
          color='white'
          loading={isAuthLoading || isProfileLoading}
          size={10}
          speedMultiplier={1.5}
        />
      </div>}
      <main>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={user ? <HomePage /> : <Navigate to='/login' />} />
            <Route path='/login' element={!user ? <LoginPage /> : <Navigate to='/' />} />
            <Route path='/profile/:userId' element={user ? <ProfilePage /> : <Navigate to='/login' />} />
            <Route path='*' element={user ? <NotFoundPage /> : <Navigate to='/login' />} />
          </Routes>
        </BrowserRouter>
      </main>
    </div>
  )
}

export default App;
