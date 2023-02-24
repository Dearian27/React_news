import { ChangeEvent, useRef, useState } from 'react';
import eyeIcon from '../../assets/eye.png';
import eyeCloseIcon from '../../assets/eyeClose.png';
import styles from './styles.module.scss';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { setAuth } from '../../redux/slices/userSlice';
import { Alert, AlertColor, Snackbar, debounce } from '@mui/material';

const LogIn: React.FC = () => {

  const navigate = useNavigate();
  const dipatch = useDispatch();

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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password === "12345" && name === "admin") {
      window.localStorage.setItem('name', name);
      window.localStorage.setItem('password', password);

      dipatch(setAuth(true));
      navigate('/');
    }
    else if (password === "" || name === "") {
      if (name === '') {
        nameRef.current?.classList.add("red");
      } else nameRef.current?.classList.remove("red");
      if (password === '') {
        pswdRef.current?.classList.add("red");
      } else pswdRef.current?.classList.remove("red");

      setAlertMessage('Please provide the name and password');
      setAlert(true);
    }
    else if (password !== "12345" || name !== "admin") {
      setAlertMessage('The name or password is wrong');
      setAlert(true);
    }
  }

  return (
    <section className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className={styles.title}>Log in</h1>
        <input ref={nameRef} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setName(event.target.value)}
          value={name} className={styles.input} type="text"
        />
        <label className={styles.pswd}>
          <input onChange={(event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}
            value={password} className={styles.input} ref={pswdRef} type={viewType}
          />
          <img className={styles.pswdIcon} onClick={changeView} src={viewType === "password" ? eyeCloseIcon : eyeIcon} />
        </label>
        <div className={styles.btnContainer}>
          <button type='button' onClick={() => navigate("/")} className={styles.btnBack}>Back</button>
          <button type='submit' className={styles.btnSubmit}>Submit</button>
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