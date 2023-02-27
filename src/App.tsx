import { useEffect, useState } from 'react';
import Header from './components/Header';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Home from './pages/Home/Home';
import LogIn from './pages/LogIn';
import News from './pages/News';
import Profile from './pages/Profile';
import { RootState } from './redux/store';
import { useSelector } from 'react-redux';


function App() {

  const { isAuth } = useSelector((state: RootState) => state.user);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth === false && location.pathname === '/profile') {
      navigate("/");
    }
  }, [isAuth])


  return (
    <section>
      <Header />
      <Routes >
        <Route path='/' element={<Home />} />
        <Route path='/news' element={<News />} />
        <Route path='/login' element={<LogIn />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
    </section>
  )
}

export default App
