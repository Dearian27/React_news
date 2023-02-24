import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import reactLogo from '../../assets/reactLogo.svg'
import styles from './styles.module.scss';
import { useState } from 'react';
import userIcon from '../../assets/userIcon.jpg';
import userSlice, { checkToken, removeToken } from '../../redux/slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Popover, Typography } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';


interface lngsI {
  title: string;
  value?: string;
}

const languages: lngsI[] = [
  {
    title: 'English',
    value: 'en',
  },
  {
    title: 'Українська',
    value: 'ua',
  }
]

const Header: React.FC = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();


  const [lngsOpen, setLngsOpen] = useState<boolean>(false);
  const [lngs, setLngs] = useState<lngsI[]>(languages);

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  // console.log(window.localStorage.getItem('name'));


  dispatch(checkToken());
  const User = useSelector((state: any) => state.user);

  const signOut = () => {
    setLngsOpen(false);
    setAnchorEl(null);
    dispatch(removeToken());
    window.localStorage.removeItem('name');
    window.localStorage.removeItem('password');
  }

  const handlePopoverClose: () => void = () => {
    setAnchorEl(null);
    setLngsOpen(false);
  }
  const handlePopoverClick: (event: React.MouseEvent<HTMLButtonElement>) => void = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  }

  const open = Boolean(anchorEl);
  const popoverId = open ? 'simple-popover' : undefined;

  return (
    <header className={styles.header}>
      <Link to="/" style={{ textDecoration: "none" }} className={styles.logoWrapper}>
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
          <Button onClick={handlePopoverClick} className={styles.user}>
            {User.name}
            <img src={userIcon} className={styles.userIcon} alt="user" />
          </Button>
          <Popover
            sx={{ transition: "1s ease-in-out" }}
            id={popoverId}
            open={open}
            anchorEl={anchorEl}
            onClose={handlePopoverClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <Typography onClick={() => setLngsOpen(!lngsOpen)} sx={{ p: 2, display: "flex", alignItems: "center", cursor: "pointer", userSelect: "none" }}>
              українська<KeyboardArrowDownIcon className={`${styles.arrowIcon} ${lngsOpen ? "rotated" : ""}`} />
            </Typography>
            {lngsOpen &&
              languages.map((lang, lId) => {
                return <Typography key={lId} onClick={() => { }} sx={{ p: 1, backgroundColor: "lightgray", cursor: "pointer", transition: "0.5s ease-in-out", "&:hover": { backgroundColor: "#eaeaea" } }}>{lang.title}</Typography>
              })
            }
            <Typography sx={{ p: 2, cursor: "pointer" }} onClick={() => signOut()}>Sign out</Typography>
          </Popover>
        </div>
        :
        <button className={styles.btn} onClick={() => navigate('/login')}>Sign in</button>
      }
    </header >
  )
}

export default Header;