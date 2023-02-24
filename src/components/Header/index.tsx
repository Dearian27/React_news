import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import reactLogo from '../../assets/reactLogo.svg'
import styles from './styles.module.scss';
import { useState } from 'react';
import userIcon from '../../assets/userIcon.jpg';
import userSlice, { checkToken, removeToken } from '../../redux/slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Popover, Typography } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useTranslation } from 'react-i18next'

interface lngsI {
  en: string;
  ua: string;
}


const languages = {
  "en": 'English',
  "ua": 'Українська',
};

const Header: React.FC = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  const [lngsListOpen, setLngsListOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);


  dispatch(checkToken());
  const User = useSelector((state: any) => state.user);

  const changeLanguage = (value: string) => {
    i18n.changeLanguage(value);
    setLngsListOpen(false);
  }

  const signOut = () => {
    setLngsListOpen(false);
    setAnchorEl(null);
    dispatch(removeToken());
    window.localStorage.removeItem('name');
    window.localStorage.removeItem('password');
  }

  const handlePopoverClose: () => void = () => {
    setAnchorEl(null);
    setLngsListOpen(false);
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
        <NavLink className={styles.navItem} to="/">{t("home")}</NavLink>
        <NavLink className={styles.navItem} to="/news">{t("news")}</NavLink>
        {User.isAuth &&
          <NavLink className={styles.navItem} to="/profile">{t("profile")}</NavLink>
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
            <Typography onClick={() => setLngsListOpen(!lngsListOpen)} sx={{ p: 2, display: "flex", alignItems: "center", cursor: "pointer", userSelect: "none" }}>
              {t("lngTitle")}<KeyboardArrowDownIcon className={`${styles.arrowIcon} ${lngsListOpen ? "rotated" : ""}`} />
            </Typography>
            {lngsListOpen &&
              i18n.languages.map((lang, lId) => {
                return (
                  <Typography key={lId} onClick={() => changeLanguage(lang)}
                    sx={{
                      p: 1, backgroundColor: "lightgray", cursor: "pointer", transition: "0.5s ease-in-out", "&:hover": { backgroundColor: "#eaeaea" }
                    }}
                  >
                    {lang}
                  </Typography>
                )
              })
            }
            <Typography sx={{ p: 2, cursor: "pointer" }} onClick={() => signOut()}>{t("signOut")}</Typography>
          </Popover>
        </div>
        :
        <button className={styles.btn} onClick={() => navigate('/login')}>{t("SignIn")}</button>
      }
    </header >
  )
}

export default Header;