import { useEffect, useState } from 'react';
import Header from './components/Header';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Home from './pages/Home/Home';
import LogIn from './pages/LogIn';
import News from './pages/News';
import Profile from './pages/Profile';
import { useDispatch } from 'react-redux';
import { checkToken } from './redux/slices/userSlice';


function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkToken());
  }, [])

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
