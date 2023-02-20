import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import reactLogo from '../../assets/reactLogo.svg'
import styles from './styles.module.scss';
import { useState } from 'react';
import userIcon from '../../assets/userIcon.jpg';
import userSlice, { checkToken, removeToken } from '../../redux/slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';

const Header: React.FC = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log(window.localStorage.getItem('name'));


  dispatch(checkToken());
  const User = useSelector((state: any) => state.user);

  const signOut = () => {
    dispatch(removeToken());
    window.localStorage.removeItem('name');
    window.localStorage.removeItem('password');
  }

  return (
    <header className={styles.header}>
      <Link className={styles.logoWrapper} to="/" style={{ textDecoration: "none" }}>
        <img src={reactLogo} className={styles.logo} alt="logo" />
        <span className={styles.logoText}>React news</span>
      </Link>

      <nav className={styles.nav}>
        <NavLink className={styles.navItem} to="/">HOME</NavLink>
        <NavLink className={styles.navItem} to="/news">NEWS</NavLink>
        {User.isAuth &&
          <NavLink className={styles.navItem} to="/profile">PROFILE</NavLink>
        }
      </nav>
      {User.isAuth ?
        <div className={styles.authContainer}>
          <button className={styles.btn} onClick={() => signOut()}>Sign out</button>
          <Link to="/profile" className={styles.user}>
            {User.name}
            <img src={userIcon} className={styles.userIcon} alt="user" />
          </Link>
        </div>
        :
        <button className={styles.btn} onClick={() => navigate('/login')}>Sign in</button>
      }
    </header>
  )
}

export default Header;