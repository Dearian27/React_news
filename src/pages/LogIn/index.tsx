import { ChangeEvent, useRef, useState } from 'react';
import eyeIcon from '../../assets/eye.png';
import eyeCloseIcon from '../../assets/eyeClose.png';
import styles from './styles.module.scss';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { setAuth } from '../../redux/slices/userSlice';
import { Alert, AlertColor, Snackbar, debounce } from '@mui/material';
import { useTranslation } from 'react-i18next';

const LogIn: React.FC = () => {

  const navigate = useNavigate();
  const dipatch = useDispatch();
  const { t, i18n } = useTranslation();

  const USER_PASSWORD = '12345';
  const USER_NAME = 'admin';

  const [name, setName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [viewType, setViewType] = useState<string>('password');

  const pswdRef = useRef<HTMLInputElement | null>(null);
  const nameRef = useRef<HTMLInputElement | null>(null);

  const [alert, setAlert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>('');

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlert(false);
  };

  const changeView = () => {
    if (pswdRef.current?.type === 'password') {
      pswdRef.current.classList.add(styles.black);
      setViewType('text');
    } else {
      pswdRef.current?.classList.remove(styles.black);
      setViewType('password');
    }
  }

  const validCredentials = password === USER_PASSWORD && name === USER_NAME;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (name === '') {
      nameRef.current?.classList.add("red");
    } else nameRef.current?.classList.remove("red");
    if (password === '') {
      pswdRef.current?.classList.add("red");
    } else pswdRef.current?.classList.remove("red");

    if (!validCredentials) {
      setAlertMessage('The name or password is wrong');
      setAlert(true);
    } else {
      window.localStorage.setItem('name', name);
      window.localStorage.setItem('password', password);

      dipatch(setAuth(true));
      navigate('/');
    }
  }

  return (
    <section className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className={styles.title}>{t("login")}</h1>
        <input ref={nameRef} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setName(event.target.value)}
          value={name} className={styles.input} type="text" placeholder={t('username') || ""}
        />
        <label className={styles.pswd}>
          <input onChange={(event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}
            value={password} className={styles.input} ref={pswdRef} type={viewType}
            placeholder={t('password') || ""}
          />
          <img className={styles.pswdIcon} onClick={changeView} src={viewType === "password" ? eyeCloseIcon : eyeIcon} />
        </label>
        <div className={styles.btnContainer}>
          <button type='button' onClick={() => navigate("/")} className={styles.btnBack}>{t('back')}</button>
          <button type='submit' className={styles.btnSubmit}>{t("submit")}</button>
        </div>
      </form>

      <Snackbar open={alert} autoHideDuration={3000} onClose={handleClose} sx={{ position: "fixed", ml: "50%", transform: "translateX(-50%)", bottom: "30px" }}>
        <Alert onClose={handleClose} severity="error" sx={{ minWidth: '350px' }}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </section >
  )
}

export default LogIn;