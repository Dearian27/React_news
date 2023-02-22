import { useEffect, useState } from 'react';
import Header from './components/Header';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import LogIn from './pages/LogIn';
import News from './pages/News';

function App() {

  const [isAuth, setIsAuth] = useState<boolean>(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth && location.pathname === '/profile') {
      navigate("/");
    }
  }, [])


  return (
    <section>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/news' element={<News />} />
        <Route path='/login' element={<LogIn />} />
      </Routes>
    </section>
  )
}

export default App
