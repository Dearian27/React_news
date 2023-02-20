import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import reactLogo from '../../assets/reactLogo.svg'
import styles from './styles.module.scss';
import { useState } from 'react';
import userIcon from '../../assets/userIcon.jpg';

const Header: React.FC = () => {


  const User = {
    name: 'Admin',
    password: '12345'
  }
  const [isAuth, setIsAuth] = useState<boolean>(false);
  // const [isAuth, setIsAuth] = useState<boolean>(true);

  const navigate = useNavigate();



  return (
    <header className={styles.header}>
      <Link className={styles.logoWrapper} to="/" style={{ textDecoration: "none" }}>
        <img src={reactLogo} className={styles.logo} alt="logo" />
        <span className={styles.logoText}>React news</span>
      </Link>

      <nav className={styles.nav}>
        <NavLink className={styles.navItem} to="/">HOME</NavLink>
        <NavLink className={styles.navItem} to="/news">NEWS</NavLink>
        {isAuth &&
          <NavLink className={styles.navItem} to="/profile">PROFILE</NavLink>
        }
      </nav>
      {isAuth ?
        <Link to="/profile" className={styles.user}>
          {User.name}
          <img src={userIcon} className={styles.userIcon} alt="user" />
        </Link>
        :
        <button className={styles.btnLogIn} onClick={() => navigate('/login')}>Sign in</button>
      }
    </header>
  )
}

export default Header;