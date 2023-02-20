import { useEffect, useState } from 'react';
import styles from './App.module.scss';
import Header from './components/Header';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import LogIn from './pages/LogIn';

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
    <div className={styles.container}>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<LogIn />} />
      </Routes>
    </div>
  )
}

export default App
